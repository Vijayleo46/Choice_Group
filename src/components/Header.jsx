import React from 'react';

const Header = () => {
  return (
    <nav id="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" id="nav-logo-link">
          <div className="nav-logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="70 30 180 100" className="choice-logo-mark">
              <defs>
                <linearGradient id="redGradN" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3b5c" />
                  <stop offset="100%" stopColor="#c3002f" />
                </linearGradient>
                <linearGradient id="blueGradN" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c30be" />
                  <stop offset="100%" stopColor="#121450" />
                </linearGradient>
              </defs>
              <g className="logo-graphic-group">
                <path d="M 160,30 A 50,50 0 0,0 160,130 Z" fill="url(#redGradN)" />
                <path d="M 160,130 A 50,50 0 0,0 160,30 Z" fill="url(#blueGradN)" />
                <line x1="160" y1="30" x2="160" y2="130" stroke="#121450" strokeWidth="1.5" opacity="0.3" />
                <line x1="110" y1="80" x2="160" y2="80" stroke="url(#blueGradN)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 116.7,55 A 75,75 0 0,0 160,65" fill="none" stroke="url(#blueGradN)" strokeWidth="2.5" />
                <path d="M 116.7,105 A 75,75 0 0,1 160,95" fill="none" stroke="url(#blueGradN)" strokeWidth="2.5" />
                <line x1="160" y1="80" x2="210" y2="80" stroke="url(#redGradN)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 160,65 A 75,75 0 0,0 203.3,55" fill="none" stroke="url(#redGradN)" strokeWidth="2.5" />
                <path d="M 160,95 A 75,75 0 0,1 203.3,105" fill="none" stroke="url(#redGradN)" strokeWidth="2.5" />
                <circle cx="176" cy="52" r="6.5" fill="url(#redGradN)" />
                <circle cx="176" cy="108" r="6.5" fill="url(#redGradN)" />
                <g fill="url(#blueGradN)" className="wing-left">
                  <polygon points="70,66 105,66 105,76 79,76" />
                  <polygon points="81,81 103,81 103,91 90,91" />
                  <polygon points="92,96 101,96 101,106 100,106" />
                </g>
                <g fill="url(#blueGradN)" className="wing-right">
                  <polygon points="250,66 215,66 215,76 241,76" />
                  <polygon points="239,81 217,81 217,91 230,91" />
                  <polygon points="228,96 219,96 219,106 220,106" />
                </g>
              </g>
            </svg>
          </div>
          <div className="nav-logo-text">
            <span className="brand-name">THE CHOICE GROUP</span>
            <span className="brand-tagline">Est. 1962 · Cochin, India</span>
          </div>
        </a>
        <ul className="nav-links" id="nav-links">
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#history" className="nav-link">History</a></li>
          <li><a href="#global" className="nav-link">Global</a></li>
          <li><a href="#expertise" className="nav-link">Expertise</a></li>
          <li><a href="#leadership" className="nav-link">Leadership</a></li>
          <li><a href="#impact" className="nav-link">Impact</a></li>
          <li><a href="#testimonials" className="nav-link">Success</a></li>
          <li><a href="#news" className="nav-link">Insights</a></li>
          <li><a href="#contact" className="nav-link nav-cta">Contact Us</a></li>
        </ul>
        <button className="hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
