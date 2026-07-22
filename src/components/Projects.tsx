import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface Project {
  title: string
  image: string
  ratio: number
}

// Three independent column stacks, mirroring academyskills.design's "Projetos
// dos alunos": each column keeps its own real-aspect-ratio cards with a fixed
// gap between them, with zero leveling across columns — a card only ever
// respects the one directly above it in its own column. The initial cascade
// (center high, sides low) is a manual offset on each column, not derived
// from image height — same as the reference, confirmed by measuring it live.
const LEFT_COLUMN: Project[] = [
  { title: 'Clone SpaceX', image: '/projects/spacex.jpg', ratio: 1920 / 6631 },
  { title: 'Site Institucional Lamborghini', image: '/projects/lamborghini.jpg', ratio: 1920 / 6467 },
]
const CENTER_COLUMN: Project[] = [
  { title: 'Clone Oficial da F1', image: '/projects/formula1.jpg', ratio: 1920 / 6134 },
  { title: 'SaaS Lecion — IA para Professores', image: '/projects/lecion.jpg', ratio: 1920 / 7981 },
]
const RIGHT_COLUMN: Project[] = [
  { title: 'Clone da HBO Max', image: '/projects/hbomax.jpg', ratio: 1920 / 4986 },
  { title: 'Clone Red Bull', image: '/projects/redbull.jpg', ratio: 1920 / 8349 },
]

function ShowcaseCard({ title, image, ratio }: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ aspectRatio: ratio }}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </motion.div>
  )
}

// The trailing placeholder at the bottom of each column — transparent, no
// bottom border at all, and a mask fading the top/side borders out toward
// the bottom edge, so the box reads as trailing off into more rather than
// hitting a hard stop.
function GhostCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
      }}
      className="w-full h-[200px] sm:h-[240px] rounded-t-2xl border-t border-l border-r border-white/10 bg-transparent"
    />
  )
}

function ProjectColumn({
  items,
  offset,
  parallax,
  mobileHidden,
}: {
  items: Project[]
  offset: string
  parallax: MotionValue<number>
  mobileHidden?: boolean
}) {
  return (
    <motion.div
      style={{ y: parallax }}
      className={`flex-1 min-w-0 ${mobileHidden ? 'hidden sm:flex' : 'flex'} flex-col gap-8 ${offset}`}
    >
      {items.map((project) => (
        <ShowcaseCard key={project.title} {...project} />
      ))}
      <GhostCard />
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

        {/* Three independent column stacks — center starts highest (no
            offset), right sits a bit lower, left lower still. Each column
            then just stacks its own cards with a fixed 32px gap, unrelated
            to what the other columns are doing. */}
        <div
          ref={rowRef}
          className="mt-16 sm:mt-20 w-full flex flex-col sm:flex-row items-stretch gap-10 sm:gap-6 md:gap-8"
        >
          <ProjectColumn items={LEFT_COLUMN} offset="sm:mt-28 md:mt-32" parallax={sideY} />
          <ProjectColumn items={CENTER_COLUMN} offset="" parallax={centerY} mobileHidden />
          <ProjectColumn items={RIGHT_COLUMN} offset="sm:mt-20 md:mt-24" parallax={sideY} mobileHidden />
        </div>
      </div>
    </section>
  )
}
