import { useId } from 'react'

/** Monogram + wordmark. */
export function Monogram({ className = 'size-9' }) {
  const id = useId().replace(/:/g, '')
  const g = `mono-${id}`
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="39" rx="11" fill="#0E1626" stroke={`url(#${g})`} strokeOpacity="0.55" />
      <path
        d="M9.5 27V13.5l6.25 8.25L22 13.5V27"
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M25.5 13.5v8.25a4 4 0 0 0 8 0V13.5" fill="none" stroke="#F8FAFC" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      <Monogram />
      <span className="text-[0.8rem] font-semibold tracking-[0.2em] text-fg">
        MUHAMMAD <span className="text-muted">UMAIR</span>
      </span>
    </span>
  )
}
