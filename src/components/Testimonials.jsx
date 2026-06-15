import React, { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = 4;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="testimonials-bg"></div>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Client Success Stories</div>
          <h2 className="section-title">Voices of <em>Trust</em></h2>
          <p className="section-desc">What our long-standing partners and clients say about working with The Choice Group.</p>
        </div>
        <div className="testimonials-carousel fade-up delay-1">
          <div className="tc-track" id="tc-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            <div className={`testimonial-card ${activeIndex === 0 ? 'active' : ''}`}>
              <div className="tc-quote">"</div>
              <p className="tc-text">The Choice Group has been our strategic partner for over two decades. Their financial acumen, integrity, and ability to navigate complex markets have consistently delivered exceptional results for our business.</p>
              <div className="tc-author">
                <div className="tc-avatar">RK</div>
                <div className="tc-info">
                  <strong>Rajesh Kumar</strong>
                  <span>CEO, Indo-Pacific Ventures</span>
                </div>
                <div className="tc-stars">★★★★★</div>
              </div>
            </div>
            <div className={`testimonial-card ${activeIndex === 1 ? 'active' : ''}`}>
              <div className="tc-quote">"</div>
              <p className="tc-text">What sets The Choice Group apart is their truly global perspective combined with deep local expertise. They helped us expand into Asian markets with confidence and precision — a partnership we treasure.</p>
              <div className="tc-author">
                <div className="tc-avatar">SM</div>
                <div className="tc-info">
                  <strong>Sarah Mitchell</strong>
                  <span>Managing Director, North American Trade Partners</span>
                </div>
                <div className="tc-stars">★★★★★</div>
              </div>
            </div>
            <div className={`testimonial-card ${activeIndex === 2 ? 'active' : ''}`}>
              <div className="tc-quote">"</div>
              <p className="tc-text">For over 15 years, The Choice Group has been our trusted wealth management advisor. Their personalized approach, market insight, and commitment to client success is truly world-class.</p>
              <div className="tc-author">
                <div className="tc-avatar">AV</div>
                <div className="tc-info">
                  <strong>Anil Varghese</strong>
                  <span>Founder, Varghese Family Office</span>
                </div>
                <div className="tc-stars">★★★★★</div>
              </div>
            </div>
            <div className={`testimonial-card ${activeIndex === 3 ? 'active' : ''}`}>
              <div className="tc-quote">"</div>
              <p className="tc-text">The digital transformation consulting we received from The Choice Group was nothing short of transformative. They combined strategic vision with flawless execution — exceeding every expectation.</p>
              <div className="tc-author">
                <div className="tc-avatar">KP</div>
                <div className="tc-info">
                  <strong>Kenji Tanaka</strong>
                  <span>COO, Pacific Bridge Technologies, Japan</span>
                </div>
                <div className="tc-stars">★★★★★</div>
              </div>
            </div>
          </div>
          <div className="tc-controls">
            <button className="tc-btn" onClick={handlePrev} aria-label="Previous testimonial">‹</button>
            <div className="tc-dots">
              {[0, 1, 2, 3].map((index) => (
                <span 
                  key={index} 
                  className={`tc-dot ${activeIndex === index ? 'active' : ''}`} 
                  onClick={() => setActiveIndex(index)}
                ></span>
              ))}
            </div>
            <button className="tc-btn" onClick={handleNext} aria-label="Next testimonial">›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
