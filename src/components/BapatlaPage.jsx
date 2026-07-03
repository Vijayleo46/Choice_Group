import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BaplatlaCertifications from './BaplatlaCertifications'
import BaplatlaDigitalFactory from './BaplatlaDigitalFactory'
import CoreCapabilities from './CoreCapabilities'

gsap.registerPlugin(ScrollTrigger)

export default function BapatlaPage({ onBackToHome }) {
  const headerRef  = useRef(null)
  const heroRef    = useRef(null)
  const pageRef    = useRef(null)

  useEffect(() => {
    document.title = 'Bapatla | Choice Group'
    ScrollTrigger.refresh()

    // Header slide-in
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 }
      )
    }

    const ctx = gsap.context(() => {

      // Hero text
      gsap.from('.bp-hero-label, .bp-hero-title, .bp-hero-sub, .bp-hero-desc', {
        opacity: 0, y: 50,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      })

      // Hero image
      gsap.from('.bp-hero-image', {
        opacity: 0, scale: 0.96,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6,
      })

      // CTA
      gsap.from('.bp-cta-inner', {
        scrollTrigger: { trigger: '.bp-cta', start: 'top 80%', once: true },
        opacity: 0, y: 30,
        duration: 0.8,
        ease: 'power3.out',
      })

    }, pageRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
      document.title = 'Choice Group'
    }
  }, [])

  const certifications = [
    { name: 'HACCP Certified',   icon: '✅' },
    { name: 'EU Approved',       icon: '🇪🇺' },
    { name: 'US FDA Registered', icon: '🇺🇸' },
    { name: 'ISO 22000',         icon: '📋' },
    { name: 'BRC Food Safety',   icon: '🏆' },
  ]

  return (
    <div className="bp-page" ref={pageRef}>

      {/* ── Top Header Bar ── */}
      <header className="bp-header" ref={headerRef}>
        <div className="bp-header-inner">
          <button className="bp-back-btn" onClick={onBackToHome} aria-label="Back to home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <div className="bp-header-logo">
            <img src="/Choice-Group-Logo (1).png.png" alt="Choice Group" className="bp-logo-img" />
          </div>

          <div className="bp-header-badge">
            <span className="bp-badge-dot" />
            Manufacturing Unit
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bp-hero">

        {/* Video background — plays behind all hero content */}
        <div className="bp-hero-video-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="bp-hero-video"
          >
            <source src="/Drone_video_industrial_facility_…_202606251807.mp4" type="video/mp4" />
          </video>
          <div className="bp-hero-video-overlay" />
        </div>

        <div className="bp-hero-content bp-hero-content--centered">
          <div className="bp-hero-text bp-hero-text--centered">
            <div className="bp-hero-label section-label">Manufacturing Excellence · Bapatla, Andhra Pradesh</div>
            <h1 className="bp-hero-title">
              <span className="bp-hero-name">Bapatla</span>
              <span className="bp-hero-tagline">Processing Plant</span>
            </h1>
            <p className="bp-hero-sub">
              Where Innovation Meets Sustainable Seafood Processing
            </p>
            <div className="bp-hero-company-name">
              CHOICE CANNING COMPANY
            </div>
            <p className="bp-hero-desc">
              Choice Canning Company is a leading name in sustainable aquaculture and shrimp
              processing for the last 70 years. Combining state-of-the-art automation, stringent
              quality control processes and industry defining innovation, Choice Canning Company
              leads the way in sustainable shrimp processing.
            </p>
            <div className="bp-hero-certs">
              {certifications.map((c, i) => (
                <span key={i} className="bp-hero-cert-pill">
                  {c.icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── Core Capabilities ── */}
      <CoreCapabilities />

      {/* ── Certifications ── */}
      <BaplatlaCertifications />

      {/* ── Digital Factory Platform ── */}
      <BaplatlaDigitalFactory />

      {/* ── CTA ── */}
      <section className="bp-cta">
        <div className="bp-cta-inner">
          <h2 className="bp-cta-title">Partner with a World-Class Facility</h2>
          <p className="bp-cta-sub">
            Connect with the Bapatla plant team for export enquiries, facility tours, or supply agreements.
          </p>
          <div className="bp-cta-actions">
            <button className="bp-cta-btn-primary" onClick={onBackToHome}>
              <span>Contact Us</span>
            </button>
            <button className="bp-cta-btn-secondary" onClick={onBackToHome}>
              <span>← Back to Home</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
