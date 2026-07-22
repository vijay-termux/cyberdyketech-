import HexagonCanvas from './HexagonCanvas'

export default function Hero() {
  return (
    <section id="hero-animation" className="modern-animated-hero-section">
      <HexagonCanvas />
      <div className="hero-text-overlay">
        <h1 id="scrambled-title-element" className="text-white">
          CYBERDYKE TECH
        </h1>
        <p className="mb-0">Veteran-led innovation in AI cyber defense</p>
      </div>
    </section>
  )
}
