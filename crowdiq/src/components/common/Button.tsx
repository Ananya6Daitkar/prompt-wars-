import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
}

const base = 'inline-flex items-center justify-center font-heading font-bold rounded-lg transition-all cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2'

const variants = {
  primary: 'bg-cyan text-obsidian hover:shadow-[0_0_24px_rgba(0,217,255,0.4)]',
  secondary: 'border-2 border-cyan text-cyan bg-transparent hover:bg-cyan/10',
  tertiary: 'text-cyan bg-transparent hover:underline',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  )
}
