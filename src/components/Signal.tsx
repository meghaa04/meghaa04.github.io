import { useState } from 'react'
import { contact } from '../data'
import { Reveal } from '../ui'

const ICONS: Record<string, React.ReactNode> = {
  mail: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  github: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" />
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
    </svg>
  ),
}

interface Channel {
  id: string
  label: string
  value: string
  icon: React.ReactNode
  href?: string
}

export default function Signal() {
  const [sent, setSent] = useState<string | null>(null)
  const [pulse, setPulse] = useState<string | null>(null)

  const channels: Channel[] = [
    {
      id: 'mail',
      label: 'Email',
      value: contact.email,
      icon: ICONS.mail,
      href: `mailto:${contact.email}`,
    },
  ]
  if (contact.github)
    channels.push({ id: 'github', label: 'GitHub', value: contact.github, icon: ICONS.github, href: contact.github })
  if (contact.linkedin)
    channels.push({ id: 'linkedin', label: 'LinkedIn', value: contact.linkedin, icon: ICONS.linkedin, href: contact.linkedin })

  const fire = (c: Channel) => {
    setPulse(c.id)
    setTimeout(() => setPulse(null), 900)
    setSent(c.id)
    setTimeout(() => setSent(null), 2600)
    if (c.id === 'mail' && c.href) {
      try {
        navigator.clipboard?.writeText(contact.email)
      } catch {
        /* ignore */
      }
      window.location.href = c.href
    } else if (c.href) {
      window.open(c.href, '_blank', 'noopener')
    }
  }

  return (
    <div>
      <Reveal>
        <h2 className="font-display mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          SEND A <span className="text-[var(--iris)]">SIGNAL</span>
        </h2>
        <p className="mb-10 max-w-xl text-[1rem] leading-relaxed text-dim">
          “Have a project, opportunity, or idea? This is the fastest channel into the universe.”
        </p>
      </Reveal>

      <div className={`grid gap-4 ${channels.length > 1 ? 'sm:grid-cols-3' : 'sm:max-w-md'}`}>
        {channels.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.07}>
            <button
              type="button"
              onClick={() => fire(c)}
              className="panel relative w-full overflow-hidden p-6 text-left transition hover:-translate-y-1 hover:border-[rgba(122,162,255,0.45)] hover:shadow-[0_0_34px_rgba(122,162,255,0.2)]"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{c.label}</span>
                <span className="text-[var(--iris)]" aria-hidden="true">
                  {ICONS[c.id]}
                </span>
              </div>
              <p className="font-display mt-3 truncate text-[1.05rem] font-semibold tracking-tight">
                {c.value}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-faint">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--teal)] animate-sun-pulse"
                  aria-hidden="true"
                />
                {sent === c.id ? 'signal transmitted ✓' : 'open channel'}
              </p>
              {pulse === c.id && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-6 h-4 w-4 rounded-full border border-[var(--iris)]"
                  style={{ animation: 'signal-ring 0.9s ease-out forwards' }}
                />
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="panel mt-8 max-w-xl p-6">
          <p className="eyebrow mb-2">availability</p>
          <p className="font-display text-[1rem] font-medium leading-relaxed text-[var(--text)]">
            {contact.availability}
          </p>
        </div>
      </Reveal>
    </div>
  )
}