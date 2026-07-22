import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Cybersecurity Services | CYBERDYKE TECH',
  description: 'Comprehensive cybersecurity services including AI vulnerability scanning, threat monitoring, cloud security, compliance, audits, and data encryption.',
}

export default function ServicesPage() {
  const services = [
    {
      id: 'ai-scanner',
      title: 'AI Vulnerability Scanner',
      icon: 'fa-brain',
      description: 'Machine learning-based threat detection and automated patching for robust defense.',
      features: [
        'Real-time vulnerability detection',
        'Automated patch management',
        'Neural network threat analysis',
        'Behavioral anomaly detection',
        'Predictive risk scoring',
      ],
    },
    {
      id: 'threat-monitoring',
      title: '24/7 Threat Monitoring',
      icon: 'fa-shield-alt',
      description: 'Continuous surveillance with a dedicated SOC dashboard for real-time insights.',
      features: [
        'Round-the-clock monitoring',
        'Real-time alerts and notifications',
        'Incident response coordination',
        'Threat intelligence integration',
        'Custom reporting dashboards',
      ],
    },
    {
      id: 'cloud-protection',
      title: 'Secure Cloud Protection',
      icon: 'fa-cloud',
      description: 'Comprehensive security configurations for AWS, Azure, and complex hybrid clouds.',
      features: [
        'Multi-cloud security',
        'IAM configuration and hardening',
        'Data encryption at rest and in transit',
        'Network segmentation',
        'Compliance automation',
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance Reporting',
      icon: 'fa-file-contract',
      description: 'Ensuring operational compliance across ISO 27001, GDPR, SOC 2, and security metrics.',
      features: [
        'ISO 27001 compliance',
        'GDPR compliance management',
        'SOC 2 attestations',
        'HIPAA compliance support',
        'Regular compliance audits',
      ],
    },
    {
      id: 'audits',
      title: 'Full Security Audits',
      icon: 'fa-clipboard-check',
      description: 'Expert structural assessments and custom risk consulting for modern architecture.',
      features: [
        'Comprehensive security assessments',
        'Infrastructure penetration testing',
        'Application security testing',
        'Code review and analysis',
        'Risk mitigation planning',
      ],
    },
    {
      id: 'encryption',
      title: 'Data Encryption',
      icon: 'fa-lock',
      description: 'Advanced localized encryption workflows safeguarding data states at rest and transit.',
      features: [
        'End-to-end encryption',
        'Key management systems',
        'Data classification',
        'Secure backup solutions',
        'Recovery procedures',
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-5 bg-light-gray">
          <div className="container">
            <h1 className="section-title mb-3 animate-fade-in">Our Comprehensive Cybersecurity Services</h1>
            <p className="lead text-muted animate-fade-in delay-1">
              Enterprise-grade cybersecurity solutions powered by AI and backed by decades of IT security expertise.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={service.id} className={`col-lg-6 animate-fade-in delay-${(index % 3) + 1}`}>
                  <div id={service.id} className="service-card p-4 shadow-sm rounded-3 bg-white h-100">
                    <div className="d-flex gap-3 mb-3">
                      <div className="icon-wrapper flex-shrink-0">
                        <i className={`fas ${service.icon} fa-2x`}></i>
                      </div>
                    </div>
                    <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                    <p className="text-muted small mb-3">{service.description}</p>
                    <div className="mb-3">
                      <h4 className="small fw-bold mb-2">Key Features:</h4>
                      <ul className="list-unstyled">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="small text-muted mb-1">
                            <i className="fas fa-check text-primary me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link 
                      href="/contact" 
                      className="text-primary fw-medium small hover:text-blue-700 transition inline-flex items-center gap-2"
                    >
                      Learn More <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-5 bg-light-gray">
          <div className="container">
            <h2 className="section-title mb-5 text-center animate-fade-in">Why Our Services Stand Out</h2>
            <div className="row g-4">
              <div className="col-md-4 animate-fade-in delay-1">
                <div className="p-4 bg-white rounded-3 h-100 text-center">
                  <i className="fas fa-user-tie fa-2x text-primary mb-3 d-block"></i>
                  <h4 className="h6 fw-bold mb-2">Veteran-Led Expertise</h4>
                  <p className="small text-muted mb-0">Decades of experience in enterprise cybersecurity and IT defense strategies.</p>
                </div>
              </div>
              <div className="col-md-4 animate-fade-in delay-2">
                <div className="p-4 bg-white rounded-3 h-100 text-center">
                  <i className="fas fa-brain fa-2x text-primary mb-3 d-block"></i>
                  <h4 className="h6 fw-bold mb-2">AI-Powered Detection</h4>
                  <p className="small text-muted mb-0">Advanced machine learning algorithms for threat detection and prevention.</p>
                </div>
              </div>
              <div className="col-md-4 animate-fade-in delay-3">
                <div className="p-4 bg-white rounded-3 h-100 text-center">
                  <i className="fas fa-clock fa-2x text-primary mb-3 d-block"></i>
                  <h4 className="h6 fw-bold mb-2">24/7 Support</h4>
                  <p className="small text-muted mb-0">Round-the-clock monitoring and incident response coordination.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-5 text-white">
          <div className="container text-center">
            <h2 className="mb-3 animate-fade-in delay-1">Ready to Get Started?</h2>
            <p className="lead opacity-90 mb-4 animate-fade-in delay-2">
              Schedule a consultation with our security experts today.
            </p>
            <Link 
              href="/contact" 
              className="btn btn-lg bg-white text-primary fw-bold hover:bg-gray-100 transition animate-fade-in delay-3"
            >
              Schedule Your Assessment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
