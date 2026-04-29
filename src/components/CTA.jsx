import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const [ctaRef] = useReveal()
  const [footerRef] = useReveal()

  return (
    <>
      <section id="cta" className="section cta-section" ref={ctaRef}>
        <div className="cta-inner reveal">
          <p className="section-tag">Ready?</p>
          <h2 className="cta-title">Build Something <span className="gradient-text">Real.</span></h2>
          <p className="cta-body">Join hundreds of students turning ideas into startups. Applications are open.</p>
          <a
            href="mailto:registrar@galgotiasuniversity.edu.in"
            className="btn btn-primary btn-xl"
            id="cta-apply"
          >
            Apply to E-Cell →
          </a>
        </div>
      </section>

      <footer id="footer" ref={footerRef}>
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-logo">
              <span className="logo-e">E</span><span className="logo-cell">-CELL</span>
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
            <p className="footer-copy">© 2026 GU E-Cell. All rights reserved.</p>
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
    </>
  )
}
