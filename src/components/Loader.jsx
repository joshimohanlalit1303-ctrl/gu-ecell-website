import { useState, useEffect } from 'react'

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let progress = 0
    const id = setInterval(() => {
      progress += (100 - progress) * 0.07
      setPct(Math.min(Math.round(progress), 97))
      if (progress >= 97) clearInterval(id)
    }, 60)

    const onLoad = () => {
      clearInterval(id)
      setPct(100)
      setTimeout(() => { setHidden(true); onDone?.() }, 400)
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad)
    return () => { clearInterval(id); window.removeEventListener('load', onLoad) }
  }, [onDone])

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-inner">
        <div className="loader-hex">
          <div className="hex-ring hex-ring--1" />
          <div className="hex-ring hex-ring--2" />
          <div className="hex-ring hex-ring--3" />
          <div className="hex-core">{pct}%</div>
        </div>
        <p className="loader-label">Initializing E-Cell</p>
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: pct + '%' }} />
        </div>
      </div>
    </div>
  )
}
