import React from 'react';

const Expertise = () => {
  return (
    <section id="expertise" className="section expertise-section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Our <em>Expertise</em></h2>
          <p className="section-desc">Backed by over six decades of experience, The Choice Group delivers innovative solutions, strategic expertise, and industry-leading services that drive growth, operational excellence, and long-term success.</p>
        </div>
        <div className="services-grid fade-up delay-1">
          <div className="service-card featured" data-service="marine">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🦐</div>
            </div>
            <h3>Marine Products &amp; Exports</h3>
            <p>Flagship business — processing and exporting seafood globally. Choice Canning Co. operates from Cochin, New Jersey (USA) &amp; Ontario (Canada).</p>
            <div className="sc-arrow">→</div>
            <div className="sc-featured-badge">Flagship</div>
          </div>
          <div className="service-card" data-service="shipping">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🚢</div>
            </div>
            <h3>Shipping &amp; Logistics</h3>
            <p>Choice Shipping Lines &amp; Choice Intermodal Services — with branches in Chennai, Tuticorin, Vizag, Goa, Bangalore, Hyderabad, Mumbai &amp; more.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="trading">
            <div className="sc-icon-wrap">
              <div className="sc-icon">💼</div>
            </div>
            <h3>Trading Corporation</h3>
            <p>Choice Trading Corporation Pvt. Ltd — diversified trading operations across commodities and international markets from Cochin.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="realestate">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🏗️</div>
            </div>
            <h3>Real Estate &amp; Construction</h3>
            <p>Choice Constructions — premium property development and real estate ventures in Kerala and beyond.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="education">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🎓</div>
            </div>
            <h3>Education</h3>
            <p>The Choice School, Cochin — 2000+ students, 180 staff, quality education and empowerment under the Choice Foundation.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="entertainment">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🎭</div>
            </div>
            <h3>Entertainment — JTPAC</h3>
            <p>Jose Thomas Performing Arts Centre — Cochin's premier cultural and entertainment venue, celebrating art, music, and theatre.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="it">
            <div className="sc-icon-wrap">
              <div className="sc-icon">💻</div>
            </div>
            <h3>Information Technology</h3>
            <p>Choice Infoway — delivering cutting-edge IT solutions, digital services, and technology-driven business transformation.</p>
            <div className="sc-arrow">→</div>
          </div>
          <div className="service-card" data-service="frozen">
            <div className="sc-icon-wrap">
              <div className="sc-icon">🍽️</div>
            </div>
            <h3>Prepared Frozen Meals</h3>
            <p>Value-added food processing — prepared frozen meals for domestic and international markets, extending the group's food industry expertise.</p>
            <div className="sc-arrow">→</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
