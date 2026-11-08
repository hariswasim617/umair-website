import { motion } from 'framer-motion'
import { skills } from '../../data/content'
import Icon from '../ui/Icon'
import { fadeUp, stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Spotlight, { hexToRgb } from '../ui/Spotlight'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-2/60 to-transparent" />
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title={['Skills &', 'Abilities']}
          lede="A blend of academic discipline, communication and hands-on digital craft."
        />

        <motion.div
          className="grid gap-5 lg:grid-cols-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((group) => {
            const rgb = hexToRgb(group.accent)
            return (
              <motion.div key={group.title} variants={fadeUp} className={group.span}>
                <Spotlight color={rgb} className="card h-full p-7 transition-colors duration-500 hover:border-white/15 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className="flex size-12 items-center justify-center rounded-xl ring-1 ring-inset"
                        style={{ background: `rgba(${rgb},0.12)`, color: group.accent, '--tw-ring-color': `rgba(${rgb},0.28)` }}
                      >
                        <Icon name={group.icon} className="size-5" strokeWidth={1.7} />
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{group.title}</h3>
                    </div>
                    <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-subtle sm:inline">
                      {String(group.items.length).padStart(2, '0')} skills
                    </span>
                  </div>

                  <div aria-hidden="true" className="my-6 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((s) => (
                      <li
                        key={s.label}
                        className="group/chip flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.025] py-2 pl-2 pr-3.5 text-sm text-fg/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        <span
                          className="flex size-7 items-center justify-center rounded-lg transition-colors duration-300"
                          style={{ background: `rgba(${rgb},0.1)`, color: group.accent }}
                        >
                          <Icon name={s.icon} className="size-3.5" strokeWidth={1.9} />
                        </span>
                        {s.label}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
