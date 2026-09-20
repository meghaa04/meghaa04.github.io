import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, type View } from '../data'
import { easeOut } from '../ui'

const ITEMS: { id: 'universe' | View; label: string }[] = [
  { id: 'universe', label: 'UNIVERSE' },
  ...navItems.map((n) => ({ id: n.id as View, label: n.label })),
]

export default function Nav({
  active,
  onGo,
}: {
  active: View | 'universe' | null
  onGo: (target: 'universe' | View) => void
}) {
  const [open, setOpen] = useState(false)
  const current = active ?? 'universe'

  return (
    <>
      <nav className="fixed left-1/2 bottom-4 z-40 hidden -translate-x-1/2 md:block" aria-label="Primary">
        <div className="panel flex items-center gap-0.5 p-1">
          {ITEMS.map((item) => {
            const isActive = current === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onGo(item.id)}
                className="rounded-full px-3 py-2 font-display text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition"
                style={{
                  color: isActive ? '#0b0f1e' : 'var(--text-dim)',
                  background: isActive ? 'linear-gradient(180deg,#e6d9ff,#b39dff)' : 'transparent',
                  boxShadow: isActive ? '0 0 20px rgba(179,157,255,0.5)' : undefined,
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <nav className="fixed right-4 bottom-4 z-40 md:hidden" aria-label="Primary">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mission-chip h-12 w-12 !rounded-full items-center justify-center"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? '✕' : '✦'}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="panel absolute right-0 bottom-16 w-52 p-2"
            >
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onGo(item.id)
                  }}
                  className="block w-full rounded-xl px-4 py-2.5 text-left font-display text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition"
                  style={{
                    color: current === item.id ? '#0b0f1e' : 'var(--text-dim)',
                    background: current === item.id ? 'linear-gradient(180deg,#e6d9ff,#b39dff)' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}