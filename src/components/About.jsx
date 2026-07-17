import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-header">
          <h2>About Us</h2>
          <p>Leading Cybersecurity Innovation</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Protecting Your Digital Future</h3>
            <p>
              With over a decade of experience in cybersecurity and enterprise IT, our team drives AI-powered innovations 
              to protect businesses worldwide. We combine cutting-edge technology with deep industry expertise to deliver 
              solutions that matter.
            </p>
            <p>
              Our mission is to make advanced cybersecurity accessible to organizations of all sizes, from startups to 
              Fortune 500 companies. We believe security shouldn't be complex—it should be intelligent, proactive, and 
              tailored to your unique needs.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h4>500+</h4>
                <p>Clients Protected</p>
              </div>
              <div className="stat-item">
                <h4>10+</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h4>24/7</h4>
                <p>Support Available</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <i className="fas fa-shield-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
