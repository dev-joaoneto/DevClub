import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const INSTRUCTORS = [
  {
    name: 'Rodolfo Mori',
    role: 'Fundador DevClub',
    initials: 'RM',
    from: '#1f4736',
    to: '#6ee7a0',
    photo: '/instructors/rodolfo-mori.jpg',
  },
  {
    name: 'Fernanda',
    role: 'Recrutadora',
    initials: 'FE',
    from: '#243447',
    to: '#7fb4e8',
    photo: '/instructors/fernanda.jpg',
  },
  {
    name: 'Agustinho',
    role: 'Software Engineer',
    initials: 'AG',
    from: '#43302a',
    to: '#e8a97f',
    photo: '/instructors/augustinho.jpg',
  },
  {
    name: 'Henrique',
    role: 'Desenvolvedor Full Stack',
    initials: 'HE',
    from: '#3a2a43',
    to: '#c77fe8',
    photo: '/instructors/henrique.jpg',
  },
  {
    name: 'Márcio',
    role: 'Terapeuta',
    initials: 'MR',
    from: '#3d3320',
    to: '#e8d47f',
    photo: '/instructors/marcio.jpg',
  },
  {
    name: 'Juliana',
    role: 'Designer UI/UX Sênior',
    initials: 'JU',
    from: '#431f2e',
    to: '#e87fb8',
    photo: '/instructors/juliana.jpg',
  },
  {
    name: 'Mateus',
    role: 'Software Developer',
    initials: 'MT',
    from: '#1f3d3d',
    to: '#7fe8e0',
    photo: '/instructors/mateus.jpg',
  },
]

// Photo fills the whole square instead of floating as a small circle —
// falls back to the gradient + initials treatment if the file fails to load.
function InstructorPhoto({
  photo,
  name,
  initials,
  from,
  to,
}: {
  photo: string
  name: string
  initials: string
  from: string
  to: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="relative aspect-square overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${from}, #000 90%)` }}
    >
      {!failed ? (
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="w-20 h-20 rounded-full flex items-center justify-center text-[22px] font-bold text-white/90"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Instructors() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-black py-24 sm:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.15] tracking-[-0.02em]"
          >
            Aprenda com os <span className="text-[#6ee7a0]">Melhores</span>
          </motion.h2>

          <div className="flex gap-2 shrink-0">
            {[
              { Icon: ChevronLeft, dir: -1 as const, label: 'Anterior' },
              { Icon: ChevronRight, dir: 1 as const, label: 'Próximo' },
            ].map(({ Icon, dir, label }) => (
              <motion.button
                key={label}
                aria-label={label}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll(dir)}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white"
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
        >
          <div
            ref={trackRef}
            className="mt-12 flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory sm:snap-none px-[7.5%] sm:px-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {INSTRUCTORS.map(({ name, role, initials, from, to, photo }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="w-[85%] sm:w-60 shrink-0 snap-center border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]"
              >
                <InstructorPhoto photo={photo} name={name} initials={initials} from={from} to={to} />
                <div className="p-5">
                  <p className="text-white text-[15px]">{name}</p>
                  <p className="mt-1 text-[#6ee7a0] text-[12.5px]">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
