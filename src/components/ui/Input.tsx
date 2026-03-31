import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">{leftIcon}</span>
        )}
        <input
          id={inputId}
          className={[
            'w-full bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400',
            'transition-colors duration-200',
            error ? 'border-red-400' : 'border-gray-200 hover:border-gray-300',
            leftIcon ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            'py-2.5',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">{rightIcon}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
