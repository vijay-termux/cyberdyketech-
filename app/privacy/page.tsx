import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy & Terms | CYBERDYKE TECH',
  description: 'Privacy policy and terms of service for CYBERDYKE TECH cybersecurity solutions.',
}

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-5">
          <div className="container">
            <h1 className="section-title mb-5 animate-fade-in">Privacy Policy & Terms of Service</h1>
            
            <div className="row">
              <div className="col-lg-8">
                <div className="animate-fade-in delay-1">
                  <h2 className="h4 fw-bold mb-3 mt-4">Privacy Policy</h2>
                  <p className="text-muted mb-3">
                    At CYBERDYKE TECH, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">Information We Collect</h3>
                  <p className="text-muted mb-3">
                    We collect information you provide directly (such as name, email, company details) through contact forms and service inquiries. We also automatically collect technical information about your device and browsing behavior.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">How We Use Your Information</h3>
                  <p className="text-muted mb-3">
                    We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations. We never sell your personal information to third parties.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">Security</h3>
                  <p className="text-muted mb-3">
                    We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                  </p>

                  <h2 className="h4 fw-bold mb-3 mt-5">Terms of Service</h2>
                  <p className="text-muted mb-3">
                    By accessing and using CYBERDYKE TECH&apos;s website and services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">Use License</h3>
                  <p className="text-muted mb-3">
                    Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">Disclaimer</h3>
                  <p className="text-muted mb-3">
                    The materials on CYBERDYKE TECH&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  
                  <h3 className="h5 fw-bold mb-2">Limitations</h3>
                  <p className="text-muted mb-3">
                    In no event shall CYBERDYKE TECH or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
                  </p>

                  <h2 className="h4 fw-bold mb-3 mt-5">Contact Us</h2>
                  <p className="text-muted mb-3">
                    If you have questions about this Privacy Policy or Terms of Service, please contact us at:
                  </p>
                  <p className="text-muted">
                    <strong>Email:</strong> info@cyberdyketech.com<br />
                    <strong>Phone:</strong> +91 9391856552
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-light-gray p-4 rounded-3 sticky-top" style={{ top: '90px' }}>
                  <h3 className="h6 fw-bold mb-3">Quick Links</h3>
                  <ul className="list-unstyled small">
                    <li className="mb-2"><a href="#" className="text-primary text-decoration-none">Privacy Policy</a></li>
                    <li className="mb-2"><a href="#" className="text-primary text-decoration-none">Terms of Service</a></li>
                    <li className="mb-2"><a href="/contact" className="text-primary text-decoration-none">Contact Us</a></li>
                    <li className="mb-2"><a href="/" className="text-primary text-decoration-none">Home</a></li>
                  </ul>
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
