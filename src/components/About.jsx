import { useReveal } from '../hooks/useReveal'

export default function About() {
  const [ref] = useReveal()
  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="about-inner">
        <div className="about-text">
          <p className="section-tag reveal">About Galgotias Entrepreneurship Cell</p>
          <h2 className="section-title reveal">More than a club.<br /><em>An ecosystem.</em></h2>
          <p className="section-body reveal">
            Galgotias Entrepreneurship Cell (GEC) connects student entrepreneurs with seasoned mentors, investors,
            and industry leaders. We provide the tools, resources, and community
            to turn raw ideas into market-ready ventures.
          </p>
          <div className="pills reveal">
            {['Mentorship','Funding Access','Pitch Practice','Industry Network','Incubation','Legal Guidance'].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
        </div>
        <div className="about-cards">
          <div className="about-card about-card--mission reveal">
            <div className="card-icon">🎯</div>
            <h3>Mission</h3>
            <p>Empower students with tools, resources, and mentorship to build impactful startups that solve real-world problems.</p>
          </div>
          <div className="about-card about-card--vision reveal">
            <div className="card-icon">🚀</div>
            <h3>Vision</h3>
            <p>Build a thriving startup ecosystem that drives innovation, creates jobs, and puts Galgotias on the global entrepreneurship map.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
