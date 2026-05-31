import React from 'react';
import roboImg from '../../assets/Red Robo.png';
import './QuoteSection.css';

export default function QuoteSection() {
  return (
    <section className="quote-section">
      {/* Immersive Cyber grid backdrop */}
      <div className="quote-cyber-grid"></div>
      <div className="quote-glow-bg"></div>
      
      <div className="quote-container">
        {/* Left Side: Futuristic Floating AI Robot (SCM Intelligence visual) */}
        <div className="quote-visual-arena">
          {/* Orbit rings representing logistics coordinates */}
          <div className="arena-tech-ring ring-outer"></div>
          <div className="arena-tech-ring ring-inner"></div>
          
          {/* Robotic SCM AI avatar */}
          <div className="robot-wrapper animate-float-robot">
            <img src={roboImg} alt="SCM Intelligence AI Robot" className="img-robo" />
          </div>

          {/* Dynamic glowing laser shadow base beneath the floating robot */}
          <div className="robot-laser-shadow"></div>
        </div>

        {/* Right Side: High-end Editorial Quote */}
        <div className="quote-panel">
          {/* Cybernetic bracket accents */}
          <span className="quote-bracket tl"></span>
          <span className="quote-bracket tr"></span>
          <span className="quote-bracket bl"></span>
          <span className="quote-bracket br"></span>

          {/* SCM Themed Tag Badge (matches STRATEGIC OUTLOOK style) */}
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
