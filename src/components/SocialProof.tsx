import { motion } from 'framer-motion'
import CountUp from './CountUp'

const COMPANIES = ['Facebook', 'Ambev', 'iFood', 'OAB', 'UFRJ', 'Brasil Paralelo', 'USP']

const BADGE_AVATARS: [string, string, string][] = [
  ['RB', '#1f4736', '#6ee7a0'],
  ['TS', '#243447', '#7fb4e8'],
  ['GA', '#43302a', '#e8a97f'],
]

const badgeVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.4, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
}

export default function SocialProof() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-28 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={badgeVariants}
          className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.04] rounded-full pl-2 pr-5 py-1.5"
        >
          <div className="flex pl-2">
            {BADGE_AVATARS.map(([initials, from, to]) => (
              <motion.span
                key={initials}
                variants={avatarVariants}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="w-7 h-7 -ml-2 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold text-white/90"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              >
                {initials}
              </motion.span>
            ))}
          </div>
          <motion.span
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.5 }}
            className="text-[12px] sm:text-[13px] text-white/70"
          >
            +<CountUp to={30} /> mil alunos já passaram por aqui
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="mt-8 text-white font-medium text-[clamp(28px,5vw,52px)] leading-[1.15] tracking-[-0.02em]"
        >
          +<CountUp to={25} /> mil alunos já passaram
          <br />
          por aqui
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-4 text-white/50 text-[14px] sm:text-[15px]"
        >
          Alunos nas maiores empresas do Brasil e do mundo:
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, delay: 0.45 }}
        className="mt-14 relative overflow-hidden group"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="marquee-track flex items-center gap-16 w-max pr-16 group-hover:[animation-play-state:paused]">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-white/35 text-[20px] sm:text-[24px] font-bold tracking-wide whitespace-nowrap transition-all duration-300 hover:text-[#6ee7a0] hover:scale-110"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
