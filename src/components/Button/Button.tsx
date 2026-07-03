import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const style =
    variant === 'secondary'
      ? 'border border-slate-300/20 bg-slate-900/50 text-slate-100 hover:bg-slate-800/70'
      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 shadow-lg shadow-slate-950/10 ${style} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
