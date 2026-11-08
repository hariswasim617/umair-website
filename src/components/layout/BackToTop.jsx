import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

/** Floating back-to-top button with a scroll progress ring. */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 700))

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-line bg-ink-2/80 text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:border-white/20 sm:bottom-8 sm:right-8"
        >
          <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <motion.circle
              cx="24"
              cy="24"
              r="22.5"
              fill="none"
              stroke="url(#btt-g)"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
            />
            <defs>
              <linearGradient id="btt-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
