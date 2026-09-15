import { useEffect, useRef } from 'react'

export function TideBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      t += 0.008
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#07141c')
      g.addColorStop(0.55, '#0b1c24')
      g.addColorStop(1, '#102830')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < 5; i++) {
        const y = h * (0.25 + i * 0.12) + Math.sin(t + i) * 18
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= w; x += 12) {
          const yy =
            y +
            Math.sin(x * 0.008 + t * (1.2 + i * 0.15) + i) * (10 + i * 3) +
            Math.cos(x * 0.003 - t) * 6
          ctx.lineTo(x, yy)
        }
        ctx.strokeStyle = `rgba(91, 213, 200, ${0.04 + i * 0.018})`
        ctx.lineWidth = 1.25
        ctx.stroke()
      }

      // soft moon disc
      const mx = w * 0.82
      const my = h * 0.16
      const rg = ctx.createRadialGradient(mx, my, 4, mx, my, 90)
      rg.addColorStop(0, 'rgba(239, 232, 220, 0.22)')
      rg.addColorStop(0.4, 'rgba(91, 213, 200, 0.08)')
      rg.addColorStop(1, 'rgba(11, 28, 36, 0)')
      ctx.fillStyle = rg
      ctx.beginPath()
      ctx.arc(mx, my, 90, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="tide-bg" aria-hidden="true">
      <canvas ref={ref} className="tide-canvas" />
      <div className="tide-grain" />
      <div className="tide-vignette" />
    </div>
  )
}
