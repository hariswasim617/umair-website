/** Fixed ambient backdrop: slow aurora light + fine grain. */
export default function Background() {
  return (
    <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute -left-[20%] -top-[25%] size-[60rem] max-w-none animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent)]" />
      <div
        className="absolute -right-[25%] top-[30%] size-[55rem] max-w-none animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.10),transparent)]"
        style={{ animationDelay: '-9s' }}
      />
    </div>
  )
}
