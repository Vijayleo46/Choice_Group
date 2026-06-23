import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VisionMission = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left card - slide from left
      gsap.fromTo('.vision-card',
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vision-mission-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
            markers: false
          }
        }
      )

      // Right card - slide from right
      gsap.fromTo('.mission-card',
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vision-mission-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
            markers: false
          }
        }
      )

      // Center icons floating
      gsap.to('.center-icon', {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2
      })

      // Glow effect
      gsap.to('.icon-glow', {
        opacity: 0.6,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="vision-mission-section" ref={sectionRef}>
      <div className="container">
        <div className="vision-mission-grid">
          {/* Left - Vision */}
          <div className="vision-card luxury-card">
            <div className="card-accent"></div>
            <h2 className="card-title">Vision</h2>
            <p className="card-text">
              At The Choice School, we envision a passionate learning community that nurtures curiosity, creativity and confidence while fostering a growth mindset in a caring environment.
            </p>
          </div>

          {/* Center Decorations */}
          <div className="vision-mission-center">
            <div className="center-decorations">
              <div className="center-icon">
                <span className="icon-glow"></span>
                <span className="icon-text">Knowledge</span>
              </div>
              <div className="center-icon">
                <span className="icon-glow"></span>
                <span className="icon-text">Character</span>
              </div>
              <div className="center-icon">
                <span className="icon-glow"></span>
                <span className="icon-text">Health</span>
              </div>
            </div>
          </div>

          {/* Right - Mission */}
          <div className="mission-card luxury-card">
            <div className="card-accent"></div>
            <h2 className="card-title">Mission</h2>
            <p className="card-text">
              Anchored in Knowledge, Character and Health (KCH), The Choice School empowers students to become responsible global citizens through inclusive and holistic learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission
