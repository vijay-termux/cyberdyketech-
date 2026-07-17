import './TrustBadges.css'

export default function TrustBadges() {
  const badges = [
    {
      icon: 'fas fa-brain',
      title: 'Ethical AI-Powered',
      description: 'Leveraging adaptive neural telemetry for high-fidelity proactive asset scanning.'
    },
    {
      icon: 'fas fa-clock',
      title: '24/7 Proactive Protection',
      description: 'Dedicated security operating center with continuous monitoring and incident response.'
    },
    {
      icon: 'fas fa-award',
      title: 'Industry Certified',
      description: 'ISO 27001, SOC 2, GDPR compliant with expert risk assessment and auditing.'
    }
  ]

  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="section-title">Why Choose Cyberdyke Tech?</h2>
        <div className="trust-grid">
          {badges.map((badge, index) => (
            <div key={index} className="trust-card">
              <div className="trust-icon">
                <i className={`${badge.icon}`}></i>
              </div>
              <h3>{badge.title}</h3>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
