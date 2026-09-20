import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { name, tagline, quote } from '../data'
import { easeOut } from '../ui'

export default function Landing({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion()
  const [warp, setWarp] = useState(false)

  const enter = () => {
    if (reduced) {
      onEnter()
      return
    }
    setWarp(true)
    setTimeout(onEnter, 1150)
  }

  const fade = {
    hidden: { opacity: 0, y: 26 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: easeOut, delay: 0.2 + i * 0.16 },
    }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
          style={{ transformOrigin: 'center' }}
        />
        <div className="animate-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 h-[46vmin] w-[46vmin]" />
      </div>

      <motion.div variants={fade} custom={0} initial="hidden" animate="show">
        <p className="eyebrow">a personal digital universe</p>
      </motion.div>

      <motion.h1
        variants={fade}
        custom={1}
        initial="hidden"
        animate="show"
        className="font-display mt-6 font-semibold leading-[0.95] tracking-tight text-[clamp(2.7rem,9vw,6.6rem)]"
      >
        {name.toUpperCase()}
      </motion.h1>

      <motion.p
        variants={fade}
        custom={2}
        initial="hidden"
        animate="show"
        className="mt-6 text-sm sm:text-base tracking-[0.42em] uppercase text-[var(--iris)]"
      >
        {tagline}
      </motion.p>

      <motion.p
        variants={fade}
        custom={3}
        initial="hidden"
        animate="show"
        className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-dim"
      >
        “{quote}”
      </motion.p>

      <motion.div variants={fade} custom={4} initial="hidden" animate="show" className="mt-12">
        <button type="button" onClick={enter} className="btn-universe" aria-label="Enter my universe">
          Enter My Universe
          <span aria-hidden="true">→</span>
        </button>
        <p className="mt-5 text-[0.7rem] tracking-[0.28em] uppercase text-faint">
          six worlds to explore — ai · build · design · journey · knowledge · about
        </p>
      </motion.div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.66rem] tracking-[0.3em] uppercase text-faint">
        click through · no scrolling required
      </div>

      {warp && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,#e9d9ff_0%,#7c5cff_22%,#3a2b6e_45%,#0a0818_70%)]"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 7, opacity: 1, transition: { duration: 1.15, ease: 'easeIn' } }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}