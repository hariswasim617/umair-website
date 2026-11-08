import { motion } from 'framer-motion'
import { Award, BadgeCheck } from 'lucide-react'
import { certifications } from '../../data/content'
import Icon from '../ui/Icon'
import { fadeUp, stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Spotlight, { hexToRgb } from '../ui/Spotlight'

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certs-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="certs-title"
          eyebrow="Certifications & Additional Learning"
          title={['Learning Beyond the', 'Classroom']}
          align="center"
        />

        <motion.ul
          className="grid gap-5 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certifications.map((c) => {
            const rgb = hexToRgb(c.accent)
            return (
              <motion.li key={c.title} variants={fadeUp}>
                <Spotlight
                  color={rgb}
                  className="card h-full p-2 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-white/15"
                >
                  {/* certificate inner frame */}
                  <div className="relative flex h-full flex-col rounded-[1.1rem] border border-dashed border-white/[0.09] p-6 sm:p-7">
                    {['left-2 top-2 border-l border-t', 'right-2 top-2 border-r border-t', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((pos) => (
                      <span key={pos} aria-hidden="true" className={`absolute size-3 rounded-[2px] ${pos}`} style={{ borderColor: c.accent }} />
                    ))}

                    <div className="flex items-start justify-between">
                      <span
                        className="flex size-14 items-center justify-center rounded-full ring-1 ring-inset"
                        style={{ background: `radial-gradient(circle at 30% 30%, rgba(${rgb},0.3), rgba(${rgb},0.06))`, color: c.accent, '--tw-ring-color': `rgba(${rgb},0.35)` }}
                      >
                        <Icon name={c.icon} className="size-6" strokeWidth={1.6} />
                      </span>
                      <Award className="size-5 text-subtle transition-colors duration-500 group-hover/spot:text-fg/60" aria-hidden="true" />
                    </div>

                    <h3 className="mt-8 font-serif text-[1.85rem] leading-tight text-fg">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{c.description}</p>

                    <div className="mt-auto pt-8">
                      <div aria-hidden="true" className="mb-5 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      {c.status ? (
                        <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: c.accent }}>
                          <BadgeCheck className="size-4" aria-hidden="true" />
                          {c.status}
                        </span>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.16em] text-subtle">Additional learning</span>
                      )}
                    </div>
                  </div>
                </Spotlight>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
