import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  active?: boolean
}

export default function Card({ children, className = '', hover = true, onClick, active }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(0,217,255,0.25)' } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`
        rounded-xl p-6 backdrop-blur-sm
        bg-navy/60 border border-cyan/10
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${active ? 'border-cyan/40 shadow-[0_0_20px_rgba(0,217,255,0.15)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
