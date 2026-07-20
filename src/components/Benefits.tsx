import { motion } from 'framer-motion'
import { Bot, Headphones, Users, Briefcase, Check } from 'lucide-react'
import { scrollToId } from '../lib/scrollTo'

const BENEFITS = [
  { Icon: Bot, text: 'Dezenas de Agentes de IA para te ajudar 24h por dia' },
  { Icon: Headphones, text: 'Suporte Humano 7 dias por semana' },
  { Icon: Users, text: 'A Maior e Melhor Comunidade de Profissionais de Tecnologia do Brasil' },
  { Icon: Briefcase, text: 'Vagas de Emprego Exclusivas' },
]

export default function Benefits() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BENEFITS.map(({ Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex items-start gap-4 border border-white/10 bg-white/[0.03] rounded-xl p-5"
            >
              <span className="shrink-0 w-9 h-9 rounded-lg bg-[#6ee7a0]/10 flex items-center justify-center">
                <Icon size={17} className="text-[#6ee7a0]" />
              </span>
              <p className="text-white/75 text-[13px] sm:text-[14px] leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="mt-24 text-center text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto"
        >
          Tudo que você precisa para aprender UI e UX do fundamento à prática
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="mt-14 relative border border-[#6ee7a0]/25 rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 90% at 85% 20%, rgba(110,231,160,0.10), transparent 60%)',
            }}
          />
          <div className="relative p-8 sm:p-12 flex flex-col md:flex-row md:items-center gap-10">
            <div className="flex-1">
              <span className="text-[12px] tracking-[0.25em] uppercase text-[#6ee7a0]">
                ► Framer Skills
              </span>
              <h3 className="mt-4 text-white font-light text-[clamp(22px,3.2vw,34px)] leading-[1.2] tracking-[-0.02em]">
                Publique sites avançados sem uma linha de código
              </h3>
              <p className="mt-4 text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-lg">
                Aprenda a transformar layouts em experiências reais usando Framer, do design à
                publicação.
              </p>
              <motion.button
                onClick={() => scrollToId('certifications')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 h-12 px-6 bg-[#6ee7a0] text-black rounded-full text-[14px] font-medium flex items-center gap-2"
              >
                Conhecer curso <span aria-hidden>»</span>
              </motion.button>
            </div>

            <div className="w-full md:w-72 shrink-0">
              <div className="border border-white/10 rounded-xl bg-black/60 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6ee7a0]/60" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-2.5 rounded bg-white/10 w-3/4" />
                  <div className="h-2.5 rounded bg-white/10 w-full" />
                  <div className="h-2.5 rounded bg-white/10 w-2/3" />
                  <div className="h-20 rounded-lg bg-gradient-to-br from-[#6ee7a0]/25 to-transparent border border-white/5 mt-4 flex items-center justify-center">
                    <Check size={22} className="text-[#6ee7a0]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
