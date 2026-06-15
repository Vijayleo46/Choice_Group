import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="fl-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="70 30 180 100" className="choice-logo-mark">
                    <defs>
                      <linearGradient id="redGradF" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff3b5c" />
                        <stop offset="100%" stopColor="#c3002f" />
                      </linearGradient>
                      <linearGradient id="blueGradF" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2c30be" />
                        <stop offset="100%" stopColor="#121450" />
                      </linearGradient>
                    </defs>
                    <g className="logo-graphic-group">
                      <path d="M 160,30 A 50,50 0 0,0 160,130 Z" fill="url(#redGradF)" />
                      <path d="M 160,130 A 50,50 0 0,0 160,30 Z" fill="url(#blueGradF)" />
                      <line x1="160" y1="30" x2="160" y2="130" stroke="#121450" strokeWidth="1.5" opacity="0.3" />
                      <line x1="110" y1="80" x2="160" y2="80" stroke="url(#blueGradF)" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 116.7,55 A 75,75 0 0,0 160,65" fill="none" stroke="url(#blueGradF)" strokeWidth="2.5" />
                      <path d="M 116.7,105 A 75,75 0 0,1 160,95" fill="none" stroke="url(#blueGradF)" strokeWidth="2.5" />
                      <line x1="160" y1="80" x2="210" y2="80" stroke="url(#redGradF)" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M 160,65 A 75,75 0 0,0 203.3,55" fill="none" stroke="url(#redGradF)" strokeWidth="2.5" />
                      <path d="M 160,95 A 75,75 0 0,1 203.3,105" fill="none" stroke="url(#redGradF)" strokeWidth="2.5" />
                      <circle cx="176" cy="52" r="6.5" fill="url(#redGradF)" />
                      <circle cx="176" cy="108" r="6.5" fill="url(#redGradF)" />
                      <g fill="url(#blueGradF)" className="wing-left">
                        <polygon points="70,66 105,66 105,76 79,76" />
                        <polygon points="81,81 103,81 103,91 90,91" />
                        <polygon points="92,96 101,96 101,106 100,106" />
                      </g>
                      <g fill="url(#blueGradF)" className="wing-right">
                        <polygon points="250,66 215,66 215,76 241,76" />
                        <polygon points="239,81 217,81 217,91 230,91" />
                        <polygon points="228,96 219,96 219,106 220,106" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="fl-text">
                  <span className="fl-name">THE CHOICE GROUP</span>
                  <span className="fl-tag">Est. 1962 · Cochin, India</span>
                </div>
              </div>
              <p className="footer-desc">One of South India's largest and most diversified business conglomerates. A legacy of trust, innovation, and excellence spanning six decades.</p>
              <div className="footer-social">
                <a href="#" className="fs-link" aria-label="LinkedIn">in</a>
                <a href="#" className="fs-link" aria-label="Twitter">𝕏</a>
                <a href="#" className="fs-link" aria-label="Facebook">f</a>
                <a href="#" className="fs-link" aria-label="YouTube">▶</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#history">Our History</a></li>
                <li><a href="#global">Global Presence</a></li>
                <li><a href="#expertise">Our Expertise</a></li>
                <li><a href="#leadership">Leadership</a></li>
                <li><a href="#impact">Business Impact</a></li>
                <li><a href="#news">News &amp; Insights</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#expertise">Financial Services</a></li>
                <li><a href="#expertise">Wealth Management</a></li>
                <li><a href="#expertise">Business Consulting</a></li>
                <li><a href="#expertise">Strategic Investments</a></li>
                <li><a href="#expertise">Technology Solutions</a></li>
                <li><a href="#expertise">Corporate Advisory</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Global Presence</h4>
              <ul>
                <li><span className="fc-flag">🇮🇳</span> India (HQ)</li>
                <li><span className="fc-flag">🇺🇸</span> United States</li>
                <li><span className="fc-flag">🇨🇦</span> Canada</li>
                <li><span className="fc-flag">🇰🇷</span> South Korea</li>
                <li><span className="fc-flag">🇯🇵</span> Japan</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>📍 Cochin, Kerala, India</li>
                <li>📞 +91 (484) 000-0000</li>
                <li>📧 info@thechoicegroup.com</li>
                <li>🌐 www.thechoicegroup.com</li>
              </ul>
              <a href="#contact" className="btn btn-ghost footer-cta">Get In Touch</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <span>&copy; 2025 The Choice Group. All rights reserved. Established 1962, Cochin, Kerala, India.</span>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

      <button id="scroll-top" aria-label="Scroll to top" onClick={scrollToTop}>
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default Footer;
