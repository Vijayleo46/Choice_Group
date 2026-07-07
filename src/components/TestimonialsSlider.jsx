import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/testimonials-slider.css'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'Choice Canning has consistently delivered the highest quality shrimp products over the past 15 years. Their commitment to food safety and traceability is unmatched in the industry.',
    name: 'James Mitchell',
    role: 'VP Procurement',
    company: 'Atlantic Seafood Distributors, USA',
    type: 'International Buyer',
    icon: '🇺🇸',
  },
  {
    quote: 'The digital factory platform at Bapatla gave us unprecedented visibility into our supply chain. Real-time dashboards and batch traceability have transformed our partnership.',
    name: 'Hans Eriksson',
    role: 'Quality Director',
    company: 'Nordic Marine Foods, Sweden',
    type: 'Export Partner',
    icon: '🇪🇺',
  },
  {
    quote: 'After completing a BRC Grade A audit, I can confirm Choice Canning operates at a level that few processors in Asia can match. Their HACCP implementation is exemplary.',
    name: 'Dr. Sarah Chen',
    role: 'Lead Auditor',
    company: 'SGS International',
    type: 'Food Auditor',
    icon: '🔬',
  },
  {
    quote: 'We have been sourcing from Choice Canning for over two decades. Their reliability, consistency and willingness to innovate keep them ahead of every competitor we have evaluated.',
    name: 'Takeshi Yamamoto',
    role: 'Managing Director',
    company: 'Pacific Aqua Trading, Japan',
    type: 'Long-term Client',
    icon: '🇯🇵',
  },
  {
    quote: 'The sustainability initiatives at Bapatla — solar energy, zero liquid discharge, and eco packaging — align perfectly with our ESG procurement requirements.',
    name: 'Catherine Brooks',
    role: 'Sustainability Lead',
    company: 'GreenOcean Imports, Canada',
    type: 'Export Partner',
    icon: '🇨🇦',
  },
]

export default function TestimonialsSlider() {
  const sectionRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const goTo = (i) => setCurrent(i)
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length)
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const resetAutoplay = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 6000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ts-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.ts-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.ts-slider-wrap', {
        scrollTrigger: { trigger: '.ts-slider-wrap', start: 'top 85%', once: true },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.to('.ts-orb-1', { y: -28, x: 14, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.ts-orb-2', { y: 22, x: -16, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <section ref={sectionRef} id="testimonials-slider" className="ts-section">
      <div className="ts-bg">
        <div className="ts-orb ts-orb-1" />
        <div className="ts-orb ts-orb-2" />
        <div className="ts-grid" />
      </div>

      <div className="ts-inner">
        <div className="ts-header">
          <div className="ts-header-label">
            <span className="ts-header-dot" />
            Client Voices
          </div>
          <h2 className="ts-headline">
            What Our Partners<br />
            <span className="ts-headline-gold">Say About Us</span>
          </h2>
        </div>

        <div className="ts-slider-wrap">
          <div className="ts-card" key={current}>
            <div className="ts-card-bg" />
            <div className="ts-card-glow" />
            <div className="ts-card-border" />

            <div className="ts-quote-mark">❝</div>

            <blockquote className="ts-quote">{t.quote}</blockquote>

            <div className="ts-divider" />

            <div className="ts-author">
              <div className="ts-author-avatar">{t.icon}</div>
              <div className="ts-author-info">
                <div className="ts-author-name">{t.name}</div>
                <div className="ts-author-role">{t.role}</div>
                <div className="ts-author-company">{t.company}</div>
              </div>
              <div className="ts-author-type">{t.type}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="ts-controls">
            <button className="ts-arrow ts-arrow-prev" onClick={() => { prev(); resetAutoplay() }} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="ts-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`ts-dot${i === current ? ' ts-dot--active' : ''}`}
                  onClick={() => { goTo(i); resetAutoplay() }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className="ts-arrow ts-arrow-next" onClick={() => { next(); resetAutoplay() }} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
