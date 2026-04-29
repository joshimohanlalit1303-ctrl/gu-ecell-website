import { useState, useEffect, lazy, Suspense } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Stats from './components/Stats'
import About from './components/About'
import Teams from './components/Teams'
import Events from './components/Events'
import Mentors from './components/Mentors'
import CTA from './components/CTA'

// Lazy load heavy 3D components — they don't affect first paint
const ParallaxCanvas = lazy(() => import('./components/ParallaxCanvas'))
const TubesCanvas = lazy(() => import('./components/TubesCanvas'))

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  // Global scroll-reveal — catches every .reveal in every component
  useEffect(() => {
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const delay = parseFloat(
              getComputedStyle(e.target).getPropertyValue('--delay') || '0'
            )
            setTimeout(() => e.target.classList.add('in'), delay * 1000)
          }
        })
      }, { threshold: 0.08 })
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
      return () => obs.disconnect()
    }, 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? Math.min(window.scrollY / max, 1) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />

      {/* Scroll progress bar */}
      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="scroll-progress"
        style={{ width: scrollPct + '%' }}
      />

      {/* 3D background layers — lazy loaded, non-blocking */}
      <Suspense fallback={null}>
        <ParallaxCanvas />
      </Suspense>
      {/* Tubes load eagerly (CDN import is async, won't block paint) */}
      <Suspense fallback={null}>
        <TubesCanvas />
      </Suspense>

      <Nav />

      <main id="main-content">
        <Hero />
        <Ticker />
        <Stats />
        <About />
        <Teams />
        <Events />
        <Mentors />
        <CTA />
      </main>
    </>
  )
}
