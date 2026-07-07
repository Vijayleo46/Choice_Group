import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/premium-cta.css'

gsap.registerPlugin(ScrollTrigger)

export default function PremiumCTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pcta-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })

      // Split text headline animation
      gsap.utils.toArray('.pcta-headline-word').forEach((word, i) => {
        gsap.from(word, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          opacity: 0, y: 60, rotateX: 30,
          duration: 1.1, ease: 'power4.out', delay: 0.2 + i * 0.08,
        })
      })

      gsap.from('.pcta-subline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', delay: 0.6,
      })

      gsap.from('.pcta-btn', {
        scrollTrigger: { trigger: '.pcta-actions', start: 'top 85%', once: true },
        opacity: 0, y: 30, scale: 0.9,
        stagger: 0.12, duration: 0.8, ease: 'back.out(2)', delay: 0.4,
      })

      // Floating orbs
      gsap.to('.pcta-orb-1', { y: -40, x: 24, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.pcta-orb-2', { y: 32, x: -20, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
      gsap.to('.pcta-orb-3', { y: -20, x: 14, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 6 })

      // Particles
      gsap.utils.toArray('.pcta-particle').forEach((p, i) => {
        gsap.to(p, {
          opacity: gsap.utils.random(0.4, 1),
          scale: gsap.utils.random(1.2, 2),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const headlineWords = ['Partner', 'with', 'a', 'World-Class', 'Seafood', 'Manufacturing', 'Facility']

  return (
    <section ref={sectionRef} id="premium-cta" className="pcta-section">
      {/* Background */}
      <div className="pcta-bg">
        <div className="pcta-orb pcta-orb-1" />
        <div className="pcta-orb pcta-orb-2" />
        <div className="pcta-orb pcta-orb-3" />
        <div className="pcta-grid" />
        <div className="pcta-vignette" />
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="pcta-particle"
            style={{
              left: `${(i * 43 + 11) % 100}%`,
              top: `${(i * 59 + 7) % 100}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: 0.1,
            }}
          />
        ))}
      </div>

      <div className="pcta-inner">
        {/* Label */}
        <div className="pcta-label">
          <span className="pcta-label-dot" />
          Get In Touch
        </div>

        {/* Headline */}
        <h2 className="pcta-headline">
          {headlineWords.map((word, i) => (
            <span key={i} className="pcta-headline-word">{word}&nbsp;</span>
          ))}
        </h2>

        {/* Subline */}
        <p className="pcta-subline">
          Connect with the Bapatla plant team for export enquiries, facility tours,
          supply agreements, or to schedule a visit to our world-class campus.
        </p>

        {/* Buttons */}
        <div className="pcta-actions">
          <a href="#contact" className="pcta-btn pcta-btn--primary">
            <span className="pcta-btn-text">Contact Us</span>
            <svg className="pcta-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="pcta-btn-glow" />
          </a>
          <a href="#contact" className="pcta-btn pcta-btn--secondary">
            <span className="pcta-btn-text">Schedule a Visit</span>
            <span className="pcta-btn-emoji">📅</span>
          </a>
          <a href="#" className="pcta-btn pcta-btn--outline">
            <span className="pcta-btn-text">Download Profile</span>
            <span className="pcta-btn-emoji">📄</span>
          </a>
        </div>

        {/* Trust badges */}
        <div className="pcta-trust">
          {['HACCP', 'ISO 22000', 'BRC Grade A', 'EU Approved', 'BAP 4-Star'].map((c, i) => (
            <span key={i} className="pcta-trust-pill">✓ {c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
