import './Services.css'

export default function Services() {
  const services = [
    {
      icon: 'fas fa-brain',
      title: 'AI Vulnerability Scanner',
      description: 'Machine learning-based threat detection and automated patching for robust defense.',
      link: '/services#ai-scanner'
    },
    {
      icon: 'fas fa-shield-alt',
      title: '24/7 Threat Monitoring',
      description: 'Continuous surveillance with a dedicated SOC dashboard for real-time insights.',
      link: '/services#threat-monitoring'
    },
    {
      icon: 'fas fa-cloud',
      title: 'Secure Cloud Protection',
      description: 'Comprehensive security configurations for AWS, Azure, and complex hybrid clouds.',
      link: '/services#cloud-protection'
    },
    {
      icon: 'fas fa-file-contract',
      title: 'Compliance Reporting',
      description: 'Ensuring operational compliance across ISO 27001, GDPR, SOC 2, and security metrics.',
      link: '/services#compliance'
    },
    {
      icon: 'fas fa-clipboard-check',
      title: 'Full Security Audits',
      description: 'Expert structural assessments and custom risk consulting for modern architecture.',
      link: '/services#audits'
    },
    {
      icon: 'fas fa-lock',
      title: 'Data Encryption',
      description: 'Advanced localized encryption workflows safeguarding data states at rest and transit.',
      link: '/services'
    }
  ]

  return (
    <section id="services-summary" className="py-5 py-lg-5 bg-light-gray">
      <div className="container">
        <h2 className="text-center mb-5 section-title animate-fade-in">Our Core Cybersecurity Services</h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className={`col-md-6 col-lg-4 animate-fade-in delay-${index + 1}`}>
              <div className="service-card">
                <div className="icon-wrapper">
                  <i className={`${service.icon} fa-2x`}></i>
                </div>
                <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                <p className="text-muted small">{service.description}</p>
                <a href={service.link} className="text-primary fw-medium small">
                  Learn More <i className="fas fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 animate-fade-in delay-7">
          <a href="/services" className="btn btn-lg btn-outline-primary btn-animated" role="button">
            View All Services
          </a>
        </div>
      </div>
    </section>
  )
}
