import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Web Development | CYBERDYKE TECH - Secure & Modern Solutions',
  description: 'Custom web development services with security-first approach. React, Next.js, Node.js, and enterprise solutions.',
}

export default function WebDevelopment() {
  const services = [
    {
      id: 1,
      icon: 'fa-code',
      title: 'Custom Web Applications',
      description: 'Tailored web applications built with modern frameworks and security best practices.',
      delay: 'delay-1',
    },
    {
      id: 2,
      icon: 'fa-shield-alt',
      title: 'Secure Architecture',
      description: 'Enterprise-grade security integrated into every layer of development.',
      delay: 'delay-2',
    },
    {
      id: 3,
      icon: 'fa-rocket',
      title: 'Performance Optimization',
      description: 'High-performance applications optimized for speed and scalability.',
      delay: 'delay-3',
    },
    {
      id: 4,
      icon: 'fa-cloud',
      title: 'Cloud Solutions',
      description: 'Deployment and optimization on AWS, Azure, and Google Cloud.',
      delay: 'delay-4',
    },
    {
      id: 5,
      icon: 'fa-mobile-alt',
      title: 'Responsive Design',
      description: 'Mobile-first, accessible designs that work across all devices.',
      delay: 'delay-5',
    },
    {
      id: 6,
      icon: 'fa-cogs',
      title: 'DevOps & CI/CD',
      description: 'Automated deployment pipelines and continuous integration strategies.',
      delay: 'delay-6',
    },
  ]

  const techStack = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Next.js', icon: 'fas fa-cube' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'TypeScript', icon: 'fas fa-code' },
    { name: 'PostgreSQL', icon: 'fas fa-database' },
    { name: 'Docker', icon: 'fab fa-docker' },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-5">
          <div className="container">
            <h1 className="section-title mb-5 text-center animate-fade-in">Web Development Services</h1>
            <p className="text-center text-muted mb-5 lead animate-fade-in delay-1">
              Modern, secure, and scalable web solutions for your business
            </p>

            {/* Services Grid */}
            <div className="row g-4 mb-5">
              {services.map((service) => (
                <div key={service.id} className={`col-md-6 col-lg-4 animate-fade-in ${service.delay}`}>
                  <div className="service-card p-4 shadow-sm rounded-3 bg-white h-100">
                    <div className="icon-wrapper mb-3">
                      <i className={`fas ${service.icon} fa-2x`}></i>
                    </div>
                    <h3 className="h5 fw-bold mb-2">{service.title}</h3>
                    <p className="text-muted small">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-5 pt-5 border-top">
              <h2 className="h4 fw-bold mb-4 text-center animate-fade-in delay-2">Our Technology Stack</h2>
              <div className="row g-3 justify-content-center">
                {techStack.map((tech, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-3 animate-fade-in">
                    <div className="text-center p-3 bg-light-gray rounded-2">
                      <i className={`${tech.icon} fa-2x text-primary mb-2 d-block`}></i>
                      <p className="fw-medium mb-0">{tech.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mt-5 pt-5 border-top">
              <h2 className="h4 fw-bold mb-4 text-center animate-fade-in delay-3">Our Development Process</h2>
              <div className="row g-4">
                <div className="col-md-3 text-center animate-fade-in delay-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="h4 fw-bold mb-0">1</span>
                  </div>
                  <h3 className="h6 fw-bold mb-2">Discovery & Planning</h3>
                  <p className="small text-muted">Understanding your requirements and goals</p>
                </div>
                <div className="col-md-3 text-center animate-fade-in delay-4">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="h4 fw-bold mb-0">2</span>
                  </div>
                  <h3 className="h6 fw-bold mb-2">Design & Architecture</h3>
                  <p className="small text-muted">Creating scalable, secure blueprints</p>
                </div>
                <div className="col-md-3 text-center animate-fade-in delay-5">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="h4 fw-bold mb-0">3</span>
                  </div>
                  <h3 className="h6 fw-bold mb-2">Development & Testing</h3>
                  <p className="small text-muted">Building and rigorous quality assurance</p>
                </div>
                <div className="col-md-3 text-center animate-fade-in delay-6">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <span className="h4 fw-bold mb-0">4</span>
                  </div>
                  <h3 className="h6 fw-bold mb-2">Deployment & Support</h3>
                  <p className="small text-muted">Launch and ongoing maintenance</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5 pt-5 text-center">
              <Link href="/contact" className="btn btn-lg btn-primary text-white animate-fade-in delay-7">
                Start Your Project Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
