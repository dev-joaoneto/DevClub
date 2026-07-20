import { motion } from 'framer-motion'
import { Play, Layers, MonitorSmartphone } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Clone do Disney+',
    desc: 'Streaming completo com catálogo, player e perfis',
    gradient: 'linear-gradient(160deg, #0e2438 0%, #06101c 70%)',
    Icon: Play,
  },
  {
    title: 'Telas de UI Avançadas',
    desc: 'Dashboards, design systems e microinterações',
    gradient: 'linear-gradient(160deg, #1a3527 0%, #06120c 70%)',
    Icon: Layers,
  },
  {
    title: 'Plataforma de Streaming',
    desc: 'Do layout no Figma ao deploy em produção',
    gradient: 'linear-gradient(160deg, #33202e 0%, #120810 70%)',
    Icon: MonitorSmartphone,
  },
]

export default function Projects() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em]"
        >
          Tudo com Projetos <span className="text-[#6ee7a0]">Práticos e Reais</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PROJECTS.map(({ title, desc, gradient, Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="border border-white/10 rounded-2xl overflow-hidden"
            >
              <div
                className="aspect-[4/5] flex flex-col items-center justify-center gap-4 relative"
                style={{ background: gradient }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '22px 22px',
                    opacity: 0.05,
                  }}
                />
                <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon size={24} className="text-[#6ee7a0]" />
                </span>
                <div className="w-2/3 space-y-2">
                  <div className="h-2 rounded bg-white/10" />
                  <div className="h-2 rounded bg-white/10 w-3/4 mx-auto" />
                </div>
              </div>
              <div className="p-5 bg-white/[0.03]">
                <h3 className="text-white text-[15px] font-normal">{title}</h3>
                <p className="mt-1.5 text-white/45 text-[12.5px] leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
