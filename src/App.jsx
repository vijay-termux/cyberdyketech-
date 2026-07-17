import './App.css'

function App() {
  return (
    <div style={{background: '#000', color: '#e0e0e0'}}>
      {/* Navigation */}
      <nav style={{height: '70px', background: 'rgba(0, 0, 0, 0.95)', position: 'fixed', width: '100%', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(0, 212, 255, 0.2)', display: 'flex', alignItems: 'center'}}>
        <div style={{maxWidth: '1200px', width: '100%', padding: '0 20px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold'}}>
          <span>🛡️ CyberDyke Tech</span>
          <div style={{display: 'flex', gap: '30px', fontSize: '1rem'}}>
            <a href="#services" style={{color: '#00d4ff', textDecoration: 'none', cursor: 'pointer'}}>Services</a>
            <a href="#about" style={{color: '#a0a0a0', textDecoration: 'none', cursor: 'pointer'}}>About</a>
            <a href="#pricing" style={{color: '#a0a0a0', textDecoration: 'none', cursor: 'pointer'}}>Pricing</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{height: '400px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.9) 0%, rgba(30, 20, 50, 0.9) 100%)', marginTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white'}}>
        <div>
          <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 10px 0'}}>CyberDyke Tech</h1>
          <p style={{fontSize: '1.3rem', color: '#e0e0e0'}}>Cybersecurity & Technology Services</p>
          <div style={{marginTop: '30px'}}>
            <button style={{background: '#0061ff', color: 'white', border: 'none', padding: '12px 30px', fontSize: '1rem', borderRadius: '8px', marginRight: '15px', cursor: 'pointer'}}>Get Started</button>
            <button style={{background: 'transparent', color: 'white', border: '2px solid #666', padding: '12px 30px', fontSize: '1rem', borderRadius: '8px', cursor: 'pointer'}}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.8) 0%, rgba(30, 20, 50, 0.8) 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '60px'}}>Our Services</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px'}}>
            {[
              {icon: '🔒', title: 'Vulnerability Assessment', desc: 'Comprehensive scanning of your systems'},
              {icon: '🎯', title: 'Penetration Testing', desc: 'Simulate real-world attacks'},
              {icon: '📊', title: 'Risk Management', desc: 'Strategic security planning'},
              {icon: '☁️', title: 'Cloud Security', desc: 'Secure cloud infrastructure'},
              {icon: '📋', title: 'Compliance Audits', desc: 'ISO 27001, GDPR, SOC 2'},
              {icon: '🚨', title: 'Incident Response', desc: '24/7 threat monitoring'}
            ].map((service, i) => (
              <div key={i} style={{padding: '30px', background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '12px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)'}>
                <div style={{fontSize: '3rem', marginBottom: '20px'}}>{service.icon}</div>
                <h3 style={{fontSize: '1.3rem', marginBottom: '12px', color: '#fff'}}>{service.title}</h3>
                <p style={{fontSize: '1rem', color: '#a0a0a0', margin: 0}}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.5) 0%, rgba(20, 15, 40, 0.5) 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '60px'}}>Key Features</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            {[
              {icon: '🧠', title: 'AI-Powered Detection', desc: 'Machine learning algorithms that evolve with threats'},
              {icon: '24', title: '24/7 Monitoring', desc: 'Round-the-clock threat detection and response'},
              {icon: '📊', title: 'Real-Time Analytics', desc: 'Actionable insights from live security data'},
              {icon: '🔒', title: 'Enterprise Security', desc: 'Bank-level encryption and compliance standards'},
              {icon: '👥', title: 'Expert Support', desc: 'Dedicated security experts at your service'},
              {icon: '🌐', title: 'Global Coverage', desc: 'Protection across multiple geographic regions'}
            ].map((feature, i) => (
              <div key={i} style={{padding: '30px', background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '12px', textAlign: 'center', color: '#e0e0e0', transition: 'all 0.3s ease'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '20px'}}>{feature.icon}</div>
                <h3 style={{fontSize: '1.3rem', marginBottom: '12px', color: '#fff'}}>{feature.title}</h3>
                <p style={{fontSize: '1rem', color: '#a0a0a0', margin: 0}}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.6) 0%, rgba(20, 15, 40, 0.6) 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '60px'}}>Why Choose Us</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'center'}}>
            {[{num: '500+', label: 'Successful Projects'}, {num: '10+', label: 'Years Experience'}, {num: '100+', label: 'Enterprise Clients'}, {num: '24/7', label: 'Support Available'}].map((stat, i) => (
              <div key={i} style={{padding: '30px', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '10px'}}>
                <h3 style={{fontSize: '2.5rem', color: '#00d4ff', margin: '0 0 10px 0'}}>{stat.num}</h3>
                <p style={{margin: 0, color: '#a0a0a0'}}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.8) 0%, rgba(30, 20, 50, 0.8) 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '60px'}}>About CYBERDYKE TECH</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div style={{color: '#e0e0e0'}}>
              <h3 style={{fontSize: '2rem', marginBottom: '20px', color: '#fff'}}>Protecting Your Digital Future</h3>
              <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '25px', color: '#c0c0c0'}}>
                With over a decade of experience in cybersecurity and enterprise IT, our team drives AI-powered innovations to protect businesses worldwide.
              </p>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '40px'}}>
                {[{num: '500+', label: 'Clients Protected'}, {num: '10+', label: 'Years Experience'}, {num: '24/7', label: 'Support Available'}].map((stat, i) => (
                  <div key={i} style={{textAlign: 'center', padding: '20px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '10px', border: '1px solid rgba(0, 212, 255, 0.2)'}}>
                    <h4 style={{fontSize: '2.5rem', color: '#00d4ff', margin: '0 0 10px 0'}}>{stat.num}</h4>
                    <p style={{margin: 0, color: '#a0a0a0', fontSize: '1rem'}}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1))', border: '2px solid rgba(0, 212, 255, 0.3)', borderRadius: '15px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: '#00d4ff', opacity: 0.7}}>
              🛡️
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(10, 10, 30, 0.5) 0%, rgba(20, 15, 40, 0.5) 100%)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h2 style={{fontSize: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '60px'}}>Transparent Pricing</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            {[
              {name: 'Starter', price: '$499', features: ['Up to 5 systems', 'Daily threat scans', 'Email support', 'Basic reports']},
              {name: 'Professional', price: '$1,499', features: ['Unlimited systems', 'Real-time monitoring', 'Priority 24/7 support', 'Advanced analytics'], highlighted: true},
              {name: 'Enterprise', price: 'Custom', features: ['Everything in Professional', 'White-label solution', 'Custom SLAs', 'On-premises option']}
            ].map((plan, i) => (
              <div key={i} style={{padding: '40px 30px', background: plan.highlighted ? 'rgba(0, 212, 255, 0.15)' : 'rgba(0, 212, 255, 0.05)', border: '1px solid ' + (plan.highlighted ? '#00d4ff' : 'rgba(0, 212, 255, 0.2)'), borderRadius: '12px', color: '#e0e0e0', transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)', boxShadow: plan.highlighted ? '0 0 30px rgba(0, 212, 255, 0.3)' : 'none'}}>
                <h3 style={{fontSize: '1.5rem', marginBottom: '15px', color: '#fff'}}>{plan.name}</h3>
                <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#00d4ff', marginBottom: '10px'}}>{plan.price}</div>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '40px'}}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={{padding: '12px 0', borderBottom: '1px solid rgba(0, 212, 255, 0.1)', color: '#c0c0c0'}}>
                      ✓ {feat}
                    </li>
                  ))}
                </ul>
                <button style={{width: '100%', padding: '12px 30px', background: plan.highlighted ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' : 'transparent', color: plan.highlighted ? '#000' : '#00d4ff', border: plan.highlighted ? 'none' : '2px solid #00d4ff', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer'}}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: '80px 20px', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1))', textAlign: 'center'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', color: '#e0e0e0'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '20px', color: '#fff'}}>Ready to Secure Your Business?</h2>
          <p style={{fontSize: '1.1rem', marginBottom: '40px'}}>Get started with CyberDyke Tech today and protect your digital assets with AI-powered security solutions.</p>
          <button style={{background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', color: '#000', border: 'none', padding: '15px 40px', fontSize: '1.1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{padding: '60px 20px', background: '#000', color: '#a0a0a0', textAlign: 'center', borderTop: '1px solid rgba(0, 212, 255, 0.2)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <h3 style={{color: '#fff', marginBottom: '20px'}}>CyberDyke Tech</h3>
          <p>Advanced Cybersecurity Solutions for the Digital Age</p>
          <div style={{marginTop: '30px', paddingTop: '30px', borderTop: '1px solid rgba(0, 212, 255, 0.2)'}}>
            <p>&copy; 2024 CyberDyke Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
