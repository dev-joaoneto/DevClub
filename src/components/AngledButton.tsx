import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface AngledButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'solid' | 'outline'
  icon?: ReactNode
  className?: string
}

const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)'

export default function AngledButton({
  children,
  onClick,
  variant = 'solid',
  icon,
  className = '',
}: AngledButtonProps) {
  const variantClass =
    variant === 'solid' ? 'bg-[#6ee7a0] text-black' : 'border border-white/30 text-white bg-transparent'

  return (
    <motion.button
      onClick={onClick}
      whileHover={variant === 'solid' ? { scale: 1.03, backgroundColor: '#8ef0b6' } : { scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
      whileTap={{ scale: 0.97 }}
      style={{ clipPath: CLIP }}
      className={`h-12 pl-5 pr-6 text-[14px] font-medium flex items-center gap-2 whitespace-nowrap ${variantClass} ${className}`}
    >
      {icon}
      {children}
      <ChevronRight size={15} strokeWidth={2.5} aria-hidden />
    </motion.button>
  )
}
