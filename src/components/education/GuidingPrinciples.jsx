import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GuidingPrinciples = () => {
  const sectionRef = useRef(null)

  const principles = [
    {
      title: 'Knowledge',
      description: 'Fostering intellectual curiosity and academic excellence through innovative pedagogy and research-driven learning.'
    },
    {
      title: 'Character',
      description: 'Nurturing values, integrity and leadership qualities that define responsible global citizens.'
    },
    {
      title: 'Health',
      description: 'Promoting physical, mental and emotional wellbeing as the foundation for holistic development.'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo('.principle-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.guiding-principles-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Icon rotation on hover
      document.querySelectorAll('.principle-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            rotation: 360,
            duration: 0.6,
            ease: 'back.out'
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="guiding-principles-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <h2 className="section-title">Our <em>Guiding Principles</em></h2>
          <p className="section-desc">The KCH framework that anchors every decision and shapes every student's journey.</p>
        </div>

        <div className="principles-grid">
          {principles.map((principle, idx) => (
            <div key={idx} className="principle-card">
              <div className="principle-icon-wrapper">
                <div className="principle-icon">
                  {idx === 0 && <span>🧠</span>}
                  {idx === 1 && <span>💫</span>}
                  {idx === 2 && <span>❤️</span>}
                </div>
                <div className="icon-glow-circle"></div>
              </div>
              
              <h3 className="principle-title">{principle.title}</h3>
              <p className="principle-description">{principle.description}</p>
              
              <div className="principle-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GuidingPrinciples
