import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal, ShieldCheck } from 'lucide-react'

const STEPS = [
  { num: '01', text: 'Compre hoje e acesse a plataforma na hora' },
  { num: '02', text: 'Use a Dev Club como quiser durante 7 dias' },
  { num: '03', text: 'Não gostou? É só pedir e receba 100% de volta' },
]

const RING_TEXT =
  'GARANTIA INCONDICIONAL • 7 DIAS • GARANTIA INCONDICIONAL • 7 DIAS • GARANTIA INCONDICIONAL • 7 DIAS • '

// Gap between the main card and the revealed one, and the transition both
// the reveal card and the layout spacer share so they move in lockstep.
const GAP = 20
const REVEAL_TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }

// Circular seal echoing the reference: a slowly-rotating dashed ring carrying
// looping label text, with a fixed inner medallion so the icon stays upright
// while the ring spins.
function GuaranteeBadge() {
  return (
    <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] shrink-0">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id="guaranteeRingPath" d="M100,10 A90,90 0 1,1 99.9,10" fill="none" />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="rgba(110,231,160,0.25)"
          strokeWidth="1"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
        <text fontSize="8.2" fill="#6ee7a0" letterSpacing="2.5" fontWeight={600}>
          <textPath href="#guaranteeRingPath">{RING_TEXT}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[24%] rounded-full bg-[#070b09] border border-[#6ee7a0]/25 flex flex-col items-center justify-center gap-1.5">
        <ShieldCheck size={26} strokeWidth={1.6} className="text-[#6ee7a0]" />
        <span className="text-[#6ee7a0] text-[11px] font-semibold tracking-wide">7 DIAS</span>
      </div>
    </div>
  )
}

function RefundCard() {
  return (
    <>
      <div>
        <h3 className="font-semibold text-[clamp(20px,3vw,28px)] leading-[1.2] tracking-[-0.02em]">
          E se eu não curtir?
        </h3>
        <p className="mt-4 text-black/70 text-[14px] sm:text-[15px] leading-relaxed">
          Sem burocracia e sem questionamentos: dentro dos 7 dias, você pede o reembolso e recebe
          cada centavo de volta, integralmente. O risco é todo nosso — a decisão é toda sua.
        </p>
      </div>
      <ShieldCheck size={64} strokeWidth={1.4} className="self-end text-black/80" />
    </>
  )
}

export default function Guarantee() {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardHeight, setCardHeight] = useState(0)

  // Keeps the reveal card's size locked to the main card's real rendered
  // height, so it stays perfectly hidden behind it at rest (no peeking edges)
  // and travels exactly the distance the layout spacer opens up below.
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    // offsetHeight (border-box) — not ResizeObserver's contentRect, which
    // excludes padding/border and under-measured the card by ~80px, letting
    // the main card's real bottom edge cover part of the reveal card's text.
    const update = () => setCardHeight(el.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="guarantee" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-[960px] mx-auto px-6">
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Desktop-only reveal: locked to the main card's exact size, fully
              occluded behind its opaque surface at rest, then slid down on
              hover — a card leaving a wallet. Skipped on touch (no hover). */}
          <motion.div
            className="hidden sm:flex absolute inset-x-0 top-0 z-0 rounded-[28px] p-8 sm:p-10 bg-[#6ee7a0] text-black flex-col justify-between gap-6 pointer-events-none"
            style={{ height: cardHeight || 'auto' }}
            initial={false}
            animate={{ y: hovered ? cardHeight + GAP : 0 }}
            transition={REVEAL_TRANSITION}
          >
            <RefundCard />
          </motion.div>

          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative z-10 rounded-[28px] border border-white/10 bg-[#0b0f0d] p-8 sm:p-10 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#6ee7a0]/10 blur-3xl pointer-events-none" />
            <div
              aria-hidden="true"
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
            >
              <MoreHorizontal size={16} />
            </div>

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10">
              <GuaranteeBadge />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[12px] tracking-[0.25em] uppercase text-[#6ee7a0]">
                  ► Risco zero pra você
                </span>
                <h3 className="mt-4 text-white font-semibold text-[clamp(22px,3.2vw,32px)] leading-[1.2] tracking-[-0.02em]">
                  7 dias de garantia incondicional
                </h3>
                <p className="mt-4 text-white/50 text-[14px] leading-relaxed">
                  Você tem até 7 dias depois da sua matrícula na{' '}
                  <span className="text-white/80 font-medium">Dev Club</span> para explorar todos
                  os cursos, formações, projetos e a comunidade. Se não for pra você, é só pedir
                  reembolso.
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {STEPS.map(({ num, text }) => (
                    <div key={num}>
                      <span className="text-[#6ee7a0] text-[12px] font-semibold tracking-wide">
                        {num}
                      </span>
                      <p className="mt-1 text-white/75 text-[13.5px] leading-snug">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Layout spacer: grows in the same box (same duration/easing) as
              the reveal card slides, so the space it needs is genuinely
              reserved and the next section gets pushed down, never covered. */}
          <motion.div
            aria-hidden="true"
            className="hidden sm:block"
            initial={false}
            animate={{ height: hovered ? cardHeight + GAP : 0 }}
            transition={REVEAL_TRANSITION}
          />

          {/* Mobile: no hover available, so the refund reassurance sits in
              normal flow right below the main card instead of hidden behind it. */}
          <div className="sm:hidden mt-6 rounded-[28px] p-8 bg-[#6ee7a0] text-black flex flex-col justify-between gap-6">
            <RefundCard />
          </div>
        </div>
      </div>
    </section>
  )
}
