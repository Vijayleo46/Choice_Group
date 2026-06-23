import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EducationFooterCTA = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo('.footer-cta-headline',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-cta-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Subheadline
      gsap.fromTo('.footer-cta-subheadline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-cta-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Buttons
      gsap.fromTo('.footer-cta-buttons button',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-cta-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Animated background particles
      gsap.to('.footer-particle',
        {
          y: -50,
          opacity: 0.3,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.3
        }
      )

      // Gradient animation
      gsap.to('.footer-bg-gradient',
        {
          backgroundPosition: '200% center',
          duration: 8,
          repeat: -1,
          ease: 'sine.inOut'
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="footer-cta-section" ref={sectionRef}>
      <div className="footer-bg-gradient"></div>
      
      <div className="container footer-cta-container">
        <div className="footer-cta-content">
          <h2 className="footer-cta-headline">Empowering Future Leaders Since 1991</h2>
          <p className="footer-cta-subheadline">
            Discover a learning environment where knowledge, character and wellbeing inspire lifelong success.
          </p>

          <div className="footer-cta-buttons">
            <button className="btn btn-primary btn-large">Apply for Admission</button>
            <button className="btn btn-secondary btn-large">Schedule a Campus Visit</button>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles footer-particles">
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
        <div className="footer-particle"></div>
      </div>
    </section>
  )
}

export default EducationFooterCTA
