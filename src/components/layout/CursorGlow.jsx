import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import useFinePointer from '../../hooks/useFinePointer'

/** A soft light that trails the cursor on desktop. Hidden on touch & reduced motion. */
export default function CursorGlow() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.07),transparent)]"
      style={{ x: sx, y: sy }}
    />
  )
}
