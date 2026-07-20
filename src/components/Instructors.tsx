import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const INSTRUCTORS = [
  { name: 'Kácio Felipe', role: 'Product Designer', initials: 'KF', from: '#1f4736', to: '#6ee7a0' },
  { name: 'Bruno Biagioni', role: 'Design System Specialist', initials: 'BB', from: '#243447', to: '#7fb4e8' },
  { name: 'Ana Souza', role: 'UX Researcher', initials: 'AS', from: '#43302a', to: '#e8a97f' },
  { name: 'Lucas Prado', role: 'Frontend Engineer', initials: 'LP', from: '#3a2a43', to: '#c77fe8' },
  { name: 'Marina Costa', role: 'Motion Designer', initials: 'MC', from: '#3d3320', to: '#e8d47f' },
]

export default function Instructors() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.15] tracking-[-0.02em]"
          >
            Aprenda com os <span className="text-[#6ee7a0]">Melhores</span>
          </motion.h2>

          <div className="flex gap-2 shrink-0">
            {[
              { Icon: ChevronLeft, dir: -1 as const, label: 'Anterior' },
              { Icon: ChevronRight, dir: 1 as const, label: 'Próximo' },
            ].map(({ Icon, dir, label }) => (
              <motion.button
                key={label}
                aria-label={label}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll(dir)}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white"
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
        >
          <div
            ref={trackRef}
            className="mt-12 flex gap-5 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {INSTRUCTORS.map(({ name, role, initials, from, to }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="w-60 shrink-0 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]"
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{ background: `linear-gradient(150deg, ${from}, #000 90%)` }}
                >
                  <span
                    className="w-20 h-20 rounded-full flex items-center justify-center text-[22px] font-bold text-white/90"
                    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                  >
                    {initials}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-white text-[15px]">{name}</p>
                  <p className="mt-1 text-[#6ee7a0] text-[12.5px]">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
