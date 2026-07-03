import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 1, y: 100, duration: 1.2, ease: 'power3.out'
      })
      gsap.from(textRef.current?.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 1, x: 50, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      })
      gsap.from(statsRef.current?.children, {
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        scale: 0.8, opacity: 1, y: 30, stagger: 0.2, duration: 0.7, ease: 'back.out(1.5)'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="about">
      <div className="about-inner">
        <div className="about-visual">
          <div ref={imgRef} className="about-img-frame" style={{ position: 'relative', overflow: 'hidden' }}>
            <video
              className="about-bg-video"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/Drone_video_industrial_facility_…_202606251807.mp4" type="video/mp4" />
              <source src="/Drone_video_industrial_facility_…_202606251808.mp4" type="video/mp4" />
            </video>
            <div className="about-img-overlay" aria-hidden />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 4 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold-primary)', marginBottom: '6px' }}>Choice Group Global Operations</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>State-of-the-art logistics and distribution center</p>
            </div>
          </div>
          
          <div className="about-corner-badge">
            <span className="badge-num">60+</span>
            <span className="badge-txt">Years of Trust</span>
          </div>

          <div className="about-float-pill">
            <div className="pill-dot" />
            <span className="pill-text">$250Million Annual Turnover</span>
          </div>
        </div>

        <div ref={textRef} className="about-content">
          <div className="section-label">About Choice Group</div>
          <h2 className="section-title">
            Driving <span className="gold">Excellence</span> Across Continents
          </h2>
          
          <p className="section-desc" style={{ maxWidth: '100%', marginBottom: '1rem' }}>
            Founded in <strong style={{ color: 'var(--gold-primary)' }}>1950</strong>, the Choice Group is headquartered in <strong style={{ color: 'var(--gold-primary)' }}>Kochi, Kerala</strong> and has grown into one of South India&apos;s most respected and diversified conglomerates.
          </p>
          
          <p className="section-desc" style={{ maxWidth: '100%', marginBottom: '1rem' }}>
            What started as a pioneering venture in the marine export industry has evolved into a multi-sector enterprise with business interests spanning <strong style={{ color: 'var(--text-primary)' }}>Shrimp Marine Exports, Food Production, Logistics, Shipping, Construction, Education, Technology, and Financial Services</strong>.
          </p>

          <p className="section-desc" style={{ maxWidth: '100%', marginBottom: '1.5rem' }}>
            With an annual turnover exceeding <strong style={{ color: 'var(--gold-primary)' }}>₹600 crores</strong>, a workforce of over <strong style={{ color: 'var(--gold-primary)' }}>1,000 professionals</strong>, and operations in <strong style={{ color: 'var(--gold-primary)' }}>India, USA, UK, Kenya, Canada, Japan, and South Korea</strong>, the Choice Group continues to set benchmarks in every industry it enters.
          </p>

          <div ref={statsRef} className="about-values">
            <div className="value-item">
              <div className="value-icon">⚓</div>
              <div className="value-text">
                <span className="value-name">Marine Exports Pioneer</span>
                <span className="value-desc">India&apos;s leading seafood exporter with EU/FDA approved facilities</span>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🌍</div>
              <div>
                <span className="value-name">Global Operations</span>
                <span className="value-desc">Offices in  countries across 3 continents</span>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🏗️</div>
              <div className="value-text">
                <span className="value-name">Infrastructure</span>
                <span className="value-desc">World-class processing, cold storage &amp; logistics centers</span>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon">🎓</div>
              <div>
                <span className="value-name">Education</span>
                <span className="value-desc">Choice School — redefining academic excellence in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
