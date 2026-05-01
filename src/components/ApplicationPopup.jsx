import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../services/supabase'

const ALL_TEAMS = [
  "Startup Dev",
  "Entrepreneurship",
  "Public Relations",
  "Communication",
  "Marketing",
  "Digital Media",
  "Promotions",
  "Technical",
  "Events",
  "Ambassador",
  "Networking",
  "Career Connect"
]

export default function ApplicationPopup({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    yearBranch: '',
    whyGec: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTeamChange = (team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(prev => prev.filter(t => t !== team))
    } else {
      if (selectedTeams.length < 3) {
        setSelectedTeams(prev => [...prev, team])
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedTeams.length === 0) {
      alert('Please select at least 1 team to apply.')
      return
    }

    // Create new application object
    const newApp = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      yearBranch: formData.yearBranch,
      whyGec: formData.whyGec,
      interests: selectedTeams.join(', '),
      status: 'Pending',
      appliedAt: new Date().toISOString()
    }

    // Persist to localStorage as a fallback
    const currentApps = JSON.parse(localStorage.getItem('gec_applications') || '[]')
    currentApps.unshift(newApp)
    localStorage.setItem('gec_applications', JSON.stringify(currentApps))

    // Persist to Supabase
    try {
      supabase
        .from('gec_applications')
        .insert([
          {
            id: newApp.id,
            fullName: newApp.fullName,
            email: newApp.email,
            whatsapp: newApp.whatsapp,
            yearBranch: newApp.yearBranch,
            whyGec: newApp.whyGec,
            interests: newApp.interests,
            status: newApp.status,
            appliedAt: newApp.appliedAt
          }
        ])
        .then(({ error }) => {
          if (error) console.error('Supabase submission error:', error)
        })
    } catch (err) {
      console.error('Supabase client error:', err)
    }

    setSubmitted(true)
    setFormData({
      fullName: '',
      email: '',
      whatsapp: '',
      yearBranch: '',
      whyGec: ''
    })
    setSelectedTeams([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="app-popup-overlay" onClick={onClose}>
          <motion.div 
            className="app-popup-modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="popup-close-btn" onClick={onClose} aria-label="Close popup">×</button>
            
            {!submitted ? (
              <div className="popup-form-wrapper">
                <div className="popup-header">
                  <span className="popup-badge">BECOME A MEMBER</span>
                  <h2 className="popup-title">Apply to <span className="gradient-text">GEC</span></h2>
                  <p className="popup-subtitle">Help us understand you better. Fill in your details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="popup-form">
                  <div className="popup-form-row">
                    <div className="popup-input-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        required 
                        placeholder="Your Name" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="popup-form-row">
                    <div className="popup-input-group">
                      <label>University Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="name@university.edu" 
                        value={formData.email} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="popup-input-group">
                      <label>WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        name="whatsapp" 
                        required 
                        placeholder="e.g. +91 99999 99999" 
                        value={formData.whatsapp} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="popup-form-row">
                    <div className="popup-input-group">
                      <label>Year & Branch *</label>
                      <input 
                        type="text" 
                        name="yearBranch" 
                        required 
                        placeholder="e.g. 3rd Year CSE" 
                        value={formData.yearBranch} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="popup-input-group teams-select-group">
                    <label>Select Team(s) * <span className="team-limit-note">(Max 3 teams)</span></label>
                    <div className="teams-checkbox-grid">
                      {ALL_TEAMS.map(team => {
                        const isChecked = selectedTeams.includes(team)
                        const isDisabled = !isChecked && selectedTeams.length >= 3
                        return (
                          <label key={team} className={`team-checkbox-label ${isChecked ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              disabled={isDisabled}
                              onChange={() => handleTeamChange(team)}
                            />
                            <span>{team}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="popup-input-group">
                    <label>Why GEC? / Your Previous Work *</label>
                    <textarea 
                      name="whyGec" 
                      required 
                      rows={3} 
                      placeholder="Briefly describe what you've built, created, or started in 2-3 sentences..." 
                      value={formData.whyGec} 
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    Submit Application →
                  </button>
                </form>
              </div>
            ) : (
              <motion.div 
                className="popup-success-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="success-emoji">🎉</div>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying to GEC. Your submission was received and stored. Our team will review your application soon.</p>
                <button className="btn btn-primary" onClick={() => { setSubmitted(false); onClose(); }}>
                  Close
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
