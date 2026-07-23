import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  LayoutDashboard,
  Route,
  Trophy,
  UsersRound,
} from 'lucide-react'

interface Slide {
  Icon: typeof Bot
  title: string
  text: string
  image: string
  route: string
}

const SLIDES: Slide[] = [
  {
    Icon: LayoutDashboard,
    title: 'Uma plataforma feita para você evoluir todos os dias',
    text: 'Acompanhe seu progresso, continue as aulas de onde parou e tenha uma visão completa da sua jornada — tudo em um painel pensado para te manter no ritmo certo.',
    image: '/platform/plataforma.jpg',
    route: '/plataforma',
  },
  {
    Icon: Route,
    title: 'Trilhas de carreira, não apenas cursos soltos',
    text: 'Cada curso faz parte de uma trilha construída para te levar de onde você está até onde quer chegar, com sequência lógica de aprendizado e formações completas por área.',
    image: '/platform/trilha.jpg',
    route: '/trilha',
  },
  {
    Icon: UsersRound,
    title: 'Uma comunidade que aprende — e evolui — junto com você',
    text: 'Troque experiências, tire dúvidas e comemore conquistas com centenas de alunos ativos todos os dias. Aqui, você nunca aprende sozinho.',
    image: '/platform/comunidade.jpg',
    route: '/comunidade',
  },
  {
    Icon: Bot,
    title: 'Agentes de IA especialistas, prontos para te ajudar',
    text: 'Do refactor de código ao debug de um stack trace complicado, os Club Agents ficam disponíveis 24h para acelerar seu aprendizado e destravar qualquer bloqueio técnico.',
    image: '/platform/club-agents.jpg',
    route: '/club-agents',
  },
  {
    Icon: Code2,
    title: 'Pratique de verdade, num ambiente feito para treinar',
    text: 'Aplique o que aprendeu em desafios práticos e exercícios reais, num playground pensado para transformar teoria em experiência de código.',
    image: '/platform/playground.jpg',
    route: '/playground',
  },
  {
    Icon: Trophy,
    title: 'Reconhecimento para quem se destaca',
    text: 'Os alunos mais dedicados ganham destaque na comunidade — colaboração, conquistas e evolução técnica reconhecidas por todo o Dev Club.',
    image: '/platform/mural.jpg',
    route: '/mural',
  },
]

const AUTOPLAY_MS = 6000

function MockupFrame({
  Icon,
  image,
  title,
  route,
}: {
  Icon: typeof Bot
  image: string
  title: string
  route: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-4 h-5 flex-1 max-w-[240px] rounded bg-white/5 flex items-center px-3">
          <span className="text-white/40 text-[11px] tracking-wide truncate">
            www.devclub.com<span className="text-white/60">{route}</span>
          </span>
        </div>
      </div>
      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        {!failed && (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover scale-[1.08]"
            onError={() => setFailed(true)}
          />
        )}
        {failed && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(155deg, #6ee7a03d 0%, #06070a 78%)' }}
          >
            <span className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#6ee7a0]/10 border border-[#6ee7a0]/25">
              <Icon size={28} className="text-[#6ee7a0]" strokeWidth={1.6} />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Platform() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Autoplay only runs while the section is actually on screen — no point
  // spending cycles animating a carousel the user has already scrolled past.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (hovered || !inView) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [hovered, inView, index])

  const goTo = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length)

  return (
    <section id="platform" ref={sectionRef} className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(24px,4vw,42px)] leading-[1.25] tracking-[-0.02em] max-w-4xl mx-auto"
        >
          Você terá acesso a uma plataforma moderna de aulas, nossa comunidade, área de vagas, IAs
          para acelerar seu progresso e tudo com suporte dos professores
        </motion.h2>

        <div
          className="relative mt-16 min-h-[610px] md:min-h-[430px] flex items-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 0%, #6ee7a014, transparent 70%)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative flex w-full flex-col md:flex-row items-center gap-10 md:gap-14"
            >
              <div className="flex-1">
                <span className="w-12 h-12 rounded-xl bg-[#6ee7a0]/10 flex items-center justify-center">
                  {(() => {
                    const Icon = SLIDES[index].Icon
                    return <Icon size={22} className="text-[#6ee7a0]" />
                  })()}
                </span>
                <h3 className="mt-5 text-white text-[20px] sm:text-[24px] font-normal leading-snug">
                  {SLIDES[index].title}
                </h3>
                <p className="mt-3 text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
                  {SLIDES[index].text}
                </p>
              </div>

              <div className="flex-[1.2] w-full">
                <MockupFrame
                  Icon={SLIDES[index].Icon}
                  image={SLIDES[index].image}
                  title={SLIDES[index].title}
                  route={SLIDES[index].route}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Slide anterior"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                className="p-1.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 h-1.5 bg-[#6ee7a0]' : 'w-1.5 h-1.5 bg-white/20'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Próximo slide"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
