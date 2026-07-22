import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About CYBERDYKE TECH | Veteran-Led Cybersecurity Innovation',
  description: 'Learn about CYBERDYKE TECH, a veteran-led cybersecurity company providing AI-powered defense solutions globally.',
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-5">
          <div className="container">
            <h1 className="section-title mb-5 animate-fade-in">About Cyberdyke Tech</h1>
            
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 animate-fade-in delay-1">
                <p className="lead fw-medium mb-3">
                  Veteran-Led Innovation in AI Cyber Defense
                </p>
                <p className="mb-3">
                  CYBERDYKE TECH is a global cybersecurity leader founded on the principles of excellence, integrity, and veteran innovation. With over a decade of experience in cybersecurity and enterprise IT, our founder drives cutting-edge AI-powered solutions to protect businesses worldwide.
                </p>
                <p className="mb-3">
                  We believe that cybersecurity should be proactive, intelligent, and accessible to organizations of all sizes. Our mission is to empower enterprises with the latest AI-driven threat detection and defense mechanisms.
                </p>
              </div>
              
              <div className="col-lg-6 animate-fade-in delay-2">
                <div className="bg-light-gray p-5 rounded-3">
                  <h3 className="fw-bold mb-4">Our Core Values</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong className="text-primary">Innovation:</strong> Leveraging AI and machine learning for next-generation security
                    </li>
                    <li className="mb-3">
                      <strong className="text-primary">Integrity:</strong> Transparent and ethical practices in all business dealings
                    </li>
                    <li className="mb-3">
                      <strong className="text-primary">Excellence:</strong> Delivering world-class cybersecurity solutions
                    </li>
                    <li className="mb-3">
                      <strong className="text-primary">Veteran Leadership:</strong> Decades of IT and security expertise
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row g-5 mt-5">
              <div className="col-md-4 text-center animate-fade-in delay-3">
                <h2 className="h3 fw-bold text-primary mb-2">10+</h2>
                <p>Years of Cybersecurity Excellence</p>
              </div>
              <div className="col-md-4 text-center animate-fade-in delay-4">
                <h2 className="h3 fw-bold text-primary mb-2">500+</h2>
                <p>Enterprises Protected Globally</p>
              </div>
              <div className="col-md-4 text-center animate-fade-in delay-5">
                <h2 className="h3 fw-bold text-primary mb-2">ISO 27001</h2>
                <p>Certified & SOC 2 Compliant</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
