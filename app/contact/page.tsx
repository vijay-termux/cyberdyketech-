import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Contact CYBERDYKE TECH | AI Cybersecurity Solutions',
  description: 'Get in touch with CYBERDYKE TECH for cybersecurity audits, consulting, and AI-powered defense solutions.',
}

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-5">
          <div className="container">
            <h1 className="section-title mb-5 text-center animate-fade-in">Contact Us</h1>
            
            <div className="row g-5">
              <div className="col-lg-6 animate-fade-in delay-1">
                <h2 className="h4 fw-bold mb-4">Get in Touch</h2>
                <form className="contact-form">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control border border-gray-300 rounded-2" id="name" placeholder="Your name" required />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control border border-gray-300 rounded-2" id="email" placeholder="your@email.com" required />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">Company Name</label>
                    <input type="text" className="form-control border border-gray-300 rounded-2" id="company" placeholder="Your company" required />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control border border-gray-300 rounded-2" id="subject" placeholder="How can we help?" required />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control border border-gray-300 rounded-2" id="message" rows={5} placeholder="Tell us more about your needs..." required></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-lg btn-primary text-white">Send Message</button>
                </form>
              </div>
              
              <div className="col-lg-6 animate-fade-in delay-2">
                <div className="bg-light-gray p-5 rounded-3 h-100">
                  <h2 className="h4 fw-bold mb-4">Contact Information</h2>
                  
                  <div className="mb-4">
                    <h3 className="h6 text-primary fw-bold mb-2">
                      <i className="fas fa-phone me-2"></i>Phone
                    </h3>
                    <p className="mb-0">
                      <a href="tel:+919391856552" className="text-dark text-decoration-none">+91 9391856552</a>
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="h6 text-primary fw-bold mb-2">
                      <i className="fas fa-envelope me-2"></i>Email
                    </h3>
                    <p className="mb-0">
                      <a href="mailto:info@cyberdyketech.com" className="text-dark text-decoration-none">info@cyberdyketech.com</a>
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="h6 text-primary fw-bold mb-2">
                      <i className="fas fa-map-marker-alt me-2"></i>Location
                    </h3>
                    <p className="mb-0">Hi-Tech City, Hyderabad</p>
                    <p className="mb-0">Telangana, India</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="h6 text-primary fw-bold mb-2">
                      <i className="fas fa-clock me-2"></i>Business Hours
                    </h3>
                    <p className="mb-0">24/7 Support Available</p>
                  </div>
                  
                  <div className="mt-5 pt-4 border-top">
                    <h3 className="h6 text-primary fw-bold mb-3">Follow Us</h3>
                    <div className="social-links d-flex gap-3">
                      <a href="https://www.linkedin.com/company/cyberdyketech" target="_blank" rel="noopener noreferrer" className="text-dark fs-5 hover:text-primary transition">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="https://twitter.com/cyberdyketech" target="_blank" rel="noopener noreferrer" className="text-dark fs-5 hover:text-primary transition">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
