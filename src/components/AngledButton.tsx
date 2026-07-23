import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface AngledButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  variant?: 'solid' | 'outline'
  icon?: ReactNode
  className?: string
  type?: 'button' | 'submit'
}

export default function AngledButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'solid',
  icon,
  className = '',
  type = 'button',
}: AngledButtonProps) {
  const variantClass =
    variant === 'solid' ? 'btn-sheen cta-sheen' : 'border border-white/30 text-white bg-transparent'

  const commonProps = {
    whileHover: variant === 'solid' ? { scale: 1.03 } : { scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' },
    whileTap: { scale: 0.97 },
    className: `h-12 pl-5 pr-6 rounded-full text-[14px] font-medium flex items-center gap-2 whitespace-nowrap ${variantClass} ${className}`
  }

  const innerContent = (
    <>
      {icon}
      {children}
      <ChevronRight size={15} strokeWidth={2.5} aria-hidden />
    </>
  )

  if (href) {
    // Tratamento de segurança recomendado pelo React ao usar target="_blank"
    const safeRel = target === '_blank' ? rel || 'noopener noreferrer' : rel

    return (
      <motion.a 
        href={href} 
        target={target} // <-- Repassamos para a tag
        rel={safeRel}   // <-- Repassamos para a tag
        onClick={onClick} 
        {...commonProps}
      >
        {innerContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...commonProps}
    >
      {innerContent}
    </motion.button>
  )
}