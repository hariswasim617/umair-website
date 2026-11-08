import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../../data/content'
import ProjectArt from '../art/ProjectArt'
import { InstagramIcon, YoutubeIcon } from '../ui/BrandIcons'
import { fadeUp, stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Spotlight, { hexToRgb } from '../ui/Spotlight'

const linkIcons = { youtube: YoutubeIcon, instagram: InstagramIcon }

function Thumb({ project, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
      <div className="size-full transition-transform duration-[1200ms] ease-out-expo group-hover/spot:scale-[1.06]">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        ) : (
          <ProjectArt name={project.art} />
        )}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-2/70 via-transparent to-transparent" />
      <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-fg/90">
        {project.category}
      </span>
    </div>
  )
}

function Tags({ tags, accent }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Topics">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border px-3 py-1 text-xs text-fg/80"
          style={{ borderColor: `rgba(${hexToRgb(accent)},0.25)`, background: `rgba(${hexToRgb(accent)},0.06)` }}
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ links }) {
  if (!links?.length) return null
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((l) => {
        const Ico = linkIcons[l.type]
        return (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] px-4 text-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
          >
            {Ico && <Ico size={17} className={l.type === 'youtube' ? 'text-[#FF4E45]' : 'text-[#E1306C]'} />}
            <span className="font-medium">{l.label}</span>
            {l.detail && <span className="hidden text-muted sm:inline">{l.detail}</span>}
            <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )
      })}
    </div>
  )
}

function FeaturedProject({ project }) {
  const rgb = hexToRgb(project.accent)
  return (
    <Spotlight as="article" color={rgb} className="card grid overflow-hidden transition-colors duration-500 hover:border-white/15 lg:grid-cols-2">
      <Thumb project={project} className="aspect-[3/2] lg:aspect-auto lg:min-h-[30rem]" />
      <div className="flex flex-col p-7 sm:p-10 lg:p-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: project.accent }}>
          Featured Project
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-subtle">{project.involvementTitle}</p>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {project.involvement.map((x) => (
            <li key={x} className="flex items-start gap-3 text-sm text-fg/85">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full" style={{ background: `rgba(${rgb},0.15)`, color: project.accent }}>
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {x}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Tags tags={project.tags} accent={project.accent} />
        </div>
        <div className="mt-auto pt-8">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </Spotlight>
  )
}

function ProjectCard({ project, wideOnTablet = false }) {
  const rgb = hexToRgb(project.accent)
  const wide = wideOnTablet ? 'md:max-lg:flex-row' : ''
  return (
    <Spotlight
      as="article"
      color={rgb}
      className={`card flex h-full flex-col overflow-hidden ${wide} transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]`}
    >
      <Thumb project={project} className={`aspect-[3/2] ${wideOnTablet ? 'md:max-lg:aspect-auto md:max-lg:w-1/2 md:max-lg:shrink-0' : ''}`} />
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>

        {project.involvement && (
          <>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-subtle">{project.involvementTitle}</p>
            <ul className="mt-3 space-y-2">
              {project.involvement.map((x) => (
                <li key={x} className="flex items-center gap-3 text-sm text-fg/85">
                  <span className="size-1.5 shrink-0 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-6">
          <Tags tags={project.tags} accent={project.accent} />
        </div>
        {project.links?.length > 0 && (
          <div className="mt-auto pt-6">
            <ProjectLinks links={project.links} />
          </div>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover/spot:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
    </Spotlight>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-x">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title={["Things I've", 'Worked On']}
          lede="Where medicine, faith, media and technology meet in practice."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <FeaturedProject project={featured} />
        </motion.div>

        <motion.div
          className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {rest.map((p, i) => {
            const last = i === rest.length - 1 && rest.length % 2 === 1
            return (
            <motion.div key={p.id} variants={fadeUp} className={`h-full ${last ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <ProjectCard project={p} wideOnTablet={last} />
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
