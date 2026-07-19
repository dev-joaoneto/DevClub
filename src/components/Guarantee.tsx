import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const STEPS = [
  { num: '01', text: 'Compre hoje' },
  { num: '02', text: 'Use por 7 dias' },
  { num: '03', text: 'Não gostou? Receba 100% de volta' },
]

export default function Guarantee() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="border border-white/10 bg-white/[0.03] rounded-2xl p-8 sm:p-10 flex flex-col"
        >
          <span className="text-[12px] tracking-[0.25em] uppercase text-[#6ee7a0]">
            ► Risco zero pra você
          </span>
          <h3 className="mt-4 text-white font-light text-[clamp(22px,3.2vw,32px)] leading-[1.2] tracking-[-0.02em]">
            7 dias de garantia incondicional
          </h3>
          <p className="mt-4 text-white/50 text-[14px] leading-relaxed">
            Você tem até 7 dias depois da sua matrícula para explorar todos os cursos, a
            comunidade e as IAs. Se não for pra você, é só pedir reembolso.
          </p>

          <div className="mt-8 space-y-4">
            {STEPS.map(({ num, text }) => (
              <div key={num} className="flex items-center gap-4 border-t border-white/10 pt-4">
                <span className="text-[#6ee7a0] text-[13px] tracking-wide">{num}.</span>
                <span className="text-white/75 text-[14px]">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="rounded-2xl p-8 sm:p-10 bg-[#6ee7a0] text-black flex flex-col justify-between gap-10"
        >
          <div>
            <h3 className="font-medium text-[clamp(22px,3.2vw,32px)] leading-[1.2] tracking-[-0.02em]">
              E se eu não curtir?
            </h3>
            <p className="mt-4 text-black/70 text-[14px] sm:text-[15px] leading-relaxed">
              Sem burocracia e sem questionamentos: dentro dos 7 dias, você pede o reembolso e
              recebe cada centavo de volta, integralmente. O risco é todo nosso — a decisão é toda
              sua.
            </p>
          </div>
          <ShieldCheck size={72} strokeWidth={1.4} className="self-end text-black/80" />
        </motion.div>
      </div>
    </section>
  )
}
