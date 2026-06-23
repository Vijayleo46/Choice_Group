import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OurCampuses = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const campuses = [
    {
      name: 'Choice School Kochi',
      description: 'Our flagship campus in Kochi, setting standards for excellence and innovation in education.',
      image: 'linear-gradient(135deg, rgba(29, 27, 58, 0.1) 0%, rgba(199, 160, 60, 0.1) 100%)'
    },
    {
      name: 'Choice School Thiruvalla',
      description: 'Nurturing young minds with the same commitment to holistic development and character building.',
      image: 'linear-gradient(135deg, rgba(199, 160, 60, 0.1) 0%, rgba(29, 27, 58, 0.1) 100%)'
    },
    {
      name: 'Choice School Kozhikode',
      description: 'Bringing quality education and transformative learning to the vibrant community of Kozhikode.',
      image: 'linear-gradient(135deg, rgba(29, 27, 58, 0.1) 0%, rgba(199, 160, 60, 0.1) 100%)'
    },
    {
      name: 'Choice IB School Kochi',
      description: 'Our premium International Baccalaureate program, preparing global leaders for tomorrow.',
      image: 'linear-gradient(135deg, rgba(199, 160, 60, 0.1) 0%, rgba(29, 27, 58, 0.1) 100%)'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for campus cards
      gsap.fromTo('.campus-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.our-campuses-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Hover effects with mouse move
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            
            gsap.to(card, {
              rotationX: (y - 0.5) * 10,
              rotationY: (x - 0.5) * 10,
              duration: 0.3,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="our-campuses-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Across India</div>
          <h2 className="section-title">Our <em>Campuses</em></h2>
          <p className="section-desc">Excellence replicated, innovation amplified across our premier campuses.</p>
        </div>

        <div className="campuses-grid">
          {campuses.map((campus, idx) => (
            <div
              key={idx}
              className="campus-card"
              ref={el => cardsRef.current[idx] = el}
              style={{ perspective: '1000px' }}
            >
              <div className="campus-image" style={{ background: campus.image }}></div>
              <div className="campus-content">
                <h3 className="campus-name">{campus.name}</h3>
                <p className="campus-description">{campus.description}</p>
                <button className="btn-explore">
                  Explore Campus
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <div className="campus-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurCampuses
