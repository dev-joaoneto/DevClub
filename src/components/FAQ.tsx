import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Headset, MessageCircle, Plus } from 'lucide-react'

const QUESTIONS = [
  {
    q: 'É pra iniciante ou precisa de repertório?',
    a: 'É para os dois. As trilhas partem do zero absoluto — lógica de programação, HTML, CSS — e avançam até projetos completos de Front-End, Back-End, Full Stack e Mobile. Você entra no ponto em que estiver e segue no seu ritmo.',
  },
  {
    q: 'Eu já trabalho como programador, esse curso vale a pena para mim?',
    a: 'Sim. Além das trilhas de programação, você tem Claude & Claude Code, automações com N8N, Análise de Dados, Power BI e acesso ilimitado às principais IAs do mercado — conteúdo pensado também pra quem já está no mercado e quer acelerar a entrega.',
  },
  {
    q: 'O curso tem certificado?',
    a: 'Sim. Ao concluir cada trilha você recebe um certificado digital oficial, e a Dev Club é reconhecida pelo MEC.',
  },
  {
    q: 'Por quanto tempo tenho acesso?',
    a: 'Enquanto sua assinatura estiver ativa, você tem acesso completo a todas as trilhas, à comunidade, às mentorias semanais, à área de vagas exclusivas e às IAs ilimitadas — incluindo todas as atualizações futuras.',
  },
  {
    q: 'Como funciona a garantia?',
    a: 'Você tem 7 dias de garantia incondicional: se a Dev Club não for pra você, é só pedir o reembolso dentro do prazo e devolvemos 100% do valor, sem burocracia.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-white font-medium text-[clamp(26px,4.5vw,48px)] tracking-[-0.02em]"
        >
          Perguntas <span className="text-[#6ee7a0]">frequentes</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="border border-white/10 bg-white/[0.03] rounded-2xl p-7 md:sticky md:top-28"
          >
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1f4736, #6ee7a0)' }}
            >
              <Headset size={22} className="text-black" />
            </span>
            <p className="mt-5 text-white/70 text-[14px] leading-relaxed">
              Se ainda estiver com dúvidas, nossa equipe está à disposição:
            </p>
            <motion.button
              onClick={() => window.open('https://w.app/crtgeh', '_blank', 'noopener noreferrer')}
              initial={{ opacity: 0, y: 30 }}
              
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 h-11 px-5 w-full bg-[#25D366] text-black rounded-full text-[13px] font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> Falar com o suporte (WhatsApp)
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-3"
          >
            {QUESTIONS.map(({ q, a }, i) => {
              const isOpen = open === i
              return (
                <div
                  key={q}
                  className="border border-white/10 bg-white/[0.03] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-white/85 text-[14px] sm:text-[15px]">{q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="shrink-0 text-[#6ee7a0]"
                    >
                      <Plus size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-6 text-white/50 text-[13.5px] leading-relaxed">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
