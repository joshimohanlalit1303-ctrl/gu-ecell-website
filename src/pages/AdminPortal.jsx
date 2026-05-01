import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabase'

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('All')

  // Biometric / WebAuthn States
  const [hasBiometrics, setHasBiometrics] = useState(false)
  const [biometricsAvailable, setBiometricsAvailable] = useState(false)

  // Load submissions from Supabase or localStorage fallback
  const loadApps = async () => {
    try {
      const { data, error } = await supabase
        .from('gec_applications')
        .select('*')
        .order('appliedAt', { ascending: false })

      if (data && data.length > 0) {
        setApplications(data)
      } else {
        const localData = JSON.parse(localStorage.getItem('gec_applications') || '[]')
        setApplications(localData)
      }
    } catch (err) {
      console.error('Supabase fetch error:', err)
      const localData = JSON.parse(localStorage.getItem('gec_applications') || '[]')
      setApplications(localData)
    }
  }

  useEffect(() => {
    loadApps()

    // Initialize biometric WebAuthn states
    const localCreds = JSON.parse(localStorage.getItem('gec_biometric_creds') || '[]')
    if (window.PublicKeyCredential && (localCreds.length > 0 || localStorage.getItem('gec_biometric_cred'))) {
      setHasBiometrics(true)
    }
    if (window.PublicKeyCredential) {
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(avail => {
          if (avail) setBiometricsAvailable(true)
        })
        .catch(err => console.error(err))
    }
  }, [])

  const registerBiometrics = async () => {
    try {
      const memberName = window.prompt("Enter your name to link your biometrics:")
      if (!memberName) return

      const challenge = new Uint8Array(32)
      window.crypto.getRandomValues(challenge)
      const userId = new Uint8Array(16)
      window.crypto.getRandomValues(userId)

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "GEC Admin Portal" },
          user: {
            id: userId,
            name: `${memberName.toLowerCase().replace(/[^a-z0-9]/g, '_')}@gec.internal`,
            displayName: memberName
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000
        }
      })

      if (credential) {
        const credId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
        
        const currentCreds = JSON.parse(localStorage.getItem('gec_biometric_creds') || '[]')
        currentCreds.push(credId)
        localStorage.setItem('gec_biometric_creds', JSON.stringify(currentCreds))

        setHasBiometrics(true)
        alert(`Biometrics for ${memberName} successfully registered!`)
      }
    } catch (err) {
      console.error('Biometric registration error:', err)
      alert('Could not complete biometric registration. Please check your device settings.')
    }
  }

  const loginWithBiometrics = async () => {
    try {
      const creds = JSON.parse(localStorage.getItem('gec_biometric_creds') || '[]')
      const singleFallback = localStorage.getItem('gec_biometric_cred')
      if (singleFallback && !creds.includes(singleFallback)) {
        creds.push(singleFallback)
      }

      if (creds.length === 0) return

      const challenge = new Uint8Array(32)
      window.crypto.getRandomValues(challenge)

      const allowCredentials = creds.map(cred => {
        const rawId = new Uint8Array(atob(cred).split('').map(c => c.charCodeAt(0)))
        return {
          type: "public-key",
          id: rawId
        }
      })

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials,
          userVerification: "required",
          timeout: 60000
        }
      })

      if (assertion) {
        setIsAuthenticated(true)
        setAuthError('')
      }
    } catch (err) {
      console.error('Biometric assertion error:', err)
      setAuthError('Biometric authentication failed. Please make sure your fingerprint or FaceID matches a registered member.')
    }
  }

  const handleAuth = (e) => {
    e.preventDefault()
    // Secret passphrase
    if (password === 'GEC_ADMIN_2026') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect secret passphrase. Try again.')
    }
  }

  const updateStatus = async (id, newStatus) => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    )
    setApplications(updated)
    localStorage.setItem('gec_applications', JSON.stringify(updated))

    try {
      await supabase
        .from('gec_applications')
        .update({ status: newStatus })
        .eq('id', id)
    } catch (err) {
      console.error('Supabase status update error:', err)
    }
  }

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to remove this application?')) {
      const updated = applications.filter(app => app.id !== id)
      setApplications(updated)
      localStorage.setItem('gec_applications', JSON.stringify(updated))

      try {
        await supabase
          .from('gec_applications')
          .delete()
          .eq('id', id)
      } catch (err) {
        console.error('Supabase deletion error:', err)
      }
    }
  }

  const handleMail = (app, status) => {
    let subject = ''
    let body = ''

    if (status === 'Shortlisted' || status === 'Selected') {
      subject = encodeURIComponent('Congratulations! Update from GEC Selection Team')
      body = encodeURIComponent(
        `Dear ${app.fullName},\n\n` +
        `Congratulations! We are thrilled to inform you that your application for the Galgotias Entrepreneurship Cell (GEC) has been accepted for further review.\n\n` +
        `Next Steps:\n` +
        `- Join our orientation session.\n` +
        `- Please expect an invite on WhatsApp shortly for interview scheduling.\n\n` +
        `We are looking forward to building something awesome with you!\n\n` +
        `Best regards,\n` +
        `GEC Selection Team\n` +
        `Galgotias University`
      )
    } else {
      subject = encodeURIComponent('Update regarding your GEC Application')
      body = encodeURIComponent(
        `Dear ${app.fullName},\n\n` +
        `Thank you for taking the time to apply to the Galgotias Entrepreneurship Cell (GEC).\n\n` +
        `While we were incredibly impressed by your profile, we are unable to move forward with your application for membership at this time due to high volume.\n\n` +
        `However, our open workshops, hackathons, and guest speaker events are open to all students. We highly encourage you to attend our forthcoming open events.\n\n` +
        `Keep building and exploring!\n\n` +
        `Warm regards,\n` +
        `GEC Team\n` +
        `Galgotias University`
      )
    }

    window.location.href = `mailto:${app.email}?subject=${subject}&body=${body}`
  }

  const [teamFilter, setTeamFilter] = useState('All Teams')
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredApps = applications.filter(app => {
    const matchesStatus = filter === 'All' || app.status === filter
    const matchesTeam = teamFilter === 'All Teams' || 
      (app.interests && app.interests.split(', ').map(t => t.trim()).includes(teamFilter))
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch = !q || 
      (app.fullName && app.fullName.toLowerCase().includes(q)) || 
      (app.email && app.email.toLowerCase().includes(q)) || 
      (app.whatsapp && app.whatsapp.toLowerCase().includes(q))
    return matchesStatus && matchesTeam && matchesSearch
  })

  const exportToCSV = () => {
    if (filteredApps.length === 0) {
      alert('No data available to export.')
      return
    }

    let csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Full Name,Email,WhatsApp,Year/Branch,Selected Teams,Status,Applied At\n"

    filteredApps.forEach(app => {
      const row = [
        `"${app.id || ''}"`,
        `"${(app.fullName || '').replace(/"/g, '""')}"`,
        `"${(app.email || '').replace(/"/g, '""')}"`,
        `"${(app.whatsapp || '').replace(/"/g, '""')}"`,
        `"${(app.yearBranch || '').replace(/"/g, '""')}"`,
        `"${(app.interests || '').replace(/"/g, '""')}"`,
        `"${app.status || ''}"`,
        `"${app.appliedAt || ''}"`
      ].join(",")
      csvContent += row + "\n"
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `gec_applications_${teamFilter.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Return to Home
  const goHome = () => {
    window.location.href = '/'
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-wrapper">
        <motion.div 
          className="admin-auth-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="admin-auth-header">
            <span className="admin-secret-tag">🔒 PRIVATE RESTRICTED PORTAL</span>
            <h2>Internal Admin Access</h2>
            <p>Access is restricted to authorized GEC board members only.</p>
          </div>

          <form onSubmit={handleAuth} className="admin-auth-form">
            <div className="admin-input-group">
              <label>Passphrase *</label>
              <input 
                type="password" 
                placeholder="Enter secret access key" 
                required 
                autoFocus
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

             {authError && <p className="admin-auth-error">{authError}</p>}

            {biometricsAvailable && hasBiometrics && (
              <button 
                type="button" 
                onClick={loginWithBiometrics} 
                className="btn btn-secondary biometric-btn"
                style={{ marginBottom: '12px', width: '100%', background: '#10b981', color: '#fff', border: 'none' }}
              >
                Unlock with Fingerprint / Face ID (Mac, iOS, Android) 👆
              </button>
            )}

            <button type="submit" className="btn btn-primary submit-btn">
              Authorize →
            </button>
            <button type="button" onClick={goHome} className="btn btn-ghost" style={{ marginTop: '12px', width: '100%' }}>
              Back to Website
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard-wrapper">
      <header className="admin-header">
        <div className="admin-title-area">
          <span className="admin-live-badge">ADMIN ACTIVE</span>
          <h1>GEC Applications Manager</h1>
          <p>Review candidate profiles, filter domains, and send result notifications.</p>
        </div>
        <div className="admin-actions">
          {biometricsAvailable && (
            <button className="btn btn-primary" onClick={registerBiometrics} style={{ marginRight: '12px' }}>
              Add Fingerprint / Face ID
            </button>
          )}
          <button className="btn btn-ghost" onClick={goHome}>Home</button>
        </div>
      </header>

      {/* Analytics/Count Cards */}
      <div className="admin-analytics-grid">
        <div className="admin-stat-card">
          <h4>{applications.length}</h4>
          <span>Total Received</span>
        </div>
        <div className="admin-stat-card">
          <h4>{applications.filter(a => a.status === 'Selected').length}</h4>
          <span>Selected</span>
        </div>
        <div className="admin-stat-card">
          <h4>{applications.filter(a => a.status === 'Rejected').length}</h4>
          <span>Rejected</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-filter-bar">
        {['All', 'Pending', 'Selected', 'Rejected'].map(status => (
          <button 
            key={status} 
            className={`admin-filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Realtime Search & Team Select Controls */}
      <div className="admin-controls-row">
        <div className="admin-search-box">
          <input 
            type="text" 
            placeholder="Search candidate name, email, or whatsapp..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="admin-teams-filter-dropdown">
          <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="All Teams">All Teams</option>
            {ALL_TEAMS.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <button onClick={exportToCSV} className="btn btn-primary btn-export" style={{ background: '#10b981', borderColor: '#10b981' }}>
          📥 Export to Excel (CSV)
        </button>
      </div>

      {/* Table List of Applicants */}
      <div className="admin-table-container">
        {filteredApps.length === 0 ? (
          <div className="admin-empty-state">
            <p>No applications found in the '{filter}' category.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Contact</th>
                <th>Branch / Year</th>
                <th>Interest Area</th>
                <th>Status</th>
                <th>Decision Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id}>
                  <td>
                    <div className="applicant-primary">
                      <strong>{app.fullName}</strong>
                      <span className="app-time">Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="applicant-contact">
                      <span>{app.email}</span>
                      <span>{app.whatsapp}</span>
                    </div>
                  </td>
                  <td>{app.yearBranch}</td>
                  <td>
                    <span className="domain-tag">{app.interests}</span>
                  </td>
                  <td>
                    <span className={`status-pill pill-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button 
                        onClick={() => updateStatus(app.id, 'Selected')}
                        className="action-btn btn-accept"
                        title="Accept member"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => updateStatus(app.id, 'Rejected')}
                        className="action-btn btn-reject"
                        title="Reject member"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleMail(app, app.status)}
                        className="action-btn btn-mail"
                        title="Send decision email"
                      >
                        Mail
                      </button>
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="action-btn btn-delete"
                        title="Delete application"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
