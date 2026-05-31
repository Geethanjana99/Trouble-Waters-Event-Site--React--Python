import React, { useState } from 'react';
import shipImg from '../../assets/ship.png';
import './Agenda.css';

const agendaItems = [
  {
    index: '01',
    time: '09:30 AM - 10:00 AM',
    title: 'Registrations',
    speaker: 'Welcome Committee & Support Staff',
    desc: 'Delegate arrival, security badge generation, cargo system check-in, and morning refreshments.',
    category: 'networking'
  },
  {
    index: '02',
    time: '10:00 AM - 10:10 AM',
    title: 'Welcome Note',
    speaker: 'Richard Buxton (VP EMEA) & Rohan Chitnis (Sales Director Applications, Oracle)',
    desc: 'Plotting the course for digital transformation and establishing the strategic milestones for SCM.',
    category: 'keynotes'
  },
  {
    index: '03',
    time: '10:10 AM - 10:40 AM',
    title: 'Industry Keynote (Outlook & Challenges)',
    speaker: 'Srivatsav Sarvepalli (Regional Director Supply Chain Solutions, Oracle)',
    desc: 'Strategic overview of geopolitical supply chain currents, volatility variables, and the predictive capability of AI algorithms.',
    category: 'keynotes'
  },
  {
    index: '04',
    time: '10:40 AM - 11:10 AM',
    title: 'Successful SCM Implementation',
    speaker: 'Joe Spear (Partner, Accelalpha)',
    desc: 'An implementation checklist for migrating operations to SCM Cloud, ensuring continuous service and zero freight friction.',
    category: 'tech'
  },
  {
    index: '05',
    time: '11:10 AM - 11:30 AM',
    title: 'SCM Innovations Spotlight',
    speaker: 'Ujjwal Kumar (Principal Domain Lead, Oracle)',
    desc: 'Analyzing real-time IoT cargo coordinates, AI automation in warehousing, and high-ROI adaptive logistics.',
    category: 'tech'
  },
  {
    index: '06',
    time: '11:30 AM - 11:50 AM',
    title: 'Coffee Break',
    speaker: 'All Delegates',
    desc: 'Dynamic networking break, platform demonstration desks, and gourmet coffee reception.',
    category: 'networking'
  },
  {
    index: '07',
    time: '11:50 AM - 12:10 PM',
    title: 'Insights from Digital Evolution',
    speaker: 'Dr. Raman Kumar (CEO, Al-Futtaim Logistics)',
    desc: 'Real-world deployment feedback, key lessons, and performance metrics directly from the Al-Futtaim SCM voyage.',
    category: 'keynotes'
  },
  {
    index: '08',
    time: '12:10 PM - 12:40 PM',
    title: 'Strategies in Action: Panel Discussion',
    speaker: 'David Moono (Weatherford) & Tamer Hamed (CIO, Dubai Cable Company)',
    desc: 'An interactive executive discussion panel exploring regional SCM optimization, last-mile agility, and green mandates.',
    category: 'panels'
  },
  {
    index: '09',
    time: '12:40 PM - 01:00 PM',
    title: 'Q&A & Closing Remarks',
    speaker: 'Accelalpha & Oracle SCM Leaders',
    desc: 'Interactive delegate Q&A session, summarizing core takeaways, and presenting closing remarks.',
    category: 'panels'
  },
  {
    index: '10',
    time: '01:00 PM - Onwards',
    title: 'Banquet & Networking',
    speaker: 'All Attendees',
    desc: 'Hosted corporate banquet lunch, SCM blueprint exchange, and business network alignments.',
    category: 'networking'
  }
];

export default function Agenda() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePort, setActivePort] = useState(0);

  // Filter agenda items based on active filter selection
  const filteredItems = activeFilter === 'all'
    ? agendaItems
    : agendaItems.filter(item => item.category === activeFilter);

  // Safely clamp active port index if filter changes and filtered set is smaller
  const safeActivePort = activePort >= filteredItems.length ? 0 : activePort;

  // Helper count badges
  const getCount = (cat) => {
    if (cat === 'all') return agendaItems.length;
    return agendaItems.filter(item => item.category === cat).length;
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setActivePort(0); // Reset course back to Port 0 of call
  };

  return (
    <section id="agenda" className="agenda-section">
      <div className="agenda-sea-backdrop"></div>
      
      <div className="agenda-container">
        {/* Title */}
        <div className="section-header">
          <span className="voyage-tag">VOYAGE ROUTE MAP</span>
          <h2>
            Sailing Schedule <span className="text-gradient">&amp; Route</span>
          </h2>
          <p>
            Track our supply chain cargo ports. Click on any Port of Call to navigate our SCM vessel vertically down the channel.
          </p>
        </div>

        {/* High-Tech Filter Tabs Bar */}
        <div className="agenda-filters-bar">
          <button 
            className={`agenda-filter-btn ${activeFilter === 'all' ? 'filter-active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            <span>All Ports</span>
            <span className="btn-badge">{getCount('all')}</span>
          </button>
          
          <button 
            className={`agenda-filter-btn ${activeFilter === 'keynotes' ? 'filter-active' : ''}`}
            onClick={() => handleFilterChange('keynotes')}
          >
            <span>Keynotes &amp; Insights</span>
            <span className="btn-badge">{getCount('keynotes')}</span>
          </button>
          
          <button 
            className={`agenda-filter-btn ${activeFilter === 'tech' ? 'filter-active' : ''}`}
            onClick={() => handleFilterChange('tech')}
          >
            <span>Tech Spotlights</span>
            <span className="btn-badge">{getCount('tech')}</span>
          </button>

          <button 
            className={`agenda-filter-btn ${activeFilter === 'panels' ? 'filter-active' : ''}`}
            onClick={() => handleFilterChange('panels')}
          >
            <span>Interactive &amp; Panels</span>
            <span className="btn-badge">{getCount('panels')}</span>
          </button>

          <button 
            className={`agenda-filter-btn ${activeFilter === 'networking' ? 'filter-active' : ''}`}
            onClick={() => handleFilterChange('networking')}
          >
            <span>Networking</span>
            <span className="btn-badge">{getCount('networking')}</span>
          </button>
        </div>

        {/* Dynamic Vertical SCM Shipping Lane Timeline */}
        <div className="vertical-shipping-lane-container">
          
          {/* Central Dotted Shipping Channel Line */}
          <div className="vertical-shipping-channel"></div>

          {/* SCM Floating Vessel (Moves vertically down the line!) */}
          {filteredItems.length > 0 && (
            <div 
              className="floating-vertical-vessel"
              style={{ 
                top: filteredItems.length === 1 
                  ? '50%' 
                  : `calc(${(safeActivePort / (filteredItems.length - 1)) * 92}% + 2.5%)`,
                transition: 'top 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img src={shipImg} alt="SCM Cargo Vessel" className="vessel-vertical-img" />
              <div className="vessel-engine-glow-vertical"></div>
            </div>
          )}

          {/* Alternating Left / Right Agenda Nodes */}
          <div className="vertical-agenda-flow">
            {filteredItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = safeActivePort === idx;
              return (
                <div 
                  key={idx} 
                  className={`vertical-agenda-row ${isActive ? 'row-active' : ''}`}
                  onClick={() => setActivePort(idx)}
                >
                  {/* Left Column (Even indices) */}
                  <div className="agenda-column column-left">
                    {isEven && (
                      <div className="tech-manifest-panel text-right-align">
                        <span className="panel-edge tl"></span>
                        <span className="panel-edge tr"></span>
                        <span className="panel-edge bl"></span>
                        <span className="panel-edge br"></span>
                        
                        <span className="manifest-time">{item.time}</span>
                        <h3 className="manifest-title">{item.title}</h3>
                        <p className="manifest-desc">{item.desc}</p>
                        {item.speaker && (
                          <div className="manifest-speakers-box">
                            <span className="speakers-label">SPEAKERS</span>
                            <p className="speakers-names">{item.speaker}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Center Column: Buoy / Port indicator */}
                  <div className="agenda-column column-center">
                    <div className={`port-buoy-vertical ${isActive ? 'buoy-active' : ''}`}>
                      <span className="buoy-sonar-wave"></span>
                      <span className="buoy-core"></span>
                    </div>
                  </div>

                  {/* Right Column (Odd indices) */}
                  <div className="agenda-column column-right">
                    {!isEven && (
                      <div className="tech-manifest-panel text-left-align">
                        <span className="panel-edge tl"></span>
                        <span className="panel-edge tr"></span>
                        <span className="panel-edge bl"></span>
                        <span className="panel-edge br"></span>

                        <span className="manifest-time">{item.time}</span>
                        <h3 className="manifest-title">{item.title}</h3>
                        <p className="manifest-desc">{item.desc}</p>
                        {item.speaker && (
                          <div className="manifest-speakers-box">
                            <span className="speakers-label">SPEAKERS</span>
                            <p className="speakers-names">{item.speaker}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
