import { motion } from 'framer-motion'
import { Download, Quote } from 'lucide-react'
import { about, profile } from '../../data/content'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Portrait from '../ui/Portrait'
import Reveal, { fadeUp, stagger } from '../ui/Reveal'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Visual column */}
        <div className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal className="relative mx-auto max-w-sm lg:max-w-none">
              <Portrait src={profile.aboutImage} alt={profile.imageAlt} />
              <motion.figure
                className="glass absolute -bottom-8 -right-2 max-w-[15rem] rounded-2xl p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] sm:-right-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Quote className="size-5 text-cyan" aria-hidden="true" />
                <blockquote className="mt-2 font-serif text-xl italic leading-snug text-fg">
                  Education is not limited to textbooks.
                </blockquote>
              </motion.figure>
            </Reveal>
          </div>
        </div>

        {/* Copy column */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-cyan">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" aria-hidden="true" />
              About Me
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="about-title" className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {about.heading[0]}{' '}
              <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-gradient-accent">{about.heading[1]}</span>
            </h2>
          </Reveal>

          <div className="mt-10 space-y-5 text-base leading-[1.8] text-muted sm:text-[1.0625rem]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.04 * i} y={16}>
                <p className={i === 0 ? 'text-lg leading-relaxed text-fg sm:text-xl' : ''}>{p}</p>
              </Reveal>
            ))}
          </div>

          <motion.ul
            className="mt-12 grid gap-3 sm:grid-cols-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {about.facts.map((f) => (
              <motion.li
                key={f.label}
                variants={fadeUp}
                className="card flex items-center gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-white/15"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-cyan/10 text-cyan ring-1 ring-inset ring-white/10">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-subtle">{f.label}</span>
                  <span className="mt-0.5 block text-sm font-medium text-fg">{f.value}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button href={profile.cv} download variant="secondary">
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </Button>
            <Button href="#contact" variant="ghost">
              Let&rsquo;s talk →
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
