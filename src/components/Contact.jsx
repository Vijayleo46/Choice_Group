import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const infoRef    = useRef(null)
  const formRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 1, y: 30, duration: 0.8, ease: 'power3.out'
      })
      gsap.from(infoRef.current, {
        scrollTrigger: { trigger: infoRef.current, start: 'top 75%' },
        opacity: 1, x: -40, duration: 0.9, ease: 'power3.out'
      })
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: 'top 75%' },
        opacity: 1, x: 40, duration: 0.9, ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    alert('Thank you! Your message has been received. Our team will be in touch within 24–48 hours.')
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-inner">

        <div ref={headerRef} className="contact-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">
            Connect With <span className="gold">The Choice Group</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Whether you're exploring partnership opportunities, seeking expert advisory, or simply want to learn more — we'd love to hear from you.
          </p>
        </div>

        <div className="contact-layout">

          {/* Info */}
          <div ref={infoRef} className="contact-info-col">
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <strong>Corporate Headquarters</strong>
                <span>The Choice Group, Cochin (Kochi),<br />Kerala — 682 001, India</span>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <span>+91 (484) 000-0000</span>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📧</div>
              <div>
                <strong>Email</strong>
                <span>info@thechoicegroup.com</span>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">🌐</div>
              <div>
                <strong>International Offices</strong>
                <span>United States · Canada<br />South Korea · Japan</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="contact-form-col">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Business Inquiry</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" placeholder="Your organization" />
                </div>
                <div className="form-group">
                  <label>Service Interest</label>
                  <select>
                    <option value="">Select a service</option>
                    <option>Marine Exports</option>
                    <option>Food Production</option>
                    <option>Logistics</option>
                    <option>Construction</option>
                    <option>Education</option>
                    <option>Technology</option>
                    <option>Shipping</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea rows="4" placeholder="Tell us about your requirements..." required></textarea>
              </div>
              <button type="submit" className="gold-btn" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
