import React from 'react';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';
import img7 from '../../assets/7.png';
import img8 from '../../assets/8.png';
import './Speakers.css';

const speakersList = [
  {
    name: 'Dr Raman Kumar',
    title: 'CEO',
    company: 'Al-Futtaim Logistics',
    image: img3
  },
  {
    name: 'David Moono',
    title: 'Global Logistics Manager',
    company: 'Weatherford',
    image: img1
  },
  {
    name: 'Tamer Hamed',
    title: 'CIO',
    company: 'Dubai Cable Company (Ducab)',
    image: img5
  },
  {
    name: 'Richard Buxton',
    title: 'VP EMEA',
    company: 'Accelalpha',
    image: img4
  },
  {
    name: 'Joe Spear',
    title: 'Partner',
    company: 'Accelalpha',
    image: img2
  },
  {
    name: 'Srivatsav Sarvepalli',
    title: 'Regional Director Supply Chain Solutions, ECEMEA',
    company: 'Oracle',
    image: img6
  },
  {
    name: 'Rohan Chitnis',
    title: 'Sales Director Applications',
    company: 'Oracle',
    image: img8
  },
  {
    name: 'Ujjwal Kumar',
    title: 'Principal Domain Lead, ECEMEA',
    company: 'Oracle',
    image: img7
  }
];

export default function Speakers() {
  return (
    <section id="speakers" className="speakers-section">
      <div className="speakers-container">
        
        {/* Title */}
        <div className="section-header">
          <span className="speakers-badge">EXPERT PANEL</span>
          <h2>
            Our <span className="text-gradient">Speakers</span>
          </h2>
          <p>
            Hear firsthand insights, real-world case studies, and forward-looking strategies from regional leaders.
          </p>
        </div>

        {/* Grid */}
        <div className="speakers-grid">
          {speakersList.map((speaker, idx) => (
            <div 
              key={idx}
              className="glass-card speaker-card animate-hover-up"
            >
              {/* Image Container with Tech Radar Rings */}
              <div className="avatar-tech-ring-container">
                <div className="speaker-orbit-ring ring-1"></div>
                <div className="speaker-orbit-ring ring-2"></div>
                
                <div className="avatar-wrapper">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="avatar-image"
                  />
                  <div className="avatar-tech-overlay"></div>
                </div>
              </div>

              {/* Speaker Info */}
              <div className="speaker-details">
                <div className="details-header-row">
                  <span className="speaker-company-tag">{speaker.company}</span>
                  <span className="live-pulse-dot"></span>
                </div>
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-title">{speaker.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
