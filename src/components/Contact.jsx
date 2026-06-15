import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const successMsg = document.getElementById('form-success');
    if (successMsg) {
      successMsg.style.display = 'block';
      e.target.reset();
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-bg-glow"></div>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Connect With <em>The Choice Group</em></h2>
          <p className="section-desc">Whether you're exploring partnership opportunities, seeking expert advisory, or simply want to learn more — we'd love to hear from you.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info fade-left">
            <div className="ci-block">
              <div className="ci-icon">📍</div>
              <div>
                <strong>Corporate Headquarters</strong>
                <span>The Choice Group, Cochin (Kochi),<br />Kerala — 682 001, India</span>
              </div>
            </div>
            <div className="ci-block">
              <div className="ci-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <span>+91 (484) 000-0000</span>
              </div>
            </div>
            <div className="ci-block">
              <div className="ci-icon">📧</div>
              <div>
                <strong>Email</strong>
                <span>info@thechoicegroup.com</span>
              </div>
            </div>
            <div className="ci-block">
              <div className="ci-icon">🌐</div>
              <div>
                <strong>International Offices</strong>
                <span>United States · Canada<br />South Korea · Japan</span>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" id="sl-linkedin" aria-label="LinkedIn">in</a>
              <a href="#" className="social-link" id="sl-twitter" aria-label="Twitter/X">𝕏</a>
              <a href="#" className="social-link" id="sl-facebook" aria-label="Facebook">f</a>
              <a href="#" className="social-link" id="sl-youtube" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="contact-form-wrap fade-right">
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
              <h3>Business Inquiry</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">Full Name *</label>
                  <input type="text" id="cf-name" name="name" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">Email Address *</label>
                  <input type="email" id="cf-email" name="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-company">Company</label>
                  <input type="text" id="cf-company" name="company" placeholder="Your organization" />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-service">Service Interest</label>
                  <select id="cf-service" name="service">
                    <option value="">Select a service</option>
                    <option value="financial">Financial Services</option>
                    <option value="wealth">Wealth Management</option>
                    <option value="consulting">Business Consulting</option>
                    <option value="investments">Strategic Investments</option>
                    <option value="tech">Technology Solutions</option>
                    <option value="advisory">Corporate Advisory</option>
                    <option value="digital">Digital Transformation</option>
                    <option value="global-biz">Global Business Services</option>
                  </select>
                </div>
              </div>
              <div className="form-group full">
                <label htmlFor="cf-message">Message *</label>
                <textarea id="cf-message" name="message" rows="4" placeholder="Tell us about your requirements..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary full-btn" id="contact-submit-btn">
                <span>Send Message</span>
                <svg viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
              <div className="form-success" id="form-success" style={{ display: 'none' }}>
                <span>✅</span> Thank you! Your message has been received. Our team will be in touch within 24–48 hours.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
