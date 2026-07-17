import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top" id="mainNavbar" aria-label="Main navigation">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/" aria-label="Cyberdyke Tech Home">
          <span className="fw-bold text-white">CYBERDYKE TECH</span>
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/webinar">Webinar</a></li>
            <li className="nav-item"><a className="nav-link" href="/Web-development">Web Development</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
