import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const josephotos = [
  '/jose-thomas-1.jpg.png',
  '/jose-thomas-2.jpg.png',
  '/jose-thomas-3.jpg.jpg',
  '/jose-thomas-4.jpg.png',
]

export default function Leadership() {
  const sectionRef   = useRef(null)
  const headerRef    = useRef(null)
  const featuredRef  = useRef(null)
  const slideRefs    = useRef([])
  const dotRefs      = useRef([])
  const [current, setCurrent] = useState(0)
  const intervalRef  = useRef(null)

  // Photo crossfade slideshow
  useEffect(() => {
    const switchTo = (idx) => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, { opacity: i === idx ? 1 : 0, duration: 1, ease: 'power2.inOut' })
      })
      dotRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, { scale: i === idx ? 1.5 : 1, opacity: i === idx ? 1 : 0.4, duration: 0.4 })
      })
    }
    switchTo(0)
    intervalRef.current = setInterval(() => {
      setCurrent(c => {
        const n = (c + 1) % josephotos.length
        switchTo(n)
        return n
      })
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const goTo = (idx) => {
    clearInterval(intervalRef.current)
    setCurrent(idx)
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { opacity: i === idx ? 1 : 0, duration: 0.8, ease: 'power2.inOut' })
    })
    dotRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, { scale: i === idx ? 1.5 : 1, opacity: i === idx ? 1 : 0.4, duration: 0.3 })
    })
  }

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 1, y: 30, duration: 0.8, ease: 'power3.out'
      })
      gsap.from(featuredRef.current, {
        scrollTrigger: { trigger: featuredRef.current, start: 'top 80%' },
        opacity: 1, y: 60, duration: 1, ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="leadership" className="leadership">
      <div className="leadership-inner">

        <div ref={headerRef} className="leadership-header">
          <div className="section-label">Our Leadership</div>
          <h2 className="section-title">
            Guiding with <span className="gold">Vision</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Meet the visionary whose leadership and experience drives the Choice Group towards new horizons.
          </p>
        </div>

        {/* Featured — Jose Thomas full width */}
        <div ref={featuredRef} className="leader-featured-wrap">

          {/* Photo slider side */}
          <div className="leader-photo-slider">
            {josephotos.map((src, i) => (
              <div
                key={i}
                ref={el => slideRefs.current[i] = el}
                className="leader-photo-slide"
                style={{ backgroundImage: `url("${src}")` }}
              />
            ))}

            {/* Gold overlay gradient */}
            <div className="leader-photo-overlay" />

            {/* Dot nav */}
            <div className="leader-photo-dots">
              {josephotos.map((_, i) => (
                <span
                  key={i}
                  ref={el => dotRefs.current[i] = el}
                  className="leader-photo-dot"
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>

          {/* Info side */}
          <div className="leader-featured-info">
            <span className="leader-title-badge">Chairman &amp; Managing Director</span>
            <h2 className="leader-featured-name">Jose Thomas</h2>
            <div className="leader-divider" />
            <p className="leader-featured-bio">
              With an unyielding commitment to quality and a visionary approach to business,
              Mr. Jose Thomas founded Choice Canning Co. in 1962 and has since steered the
              Choice Group through decades of transformative growth — from a small seafood
              processing unit to a diversified global conglomerate spanning Marine Exports,
              Foods, Logistics, Shipping, Construction, Education, and Technology.
            </p>
            <p className="leader-featured-bio" style={{ marginTop: '1rem' }}>
              Under his leadership, Choice became the <strong style={{ color: 'var(--gold-primary)' }}>#1 unbreaded shrimp brand in the USA</strong>,
              established operations in 5 countries, and built landmark institutions like
              The Choice School and JTPac Performing Arts Theatre.
            </p>

            <div className="leader-stats-row">
              <div className="leader-stat">
                <span className="leader-stat-num">60+</span>
                <span className="leader-stat-label">Years of Leadership</span>
              </div>
              <div className="leader-stat">
                <span className="leader-stat-num">5</span>
                <span className="leader-stat-label">Countries</span>
              </div>
              <div className="leader-stat">
                <span className="leader-stat-num">#1</span>
                <span className="leader-stat-label">USA Shrimp Export</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
