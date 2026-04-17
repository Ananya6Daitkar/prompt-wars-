type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const styles: Record<BadgeVariant, string> = {
  success: 'bg-emerald/15 text-emerald border-emerald/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  error: 'bg-error/15 text-error border-error/30',
  info: 'bg-cyan/15 text-cyan border-cyan/30',
  neutral: 'bg-gray-dark/60 text-soft-white/70 border-white/10',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'info', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
