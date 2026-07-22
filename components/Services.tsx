import Link from 'next/link'

export default function Services() {
  const services = [
    {
      id: 1,
      icon: 'fa-brain',
      title: 'AI Vulnerability Scanner',
      description: 'Machine learning-based threat detection and automated patching for robust defense.',
      link: '/services#ai-scanner',
      delay: 'delay-1',
    },
    {
      id: 2,
      icon: 'fa-shield-alt',
      title: '24/7 Threat Monitoring',
      description: 'Continuous surveillance with a dedicated SOC dashboard for real-time insights.',
      link: '/services#threat-monitoring',
      delay: 'delay-2',
    },
    {
      id: 3,
      icon: 'fa-cloud',
      title: 'Secure Cloud Protection',
      description: 'Comprehensive security configurations for AWS, Azure, and complex hybrid clouds.',
      link: '/services#cloud-protection',
      delay: 'delay-3',
    },
    {
      id: 4,
      icon: 'fa-file-contract',
      title: 'Compliance Reporting',
      description: 'Ensuring operational compliance across ISO 27001, GDPR, SOC 2, and security metrics.',
      link: '/services#compliance',
      delay: 'delay-4',
    },
    {
      id: 5,
      icon: 'fa-clipboard-check',
      title: 'Full Security Audits',
      description: 'Expert structural assessments and custom risk consulting for modern architecture.',
      link: '/services#audits',
      delay: 'delay-5',
    },
    {
      id: 6,
      icon: 'fa-lock',
      title: 'Data Encryption',
      description: 'Advanced localized encryption workflows safeguarding data states at rest and transit.',
      link: '/services',
      delay: 'delay-6',
    },
  ]

  return (
    <section id="services-summary" className="py-5 bg-light-gray">
      <div className="container">
        <h2 className="text-center mb-5 section-title animate-fade-in">Our Core Cybersecurity Services</h2>
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className={`col-md-6 col-lg-4 animate-fade-in ${service.delay}`}>
              <div className="service-card p-4 shadow-sm rounded-3 bg-white h-100">
                <div className="icon-wrapper mb-3">
                  <i className={`fas ${service.icon} fa-2x`}></i>
                </div>
                <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                <p className="text-muted small">{service.description}</p>
                <Link href={service.link} className="text-primary fw-medium small hover:text-blue-700 transition inline-flex items-center gap-2">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 animate-fade-in delay-7">
          <Link href="/services" className="btn btn-lg btn-outline-primary btn-animated">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
