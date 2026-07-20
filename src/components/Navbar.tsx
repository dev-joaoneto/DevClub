import { motion } from 'framer-motion'

interface NavbarProps {
  entranceComplete: boolean
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8"
    />
  )
}
