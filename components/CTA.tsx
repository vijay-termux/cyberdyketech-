import Link from 'next/link'

export default function CTA() {
  return (
    <section id="cta" className="py-5 text-white">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 lg:mb-0">
            <h2 className="mb-3">Ready to Strengthen Your Cybersecurity?</h2>
            <p className="text-lg opacity-90 mb-0">
              Get a comprehensive security assessment from our veteran-led team of cybersecurity experts. Let&apos;s protect your enterprise today.
            </p>
          </div>
          <div className="col-lg-6 text-lg-end">
            <Link 
              href="/contact" 
              className="btn btn-lg bg-white text-primary fw-bold hover:bg-gray-100 transition"
            >
              Schedule Your Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
