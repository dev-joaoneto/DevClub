import { motion } from 'framer-motion'

const SALARIES = [
  { level: 'Product Designer Júnior', br: 4500, intl: 9500 },
  { level: 'Product Designer Pleno', br: 8000, intl: 18000 },
  { level: 'Product Designer Sênior', br: 14000, intl: 32000 },
]

const MAX = 32000

const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export default function Market() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-light text-[clamp(26px,4.5vw,48px)] tracking-[-0.02em]"
        >
          O mercado <span className="text-[#6ee7a0]">paga bem?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-14 border border-white/10 bg-white/[0.03] rounded-2xl p-8 sm:p-10"
        >
          <div className="flex items-center gap-6 text-[12px] text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#6ee7a0]" /> Brasil (mensal)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#e87f7f]" /> Internacional (mensal)
            </span>
          </div>

          <div className="mt-8 space-y-8">
            {SALARIES.map(({ level, br, intl }, i) => (
              <div key={level}>
                <p className="text-white/75 text-[13px] sm:text-[14px] mb-3">{level}</p>
                <div className="space-y-2">
                  {[
                    { value: br, color: '#6ee7a0' },
                    { value: intl, color: '#e87f7f' },
                  ].map(({ value, color }) => (
                    <div key={color} className="flex items-center gap-3">
                      <div className="flex-1 h-6 rounded-md bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(value / MAX) * 100}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                          className="h-full rounded-md"
                          style={{ background: `linear-gradient(to right, ${color}55, ${color})` }}
                        />
                      </div>
                      <span className="w-24 text-right text-[12px] text-white/60 tabular-nums shrink-0">
                        {formatBRL(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[11px] text-white/30">
            * Valores médios de mercado, convertidos para reais. Fontes: pesquisas salariais 2026.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
