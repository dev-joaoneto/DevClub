import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  handle: string
  initials: string
  from: string
  to: string
  photo: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Entrei sem saber nada de código e em 4 meses já estava criando interfaces com React que antes eu só admirava em outros sites. A trilha de Front End foi direta ao ponto — sem enrolação, só prática.',
    name: 'Rafael Nogueira',
    handle: '@rafanogueira.dev',
    initials: 'RN',
    from: '#1f4736',
    to: '#6ee7a0',
    photo: '/testimonials/rafael-nogueira.jpg',
  },
  {
    quote:
      'Modelar banco de dados e construir uma API do zero parecia bicho de sete cabeças até eu entrar na trilha de Back End. Hoje já entreguei meu primeiro projeto freelancer usando Node.js.',
    name: 'Camila Duarte',
    handle: '@camiladuarte.ti',
    initials: 'CD',
    from: '#243447',
    to: '#7fb4e8',
    photo: '/testimonials/camila-duarte.jpg',
  },
  {
    quote:
      'Sempre quis lançar um app e não sabia por onde começar. Com React Native e o passo a passo das aulas, publiquei meu primeiro aplicativo na Play Store em menos de 3 meses.',
    name: 'Thiago Ramos',
    handle: '@thiago.codes',
    initials: 'TR',
    from: '#3a2a43',
    to: '#c77fe8',
    photo: '/testimonials/thiago-ramos.jpg',
  },
  {
    quote:
      'Aprender a programar COM o Claude Code mudou meu ritmo de vez. Reviso, refatoro e entrego em uma fração do tempo — hoje uso IA como parte natural do meu fluxo de trabalho.',
    name: 'Beatriz Lopes',
    handle: '@bia.codes',
    initials: 'BL',
    from: '#3d2418',
    to: '#d97757',
    photo: '/testimonials/beatriz-lopes.jpg',
  },
]

function PersonAvatar({
  name,
  photo,
  initials,
  from,
  to,
}: {
  name: string
  photo: string
  initials: string
  from: string
  to: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className="relative w-10 h-10 text-[11px] rounded-full overflow-hidden flex items-center justify-center font-bold text-white/90 shrink-0"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {!failed && (
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && initials}
    </span>
  )
}

// The right-hand panel — the photo fills the whole space instead of sitting
// in a small circle. The gradient + dot texture stay underneath as the
// fallback look if the photo fails to load.
function PhotoPanel({ photo, name, from }: { photo: string; name: string; from: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="md:w-2/5 shrink-0 min-h-[260px] relative overflow-hidden border-t md:border-t-0 md:border-l border-white/10"
      style={{ background: `linear-gradient(150deg, ${from}, #000 90%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.05,
        }}
      />
      {!failed && (
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

const SWIPE_VELOCITY_THRESHOLD = 400
const SWIPE_OFFSET_THRESHOLD = 80

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (next: number) => setIndex(Math.max(0, Math.min(TESTIMONIALS.length - 1, next)))

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
      goTo(index + 1)
    } else if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
      goTo(index - 1)
    }
  }

  const progress = ((index + 1) / TESTIMONIALS.length) * 100

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
          className="relative mt-14"
        >
          {/* Edge fades — signal there's more to swipe to without peeking cards. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 z-10 bg-gradient-to-r from-black to-transparent rounded-l-2xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 z-10 bg-gradient-to-l from-black to-transparent rounded-r-2xl" />

          {/* Desktop arrows flank the card itself. Hidden on mobile — there's
              no room beside a full-width card, so the mobile pair lives next
              to the scroll line instead. */}
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 lg:-left-14 z-20 w-11 h-11 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => goTo(index + 1)}
            disabled={index === TESTIMONIALS.length - 1}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 lg:-right-14 z-20 w-11 h-11 rounded-full border border-white/15 bg-black/50 backdrop-blur-sm items-center justify-center text-white/80 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors disabled:opacity-25 disabled:pointer-events-none"
          >
            <ChevronRight size={18} />
          </button>

          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 bg-white/[0.03] flex flex-col md:flex-row">
                  <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between gap-10">
                    <div>
                      <Quote size={28} className="text-[#6ee7a0]" />
                      <p className="mt-6 text-white/80 text-[16px] sm:text-[19px] leading-relaxed font-light">
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <PersonAvatar name={t.name} photo={t.photo} initials={t.initials} from={t.from} to={t.to} />
                      <div>
                        <p className="text-white text-[14px]">{t.name}</p>
                        <p className="text-white/40 text-[12px]">{t.handle}</p>
                      </div>
                    </div>
                  </div>

                  <PhotoPanel photo={t.photo} name={t.name} from={t.from} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Thin scroll line — same mint gradient as the header's reading-progress hairline.
              On mobile, where the side arrows don't fit beside the card, the same
              prev/next controls sit right next to the line instead. */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Depoimento anterior"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="flex md:hidden w-7 h-7 shrink-0 rounded-full border border-white/15 items-center justify-center text-white/70 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors disabled:opacity-25 disabled:pointer-events-none"
            >
              <ChevronLeft size={13} />
            </button>

            <div className="h-[2px] w-full max-w-[220px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #1f4736, #6ee7a0 50%, #1f4736)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <button
              type="button"
              aria-label="Próximo depoimento"
              onClick={() => goTo(index + 1)}
              disabled={index === TESTIMONIALS.length - 1}
              className="flex md:hidden w-7 h-7 shrink-0 rounded-full border border-white/15 items-center justify-center text-white/70 hover:text-[#6ee7a0] hover:border-[#6ee7a0]/40 transition-colors disabled:opacity-25 disabled:pointer-events-none"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
