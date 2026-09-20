import { useState } from 'react'
import { motion } from 'framer-motion'
import { planets, quote, type SectionId, type PlanetMeta } from '../data'
import { fadeUp } from '../ui'

const CX = 500
const CY = 358

const HUES: Record<
  PlanetMeta['hue'],
  { core: string; mid: string; deep: string; rgb: string }
> = {
  blue: { core: '#b9d4ff', mid: '#4c6fdb', deep: '#1b2a68', rgb: '122,162,255' },
  teal: { core: '#b4f2e2', mid: '#39b8a2', deep: '#0f3f38', rgb: '122,215,196' },
  gold: { core: '#ffe6b8', mid: '#e0a34e', deep: '#4a2f0f', rgb: '232,201,138' },
  rose: { core: '#ffd0d8', mid: '#d9657d', deep: '#451f2b', rgb: '240,166,180' },
  iris: { core: '#dfd1ff', mid: '#8a6ce0', deep: '#241a4f', rgb: '179,157,255' },
  violet: { core: '#d0c2ff', mid: '#7c5cff', deep: '#1c1140', rgb: '124,92,255' },
}

function PlanetDecal({ planet }: { planet: PlanetMeta }) {
  const s = planet.size
  const px = CX + planet.orbit
  const py = CY
  const fill = 'rgba(235,240,255,0.55)'

  if (planet.id === 'ai') {
    const off = s * 0.58
    const nodes: [number, number][] = []
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) nodes.push([px + (i - 1) * off, py + (j - 1) * off])
    return (
      <g>
        {nodes.slice(0, 6).map((a, i) =>
          nodes.slice(i + 1, i + 4).map((b, j) =>
            Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) < off + 1 ? (
              <line
                key={`${i}-${j}`}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                stroke={fill}
                strokeWidth={0.6}
                opacity={0.5}
              />
            ) : null,
          ),
        )}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5} fill="#fff" opacity={0.85} />
        ))}
      </g>
    )
  }

  if (planet.id === 'build') {
    const p: React.ReactElement[] = []
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        const x = px + (i - 0.5) * s * 0.9
        const y = py + (j - 0.5) * s * 0.9
        p.push(
          <rect
            key={`${i}-${j}`}
            x={x - s * 0.3}
            y={y - s * 0.3}
            width={s * 0.6}
            height={s * 0.6}
            fill="none"
            stroke={fill}
            strokeWidth={0.7}
            opacity={0.7}
            transform={`rotate(45 ${x} ${y})`}
          />,
        )
      }
    return <g>{p}</g>
  }

  if (planet.id === 'design') {
    return (
      <g>
        {[0.45, 0.6, 0.75].map((o, i) => (
          <rect
            key={i}
            x={px - s * o * 1.1}
            y={py - s * o * 0.62}
            width={s * o * 2.2}
            height={s * o * 1.24}
            rx={s * 0.09}
            fill="rgba(235,240,255,0.16)"
            stroke={fill}
            strokeWidth={0.7}
            transform={`rotate(${-6 + i * 5} ${px} ${py})`}
          />
        ))}
      </g>
    )
  }

  if (planet.id === 'journey') {
    return (
      <g>
        <circle cx={px} cy={py} r={s + 4} fill="none" stroke={fill} strokeWidth={0.8} opacity={0.6} />
        <circle cx={px + (s + 6) * 0.9} cy={py - (s + 6) * 0.43} r={2.4} fill="#eef1f8" opacity={0.9} />
      </g>
    )
  }

  if (planet.id === 'knowledge') {
    return (
      <g>
        <circle cx={px} cy={py} r={s + 3} fill="none" stroke={fill} strokeWidth={0.7} opacity={0.6} />
        {[0, 120, 240].map((a) => {
          const rad = ((a * Math.PI) / 180) * -1
          return (
            <circle
              key={a}
              cx={px + Math.cos(rad) * (s + 5)}
              cy={py + Math.sin(rad) * (s + 5) * 0.5}
              r={1.8}
              fill={fill}
              opacity={0.85}
            />
          )
        })}
      </g>
    )
  }

  return (
    <g>
      {[45, 135, 225, 315].map((a) => {
        const rad = (a * Math.PI) / 180
        return (
          <circle
            key={a}
            cx={px + Math.cos(rad) * s * 0.68}
            cy={py + Math.sin(rad) * s * 0.68}
            r={1.6}
            fill={fill}
            opacity={0.8}
          />
        )
      })}
    </g>
  )
}

function Planet({ planet, active, onHover, onEnter }: {
  planet: PlanetMeta
  active: boolean
  onHover: (id: SectionId | null) => void
  onEnter: (id: SectionId) => void
}) {
  const px = CX + planet.orbit
  const py = CY
  const hue = HUES[planet.hue]
  const period = planet.speed

  return (
    <g>
      <g
        className="animate-orbit"
        style={{
          transformBox: 'view-box',
          transformOrigin: `${CX}px ${CY}px`,
          animationDuration: `${period}s`,
          animationDelay: `${-period * (planet.angle / 360)}s`,
          animationPlayState: active ? 'paused' : 'running',
        }}
      >
        <g className="planet-wrap" style={{ cursor: 'pointer' }}>
          <g
            role="button"
            tabIndex={0}
            aria-label={`${planet.name} — ${planet.short} Scroll to the ${planet.name} section.`}
            onClick={(e) => {
              e.stopPropagation()
              onHover(null)
              onEnter(planet.id)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onHover(null)
                onEnter(planet.id)
              }
            }}
            onMouseEnter={() => onHover(planet.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(planet.id)}
            onBlur={() => onHover(null)}
          >
            <circle
              cx={px}
              cy={py}
              r={planet.size + 12}
              fill={`rgba(${hue.rgb},${active ? 0.18 : 0.055})`}
              className="planet-halo"
            />
            <circle cx={px} cy={py} r={planet.size} fill={`url(#grad-${planet.id})`} />
            <g clipPath={`url(#clip-${planet.id})`} opacity={active ? 0.9 : 0.65}>
              <PlanetDecal planet={planet} />
            </g>
            <circle
              cx={px - planet.size * 0.32}
              cy={py - planet.size * 0.32}
              r={planet.size * 0.3}
              fill="rgba(255,255,255,0.4)"
              style={{ filter: 'blur(2px)' }}
            />
            <circle
              cx={px}
              cy={py}
              r={planet.size}
              fill="none"
              stroke={`rgba(255,255,255,${active ? 0.65 : 0.16})`}
              strokeWidth={1.1}
            />
            {active && (
              <circle
                cx={px}
                cy={py}
                r={planet.size + 9}
                fill="none"
                stroke={`rgba(${hue.rgb},0.5)`}
                strokeWidth={1}
                strokeDasharray="3 5"
                className="animate-orbit"
                style={{ animationDuration: '9s' }}
              />
            )}
          </g>
          <text
            x={px}
            y={py + planet.size + 22}
            textAnchor="middle"
            className="font-display"
            style={{
              fontSize: 11.5,
              letterSpacing: '0.26em',
              fill: active ? '#eef1f8' : 'rgba(169,179,204,0.75)',
              pointerEvents: 'none',
              transition: 'fill 0.3s ease',
            }}
          >
            {planet.name}
          </text>
        </g>
      </g>
    </g>
  )
}

function Intro({ className = '' }: { className?: string }) {
  return (
    <div className={`relative z-10 ${className}`}>
      <p className="eyebrow">a personal digital universe</p>
      <h1 className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.02] font-semibold tracking-tight">
        MEGHAA SUNIL
      </h1>
      <p className="mt-3 text-[0.84rem] sm:text-[0.94rem] uppercase tracking-[0.34em] text-[var(--iris)]">
        CSE. AI. FRONTEND. DESIGN
      </p>
      <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-dim">“{quote}”</p>
    </div>
  )
}

export default function Universe({
  onEnter,
  hintDismissed = false,
}: {
  onEnter: (id: SectionId | 'skills') => void
  hintDismissed: boolean
}) {
  const [hoverId, setHoverId] = useState<SectionId | null>(null)
  const hovered = planets.find((p) => p.id === hoverId)

  return (
    <motion.div
      className="relative flex min-h-[84svh] flex-col overflow-hidden"
      initial="hidden"
      animate="show"
    >
      <motion.header
        variants={fadeUp}
        custom={0}
        className="pointer-events-none absolute top-6 left-6 right-6 z-10 flex items-start justify-between"
      >
        <div>
          <p className="eyebrow">the meghaa system</p>
          <p className="font-display mt-1 text-xl font-semibold tracking-[0.18em]">MY UNIVERSE</p>
        </div>
        {!hintDismissed && (
          <div className="hidden max-w-xs text-right text-[0.7rem] tracking-[0.18em] uppercase text-faint sm:block">
            click a world to jump to it
            <br />
            or just keep scrolling
          </div>
        )}
      </motion.header>

      <motion.div variants={fadeUp} custom={1} className="relative z-[1] flex-1 px-2 py-2 md:px-6 md:py-8">
        <div className="md:hidden">
          <Intro className="px-6 pb-6 pt-24 text-center" />
          <div className="mx-auto max-w-md space-y-3 pb-16 px-2">
            {planets.map((p, i) => (
              <div key={p.id}>
                <button
                  type="button"
                  onClick={() => onEnter(p.id)}
                  className="panel group flex w-full items-center gap-4 p-4 text-left transition hover:border-[rgba(179,157,255,0.4)] hover:shadow-[0_0_30px_rgba(124,92,255,0.2)] focus-visible:outline focus-visible:outline-2"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      background: `radial-gradient(circle at 32% 30%, ${HUES[p.hue].core}, ${HUES[p.hue].mid} 55%, ${HUES[p.hue].deep})`,
                      boxShadow: `0 0 18px rgba(${HUES[p.hue].rgb},0.45)`,
                    }}
                  />
                  <span className="flex-1">
                    <span className="font-display block text-sm font-semibold tracking-[0.2em]">
                      {p.name}
                    </span>
                    <span className="text-[0.82rem] text-dim">{p.short}</span>
                  </span>
                  <span className="text-dim transition group-hover:translate-x-1 group-hover:text-[var(--iris)]" aria-hidden="true">
                    →
                  </span>
                </button>
                {i === 0 && (
                  <p className="mb-2 mt-3 text-center text-[0.66rem] tracking-[0.28em] uppercase text-faint">
                    tap a world to jump · or scroll
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => onEnter('skills')}
              className="panel group flex w-full items-center gap-4 p-4 text-left transition hover:border-[rgba(232,201,138,0.45)] hover:shadow-[0_0_30px_rgba(232,201,138,0.2)]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: 'radial-gradient(circle at 32% 30%, #f5e6c8, #d9b070 70%)',
                  boxShadow: '0 0 18px rgba(232,201,138,0.45)',
                }}
              >
                ✦
              </span>
              <span className="flex-1">
                <span className="font-display block text-sm font-semibold tracking-[0.2em]">THE STARS</span>
                <span className="text-[0.82rem] text-dim">Skills constellation</span>
              </span>
              <span className="text-dim transition group-hover:translate-x-1 group-hover:text-[var(--gold)]" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-10 px-8 py-4 md:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Intro className="text-center lg:text-left" />
          <svg
            viewBox="0 0 1000 720"
            style={{ width: '100%', maxHeight: '76vh', height: 'auto', margin: '0 auto', display: 'block' }}
            role="group"
            aria-label="Interactive map of Meghaa's universe, with the MEGHAA sun at the center and six orbiting worlds. Selecting a world scrolls to its section."
          >
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(124,92,255,0.20)" />
              <stop offset="45%" stopColor="rgba(60,50,110,0.10)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <radialGradient id="sun-core" cx="40%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#fff6df" />
              <stop offset="45%" stopColor="#f5e6c8" />
              <stop offset="100%" stopColor="#d9b070" />
            </radialGradient>
            {planets.map((p) => {
              const h = HUES[p.hue]
              return (
                <radialGradient key={p.id} id={`grad-${p.id}`} cx="36%" cy="30%" r="75%">
                  <stop offset="0%" stopColor={h.core} />
                  <stop offset="55%" stopColor={h.mid} />
                  <stop offset="100%" stopColor={h.deep} />
                </radialGradient>
              )
            })}
            {planets.map((p) => (
              <clipPath key={p.id} id={`clip-${p.id}`}>
                <circle cx={CX + p.orbit} cy={CY} r={p.size} />
              </clipPath>
            ))}
          </defs>

          <rect width="1000" height="720" fill="url(#bg-glow)" />

          <g transform="translate(500 358) scale(0.94) translate(-500 -358)">
          {planets.map((p, i) => (
            <circle
              key={p.id}
              cx={CX}
              cy={CY}
              r={p.orbit}
              fill="none"
              stroke="rgba(150,160,200,0.16)"
              strokeWidth={1}
              strokeDasharray={i % 2 === 0 ? '1 0' : '2 6'}
            />
          ))}

          <g
            role="button"
            tabIndex={0}
            aria-label="Skill constellation — the stars around Meghaa. Scroll to the skills section."
            onClick={(e) => {
              e.stopPropagation()
              setHoverId(null)
              onEnter('skills')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onEnter('skills')
              }
            }}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            <circle cx={CX} cy={CY} r={86} fill="rgba(232,201,138,0.05)" />
            <circle cx={CX} cy={CY} r={58} fill="rgba(232,201,138,0.08)" className="animate-sun-pulse" />
            <circle cx={CX} cy={CY} r={26} fill="url(#sun-core)" />
            <circle cx={CX - 8} cy={CY - 9} r={8} fill="rgba(255,255,255,0.55)" style={{ filter: 'blur(3px)' }} />
            <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(255,236,204,0.4)" strokeWidth={1.2} />
            <text
              x={CX}
              y={CY + 58}
              textAnchor="middle"
              className="font-display"
              style={{ fontSize: 15, letterSpacing: '0.42em', fill: '#eef1f8', pointerEvents: 'none' }}
            >
              MEGHAA
            </text>
            <text
              x={CX}
              y={CY + 78}
              textAnchor="middle"
              style={{ fontSize: 9.5, letterSpacing: '0.3em', fill: 'rgba(169,179,204,0.8)', pointerEvents: 'none' }}
            >
              THE CENTER OF IT ALL · REVEALS THE STARS
            </text>
          </g>

          {planets.map((p) => (
            <Planet
              key={p.id}
              planet={p}
              active={hoverId === p.id}
              onHover={setHoverId}
              onEnter={onEnter}
            />
          ))}
          </g>
        </svg>
        </div>
      </motion.div>

      <motion.footer
        variants={fadeUp}
        custom={2}
        className="pointer-events-none relative z-10 flex h-20 items-center justify-center px-6"
      >
        {hovered ? (
          <div className="pointer-events-auto panel flex items-center gap-4 px-6 py-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: HUES[hovered.hue].mid, boxShadow: `0 0 12px rgba(${HUES[hovered.hue].rgb},0.8)` }}
            />
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.18em]">{hovered.name}</p>
              <p className="text-[0.82rem] text-dim">{hovered.short}</p>
            </div>
            <span className="hidden text-[0.7rem] tracking-[0.2em] uppercase text-faint sm:inline">scroll to enter</span>
          </div>
        ) : (
          <p className="text-[0.66rem] tracking-[0.32em] uppercase text-faint">map of the meghaa system · six worlds · scroll down</p>
        )}
      </motion.footer>
    </motion.div>
  )
}