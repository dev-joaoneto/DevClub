import { motion } from 'framer-motion'
import { Bot, Sparkles, Brain, Image, MessageSquare, Zap } from 'lucide-react'
import { scrollToId } from '../lib/scrollTo'

const AI_MODELS = [
  { name: 'ChatGPT', Icon: MessageSquare },
  { name: 'Claude', Icon: Sparkles },
  { name: 'Gemini', Icon: Brain },
  { name: 'Midjourney', Icon: Image },
  { name: 'Llama', Icon: Bot },
  { name: 'Grok', Icon: Zap },
]

const TECHNOLOGIES = [
  'Python',
  'Pandas',
  'React',
  'SQL',
  'Docker',
  'TypeScript',
  'Node.js',
  'Figma',
  'Git',
  'AWS',
]

export default function AISection() {
  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(24px,4vw,44px)] leading-[1.2] tracking-[-0.02em] max-w-4xl mx-auto"
        >
          Aprenda as <span className="text-[#6ee7a0]">PRINCIPAIS</span> Tecnologias do Mercado — Do{' '}
          <span className="text-[#6ee7a0]">ZERO</span>, de forma Didática com os{' '}
          <span className="text-[#6ee7a0]">MELHORES</span> do Mercado
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="mt-16 border border-white/10 bg-white/[0.03] rounded-2xl p-8 sm:p-12"
        >
          <span className="text-[12px] tracking-[0.25em] uppercase text-[#6ee7a0]">
            ► IAs Ilimitadas
          </span>

          <h3 className="mt-4 text-white font-light text-[clamp(22px,3.5vw,36px)] leading-[1.2] tracking-[-0.02em] max-w-xl">
            Modelos realmente ilimitados, sem créditos, sem travas
          </h3>

          <div className="mt-8 flex flex-wrap gap-3">
            {AI_MODELS.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex items-center gap-2.5 border border-white/10 bg-black rounded-xl px-4 py-2.5"
              >
                <Icon size={16} className="text-[#6ee7a0]" />
                <span className="text-white/80 text-[13px]">{name}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-2xl">
            Você não deveria se preocupar com crédito ou limite quando precisa entregar um trabalho
            melhor. Na Adapta, você tem acesso a todos os modelos de forma ilimitada — você não
            precisa comprar créditos e seu chat nunca trava no meio da conversa.
          </p>

          <motion.button
            onClick={() => scrollToId('guarantee')}
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 h-12 px-6 bg-white text-black rounded-full text-[14px] font-medium flex items-center gap-2"
          >
            Quero Fazer Parte <span aria-hidden>→</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4"
        >
          {TECHNOLOGIES.map((tech) => (
            <span key={tech} className="text-white/30 text-[14px] sm:text-[16px] tracking-wide">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
