import React, { useState } from 'react';
import './Antigravity.css';
import dhruvImg from '../../assets/team/dhruv.png';
import aradhanaImg from '../../assets/team/aradhana.png';
import kamalImg from '../../assets/team/kamal.png';
import tanishqaImg from '../../assets/team/tanishqa.png';
import piyushImg from '../../assets/team/piyush.png';
import simranImg from '../../assets/team/simran.png';

const OUTCOMES = [
  { num: '01', title: 'A business with traction', desc: 'Target: ₹25L+ revenue (metrics may vary for marketplaces / tech products).', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500' },
  { num: '02', title: '100+ founder interactions', desc: 'Network with operators who visit campus: get direct feedback, mentorship, and exposure.', img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=500' },
  { num: '03', title: 'Investor pitch opportunities', desc: 'Pitch to VCs across demo days; stand a chance to raise funds; selected startups get a fellowship.', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=500' },
  { num: '04', title: 'AI-native execution skills', desc: 'Learn modern tools and workflows to operate in an AI-driven world.', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500' },
  { num: '05', title: 'Access to Startup roles', desc: "Get support from GEC's career team to land entry-level roles at fast-growing startups.", img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=500' },
];

const JOURNEY_TERMS = [
  { id: 1, name: 'Term 01', title: 'Build, Sell, Ship', courses: ['Running Ads That Convert', 'How Startups Actually Make Money', 'Operating the Business: From Order to Delivery', 'Selling Your First Product Online'], bootcamps: ['First Sales Sprint', 'Paid Ads Build Lab', 'Revenue Review Day'], checkpoint: '₹3L revenue review + execution demo', output: 'Launch and run a complete business end-to-end using 50k from GEC.' },
  { id: 2, name: 'Term 02', title: 'Find the Right Problem', courses: ['Customer Discovery', 'Market Sizing', 'Competitor Analysis', 'Problem Validation'], bootcamps: ['User Interview Lab', 'Problem Framing Sprint'], checkpoint: 'Validating the problem space with 100 users', output: 'A refined problem statement and defined target audience.' },
  { id: 3, name: 'Term 03', title: 'Get Real Users', courses: ['MVP Development', 'No-code Tools', 'Go-To-Market Strategy'], bootcamps: ['Prototyping Sprint', 'Landing Page Build'], checkpoint: 'Launch MVP to beta users', output: 'First 10 paying customers or 100 active users.' },
  { id: 4, name: 'Term 04', title: 'Make It Work at Scale', courses: ['Growth Marketing', 'Unit Economics', 'Product Led Growth'], bootcamps: ['Growth Hacking Lab', 'Retention Sprint'], checkpoint: 'Achieve 20% MoM growth', output: 'A scalable acquisition channel.' },
  { id: 5, name: 'Term 05', title: 'Raise & Grow', courses: ['Pitch Deck Creation', 'Valuation & Equity', 'Term Sheets'], bootcamps: ['Pitch Practice Lab', 'Investor QA'], checkpoint: 'Mock VC Pitch Day', output: 'A completed pitch deck and data room.' },
  { id: 6, name: 'Term 06', title: 'Founder Mode', courses: ['Leadership', 'Hiring', 'Scaling Culture'], bootcamps: ['Recruitment Sprint', 'Operating Rhythms'], checkpoint: 'Final Demo Day', output: 'Ready for seed funding or profitable bootstrapping.' },
];

function TeamCard({ p, i }) {
  return (
    <div className="ag-mentor-card" style={{ 
      transitionDelay: `${i * 0.05}s`,
      '--img-scale': p.scale || 1,
      '--img-x': p.x || '0%',
      '--img-y': p.y || '0%'
    }}>
      <div className="ag-mentor-avatar">
        {p.img ? <img src={p.img} alt={p.name} className="ag-mentor-img" loading="lazy" /> : <div className="ag-mentor-placeholder" style={{fontSize: '24px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)'}}>{p.initials}</div>}
      </div>
      <div className="ag-mentor-info">
        <h4>{p.name} <strong>{p.last}</strong></h4>
        <p>{p.title}<br/>{p.org}</p>
      </div>
    </div>
  );
}

export default function Antigravity() {
  const [activeTerm, setActiveTerm] = useState(1);
  const currentTermData = JOURNEY_TERMS.find(t => t.id === activeTerm);

  return (
    <div className="ag-page">
      {/* 1. Hero Section (Mesa Style) */}
      <section className="ag-hero-section">
        <div className="ag-container ag-hero-grid">
          
          <div className="ag-hero-content">
            <h1 className="ag-hero-title">
              The Startup Cohort Program in <span>Venture Building for Students</span>
            </h1>
            
            <div className="ag-hero-badges">
              <div className="ag-badge"><i className="ph-bold ph-calendar-blank"></i> 120 Days</div>
              <div className="ag-badge"><i className="ph-bold ph-clock"></i> Part-time</div>
              <div className="ag-badge"><i className="ph-bold ph-map-pin"></i> Galgotias University Campus</div>
              <div className="ag-badge"><i className="ph-bold ph-users"></i> 50 Seats</div>
            </div>
            
            <div className="ag-hero-tags">
              <span className="ag-tag">Execution Focused</span>
              <span className="ag-tag">Mentorship Driven</span>
              <span className="ag-tag">Zero to MVP</span>
            </div>
            
            <a href="#apply" className="btn btn-primary ag-btn-main">
              ENQUIRE NOW <i className="ph-bold ph-arrow-right"></i>
            </a>
            
            <div className="ag-hero-footer">
              <div className="ag-footer-col">
                <span className="ag-footer-label">Built by industry experts, founders and leaders</span>
                <div className="ag-footer-logos">
                  <div className="ag-logo-box">GEC</div>
                  <div className="ag-logo-box">Alumni</div>
                </div>
              </div>
              <div className="ag-footer-col">
                <span className="ag-footer-label">Supported by</span>
                <div className="ag-footer-logos">
                  <div className="ag-logo-box">Galgotias University</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ag-hero-media" style={{transitionDelay: '0.2s'}}>
            <div className="ag-media-card">
              {/* Using a rich gradient/glass panel as a placeholder for the video card */}
              <div className="ag-media-overlay">
                <h2>What is unique about the <strong>Cohort Program?</strong></h2>
                <button className="ag-play-btn"><i className="ph-fill ph-play"></i></button>
                <div className="ag-media-duration"><i className="ph-bold ph-clock"></i> 2 min</div>
                <div className="ag-media-author">
                  <strong>GEC Leadership</strong>
                  <span>Program Directors</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. Pillars of the Program */}
      <section className="ag-pillars-section">
        <div className="ag-container">
          <h2 className="ag-section-title">Pillars of the program</h2>
          
          <div className="ag-pillars-grid">
            <div className="ag-pillar-card">
              <div className="ag-pillar-img img-1"><div className="ag-pillar-overlay"></div></div>
              <div className="ag-pillar-content">
                <div className="ag-pillar-stat">120<span>Days</span></div>
                <p>Start with a real problem, build a solution, get customers, improve from feedback, then scale.</p>
              </div>
            </div>
            
            <div className="ag-pillar-card" style={{transitionDelay: '0.1s'}}>
              <div className="ag-pillar-img img-2"><div className="ag-pillar-overlay"></div></div>
              <div className="ag-pillar-content">
                <div className="ag-pillar-stat">10+<span>Bootcamps</span></div>
                <p>Practical, founder-led workshops on product, go-to-market, sales, and design.</p>
              </div>
            </div>
            
            <div className="ag-pillar-card" style={{transitionDelay: '0.2s'}}>
              <div className="ag-pillar-img img-3"><div className="ag-pillar-overlay"></div></div>
              <div className="ag-pillar-content">
                <div className="ag-pillar-stat">1:1<span>Mentorship</span></div>
                <p>A dedicated operator from Day 1 to pressure-test your decisions and unblock your progress.</p>
              </div>
            </div>
            
            <div className="ag-pillar-card" style={{transitionDelay: '0.3s'}}>
              <div className="ag-pillar-img img-4"><div className="ag-pillar-overlay"></div></div>
              <div className="ag-pillar-content">
                <div className="ag-pillar-stat">50<span>Builders</span></div>
                <p>Live and build with a high-intent, execution-minded cohort right here on campus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Team & Mentorship Sections */}
      <section className="ag-mentors-section">
        <div className="ag-container">
          
          {/* Supporters Section */}
          <div className="ag-team-group">
            <h2 className="ag-section-title" style={{ marginBottom: '60px' }}>Supporters</h2>
            <div className="ag-mentors-grid">
              {[
                { initials: 'DG', name: 'Dr. Dhruv', last: 'Galgotias', title: 'CEO', org: 'Galgotias University', img: dhruvImg, scale: 1.6, x: '0%', y: '-10%' },
                { initials: 'AG', name: 'Ms. Aradhana', last: 'Galgotias', title: 'Operational Director', org: 'Galgotias University', img: aradhanaImg, scale: 1.6, x: '0%', y: '-10%' },
              ].map((p, i) => <TeamCard key={i} p={p} i={i} />)}
            </div>
          </div>

          {/* Founders Section */}
          <div className="ag-team-group">
            <h2 className="ag-section-title" style={{ marginBottom: '60px' }}>Founders</h2>
            <div className="ag-mentors-grid">
              {[
                { initials: 'RM', name: 'Mr. Rachit', last: 'Mathur', title: 'Founder', org: 'Shift', scale: 1.6, x: '0%', y: '-10%' },
              ].map((p, i) => <TeamCard key={i} p={p} i={i} />)}
            </div>
          </div>

          {/* Mentors Section */}
          <div className="ag-team-group">
            <h2 className="ag-section-title" style={{ marginBottom: '60px' }}>Mentors</h2>
            <div className="ag-mentors-grid">
              {[
                { initials: 'KM', name: 'Mr. Kamal', last: 'Kishore Malhotra', title: 'CEO', org: 'GIC RISE', img: kamalImg, scale: 1.6, x: '0%', y: '-10%' },
                { initials: 'SK', name: 'Mr. Sonu', last: 'Kadam', title: 'Incubation Manager', org: 'GEC', scale: 1.6, x: '0%', y: '-10%' },
                { initials: 'P', name: 'Mr.', last: 'Prasoon', title: 'General Manager', org: 'GEC', scale: 1.6, x: '0%', y: '-10%' },
                { initials: 'SA', name: 'Mr. Sourav', last: 'Arya', title: 'Media Head', org: 'GIC RISE', scale: 1.6, x: '0%', y: '-10%' },
              ].map((p, i) => <TeamCard key={i} p={p} i={i} />)}
            </div>
          </div>

          {/* GEC Team Section */}
          <div className="ag-team-group">
            <h2 className="ag-section-title" style={{ marginBottom: '60px' }}>GEC Team</h2>
            <div className="ag-mentors-grid">
              {[
                { initials: 'TG', name: 'Tanishqa', last: 'Giri', title: 'President', org: 'GEC', img: tanishqaImg, scale: 3.0, x: '0%', y: '-10%' },
                { initials: 'PB', name: 'Piyush', last: 'Bhardwaj', title: 'Vice President', org: 'GEC', img: piyushImg, scale: 1.6, x: '0%', y: '-10%' },
                { initials: 'SJ', name: 'Simran', last: 'Jaiswal', title: 'Secretary', org: 'GEC', img: simranImg, scale: 1.4, x: '0%', y: '-10%' },
              ].map((p, i) => <TeamCard key={i} p={p} i={i} />)}
            </div>
          </div>

          <div className="ag-mentor-more" style={{marginTop: '60px', textAlign: 'center'}}>
            ....and <strong>20+</strong> startup founders
          </div>
        </div>
      </section>

      {/* 4. Numbered Details Grid */}
      <section className="ag-details-section">
        <div className="ag-container">
          
          <div className="ag-details-banner">
            <div className="ag-banner-content">
              <span className="ag-banner-tag">Program Details</span>
              <h2>Cohort Program in Venture Building</h2>
              
              <div className="ag-hero-badges" style={{marginBottom: '24px'}}>
                <div className="ag-badge"><i className="ph-bold ph-calendar-blank"></i> 120 Days</div>
                <div className="ag-badge"><i className="ph-bold ph-clock"></i> Part-Time</div>
                <div className="ag-badge"><i className="ph-bold ph-users"></i> 50 Seats</div>
              </div>
              
              <a href="#apply" className="btn btn-primary ag-btn-main bg-white">
                APPLY NOW <i className="ph-bold ph-arrow-right"></i>
              </a>
            </div>
          </div>
          
          <div className="ag-numbered-grid">
            <div className="ag-num-card">
              <div className="ag-num-bg">1</div>
              <h3>A curriculum <span>that scales with you</span></h3>
              <p>You build in the same order real startups do. Each term aligns with your next step, taking you from problem to product to customers to growth.</p>
            </div>
            
            <div className="ag-num-card" style={{transitionDelay: '0.1s'}}>
              <div className="ag-num-bg">2</div>
              <h3>Execution- <span>focused bootcamps</span></h3>
              <p>Working sessions, not lectures. Learn exactly what you need: selling, customers, distribution, or speed, right when you need it.</p>
            </div>
            
            <div className="ag-num-card" style={{transitionDelay: '0.2s'}}>
              <div className="ag-num-bg">3</div>
              <h3><span>1:1 operator</span> guidance from Day 1</h3>
              <p>You are paired with a senior startup operator who reviews your decisions, highlights what is not working, and helps you focus on next steps.</p>
            </div>
            
            <div className="ag-num-card" style={{transitionDelay: '0.3s'}}>
              <div className="ag-num-bg">4</div>
              <h3>Demo days and <span>investor pitches</span></h3>
              <p>Show progress at regular checkpoints, learn to present traction, defend decisions, handle investor questions, and get exposure to active pitch opportunities.</p>
            </div>
            
            <div className="ag-num-card" style={{transitionDelay: '0.4s'}}>
              <div className="ag-num-bg">5</div>
              <h3>A high-intent <span>builder cohort</span></h3>
              <p>You live and build with high-intent peers who ship every week, creating an environment where you naturally find strong teammates.</p>
            </div>
            
            <div className="ag-num-card" style={{transitionDelay: '0.5s'}}>
              <div className="ag-num-bg">6</div>
              <h3>Startup <span>infrastructure that accelerates</span></h3>
              <p>You get an ecosystem that speeds up building with vetted ideas, expert support, and systems to help you ship and iterate without wasting months.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* 5. The Two Building Tracks */}
      <section className="ag-tracks-section">
        <div className="ag-container">
          <div className="ag-tracks-header">
            <h2 className="ag-section-title">Choose Your Path</h2>
            <p>Not everyone starts at the same stage. Choose the track that fits your current progress.</p>
          </div>
          
          <div className="ag-paths-container">
            {/* Ideation Path */}
            <div className="ag-path-card path-ideation">
              <div className="ag-path-glow"></div>
              <div className="ag-path-icon"><i className="ph-fill ph-lightbulb"></i></div>
              <div className="ag-path-content">
                <div className="ag-path-badge">Track 01</div>
                <h3>Ideation Track</h3>
                <p className="ag-path-desc">For students exploring ideas and finding the right problem.</p>
                <ul className="ag-path-list">
                  <li><i className="ph-bold ph-check"></i> Validate your problem space</li>
                  <li><i className="ph-bold ph-check"></i> Talk to your first 10 users</li>
                  <li><i className="ph-bold ph-check"></i> Build a working prototype</li>
                </ul>
              </div>
              <div className="ag-path-footer">
                <span>Start Exploring</span> <i className="ph-bold ph-arrow-right"></i>
              </div>
            </div>
            
            {/* Splitter */}
            <div className="ag-path-divider">
              <span>OR</span>
            </div>
            
            {/* Acceleration Path */}
            <div className="ag-path-card path-acceleration">
              <div className="ag-path-glow"></div>
              <div className="ag-path-icon"><i className="ph-fill ph-rocket-launch"></i></div>
              <div className="ag-path-content">
                <div className="ag-path-badge">Track 02</div>
                <h3>Acceleration Track</h3>
                <p className="ag-path-desc">For teams with an MVP ready to scale, sell, and raise.</p>
                <ul className="ag-path-list">
                  <li><i className="ph-bold ph-check"></i> Establish distribution channels</li>
                  <li><i className="ph-bold ph-check"></i> Get your first paying customers</li>
                  <li><i className="ph-bold ph-check"></i> Prep for investor funding</li>
                </ul>
              </div>
              <div className="ag-path-footer">
                <span>Start Scaling</span> <i className="ph-bold ph-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Outcomes Section */}
      <section className="ag-outcomes-section" style={{ padding: '80px 0 40px' }}>
        <div className="ag-container">
          <h2 className="ag-section-title" style={{ marginBottom: '40px' }}>Outcomes you can expect</h2>
          <div className="ag-outcomes-container">
            {OUTCOMES.map((out, idx) => (
              <div className="ag-outcome-card" key={idx}>
                <div className="ag-outcome-img-wrap">
                  <img src={out.img} alt={out.title} className="ag-outcome-img-el" loading="lazy" />
                  <div className="ag-outcome-img-overlay"></div>
                </div>
                <div className="ag-outcome-body">
                  <div className="ag-outcome-header">
                    <span className="ag-outcome-num">{out.num}</span>
                    <h3 className="ag-outcome-title">{out.title}</h3>
                  </div>
                  <p className="ag-outcome-desc">{out.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Journey Section */}
      <section className="ag-journey-section" style={{ padding: '40px 0 100px' }}>
        <div className="ag-container">
          <h2 className="ag-section-title" style={{ marginBottom: '40px' }}>The 6-term journey at GEC: A peek into what the term-by-term journey looks like</h2>
          
          <div className="ag-journey-layout">
            <div className="ag-journey-sidebar">
              {JOURNEY_TERMS.map((term) => (
                <div 
                  key={term.id} 
                  className={`ag-journey-tab ${activeTerm === term.id ? 'active' : ''}`}
                  onClick={() => setActiveTerm(term.id)}
                >
                  <span className="ag-journey-tab-num">{term.name}</span>
                  <span className="ag-journey-tab-title">{term.title}</span>
                </div>
              ))}
            </div>
            
            <div className="ag-journey-content">
              {currentTermData && (
                <>
                  <div className="ag-j-section">
                    <span className="ag-j-label">COURSES:</span>
                    <div className="ag-j-courses">
                      {currentTermData.courses.map((course, idx) => (
                        <div className="ag-j-course" key={idx}>
                          <i className="ph-bold ph-check-circle"></i>
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ag-j-section">
                    <span className="ag-j-label">BOOTCAMPS:</span>
                    <div className="ag-j-pills">
                      {currentTermData.bootcamps.map((camp, idx) => (
                        <span className="ag-j-pill" key={idx}>{camp}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ag-j-section">
                    <span className="ag-j-label">CHECKPOINT 01:</span>
                    <div className="ag-j-box">{currentTermData.checkpoint}</div>
                  </div>
                  
                  <div className="ag-j-section">
                    <span className="ag-j-label">OUTPUT:</span>
                    <div className="ag-j-box" style={{ background: 'rgba(108,71,255,0.05)', borderColor: 'rgba(108,71,255,0.2)', color: '#fff' }}>
                      {currentTermData.output}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
