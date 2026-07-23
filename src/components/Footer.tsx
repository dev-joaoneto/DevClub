import { useEffect, useRef, useState } from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

// Every link here points at a real section of this page — no placeholder
// hrefs. Add new columns only once there's an equally real destination.
const LINK_COLUMNS = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Formação', href: '#about' },
      { label: 'Plataforma', href: '#platform' },
      { label: 'Mercado', href: '#metrics' },
    ],
  },
  {
    title: 'Programa',
    links: [
      { label: 'Certificados', href: '#certifications' },
      { label: 'Garantia', href: '#guarantee' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Perguntas frequentes', href: '#faq' },
      { label: 'Início', href: '#hero' },
    ],
  },
]

// Left as "#" on purpose — real profile URLs go here once they exist.
const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rodolfomorii' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@canaldevclub' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rodolfomori' },
]

// A vertical anchor-point connector — two hollow pen-tool handles joined by
// a line, drawing themselves in once. Sits entirely above the wordmark
// (never over the letters) so it reads as an annotation, not a cover.
function AnchorConnector() {
  return (
    <svg width="2" height="52" viewBox="0 0 2 52" className="overflow-visible">
      <motion.circle
        cx={1}
        cy={2}
        r={3}
        fill="#070b09"
        stroke="#6ee7a0"
        strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{ transformOrigin: '1px 2px' }}
      />
      <motion.line
        x1={1}
        y1={2}
        x2={1}
        y2={50}
        stroke="#6ee7a0"
        strokeWidth={1.5}
        strokeOpacity={0.45}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={1}
        cy={50}
        r={3}
        fill="#070b09"
        stroke="#6ee7a0"
        strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.3, delay: 1.1 }}
        style={{ transformOrigin: '1px 50px' }}
      />
    </svg>
  )
}

// A floating collaborator tag, like a name label trailing a cursor in a
// live design tool — signed by the founder, gently bobbing to feel alive.
function CollaboratorTag() {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-1.5 rounded-full bg-[#6ee7a0] py-1 pl-1 pr-3 shadow-[0_8px_24px_-8px_rgba(110,231,160,0.5)]"
    >
      <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-black/10">
        {!failed && (
          <img
            src="/instructors/rodolfo-mori.jpg"
            alt=""
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="whitespace-nowrap text-[12px] font-medium text-black">Rodolfo Mori</span>
    </motion.div>
  )
}

// The tag and its connector, held well clear of the wordmark's top edge and
// centered over the gap between "Dev" and "Club" — an annotation floating
// above the brand mark, never in front of it, so the name always stays
// fully legible.
function FounderMark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -top-[92px] left-1/2 -translate-x-1/2 hidden flex-col items-center sm:flex lg:-top-28"
    >
      <CollaboratorTag />
      <AnchorConnector />
    </motion.div>
  )
}

// All of the footer's real content — logo, link columns, seals, copyright.
// Plain, normal-flow content — nothing pinned or absolutely positioned.
function FooterContent() {
  return (
    <div className="bg-black">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/devclub-logo.png" alt="Dev Club" className="h-6 w-auto" />
            <span className="text-[15px] font-medium text-white/80 tracking-tight">Dev Club</span>
          </div>
          <p className="mt-5 text-white/40 text-[13px] leading-relaxed max-w-xs">
            A escola de tecnologia que une trilhas práticas de programação, comunidade e as
            principais IAs do mercado em uma única assinatura.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {LINK_COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <p className="text-white text-[13px] tracking-[0.15em] uppercase">{title}</p>
            <ul className="mt-5 space-y-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/40 hover:text-white text-[13px] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-white/25 text-[12px]">&copy; 2026 Dev Club. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}

// The oversized brand wordmark that lives behind the footer. The stage is
// pinned (position: sticky) so it holds still in view; the wordmark itself
// is driven by scroll — it rises up from behind the opaque footer card as
// you reach the end of the page, renders in full, then the page runs out
// (the reveal locks). Scroll back up and it sinks back down behind the
// card until it's gone. The `y` motion value comes from the footer's own
// scroll progress, so finger/wheel drive it directly — no animation clock,
// nothing to fall out of sync, fully reversible.
//
// The whole block (wordmark + founder tag) moves as one so the annotation
// always tracks the letters. On mobile the size floor is deliberately
// large so "Dev Club" is legible the moment it clears the card.
function WordmarkStage({ y }: { y: MotionValue<string> }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(110,231,160,0.4), transparent)' }}
      />

      <motion.div
        style={{ y }}
        className="relative mx-auto w-[90%] max-w-[1320px] px-6 will-change-transform"
      >
        <FounderMark />
        <h2
          aria-hidden="true"
          style={{
            color: 'rgba(110,231,160,0.07)',
            WebkitTextStroke: '1.5px rgba(110,231,160,0.4)',
          }}
          className="select-none w-full text-center font-bold leading-[0.85] tracking-[-0.03em] text-[clamp(92px,19vw,340px)]"
        >
          Dev Club
        </h2>
        <span className="sr-only">Dev Club</span>
      </motion.div>
    </div>
  )
}

// Extra scroll room (in dvh) below the footer content — this is the runway
// the reveal plays out over. Kept above one viewport so the sticky stage
// actually pins on desktop too (a shorter footer than the viewport can't
// pin, which is what made the old version "just appear" instead of reveal).
// The page ends right as the wordmark finishes rising: reveal locks, no
// dead scroll after. Tune this to make the reveal longer/shorter.
const REVEAL_DVH = 72

// How far (as a share of the wordmark block's own height) it starts pushed
// down behind the card, and where it settles. [enter, done] map to scroll
// progress: it stays hidden until 25% through the footer, then rises to rest
// exactly at the end. Tune the START to change how much it "climbs".
const RISE_FROM = '85%'
const RISE_TO = '0%'
const RISE_START = 0.25

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  // Measure the real content height (border-box, via offsetHeight — not
  // ResizeObserver's contentRect, which drops padding) so the footer is
  // exactly `content + REVEAL_DVH` tall at any breakpoint. contentHeight is
  // the only thing that changes per viewport; the reveal room is a constant.
  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return
    const update = () => setContentHeight(contentEl.offsetHeight)
    const observer = new ResizeObserver(update)
    update()
    observer.observe(contentEl)
    return () => observer.disconnect()
  }, [])

  // Progress from 0 (footer's top just entering at the viewport bottom) to
  // 1 (footer's bottom hitting the viewport bottom = end of the page). This
  // is the finger/wheel position itself — not a timed animation — so the
  // reveal is scrubbable and reverses perfectly.
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })
  const wordmarkY = useTransform(scrollYProgress, [RISE_START, 1], [RISE_FROM, RISE_TO])

  const totalHeight = contentHeight
    ? `calc(${contentHeight}px + ${REVEAL_DVH}dvh)`
    : undefined

  return (
    <footer
      ref={footerRef}
      className="relative bg-black"
      // overscroll-behavior kills the rubber-band past the end so the page
      // reads as a hard stop ("morreu a página ali") the moment the wordmark
      // is fully revealed, on trackpad and touch alike.
      style={{ height: totalHeight, overscrollBehaviorY: 'none' }}
    >
      {/* Pinned full-viewport stage: holds the wordmark in view while its
          own scroll-driven `y` lifts it up from behind the card below. */}
      <div className="sticky top-0 h-screen h-[100dvh]">
        <WordmarkStage y={wordmarkY} />
      </div>

      {/* The opaque footer "card" that rides on top (z-10) and hides the
          wordmark behind it until it climbs clear. */}
      <div ref={contentRef} className="absolute inset-x-0 top-0 z-10 bg-black">
        <FooterContent />
      </div>
    </footer>
  )
}
