import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { projects, buildProjects, designAreas, journey, certifications, learningInterests, aboutFacts, type Project } from '../data'
import { Reveal, SectionTitle } from '../ui'
import ProjectDetail from './ProjectDetail'

function StatusPill({ status }: { status: string }) {
  const color =
    status === 'private'
      ? '#f0a6b4'
      : status === 'internship'
        ? '#7ad7c4'
        : status === 'exploratory'
          ? '#e8c98a'
          : '#b39dff'
  return (
    <span className="chip" style={{ color, borderColor: `${color}55` }}>
      {status === 'private' ? 'private' : status === 'internship' ? 'internship' : status === 'exploratory' ? 'exploring' : 'unpublished'}
    </span>
  )
}

function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: Project
  onOpen: (id: string) => void
  featured?: boolean
}) {
  return (
    <Reveal className={featured ? 'sm:col-span-2' : ''}>
      <article
        className={`panel group flex h-full cursor-pointer flex-col p-6 transition hover:-translate-y-1 hover:border-[rgba(179,157,255,0.45)] hover:shadow-[0_0_40px_rgba(124,92,255,0.18)] ${
          featured ? 'border-[rgba(122,162,255,0.4)]' : ''
        }`}
        onClick={() => onOpen(project.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen(project.id)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Explore project: ${project.title}`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="chip">{project.category}</span>
          <StatusPill status={project.status} />
          {featured && (
            <span className="chip !text-[0.64rem] text-[var(--gold)]" style={{ borderColor: 'rgba(232,201,138,0.4)' }}>
              FLAGSHIP SYSTEM
            </span>
          )}
        </div>
        <h3 className="font-display mb-2 text-xl font-semibold leading-snug tracking-tight">
          {project.title}
        </h3>
        <p className="mb-5 flex-1 text-[0.9rem] leading-relaxed text-dim">{project.summary}</p>

        {project.metrics && (
          <div className="mb-5 flex gap-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-2xl font-semibold text-[var(--iris)]">{m.value}</p>
                <p className="text-[0.66rem] uppercase tracking-[0.16em] text-faint">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4 border-t border-white/5 pt-4">
          <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-faint">
            tech stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip !text-[0.68rem]">
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[0.72rem] uppercase tracking-[0.2em] text-faint transition group-hover:text-[var(--iris)]">
          open mission <span aria-hidden="true">→</span>
        </p>
      </article>
    </Reveal>
  )
}

export function AiLabView() {
  const [open, setOpen] = useState<Project | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [open])

  return (
    <div>
      <SectionTitle
        eyebrow="world 01"
        title="AI LAB"
        lede="Neural worlds I've trained and explained — machine learning, computer vision and explainable AI."
      />

      {open ? (
        <div ref={detailRef} className="scroll-mt-24">
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="mission-chip mb-8 !py-2 !text-[0.68rem]"
          >
            <span aria-hidden="true">←</span> back to missions
          </button>
          <ProjectDetail id={open.id} />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={(id) => setOpen(projects.find((x) => x.id === id) ?? null)} featured={p.featured} />
          ))}
        </div>
      )}

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-[0.85rem] leading-relaxed text-faint">
          Every system here answers two questions: does the model work, and can a person understand and
          act on what it says?
        </p>
      </Reveal>
    </div>
  )
}

export function BuildView() {
  return (
    <div>
      <SectionTitle
        eyebrow="world 02"
        title="BUILD"
        lede="What I've shipped — frontend development for an Art of Living event, as an IT / Frontend intern."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {buildProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <article className="panel flex h-full flex-col p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="chip">{p.category}</span>
                <StatusPill status={p.status} />
              </div>
              <h3 className="font-display mb-2 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mb-4 text-[0.9rem] leading-relaxed text-dim">{p.summary}</p>
              <dl className="mb-5 space-y-3 text-[0.87rem]">
                <div>
                  <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-faint">the problem</dt>
                  <dd className="mt-1 text-dim">{p.problem}</dd>
                </div>
                <div>
                  <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-faint">my role</dt>
                  <dd className="mt-1 text-dim">{p.role}</dd>
                </div>
              </dl>
              <div className="mt-auto">
                <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-faint">
                  tech stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip !text-[0.68rem]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="panel mt-6 p-6">
          <h3 className="font-display mb-3 text-sm font-semibold tracking-[0.18em] uppercase">
            how I approach frontend work
          </h3>
          <ul className="grid gap-3 text-[0.9rem] leading-relaxed text-dim sm:grid-cols-2">
            <li>— responsive layouts that hold together from phone to desktop</li>
            <li>— clean, intentional interactions and hover states</li>
            <li>— well-organised presentation of large amounts of information</li>
            <li>— interfaces built around the people who actually use them</li>
          </ul>
        </div>
      </Reveal>
    </div>
  )
}

export function DesignView() {
  return (
    <div>
      <SectionTitle
        eyebrow="world 03"
        title="DESIGN"
        lede="The interface is where a model meets a person. A few areas of UI/UX I care about."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {designAreas.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.05}>
            <article className="panel group h-full p-6 transition hover:-translate-y-1 hover:border-[rgba(232,201,138,0.4)] hover:shadow-[0_0_36px_rgba(232,201,138,0.14)]">
              <span className="font-display mb-4 block text-2xl text-[var(--gold)]" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="font-display mb-2 text-lg font-semibold tracking-tight">{d.title}</h3>
              <p className="text-[0.9rem] leading-relaxed text-dim">{d.summary}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-[0.85rem] leading-relaxed text-faint">
          This universe is a design experiment too — every screen here is hand-built with React, CSS and
          motion, from this glow to the gradient on that star.
        </p>
      </Reveal>
    </div>
  )
}

export function JourneyView() {
  return (
    <div>
      <SectionTitle
        eyebrow="world 04"
        title="JOURNEY"
        lede="Checkpoints along the way — from school and a B.Tech in computer science to internships and the roads still ahead."
      />
      <ol className="relative mt-10">
        <div aria-hidden="true" className="absolute bottom-2 left-[13px] top-2 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        {journey.map((c, i) => {
          const left = i % 2 === 0
          const hue =
            c.kind === 'degree'
              ? '#7aa2ff'
              : c.kind === 'school'
                ? '#e8c98a'
                : c.kind === 'intern'
                  ? '#7ad7c4'
                  : '#b39dff'
          return (
            <li
              key={c.period}
              className={`relative mb-8 pl-10 md:w-1/2 md:pl-0 ${
                left ? 'md:pr-12' : 'md:ml-auto md:pl-12'
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-5 left-0 h-3.5 w-3.5 rounded-full border-2 bg-[#070a16] md:top-6 ${
                  left ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:-translate-x-1/2'
                }`}
                style={{ borderColor: hue, boxShadow: `0 0 12px ${hue}88` }}
              />
              <Reveal>
                <article className="panel group p-6 transition hover:border-[rgba(179,157,255,0.4)]">
                  <p className="eyebrow mb-2" style={{ color: hue }}>
                    {c.period}
                  </p>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-1 text-[0.9rem] text-dim">{c.org}</p>
                  {c.detail && <p className="mt-2 text-[0.82rem] leading-relaxed text-faint">{c.detail}</p>}
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function KnowledgeView({ onOpenSkills }: { onOpenSkills: () => void }) {
  return (
    <div>
      <SectionTitle
        eyebrow="world 05"
        title="KNOWLEDGE"
        lede="Certifications earned and skies being mapped — learning never really stops."
      />
      <div className="grid gap-5 sm:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.06}>
            <article className="panel flex h-full flex-col p-6">
              <span aria-hidden="true" className="mb-4 inline-block h-3 w-3 rounded-full bg-[var(--iris)] animate-sun-pulse" />
              <h3 className="font-display mb-1 text-[1.02rem] font-semibold leading-snug tracking-tight">
                {c.name}
              </h3>
              <p className="mb-3 text-[0.78rem] uppercase tracking-[0.16em] text-[var(--iris)]">{c.provider}</p>
              <p className="mt-auto text-[0.85rem] leading-relaxed text-dim">{c.topic}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <h3 className="font-display mb-4 mt-10 text-lg font-semibold tracking-tight">CURRENTLY EXPLORING</h3>
        <div className="flex flex-wrap gap-2">
          {learningInterests.map((l) => (
            <span key={l} className="chip !px-4 !py-2 !text-[0.82rem] transition hover:border-[var(--iris)] hover:text-[var(--text)]">
              {l}
            </span>
          ))}
        </div>
      </Reveal>

      <motion.button
        type="button"
        onClick={onOpenSkills}
        className="mt-10 inline-flex items-center gap-3 rounded-full border border-[rgba(232,201,138,0.35)] px-6 py-3 font-display text-[0.78rem] uppercase tracking-[0.18em] text-[var(--gold)] transition hover:shadow-[0_0_24px_rgba(232,201,138,0.25)]"
        whileHover={{ y: -2 }}
      >
        see the full skill constellation <span aria-hidden="true">✦</span>
      </motion.button>
    </div>
  )
}

export function AboutView() {
  return (
    <div>
      <SectionTitle
        eyebrow="world 06"
        title="ABOUT"
        lede="Small pieces, floating — enough to know who's running this universe."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {aboutFacts.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06}>
            <div className="panel animate-float h-full p-6" style={{ animationDelay: `${i * 0.8}s` }}>
              <p className="eyebrow mb-3" style={{ color: ['#7aa2ff', '#7ad7c4', '#e8c98a', '#b39dff'][i] }}>
                {f.q}
              </p>
              <p className="font-display text-lg font-semibold leading-snug tracking-tight">{f.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <h3 className="font-display mb-3 mt-10 text-sm font-semibold tracking-[0.18em] uppercase">three things I orbit around</h3>
        <div className="flex flex-wrap gap-2">
          {['AI / ML systems', 'Explainable AI', 'Product & interface'].map((t) => (
            <span key={t} className="chip !px-4 !py-2 !text-[0.82rem]">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-8 max-w-2xl text-[0.9rem] leading-relaxed text-dim">
          Computer science graduate · curious · technical · creative · product-minded. This whole universe
          is the answer to “show me what you care about.”
        </p>
      </Reveal>
    </div>
  )
}