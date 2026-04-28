import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const els = container.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseFloat(getComputedStyle(e.target).getPropertyValue('--delay') || '0')
          setTimeout(() => e.target.classList.add('in'), delay * 1000)
        }
      })
    }, { threshold })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [threshold])
  return [ref]
}
