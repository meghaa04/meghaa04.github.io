import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import Starfield from './components/Starfield'
import LoadingScreen from './components/LoadingScreen'
import Landing from './components/Landing'
import Universe from './components/Universe'
import Constellation from './components/Constellation'
import Signal from './components/Signal'
import {
  AiLabView,
  BuildView,
  DesignView,
  JourneyView,
  KnowledgeView,
  AboutView,
} from './components/planetViews'
import Nav from './components/Nav'
import MissionFile from './components/MissionFile'
import { planets, type SectionId, type View } from './data'

type Phase = 'loading' | 'landing' | 'explore'

const isSectionId = (id: string): id is SectionId | 'skills' =>
  id === 'skills' || planets.some((p) => p.id === id)

export default function App() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('loading')
  const [active, setActive] = useState<string>('universe')
  const [hint, setHint] = useState(true)
  const nodes = useRef(new Map<string, HTMLElement>()).current

  const register = useCallback(
    (id: string) =>
      (el: HTMLElement | null) => {
        if (el) nodes.set(id, el)
        else nodes.delete(id)
      },
    [],
  )

  const scrollTo = useCallback(
    (id: string) => {
      setHint(false)
      const behavior = reduced ? 'auto' : 'smooth'
      if (id === 'universe') {
        window.scrollTo({ top: 0, behavior })
        return
      }
      const el = nodes.get(id)
      if (el) el.scrollIntoView({ behavior, block: 'start' })
    },
    [nodes, reduced],
  )

  useEffect(() => {
    if (phase !== 'explore') return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 },
    )
    nodes.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [phase, nodes])

  useEffect(() => {
    document.body.style.overflow = phase === 'explore' ? '' : 'hidden'
    if (phase === 'explore') window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  const go = useCallback(
    (target: 'universe' | View) => {
      scrollTo(target)
    },
    [scrollTo],
  )

  const enterWorld = useCallback(
    (id: SectionId | 'skills') => {
      scrollTo(id)
    },
    [scrollTo],
  )

  const navActive: View | 'universe' | null =
    active === 'universe' ? 'universe' : isSectionId(active) ? active : null

  return (
    <div className="relative">
      <Starfield />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" onDone={() => setPhase('landing')} />
        )}
        {phase === 'landing' && <Landing key="landing" onEnter={() => setPhase('explore')} />}
      </AnimatePresence>

      {phase === 'explore' && (
        <main id="explore" className="relative pb-28">
          <div ref={register('universe')} className="absolute bottom-0 h-px w-px" aria-hidden="true" />
          <Universe key="universe" onEnter={enterWorld} hintDismissed={!hint} />

          <section id="ai" ref={register('ai')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <AiLabView />
            </div>
          </section>

          <section id="build" ref={register('build')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <BuildView />
            </div>
          </section>

          <section id="design" ref={register('design')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <DesignView />
            </div>
          </section>

          <section id="journey" ref={register('journey')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <JourneyView />
            </div>
          </section>

          <section id="knowledge" ref={register('knowledge')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <KnowledgeView onOpenSkills={() => go('skills')} />
            </div>
          </section>

          <section id="about" ref={register('about')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <AboutView />
            </div>
          </section>

          <section id="skills" ref={register('skills')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <Constellation />
            </div>
          </section>

          <section id="signal" ref={register('signal')} className="scroll-mt-16">
            <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
              <Signal />
            </div>
          </section>
        </main>
      )}

      {phase === 'explore' && (
        <>
          <Nav active={navActive} onGo={go} />
          <MissionFile />
        </>
      )}

      <a href="#ai" className="skip-link">
        Skip to first world
      </a>
    </div>
  )
}