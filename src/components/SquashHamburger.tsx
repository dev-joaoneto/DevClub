import { motion } from 'framer-motion'

interface SquashHamburgerProps {
  isOpen: boolean
  mobile?: boolean
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 20 }

export default function SquashHamburger({ isOpen, mobile = false }: SquashHamburgerProps) {
  const width = mobile ? 15 : 18
  const height = mobile ? 10 : 12
  const barHeight = mobile ? 1.2 : 1.5
  const center = height / 2 - barHeight / 2

  const barStyle = {
    position: 'absolute' as const,
    left: 0,
    width: '100%',
    height: barHeight,
    background: '#fff',
    borderRadius: 2,
  }

  return (
    <span style={{ position: 'relative', display: 'block', width, height }}>
      <motion.span
        style={{ ...barStyle, top: 0 }}
        animate={isOpen ? { y: center, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        style={{ ...barStyle, top: center }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        style={{ ...barStyle, top: height - barHeight }}
        animate={isOpen ? { y: -center, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
    </span>
  )
}
