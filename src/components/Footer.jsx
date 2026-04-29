import { useReveal } from '../hooks/useReveal'

export default function Footer() {
  const [footerRef] = useReveal()

  return (
    <footer id="footer" ref={footerRef}>
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">
            <span className="logo-e">G</span><span className="logo-cell">EC</span>
          </p>
          <p className="footer-sub">Galgotias University</p>
        </div>
        <div className="footer-info">
          <p>Plot No.2, Sector 17-A, Yamuna Expressway, Greater Noida</p>
          <p>
            <a href="mailto:registrar@galgotiasuniversity.edu.in">
              registrar@galgotiasuniversity.edu.in
            </a>
          </p>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 GEC. All rights reserved.</p>
          <div className="dev-mark">
            <span>Engineered by</span>
            <a href="https://github.com/joshimohanlalit1303-ctrl" target="_blank" rel="noreferrer" className="dev-mark-name">
              Lalit
              <span className="dev-mark-glow"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
