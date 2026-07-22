'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavbar" aria-label="Main navigation">
      <div className="container flex justify-between items-center h-full">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img src="/image.png" alt="Cyberdyke Tech Logo" className="logo me-2" height={40} />
          <span className="fw-bold text-white">CYBERDYKE TECH</span>
        </Link>
        
        <button 
          className="navbar-toggler lg:hidden"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`navbar-collapse ${isOpen ? 'active' : ''} ${!isOpen ? 'hidden' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center flex flex-col lg:flex-row gap-4 lg:gap-0">
            <li className="nav-item">
              <Link href="/" className="nav-link text-white hover:text-blue-400 transition">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/services" className="nav-link text-white hover:text-blue-400 transition">Services</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-white hover:text-blue-400 transition">About</Link>
            </li>
            <li className="nav-item">
              <Link href="/webinar" className="nav-link text-white hover:text-blue-400 transition">Webinar</Link>
            </li>
            <li className="nav-item">
              <Link href="/web-development" className="nav-link text-white hover:text-blue-400 transition">Web Development</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-white hover:text-blue-400 transition">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
