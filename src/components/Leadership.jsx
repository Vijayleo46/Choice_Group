import React from 'react';

const Leadership = () => {
  return (
    <section id="leadership" className="section leadership-section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Strategic Direction</div>
          <h2 className="section-title">Visionary <em>Leadership</em></h2>
          <p className="section-desc">The Choice Group is guided by a leadership philosophy that balances bold ambition with prudent governance and deep social responsibility.</p>
        </div>
        <div className="leadership-grid">
          <div className="leadership-card fade-up delay-1" id="lc-cmd">
            <div className="lc-icon">👤</div>
            <h3>CMD — Mr. Jose Thomas</h3>
            <p>"Starting at 17, I built the Choice Group from a small seafood company into a diversified conglomerate. It is not profit alone that propels me — I derive inspiration from human concern, sharing, and belief in truth. Our ultimate objective is to position the company as a world leader in the food processing industry."</p>
          </div>
          <div className="leadership-card fade-up delay-2" id="lc-vision">
            <div className="lc-icon">🔭</div>
            <h3>Corporate Vision</h3>
            <p>To be a world leader in the food processing industry and a globally respected, diversified conglomerate — a benchmark for quality management and dedicated human resources.</p>
          </div>
          <div className="leadership-card fade-up delay-3" id="lc-mission">
            <div className="lc-icon">🎯</div>
            <h3>Corporate Mission</h3>
            <p>To deliver uncompromising quality, empower employees and communities, and nurture the next generation through education — guided by integrity, human concern, and a commitment to excellence.</p>
          </div>
          <div className="leadership-card fade-up delay-4" id="lc-foundation">
            <div className="lc-icon">❤️</div>
            <h3>Choice Foundation</h3>
            <p>Registered under the Charities Act, the foundation runs The Choice School with 2000+ students and 180 staff — providing quality education, free education for deserving students, and empowering children to excel.</p>
          </div>
        </div>
        <div className="values-section fade-up">
          <div className="values-header">
            <h3>Our <em>Core Values</em></h3>
          </div>
          <div className="values-row">
            <div className="value-pill"><span className="vp-icon">⚖️</span>Integrity</div>
            <div className="value-pill"><span className="vp-icon">💡</span>Innovation</div>
            <div className="value-pill"><span className="vp-icon">🏅</span>Excellence</div>
            <div className="value-pill"><span className="vp-icon">🤝</span>Trust</div>
            <div className="value-pill"><span className="vp-icon">🌱</span>Sustainability</div>
            <div className="value-pill"><span className="vp-icon">❤️</span>Customer Commitment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
