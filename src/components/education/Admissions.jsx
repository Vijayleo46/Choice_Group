import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Admissions = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate Background Images
      gsap.fromTo('.admissions-bg-img',
        { opacity: 0, scale: 1.15 }, // Start slightly zoomed in and transparent
        {
          opacity: 400,
          scale: 1, // Smoothly scale down to its natural size
          duration: 1.5,
          stagger: 0.2, // Offsets the entry of each background image slightly
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.admissions-section',
            start: 'top 80%',
          }
        }
      )

      // 2. Animate elements on scroll
      gsap.fromTo('.admissions-badge',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.admissions-section',
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo('.admissions-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.admissions-section',
            start: 'top 75%',
          }
        }
      )

      gsap.fromTo('.admissions-content p',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.admissions-section',
            start: 'top 70%',
          }
        }
      )

      gsap.fromTo('.admissions-cta-group',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.admissions-section',
            start: 'top 65%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="admissions-section" ref={sectionRef}>
      <div className="admissions-container">
        <div className="admissions-card">
          {/* Background Images */}
          <div className="admissions-bg-images">
            <div className="admissions-bg-img admissions-bg-img-1" style={{ backgroundImage: 'url(/admissions.png)' }}></div>
            <div className="admissions-bg-img admissions-bg-img-2" style={{ backgroundImage: 'url(/Screenshot%202026-06-24%20104416.jpg)' }}></div>
            <div className="admissions-bg-img admissions-bg-img-3" style={{ backgroundImage: 'url(/1H9A7464.jpg)' }}></div>
          </div>

          {/* Dark overlay for text readability */}
          <div className="admissions-overlay"></div>

          {/* Content */}
          <div className="admissions-content-wrapper">
            {/* Badge */}
            <div className="admissions-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">ADMISSIONS OPEN</span>
            </div>

            {/* Title */}
            <h2 className="admissions-title">
              Admissions Open for<br />
              <span className="highlight-year">AY 2026-2027</span>
            </h2>

            {/* Content */}
            <div className="admissions-content">
              <p className="admissions-intro">
                <strong>The Choice School</strong> is ranked as one of the leading schools in India and the best in Kerala.
                It has been the preferred choice for parents across the world. The school maintains a holistic balance of
                curricular and extra-curricular activities that unleashes the potential of every child and encourages
                students to be the best version of themselves.
              </p>

              <p className="admissions-info">
                Online registration for admission for the new academic year commences in <strong>August</strong> of each
                year and is the first step in the procedure.
              </p>
            </div>

            {/* CTA Group */}
            <div className="admissions-cta-group">
              <button className="admissions-btn-primary">
                <span>Apply Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="admissions-btn-secondary">
                Learn more about the Admissions Process
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="admissions-glow-1"></div>
          <div className="admissions-glow-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Admissions