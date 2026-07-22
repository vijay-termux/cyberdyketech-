import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Webinars | CYBERDYKE TECH - AI Cybersecurity Education',
  description: 'Join expert-led webinars on AI cybersecurity, threat detection, compliance, and modern defense strategies.',
}

export default function Webinar() {
  const upcomingWebinars = [
    {
      id: 1,
      title: 'AI-Powered Threat Detection: The Future of Cybersecurity',
      date: 'August 15, 2024',
      time: '2:00 PM IST',
      duration: '1 hour',
      speaker: 'Dr. Cybersecurity Expert',
      description: 'Explore how machine learning is revolutionizing threat detection and response strategies.',
      delay: 'delay-1',
    },
    {
      id: 2,
      title: 'Cloud Security Essentials: AWS, Azure & GCP',
      date: 'August 22, 2024',
      time: '3:00 PM IST',
      duration: '1.5 hours',
      speaker: 'Cloud Security Specialist',
      description: 'Master cloud security best practices across major cloud providers.',
      delay: 'delay-2',
    },
    {
      id: 3,
      title: 'GDPR & Compliance Auditing in 2024',
      date: 'August 29, 2024',
      time: '2:30 PM IST',
      duration: '1 hour',
      speaker: 'Compliance Officer',
      description: 'Navigate the evolving landscape of data protection and regulatory compliance.',
      delay: 'delay-3',
    },
  ]

  const pastWebinars = [
    {
      id: 1,
      title: 'Zero Trust Architecture Implementation',
      date: 'July 20, 2024',
      speaker: 'Security Architect',
      views: '1.2K',
    },
    {
      id: 2,
      title: 'Ransomware Defense Strategies',
      date: 'July 13, 2024',
      speaker: 'Incident Response Lead',
      views: '890',
    },
    {
      id: 3,
      title: 'Security Auditing Fundamentals',
      date: 'July 6, 2024',
      speaker: 'Security Auditor',
      views: '650',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-5">
          <div className="container">
            <h1 className="section-title mb-5 text-center animate-fade-in">Educational Webinars</h1>
            <p className="text-center text-muted mb-5 lead animate-fade-in delay-1">
              Join our expert-led webinars to stay ahead in cybersecurity
            </p>

            {/* Upcoming Webinars */}
            <div className="mb-5">
              <h2 className="h4 fw-bold mb-4 animate-fade-in delay-2">Upcoming Webinars</h2>
              <div className="row g-4">
                {upcomingWebinars.map((webinar) => (
                  <div key={webinar.id} className={`col-md-6 col-lg-4 animate-fade-in ${webinar.delay}`}>
                    <div className="card h-100 border-0 shadow-sm hover:shadow-md transition rounded-3">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-2 me-3">
                            <i className="fas fa-calendar-alt text-primary"></i>
                          </div>
                          <div>
                            <p className="mb-0 small text-muted">{webinar.date}</p>
                            <p className="mb-0 small fw-bold">{webinar.time}</p>
                          </div>
                        </div>
                        
                        <h3 className="h6 fw-bold mb-2">{webinar.title}</h3>
                        <p className="small text-muted mb-3">{webinar.description}</p>
                        
                        <div className="d-flex justify-content-between align-items-center small mb-3">
                          <span className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            {webinar.speaker}
                          </span>
                          <span className="badge bg-primary">{webinar.duration}</span>
                        </div>
                        
                        <Link href="/contact" className="btn btn-sm btn-outline-primary w-100 rounded-2">
                          Register Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Webinars */}
            <div className="mt-5 pt-5 border-top">
              <h2 className="h4 fw-bold mb-4 animate-fade-in delay-3">Past Webinars (On Demand)</h2>
              <div className="row g-3">
                {pastWebinars.map((webinar) => (
                  <div key={webinar.id} className="col-12 animate-fade-in">
                    <div className="d-flex align-items-center justify-content-between p-4 bg-light-gray rounded-2 hover:bg-gray-300 transition">
                      <div>
                        <h3 className="h6 fw-bold mb-1">{webinar.title}</h3>
                        <p className="small text-muted mb-0">
                          <i className="fas fa-calendar-alt me-2"></i>
                          {webinar.date} • {webinar.speaker}
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="small text-muted mb-2">{webinar.views} views</p>
                        <a href="#" className="btn btn-sm btn-primary rounded-2">Watch</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-5 pt-5">
              <div className="bg-primary text-white p-5 rounded-3 text-center animate-fade-in delay-4">
                <h2 className="h4 fw-bold mb-3">Stay Updated</h2>
                <p className="mb-4">Subscribe to our newsletter to get notified about upcoming webinars</p>
                <form className="d-flex gap-2 max-w-sm mx-auto">
                  <input 
                    type="email" 
                    className="form-control rounded-2" 
                    placeholder="Enter your email" 
                    required 
                  />
                  <button type="submit" className="btn btn-light fw-bold rounded-2">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
