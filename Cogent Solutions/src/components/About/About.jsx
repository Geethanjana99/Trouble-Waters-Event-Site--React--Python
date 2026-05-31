import React from 'react';
import './About.css';

const valueProps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Resilient Supply Chain Strategies',
    description: 'Learn modern methodologies to navigate logistics disruptions, material shortages, and global scale bottlenecks.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'AI & Automation Solutions',
    description: 'Explore the role of AI in streamlining warehouse workflows, automated demand forecasting, and inventory optimization.'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
        <path d="M12 8v8" />
        <path d="M12 12h6" />
      </svg>
    ),
    title: 'Oracle Cloud Best Practices',
    description: 'Gain a practical guide to successful implementations of Oracle SCM Cloud directly from regional deployment experts.'
  }
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* Section Title */}
        <div className="section-header">
          <h2>
            Transforming Logistics with <span className="text-gradient">Intelligence</span>
          </h2>
          <p>
            Empower your organization with state-of-the-art architectures designed to solve the most demanding contemporary SCM challenges.
          </p>
        </div>

        {/* Info Grid */}
        <div className="value-props-grid">
          {valueProps.map((prop, idx) => (
            <div 
              key={idx} 
              className="glass-card value-prop-card"
            >
              <div className="value-prop-icon-box">
                {prop.icon}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700' }}>{prop.title}</h3>
              <p style={{ color: 'hsl(var(--foreground-muted))', fontSize: '1rem', lineHeight: '1.6' }}>{prop.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Description Block */}
        <div className="glass-card about-details-card">
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Why Sailing with AI in Supply Chain is Essential for You
            </h3>
            <p style={{ color: 'hsl(var(--foreground-muted))', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
              Supply chains have become increasingly complex, dynamic, and fragile. Modern organizations require visibility, agility, and predictive capacity to turn operational constraints into unique market advantages.
            </p>
            <p style={{ color: 'hsl(var(--foreground-muted))', fontSize: '1.05rem' }}>
              This exclusive physical event unites top-tier developers, executives, partners, and practitioners to exchange battle-tested implementations and SCM innovations using the world-class Oracle ecosystem.
            </p>
          </div>

          <div className="details-info-box">
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.2rem' }}>Event Details</h4>
            <div className="details-info-list">
              <div className="details-info-item">
                <span className="details-info-label">Date:</span>
                <span>October 15, 2026</span>
              </div>
              <div className="details-info-item">
                <span className="details-info-label">Time:</span>
                <span>9:00 AM - 2:00 PM</span>
              </div>
              <div className="details-info-item">
                <span className="details-info-label">Venue:</span>
                <span>The Ritz-Carlton, Dubai, UAE</span>
              </div>
              <div className="details-info-item">
                <span className="details-info-label">Audience:</span>
                <span>SCM Directors, CIOs, VPs, Logistics Leads</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
