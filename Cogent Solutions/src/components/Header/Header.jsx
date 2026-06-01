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
    const sections = ['overview', 'reasons', 'speakers', 'agenda', 'register'];
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

          {/* Reasons Section Link */}
          <div className="nav-item-wrapper">
            <a
              href="#reasons"
              className={`nav-link ${activeSection === 'reasons' ? 'active' : ''}`}
            >
              Why Attend
            </a>
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

          {/* Register Button */}
          <div className="nav-item-wrapper" style={{ marginLeft: '1rem' }}>
            <a
              href="#register"
              className={`nav-link register-btn-nav ${activeSection === 'register' ? 'active' : ''}`}
              style={{
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                padding: '0.35rem 0.9rem',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '0.78rem'
              }}
            >
              Register Now
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
          {[{name: 'Overview', id: 'overview'}, {name: 'Why Attend', id: 'reasons'}, {name: 'Speakers', id: 'speakers'}, {name: 'Agenda', id: 'agenda'}, {name: 'Register', id: 'register'}].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '1.1rem',
                color: 'hsl(var(--foreground))'
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
