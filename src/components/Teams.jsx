import { useReveal } from '../hooks/useReveal'

const TEAMS = [
  { icon: '💡', name: 'Startup Dev', members: '50+', tc: '#6c47ff', full: 'Startup Development', desc: 'Nurture ideas from concept to MVP.', items: ['Ideation workshops','Business model canvas','Prototype guidance'] },
  { icon: '📣', name: 'Public Relations', members: '50+', tc: '#ff4778', full: 'Public Relations', desc: 'Build brand, forge partnerships.', items: ['Media outreach','Industry partnerships','Press & communication'] },
  { icon: '📱', name: 'Digital Media', members: '50+', tc: '#00e5ff', full: 'Digital Media', desc: 'Own our digital presence.', items: ['Social media strategy','Reels & short-form','Growth analytics'] },
  { icon: '📊', name: 'Marketing', members: '50+', tc: '#f59e0b', full: 'Marketing', desc: 'Drive growth through data-led campaigns.', items: ['Brand strategy','GTM campaigns','Performance marketing'] },
  { icon: '🎪', name: 'Events', members: '50+', tc: '#10b981', full: 'Event Management', desc: 'Craft unforgettable experiences.', items: ['Hackathon org','Logistics & ops','Speaker curation'] },
  { icon: '🌐', name: 'Ambassador', members: '50+', tc: '#8b5cf6', full: 'Ambassador Program', desc: 'Expand GEC\'s reach.', items: ['Campus outreach','Community building','Cross-college network'] },
  { icon: '⚙️', name: 'Technical', members: '50+', tc: '#06b6d4', full: 'Technical Team', desc: 'Power GEC\'s digital infra.', items: ['Website & apps','Internal tools','Tech for events'] },
  { icon: '📸', name: 'Media', members: '50+', tc: '#ec4899', full: 'Media Team', desc: 'Capture and tell the GEC story.', items: ['Photography & film','Graphic design','Visual storytelling'] },
  { icon: '🌱', name: 'EDC', members: '50+', tc: '#4ade80', full: 'Entrepreneurship Development Cell', desc: 'Fostering the entrepreneurial spirit.', items: ['Skill workshops', 'Mentorship programs', 'Startup bootcamps'] },
  { icon: '🎙️', name: 'Communication', members: '50+', tc: '#f43f5e', full: 'Public Communication', desc: 'The voice of our organization.', items: ['Press releases', 'Public speaking', 'Media relations'] },
  { icon: '🔥', name: 'Promotions', members: '50+', tc: '#fb923c', full: 'Promotions Team', desc: 'Amplify our reach and campaigns.', items: ['Campaign execution', 'Street teams', 'Event hype'] },
  { icon: '🤝', name: 'Networking', members: '50+', tc: '#3b82f6', full: 'Networking', desc: 'Build bridges with industry leaders.', items: ['Alumni connect', 'Founder mixers', 'Investor relations'] },
  { icon: '💼', name: 'Career Connect', members: '50+', tc: '#d946ef', full: 'Internship & Career Connect', desc: 'Bridge the gap to the industry.', items: ['Internship drives', 'Placement prep', 'Corporate tie-ups'] },
]

export default function Teams() {
  const [ref] = useReveal()
  return (
    <section id="teams" className="section teams-section" ref={ref}>
      <div className="section-header">
        <p className="section-tag reveal">Our Structure</p>
        <h2 className="section-title reveal">13 Specialized Teams</h2>
        <p className="section-body reveal">Every domain covered by dedicated experts.<br /><small style={{ opacity: .5, fontSize: 13 }}>Hover a card to learn more →</small></p>
      </div>
      <div className="teams-grid">
        {TEAMS.map((t, i) => (
          <div key={t.name} className="flip-card reveal" style={{ '--delay': `${i * 0.06}s` }}>
            <div className="flip-inner">
              <div className="flip-front" style={{ '--tc': t.tc }}>
                <div className="flip-icon">{t.icon}</div>
                <h3 className="flip-name">{t.name}</h3>
                <span className="flip-badge">{t.members} members</span>
                <div className="flip-border" style={{ '--tc': t.tc }} />
              </div>
              <div className="flip-back" style={{ '--tc': t.tc }}>
                <h3 style={{ color: t.tc }}>{t.full}</h3>
                <p>{t.desc}</p>
                <ul>{t.items.map(it => <li key={it} style={{ '--tc': t.tc }}>{it}</li>)}</ul>
                <a href="#cta" className="flip-cta" style={{ color: t.tc }}
                  onClick={e => { e.preventDefault(); document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Join Team →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
