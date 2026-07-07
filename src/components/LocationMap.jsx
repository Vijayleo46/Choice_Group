import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/location-map.css'

gsap.registerPlugin(ScrollTrigger)

const INFO_CARDS = [
  {
    icon: '📍',
    title: 'Factory Address',
    lines: ['Choice Canning Company', 'Bapatla, Guntur District', 'Andhra Pradesh 522101, India'],
  },
  {
    icon: '🧭',
    title: 'Directions',
    lines: ['NH-16 (Chennai-Kolkata Highway)', '6 km from Bapatla Town Centre', 'Well-connected by road & rail'],
  },
  {
    icon: '⚓',
    title: 'Nearest Port',
    lines: ['Krishnapatnam Port', '140 km · ~2.5 hrs drive', 'Major reefer terminal'],
  },
  {
    icon: '✈️',
    title: 'Nearest Airport',
    lines: ['Vijayawada Airport (VGA)', '110 km · ~2 hrs drive', 'Domestic & cargo flights'],
  },
]

export default function LocationMap() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lm-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.lm-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.lm-map-wrap', {
        scrollTrigger: { trigger: '.lm-map-wrap', start: 'top 85%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.lm-info-card', {
        scrollTrigger: { trigger: '.lm-info-grid', start: 'top 85%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="location-map" className="lm-section">
      <div className="lm-bg">
        <div className="lm-orb lm-orb-1" />
        <div className="lm-grid-lines" />
      </div>

      <div className="lm-inner">
        <div className="lm-header">
          <div className="lm-header-label">
            <span className="lm-header-dot" />
            Find Us
          </div>
          <h2 className="lm-headline">
            Factory<br />
            <span className="lm-headline-gold">Location</span>
          </h2>
          <p className="lm-subline">
            Strategically located in Bapatla, Andhra Pradesh — close to major ports and
            transportation corridors for efficient global export logistics.
          </p>
        </div>

        {/* Map embed */}
        <div className="lm-map-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30752.445!2d80.4576!3d15.9044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a90ae9c11e2d1%3A0xb1d6c3f77291e067!2sBapatla%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Choice Canning Company Factory Location - Bapatla, Andhra Pradesh"
            className="lm-iframe"
          />
          <div className="lm-map-overlay-label">
            <span className="lm-pin-pulse" />
            Choice Canning Company · Bapatla
          </div>
        </div>

        {/* Info cards */}
        <div className="lm-info-grid">
          {INFO_CARDS.map((card, i) => (
            <div key={i} className="lm-info-card">
              <div className="lm-info-bg" />
              <div className="lm-info-border" />
              <div className="lm-info-icon">{card.icon}</div>
              <h4 className="lm-info-title">{card.title}</h4>
              {card.lines.map((line, j) => (
                <div key={j} className="lm-info-line">{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
