import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PresidentsDesk = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  const paragraphs = [
    "The biggest asset of a child is his or her self-esteem; let us take the responsibility to protect it.",
    "Education is not merely the transfer of knowledge, but the transformation of hearts and minds. At The Choice School, we believe in nurturing every aspect of a child's development.",
    "Over three decades, we have witnessed countless young individuals bloom into responsible, thoughtful global citizens. This journey continues to inspire our commitment to excellence."
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait fade-in
      gsap.fromTo('.presidents-portrait',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.presidents-desk-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Quote reveal
      gsap.fromTo('.presidents-quote',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.presidents-desk-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Content paragraphs
      gsap.fromTo('.president-content p',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.presidents-desk-section',
            start: 'top 70%',
            markers: false
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="presidents-desk-section" ref={sectionRef}>
      <div className="container">
        <div className="presidents-grid">
          {/* Portrait Side */}
          <div className="presidents-portrait-side">
            <div className="presidents-portrait">
              <div className="portrait-image">
                <img 
                  src="/jose-thomas-2.jpg.png" 
                  alt="Jose Thomas - President, The Choice Foundation"
                  className="portrait-img"
                />
              </div>
              <div className="portrait-accent"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="presidents-content-side">
            {/* Quote Card */}
            <div className="presidents-quote luxury-card">
              <div className="quote-icon">"</div>
              <p className="quote-text">
                The biggest asset of a child is his or her self-esteem; let us take the responsibility to protect it.
              </p>
              <div className="quote-author">
                <p className="author-name">JOSE THOMAS</p>
                <p className="author-title">President – The Choice Foundation</p>
              </div>
              <div className="quote-accent"></div>
            </div>

            {/* Editorial Content */}
            <div className="president-content">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PresidentsDesk
