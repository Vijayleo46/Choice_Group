import React from 'react';

const News = () => {
  return (
    <section id="news" className="section news-section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Latest Updates</div>
          <h2 className="section-title">News &amp; <em>Insights</em></h2>
          <p className="section-desc">Stay informed with the latest corporate updates, industry insights, and market perspectives from The Choice Group.</p>
        </div>
        <div className="news-grid fade-up delay-1">
          <div className="news-card featured-news">
            <div className="news-tag">Corporate Update</div>
            <div className="news-date">June 2025</div>
            <h3>The Choice Group Expands Asia-Pacific Portfolio with New Strategic Partnerships</h3>
            <p>Building on its strong presence in South Korea and Japan, The Choice Group announces new strategic alliances designed to deepen its Asia-Pacific capabilities and drive mutual growth.</p>
            <a href="#" className="news-link">Read More <span>→</span></a>
          </div>
          <div className="news-card">
            <div className="news-tag">Industry Insight</div>
            <div className="news-date">May 2025</div>
            <h3>Digital Transformation in South Asia: Trends Shaping the Next Decade</h3>
            <p>Our experts share insights on how digitalization is reshaping business landscapes across South and Southeast Asia.</p>
            <a href="#" className="news-link">Read More <span>→</span></a>
          </div>
          <div className="news-card">
            <div className="news-tag">Business Announcement</div>
            <div className="news-date">April 2025</div>
            <h3>Celebrating 63 Years of Excellence: The Choice Group Annual Report 2025</h3>
            <p>Our annual report highlights another year of diversified growth, global expansion, and exceptional client outcomes.</p>
            <a href="#" className="news-link">Read More <span>→</span></a>
          </div>
          <div className="news-card">
            <div className="news-tag">Market Perspective</div>
            <div className="news-date">March 2025</div>
            <h3>Wealth Management Outlook: Navigating Global Markets in 2025</h3>
            <p>Our wealth management team provides a comprehensive outlook on global markets and investment opportunities for the year ahead.</p>
            <a href="#" className="news-link">Read More <span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
