import { motion } from 'framer-motion'
import { profile, vision } from '../../data/content'
import Reveal from '../ui/Reveal'

const EASE = [0.16, 1, 0.3, 1]
const rise = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}

export default function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative isolate overflow-hidden py-28 lg:py-40">
      {/* Gradient stage */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#0a1630] to-ink" />
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[70rem] max-w-none -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-[100%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.28),rgba(6,182,212,0.08)_60%,transparent)]" />
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>

      <div className="container-x text-center">
        <Reveal>
          <p className="mb-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" aria-hidden="true" />
            My Vision
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan" aria-hidden="true" />
          </p>
        </Reveal>

        <motion.h2
          id="vision-title"
          className="mx-auto max-w-5xl text-5xl font-semibold leading-[1] tracking-[-0.045em] sm:text-7xl lg:text-8xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <span className="block overflow-hidden pb-2">
            <motion.span className="block text-gradient" variants={rise}>
              {vision.heading[0]}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-4">
            <motion.span className="block font-serif font-normal italic tracking-[-0.02em] text-gradient-accent" variants={rise}>
              {vision.heading[1]}
            </motion.span>
          </span>
        </motion.h2>

        {/* Heartbeat divider */}
        <svg aria-hidden="true" viewBox="0 0 600 60" className="mx-auto mt-8 h-12 w-full max-w-xl">
          <motion.path
            d="M0 30 H250 L262 30 L272 8 L286 54 L298 16 L308 30 H600"
            fill="none"
            stroke="url(#vision-ecg)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="vision-ecg" x1="0" x2="600" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#22D3EE" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mx-auto mt-8 max-w-2xl space-y-5">
          {vision.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className={i === 0 ? 'text-lg leading-relaxed text-fg/85 sm:text-xl' : 'text-base leading-relaxed text-muted sm:text-lg'}>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <ul className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-2.5" aria-label="Core values">
            {vision.values.map((v) => (
              <li key={v} className="glass rounded-full px-4 py-2 text-sm text-fg/85">
                {v}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Design philosophy */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {profile.philosophy.map((p, i) => (
            <Reveal key={p.lead} delay={0.08 * i} className="h-full">
              <div className="h-full bg-ink/80 px-6 py-8 backdrop-blur-sm sm:py-10">
                <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                <p className="mt-3 text-lg leading-snug text-muted">
                  <span className="font-serif text-3xl italic text-fg">{p.lead}</span>
                  <br />
                  {p.rest}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
