import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import AppleLogo from './AppleLogo'
import ScrambleText from './ScrambleText'

interface NavbarProps {
  entranceComplete: boolean
}

function DownloadButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      className="h-9 sm:h-12 px-3.5 sm:px-6 text-[13px] sm:text-[16px] bg-white rounded-full text-black font-normal flex items-center gap-2 whitespace-nowrap"
    >
      <AppleLogo size={12} className="sm:hidden" />
      <AppleLogo size={14} className="hidden sm:block" />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.button>
  )
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8"
    >
      <motion.div
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
        whileTap={{ scale: 0.98 }}
        className="flex h-9 sm:h-12 px-3.5 sm:px-5 bg-white/15 backdrop-blur-md rounded-[14px] items-center gap-2 sm:gap-2.5 cursor-pointer"
      >
        <Logo size={14} className="text-white sm:hidden" />
        <Logo size={18} className="text-white hidden sm:block" />
        <span className="text-[13px] sm:text-[16px] font-medium tracking-tight text-white">
          Dev Club
        </span>
      </motion.div>

      <DownloadButton />
    </motion.nav>
  )
}
