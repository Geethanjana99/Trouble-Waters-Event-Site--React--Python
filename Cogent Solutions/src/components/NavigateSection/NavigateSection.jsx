import React from 'react';
import './NavigateSection.css';

export default function NavigateSection() {
  return (
    <section className="navigate-section" id="navigate">
      {/* Decorative Grid Lines */}
      <div className="nav-grid-overlay"></div>
      
      <div className="navigate-container">
        {/* Left Side: Dynamic Info Cards / Pillars representing challenges */}
        <div className="navigate-visual">
          <div className="challenge-card card-costs animate-hover-up">
            {/* Tech bracket accents */}
            <span className="tech-bracket tl"></span>
            <span className="tech-bracket tr"></span>
            <span className="tech-bracket bl"></span>
            <span className="tech-bracket br"></span>
            
            <div className="challenge-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="challenge-icon"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className="challenge-text">
              <span className="card-status-badge">CRITICAL PILLAR</span>
              <h3>Rising Costs</h3>
              <p>Operational pressures & freight volatility.</p>
            </div>
            
            {/* Mini tech chart graphic */}
            <div className="card-telemetry text-red">
              <svg viewBox="0 0 80 20" className="telemetry-sparkline">
                <path d="M 0 15 Q 10 5, 20 12 T 40 3 T 60 17 T 80 5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" className="sparkline-path" />
              </svg>
            </div>
          </div>

          <div className="challenge-card card-geo animate-hover-up">
            {/* Tech bracket accents */}
            <span className="tech-bracket tl"></span>
            <span className="tech-bracket tr"></span>
            <span className="tech-bracket bl"></span>
            <span className="tech-bracket br"></span>
            
            <div className="challenge-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="challenge-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div className="challenge-text">
              <span className="card-status-badge">GEOGRAPHIC</span>
              <h3>Geopolitical Dynamics</h3>
              <p>Regional volatility demanding hyper-resilience.</p>
            </div>
            
            {/* Mini tech chart graphic */}
            <div className="card-telemetry text-accent">
              <svg viewBox="0 0 80 20" className="telemetry-sparkline">
                <path d="M 0 10 Q 15 18, 30 5 T 50 15 T 80 8" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" className="sparkline-path" />
              </svg>
            </div>
          </div>

          <div className="challenge-card card-sustain animate-hover-up">
            {/* Tech bracket accents */}
            <span className="tech-bracket tl"></span>
            <span className="tech-bracket tr"></span>
            <span className="tech-bracket bl"></span>
            <span className="tech-bracket br"></span>
            
            <div className="challenge-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="challenge-icon"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"></path><path d="M9 11a3 3 0 0 0-3 3v6"></path></svg>
            </div>
            <div className="challenge-text">
              <span className="card-status-badge">GLOBAL INITIATIVE</span>
              <h3>Sustainability</h3>
              <p>Meeting mandates without sacrificing ROI.</p>
            </div>
            
            {/* Mini tech chart graphic */}
            <div className="card-telemetry text-red">
              <svg viewBox="0 0 80 20" className="telemetry-sparkline">
                <path d="M 0 5 Q 20 18, 40 4 T 60 16 T 80 12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" className="sparkline-path" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: High-impact Editorial Copy */}
        <div className="navigate-content">
          <div className="nav-tagline">STRATEGIC OUTLOOK</div>
          <h2 className="navigate-title">
            Navigate the Complexities of <span className="highlight-text">Gulf Supply Chain & Logistics</span>
          </h2>
          
          <div className="navigate-paragraphs">
            <p className="lead-paragraph">
              The Gulf’s supply chains are under pressure from rising costs, geopolitical instability, and shifting sustainability mandates, forcing CFOs, COOs, and supply chain leaders to reduce costs, build resilience, and integrate sustainable practices without compromising performance, with AI-powered SCM and WMS solutions being key to future-proofing logistics and driving efficiency.
            </p>
            <p className="sub-paragraph">
              This exclusive event, hosted by <strong>Accelalpha & Oracle</strong>, offers practical insights and real-world strategies to streamline operations, reduce risks, and meet sustainability goals while staying ahead of market volatility.
            </p>
          </div>

          <div className="navigate-actions">
            <a href="#register" className="navigate-cta-btn">
              <span>REGISTER NOW</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
