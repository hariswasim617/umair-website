import Reveal from './Reveal'

/**
 * Section header with an eyebrow label, large title and optional lede.
 * `title` can be a string or an array; the last array item gets the serif accent.
 */
export default function SectionHeading({ eyebrow, title, lede, align = 'left', id }) {
  const parts = Array.isArray(title) ? title : [title]
  const centered = align === 'center'
  return (
    <div className={`mb-14 max-w-3xl lg:mb-20 ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <p className={`mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-cyan ${centered ? 'justify-center' : ''}`}>
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 id={id} className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
          {parts.map((p, i) =>
            i === parts.length - 1 && parts.length > 1 ? (
              <span key={i} className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-gradient-accent">
                {p}
              </span>
            ) : (
              <span key={i}>{p}{parts.length > 1 ? ' ' : ''}</span>
            ),
          )}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className={`mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  )
}
