import { ArrowUp, Mail } from 'lucide-react'
import { contact, emailHref, instagramHref, navLinks, profile, whatsappHref } from '../../data/content'
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '../ui/BrandIcons'
import Logo from '../ui/Logo'

const socials = [
  { label: 'YouTube', href: contact.youtubeUrl, icon: YoutubeIcon },
  { label: 'Instagram', href: instagramHref, icon: InstagramIcon },
  { label: 'WhatsApp', href: whatsappHref, icon: WhatsappIcon },
  { label: 'Email', href: emailHref, icon: Mail },
]

export default function Footer() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative border-t border-line pt-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="container-x">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              First-year MBBS student at {profile.college}, {profile.location}. Passionate about medicine, Quranic
              recitation, communication, creativity and technology.
            </p>
            <ul className="mt-8 flex gap-3">
              {socials.map(({ label, href, icon: Ico }) => {
                const external = href.startsWith('http')
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      aria-label={external ? `${label} (opens in a new tab)` : label}
                      className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-fg"
                    >
                      <Ico size={18} className="size-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Get in touch</p>
            <a href={emailHref} className="mt-5 block break-all text-lg font-medium text-fg transition-colors hover:text-cyan">
              {contact.email}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted transition-colors hover:text-fg">
              WhatsApp · {contact.whatsappDisplay}
            </a>
            <p className="mt-8 font-serif text-xl italic leading-snug text-fg/80">
              &ldquo;Learning Today. Healing Tomorrow.&rdquo;
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-subtle">© 2026 Muhammad Umair. All Rights Reserved.</p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-xs text-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
