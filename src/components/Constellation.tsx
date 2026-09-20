import { useMemo, useState } from 'react'
import { constellationGroups, type ConstellationGroup } from '../data'
import { SectionTitle, Reveal } from '../ui'

const W = 260
const H = 180

function sr(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function positions(n: number, seed: number) {
  const pos: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    let x = W / 2 + Math.cos(a) * 92 + (sr(i + seed) - 0.5) * 34
    let y = H / 2 + Math.sin(a) * 52 + (sr(i + 40 + seed) - 0.5) * 28
    x = Math.min(Math.max(x, 30), W - 30)
    y = Math.min(Math.max(y, 26), H - 26)
    pos.push([x, y])
  }
  return pos
}

function linksFor(n: number) {
  const links: [number, number][] = []
  for (let i = 0; i < n; i++) {
    links.push([i, (i + 1) % n])
    if (n > 3) links.push([i, (i + 2) % n])
  }
  return links
}

function GroupPanel({ group, index }: { group: ConstellationGroup; index: number }) {
  const [active, setActive] = useState<number | null>(null)
  const { pos, links } = useMemo(() => {
    return { pos: positions(group.stars.length, index * 13 + 5), links: linksFor(group.stars.length) }
  }, [group, index])

  const activeStar = active !== null ? group.stars[active] : null
  const tooltipBelow = active !== null && pos[active][1] < 42

  return (
    <Reveal delay={index * 0.05}>
      <section className="panel relative p-5 sm:p-6" aria-label={`${group.title} skills`}>
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">{group.title}</h3>
          <span className="text-[0.9rem]" style={{ color: group.accent }} aria-hidden="true">
            ✦
          </span>
        </div>
        <p className="mb-3 max-w-md text-[0.82rem] leading-relaxed text-dim">{group.note}</p>

        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="group"
            aria-hidden={activeStar ? false : undefined}
          >
            {links.map(([a, b], i) => {
              const touched = active !== null && (a === active || b === active)
              return (
                <line
                  key={i}
                  x1={pos[a][0]}
                  y1={pos[a][1]}
                  x2={pos[b][0]}
                  y2={pos[b][1]}
                  stroke={touched ? group.accent : 'rgba(169,179,204,0.28)'}
                  strokeWidth={touched ? 1.6 : 1}
                  opacity={touched ? 0.95 : 0.55}
                  strokeDasharray="3 5"
                  className={touched ? 'animate-[dash-flow_0.9s_linear_infinite]' : undefined}
                  style={{ transition: 'stroke 0.3s ease' }}
                />
              )
            })}
            {group.stars.map((s, i) => {
              const isActive = active === i
              const [x, y] = pos[i]
              return (
                <g
                  key={s.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${s.name}. ${s.blurb}`}
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActive(isActive ? null : i)
                    }
                  }}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {isActive && (
                    <circle cx={x} cy={y} r={11} fill={group.accent} style={{ opacity: 0.22 }} />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 5 : 3.4}
                    fill={isActive ? group.accent : 'rgba(232,237,255,0.85)'}
                    style={{
                      transition: 'r 0.25s ease',
                      filter: isActive
                        ? `drop-shadow(0 0 6px ${group.accent})`
                        : undefined,
                    }}
                  />
                  <text
                    x={x}
                    y={y + (isActive ? 25 : 22)}
                    textAnchor="middle"
                    className="font-display"
                    style={{
                      fontSize: '7.5px',
                      letterSpacing: '0.14em',
                      fill: isActive ? group.accent : 'rgba(169,179,204,0.7)',
                      textTransform: 'uppercase',
                      pointerEvents: 'none',
                      transition: 'fill 0.25s ease',
                    }}
                  >
                    {s.name}
                  </text>
                </g>
              )
            })}
          </svg>

          {active !== null && activeStar && (
            <div
              className="pointer-events-none absolute z-10 w-56"
              style={{
                left: `${Math.min(Math.max((pos[active][0] / W) * 100, 14), 86)}%`,
                top: `${(pos[active][1] / H) * 100}%`,
                transform: tooltipBelow
                  ? 'translate(-50%, 12px)'
                  : 'translate(-50%, calc(-100% - 14px))',
              }}
            >
              <div className="panel border p-4 text-left" style={{ borderColor: `${group.accent}66` }}>
                <p className="font-display mb-1 text-sm font-semibold" style={{ color: group.accent }}>
                  {activeStar.name}
                </p>
                <p className="text-[0.78rem] leading-relaxed text-dim">{activeStar.blurb}</p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-3 text-[0.64rem] uppercase tracking-[0.24em] text-faint">
          hover or focus a star to trace its connections
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="All skills, listed">
          {group.stars.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                className="chip transition hover:border-[var(--iris)] hover:text-[var(--text)]"
                style={{ color: active === i ? group.accent : undefined }}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  )
}

export default function Constellation() {
  return (
    <div>
      <SectionTitle
        eyebrow="the stars around me"
        title="SKILLS CONSTELLATION"
        lede="Skills as stars — hover one and watch its connections light up. No bars, no numbers: just what I use and where."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {constellationGroups.map((g, i) => (
          <GroupPanel key={g.id} group={g} index={i} />
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 text-[0.85rem] leading-relaxed text-faint">
          Four clusters orbit the whole picture: AI, development, cloud and design — together they’re the
          way I build end to end.
        </p>
      </Reveal>
    </div>
  )
}