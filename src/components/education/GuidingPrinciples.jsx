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
      // Card entrance animation - from left
      gsap.fromTo('.principle-card',
        { opacity: 0, x: -100, y: 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
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
          {principles.map((principle, idx) => {
            const hasBg = idx === 0 || idx === 1 || idx === 2
            const bgImage = idx === 0 ? '/knowledge.jpg' : idx === 1 ? '/DSC_7389.jpg' : idx === 2 ? '/1H9A9006.jpg' : null
            const circleImg = bgImage
            const circleAlt = idx === 0 ? 'Knowledge' : idx === 1 ? 'Character' : 'Health'

            return (
              <div
                key={idx}
                className={`principle-card${hasBg ? ' principle-card--knowledge' : ''}`}
                style={hasBg ? {
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              >
                {hasBg && <div className="principle-card-overlay" />}

                <div className="principle-icon-wrapper">
                  <div className="principle-icon">
                    {hasBg ? (
                      <div className="knowledge-circle">
                        <img src={circleImg} alt={circleAlt} className="knowledge-circle-img" />
                      </div>
                    ) : null}
                  </div>
                  <div className="icon-glow-circle"></div>
                </div>

                <h3 className={`principle-title${hasBg ? ' principle-title--light' : ''}`}>
                  {principle.title}
                </h3>
                <p className={`principle-description${hasBg ? ' principle-description--light' : ''}`}>
                  {principle.description}
                </p>

                <div className="principle-accent"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GuidingPrinciples
