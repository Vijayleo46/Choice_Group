import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const contentRef = useRef(null)
  const inputRef = useRef(null)
  const btnRef = useRef(null)
  const successRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children, {
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        opacity: 1, y: 40, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError(true)
      gsap.to(inputRef.current, {
        x: [-8, 8, -6, 6, -4, 4, 0],
        duration: 0.4, ease: 'power2.out'
      })
      return
    }
    setError(false)
    // Button loading animation
    gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 })
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, delay: 0.1 })

    setTimeout(() => {
      setSubmitted(true)
      gsap.set(successRef.current, { display: 'flex', opacity: 0, y: 10 })
      gsap.to(successRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    }, 400)
  }

  return (
    <footer ref={footerRef} id="footer" className="footer">
      <div ref={contentRef} className="footer-inner">

        <div className="footer-brand">
          <div className="header-logo" style={{ marginBottom: '0.5rem' }}>
            <img src="/Choice-Group-Logo (1).png.png" alt="Choice Group" style={{ height: '90px' }} />
          </div>
          <p>A legacy of trust, excellence, and innovation spanning over six decades. From Shrimp marine exports to global conglomerates, we continue to push boundaries.</p>
          <div className="footer-socials">
            <a href="#" className="social-btn" aria-label="LinkedIn">💼</a>
            <a href="#" className="social-btn" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-btn" aria-label="Instagram">📷</a>
            <a href="#" className="social-btn" aria-label="Facebook">📘</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <div className="footer-links">
            <a href="#about" className="footer-link">About Us</a>
            <a href="#leadership" className="footer-link">Leadership</a>
            <a href="#evolution" className="footer-link">Our Journey</a>
            <a href="#expertise" className="footer-link">Our Divisions</a>
            <a href="#contact" className="footer-link">Contact Us</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Divisions</h4>
          <div className="footer-links">
            <a href="#expertise" className="footer-link">Shrimp Marine Exports</a>
            <a href="#expertise" className="footer-link">Food Production</a>
            <a href="#expertise" className="footer-link">Logistics</a>
            <a href="#expertise" className="footer-link">Construction</a>
            <a href="#expertise" className="footer-link">Education</a>
            <a href="#expertise" className="footer-link">JTPac Arts</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Stay Connected</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
            Subscribe to receive the latest news and updates from the Choice Group.
          </p>

          {!submitted ? (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div style={{ position: 'relative' }}>
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(false) }}
                  style={{ borderColor: error ? '#ef4444' : undefined }}
                />
                {error && (
                  <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px' }}>
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button ref={btnRef} type="submit" className="newsletter-btn">
                Subscribe →
              </button>
            </form>
          ) : (
            <div
              ref={successRef}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#16a34a' }}>Subscribed!</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Thank you for subscribing to Choice Group updates.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Choice Group. All Rights Reserved.</span>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}
