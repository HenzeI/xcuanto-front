import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:
      'bg-yellow-400 text-black hover:bg-yellow-300 active:bg-yellow-500 focus:ring-yellow-400 focus:ring-offset-white shadow-sm',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-300 border border-gray-200',
    outline:
      'border-2 border-black text-black hover:bg-black hover:text-yellow-400 active:bg-gray-900 focus:ring-black',
    ghost:
      'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300',
    danger:
      'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus:ring-red-400',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
