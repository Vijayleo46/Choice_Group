import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StudentExperience = () => {
  const sectionRef = useRef(null)

  const experiences = [
    { title: 'Sports', icon: '🏆' },
    { title: 'Music', icon: '🎵' },
    { title: 'Robotics', icon: '🤖' },
    { title: 'Performing Arts', icon: '🎭' },
    { title: 'Leadership', icon: '👥' },
    { title: 'STEM Labs', icon: '🔬' },
    { title: 'Community Service', icon: '🤝' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masonry entrance
      gsap.fromTo('.experience-tile',
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out',
          scrollTrigger: {
            trigger: '.student-experience-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Hover zoom effect
      document.querySelectorAll('.experience-tile').forEach(tile => {
        tile.addEventListener('mouseenter', function() {
          gsap.to(this.querySelector('.experience-image'), {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(this.querySelector('.experience-overlay'), {
            opacity: 0.8,
            duration: 0.4
          })
        })

        tile.addEventListener('mouseleave', function() {
          gsap.to(this.querySelector('.experience-image'), {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(this.querySelector('.experience-overlay'), {
            opacity: 0,
            duration: 0.4
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="student-experience-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Beyond Curriculum</div>
          <h2 className="section-title">Student <em>Experience</em></h2>
          <p className="section-desc">A vibrant ecosystem where students discover passions, build skills, and create memories.</p>
        </div>

        <div className="experience-masonry">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-tile">
              <div className="experience-image">
                <span className="experience-icon">{exp.icon}</span>
              </div>
              <div className="experience-overlay"></div>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudentExperience
