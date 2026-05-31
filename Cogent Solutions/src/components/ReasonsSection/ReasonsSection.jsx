import React from 'react';
import img1 from '../../assets/image-1.jpg';
import img2 from '../../assets/image-2.jpg';
import img3 from '../../assets/image-3.jpg';
import './ReasonsSection.css';

export default function ReasonsSection() {
  const reasons = [
    {
      number: '01',
      tag: 'PREDICTIVE POWER',
      title: "Oracle’s Gen AI SCM Platform Unveiled",
      description: "Explore how Oracle’s AI powered SCM innovations offer predictive analytics, automation, improved visibility, and sustainability into Supply Chains such as yours.",
      image: img1
    },
    {
      number: '02',
      tag: 'REAL-WORLD IMPACT',
      title: "Customer Success Stories That Deliver Results",
      description: "Hear how companies partnered with Oracle and Accelalpha to optimize logistics flows, cut costs, and improve resilience while reducing their environmental impact through smarter inventory management and automation.",
      image: img2
    },
    {
      number: '03',
      tag: 'AGILE FUTURES',
      title: "Practical Solutions for Green & Resilient Operations",
      description: "Learn how to navigate geopolitical risks, last-mile delivery challenges, and integrate eco-friendly practices - keeping operations agile and competitive in an evolving Gulf market.",
      image: img3
    }
  ];

  return (
    <section className="reasons-section" id="reasons">
      {/* Dynamic Grid Background Overlay */}
      <div className="reasons-tech-grid"></div>
      
      <div className="reasons-container">
        {/* Asymmetrical Section Header */}
        <div className="reasons-header-block">
          <div className="header-left">
            <span className="tech-badge-glow">STRATEGIC FOCUS</span>
            <h2 className="reasons-neo-title">
              Top 3 Reasons <br />
              <span className="glow-gradient-text">to Attend</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="header-pitch">
              A high-impact gathering designed to deliver immediate competitive advantages through AI intelligence and sustainable resilience.
            </p>
          </div>
        </div>

        {/* Alternating SCM Pipeline Path Layout */}
        <div className="scm-pipeline-flow">
          {/* Vertical Connecting Neon Pipeline */}
          <div className="vertical-pipeline-line">
            <div className="flowing-pipeline-pulse"></div>
          </div>

          {reasons.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div 
                key={idx} 
                className={`pipeline-node-row ${isEven ? 'row-reversed' : ''}`}
              >
                {/* Visual Image Block with Futuristic Slanted Clip-Path */}
                <div className="pipeline-visual-block">
                  <div className="slanted-image-frame">
                    <img src={item.image} alt={item.title} className="slanted-img" />
                    <div className="slanted-glass-overlay"></div>
                    <div className="pipeline-node-number">{item.number}</div>
                  </div>
                  
                  {/* Decorative Tech Grid Ring */}
                  <div className="node-tech-ring"></div>
                </div>

                {/* Center Node Indicator (Connecting the pipeline) */}
                <div className="pipeline-center-hub">
                  <div className="hub-outer-circle">
                    <div className="hub-inner-core"></div>
                  </div>
                </div>

                {/* Text Content Block in Tech Panel Style */}
                <div className="pipeline-content-block">
                  <div className="tech-reason-panel">
                    <span className="panel-tech-tag">{item.tag}</span>
                    <h3 className="panel-reason-title">{item.title}</h3>
                    <p className="panel-reason-desc">{item.description}</p>
                    
                    {/* Futuristic Crosshairs */}
                    <span className="crosshair-bracket top-left"></span>
                    <span className="crosshair-bracket top-right"></span>
                    <span className="crosshair-bracket bottom-left"></span>
                    <span className="crosshair-bracket bottom-right"></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
