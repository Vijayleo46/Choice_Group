import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const slides = [
  { img: '/warehouse.jpg.png',       label: 'Global Logistics & Distribution' },
  { img: '/DSC_8013.jpg',            label: 'The Choice School — Kochi' },
  { img: '/DSC_7389.jpg',            label: 'Choice School Campus' },
  { img: '/1H9A9006.jpg',            label: 'Student Life at Choice School' },
  { img: '/1H9A9069.jpg',            label: 'Sports & Excellence' },
  { img: '/70_Jtpac-photo-06.jpg',   label: 'JTPac Performing Arts Theatre' },
  { img: '/36_Tastee Choice-02.jpg', label: 'Tastee Choice — Marine Exports' },
]

export default function Hero() {
  const sectionRef   = useRef(null)
  const badgeRef     = useRef(null)
  const titleRef     = useRef(null)
  const subtitleRef  = useRef(null)
  const ctaRef       = useRef(null)
  const statsRef     = useRef(null)
  const visualRef    = useRef(null)
  const linesRef     = useRef([])
  const slideRefs    = useRef([])
  const dotRefs      = useRef([])
  const [current, setCurrent]   = useState(0)
  const intervalRef  = useRef(null)

  // Slideshow crossfade
  useEffect(() => {
    const next = (idx) => {
      const prev = idx === 0 ? slides.length - 1 : idx - 1
      gsap.to(slideRefs.current[prev], { opacity: 0, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(slideRefs.current[idx],  { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(dotRefs.current[prev],   { scale: 1, opacity: 0.4, duration: 0.4 })
      gsap.to(dotRefs.current[idx],    { scale: 1.4, opacity: 1, duration: 0.4 })
    }
    next(0)
    intervalRef.current = setInterval(() => {
      setCurrent(c => {
        const n = (c + 1) % slides.length
        next(n)
        return n
      })
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 }) // small delay after page reveal

      tl.from(badgeRef.current, { opacity: 0, y: -30, scale: 0.8, duration: 0.7, ease: 'back.out(2)' })
      tl.from(linesRef.current, { opacity: 0, y: 80, rotateX: -30, stagger: 0.15, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      tl.from(ctaRef.current?.children, { opacity: 0, y: 20, scale: 0.9, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4')
      tl.from(statsRef.current?.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      tl.from(visualRef.current, { opacity: 0, x: 50, duration: 1, ease: 'power3.out' }, '-=1.2')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="hero">

      {/* Slideshow background */}
      <div className="hero-slideshow">
        {slides.map((s, i) => (
          <div
            key={i}
            ref={el => slideRefs.current[i] = el}
            className="hero-slide"
            style={{ backgroundImage: `url("${s.img}")` }}
          />
        ))}
        <div className="hero-slide-overlay" />
      </div>

      <div className="hero-grid-bg" />

      <div className="hero-content">
        <div className="hero-text">
          <div ref={badgeRef} className="hero-badge">
            <div className="hero-badge-dot" />
            Established Since 1962 · 60+ Years
          </div>

          <h1 ref={titleRef} className="hero-title">
            <span className="line" ref={el => linesRef.current[0] = el}>A Legacy of</span>
            <span className="line gold-gradient" ref={el => linesRef.current[1] = el}>Trust &amp; Quality</span>
            <span className="line" ref={el => linesRef.current[2] = el} style={{ fontSize: '0.5em', marginTop: '0.5rem' }}>
              South India&apos;s Premier Diversified Conglomerate
            </span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Headquartered in Kochi, Kerala — the Choice Group operates across Marine Exports, Foods, Logistics, Shipping, Construction, Education, and Technology with a global footprint spanning India, USA, Canada, Japan &amp; South Korea.
          </p>

          <div ref={ctaRef} className="hero-cta-group">
            <a href="#about" className="gold-btn"><span>Discover Our Story</span></a>
            <a href="#expertise" className="ghost-btn">Our Business Divisions</a>
          </div>

          <div ref={statsRef} className="hero-stats">
            <div className="hero-stat-card">
              <span className="stat-value">$250M+</span>
              <span className="stat-label">Annual Turnover</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-value">5,000+</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-value">5+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>

          {/* Slide dots */}
          <div className="hero-slide-dots">
            {slides.map((_, i) => (
              <span key={i} ref={el => dotRefs.current[i] = el} className="hero-slide-dot" />
            ))}
          </div>
        </div>

        <div ref={visualRef} className="hero-visual">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />

          <div className="hero-card-main">
            <div className="hero-card-icon">
              <img
                src="/Choice-Group-Logo (1).png.png"
                alt="Choice Group"
                style={{ width: '90px', height: '90px', objectFit: 'contain' }}
              />
            </div>
            <div className="hero-card-year">1962</div>
            <div className="hero-card-text">Foundation<br />Kochi, Kerala</div>
          </div>

          <div className="hero-floating-badge top-right">
            <div className="badge-icon">🌍</div>
            <div>
              <span className="badge-value">5 Countries</span>
              <span className="badge-label">India · USA · Canada · Japan · Korea</span>
            </div>
          </div>

          <div className="hero-floating-badge bottom-left">
            <div className="badge-icon">📦</div>
            <div>
              <span className="badge-value">8 Divisions</span>
              <span className="badge-label">Diversified Excellence</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  )
}
