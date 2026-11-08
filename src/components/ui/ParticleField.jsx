import { useEffect, useRef } from 'react'

/**
 * Sparse, slowly drifting points of light. Pauses when off-screen or the tab
 * is hidden, and renders a single static frame for reduced-motion users.
 */
export default function ParticleField({ count = 46, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const n = window.innerWidth < 640 ? Math.round(count * 0.55) : count
    const parts = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.35,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -(Math.random() * 0.00018 + 0.00004),
      a: Math.random() * 0.5 + 0.15,
      t: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? '96,165,250' : '34,211,238',
    }))

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (step) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        if (step) {
          p.x += p.vx
          p.y += p.vy
          p.t += 0.012
          if (p.y < -0.02) p.y = 1.02
          if (p.x < -0.02) p.x = 1.02
          if (p.x > 1.02) p.x = -0.02
        }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.t))
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},${alpha})`
        ctx.shadowColor = `rgba(${p.hue},${alpha})`
        ctx.shadowBlur = 6
        ctx.fill()
      }
    }

    const loop = () => {
      if (visible && !document.hidden) draw(true)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(false)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    if (reduce) draw(false)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [count])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />
}
