import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold text-white mb-3">CYBERDYKE TECH</h5>
            <p className="footer-description">
              Veteran-led innovation in AI-powered cybersecurity solutions for enterprise security.
            </p>
            <div className="social-links mt-3">
              <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
          
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold text-white mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/careers" className="footer-link">Careers</a></li>
              <li><a href="/blog" className="footer-link">Blog</a></li>
            </ul>
          </div>
          
          <div className="col-md-2 mb-4 mb-md-0">
            <h6 className="fw-bold text-white mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><a href="/services#scanner" className="footer-link">Vulnerability Scanner</a></li>
              <li><a href="/services#monitoring" className="footer-link">Threat Monitoring</a></li>
              <li><a href="/services#cloud" className="footer-link">Cloud Security</a></li>
              <li><a href="/services#compliance" className="footer-link">Compliance</a></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h6 className="fw-bold text-white mb-3">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>
                <span>Hyderabad, India</span>
              </li>
              <li className="mb-2">
                <i className="fas fa-phone text-primary me-2"></i>
                <a href="tel:+919391856552" className="footer-link">+91 9391 856552</a>
              </li>
              <li>
                <i className="fas fa-envelope text-primary me-2"></i>
                <a href="mailto:info@cyberdyketech.com" className="footer-link">info@cyberdyketech.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom border-top pt-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-muted-light">© 2024 Cyberdyke Tech. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="list-unstyled footer-links-bottom">
                <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/terms" className="footer-link">Terms of Service</a></li>
                <li><a href="/cookies" className="footer-link">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
