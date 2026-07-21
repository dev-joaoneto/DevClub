import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Bot,
  Briefcase,
  GraduationCap,
  Headphones,
  HeartPulse,
  UserSearch,
  UsersRound,
} from 'lucide-react'

interface Benefit {
  Icon: typeof Bot
  text: string
  color: string
  image: string
}

// Each card gets its own elegant accent — a distinct hue rather than repeating
// the site's green everywhere, so the sequence reads as a curated set instead
// of seven copies of the same card. Images live in public/beyond-code/0N.jpg;
// until they're added, ImagePanel falls back to a matching gradient + icon.
const BENEFITS: Benefit[] = [
  {
    Icon: UserSearch,
    text: 'Acompanhamento da nossa Recrutadora SEMANALMENTE',
    color: '#d4a373',
    image: '/beyond-code/01.png',
  },
  {
    Icon: HeartPulse,
    text: 'Terapeuta focado em ALTA PERFORMANCE',
    color: '#52b788',
    image: '/beyond-code/02.png',
  },
  {
    Icon: GraduationCap,
    text: 'Mentorias SEMANAIS com os MELHORES profissionais de Tecnologia do Mercado',
    color: '#7c8cff',
    image: '/beyond-code/03.jpg',
  },
  {
    Icon: Bot,
    text: 'Dezenas de Agentes de IA para te ajudar 24h por dia',
    color: '#6ee7a0',
    image: '/beyond-code/04.webp',
  },
  {
    Icon: Headphones,
    text: 'Suporte Humano 7 dias por semana',
    color: '#4fc3e0',
    image: '/beyond-code/05.webp',
  },
  {
    Icon: UsersRound,
    text: 'A Maior e Melhor Comunidade de Profissionais de Tecnologia do Brasil',
    color: '#a78bfa',
    image: '/beyond-code/06.webp',
  },
  {
    Icon: Briefcase,
    text: 'Vagas de Emprego Exclusivas',
    color: '#f0b429',
    image: '/beyond-code/07.png',
  },
]

// One card is "active" per fifth of the scroll range — like a slide deck, not
// a scrub. Scrolling through the middle of a card's range does nothing (it
// just holds, fully sharp), then a short, fixed-duration CSS transition swaps
// to the next card the moment its range starts. The transition's length never
// depends on scroll speed, so it can't feel like it's "stuck mid-way".
function activeIndexFor(progress: number, total: number) {
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)))
}

function ImagePanel({
  Icon,
  color,
  image,
  text,
  active,
}: {
  Icon: typeof Bot
  color: string
  image: string
  text: string
  active: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="relative w-full sm:w-[40%] aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden"
      style={{ background: `linear-gradient(155deg, ${color}3d 0%, #06070a 78%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color}14 0px, ${color}14 1px, transparent 1px, transparent 13px)`,
        }}
      />
      {!failed && (
        <img
          src={image}
          alt={text}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
            active ? 'scale-100' : 'scale-110'
          }`}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out ${
            active ? 'scale-100' : 'scale-110'
          }`}
        >
          <span
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}1f`, border: `1px solid ${color}45` }}
          >
            <Icon size={34} style={{ color }} strokeWidth={1.6} />
          </span>
        </div>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(0deg, rgba(5,6,8,0.9) 0%, transparent 30%), linear-gradient(90deg, rgba(5,6,8,0.55) 0%, transparent 22%)`,
        }}
      />
    </div>
  )
}

export default function BeyondCode() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
  })

  const activeIndex = activeIndexFor(progress, BENEFITS.length)

  return (
    <section className="relative bg-black">
      <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-28 pb-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto"
        >
          Tudo que você precisa <span className="text-[#6ee7a0]">ALÉM do Código</span> para
          Evoluir mais rápido
        </motion.h2>
      </div>

      {/* 50vh of scroll per card (not 100vh) — enough to read each description
          comfortably without turning the section into a long, heavy scroll. */}
      <div ref={containerRef} className="relative" style={{ height: `${BENEFITS.length * 50}vh` }}>
        <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              opacity: 0.05,
            }}
          />

          {BENEFITS.map(({ Icon, text, color, image }, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex

            return (
              <div
                key={text}
                className={`absolute inset-0 flex items-center justify-center px-6 pointer-events-none transition-[opacity,transform] duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 translate-y-0 scale-100'
                    : isPast
                      ? 'opacity-0 -translate-y-10 scale-[0.96]'
                      : 'opacity-0 translate-y-10 scale-[0.96]'
                }`}
              >
                {/* Ambient wash echoes this card's own color instead of a flat
                    green glow, so the passage between cards feels tinted/curated. */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${color}22, transparent 70%)`,
                  }}
                />
                <div className="w-full max-w-4xl flex items-center gap-5 sm:gap-8">
                  {/* Fixed desktop height (300px) matches the tallest natural card — the
                      4-line "Mentorias" one — so every card reads as the same size instead
                      of the box growing/shrinking with each description's length. */}
                  <div
                    className="relative flex-1 min-w-0 rounded-3xl border overflow-hidden flex flex-col sm:flex-row sm:h-[300px]"
                    style={{ borderColor: `${color}3d`, background: 'rgba(255,255,255,0.03)' }}
                  >
                    <ImagePanel Icon={Icon} color={color} image={image} text={text} active={isActive} />

                    <div className="w-full sm:w-[60%] p-8 sm:p-12 flex flex-col justify-center gap-5">
                      <span
                        className="text-[13px] font-bold tracking-[0.3em]"
                        style={{ color }}
                      >
                        {String(i + 1).padStart(2, '0')} / {String(BENEFITS.length).padStart(2, '0')}
                      </span>
                      <p className="text-white text-[22px] sm:text-[28px] font-medium leading-[1.3] tracking-[-0.01em]">
                        {text}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col gap-4 shrink-0">
                    {BENEFITS.map(({ color: dotColor }, di) => (
                      <span
                        key={di}
                        style={{ background: dotColor }}
                        className={`block w-1.5 h-1.5 rounded-full origin-center transition-all duration-500 ease-out ${
                          di === activeIndex ? 'opacity-100 scale-y-[2.4]' : 'opacity-30 scale-y-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
