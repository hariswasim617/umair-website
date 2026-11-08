import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { education } from '../../data/content'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

const EASE = [0.16, 1, 0.3, 1]

export default function Education() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-2/60 to-transparent" />
      <div className="container-x grid gap-4 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="education-title"
              eyebrow="Education"
              title={['My Academic', 'Journey']}
              lede="Each stage built the foundation for the next — and the journey is still unfolding."
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div ref={listRef} className="relative">
            {/* Track + animated progress line */}
            <div aria-hidden="true" className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-white/[0.08] sm:left-[1.85rem]" />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: grow }}
              className="absolute bottom-6 left-[1.35rem] top-6 w-px origin-top bg-gradient-to-b from-cyan via-accent to-accent/0 sm:left-[1.85rem]"
            />

            <ol className="relative space-y-6 pl-14 sm:pl-20">
            {education.map((e, i) => (
              <motion.li
                key={e.degree}
                className="relative"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              >
                <span
                  className={`absolute -left-14 top-6 flex size-11 items-center justify-center rounded-xl border sm:-left-20 sm:size-[3.75rem] sm:rounded-2xl ${
                    e.current
                      ? 'border-cyan/40 bg-gradient-to-br from-accent/25 to-cyan/15 text-cyan shadow-[0_0_30px_-4px_rgba(6,182,212,0.45)]'
                      : 'border-line bg-ink-2 text-muted'
                  }`}
                >
                  <Icon name={e.icon} className="size-5 sm:size-6" strokeWidth={1.6} />
                </span>

                <div
                  className={`card p-6 transition-colors duration-500 hover:border-white/15 sm:p-8 ${
                    e.current ? 'border-cyan/20 bg-gradient-to-br from-accent/[0.09] to-cyan/[0.03]' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-subtle">{String(education.length - i).padStart(2, '0')}</span>
                    {e.current && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                          <span className="relative size-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{e.degree}</h3>
                  <p className="mt-2 text-base text-fg/80">{e.school}</p>
                  {e.status && <p className="mt-1 text-sm text-cyan">{e.status}</p>}
                </div>
              </motion.li>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
