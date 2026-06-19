import React from 'react';

const Impact = () => {
  return (
    <section id="impact" className="section impact-section">
      <div className="impact-overlay"></div>
      <div className="container">
        <div className="section-header fade-up light">
          <div className="section-label light">Business Impact</div>
          <h2 className="section-title light">Decades of <em>Proven Impact</em></h2>
          <p className="section-desc light">Numbers that reflect our commitment, capability, and the trust our clients place in us.</p>
        </div>
        <div className="counters-grid fade-up delay-1">
          <div className="counter-card">
            <div className="counter-icon">📅</div>
            <div className="counter-num"><span className="counter" data-target="60" data-suffix="+">0</span></div>
            <div className="counter-label">Years of Legacy</div>
            <div className="counter-sub">Since 1950</div>
          </div>
          <div className="counter-card">
            <div className="counter-icon">🌐</div>
            <div className="counter-num"><span className="counter" data-target="5" data-suffix="+">0</span></div>
            <div className="counter-label">Countries</div>
            <div className="counter-sub">India, USA, Canada, S. Korea, Japan</div>
          </div>
          <div className="counter-card">
            <div className="counter-icon">📁</div>
            <div className="counter-num"><span className="counter" data-target="11" data-suffix="+">0</span></div>
            <div className="counter-label">Business Divisions</div>
            <div className="counter-sub">Diversified Portfolio</div>
          </div>
          <div className="counter-card">
            <div className="counter-icon">👥</div>
            <div className="counter-num"><span className="counter" data-target="1000" data-suffix="+">0</span></div>
            <div className="counter-label">Employees</div>
            <div className="counter-sub">Dedicated Professionals</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
