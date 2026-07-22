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
      <div style={{ paddingTop: '70px' }}>
        {/* Hero Section */}
        <section className="py-5 bg-light-gray">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">Our Comprehensive Cybersecurity Services</h1>
                <p className="text-lg text-gray-600">
                  We provide enterprise-grade cybersecurity solutions powered by AI and backed by decades of IT security expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              {services.map((service) => (
                <div key={service.id} className="col-lg-6">
                  <div id={service.id} className="service-card p-6 bg-white border rounded-lg hover:shadow-lg transition">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <i className={`fas ${service.icon} fa-3x text-blue-600`}></i>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Features:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {service.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <Link 
                          href="/contact" 
                          className="text-blue-600 font-semibold hover:text-blue-800 transition inline-flex items-center gap-2"
                        >
                          Get Started <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-5 bg-light-gray">
          <div className="container">
            <h2 className="text-3xl font-bold mb-5 text-center">Why Our Services Stand Out</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold mb-2">Veteran-Led Expertise</h4>
                  <p className="text-gray-600 text-sm">Decades of experience in enterprise cybersecurity and IT defense strategies.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold mb-2">AI-Powered Detection</h4>
                  <p className="text-gray-600 text-sm">Advanced machine learning algorithms for threat detection and prevention.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 bg-white rounded-lg">
                  <h4 className="font-bold mb-2">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Round-the-clock monitoring and incident response coordination.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 mb-4">
              Schedule a consultation with our security experts today.
            </p>
            <Link 
              href="/contact" 
              className="btn btn-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition"
            >
              Schedule Your Assessment
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
