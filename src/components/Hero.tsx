import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Zap } from 'lucide-react'
import ScrambleIn from './ScrambleIn'
import AngledButton from './AngledButton'
import HeroSponsors from './HeroSponsors'
import CountUp from './CountUp'
import { scrollToId } from '../lib/scrollTo'

// Photo falls back to the initials/gradient underneath if the placeholder
// service is ever unreachable (onError hides the <img>, not the span).
const TRUST_AVATARS: { img: string; initials: string; from: string; to: string }[] = [
  { img: 'https://i.pravatar.cc/64?img=13', initials: 'RB', from: '#1f4736', to: '#6ee7a0' },
  { img: 'https://i.pravatar.cc/64?img=32', initials: 'TS', from: '#243447', to: '#7fb4e8' },
  { img: 'https://i.pravatar.cc/64?img=47', initials: 'GA', from: '#43302a', to: '#e8a97f' },
]

const HERO_VIDEO = '/hero-robot.mp4'

// Timeline anchors of the head-turn sweep in the video:
// head fully turned to the viewer's right / facing forward / fully turned left
const T_RIGHT = 5.6
const T_CENTER = 6.2
const T_LEFT = 7.2

// Spring feel of the head-follow motion
const HEAD_SPRING = { stiffness: 170, damping: 24, mass: 0.45 }

// Gemini watermark location in the source 1280x720 frame (static across the video)
const VIDEO_W = 1280
const VIDEO_H = 720
const MARK_X = 1159.5
const MARK_Y = 599.5
const MARK_SIZE = 48

// Nudges the whole video (and everything pinned to it) down so the robot's
// head clears the floating header instead of sitting right behind it
const VIDEO_SHIFT_Y = 64

interface HeroProps {
  entranceComplete: boolean
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const primaryButtonRef = useRef<HTMLDivElement>(null)
  const [patch, setPatch] = useState({ left: 0, top: 0, size: 0 })
  const [trustPos, setTrustPos] = useState<{ top: number; left: number } | null>(null)

  // Head follows the cursor: mouse X -> head-turn segment of the timeline,
  // smoothed through a framer-motion spring for a light, natural follow
  const targetTime = useMotionValue(T_CENTER)
  const springTime = useSpring(targetTime, HEAD_SPRING)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isSeeking = false
    let latestTime = T_CENTER

    const trySeek = () => {
      if (isSeeking || video.readyState < 2) return
      if (Math.abs(video.currentTime - latestTime) <= 0.015) return
      isSeeking = true
      video.currentTime = latestTime
    }

    const onLoadedMetadata = () => {
      // Mobile Safari (and some Android WebViews) never paint a single frame
      // for a video that's only ever seeked while paused — the decoder pipeline
      // only spins up once playback actually starts. Kick it with a real
      // play() (allowed here since the video is muted + playsInline) and pause
      // right back on the next frame, then land on the resting timestamp.
      const playAttempt = video.play()
      const land = () => {
        video.pause()
        video.currentTime = T_CENTER
      }
      if (playAttempt && typeof playAttempt.then === 'function') {
        playAttempt.then(land).catch(land)
      } else {
        land()
      }
    }

    const onSeeked = () => {
      isSeeking = false
      // Chase the newest spring value so fast cursor motion never queues up
      trySeek()
    }

    const onMouseMove = (e: MouseEvent) => {
      const x = Math.min(1, Math.max(0, e.clientX / window.innerWidth))
      // cursor right -> earlier times (head right); cursor left -> later times (head left)
      targetTime.set(
        x >= 0.5
          ? T_CENTER - (x - 0.5) * 2 * (T_CENTER - T_RIGHT)
          : T_CENTER + (0.5 - x) * 2 * (T_LEFT - T_CENTER),
      )
    }

    const unsubscribe = springTime.on('change', (v) => {
      latestTime = v
      trySeek()
    })

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      unsubscribe()
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [targetTime, springTime])

  // Keep the blur patch glued to the watermark through the object-cover crop
  useEffect(() => {
    const compute = () => {
      const section = sectionRef.current
      if (!section) return
      const W = section.clientWidth
      const H = section.clientHeight
      const scale = Math.max(W / VIDEO_W, H / VIDEO_H)
      const offsetX = (W - VIDEO_W * scale) / 2
      const offsetY = (H - VIDEO_H * scale) / 2
      setPatch({
        left: offsetX + MARK_X * scale,
        top: offsetY + MARK_Y * scale,
        size: MARK_SIZE * scale * 3,
      })
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Trust badge sits below the "Quero Fazer Parte" button, left-aligned with
  // it — measured against the real rendered rects instead of a guessed
  // top/left-%, so it holds up across every breakpoint and font-wrap.
  useEffect(() => {
    const compute = () => {
      const section = sectionRef.current
      const buttons = buttonsRef.current
      const primaryButton = primaryButtonRef.current
      if (!section || !buttons || !primaryButton) return
      const sectionRect = section.getBoundingClientRect()
      const buttonsBottom = buttons.getBoundingClientRect().bottom
      const primaryLeft = primaryButton.getBoundingClientRect().left
      setTrustPos({
        top: buttonsBottom - sectionRect.top + 24,
        left: primaryLeft - sectionRect.left,
      })
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (buttonsRef.current) ro.observe(buttonsRef.current)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen h-[100dvh] overflow-hidden bg-black"
    >
      {/* Ambient backdrop behind the video — matches the video's own dark
          backdrop tone exactly at VIDEO_SHIFT_Y so the strip revealed by
          shifting the video down blends seamlessly, plus a soft green glow
          bleeding up from behind the robot's head for extra depth. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 60% at 50% 0%, rgba(110,231,160,0.12), transparent 65%),
            linear-gradient(180deg, #000000 0px, #121718 ${VIDEO_SHIFT_Y + 90}px, #121718 100%)`,
          filter: 'blur(30px)',
        }}
      />

      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: `translateY(${VIDEO_SHIFT_Y}px)` }}
      />

      {/* Black blur patch hiding the Gemini watermark */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: patch.left,
          top: patch.top,
          width: patch.size,
          height: patch.size,
          transform: `translate(-50%, calc(-50% + ${VIDEO_SHIFT_Y}px))`,
          background: 'radial-gradient(circle, rgba(0,0,0,0.98) 50%, rgba(0,0,0,0) 75%)',
          filter: 'blur(4px)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Cinematic scrim: grounds the copy against the robot without hiding it —
          mirrored left/right so both sides fade in from the same depth. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0) 78%), linear-gradient(270deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0) 78%), linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 36%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 9%)',
        }}
      />

      {/* Content — headline block sits around the robot's chin height, independent
          from the sponsor carousel which is pinned to the very bottom edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 top-[26%] sm:top-[20%] z-10 flex flex-col gap-5 max-w-2xl"
      >
        <h1 className="text-white font-light leading-[1.02] tracking-[-0.03em] text-[clamp(32px,6.5vw,72px)]">
          <ScrambleIn text="Tudo o que você" delay={200} triggered={entranceComplete} />
          <br />
          <ScrambleIn text="precisa de IA," delay={450} triggered={entranceComplete} />
          <br />
          <ScrambleIn text="em um só lugar" delay={700} triggered={entranceComplete} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
          className="max-w-md text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
        >
          As melhores IAs, os cursos mais práticos e a newsletter mais completa — dentro de uma
          única assinatura.
        </motion.p>

        <motion.div
          ref={buttonsRef}
          initial={{ opacity: 0, y: 25 }}
          animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.35 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div ref={primaryButtonRef} className="inline-block">
            <AngledButton href="https://w.app/crtgeh" target="_blank" rel="noopener noreferrer" icon={<Zap size={14} fill="currentColor" />}>
              Matricule-se
            </AngledButton>
          </div>
          <AngledButton onClick={() => scrollToId('platform')} variant="outline">
            Plataforma
          </AngledButton>
        </motion.div>
      </motion.div>

      {/* Trust badge — pinned to this section only, scrolls away with the Hero
          (not fixed like the Navbar/Reader). Left-aligned under the primary
          "Quero Fazer Parte" button, not centered on the viewport. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete && trustPos !== null ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute z-10 inline-flex items-center gap-2.5 border border-white/10 bg-white/[0.04] backdrop-blur-md rounded-full pl-2 pr-4 py-1.5 whitespace-nowrap"
        style={{ top: trustPos?.top ?? 0, left: trustPos?.left ?? 0 }}
      >
        <div className="flex pl-1.5">
          {TRUST_AVATARS.map(({ img, initials, from, to }) => (
            <span
              key={initials}
              className="relative w-[26px] h-[26px] -ml-2 rounded-full border-2 border-black flex items-center justify-center text-[9px] font-bold text-white/90 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              {initials}
              <img
                src={img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </span>
          ))}
        </div>
        <span className="text-[12.5px] text-white/70 font-medium whitespace-nowrap">
          +<CountUp to={30} /> mil alunos já passaram por aqui
        </span>
      </motion.div>

      {/* Sponsor carousel — flush with the Hero's bottom edge, touching the fold with SocialProof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={entranceComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <p className="flex items-center justify-center gap-2 text-center text-white/50 text-[12px] sm:text-[16px] tracking-wide px-4">
          Alunos contratados por empresas como:
        </p>
        <HeroSponsors />
      </motion.div>
    </section>
  )
}
