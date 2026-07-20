import { motion } from 'framer-motion'
import { Monitor, Play } from 'lucide-react'

export default function Platform() {
  return (
    <section id="platform" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-light text-[clamp(24px,4vw,42px)] leading-[1.25] tracking-[-0.02em] max-w-4xl mx-auto"
        >
          Você terá acesso a uma plataforma moderna de aulas, nossa comunidade, área de vagas, IAs
          para acelerar seu progresso e tudo com suporte dos professores
        </motion.h2>

        <div className="mt-16 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="flex-1"
          >
            <span className="w-12 h-12 rounded-xl bg-[#6ee7a0]/10 flex items-center justify-center">
              <Monitor size={22} className="text-[#6ee7a0]" />
            </span>
            <h3 className="mt-5 text-white text-[20px] sm:text-[24px] font-normal">
              Plataforma de ensino
            </h3>
            <p className="mt-3 text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
              Você terá acesso a uma plataforma personalizada e fácil de usar, com acesso completo
              a todos os conteúdos da Asimov.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex-1 w-full"
          >
            {/* Platform mockup */}
            <div className="border border-white/10 rounded-2xl bg-white/[0.03] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6ee7a0]/60" />
                <div className="ml-4 h-5 flex-1 max-w-[200px] rounded bg-white/5" />
              </div>
              <div className="p-5 grid grid-cols-[1fr_2.2fr] gap-4">
                <div className="space-y-2.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded-lg ${i === 0 ? 'bg-[#6ee7a0]/20 border border-[#6ee7a0]/30' : 'bg-white/5'}`}
                    />
                  ))}
                </div>
                <div>
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-[#12271c] to-black border border-white/5 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-[#6ee7a0] flex items-center justify-center">
                      <Play size={18} className="text-black ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 rounded bg-white/10 w-2/3" />
                    <div className="h-2.5 rounded bg-white/5 w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
