import React from 'react';
import './Process.css';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Assessment',
      description: 'We analyze your current security infrastructure and identify vulnerabilities'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Develop a comprehensive security strategy tailored to your needs'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Deploy advanced security solutions with minimal disruption'
    },
    {
      number: '04',
      title: 'Monitoring',
      description: '24/7 threat detection and real-time incident response'
    },
    {
      number: '05',
      title: 'Optimization',
      description: 'Continuous improvement based on emerging threats and trends'
    }
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="process-header">
          <h2>Our Process</h2>
          <p>Structured approach to cybersecurity excellence</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <div className="connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
