interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
  }

  return (
    <div
      className={`rounded-full border-gray-200 border-t-yellow-400 animate-spin ${sizes[size]} ${className}`}
      role="status"
      aria-label="Cargando"
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="lg" />
      <p className="text-gray-400 text-sm">Cargando...</p>
    </div>
  )
}
