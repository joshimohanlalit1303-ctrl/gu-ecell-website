import { useReveal } from '../hooks/useReveal'

const MENTORS = [
  { initials: 'AG', name: 'Dr. Aradhana Galgotia', role: 'Chancellor & Visionary Leader', bio: "Driving GU's entrepreneurship agenda with decades of academic and industry leadership." },
  { initials: 'KM', name: 'Dr. Kamal Kishore Malhotra', role: 'Senior Mentor', bio: 'Bridging academia and industry with strategic mentorship for student ventures.' },
]
const LEADERS = [
  { role: 'President', name: 'Aastha Bajaj' },
  { role: 'Vice President', name: 'Anshu Raj' },
  { role: 'Secretary', name: 'Abhinna Chaudhary' },
  { role: 'Treasurer', name: 'Umang Jain' },
]

export default function Mentors() {
  const [mentorRef] = useReveal()
  const [leaderRef] = useReveal()

  return (
    <>
      <section id="mentors" className="section mentors-section" ref={mentorRef}>
        <div className="section-header">
          <p className="section-tag reveal">Guided By the Best</p>
          <h2 className="section-title reveal">Our Mentors</h2>
        </div>
        <div className="mentors-grid">
          {MENTORS.map(m => (
            <div key={m.initials} className="mentor-card reveal">
              <div className="mentor-avatar">
                <div className="avatar-ring" />
                <div className="avatar-initials">{m.initials}</div>
              </div>
              <h3 className="mentor-name">{m.name}</h3>
              <p className="mentor-role">{m.role}</p>
              <p className="mentor-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leaders" className="section leaders-section" ref={leaderRef}>
        <div className="section-header">
          <p className="section-tag reveal">The Core Team</p>
          <h2 className="section-title reveal">Leadership</h2>
        </div>
        <div className="leaders-grid">
          {LEADERS.map((l, i) => (
            <div key={l.role} className="leader-card reveal" style={{ '--delay': `${i * 0.08}s` }}>
              <span className="leader-role">{l.role}</span>
              <h3>{l.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
