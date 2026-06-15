import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Trigger CSS animations for reveal-up elements
    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach((el) => {
      // Small timeout ensures it runs after initial render
      setTimeout(() => el.classList.add('visible'), 100);
    });
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg-layer"></div>
      <div className="animated-mesh" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
        <div className="mesh-orb mesh-orb-3"></div>
      </div>
      <div className="floating-shapes" aria-hidden="true">
        <div className="floating-shape" style={{ width: '180px', height: '180px', background: 'var(--navy-500)', top: '15%', left: '8%', animationDuration: '20s' }}></div>
        <div className="floating-shape" style={{ width: '120px', height: '120px', background: 'var(--blue-400)', top: '60%', right: '12%', animationDuration: '26s', animationDelay: '-10s' }}></div>
        <div className="floating-shape" style={{ width: '80px', height: '80px', background: 'var(--gold)', bottom: '20%', left: '20%', animationDuration: '17s', animationDelay: '-5s' }}></div>
      </div>
      <canvas id="hero-canvas"></canvas>
      <div className="hero-particles" id="hero-particles"></div>
      <div className="hero-content" id="hero-content">
        <div className="hero-badge reveal-up">
          <span className="badge-dot"></span>
          Since 1953 · Cochin, Kerala, India
        </div>
        <h1 className="hero-headline reveal-up delay-1">
          The Choice Group<br /><em>Excellence Since 1953</em>
        </h1>
        <p className="hero-sub reveal-up delay-2">
          Seven Decades of Entrepreneurial Excellence &amp; Global Trade.
        </p>
        <p className="hero-desc reveal-up delay-3">
          One of South India's largest and most diversified business conglomerates — leading in Marine Exports, Shipping, Real Estate, IT, Education, and Entertainment across India, USA, Canada, South Korea &amp; Japan.
        </p>
        <div className="hero-actions reveal-up delay-4">
          <a href="#expertise" className="btn btn-primary" id="hero-explore-btn">
            <span>Explore Our Expertise</span>
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost" id="hero-contact-btn">
            <span>Contact Us</span>
          </a>
        </div>
        <div className="hero-stats reveal-up delay-5">
          <div className="hero-stat">
            <span className="hs-num">70+</span>
            <span className="hs-label">Years of Excellence</span>
          </div>
          <div className="hero-stat-div"></div>
          <div className="hero-stat">
            <span className="hs-num">5+</span>
            <span className="hs-label">Countries</span>
          </div>
          <div className="hero-stat-div"></div>
          <div className="hero-stat">
            <span className="hs-num">11+</span>
            <span className="hs-label">Divisions</span>
          </div>
          <div className="hero-stat-div"></div>
          <div className="hero-stat">
            <span className="hs-num">₹600 Cr+</span>
            <span className="hs-label">Annual Turnover</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll to explore</span>
        <div className="scroll-mouse"><span></span></div>
      </div>
    </section>
  );
};

export default Hero;
