import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QuickAccess = () => {
  const sectionRef = useRef(null)

  const quickLinks = [
    { title: 'Admissions', icon: '📋' },
    { title: 'Alumni', icon: '🎓' },
    { title: 'Parent Login', icon: '👤' },
    { title: 'Fee Payment', icon: '💳' },
    { title: 'School Policies', icon: '📜' },
    { title: 'Curriculum', icon: '📚' },
    { title: 'Inclusive Education', icon: '🌈' },
    { title: 'Governance & Leadership', icon: '🏛️' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glass cards entrance
      gsap.fromTo('.quick-access-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.quick-access-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Hover effect
      document.querySelectorAll('.quick-access-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
          gsap.to(this, {
            y: -10,
            boxShadow: '0 20px 60px rgba(199, 160, 60, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', function() {
          gsap.to(this, {
            y: 0,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="quick-access-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <h2 className="section-title">Quick <em>Access</em></h2>
          <p className="section-desc">Everything you need, just a click away.</p>
        </div>

        <div className="quick-access-grid">
          {quickLinks.map((link, idx) => (
            <a key={idx} href="#" className="quick-access-card glass-card">
              <div className="quick-icon">{link.icon}</div>
              <p className="quick-title">{link.title}</p>
              <div className="quick-arrow">→</div>
            </a>
          ))}
        </div>

        {/* Career CTA */}
        <div className="career-cta fade-up">
          <div className="career-content">
            <h3 className="career-title">Work With Us</h3>
            <p className="career-desc">See the latest opportunities and advance your career with The Choice School.</p>
          </div>
          <button className="btn btn-primary">Apply Now</button>
        </div>
      </div>
    </section>
  )
}

export default QuickAccess
