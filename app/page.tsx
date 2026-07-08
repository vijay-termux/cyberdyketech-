export default function Home() {
  return (
    <main className="w-full">
      <div className="bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-[70px] flex items-center px-8">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">CYBERDYKE TECH</div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="/career" className="text-gray-700 hover:text-blue-600">Career</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-[120px] pb-20 px-8 bg-gradient-to-r from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  AI-Powered Cybersecurity Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Protect your business with advanced AI-driven threat detection, vulnerability scanning, and enterprise-grade security consulting.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                    Get Started
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-6xl">🔐</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Threat Detection", icon: "🎯", desc: "AI-powered threat identification and analysis" },
                { title: "Cloud Security", icon: "☁️", desc: "Secure your cloud infrastructure" },
                { title: "Compliance Audits", icon: "✓", desc: "ISO 27001 & GDPR compliance" },
              ].map((service, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2024 CYBERDYKE TECH. All rights reserved.</p>
            <p className="text-gray-400 mt-2">Hyderabad, India</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
