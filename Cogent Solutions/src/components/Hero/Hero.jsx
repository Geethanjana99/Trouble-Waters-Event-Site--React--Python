import React, { useState, useEffect } from 'react';
import shipImg from '../../assets/ship.png';
import planeImg from '../../assets/Aeroplane.png';
import waveImg from '../../assets/wave.jpg';
import bgImage from '../../assets/Hero Background.jpg';
import './Hero.css';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Event Target: Nov 13, 2024
    const targetDate = new Date('2024-11-13T09:30:00+04:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="creative-hero">
      {/* Background Image Layer */}
      <div 
        className="hero-image-bg" 
        style={{ backgroundImage: `url("${bgImage}")` }}
      ></div>

      {/* Dynamic Background */}
      <div className="hero-bg">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="section-bottom-wave">
        <img src={waveImg} alt="Sea Wave" className="img-wave" />
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-text-content">
          <div className="creative-badge">
            EXCLUSIVE INVITATION
          </div>

          <h1 className="hero-title">
            <span className="title-light">Troubled Waters:</span>
            <br />
            <span className="title-subtitle">
              Sailing with <span className="text-gradient">AI</span> in Supply Chain
            </span>
          </h1>

          {/* Minimalist Details Box */}
          <div className="event-info-strip">
            <div className="info-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>13th Nov 2024</span>
            </div>
            <div className="info-divider"></div>
            <div className="info-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>09:30 AM - 01:00 PM</span>
            </div>
            <div className="info-divider"></div>
            <div className="info-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Marriott Resort, The Palm</span>
            </div>
          </div>

          <div className="action-row">
            <a href="#register" className="creative-btn">
              <span className="btn-text">REGISTER NOW</span>
              <span className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </a>
            
            {/* Countdown aligned nicely */}
            <div className="mini-countdown">
              <div className="time-unit">
                <strong>{String(timeLeft.days).padStart(2, '0')}</strong><span>d</span>
              </div>
              <div className="time-unit">
                <strong>{String(timeLeft.hours).padStart(2, '0')}</strong><span>h</span>
              </div>
              <div className="time-unit">
                <strong>{String(timeLeft.minutes).padStart(2, '0')}</strong><span>m</span>
              </div>
              <div className="time-unit">
                <strong>{String(timeLeft.seconds).padStart(2, '0')}</strong><span>s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Modern Abstract Image Composition */}
        <div className="hero-visual-composition">
          <div className="aeroplane-container animate-float-plane">
            <img src={planeImg} alt="Aeroplane" className="img-aeroplane" />
          </div>

          <div className="main-ship-container">
            <img src={shipImg} alt="Main Ship Logistics" className="img-main-ship" />
          </div>
          
          {/* Decorative geometric elements */}
          <div className="geo-shape geo-circle"></div>
          <div className="geo-shape geo-dots"></div>

          {/* AI Neural Supply Chain Network Vector */}
          <div className="ai-network-container">
            <svg className="ai-network-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ai-glow-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="ai-glow-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Grid-like connections representing AI matrix & Logistics routes */}
              <path d="M 50 150 L 180 150 L 240 220 L 380 220 L 450 300" stroke="url(#ai-glow-1)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 100 380 L 220 380 L 280 310 L 400 310 L 460 210" stroke="url(#ai-glow-2)" strokeWidth="2" />
              <path d="M 280 80 L 280 180 L 360 250 L 440 250" stroke="url(#ai-glow-1)" strokeWidth="1.5" />
              
              {/* Inter-connecting supply chain node lines */}
              <line x1="180" y1="150" x2="220" y2="380" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="240" y1="220" x2="280" y2="310" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="380" y1="220" x2="360" y2="250" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="280" y1="180" x2="240" y2="220" stroke="hsl(var(--accent))" strokeWidth="1" strokeOpacity="0.3" />

              {/* Glowing Pulse Nodes */}
              <circle cx="180" cy="150" r="5" fill="hsl(var(--primary))" className="pulse-node animate-pulse-slow" />
              <circle cx="240" cy="220" r="7" fill="hsl(var(--accent))" className="pulse-node" />
              <circle cx="380" cy="220" r="5" fill="hsl(var(--primary))" className="pulse-node" />
              
              <circle cx="220" cy="380" r="6" fill="hsl(var(--accent))" className="pulse-node" />
              <circle cx="280" cy="310" r="8" fill="hsl(var(--primary))" className="pulse-node animate-pulse-slow" />
              <circle cx="400" cy="310" r="4" fill="hsl(var(--accent))" className="pulse-node" />

              <circle cx="280" cy="180" r="5" fill="hsl(var(--primary))" className="pulse-node" />
              <circle cx="360" cy="250" r="6" fill="hsl(var(--accent))" className="pulse-node animate-pulse-slow" />

              {/* Data packet flow indicators */}
              <circle cx="180" cy="150" r="2" fill="#fff" className="data-packet-1" />
              <circle cx="280" cy="310" r="2.5" fill="#fff" className="data-packet-2" />

              {/* Tech/AI Hexagonal Elements */}
              <polygon points="165,135 195,135 210,150 195,165 165,165 150,150" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.25" />
              <polygon points="265,295 295,295 310,310 295,325 265,325 250,310" stroke="hsl(var(--accent))" strokeWidth="1" fill="none" opacity="0.35" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
