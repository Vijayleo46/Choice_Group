import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Bapatla() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.children, {
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 80%', 
          once: true 
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      })

      // Hero content animation
      gsap.from(heroRef.current?.children, {
        scrollTrigger: { 
          trigger: heroRef.current, 
          start: 'top 75%', 
          once: true 
        },
        opacity: 0,
        x: -40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      })

      // Stats counter animation
      gsap.from(statsRef.current?.children, {
        scrollTrigger: { 
          trigger: statsRef.current, 
          start: 'top 70%', 
          once: true 
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(2)',
      })

      // Features cards animation
      gsap.from(featuresRef.current?.children, {
        scrollTrigger: { 
          trigger: featuresRef.current, 
          start: 'top 75%', 
          once: true 
        },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: '🏭',
      title: 'ERP-Enabled Production',
      description: 'Fully integrated enterprise resource planning system for seamless production management and quality control.',
    },
    {
      icon: '❄️',
      title: 'Intelligent Cold Chain',
      description: 'Advanced temperature-controlled storage and logistics ensuring product freshness from processing to delivery.',
    },
    {
      icon: '🌊',
      title: 'Export-Quality Processing',
      description: 'State-of-the-art shrimp processing facility meeting international quality standards and certifications.',
    },
    {
      icon: '👥',
      title: 'Employee-Centric Infrastructure',
      description: 'Modern workplace facilities designed to ensure employee safety, comfort, and productivity.',
    },
  ]

  const stats = [
    { value: '140,000', unit: 'sq. ft.', label: 'Campus Area' },
    { value: '70', unit: 'MT/day', label: 'Production Capacity' },
    { value: '100%', unit: '', label: 'Export Quality' },
    { value: '24/7', unit: '', label: 'Operations' },
  ]

  return (
    <section ref={sectionRef} id="bapatla" className="bapatla">
      <div className="bapatla-container">
        
        {/* Header */}
        <div ref={headerRef} className="bapatla-header">
          <div className="section-label">Manufacturing Excellence</div>
          <h2 className="section-title">
            <span className="gold">Bapatla</span>
          </h2>
          <p className="section-subtitle">
            Where Innovation Meets Sustainable Seafood Processing
          </p>
          <p className="section-description">
            The Bapatla Plant is a flagship shrimp processing facility, integrating ERP-enabled production, 
            intelligent cold chain management, export-quality processing, and employee-centric infrastructure 
            within a 140,000 sq. ft. campus with a production capacity of 70 MT per day.
          </p>
        </div>

        {/* Hero Visual */}
        <div ref={heroRef} className="bapatla-hero">
          <div className="bapatla-hero-image">
            <img 
              src="/37_Choice-Canning-Factory-01.jpg" 
              alt="Bapatla Manufacturing Facility - Choice Canning Factory"
              className="facility-image"
            />
            <div className="hero-overlay">
              <div className="overlay-pattern"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div ref={statsRef} className="bapatla-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">
                {stat.value}
                <span className="stat-unit">{stat.unit}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="bapatla-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <span>{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="feature-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}