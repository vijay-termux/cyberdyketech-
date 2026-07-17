import React, { useState, useEffect } from 'react';
import './Stats.css';

export default function Stats() {
  const [counts, setCounts] = useState({
    clients: 0,
    threats: 0,
    uptime: 0,
    team: 0
  });

  useEffect(() => {
    const targets = {
      clients: 500,
      threats: 10000,
      uptime: 99.9,
      team: 150
    };

    const interval = setInterval(() => {
      setCounts(prev => ({
        clients: Math.min(prev.clients + 25, targets.clients),
        threats: Math.min(prev.threats + 500, targets.threats),
        uptime: Math.min(prev.uptime + 0.05, targets.uptime),
        team: Math.min(prev.team + 8, targets.team)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{counts.clients}+</div>
            <div className="stat-label">Active Clients</div>
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{counts.threats.toLocaleString()}+</div>
            <div className="stat-label">Threats Blocked</div>
            <div className="stat-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{counts.uptime.toFixed(1)}%</div>
            <div className="stat-label">Uptime Guarantee</div>
            <div className="stat-icon">
              <i className="fas fa-server"></i>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{counts.team}+</div>
            <div className="stat-label">Expert Team</div>
            <div className="stat-icon">
              <i className="fas fa-users-cog"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
