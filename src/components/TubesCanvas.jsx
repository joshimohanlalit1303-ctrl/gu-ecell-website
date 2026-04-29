import { useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────
   TubesCanvas — Interactive 3D neon-tubes cursor
   Uses threejs-components@0.0.19/tubes1

   IMPORTANT: The library reads clientWidth/clientHeight
   from the canvas parent. We wrap in a fixed 100vw×100vh
   div so the library always sees viewport dimensions.
   ───────────────────────────────────────────── */

const BRAND_TUBE_COLORS  = ['#6c47ff', '#ff4778', '#00e5ff']
const BRAND_LIGHT_COLORS = ['#9b7eff', '#ff8fa3', '#80f0ff', '#a78bfa']

const randomHex     = ()  => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
const randomPalette = n   => Array.from({ length: n }, randomHex)

const WRAPPER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2,
  pointerEvents: 'auto',
  overflow: 'hidden',
}

const CANVAS_STYLE = {
  display: 'block',
  width: '100%',
  height: '100%',
}

export default function TubesCanvas() {
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)
  const appRef     = useRef(null)

  const recolor = useCallback(() => {
    if (!appRef.current) return
    try {
      appRef.current.tubes.setColors(randomPalette(3))
      appRef.current.tubes.setLightsColors(randomPalette(4))
    } catch { /* lib not ready yet */ }
  }, [])

  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    let mounted = true

    // ── Set canvas drawing buffer to match the wrapper (always viewport) ──
    const syncSize = () => {
      const w = wrapper.clientWidth  || window.innerWidth
      const h = wrapper.clientHeight || window.innerHeight
      canvas.width  = w
      canvas.height = h
    }
    syncSize()
    window.addEventListener('resize', syncSize)

    // ── Load tubes library (CDN ESM) ──
    import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
      .then(({ default: TubesCursor }) => {
        if (!mounted) return

        const app = TubesCursor(canvas, {
          tubes: {
            colors: BRAND_TUBE_COLORS,
            lights: { intensity: 200, colors: BRAND_LIGHT_COLORS },
          },
        })

        appRef.current = app
        console.log('%c[TubesCanvas] ✓ loaded', 'color:#6c47ff;font-weight:bold')
      })
      .catch(err => console.warn('[TubesCanvas] failed to load:', err))

    // ── Scroll: fade + disable pointer-events past hero ──
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      wrapper.style.opacity       = String(Math.max(1 - progress * 1.8, 0))
      wrapper.style.pointerEvents = progress > 0.55 ? 'none' : 'auto'
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Recolor from Hero click event ──
    window.addEventListener('ecell-recolor', recolor)

    return () => {
      mounted = false
      window.removeEventListener('resize', syncSize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('ecell-recolor', recolor)
      appRef.current = null
    }
  }, [recolor])

  return (
    <div ref={wrapperRef} style={WRAPPER_STYLE} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="tubes-canvas"
        style={CANVAS_STYLE}
        aria-hidden="true"
      />
    </div>
  )
}
