import React from 'react';
import cogentLogo from '../../assets/cogent.png';
import award1 from '../../assets/Award1.png';
import award2 from '../../assets/Award2.png';
import award3 from '../../assets/Award3.png';
import award4 from '../../assets/Award4.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Footer Top Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand-col">
            <img src={cogentLogo} alt="Cogent Solutions" className="footer-logo-img" />
            <p className="footer-desc">
              Through our conferences we transform your business challenges into opportunities. Our clients and customers are leading government entities and the fortune 500 companies.
            </p>
            
            {/* Awards section */}
            <div className="footer-awards-box">
              <h4 className="footer-sub-title">Awards</h4>
              <div className="awards-images-grid">
                <img src={award1} alt="Award 1" className="footer-award-img" />
                <img src={award2} alt="Award 2" className="footer-award-img" />
                <img src={award3} alt="Award 3" className="footer-award-img" />
                <img src={award4} alt="Award 4" className="footer-award-img" />
              </div>
            </div>
          </div>

          {/* Our Offices */}
          <div className="footer-col">
            <h3 className="footer-col-title">Our Offices</h3>
            <div className="office-locations-list">
              <div className="office-node">
                <span className="office-hq-name">Middle East & Africa HQ</span>
                <p className="office-address">
                  Office No: 209, The Metropolis Tower<br />
                  Business Bay, Dubai, United Arab Emirates
                </p>
              </div>
              <div className="office-node">
                <span className="office-hq-name">Asia Pacific HQ</span>
                <p className="office-address">
                  2nd floor Green Lanka Tower, Colombo<br />
                  Sri Lanka
                </p>
              </div>
              <div className="office-node">
                <span className="office-hq-name">Saudi Arabia HQ</span>
                <p className="office-address">
                  Riyadh, Saudi Arabia
                </p>
              </div>
            </div>
          </div>

          {/* Contact / Partnerships */}
          <div className="footer-col">
            <h3 className="footer-col-title">Contact & Partnerships</h3>
            <div className="footer-contact-details">
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="contact-text">+971 4 576 1039 / +971 50 643 5244</span>
              </div>
              
              <div className="contact-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:partnerships@cogentsolutions.ae" className="contact-link">
                  partnerships@cogentsolutions.ae
                </a>
              </div>
            </div>

            {/* Social media icons panel */}
            <div className="footer-social-row">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="X (formerly Twitter)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div className="footer-bottom">
          <p className="copyright-text">© 2026 Cogent Solutions Event Management LLC. All Right Reserved</p>
          <p className="coop-text">Organized in cooperation with Oracle Corporation and Accelalpha.</p>
        </div>

      </div>
    </footer>
  );
}
