import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import AppleLogo from './AppleLogo'
import ScrambleText from './ScrambleText'
import SquashHamburger from './SquashHamburger'
import { scrollToId } from '../lib/scrollTo'

interface NavbarProps {
  entranceComplete: boolean
}

const menuSpring = { type: 'spring' as const, stiffness: 350, damping: 28 }

function NavLink({
  label,
  onClick,
  className = 'text-[16px]',
}: {
  label: string
  onClick: () => void
  className?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-normal text-white/85 hover:text-white transition-colors whitespace-nowrap ${className}`}
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  )
}

function DownloadButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      className={`${
        mobile ? 'h-9 px-3.5 text-[13px]' : 'h-12 px-6 text-[16px]'
      } bg-white rounded-full text-black font-normal flex items-center gap-2 whitespace-nowrap`}
    >
      <AppleLogo size={mobile ? 12 : 14} />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.button>
  )
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center px-4 sm:px-6 md:px-8"
    >
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            className="flex h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] items-center gap-2.5 cursor-pointer"
          >
            <Logo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">Dev Club</span>
          </motion.div>

          <div className="h-12 px-5 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center gap-6">
            <NavLink label="About" onClick={() => scrollToId('about')} />
            <NavLink label="Metrics" onClick={() => scrollToId('metrics')} />
          </div>
        </div>

        <DownloadButton />
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between w-full gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <motion.div
            animate={{ width: mobileMenuOpen ? 0 : 'auto' }}
            transition={menuSpring}
            className="h-9 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center overflow-hidden shrink-0"
          >
            <div className="flex items-center gap-2 px-3.5 shrink-0">
              <Logo size={14} className="text-white" />
              <span className="text-[13px] font-medium tracking-tight text-white">Dev Club</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ width: mobileMenuOpen ? '100%' : 36 }}
            transition={menuSpring}
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          >
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`flex items-center justify-center shrink-0 transition-colors ${
                mobileMenuOpen
                  ? 'w-7 h-7 rounded-[8px] bg-white/10 ml-1'
                  : 'w-9 h-9 rounded-[10px]'
              }`}
            >
              <SquashHamburger isOpen={mobileMenuOpen} mobile />
            </button>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-4 pl-3"
              >
                <NavLink label="About" onClick={() => scrollToId('about')} className="text-[13px]" />
                <NavLink
                  label="Metrics"
                  onClick={() => scrollToId('metrics')}
                  className="text-[13px]"
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.nav>
  )
}
