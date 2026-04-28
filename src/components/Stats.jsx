import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Counter({ target, suffix = '' }) {
  const [ref, inView] = useInView(0.4)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 2000, start = performance.now()
    const step = now => {
      const ease = 1 - Math.pow(1 - Math.min((now - start) / dur, 1), 3)
      setVal(Math.round(ease * target))
      if (ease < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return <span ref={ref} className="stat-val">{val}{suffix}</span>
}

const stats = [
  { val: 100, suffix: '+', label: 'Startups Incubated' },
  { val: 8, suffix: '', label: 'Specialized Teams' },
  { val: 500, suffix: '+', label: 'Students Engaged' },
  { val: 24, suffix: 'hr', label: 'Hackathon Marathon' },
]

export default function Stats() {
  return (
    <section id="stats" className="section stats-section">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card reveal in">
            <Counter target={s.val} /><span className="stat-suffix">{s.suffix}</span>
            <p className="stat-lbl">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
