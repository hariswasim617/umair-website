import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, Send } from 'lucide-react'
import { contact, emailHref, instagramHref, whatsappHref } from '../../data/content'
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from '../ui/BrandIcons'
import Reveal, { fadeUp, stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

// Optional JSON endpoint (e.g. Formspree). See .env.example.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  else if (v.name.trim().length < 2) e.name = 'Name looks a little short.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.subject.trim()) e.subject = 'Please add a subject.'
  if (!v.message.trim()) e.message = 'Please write a message.'
  else if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

const channels = [
  {
    key: 'email',
    label: 'Email',
    value: contact.email,
    href: emailHref,
    icon: Mail,
    color: '#60A5FA',
    copy: contact.email,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: contact.whatsappDisplay,
    href: whatsappHref,
    icon: WhatsappIcon,
    color: '#25D366',
    external: true,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    value: contact.youtubeHandle,
    href: contact.youtubeUrl,
    icon: YoutubeIcon,
    color: '#FF4E45',
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    value: contact.instagramName,
    href: instagramHref,
    icon: InstagramIcon,
    color: '#E1306C',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]" />
        <div className="absolute -right-40 bottom-0 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.1),transparent)]" />
      </div>
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title={["Let's", 'Connect.']}
            lede="Have an idea, collaboration opportunity or simply want to connect? I'd love to hear from you."
          />

          <motion.ul className="-mt-4 space-y-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            {channels.map((c) => (
              <motion.li key={c.key} variants={fadeUp}>
                <ChannelCard channel={c} />
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-[#062b16] shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2fe076] sm:w-auto"
            >
              <WhatsappIcon size={18} />
              Message me on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ChannelCard({ channel: c }) {
  const [copied, setCopied] = useState(false)
  const Ico = c.icon

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — link still works */
    }
  }

  return (
    <div className="card group flex items-center gap-4 rounded-2xl p-3 pr-3 transition-colors duration-300 hover:border-white/15 sm:p-4">
      <a
        href={c.href}
        {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex min-w-0 flex-1 items-center gap-4 rounded-xl"
      >
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${c.color}1a`, color: c.color }}
        >
          <Ico size={20} className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-[0.14em] text-subtle">{c.label}</span>
          <span className="block truncate text-[0.95rem] font-medium text-fg">{c.value}</span>
        </span>
        {c.external && <span className="sr-only">(opens in a new tab)</span>}
        <ArrowUpRight
          className="ml-auto size-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
          aria-hidden="true"
        />
      </a>
      {c.copy && (
        <button
          type="button"
          onClick={copy}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
        >
          {copied ? <Check className="size-4 text-emerald-400" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}

const initial = { name: '', email: '', subject: '', message: '', company: '' }

function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  // idle | sending | sent | mailto | error
  const [status, setStatus] = useState('idle')

  const update = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name]) setErrors(validate(next))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }
  const blur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
    setErrors(validate(values))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) {
      const first = ['name', 'email', 'subject', 'message'].find((k) => errs[k])
      document.getElementById(`cf-${first}`)?.focus()
      return
    }
    // Honeypot: bots fill hidden fields; silently drop.
    if (values.company) return

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    }

    if (ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setStatus('sent')
        setValues(initial)
        setTouched({})
      } catch {
        setStatus('error')
      }
      return
    }

    // No backend configured: hand the message to the visitor's email app.
    const body = `${payload.message}\n\n— ${payload.name}\n${payload.email}`
    const url = `mailto:${contact.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setStatus('mailto')
  }

  const show = (k) => touched[k] && errors[k]

  return (
    <form noValidate onSubmit={submit} className="card relative overflow-hidden rounded-[1.75rem] p-6 sm:p-10" aria-describedby="cf-note">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <h3 className="text-2xl font-semibold tracking-tight text-fg">Send a message</h3>
      <p className="mt-2 text-sm text-muted">All fields are required.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Your name" error={show('name')}>
          <input id="cf-name" name="name" type="text" autoComplete="name" value={values.name} onChange={update} onBlur={blur} placeholder="Full name" {...aria('name', show('name'))} className={inputCls(show('name'))} />
        </Field>
        <Field id="cf-email" label="Email address" error={show('email')}>
          <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={update} onBlur={blur} placeholder="you@example.com" {...aria('email', show('email'))} className={inputCls(show('email'))} />
        </Field>
        <Field id="cf-subject" label="Subject" error={show('subject')} className="sm:col-span-2">
          <input id="cf-subject" name="subject" type="text" value={values.subject} onChange={update} onBlur={blur} placeholder="What would you like to talk about?" {...aria('subject', show('subject'))} className={inputCls(show('subject'))} />
        </Field>
        <Field id="cf-message" label="Message" error={show('message')} className="sm:col-span-2">
          <textarea id="cf-message" name="message" rows={6} value={values.message} onChange={update} onBlur={blur} placeholder="Write your message…" {...aria('message', show('message'))} className={`${inputCls(show('message'))} resize-y py-3.5`} />
        </Field>
        {/* Honeypot — hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="cf-note" className="max-w-sm text-xs leading-relaxed text-subtle">
          {ENDPOINT
            ? 'Your message is sent securely and only used to reply to you.'
            : 'Sending opens your email app with this message ready to go — just press send.'}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent to-cyan px-7 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(59,130,246,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(6,182,212,0.7)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          {['sent', 'mailto', 'error'].includes(status) && (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
                status === 'error' ? 'border-rose-400/25 bg-rose-400/[0.07] text-rose-200' : 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-100'
              }`}
            >
              {status === 'error' ? (
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              ) : (
                <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              )}
              <p>
                {status === 'sent' && 'Thank you — your message has been sent. I will get back to you soon.'}
                {status === 'mailto' && (
                  <>
                    Your email app should now be open with your message filled in — press send to deliver it. Nothing opened? Email me directly at{' '}
                    <a className="underline underline-offset-2" href={emailHref}>
                      {contact.email}
                    </a>
                    .
                  </>
                )}
                {status === 'error' && (
                  <>
                    Sorry, the message could not be sent. Please try again or email me at{' '}
                    <a className="underline underline-offset-2" href={emailHref}>
                      {contact.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function aria(name, err) {
  return {
    'aria-invalid': err ? 'true' : 'false',
    'aria-describedby': err ? `cf-${name}-error` : undefined,
    required: true,
  }
}

function inputCls(err) {
  return `block w-full min-h-12 rounded-xl border bg-ink/60 px-4 text-[0.95rem] text-fg placeholder:text-subtle/80 outline-none transition-all duration-300 focus:bg-ink/80 focus:ring-4 ${
    err ? 'border-rose-400/50 focus:border-rose-400/70 focus:ring-rose-400/10' : 'border-line focus:border-accent/60 focus:ring-accent/15'
  }`
}

function Field({ id, label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg/85">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-rose-300"
          >
            <CircleAlert className="size-3.5" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
