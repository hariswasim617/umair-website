import { motion } from 'framer-motion'
import { interests } from '../../data/content'
import Icon from '../ui/Icon'
import { fadeUp, stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Spotlight, { hexToRgb } from '../ui/Spotlight'

export default function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-title" className="section">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          id="interests-title"
          eyebrow="Areas of Interest"
          title={['What Drives My', 'Curiosity']}
          lede="Four areas I keep returning to — inside the lecture hall and well beyond it."
        />

        <motion.ul
          className="grid gap-5 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {interests.map((it, i) => {
            const rgb = hexToRgb(it.accent)
            return (
              <motion.li key={it.title} variants={fadeUp} className="h-full">
                <Spotlight
                  color={rgb}
                  className="card h-full p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/15 sm:p-9"
                >
                  {/* Accent wash */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-24 -z-10 size-64 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover/spot:opacity-70"
                    style={{ background: `radial-gradient(closest-side, rgba(${rgb},0.35), transparent)` }}
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className="flex size-14 items-center justify-center rounded-2xl ring-1 ring-inset transition-transform duration-500 ease-out-expo group-hover/spot:scale-110 group-hover/spot:-rotate-6"
                      style={{ background: `rgba(${rgb},0.12)`, color: it.accent, '--tw-ring-color': `rgba(${rgb},0.3)` }}
                    >
                      <Icon name={it.icon} className="size-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight text-fg sm:text-[1.65rem]">{it.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {it.items.map((x) => (
                      <li key={x} className="flex items-center gap-3 text-[0.95rem] text-muted">
                        <span className="size-1.5 shrink-0 rounded-full" style={{ background: it.accent }} aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover/spot:scale-x-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${it.accent}, transparent)` }}
                  />
                </Spotlight>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
