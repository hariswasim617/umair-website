import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Fades & lifts children into view once when scrolled into the viewport. */
export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div', amount = 0.25 }) {
  const Cmp = motion[as] ?? motion.div
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Cmp>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export { EASE }
