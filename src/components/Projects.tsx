import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Project {
  title: string
  image: string
  ratio: number
}

// Left, center (featured), right — mirrors the reference: three upright
// screenshots, no rotation, no overlap. Center sits bigger and higher; the
// sides are smaller and pushed down, giving the row its rhythm. Each card's
// aspect-ratio matches its screenshot's real dimensions exactly, so the full
// page shows with zero cropping instead of a hero-only sliver.
const LEFT: Project = { title: 'Clone Oficial da F1', image: '/projects/formula1.png', ratio: 1920 / 6134 }
const CENTER: Project = {
  title: 'Site Institucional Lamborghini',
  image: '/projects/lamborghini.png',
  ratio: 1920 / 6467,
}
const RIGHT: Project = { title: 'Clone SpaceX', image: '/projects/spacex.png', ratio: 1920 / 6631 }

// The rest of the library, shown in a lower grid below the featured trio.
const MORE: Project[] = [
  { title: 'Clone da HBO Max', image: '/projects/hbomax.png', ratio: 1920 / 4986 },
  { title: 'SaaS Lecion — IA para Professores', image: '/projects/lecion.png', ratio: 1920 / 7981 },
  { title: 'Clone Red Bull', image: '/projects/redbull.png', ratio: 1920 / 8349 },
]

function ShowcaseCard({
  title,
  image,
  ratio,
  width,
  offset,
  parallax,
}: {
  title: string
  image: string
  ratio: number
  width: string
  offset: string
  parallax?: import('framer-motion').MotionValue<number>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -8 }}
      style={parallax ? { aspectRatio: ratio, y: parallax } : { aspectRatio: ratio }}
      className={`group relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)] ${width} ${offset}`}
    >
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-[13px] font-normal">{title}</p>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const rowRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  })

  // Subtle, delicate depth: the sides drift a touch more than the center,
  // so the row breathes gently as you scroll instead of sitting static.
  const sideY = useTransform(scrollYProgress, [0, 1], [26, -26])
  const centerY = useTransform(scrollYProgress, [0, 1], [10, -10])

  return (
    <section className="relative bg-black py-24 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em]"
        >
          Tudo com Projetos <span className="text-[#6ee7a0]">Práticos e Reais</span>
        </motion.h2>

        {/* Featured trio now shares the exact same track width as the MORE
            grid below — same container, same gap, equal flex-1 columns —
            so both rows of three line up card-for-card. */}
        <div
          ref={rowRef}
          className="mt-16 sm:mt-20 w-full flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-6 md:gap-8"
        >
          <ShowcaseCard
            title={LEFT.title}
            image={LEFT.image}
            ratio={LEFT.ratio}
            width="flex-1 min-w-0"
            offset="sm:mt-20 md:mt-24"
            parallax={sideY}
          />
          <ShowcaseCard
            title={CENTER.title}
            image={CENTER.image}
            ratio={CENTER.ratio}
            width="flex-1 min-w-0"
            offset=""
            parallax={centerY}
          />
          <ShowcaseCard
            title={RIGHT.title}
            image={RIGHT.image}
            ratio={RIGHT.ratio}
            width="flex-1 min-w-0"
            offset="sm:mt-20 md:mt-24"
            parallax={sideY}
          />
        </div>

        {/* Rest of the library — same card language, plain grid, no parallax. */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {MORE.map((project) => (
            <ShowcaseCard
              key={project.title}
              title={project.title}
              image={project.image}
              ratio={project.ratio}
              width="w-full"
              offset=""
            />
          ))}
        </div>

        {/* Closing frame — an empty card in the same border/radius language
            as the ones above, so the grid reads as trailing off into more
            rather than hitting a hard stop. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-6 sm:mt-8 h-[180px] sm:h-[220px] rounded-2xl border border-white/10 bg-white/[0.015]"
        />
      </div>
    </section>
  )
}
