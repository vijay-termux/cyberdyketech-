import React from 'react';
import './Features.css';

export default function Features() {
  const features = [
    {
      icon: 'fa-brain',
      title: 'AI-Powered Detection',
      description: 'Machine learning algorithms that evolve with threats'
    },
    {
      icon: 'fa-clock',
      title: '24/7 Monitoring',
      description: 'Round-the-clock threat detection and response'
    },
    {
      icon: 'fa-chart-line',
      title: 'Real-Time Analytics',
      description: 'Actionable insights from live security data'
    },
    {
      icon: 'fa-lock',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance standards'
    },
    {
      icon: 'fa-users-cog',
      title: 'Expert Support',
      description: 'Dedicated security experts at your service'
    },
    {
      icon: 'fa-globe',
      title: 'Global Coverage',
      description: 'Protection across multiple geographic regions'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="features-header">
          <h2>Why Choose CyberDyke Tech</h2>
          <p>Advanced capabilities built for modern threats</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
