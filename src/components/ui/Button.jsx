import { forwardRef } from 'react'

const base =
  'relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight transition-all duration-300 ease-out-expo focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-gradient-to-r from-accent to-cyan text-white shadow-[0_8px_30px_-8px_rgba(59,130,246,0.65)] hover:shadow-[0_12px_40px_-8px_rgba(6,182,212,0.7)] hover:-translate-y-0.5',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg backdrop-blur-md hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-fg',
}

/** Renders an <a> when `href` is given, otherwise a <button>. */
const Button = forwardRef(function Button({ href, variant = 'primary', className = '', children, ...props }, ref) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a ref={ref} href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button ref={ref} className={cls} {...props}>
      {children}
    </button>
  )
})

export default Button
