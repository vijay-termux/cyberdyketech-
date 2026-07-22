import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <Link href="/" className="footer-logo-link d-flex align-items-center mb-3">
              <img src="/image.png" alt="Cyberdyke Tech Logo" className="footer-logo" />
            </Link>
            <p className="text-muted small mb-0">
              Veteran-led innovation in AI cyber defense. Protecting enterprises globally with cutting-edge cybersecurity solutions.
            </p>
          </div>
          
          <div className="col-md-2">
            <h5 className="text-white fw-bold mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/about" className="footer-link">About Us</Link></li>
              <li className="mb-2"><Link href="/services" className="footer-link">Services</Link></li>
              <li className="mb-2"><Link href="/webinar" className="footer-link">Webinars</Link></li>
              <li className="mb-2"><Link href="/career" className="footer-link">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-md-2">
            <h5 className="text-white fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/services" className="footer-link">Security Audits</Link></li>
              <li className="mb-2"><Link href="/services" className="footer-link">Cloud Security</Link></li>
              <li className="mb-2"><Link href="/services" className="footer-link">Compliance</Link></li>
              <li className="mb-2"><Link href="/contact" className="footer-link">Support</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="text-white fw-bold mb-3">Connect With Us</h5>
            <div className="social-links d-flex align-items-center mb-3">
              <a href="https://www.linkedin.com/company/cyberdyketech" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/cyberdyketech" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:info@cyberdyketech.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <p className="text-muted small mb-0">
              <i className="fas fa-phone me-2"></i>
              <a href="tel:+919391856552" className="footer-link">+91 9391856552</a>
            </p>
            <p className="text-muted small">
              <i className="fas fa-map-marker-alt me-2"></i>
              Hyderabad, Telangana, India
            </p>
          </div>
        </div>
        
        <hr className="border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted small mb-0">&copy; 2024 CYBERDYKE TECH. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-unstyled d-flex justify-content-md-end gap-3 mb-0">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/privacy" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
