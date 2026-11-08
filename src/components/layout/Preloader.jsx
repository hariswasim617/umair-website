import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Monogram } from '../ui/Logo'

/** Brief branded intro. Never blocks for more than ~1.3s. */
export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 150 : 1150)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Monogram className="size-14" />
            </motion.div>
            <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-cyan"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <motion.p
              className="text-[0.7rem] font-medium tracking-[0.4em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              MUHAMMAD UMAIR
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
