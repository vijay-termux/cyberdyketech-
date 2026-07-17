import './ClientSlider.css'

export default function ClientSlider() {
  const clients = [
    { name: 'Client 1' },
    { name: 'Client 2' },
    { name: 'Client 3' },
    { name: 'Client 4' },
    { name: 'Client 5' },
    { name: 'Client 6' },
    { name: 'Client 1' },
    { name: 'Client 2' },
  ]

  return (
    <section className="cyber-client-section">
      <div className="container">
        <div className="cyber-header">
          <p className="cyber-title">OUR CLIENTS</p>
          <div className="accent-line"></div>
        </div>
        <div className="client-slider">
          <div className="client-track">
            {clients.map((client, index) => (
              <div key={index} className="client-item">
                <span className="client-name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
