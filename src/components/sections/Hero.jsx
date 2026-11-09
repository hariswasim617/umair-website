import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, BookOpen, Building2, Cpu, Download, GraduationCap, MapPin, MicVocal, Stethoscope } from 'lucide-react'
import { profile } from '../../data/content'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import ParticleField from '../ui/ParticleField'
import Portrait from '../ui/Portrait'

const EASE = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}
const line = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}

const chips = [
  { icon: Stethoscope, label: 'MBBS · Year One', pos: 'left-[-6%] top-[12%] sm:left-[-12%]', delay: 0 },
  { icon: BookOpen, label: 'Quranic Recitation', pos: 'right-[-4%] top-[34%] sm:right-[-14%]', delay: 1.4 },
  { icon: MicVocal, label: 'Public Speaking', pos: 'left-[-4%] bottom-[22%] sm:left-[-16%]', delay: 2.6 },
  { icon: Cpu, label: 'Tech & IoT', pos: 'right-[2%] bottom-[6%] sm:right-[-8%]', delay: 0.8 },
]

export default function Hero({ ready }) {
  const state = ready ? 'show' : 'hidden'

  return (
    <section id="home" aria-label="Introduction" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-40 sm:pt-44 lg:pb-24 lg:pt-28">
      {/* Decorative layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_80%)]" />
        <div className="absolute left-1/2 top-[-20%] h-[38rem] w-[70rem] max-w-none -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent)]" />
        <ParticleField />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate={state}>
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium text-fg/90 sm:text-[0.8rem]">
              <span className="relative flex size-5 items-center justify-center rounded-full bg-emerald-400/15">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.status}
            </span>
          </motion.div>

          <h1 className="mt-8 text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem] xl:text-[6rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={line} className="block text-muted/90">
                Hi, I&rsquo;m
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span variants={line} className="block">
                <span className="text-gradient">Muhammad </span>
                <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-accent">Umair.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={item} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium text-fg sm:text-xl">
            {profile.title.split('|').map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="h-4 w-px bg-white/20" aria-hidden="true" />}
                {t.trim()}
              </span>
            ))}
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">
            {profile.intro}
          </motion.p>
          <motion.p variants={item} className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
            {profile.supporting}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <Button href="#about" className="group w-full sm:w-auto">
                Explore My Journey
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
                Get In Touch
              </Button>
            </Magnetic>
            <a
              href={profile.cv}
              download
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:text-fg"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-12 grid gap-3 border-t border-line pt-8 text-sm text-muted sm:flex sm:flex-wrap sm:gap-x-8">
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-cyan" aria-hidden="true" />
              {profile.location}
            </li>
            <li className="flex items-center gap-2.5">
              <GraduationCap className="size-4 text-cyan" aria-hidden="true" />
              {profile.year}
            </li>
            <li className="flex items-center gap-2.5">
              <Building2 className="size-4 text-cyan" aria-hidden="true" />
              {profile.college}
            </li>
          </motion.ul>
        </motion.div>

        {/* Portrait */}
        <motion.div
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:col-span-5 lg:max-w-md"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
        >
          {/* Orbit rings */}
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/[0.07]" />
            <div className="absolute inset-[12%] rounded-full border border-white/[0.05]" />
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(6,182,212,0.6)]" />
          </div>

          <Portrait src={profile.image} alt={profile.imageAlt} priority />

          {/* Heartbeat line across the portrait */}
          <svg aria-hidden="true" viewBox="0 0 400 60" className="absolute inset-x-6 bottom-8 h-10 w-[calc(100%-3rem)] overflow-visible">
            <motion.path
              d="M0 30 H130 L145 30 L155 10 L168 52 L180 18 L190 30 H400"
              fill="none"
              stroke="url(#hero-ecg)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={ready ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 2, delay: 0.9, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="hero-ecg" x1="0" x2="400" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="0.4" stopColor="#22D3EE" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {chips.map(({ icon: Ico, label, pos, delay }, i) => (
            <motion.div
              key={label}
              className={`absolute ${pos} hidden sm:block`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.9 + i * 0.12, ease: EASE }}
            >
              <div className="glass flex animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${-delay}s` }}>
                <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent/30 to-cyan/20 text-cyan">
                  <Ico className="size-3.5" aria-hidden="true" />
                </span>
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-subtle transition-colors hover:text-muted md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        Scroll
        <ArrowDown className="size-4 animate-float" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
