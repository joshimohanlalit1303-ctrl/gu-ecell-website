import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Teams', 'Events', 'Mentors']

  const isHome = window.location.pathname === '/' || window.location.pathname === '';

  const handleNav = (e, id) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  }

  return (
    <>
      <nav id="nav" className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="/" className="nav-logo" onClick={e => handleNav(e, 'hero')}>
          <span className="logo-e">G</span><span className="logo-cell">EC</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={`/#${l.toLowerCase()}`} className="nav-link"
              onClick={e => handleNav(e, l.toLowerCase())}>{l}</a>
          ))}
          <a href="/antigravity" className="nav-link" style={{color: 'var(--accent)'}}>Cohort</a>
        </div>
        <a href="/#cta" className="nav-cta" onClick={e => handleNav(e, 'cta')}>Join Now</a>
        <button className="nav-menu-btn" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
          <span style={menuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}} />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l} href={`/#${l.toLowerCase()}`} className="mobile-link"
            onClick={e => handleNav(e, l.toLowerCase())}>{l}</a>
        ))}
        <a href="/antigravity" className="mobile-link" style={{ color: 'var(--accent)' }}>Cohort</a>
        <a href="/#cta" className="mobile-link" style={{ color: 'var(--accent)' }}
          onClick={e => handleNav(e, 'cta')}>Join Now</a>
      </div>
    </>
  )
}
