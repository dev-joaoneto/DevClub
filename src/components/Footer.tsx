import { Instagram, Linkedin, Youtube } from 'lucide-react'
import SynapseXLogo from './SynapseXLogo'

const LINK_COLUMNS = [
  { title: 'Workshops', links: ['UI na prática', 'Framer do zero', 'Design de portfólio'] },
  { title: 'Ferramentas', links: ['IAs ilimitadas', 'Biblioteca de componentes', 'Templates'] },
  { title: 'Ebooks', links: ['Guia de UI/UX', 'Carreira em design', 'IA para criativos'] },
]

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube, label: 'YouTube' },
  { Icon: Linkedin, label: 'LinkedIn' },
]

const SEALS = ['Framer Skills', 'UI Skills', 'Figma Skills', 'Design System Skills', 'Coding Skills']

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)] gap-12">
        <div>
          <div className="flex items-center gap-2.5">
            <SynapseXLogo size={18} className="text-white/80" />
            <span className="text-[15px] font-medium text-white/80 tracking-tight">Dev Club</span>
          </div>
          <p className="mt-5 text-white/40 text-[13px] leading-relaxed max-w-xs">
            A escola de tecnologia e design que une cursos práticos, comunidade e IAs ilimitadas em
            uma única assinatura.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
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
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-white text-[13px] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-2.5">
            {SEALS.map((seal) => (
              <span
                key={seal}
                className="border border-white/10 rounded-full px-3.5 py-1.5 text-[11px] text-white/45 whitespace-nowrap"
              >
                {seal}
              </span>
            ))}
          </div>
          <p className="text-white/25 text-[12px] whitespace-nowrap">
            &copy; 2026 Dev Club. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
