import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    let rafId
    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const hoverEls = document.querySelectorAll('a,button,.btn,.flip-card,.event-card,.stat-card,.leader-card')
    const addHov = () => document.body.classList.add('hov')
    const remHov = () => document.body.classList.remove('hov')
    hoverEls.forEach(el => { el.addEventListener('mouseenter', addHov); el.addEventListener('mouseleave', remHov) })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      hoverEls.forEach(el => { el.removeEventListener('mouseenter', addHov); el.removeEventListener('mouseleave', remHov) })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} className="cursor-dot" />
      <div id="cursor-ring" ref={ringRef} className="cursor-ring" />
    </>
  )
}
