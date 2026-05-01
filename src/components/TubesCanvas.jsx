import { useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────
   TubesCanvas — Interactive 3D neon-tubes cursor
   Uses threejs-components@0.0.19/tubes1

   Mobile: touch events are bridged to synthetic
   MouseEvents & PointerEvents so the library's mousemove
   and pointermove listeners pick them up and the tubes follow your finger.
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
  touchAction: 'none', // prevent scroll from stealing the touch
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

    // ── Canvas drawing buffer = viewport size (library reads clientHeight) ──
    const syncSize = () => {
      canvas.width  = wrapper.clientWidth  || window.innerWidth
      canvas.height = wrapper.clientHeight || window.innerHeight
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

    // ── Pointer/Touch → Mouse bridge (makes tubes follow finger) ──
    let rafid = null
    const onMove = (clientX, clientY) => {
      if (rafid) cancelAnimationFrame(rafid)
      rafid = requestAnimationFrame(() => {
        if (!canvasRef.current) return

        const mouseEvt = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX,
          clientY,
          view: window,
        })

        const pointerEvt = new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX,
          clientY,
          pointerType: 'touch',
          pointerId: 1,
          isPrimary: true,
          view: window,
        })

        // Target: window, document, document.body, canvas, wrapper
        const targets = [
          window,
          document,
          document.body,
          canvasRef.current,
          wrapperRef.current
        ].filter(Boolean)

        targets.forEach(t => {
          try {
            t.dispatchEvent(mouseEvt)
            t.dispatchEvent(pointerEvt)
          } catch (e) { /* ignore any target dispatch errors */ }
        })
      })
    }

    const onPointerMove = e => onMove(e.clientX, e.clientY)
    const onPointerDown = e => onMove(e.clientX, e.clientY)

    const onTouchMove = e => {
      if (e.touches && e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchStart = e => {
      if (e.touches && e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onTouchEnd = () => recolor()

    // Add listeners to window
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('touchmove',   onTouchMove,   { passive: true })
    window.addEventListener('touchstart',  onTouchStart,  { passive: true })
    window.addEventListener('touchend',    onTouchEnd,    { passive: true })

    // Add listeners to wrapper
    wrapper.addEventListener('pointermove', onPointerMove, { passive: true })
    wrapper.addEventListener('pointerdown', onPointerDown, { passive: true })
    wrapper.addEventListener('touchmove',   onTouchMove,   { passive: true })
    wrapper.addEventListener('touchstart',  onTouchStart,  { passive: true })
    wrapper.addEventListener('touchend',    onTouchEnd,    { passive: true })

    // ── Scroll: fade out + disable pointer-events past hero ──
    const onScroll = () => {
      const isCohort = window.location.pathname.startsWith('/cohort')
      if (isCohort) {
        wrapper.style.opacity = '1'
        wrapper.style.pointerEvents = 'none'
        return
      }
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      wrapper.style.opacity       = String(Math.max(1 - progress * 1.8, 0))
      wrapper.style.pointerEvents = progress > 0.55 ? 'none' : 'auto'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Call once to set initial state
    onScroll()

    // ── Recolor from Hero section click event ──
    window.addEventListener('ecell-recolor', recolor)

    return () => {
      mounted = false
      if (rafid) cancelAnimationFrame(rafid)
      window.removeEventListener('resize',        syncSize)
      window.removeEventListener('scroll',        onScroll)
      window.removeEventListener('ecell-recolor', recolor)

      window.removeEventListener('pointermove',   onPointerMove)
      window.removeEventListener('pointerdown',   onPointerDown)
      window.removeEventListener('touchmove',     onTouchMove)
      window.removeEventListener('touchstart',    onTouchStart)
      window.removeEventListener('touchend',      onTouchEnd)

      wrapper.removeEventListener('pointermove',  onPointerMove)
      wrapper.removeEventListener('pointerdown',  onPointerDown)
      wrapper.removeEventListener('touchmove',    onTouchMove)
      wrapper.removeEventListener('touchstart',   onTouchStart)
      wrapper.removeEventListener('touchend',     onTouchEnd)

      appRef.current = null
    }
  }, [recolor])

  return (
    <div ref={wrapperRef} className="tubes-canvas-wrapper" style={WRAPPER_STYLE} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="tubes-canvas"
        style={CANVAS_STYLE}
        aria-hidden="true"
      />
    </div>
  )
}
