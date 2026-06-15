import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual fade-left">
            <div className="about-img-frame">
              <div className="about-img-inner">
                <div className="about-decorative-card glass-card">
                  <div className="adc-icon">🏛️</div>
                  <div className="adc-text">
                    <strong>Heritage</strong>
                    <span>Cochin, Kerala — Since 1953</span>
                  </div>
                </div>
                <div className="about-timeline">
                  <div className="atl-item">
                    <span className="atl-year">1953</span>
                    <span className="atl-event">Founded by O.C. Thomas – Choice Canning Co.</span>
                  </div>
                  <div className="atl-item">
                    <span className="atl-year">1962</span>
                    <span className="atl-event">Established in Cochin</span>
                  </div>
                  <div className="atl-item">
                    <span className="atl-year">1970s</span>
                    <span className="atl-event">Adopted freezing technology</span>
                  </div>
                  <div className="atl-item">
                    <span className="atl-year">1990</span>
                    <span className="atl-event">Added processing plant – value addition</span>
                  </div>
                  <div className="atl-item">
                    <span className="atl-year">2000s</span>
                    <span className="atl-event">Global footprint expansion</span>
                  </div>
                  <div className="atl-item">
                    <span className="atl-year">Today</span>
                    <span className="atl-event">World‑Class Conglomerate</span>
                  </div>
                </div>
              </div>
              <div className="about-float-badge">
                <span className="afb-num">70+</span>
                <span className="afb-text">Years<br />Legacy</span>
              </div>
            </div>
          </div>
          <div className="about-text fade-right">
            <div className="section-label">Our Story</div>
            <h2 className="section-title">A Legacy of <em>Excellence</em></h2>
            <p className="about-lead">Established in 1953 by Mr. O.C. Thomas as Choice Canning Company, the Group has grown from modest beginnings into one of South India's largest and most diversified conglomerates.</p>
            <p className="about-body">Headquartered in Cochin with branches across all major trading centers in South India, and international presence in the <strong>United States, Canada, South Korea, Singapore &amp; Japan</strong>, the Choice Group is serviced by over 1000 employees. Under the dynamic leadership of CMD <strong>Mr. Jose Thomas</strong>, the group has recorded impressive growth — registering a turnover of over <strong>₹600 Crores</strong> with marine exports as the flagship business.</p>
            <p className="about-body">The multi-activity profile spans Marine Exports, Shipping, Trading, Real Estate, Prepared Frozen Meals, IT, Entertainment (JTPAC), and Education (Choice School) — driven by a spirit of innovation and an uncompromising commitment to quality.</p>
            <div className="about-pillars">
              <div className="pillar"><span className="pillar-icon">⚡</span><span>Innovation</span></div>
              <div className="pillar"><span className="pillar-icon">🤝</span><span>Integrity</span></div>
              <div className="pillar"><span className="pillar-icon">🌍</span><span>Global Reach</span></div>
              <div className="pillar"><span className="pillar-icon">📈</span><span>Growth</span></div>
            </div>
            <a href="#expertise" className="btn btn-primary mt-1">
              <span>Discover Our Expertise</span>
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
