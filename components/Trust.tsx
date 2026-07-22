export default function Trust() {
  const trustItems = [
    {
      id: 1,
      icon: 'assets/icons/technical-support.png',
      title: 'Ethical AI-Powered',
      description: 'Leveraging adaptive neural telemetry for high-fidelity proactive asset scanning.',
      delay: 'delay-1',
    },
    {
      id: 2,
      icon: 'assets/icons/24-hours-service.png',
      title: '24/7 Proactive Protection',
      description: 'Dedicated security operating operations tracking threats and incidents in real-time.',
      delay: 'delay-2',
    },
    {
      id: 3,
      icon: 'assets/icons/iso-certification.png',
      title: 'Verified Compliance',
      description: 'ISO 27001 certified with regular third-party audits and SOC 2 Type II attestations.',
      delay: 'delay-3',
    },
  ]

  return (
    <section id="trust-badges" className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title animate-fade-in">Why Choose Cyberdyke Tech?</h2>
        <div className="row text-center g-4">
          {trustItems.map((item) => (
            <div key={item.id} className={`col-md-4 animate-fade-in ${item.delay}`}>
              <div className="trust-item p-4 h-100">
                <img src={item.icon} alt={item.title} className="mb-3 trust-icon" />
                <h3 className="h5 fw-bold mb-2">{item.title}</h3>
                <p className="text-muted small mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
