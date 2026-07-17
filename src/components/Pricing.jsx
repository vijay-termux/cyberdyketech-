import React from 'react';
import './Pricing.css';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$499',
      period: '/month',
      description: 'Perfect for small teams',
      features: [
        'Up to 5 systems',
        'Daily threat scans',
        'Email support',
        'Basic reports',
        'Community access'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$1,499',
      period: '/month',
      description: 'Most popular for enterprises',
      features: [
        'Unlimited systems',
        'Real-time monitoring',
        'Priority 24/7 support',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Custom SLAs',
        'On-premises option',
        'API access',
        'Training & consulting'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-header">
          <h2>Transparent Pricing</h2>
          <p>Choose the plan that fits your needs</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              {plan.highlighted && <div className="badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="description">{plan.description}</p>
              
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check"></i> {feature}
                  </li>
                ))}
              </ul>

              <button className={`cta-button ${plan.highlighted ? 'primary' : 'secondary'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer">
          <p>All plans include 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
