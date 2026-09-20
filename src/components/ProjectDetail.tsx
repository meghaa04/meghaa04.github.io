import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, type PipelineStep } from '../data'
import { Reveal, easeOut } from '../ui'

const KIND: Record<PipelineStep['kind'], { color: string; label: string }> = {
  vision: { color: '#7aa2ff', label: 'vision' },
  tabular: { color: '#7ad7c4', label: 'tabular' },
  fusion: { color: '#e8c98a', label: 'fusion' },
  output: { color: '#b39dff', label: 'output' },
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mb-10">
        <h3 className="font-display mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--iris)]">
          {title}
        </h3>
        <div className="text-[0.95rem] leading-relaxed text-dim">{children}</div>
      </section>
    </Reveal>
  )
}

function Pipeline({ steps }: { steps: PipelineStep[] }) {
  const [sel, setSel] = useState(steps[0].id)
  const current = steps.find((s) => s.id === sel) ?? steps[0]

  return (
    <div>
      <div role="group" aria-label="System architecture pipeline" className="mb-8 grid gap-y-2 gap-x-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
        {steps.map((s, i) => {
          const active = s.id === sel
          const kind = KIND[s.kind]
          const isLast = i === steps.length - 1
          return (
            <div key={s.id} className="contents">
              <button
                type="button"
                onClick={() => setSel(s.id)}
                className="panel mx-auto w-full min-w-0 px-4 py-4 text-left transition hover:-translate-y-1"
                aria-pressed={active}
                style={{
                  borderColor: active ? kind.color : undefined,
                  boxShadow: active ? `0 0 30px ${kind.color}44` : undefined,
                }}
              >
                <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.22em]" style={{ color: kind.color }}>
                  {kind.label}
                </span>
                <span className="font-display block text-[0.98rem] font-semibold leading-tight tracking-tight">
                  {s.label}
                </span>
                <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-faint">{s.sub}</span>
              </button>
              {!isLast && (
                <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
                  <svg width="26" height="10">
                    <line
                      x1="1"
                      y1="5"
                      x2="22"
                      y2="5"
                      stroke={active ? kind.color : 'rgba(169,179,204,0.4)'}
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      className="animate-[dash-flow_1.1s_linear_infinite]"
                    />
                    <path d="M20 2 L25 5 L20 8" fill="none" stroke={active ? kind.color : 'rgba(169,179,204,0.4)'} strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="panel border-l-2 p-5"
          style={{ borderLeftColor: KIND[current.kind].color }}
        >
          <p className="font-display mb-1 text-sm font-semibold">
            {current.label}
            <span className="ml-2 text-[0.7rem] uppercase tracking-[0.16em] text-faint">{current.sub}</span>
          </p>
          <p className="text-[0.9rem] leading-relaxed text-dim">{current.detail}</p>
        </motion.div>
      </AnimatePresence>
      <p className="mt-4 text-[0.72rem] tracking-[0.2em] uppercase text-faint">click any stage to read it</p>
    </div>
  )
}

export default function ProjectDetail({ id }: { id: string }) {
  const project = projects.find((p) => p.id === id) ?? projects[0]

  return (
    <div>
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="chip">{project.category}</span>
          <span className="chip">{project.status.toUpperCase()}</span>
        </div>
        <h2 className="font-display mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h2>
        <p className="max-w-3xl text-[1rem] leading-relaxed text-dim">{project.summary}</p>
      </Reveal>

      {project.metrics && (
        <Reveal>
          <div className="mb-10 mt-8 flex flex-wrap gap-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="panel flex flex-col items-center px-8 py-5">
                <span className="font-display text-4xl font-semibold text-[var(--iris)]">{m.value}</span>
                <span className="mt-1 text-[0.66rem] uppercase tracking-[0.2em] text-faint">{m.label}</span>
              </div>
            ))}
            {project.statusNote && (
              <p className="self-end text-[0.78rem] italic leading-relaxed text-faint">{project.statusNote}</p>
            )}
          </div>
        </Reveal>
      )}

      {project.problem && <Section title="The Problem">{project.problem}</Section>}

      {project.pipeline && (
        <Reveal>
          <section className="mb-10">
            <h3 className="font-display mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--iris)]">
              How it works
            </h3>
            <p className="mb-6 max-w-3xl text-[0.95rem] leading-relaxed text-dim">
              Two evidence streams meet, fuse into one signal, then open themselves up for inspection.
            </p>
            <Pipeline steps={project.pipeline} />
          </section>
        </Reveal>
      )}

      {project.idea && <Section title="The Idea">{project.idea}</Section>}

      {project.role && <Section title="My Role">{project.role}</Section>}

      {project.result && <Section title="Result">{project.result}</Section>}

      <Reveal>
        <section className="mb-10">
          <h3 className="font-display mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--iris)]">
            Technology
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={t} className="chip !px-4 !py-2 !text-[0.8rem]">
                <span
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: ['#7aa2ff', '#7ad7c4', '#e8c98a', '#b39dff', '#f0a6b4', '#c8a1ff'][i % 6] }}
                />
                {t}
              </span>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  )
}