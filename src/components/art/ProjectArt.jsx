import { useId } from 'react'

/*
 * Hand-built SVG thumbnails for the project cards. They share one visual
 * language (dark field, hairline geometry, one accent colour) so the grid
 * feels consistent. Replace any of them with a photo via `image` in content.js.
 */

const VB = '0 0 600 400'

function useIds(...names) {
  const base = useId().replace(/:/g, '')
  return Object.fromEntries(names.map((n) => [n, `${n}-${base}`]))
}

// deterministic pseudo-random so SSR / re-renders stay identical
function rand(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function Frame({ children, label }) {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="size-full">
      {children}
    </svg>
  )
}

/* ── Quran: geometric star, open Mushaf on a rehal, recitation waveform ── */
export function QuranArt() {
  const id = useIds('bg', 'pat', 'glow', 'gold', 'page')
  const r = rand(7)
  const bars = Array.from({ length: 46 }, (_, i) => {
    const env = Math.sin((i / 45) * Math.PI)
    return 4 + env * (10 + r() * 26)
  })
  const star = (cx, cy, s) => {
    const sq = (rot) =>
      [0, 1, 2, 3]
        .map((k) => {
          const a = rot + (k * Math.PI) / 2 + Math.PI / 4
          return `${cx + Math.cos(a) * s},${cy + Math.sin(a) * s}`
        })
        .join(' ')
    return [sq(0), sq(Math.PI / 4)]
  }
  const [s1, s2] = star(300, 170, 118)
  const [p1, p2] = star(30, 30, 16)

  return (
    <Frame label="Illustration of an open Quran on a stand inside an Islamic geometric star">
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#05211B" />
          <stop offset="1" stopColor="#0A1120" />
        </linearGradient>
        <pattern id={id.pat} width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon points={p1} fill="none" stroke="#34D399" strokeOpacity="0.09" />
          <polygon points={p2} fill="none" stroke="#34D399" strokeOpacity="0.09" />
        </pattern>
        <radialGradient id={id.glow} cx="300" cy="180" r="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" stopOpacity="0.38" />
          <stop offset="1" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.gold} x1="180" y1="60" x2="420" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7B7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id={id.page} x1="0" y1="190" x2="0" y2="262" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7F7F1" />
          <stop offset="1" stopColor="#A7C7BC" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id.bg})`} />
      <rect width="600" height="400" fill={`url(#${id.pat})`} />
      <rect width="600" height="400" fill={`url(#${id.glow})`} />

      <g fill="none" stroke={`url(#${id.gold})`} strokeWidth="1.5" opacity="0.9">
        <polygon points={s1} />
        <polygon points={s2} />
        <circle cx="300" cy="170" r="84" strokeOpacity="0.6" />
        <circle cx="300" cy="170" r="132" strokeOpacity="0.25" strokeDasharray="2 6" />
      </g>

      {/* Rehal (book stand) */}
      <g stroke="#6EE7B7" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round">
        <line x1="222" y1="236" x2="368" y2="300" />
        <line x1="378" y1="236" x2="232" y2="300" />
      </g>
      {/* Open book */}
      <g>
        <path d="M300 214 C 262 196, 214 194, 176 204 L 176 254 C 214 244, 262 246, 300 262 Z" fill={`url(#${id.page})`} />
        <path d="M300 214 C 338 196, 386 194, 424 204 L 424 254 C 386 244, 338 246, 300 262 Z" fill={`url(#${id.page})`} />
        <path d="M300 214 V262" stroke="#0F766E" strokeWidth="1.5" />
        <g stroke="#0F766E" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round">
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <path d={`M${194} ${214 + k * 10} C ${230} ${206 + k * 10}, ${262} ${208 + k * 10}, ${288} ${218 + k * 10}`} fill="none" />
              <path d={`M${312} ${218 + k * 10} C ${338} ${208 + k * 10}, ${370} ${206 + k * 10}, ${406} ${214 + k * 10}`} fill="none" />
            </g>
          ))}
        </g>
      </g>

      {/* Recitation waveform */}
      <g fill="#34D399">
        {bars.map((h, i) => (
          <rect key={i} x={116 + i * 8} y={352 - h / 2} width="3" height={h} rx="1.5" opacity={0.35 + (h / 40) * 0.5} />
        ))}
      </g>
    </Frame>
  )
}

/* ── Electronics & IoT: microcontroller, traces, Wi-Fi, relay ── */
export function CircuitArt() {
  const id = useIds('bg', 'glow', 'chip', 'trace')
  const traces = [
    'M230 160 H170 V90 H90',
    'M230 180 H140 V150 H60',
    'M230 200 H120',
    'M230 220 H160 V280 H80',
    'M230 240 H190 V330 H120',
    'M370 160 H420 V80 H520',
    'M370 180 H460 V140 H560',
    'M370 200 H500',
    'M370 220 H440 V300 H540',
    'M370 240 H400 V340 H470',
    'M270 140 V70 H330',
    'M330 140 V100 H400 V40',
    'M290 260 V350 H230',
    'M320 260 V370',
  ]
  const ends = traces.map((d) => {
    const nums = d.match(/-?\d+/g).map(Number)
    // last point: walk H/V commands
    let x = nums[0]
    let y = nums[1]
    d.replace(/([HV])(\d+)/g, (_, c, v) => {
      if (c === 'H') x = +v
      else y = +v
    })
    return [x, y]
  })

  return (
    <Frame label="Illustration of a microcontroller circuit board with Wi-Fi signal">
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#031B24" />
          <stop offset="1" stopColor="#0A1120" />
        </linearGradient>
        <radialGradient id={id.glow} cx="300" cy="200" r="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" stopOpacity="0.32" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.chip} x1="230" y1="140" x2="370" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14233A" />
          <stop offset="1" stopColor="#0B1526" />
        </linearGradient>
        <linearGradient id={id.trace} x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#22D3EE" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id.bg})`} />
      <g stroke="#22D3EE" strokeOpacity="0.05">
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} />
        ))}
      </g>
      <rect width="600" height="400" fill={`url(#${id.glow})`} />

      <g fill="none" stroke={`url(#${id.trace})`} strokeWidth="2" strokeLinejoin="round">
        {traces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* signal pulses */}
      <g fill="none" stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 58" className="animate-dash">
        {traces.filter((_, i) => i % 3 === 0).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="#0A1120" stroke="#22D3EE" strokeWidth="1.8">
        {ends.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.5" />
        ))}
      </g>

      {/* Chip */}
      <g>
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} fill="#5EEAD4" opacity="0.7">
            <rect x="220" y={152 + i * 18} width="12" height="5" rx="1" />
            <rect x="368" y={152 + i * 18} width="12" height="5" rx="1" />
          </g>
        ))}
        <rect x="230" y="140" width="140" height="120" rx="12" fill={`url(#${id.chip})`} stroke="#22D3EE" strokeOpacity="0.5" />
        <rect x="254" y="164" width="92" height="72" rx="6" fill="none" stroke="#22D3EE" strokeOpacity="0.25" />
        <circle cx="246" cy="156" r="3" fill="#22D3EE" opacity="0.6" />
        {/* Wi-Fi mark on chip */}
        <g fill="none" stroke="#67E8F9" strokeWidth="3" strokeLinecap="round">
          <path d="M276 200 a34 34 0 0 1 48 0" opacity="0.5" />
          <path d="M286 210 a20 20 0 0 1 28 0" opacity="0.8" />
        </g>
        <circle cx="300" cy="220" r="4" fill="#67E8F9" />
      </g>

      {/* Relay switch */}
      <g transform="translate(470 230)" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">
        <rect x="-30" y="-24" width="60" height="48" rx="8" fill="#0B1526" strokeOpacity="0.7" />
        <circle cx="-12" cy="6" r="3" fill="#3B82F6" />
        <circle cx="14" cy="6" r="3" fill="#3B82F6" />
        <path d="M-12 6 L12 -8" stroke="#93C5FD" />
      </g>
      {/* IR emitter */}
      <g transform="translate(100 210)">
        <circle r="13" fill="#0B1526" stroke="#F87171" strokeOpacity="0.7" strokeWidth="2" />
        <circle r="4.5" fill="#F87171" opacity="0.8" />
        <g fill="none" stroke="#F87171" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
          <path d="M-24 -10 a26 26 0 0 0 0 20" />
          <path d="M-32 -16 a36 36 0 0 0 0 32" />
        </g>
      </g>
    </Frame>
  )
}

/* ── Academic: DNA helix, molecular rings, heartbeat ── */
export function AcademicArt() {
  const id = useIds('bg', 'glow', 'a', 'b')
  const N = 30
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const x = 40 + (i / N) * 520
    const t = (i / N) * Math.PI * 3.2
    return { x, y1: 200 + Math.sin(t) * 62, y2: 200 + Math.sin(t + Math.PI) * 62, z: Math.cos(t) }
  })
  const strand = (k) => 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p[k].toFixed(1)}`).join(' L')
  const hex = (cx, cy, r) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6
      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`
    }).join(' ')

  return (
    <Frame label="Illustration of a DNA double helix with molecular structures">
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#071630" />
          <stop offset="1" stopColor="#0A1120" />
        </linearGradient>
        <radialGradient id={id.glow} cx="300" cy="200" r="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" stopOpacity="0.32" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.a} x1="40" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={id.b} x1="40" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id.bg})`} />
      <rect width="600" height="400" fill={`url(#${id.glow})`} />

      {/* molecular rings */}
      <g fill="none" stroke="#93C5FD" strokeOpacity="0.28" strokeWidth="1.5">
        <polygon points={hex(92, 76, 26)} />
        <polygon points={hex(137, 102, 26)} />
        <line x1="137" y1="128" x2="137" y2="150" />
        <circle cx="137" cy="154" r="4" />
        <polygon points={hex(498, 318, 22)} />
        <polygon points={hex(536, 296, 22)} />
        <line x1="460" y1="318" x2="476" y2="318" />
      </g>

      {/* helix rungs */}
      <g strokeLinecap="round">
        {pts.map((p, i) => (
          <line
            key={i}
            x1={p.x}
            y1={p.y1}
            x2={p.x}
            y2={p.y2}
            stroke={i % 2 ? '#60A5FA' : '#22D3EE'}
            strokeOpacity={0.12 + Math.abs(p.z) * 0.25}
            strokeWidth="3"
          />
        ))}
      </g>
      <path d={strand('y1')} fill="none" stroke={`url(#${id.a})`} strokeWidth="3.5" strokeLinejoin="round" />
      <path d={strand('y2')} fill="none" stroke={`url(#${id.b})`} strokeWidth="3.5" strokeLinejoin="round" />
      <g>
        {pts.map((p, i) => (
          <g key={i} opacity={0.35 + (p.z + 1) * 0.3}>
            <circle cx={p.x} cy={p.y1} r="3.2" fill="#BFDBFE" />
            <circle cx={p.x} cy={p.y2} r="3.2" fill="#A5F3FC" />
          </g>
        ))}
      </g>

      {/* heartbeat */}
      <path
        d="M40 350 H230 l12 0 l10 -26 l14 46 l12 -32 l8 12 H560"
        fill="none"
        stroke="#60A5FA"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Frame>
  )
}

/* ── Digital media: preview monitor, timeline tracks, waveform ── */
export function MediaArt() {
  const id = useIds('bg', 'glow', 'screen')
  const r = rand(21)
  const wave = Array.from({ length: 64 }, () => 3 + r() * 20)
  return (
    <Frame label="Illustration of a video editing timeline with audio waveform">
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#160F2E" />
          <stop offset="1" stopColor="#0A1120" />
        </linearGradient>
        <radialGradient id={id.glow} cx="300" cy="130" r="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA" stopOpacity="0.3" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.screen} x1="170" y1="40" x2="430" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E1F5E" />
          <stop offset="0.6" stopColor="#1A2547" />
          <stop offset="1" stopColor="#0E3B4A" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id.bg})`} />
      <rect width="600" height="400" fill={`url(#${id.glow})`} />

      {/* preview monitor */}
      <rect x="170" y="40" width="260" height="150" rx="12" fill={`url(#${id.screen})`} stroke="#A78BFA" strokeOpacity="0.35" />
      <circle cx="300" cy="115" r="26" fill="#FFFFFF" fillOpacity="0.08" stroke="#E9D5FF" strokeOpacity="0.5" />
      <path d="M292 102 L314 115 L292 128 Z" fill="#F5F3FF" />
      <g stroke="#E9D5FF" strokeOpacity="0.4" strokeWidth="2" fill="none">
        <path d="M184 54 h14 M184 54 v14" />
        <path d="M416 54 h-14 M416 54 v14" />
        <path d="M184 176 h14 M184 176 v-14" />
        <path d="M416 176 h-14 M416 176 v-14" />
      </g>

      {/* timeline */}
      <rect x="40" y="220" width="520" height="150" rx="14" fill="#0B1222" stroke="#FFFFFF" strokeOpacity="0.07" />
      <g stroke="#FFFFFF" strokeOpacity="0.08">
        {Array.from({ length: 26 }, (_, i) => (
          <line key={i} x1={60 + i * 20} y1="230" x2={60 + i * 20} y2={i % 5 === 0 ? 242 : 236} />
        ))}
      </g>
      {/* video track */}
      <g>
        <rect x="60" y="252" width="150" height="28" rx="6" fill="#7C3AED" fillOpacity="0.55" />
        <rect x="214" y="252" width="96" height="28" rx="6" fill="#6366F1" fillOpacity="0.55" />
        <rect x="314" y="252" width="176" height="28" rx="6" fill="#3B82F6" fillOpacity="0.5" />
      </g>
      {/* overlay track */}
      <g>
        <rect x="120" y="288" width="90" height="20" rx="5" fill="#A78BFA" fillOpacity="0.35" />
        <rect x="350" y="288" width="70" height="20" rx="5" fill="#22D3EE" fillOpacity="0.35" />
      </g>
      {/* audio track */}
      <rect x="60" y="316" width="480" height="40" rx="6" fill="#06B6D4" fillOpacity="0.1" />
      <g fill="#67E8F9" fillOpacity="0.75">
        {wave.map((h, i) => (
          <rect key={i} x={66 + i * 7.4} y={336 - h / 2} width="3" height={h} rx="1.5" />
        ))}
      </g>
      {/* playhead */}
      <g>
        <line x1="268" y1="226" x2="268" y2="364" stroke="#F5F3FF" strokeWidth="2" />
        <path d="M260 222 h16 v8 l-8 7 l-8 -7 Z" fill="#F5F3FF" />
      </g>
    </Frame>
  )
}

const artMap = { quran: QuranArt, circuit: CircuitArt, academic: AcademicArt, media: MediaArt }

export default function ProjectArt({ name }) {
  const Cmp = artMap[name] ?? AcademicArt
  return <Cmp />
}
