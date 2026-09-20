import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Star {
  x: number
  y: number
  r: number
  base: number
  layer: number
  phase: number
  pulse: number
}

interface Shooter {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  len: number
}

const LAYER_MAX = 3

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const reducedRef = useRef(reduced)
  reducedRef.current = reduced

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let running = true

    let stars: Star[] = []
    let shooters: Shooter[] = []
    let raf = 0
    let nextShoot = performance.now() + 2600
    const mouse = { x: w / 2, y: h / 2, tx: w / 2, ty: h / 2 }
    const offset = { x: 0, y: 0 }

    const build = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(280, Math.floor((w * h) / 8200))
      stars = new Array(count).fill(null).map(() => {
        const layer = 1 + Math.floor(Math.random() * LAYER_MAX)
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: (layer === 3 ? Math.random() * 0.5 + 0.4 : Math.random() * 1.1 + 0.3) * 0.85,
          base: 0.28 + Math.random() * 0.55,
          layer,
          phase: Math.random() * Math.PI * 2,
          pulse: 0.5 + Math.random() * 1.6,
        }
      })
      if (reducedRef.current) {
        draw()
      }
    }

    const draw = (t = 0) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      const lx = offset.x
      const ly = offset.y

      for (const s of stars) {
        const px = s.x + lx * s.layer * 1.6
        const py = s.y + ly * s.layer * 1.6
        const twinkle =
          reducedRef.current ? 0.78 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.pulse + s.phase)
        const a = s.base * twinkle
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(215,224,255,${a})`
        ctx.fill()
        if (s.layer === 3 && !reducedRef.current) {
          ctx.beginPath()
          ctx.arc(px, py, s.r * 3.1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(150,170,255,${a * 0.08})`
          ctx.fill()
        }
      }

      if (!reducedRef.current) {
        ctx.beginPath()
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 230)
        g.addColorStop(0, 'rgba(124,92,255,0.09)')
        g.addColorStop(0.5, 'rgba(122,162,255,0.04)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)

        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i]
          sh.x += sh.vx
          sh.y += sh.vy
          sh.life += 1
          if (sh.life > sh.max) {
            shooters.splice(i, 1)
            continue
          }
          const k = 1 - sh.life / sh.max
          const tx = sh.x - sh.vx * sh.len
          const ty = sh.y - sh.vy * sh.len
          const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty)
          grad.addColorStop(0, `rgba(240,236,255,${0.85 * k})`)
          grad.addColorStop(1, 'rgba(240,236,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1.4
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(sh.x, sh.y)
          ctx.lineTo(tx, ty)
          ctx.stroke()
        }
      }
    }

    const tick = (t: number) => {
      if (!running) return
      const targetX = (mouse.tx - w / 2) / (w / 2)
      const targetY = (mouse.ty - h / 2) / (h / 2)
      offset.x += (targetX - offset.x) * 0.03
      offset.y += (targetY - offset.y) * 0.03
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08

      if (!reducedRef.current && performance.now() > nextShoot) {
        nextShoot = performance.now() + 3200 + Math.random() * 3400
        const fromTop = Math.random() > 0.5
        const angle = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1)
        const speed = 7 + Math.random() * 6
        shooters.push({
          x: fromTop ? Math.random() * w : -30,
          y: fromTop ? -30 : Math.random() * h * 0.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 1.4,
          life: 0,
          max: 90 + Math.random() * 60,
          len: 12 + Math.random() * 10,
        })
      }

      draw(t)
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX
      mouse.ty = e.clientY
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    const onResize = () => build()
    window.addEventListener('resize', onResize)

    build()

    if (reducedRef.current) {
      draw()
    } else {
      raf = requestAnimationFrame(tick)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,3,8,0.5)_100%)]" />
    </div>
  )
}