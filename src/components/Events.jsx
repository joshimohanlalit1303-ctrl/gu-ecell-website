import { useReveal } from '../hooks/useReveal'

const EVENTS = [
  { n: '01', title: 'Pitch Me', body: 'Present your startup idea to a panel of investors, VCs, and industry experts. Real feedback. Real stakes.', tags: ['Pitching','Investors','Feedback'], glow: 'rgba(108,71,255,.3)' },
  { n: '02', title: 'Launchpad', body: '24-hour hackathon + startup summit. Build, prototype, and pitch. Sleep is optional. Ambition is mandatory.', tags: ['Hackathon','24hrs','Summit'], glow: 'rgba(255,71,120,.3)' },
  { n: '03', title: 'Startab', body: 'Startup networking and collaboration hub. Connect with founders, co-founders, and mentors in your domain.', tags: ['Networking','Collaboration','Startups'], glow: 'rgba(0,229,255,.25)' },
]

export default function Events() {
  const [ref] = useReveal()
  return (
    <section id="events" className="section events-section" ref={ref}>
      <div className="section-header">
        <p className="section-tag reveal">Flagship Programs</p>
        <h2 className="section-title reveal">Where Ideas Meet Action</h2>
      </div>
      <div className="events-grid">
        {EVENTS.map(ev => (
          <div key={ev.n} className="event-card reveal">
            <div className="event-glow" style={{ background: `radial-gradient(circle,${ev.glow},transparent 70%)` }} />
            <div className="event-number">{ev.n}</div>
            <h3 className="event-title">{ev.title}</h3>
            <p className="event-body">{ev.body}</p>
            <div className="event-tags">{ev.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
