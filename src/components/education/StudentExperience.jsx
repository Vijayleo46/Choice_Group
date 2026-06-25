import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  { title: 'Sports',            tag: 'Athletics',   desc: 'Where champions are made',        image: '/DSC_8091.jpg' },
  { title: 'Music',             tag: 'Arts',        desc: 'Rhythm that shapes the soul',     image: '/1H9A8644.jpg' },
  { title: 'Robotics',          tag: 'Technology',  desc: 'Building tomorrow, today',        image: '/DSC_8662.jpg' },
  { title: 'Performing Arts',   tag: 'Stage',       desc: 'Creativity without boundaries',   image: '/DSC_6620.jpg' },
  { title: 'Leadership',        tag: 'Growth',      desc: 'Lead, inspire, transform',        image: '/DSC_8542.jpg' },
  { title: 'STEM Labs',         tag: 'Science',     desc: 'Curious minds, bold discoveries', image: '/DSC_8770.jpg' },
  { title: 'Community Service', tag: 'Impact',      desc: 'Giving back, moving forward',     image: '/02WorkWithUs.jpg' },
]

// duplicate for seamless loop
const marqueeItems = [...experiences, ...experiences]

const StudentExperience = () => {
  const sectionRef  = useRef(null)
  const trackRef    = useRef(null)
  const tweenRef    = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // wait one frame so widths are painted
    const init = () => {
      const totalW = track.scrollWidth / 2   // half = one set of items

      // start from x:0, animate to -totalW, then seamlessly repeat
      gsap.set(track, { x: 0 })

      tweenRef.current = gsap.to(track, {
        x: -totalW,
        duration: 28,          // speed — lower = faster
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(
            x => parseFloat(x) % totalW   // keeps it looping perfectly
          )
        }
      })

      // slow down on scroll (parallax feel)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          if (tweenRef.current) {
            // velocity: faster when scrolling, normal when stopped
            tweenRef.current.timeScale(1 + self.getVelocity() / 1800)
          }
        }
      })
    }

    requestAnimationFrame(init)

    // hover pause
    const pause  = () => tweenRef.current?.pause()
    const resume = () => tweenRef.current?.resume()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)

    return () => {
      tweenRef.current?.kill()
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
    }
  }, [])

  // individual card hover — bg zoom + content lift
  const handleEnter = e => {
    const card = e.currentTarget
    gsap.to(card.querySelector('.se-card-bg'), {
      scale: 1.08, duration: 0.55, ease: 'power2.out', overwrite: 'auto'
    })
    gsap.to(card.querySelector('.se-card-content'), {
      y: -8, duration: 0.4, ease: 'power2.out', overwrite: 'auto'
    })
    gsap.to(card.querySelector('.se-card-desc'), {
      opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto'
    })
  }

  const handleLeave = e => {
    const card = e.currentTarget
    gsap.to(card.querySelector('.se-card-bg'), {
      scale: 1, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto'
    })
    gsap.to(card.querySelector('.se-card-content'), {
      y: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto'
    })
    gsap.to(card.querySelector('.se-card-desc'), {
      opacity: 0, y: 6, duration: 0.3, ease: 'power2.in', overwrite: 'auto'
    })
  }

  return (
    <section className="student-experience-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Beyond Curriculum</div>
          <h2 className="section-title">Student <em>Experience</em></h2>
          <p className="section-desc">
            A vibrant ecosystem where students discover passions,<br />
            build skills, and create memories.
          </p>
        </div>
      </div>

      {/* full-width marquee — outside container so it bleeds edge to edge */}
      <div className="se-marquee-outer">
        <div className="se-marquee-track" ref={trackRef}>
          {marqueeItems.map((exp, idx) => (
            <div
              key={idx}
              className="se-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {/* bg photo */}
              <div
                className="se-card-bg"
                style={{
                  backgroundImage:    `url(${encodeURI(exp.image)})`,
                  backgroundSize:     'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* gradient */}
              <div className="se-card-overlay" />
              {/* text */}
              <div className="se-card-content">
                <span className="se-card-tag">{exp.tag}</span>
                <h3 className="se-card-title">{exp.title}</h3>
                <p className="se-card-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudentExperience
