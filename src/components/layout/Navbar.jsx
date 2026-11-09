import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { contact, emailHref, instagramHref, navLinks, whatsappHref } from '../../data/content'
import useActiveSection from '../../hooks/useActiveSection'
import useScrolled from '../../hooks/useScrolled'
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '../ui/BrandIcons'
import Logo from '../ui/Logo'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  const tabsRef = useRef(null)

  // Keep the active tab visible in the mobile tab strip (horizontal scroll only,
  // so the page itself never jumps).
  useEffect(() => {
    const strip = tabsRef.current
    const tab = strip?.querySelector('[aria-current="true"]')
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return
    const target = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    strip.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' })
  }, [active])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [open])

  // Close the menu first, then scroll once the page is scrollable again.
  const navigate = (e, id) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }, 30)
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-cyan to-accent"
      />
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div className="container-x">
          <div
            className={`rounded-2xl border transition-all duration-500 ease-out-expo ${
              scrolled
                ? 'border-line bg-ink/75 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                : 'border-transparent bg-ink/30 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none'
            }`}
          >
          <nav aria-label="Primary" className="flex h-16 items-center justify-between pl-4 pr-2 sm:pl-5">
            <a href="#home" className="rounded-lg" aria-label="Muhammad Umair — back to top">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300 xl:px-4 ${
                        isActive ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="group hidden min-h-11 items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-cyan px-5 text-sm font-medium text-white shadow-[0_6px_24px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 hover:shadow-[0_10px_32px_-8px_rgba(6,182,212,0.8)] sm:inline-flex"
              >
                Contact Me
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-fg transition-colors hover:bg-white/[0.08] lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </nav>

          {/* Phone & tablet: always-visible, horizontally scrollable section tabs */}
          <nav aria-label="Sections" className="lg:hidden">
            <ul
              ref={tabsRef}
              className="flex gap-1 overflow-x-auto px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,transparent,#000_12px,#000_calc(100%-12px),transparent)]"
            >
              {navLinks.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id} className="shrink-0">
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative flex min-h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors duration-300 ${
                        isActive ? 'text-fg' : 'text-muted active:text-fg'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-mobile"
                          className="absolute inset-0 -z-10 rounded-full border border-cyan/25 bg-gradient-to-r from-accent/20 to-cyan/15"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </>
  )
}

function MobileMenu({ active, onClose, onNavigate }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    panelRef.current?.querySelector('button, a')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      // simple focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll('a, button')
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35 }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-20%] size-[28rem] rounded-full bg-accent/20 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-10rem] left-[-20%] size-[24rem] rounded-full bg-cyan/15 blur-[120px]" />

      <div className="container-x relative shrink-0 pt-3 sm:pt-4">
        <div className="flex h-16 w-full items-center justify-between border border-transparent pl-4 pr-2 sm:pl-5">
          <a href="#home" onClick={(e) => onNavigate(e, 'home')} className="rounded-lg" aria-label="Muhammad Umair — back to top">
            <Logo />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-fg"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav aria-label="Mobile" className="container-x relative mt-8 flex-1">
        <motion.ul
          className="space-y-1"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => onNavigate(e, link.id)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`flex items-baseline gap-4 rounded-xl px-4 py-3 text-3xl font-medium tracking-tight transition-colors sm:text-4xl ${
                  active === link.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                <span className="font-mono text-xs text-cyan/80">0{i + 1}</span>
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <motion.div
        className="container-x relative pb-10 pt-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
      >
        <div className="border-t border-line px-4 pt-6">
          <a href={emailHref} className="text-sm text-muted hover:text-fg">
            {contact.email}
          </a>
          <div className="mt-4 flex gap-3">
            <SocialSquare href={contact.youtubeUrl} label="YouTube">
              <YoutubeIcon size={18} />
            </SocialSquare>
            <SocialSquare href={instagramHref} label="Instagram">
              <InstagramIcon size={18} />
            </SocialSquare>
            <SocialSquare href={whatsappHref} label="WhatsApp">
              <WhatsappIcon size={18} />
            </SocialSquare>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SocialSquare({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors hover:text-fg"
    >
      {children}
    </a>
  )
}
