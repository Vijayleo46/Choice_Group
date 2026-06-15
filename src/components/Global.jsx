import React from 'react';

const Global = () => {
  return (
    <section id="global" className="section global-section">
      <div className="global-parallax-bg"></div>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">International Footprint</div>
          <h2 className="section-title">Our <em>Global</em> Presence</h2>
          <p className="section-desc">From the shores of Kerala to international capitals — The Choice Group's reach spans continents, cultures, and markets.</p>
        </div>
        <div className="global-layout">
          <div className="world-map-container fade-up delay-1">
            <div className="world-map-svg-wrap" id="world-map-wrap">
              <svg id="world-map-svg" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="world-map-svg">
                <path className="continent" d="M 80 80 L 280 70 L 300 100 L 280 130 L 260 160 L 220 200 L 180 220 L 150 240 L 130 230 L 100 200 L 70 160 L 60 120 Z" />
                <path className="continent" d="M 160 250 L 240 240 L 260 280 L 250 340 L 220 400 L 190 430 L 165 410 L 150 370 L 145 320 L 150 280 Z" />
                <path className="continent" d="M 440 60 L 520 55 L 540 80 L 530 100 L 510 110 L 490 120 L 460 115 L 440 100 L 435 80 Z" />
                <path className="continent" d="M 450 130 L 530 120 L 560 150 L 555 200 L 540 260 L 510 310 L 480 330 L 460 310 L 445 270 L 435 210 L 438 160 Z" />
                <path className="continent" d="M 540 50 L 750 45 L 820 70 L 840 100 L 820 130 L 790 150 L 750 160 L 700 155 L 650 145 L 600 140 L 560 130 L 535 110 L 530 85 Z" />
                <path className="continent india-shape" d="M 630 140 L 665 140 L 680 165 L 670 200 L 648 215 L 630 195 L 618 165 Z" />
                <path className="continent" d="M 760 290 L 870 280 L 890 320 L 880 360 L 850 380 L 810 375 L 775 350 L 755 320 Z" />
                <path className="continent japan-shape" d="M 820 105 L 835 100 L 845 110 L 840 120 L 826 118 Z" />
                <path className="continent korea-shape" d="M 800 110 L 815 108 L 818 120 L 810 126 L 800 120 Z" />

                <line className="conn-line" id="cl-us" x1="170" y1="160" x2="640" y2="175" strokeDasharray="6,4" />
                <line className="conn-line" id="cl-ca" x1="150" y1="120" x2="640" y2="175" strokeDasharray="6,4" />
                <line className="conn-line" id="cl-kr" x1="808" y1="117" x2="648" y2="180" strokeDasharray="6,4" />
                <line className="conn-line" id="cl-jp" x1="833" y1="110" x2="648" y2="175" strokeDasharray="6,4" />

                <g className="map-marker hq-marker" transform="translate(645,172)">
                  <circle className="marker-pulse" r="18" />
                  <circle className="marker-core" r="8" />
                  <text className="marker-label" x="0" y="-22">HQ · Cochin</text>
                </g>
                <g className="map-marker" transform="translate(170,160)">
                  <circle className="marker-pulse" r="14" />
                  <circle className="marker-core" r="6" />
                  <text className="marker-label" x="0" y="-18">United States</text>
                </g>
                <g className="map-marker" transform="translate(148,120)">
                  <circle className="marker-pulse" r="14" />
                  <circle className="marker-core" r="6" />
                  <text className="marker-label" x="0" y="-18">Canada</text>
                </g>
                <g className="map-marker" transform="translate(809,117)">
                  <circle className="marker-pulse" r="14" />
                  <circle className="marker-core" r="6" />
                  <text className="marker-label" x="0" y="-18">South Korea</text>
                </g>
                <g className="map-marker" transform="translate(833,110)">
                  <circle className="marker-pulse" r="14" />
                  <circle className="marker-core" r="6" />
                  <text className="marker-label" x="0" y="-18">Japan</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="global-cards fade-right">
            <div className="global-card hq-card">
              <div className="gc-flag">🇮🇳</div>
              <div className="gc-info">
                <strong>India — Headquarters</strong>
                <span>Cochin, Kerala · Branches in Chennai, Tuticorin, Vizag, Goa, Bangalore, Hyderabad, Mumbai, Coimbatore</span>
              </div>
              <div className="gc-badge hq">HQ</div>
            </div>
            <div className="global-card">
              <div className="gc-flag">🇺🇸</div>
              <div className="gc-info">
                <strong>United States</strong>
                <span>Choice Canning Co. Inc, New Jersey</span>
              </div>
            </div>
            <div className="global-card">
              <div className="gc-flag">🇨🇦</div>
              <div className="gc-info">
                <strong>Canada</strong>
                <span>Choice Canning Co., Ontario</span>
              </div>
            </div>
            <div className="global-card">
              <div className="gc-flag">🇸🇬</div>
              <div className="gc-info">
                <strong>Singapore</strong>
                <span>Choice Group Holdings Pte Ltd</span>
              </div>
            </div>
            <div className="global-card">
              <div className="gc-flag">🇰🇷</div>
              <div className="gc-info">
                <strong>South Korea</strong>
                <span>Marine Products Export Market</span>
              </div>
            </div>
            <div className="global-card">
              <div className="gc-flag">🇯🇵</div>
              <div className="gc-info">
                <strong>Japan</strong>
                <span>Marine Products Export Market</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Global;
