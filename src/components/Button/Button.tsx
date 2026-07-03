import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const style =
    variant === 'secondary'
      ? 'border border-[#810B38] bg-transparent text-[#810B38] hover:bg-[#810B38] hover:text-white'
      : 'bg-[#810B38] text-white hover:bg-[#541A1A]'

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-lg shadow-[rgba(129,11,56,0.1)] ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
