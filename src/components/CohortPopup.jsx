import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CohortPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Wait for the main site animations to finish
    const t1 = setTimeout(() => {
      setShow(true);
    }, 2500);

    return () => clearTimeout(t1);
  }, []);

  const closePopup = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="/cohort"
          className="cohort-floating-widget"
          initial={{ opacity: 0, y: 80, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 9999,
            textDecoration: 'none'
          }}
        >
          {/* Animated Gradient Border */}
          <div className="widget-animated-border"></div>
          
          <div className="widget-glow-bg"></div>
          
          <div className="widget-inner">
            <div className="widget-icon-wrap">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay"></div>
              <span className="widget-emoji">🚀</span>
            </div>
            
            <div className="widget-content">
              <div className="widget-tag">
                <span className="live-dot-red"></span> APPLICATIONS OPEN
              </div>
              <div className="widget-title">Cohort Program</div>
            </div>
            
            <div className="widget-cta">
              <span>Apply</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            
            <button className="widget-close" onClick={closePopup} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
