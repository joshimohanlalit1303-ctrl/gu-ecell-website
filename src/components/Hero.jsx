import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['ideas', 'startups', 'ventures', 'products', 'solutions']
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

function useBadgeCounter(target, delay = 800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const dur = 1800, start = performance.now()
      const step = now => {
        const ease = 1 - Math.pow(1 - Math.min((now - start) / dur, 1), 3)
        setVal(Math.round(ease * target))
        if (ease < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(t)
  }, [target, delay])
  return val
}

function useScramble(text, active) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    if (!active) return
    let frame = 0; const total = 18
    const tick = () => {
      frame++
      setDisplay(text.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        return frame / total > i / text.length ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame < total + text.length) requestAnimationFrame(tick)
      else setDisplay(text)
    }
    tick()
  }, [text, active])
  return display
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [ready, setReady] = useState(false)
  const badgeVal = useBadgeCounter(100, 1000)
  const eyebrow = useScramble('Galgotias University', ready)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [ready])

  const handleClick = () => window.dispatchEvent(new CustomEvent('ecell-recolor'))

  const onMagMove = (e, btn) => {
    const r = btn.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    btn.style.transform = `translate(${dx * 0.28}px,${dy * 0.28}px)`
  }
  const onMagLeave = e => { e.currentTarget.style.transform = '' }

  return (
    <section id="hero" className="section hero-section" onClick={handleClick}>
      <motion.div className="hero-content"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <motion.p className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <span className="eyebrow-dot" />
            <span>{eyebrow}</span>
            <span className="eyebrow-line" />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--mono)' }}>
            Galgotias Entrepreneurship Cell
          </motion.p>
        </div>

        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}>
          <span className="line">Ignite Your</span>
          <span className="line gradient-text">Startup</span>
        </motion.h1>

        <motion.p className="hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}>
          We turn{' '}
          <AnimatePresence mode="wait">
            <motion.span key={wordIdx} className="type-word"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}>
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
          {' '}into ventures.<br />
          Join 500+ students building the future.
        </motion.p>

        <motion.div className="hero-actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          <button 
            className="btn btn-primary mag-btn"
            onMouseMove={e => onMagMove(e, e.currentTarget)} 
            onMouseLeave={onMagLeave}
            onClick={() => window.dispatchEvent(new Event('open-apply-popup'))}
          >
            Apply to GEC
          </button>
          <a href="#events" className="btn btn-ghost mag-btn"
            onMouseMove={e => onMagMove(e, e.currentTarget)} onMouseLeave={onMagLeave}
            onClick={e => { e.preventDefault(); e.stopPropagation(); document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) }}>
            See Events
          </a>
        </motion.div>

        <motion.div className="hero-pill-row"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
          <span className="hero-pill">🏆 National Winners</span>
          <span className="hero-pill">🤝 50+ Mentors</span>
          <span className="hero-pill">💰 Seed Funding</span>
        </motion.div>
      </motion.div>

      {/* Badge */}
      <motion.div className="hero-badge"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
        <svg className="badge-svg" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(108,71,255,0.2)" strokeWidth="1" />
          <circle cx="70" cy="70" r="65" fill="none" stroke="url(#bdg)" strokeWidth="1.5"
            strokeDasharray="408" className="badge-arc" />
          <defs>
            <linearGradient id="bdg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6c47ff" />
              <stop offset="100%" stopColor="#ff4778" />
            </linearGradient>
          </defs>
        </svg>
        <div className="badge-content">
          <span className="badge-num">{badgeVal}</span>
          <span className="badge-plus"> +</span>
          <span className="badge-lbl">Startups</span>
        </div>
      </motion.div>

      <div className="scroll-cue">
        <div className="scroll-cue-line" />
        <span>SCROLL</span>
      </div>
      <p className="tubes-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
        Move cursor · Click to recolor
      </p>
    </section>
  )
}
