import React, { useState, useEffect } from 'react';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      text: "CyberDyke Tech transformed our security posture. Their AI-driven approach caught threats we didn't even know existed.",
      author: 'Sarah Johnson',
      role: 'CTO, FinTech Solutions',
      rating: 5
    },
    {
      text: "The 24/7 support team is exceptional. They responded to our security incident within minutes and resolved it perfectly.",
      author: 'Michael Chen',
      role: 'Security Director, Enterprise Corp',
      rating: 5
    },
    {
      text: "Best investment in security we've made. The ROI is clear - fewer breaches, better compliance, complete peace of mind.",
      author: 'Emma Williams',
      role: 'CEO, Tech Startup Inc',
      rating: 5
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2>What Our Clients Say</h2>
          <p>Trusted by industry leaders worldwide</p>
        </div>

        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
            >
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.author}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
