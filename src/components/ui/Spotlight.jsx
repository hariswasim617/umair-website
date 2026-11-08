import { useRef } from 'react'

/**
 * Card wrapper that renders a soft radial highlight following the pointer.
 * Pure CSS variables — no re-renders on mouse move.
 */
export default function Spotlight({ children, className = '', color = '59,130,246', as: Cmp = 'div', ...rest }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Cmp ref={ref} onPointerMove={onMove} className={`group/spot relative isolate overflow-hidden ${className}`} {...rest}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(${color},0.14), transparent 60%)`,
        }}
      />
      {children}
    </Cmp>
  )
}

/** "#3B82F6" -> "59,130,246" */
export function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}
