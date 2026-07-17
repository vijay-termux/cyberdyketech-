import './CTA.css'

export default function CTA() {
  return (
    <section id="cta" className="py-5 py-lg-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="h3 fw-bold text-white mb-3">Ready to Secure Your Business?</h2>
            <p className="text-white-75">
              Join hundreds of organizations that trust Cyberdyke Tech for their cybersecurity needs.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                />
                <button className="btn btn-lg btn-light" type="button">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
