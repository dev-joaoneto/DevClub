import { useEffect, useRef, useState } from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

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
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
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

// The oversized brand wordmark that lives behind the footer — pinned
// (position: sticky) so it never moves on its own. The footer's content
// sits on top of it and is what actually travels: as you scroll down it
// slides up and off, uncovering the wordmark bit by bit; scroll back up
// and it slides back down over it. Pure CSS — no scroll listener drives
// either side, so the two can never fall out of sync with each other.
function WordmarkStage() {
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

      <div className="relative mx-auto w-[90%] max-w-[1320px] px-6">
        <FounderMark />
        <h2
          aria-hidden="true"
          style={{
            color: 'rgba(110,231,160,0.07)',
            WebkitTextStroke: '1.5px rgba(110,231,160,0.4)',
          }}
          className="select-none w-full text-center font-bold leading-[0.85] tracking-[-0.03em] text-[clamp(56px,15vw,320px)]"
        >
          Dev Club
        </h2>
        <span className="sr-only">Dev Club</span>
      </div>
    </div>
  )
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [stageHeight, setStageHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  // Real, measured heights (border-box, via offsetHeight — not
  // ResizeObserver's contentRect, which excludes padding and under-measured
  // things before) so the extra scroll room always matches exactly what's
  // on screen, at any breakpoint or content change.
  useEffect(() => {
    const stageEl = stageRef.current
    const contentEl = contentRef.current
    if (!stageEl || !contentEl) return

    const updateStage = () => setStageHeight(stageEl.offsetHeight)
    const updateContent = () => setContentHeight(contentEl.offsetHeight)
    const stageObserver = new ResizeObserver(updateStage)
    const contentObserver = new ResizeObserver(updateContent)
    updateStage()
    updateContent()
    stageObserver.observe(stageEl)
    contentObserver.observe(contentEl)
    return () => {
      stageObserver.disconnect()
      contentObserver.disconnect()
    }
  }, [])

  const totalHeight = stageHeight && contentHeight ? stageHeight + contentHeight : undefined

  return (
    <footer
      ref={containerRef}
      className="relative bg-black"
      style={{ height: totalHeight ? `${totalHeight}px` : undefined }}
    >
      {/* Full viewport height, not a fixed px value: the reveal needs at
          least one viewport's worth of extra scroll room below the stage
          for it to ever finish — a shorter stage runs out of page before
          the content finishes sliding clear. */}
      <div ref={stageRef} className="sticky top-0 h-screen h-[100dvh]">
        <WordmarkStage />
      </div>

      <div ref={contentRef} className="absolute inset-x-0 top-0 z-10">
        <FooterContent />
      </div>
    </footer>
  )
}
