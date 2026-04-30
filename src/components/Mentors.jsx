import { useReveal } from '../hooks/useReveal'

import dhruvImg from '../assets/team/dhruv.png'
import aradhanaImg from '../assets/team/aradhana.png'
import kamalImg from '../assets/team/kamal.png'
import tanishqaImg from '../assets/team/tanishqa.png'
import piyushImg from '../assets/team/piyush.png'
import simranImg from '../assets/team/simran.png'

const MENTORS = [
  { initials: 'DG', name: 'Dr. Dhruv Galgotia', role: 'CEO, Galgotias University', img: dhruvImg, scale: 1.6, x: '0%', y: '-8%', bio: "Spearheading a culture of innovation and excellence, empowering the next generation of global leaders and entrepreneurs." },
  { initials: 'AG', name: 'Aradhana Galgotias', role: 'Operational Director', img: aradhanaImg, scale: 1.6, x: '0%', y: '-8%', bio: "Driving GU's entrepreneurship agenda with decades of academic and industry leadership." },
  { initials: 'KM', name: 'Mr. Kamal Kishor Malhotra', role: 'CEO of GICRISE', img: kamalImg, scale: 1.6, x: '0%', y: '-8%', bio: 'Bridging academia and industry with strategic mentorship for student ventures.' },
]
const LEADERS = [
  { role: 'President', name: 'Tanishqa Giri', initials: 'TG', img: tanishqaImg, scale: 2.8, x: '-8%', y: '-15%', linkedin: 'https://www.linkedin.com/in/tanishqa-giri-b29a15260/' },
  { role: 'Vice President', name: 'Piyush Bhardwaj', initials: 'PB', img: piyushImg, scale: 1.6, x: '0%', y: '-8%', linkedin: 'https://www.linkedin.com/in/piyush-bhardwaj-2a6b98247/' },
  { role: 'Secretary', name: 'Simran Jaiswal', initials: 'SJ', img: simranImg, scale: 1.4, x: '0%', y: '-2%', linkedin: 'https://www.linkedin.com/in/simran-jaiswal-62ba4b2b7/' },
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
          {MENTORS.map((m, i) => (
            <div key={m.initials} className="mentor-card reveal" style={{ 
              '--delay': `${i * 0.08}s`,
              '--img-scale': m.scale || 1.1,
              '--img-x': m.x || '0%',
              '--img-y': m.y || '0%'
            }}>
              <div className="mentor-avatar">
                <div className="avatar-ring" />
                {m.img ? (
                  <img src={m.img} alt={m.name} className="mentor-img-obj" loading="lazy" />
                ) : (
                  <div className="avatar-initials">{m.initials}</div>
                )}
              </div>
              <div className="mentor-content">
                <h3 className="mentor-name">{m.name}</h3>
                <p className="mentor-role">{m.role}</p>
                <p className="mentor-bio">{m.bio}</p>
              </div>
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
            <div key={l.role} className="leader-card reveal" style={{ 
              '--delay': `${i * 0.08}s`, 
              '--img-scale': l.scale || 1, 
              '--img-x': l.x || '0%',
              '--img-y': l.y || '0%' 
            }}>
              <div className="leader-avatar">
                {l.img ? <img src={l.img} alt={l.name} className="leader-img" loading="lazy" /> : l.initials}
              </div>
              <div className="leader-content">
                <span className="leader-role">{l.role}</span>
                <h3>{l.name}</h3>
                <a href={l.linkedin} target="_blank" rel="noreferrer" className="leader-linkedin">
                  <i className="ph-fill ph-linkedin-logo"></i>
                  <span>Connect</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
