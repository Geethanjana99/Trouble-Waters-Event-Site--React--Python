import React, { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logoImg from '../../assets/logo.png';
import partnerLogoImg from '../../assets/patner-logo.png';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Section Scrollspy
  useEffect(() => {
    const sections = ['overview', 'about', 'speakers', 'agenda', 'register'];
    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollspy);
    handleScrollspy();
    return () => window.removeEventListener('scroll', handleScrollspy);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Main Logo on the left */}
        <div className="logo-box">
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={logoImg} 
              alt="Cogent Solutions Logo" 
              className="header-logo"
            />
          </a>
        </div>

        {/* Desktop Nav Links & Partner Logos on the right */}
        <nav className="nav-links desktop-only">
          {/* Overview Section Link */}
          <div className="nav-item-wrapper">
            <a
              href="#overview"
              className={`nav-link ${activeSection === 'overview' ? 'active' : ''}`}
            >
              Overview
            </a>
          </div>

          {/* About Section Link */}
          <div className="nav-item-wrapper">
            <a
              href="#about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              Takeaways
            </a>
          </div>

          {/* SCM Sub-Tracks Dropdown */}
          <div className="nav-item-wrapper">
            <span className="nav-link dropdown-trigger">
              SCM Tracks
              <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 1 5 5 9 1" />
              </svg>
            </span>

            {/* Slide-Up Mega Dropdown Submenu */}
            <div className="glass-submenu">
              <a href="#about" className="submenu-item">
                <span className="submenu-item-title">AI & Logistics Strategy</span>
                <span className="submenu-item-desc">Real-time demand forecasting and routing systems.</span>
              </a>
              <a href="#about" className="submenu-item">
                <span className="submenu-item-title">Autonomous Warehousing</span>
                <span className="submenu-item-desc">Fulfillment optimizations and automated space allocation.</span>
              </a>
              <a href="#about" className="submenu-item">
                <span className="submenu-item-title">Cloud Deployment Best Practices</span>
                <span className="submenu-item-desc">High-ROI Oracle SCM migration strategies.</span>
              </a>
            </div>
          </div>

          {/* Speakers Section Link */}
          <div className="nav-item-wrapper">
            <a
              href="#speakers"
              className={`nav-link ${activeSection === 'speakers' ? 'active' : ''}`}
            >
              Speakers
            </a>
          </div>

          {/* Agenda Section Link */}
          <div className="nav-item-wrapper">
            <a
              href="#agenda"
              className={`nav-link ${activeSection === 'agenda' ? 'active' : ''}`}
            >
              Agenda
            </a>
          </div>
          
          <ThemeToggle />

          {/* Partner Logo placed elegantly next to theme toggle */}
          <div className="logo-divider"></div>
          <img 
            src={partnerLogoImg} 
            alt="Oracle Accelalpha Partners" 
            className="header-partner-logo" 
          />
        </nav>

        {/* Mobile menu trigger */}
        <div className="mobile-nav-container">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="glass-submenu"
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            width: '100%',
            transform: 'none',
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            opacity: 1,
            visibility: 'visible',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem'
          }}
        >
          {['Overview', 'About', 'Speakers', 'Agenda'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: 'hsl(var(--foreground))'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
