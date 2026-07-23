import { useState } from 'react'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

// A ring of small solid shadows stands in for `-webkit-text-stroke`
const WORDMARK_STROKE_COLOR_RGB = '110,231,160'
const WORDMARK_STROKE_ALPHA = 0.016
const WORDMARK_STROKE_WIDTH = 1.5
const WORDMARK_OUTLINE = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  const x = (Math.cos(angle) * WORDMARK_STROKE_WIDTH).toFixed(2)
  const y = (Math.sin(angle) * WORDMARK_STROKE_WIDTH).toFixed(2)
  return `${x}px ${y}px 0 rgba(${WORDMARK_STROKE_COLOR_RGB},${WORDMARK_STROKE_ALPHA})`
}).join(', ')

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

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rodolfomorii' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@canaldevclub' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rodolfomori' },
]

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

function WordmarkStage() {
  return (
    // Removido o h-screen forçado. Adicionado padding-top generoso 
    // para o FounderMark ter espaço e não ser cortado.
    <div className="relative flex w-full items-end justify-center overflow-hidden bg-black pt-40 pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(110,231,160,0.4), transparent)' }}
      />

      <div className="relative mx-auto w-[95%] max-w-[1500px] px-6">
        <FounderMark />
        <h2
          aria-hidden="true"
          style={{
            color: 'rgba(110,231,160,0.07)',
            textShadow: WORDMARK_OUTLINE,
          }}
          className="select-none w-full text-center font-bold leading-[0.85] tracking-[-0.03em] text-[clamp(100px,min(22vw,105dvh),400px)]"
        >
          Dev Club
        </h2>
        <span className="sr-only">Dev Club</span>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-black w-full flex flex-col">
      {/* 
        O footer de conteúdo (com links e logo).
        Possui z-index maior (z-10) e bg-black sólido. 
        Ele vai rolar normalmente com a página e vai "tampar" o nome embaixo dele.
      */}
      <div className="relative z-10 w-full bg-black">
        <FooterContent />
      </div>

      {/* 
        A marca d'água final.
        O pulo do gato está no 'sticky bottom-0'. Isso faz com que essa div "pregue" no 
        fundo da tela. Conforme o conteúdo do Footer acima desliza pra cima na rolagem, 
        essa parte é perfeitamente revelada por baixo como se fosse um fundo falso.
      */}
      <div className="sticky bottom-0 z-0 w-full bg-black">
        <WordmarkStage />
      </div>
    </footer>
  )
}