import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const STEPS = [
  'INITIALIZING UNIVERSE…',
  'Loading identity…',
  'Mapping projects…',
  'Connecting skills…',
  'Generating constellation…',
]

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
    const iv = setInterval(() => {
      setIdx((i) => {
        const n = i + 1
        if (n > STEPS.length) clearInterval(iv)
        return n
      })
    }, 560)
    return () => clearInterval(iv)
  }, [reduced, onDone])

  useEffect(() => {
    if (reduced) return
    if (idx > STEPS.length) {
      const t = setTimeout(onDone, 950)
      return () => clearTimeout(t)
    }
  }, [idx, reduced, onDone])

  const showWelcome = idx > STEPS.length
  const current = STEPS[Math.min(idx, STEPS.length - 1)]

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#04060d]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-8 left-8 flex items-center gap-2 eyebrow">
        <span className="inline-block h-2 w-2 rounded-full bg-[var(--gold)]" />
        MEGHAA SUNIL
      </div>

      <div className="flex min-h-16 items-center justify-center">
        <AnimatePresence mode="wait">
          {!showWelcome ? (
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-display text-sm sm:text-base tracking-[0.22em] uppercase text-dim"
            >
              {current}
            </motion.p>
          ) : (
            <motion.p
              key="welcome"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-lg sm:text-2xl font-semibold tracking-[0.18em] uppercase"
            >
              Welcome, Explorer.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-8 h-10 w-56">
        <svg viewBox="0 0 224 40" className="h-full w-full" aria-hidden="true">
          <path
            d="M 12 24 A 100 16 0 1 1 212 24"
            fill="none"
            stroke="rgba(150,160,200,0.25)"
            strokeWidth="1.5"
          />
          <circle r="3.2" fill="var(--gold)" className="animate-sun-pulse">
            <animateMotion
              dur={reduced ? '0.001s' : '1.6s'}
              repeatCount="indefinite"
              path="M 12 24 A 100 16 0 1 1 212 24"
            />
          </circle>
        </svg>
      </div>

      <p className="absolute bottom-8 text-[0.68rem] tracking-[0.3em] uppercase text-faint">
        a personal digital universe · 2026
      </p>
    </motion.div>
  )
}