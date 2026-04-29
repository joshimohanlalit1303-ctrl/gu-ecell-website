import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const [ctaRef] = useReveal()
  const [footerRef] = useReveal()

  return (
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
          Apply to GEC →
        </a>
      </div>
    </section>
  )
}
