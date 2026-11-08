/**
 * Rounded portrait frame with a gradient hairline border and soft glow.
 * Image source comes from src/data/content.js.
 */
export default function Portrait({ src, alt, className = '', priority = false }) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.45),rgba(6,182,212,0.15)_55%,transparent)] blur-2xl"
      />
      <div className="relative rounded-[2rem] bg-gradient-to-br from-accent/60 via-white/10 to-cyan/50 p-px shadow-[0_30px_80px_-20px_rgba(15,40,90,0.8)] sm:rounded-[2.5rem]">
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-ink-2 sm:rounded-[calc(2.5rem-1px)]">
          <img
            src={src}
            alt={alt}
            width="800"
            height="1000"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  )
}
