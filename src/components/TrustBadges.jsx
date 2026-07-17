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
    <section id="trust-badges" className="py-5 py-lg-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title animate-fade-in">Why Choose Cyberdyke Tech?</h2>
        <div className="row text-center g-4">
          {badges.map((badge, index) => (
            <div key={index} className={`col-md-4 animate-fade-in delay-${index + 1}`}>
              <div className="trust-item p-4 h-100">
                <div className="trust-icon-wrapper">
                  <i className={`${badge.icon} fa-3x`}></i>
                </div>
                <h3 className="h5 fw-bold mb-2">{badge.title}</h3>
                <p className="text-muted small mb-0">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
