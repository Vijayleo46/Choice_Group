import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const EducationHero = () => {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const descRef = useRef(null)
  const statsRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.hero-bg-video', {
        y: (index, target) => {
          return gsap.getProperty(target, 'clientHeight') * 0.3
        },
        scrollTrigger: {
          trigger: '.edu-hero',
          scrub: 1,
          markers: false
        }
      })

      // Headline fade-up
      gsap.fromTo('.hero-headline', 
        { opacity: 1, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out'
        }
      )

      // Subheadline
      gsap.fromTo('.hero-subheadline',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out'
        }
      )

      // Description
      gsap.fromTo('.hero-description',
        { opacity: 0, y: 30, color: '#ffffff' },
        {
          opacity: 1,
          y: 0,
          color: '#000000',
          duration: 0.9,
          delay: 0.6,
          ease: 'power3.out'
        }
      )

      // Stats counters
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          onStart: () => {
            animateCounters()
          }
        }
      )

      // Buttons
      gsap.fromTo('.hero-buttons button',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.2,
          ease: 'power3.out',
          stagger: 0.15
        }
      )

      // Floating particles
      gsap.to('.floating-particle', {
        y: -30,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const animateCounters = () => {
    const counters = [
      { el: '.stat-year', end: 1991 },
      { el: '.stat-schools', end: 4 },
      { el: '.stat-kg', end: 8 },
      { el: '.stat-years', end: 30 },
      { el: '.stat-students', end: 2000 }
    ]

    counters.forEach(counter => {
      gsap.fromTo(counter.el,
        { innerText: 0 },
        {
          innerText: counter.end,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            if (counter.el === '.stat-year') {
              this.targets()[0].innerText = Math.floor(gsap.getProperty(counter.el, 'innerText'))
            } else if (counter.el === '.stat-years') {
              this.targets()[0].innerText = Math.floor(gsap.getProperty(counter.el, 'innerText')) + '+'
            } else {
              this.targets()[0].innerText = Math.floor(gsap.getProperty(counter.el, 'innerText'))
            }
          }
        }
      )
    })
  }

  return (
    <section className="edu-hero" ref={heroRef}>
      <div className="hero-bg-video">
        <img className="hero-bg-image" src="/choice-kochi.jpg" alt="Choice School Kochi" />
        <video 
          className="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="/school-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-headline">The Choice School</h1>
        <p className="hero-subheadline">Three Decades of Transforming Young Minds into Global Citizens</p>
        
        <p className="hero-description">
          For over three decades, The Choice School has made an indelible mark in meaningful education. Since 1991, Choice has spread its wings across Kochi, Kozhikode and Thiruvalla, nurturing generations of learners through innovation, excellence and holistic development.
        </p>

        {/* Stats */}
        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <div className="stat-value stat-year">1991</div>
            <div className="stat-label">Founded</div>
          </div>
          <div className="stat-item">
            <div className="stat-value stat-schools">4</div>
            <div className="stat-label">Premier Schools</div>
          </div>
          <div className="stat-item">
            <div className="stat-value stat-kg">8</div>
            <div className="stat-label">Kindergartens</div>
          </div>
          <div className="stat-item">
            <div className="stat-value stat-years">30</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
          <div className="stat-item">
            <div className="stat-value stat-students">2000</div>
            <div className="stat-label">Students</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons" ref={buttonsRef}>
          <button className="btn btn-primary">Explore Campuses</button>
          <button className="btn btn-secondary">Admissions</button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
      </div>
    </section>
  )
}

export default EducationHero
