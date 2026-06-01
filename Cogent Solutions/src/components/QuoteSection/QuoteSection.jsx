import React from 'react';
import './QuoteSection.css';

export default function QuoteSection() {
  return (
    <section className="quote-section">
      {/* Immersive Cyber grid backdrop */}
      <div className="quote-cyber-grid"></div>
      <div className="quote-glow-bg"></div>
      
      <div className="quote-container">
        {/* Editorial Quote - Centered and simplified */}
        <div className="quote-panel">
          {/* Cybernetic bracket accents */}
          <span className="quote-bracket tl"></span>
          <span className="quote-bracket tr"></span>
          <span className="quote-bracket bl"></span>
          <span className="quote-bracket br"></span>

          {/* SCM Themed Tag Badge */}
          <div className="quote-tag-badge">LEADERSHIP VISION</div>

          <div className="quote-content">
            <p className="quote-text">
              &ldquo;This is your opportunity to rethink your supply chain strategy, 
              stay ahead of disruption, and lead with sustainable, 
              data-driven solutions tailored to the region’s needs.&rdquo;
            </p>
          </div>
          
          {/* SCM Accent Bar */}
          <div className="quote-accent-bar"></div>
        </div>
      </div>
    </section>
  );
}

