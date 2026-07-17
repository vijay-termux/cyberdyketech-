import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TrustBadges from './components/TrustBadges'
import ClientSlider from './components/ClientSlider'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <TrustBadges />
      <ClientSlider />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
