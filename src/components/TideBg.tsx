import { useEffect, useRef } from 'react'

/** Flat ink field + restrained tide lines. No canvas gradients / glow discs. */
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
      t += 0.006
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      // Flat Harbor ink — no linear/radial fills
      ctx.fillStyle = '#0b1c24'
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < 7; i++) {
        const y = h * (0.18 + i * 0.12) + Math.sin(t * 0.9 + i) * 16
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= w; x += 12) {
          const yy =
            y +
            Math.sin(x * 0.007 + t * (0.9 + i * 0.1) + i) * (10 + i * 1.6) +
            Math.cos(x * 0.0025 - t * 0.8) * 5
          ctx.lineTo(x, yy)
        }
        const foam = 0.09 + i * 0.025
        ctx.strokeStyle = i % 3 === 1 ? `rgba(168, 137, 62, ${foam * 0.7})` : `rgba(58, 158, 148, ${foam})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

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
    </div>
  )
}
