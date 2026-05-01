import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function CTA() {
  const [ctaRef] = useReveal()
  const [showForm, setShowForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    yearBranch: '',
    enrollmentNum: '',
    interests: [],
    project: '',
    whyGec: '',
    availability: '',
    source: '',
    anythingElse: '',
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, value] }))
    } else {
      setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== value) }))
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setFormData({
      fullName: '',
      email: '',
      whatsapp: '',
      yearBranch: '',
      enrollmentNum: '',
      interests: [],
      project: '',
      whyGec: '',
      availability: '',
      source: '',
      anythingElse: '',
    })
  }

  return (
    <section id="cta" className={`section cta-section ${showForm ? 'cta-expanded' : ''}`} ref={ctaRef}>
      <div className="cta-inner reveal in" style={{ opacity: 1, transform: 'none' }}>
        {!showForm ? (
          <>
            <p className="section-tag">Ready?</p>
            <h2 className="cta-title">Build Something <span className="gradient-text">Real.</span></h2>
            <p className="cta-body">Join hundreds of students turning ideas into startups. Applications are open for GEC.</p>
            <button
              className="btn btn-primary btn-xl"
              id="cta-apply"
              onClick={() => window.dispatchEvent(new Event('open-apply-popup'))}
            >
              Apply to GEC →
            </button>
          </>
        ) : !formSubmitted ? (
          <div className="gec-form-container">
            <div className="gec-form-header">
              <p className="section-tag">GEC Application</p>
              <h2 className="cta-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>Apply to <span className="gradient-text">GEC</span></h2>
              <p className="cta-body" style={{ maxWidth: '600px', margin: '0 auto 48px auto' }}>
                Join the Galgotias Entrepreneurship Cell. Helps us understand you better. We review all applications within 48 hours.
              </p>
            </div>

            <form className="gec-application-form" onSubmit={handleFormSubmit}>
              {/* Step 1: Who you are */}
              <div className="gec-form-section">
                <span className="gec-step-label">Step 01</span>
                <h3>Who you are</h3>
                
                <div className="gec-form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" placeholder="Your full name" required value={formData.fullName} onChange={handleFormChange} />
                </div>

                <div className="gec-form-row">
                  <div className="gec-form-group">
                    <label htmlFor="email">University Email *</label>
                    <input type="email" id="email" name="email" placeholder="e.g. name@university.edu" required value={formData.email} onChange={handleFormChange} />
                  </div>
                  <div className="gec-form-group">
                    <label htmlFor="whatsapp">WhatsApp Number *</label>
                    <input type="tel" id="whatsapp" name="whatsapp" placeholder="With country code (e.g. +91 99999 99999)" required value={formData.whatsapp} onChange={handleFormChange} />
                  </div>
                </div>

                <div className="gec-form-row">
                  <div className="gec-form-group">
                    <label htmlFor="yearBranch">Year & Branch *</label>
                    <input type="text" id="yearBranch" name="yearBranch" placeholder="e.g. 3rd Year CSE" required value={formData.yearBranch} onChange={handleFormChange} />
                  </div>
                  <div className="gec-form-group">
                    <label htmlFor="enrollmentNum">Enrollment Number *</label>
                    <input type="text" id="enrollmentNum" name="enrollmentNum" placeholder="Your enrollment number" required value={formData.enrollmentNum} onChange={handleFormChange} />
                  </div>
                </div>
              </div>

              {/* Step 2: What you're drawn to */}
              <div className="gec-form-section">
                <span className="gec-step-label">Step 02</span>
                <h3>What you're drawn to</h3>
                <p className="gec-form-desc">Which areas interest you? (Select all that apply)</p>
                
                <div className="gec-checkbox-grid">
                  {[
                    'Events & ops', 'Design & creatives', 'Social media',
                    'Content & writing', 'Tech & web', 'Outreach & sponsorship',
                    'Startups & research'
                  ].map(area => (
                    <label key={area} className="gec-checkbox-label">
                      <input 
                        type="checkbox" 
                        name="interests" 
                        value={area} 
                        checked={formData.interests.includes(area)} 
                        onChange={handleCheckboxChange} 
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: One thing you've done */}
              <div className="gec-form-section">
                <span className="gec-step-label">Step 03</span>
                <h3>One thing you've done</h3>
                <div className="gec-form-group">
                  <label htmlFor="project">Tell us about one thing you've organised, built, or started — inside or outside college. Could be anything. *</label>
                  <textarea id="project" name="project" rows="3" placeholder="3-5 sentences describing what you did..." required value={formData.project} onChange={handleFormChange}></textarea>
                </div>
              </div>

              {/* Step 4: Why GEC */}
              <div className="gec-form-section">
                <span className="gec-step-label">Step 04</span>
                <h3>Why GEC</h3>
                <div className="gec-form-group">
                  <label htmlFor="whyGec">What do you want to get out of being part of GEC — and what do you think you'll bring to the team? (100 words max) *</label>
                  <textarea id="whyGec" name="whyGec" rows="3" placeholder="Briefly describe your goals..." required value={formData.whyGec} onChange={handleFormChange}></textarea>
                </div>
              </div>

              {/* Step 5: Availability & source */}
              <div className="gec-form-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <span className="gec-step-label">Step 05</span>
                <h3>Availability & source</h3>
                
                <div className="gec-form-group">
                  <label>Available for in-person meetings? *</label>
                  <div className="gec-radio-group">
                    <label><input type="radio" name="availability" value="yes" checked={formData.availability === 'yes'} onChange={handleFormChange} required /> Yes</label>
                    <label><input type="radio" name="availability" value="no" checked={formData.availability === 'no'} onChange={handleFormChange} required /> No</label>
                  </div>
                </div>

                <div className="gec-form-group" style={{ marginTop: '16px' }}>
                  <label htmlFor="source">How did you hear about GEC? *</label>
                  <input type="text" id="source" name="source" placeholder="e.g. Instagram, WhatsApp, Friend" required value={formData.source} onChange={handleFormChange} />
                </div>

                <div className="gec-form-group" style={{ marginTop: '16px' }}>
                  <label htmlFor="anythingElse">Anything else you want us to know? (Optional)</label>
                  <textarea id="anythingElse" name="anythingElse" rows="2" placeholder="Additional notes..." value={formData.anythingElse} onChange={handleFormChange}></textarea>
                </div>
              </div>

              <div className="gec-form-actions" style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost" style={{ flex: 1, maxWidth: '200px', justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, maxWidth: '300px', justifyContent: 'center' }}>
                  Submit Application →
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="gec-form-success">
            <div className="gec-success-icon" style={{ fontSize: '64px', color: '#10b981', marginBottom: '16px' }}>✓</div>
            <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px' }}>Application Submitted!</h3>
            <p className="cta-body" style={{ marginBottom: '32px' }}>Thank you for applying to GEC. We'll get back to you within 48 hours.</p>
            <button onClick={() => { setFormSubmitted(false); setShowForm(false); }} className="btn btn-primary btn-xl">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
