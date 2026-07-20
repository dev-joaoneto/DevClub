import { motion } from 'framer-motion'
import { Award, BadgeCheck } from 'lucide-react'
import Logo from './Logo'

const CERTIFICATES = ['Framer Skills', 'UI Skills']

export default function Certifications() {
  return (
    <section id="certifications" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#6ee7a0]">
            <BadgeCheck size={15} /> Reconhecimento real para quem conclui e evolui
          </span>
          <h2 className="mt-5 text-white font-light text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto">
            Escola Reconhecida pelo MEC e com Diplomas Oficiais
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {CERTIFICATES.map((course, i) => (
            <motion.div
              key={course}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="border border-white/10 bg-white/[0.03] rounded-2xl p-3"
            >
              <div className="border border-[#6ee7a0]/20 rounded-xl p-8 text-left relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 80% at 100% 0%, rgba(110,231,160,0.08), transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Logo size={16} className="text-white/70" />
                      <span className="text-white/70 text-[12px] font-medium tracking-tight">
                        Dev Club
                      </span>
                    </div>
                    <Award size={22} className="text-[#6ee7a0]" />
                  </div>
                  <p className="mt-8 text-[11px] tracking-[0.2em] uppercase text-white/40">
                    Certificado Oficial
                  </p>
                  <h3 className="mt-2 text-white text-[22px] font-light">{course}</h3>
                  <div className="mt-8 flex items-end justify-between">
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-24 rounded bg-white/10" />
                      <div className="h-1.5 w-16 rounded bg-white/10" />
                    </div>
                    <span className="text-[10px] text-white/30 tracking-wide">MEC · Nº 0{i + 1}482</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
