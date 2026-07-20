import { motion } from 'framer-motion'
import { Play, Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto"
        >
          Milhares de vidas <span className="text-[#6ee7a0]">TRANSFORMADAS</span> dentro da nossa
          Comunidade
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="mt-14 border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between gap-10">
            <div>
              <Quote size={28} className="text-[#6ee7a0]" />
              <p className="mt-6 text-white/80 text-[16px] sm:text-[19px] leading-relaxed font-light">
                "Depois de otimizar meu fluxo com o Framer, minha produtividade aumentou muito. Hoje
                entrego projetos em metade do tempo e com muito mais qualidade — a comunidade fez
                toda a diferença no processo."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold text-white/90"
                style={{ background: 'linear-gradient(135deg, #1f4736, #6ee7a0)' }}
              >
                VT
              </span>
              <div>
                <p className="text-white text-[14px]">Vicente Talento</p>
                <p className="text-white/40 text-[12px]">Product Designer</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/5 shrink-0 min-h-[260px] relative bg-gradient-to-br from-[#12271c] to-black border-t md:border-t-0 md:border-l border-white/10 flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '22px 22px',
                opacity: 0.05,
              }}
            />
            <motion.span
              whileHover={{ scale: 1.08 }}
              className="w-16 h-16 rounded-full bg-[#6ee7a0] flex items-center justify-center cursor-pointer"
            >
              <Play size={22} className="text-black ml-1" fill="currentColor" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
