import { useEffect, useRef } from 'react'

export default function TubesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let mounted = true

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const randomHex = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
    const randomColors = n => Array.from({ length: n }, randomHex)

    let app = null
    import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
      .then(({ default: TubesCursor }) => {
        if (!mounted) return
        app = TubesCursor(canvas, {
          tubes: {
            colors: ['#6c47ff', '#ff4778', '#00e5ff'],
            lights: { intensity: 200, colors: ['#9b7eff', '#ff8fa3', '#80f0ff', '#a78bfa'] },
          },
        })
        console.log('%c[Tubes] ✓', 'color:#6c47ff;font-weight:bold')
      })
      .catch(e => console.warn('[Tubes] failed', e))

    // Fade on scroll
    const onScroll = () => {
      const p = Math.min(window.scrollY / window.innerHeight, 1)
      canvas.style.opacity = Math.max(1 - p * 1.8, 0)
      canvas.style.pointerEvents = p > 0.55 ? 'none' : 'auto'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Click to recolor — dispatch from hero
    const onRecolor = () => {
      if (!app) return
      try { app.tubes.setColors(randomColors(3)); app.tubes.setLightsColors(randomColors(4)) } catch {}
    }
    window.addEventListener('ecell-recolor', onRecolor)

    return () => {
      mounted = false
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('ecell-recolor', onRecolor)
    }
  }, [])

  return <canvas ref={canvasRef} className="tubes-canvas" aria-hidden="true" />
}
