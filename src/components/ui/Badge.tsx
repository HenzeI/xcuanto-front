interface BadgeProps {
  variant?: 'default' | 'yellow' | 'green' | 'blue' | 'orange' | 'red' | 'purple'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-600 border border-gray-200',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    orange: 'bg-orange-50 text-orange-700 border border-orange-200',
    red: 'bg-red-50 text-red-700 border border-red-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
