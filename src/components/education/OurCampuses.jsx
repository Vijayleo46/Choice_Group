import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const campuses = [
  {
    id: 0,
    number: '01',
    name: 'Choice School Kochi',
    tagline: 'Flagship Campus',
    description: 'Our flagship campus in Kochi, setting standards for excellence and innovation in education.',
    fullDescription: 'Established in 1991, Choice School Kochi stands as the cornerstone of our educational legacy. Spanning across a sprawling campus, it houses state-of-the-art laboratories, a world-class library, and modern sports facilities. The school has produced generations of leaders, innovators, and changemakers who have gone on to make their mark across the globe.',
    image: '/Screenshot 2026-06-24 104416.jpg',
    icon: '🏛️',
    highlights: ['CBSE Affiliated', '2000+ Students', 'Olympic-size Pool', 'Innovation Lab'],
  },
  {
    id: 1,
    number: '02',
    name: 'Choice School Thiruvalla',
    tagline: 'Southern Excellence',
    description: 'Nurturing young minds with the same commitment to holistic development and character building.',
    fullDescription: 'Choice School Thiruvalla brings the same gold-standard education to the heart of central Kerala. With a strong emphasis on both academics and extracurricular development, the campus fosters an environment where every student discovers their unique potential and pursues it with passion.',
    image: '/1H9A7464.jpg',
    icon: '🎓',
    highlights: ['ICSE Board', '1500+ Students', 'Arts Center', 'STEM Hub'],
  },
  {
    id: 2,
    number: '03',
    name: 'Choice School Kozhikode',
    tagline: 'Northern Beacon',
    description: 'Bringing quality education and transformative learning to the vibrant community of Kozhikode.',
    fullDescription: 'Nestled in the cultural capital of Kerala, Choice School Kozhikode blends academic rigour with the rich heritage of the region. The campus is designed to inspire curiosity and creativity, offering a diverse range of programs that prepare students for the challenges of a rapidly changing world.',
    image: '/1H9A8497-Edit.jpg',
    icon: '📚',
    highlights: ['CBSE Affiliated', '1200+ Students', 'Cultural Hub', 'Sports Academy'],
  },
  {
    id: 3,
    number: '04',
    name: 'Choice Kindergarden',
    tagline: 'Where It All Begins',
    description: 'Building strong foundations through joyful learning, meaningful play, and enriching experiences for every child.',
    fullDescription: 'Kindergarten is where the journey of lifelong learning begins. With a play-based, child-centered approach rooted in the IB framework, our kindergartens across Kerala create a nurturing environment that sparks curiosity, builds confidence, and lays the foundation for academic excellence.',
    image: '/kindergarden.jpg',
    icon: '😊',
    highlights: ['IB Programme', '8 Campuses', 'Play-Based Learning', 'Bilingual Curriculum'],
  }
]

const OurCampuses = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const flyingImgRef = useRef(null)   // the cloned image that flies
  const fullscreenRef = useRef(null)  // the fullscreen container
  const infoRef = useRef(null)        // info panel inside fullscreen
  const isAnimatingRef = useRef(false)
  const [activeCampus, setActiveCampus] = useState(null)
  const [showFullscreen, setShowFullscreen] = useState(false)

  // ── scroll-in stagger on mount ─────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.campus-card',
        { opacity: 0, y: 70, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.our-campuses-section',
            start: 'top 72%',
          }
        }
      )

      cardsRef.current.forEach(card => {
        if (!card) return
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          gsap.to(card, { rotationX: y * -8, rotationY: x * 8, duration: 0.3, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── close on scroll ────────────────────────────────────────────
  useEffect(() => {
    if (!showFullscreen) return
    const close = () => closeCampus()
    window.addEventListener('wheel', close, { passive: true })
    window.addEventListener('touchmove', close, { passive: true })
    return () => {
      window.removeEventListener('wheel', close)
      window.removeEventListener('touchmove', close)
    }
  }, [showFullscreen])

  // ── Escape key ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && showFullscreen) closeCampus() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showFullscreen])

  // ── OPEN: FLIP image from card → fullscreen ────────────────────
  const openCampus = (idx) => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    const card = cardsRef.current[idx]
    const imgEl = card.querySelector('.campus-image')
    const rect = imgEl.getBoundingClientRect()

    // create a flying clone positioned exactly over the card image
    const clone = document.createElement('div')
    clone.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      background-image: url(${encodeURI(campuses[idx].image)});
      background-size: cover;
      background-position: center;
      border-radius: 16px;
      z-index: 9000;
      pointer-events: none;
      will-change: transform, border-radius;
    `
    document.body.appendChild(clone)
    flyingImgRef.current = clone

    // fade other cards
    gsap.to(cardsRef.current.filter((_, i) => i !== idx), {
      opacity: 0.12, scale: 0.93, filter: 'blur(3px)',
      duration: 0.4, ease: 'power2.out'
    })

    // FLIP: animate clone from card rect → full viewport
    gsap.to(clone, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        // now show the real fullscreen div (with info) and remove clone
        setActiveCampus(idx)
        setShowFullscreen(true)
        // small delay so React renders fullscreen before we remove clone
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (flyingImgRef.current) {
              flyingImgRef.current.remove()
              flyingImgRef.current = null
            }
            // animate info panel in
            if (infoRef.current) {
              gsap.fromTo(infoRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
              )
            }
            gsap.fromTo('.fs-panel-child',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out' }
            )
            isAnimatingRef.current = false
          })
        })
      }
    })
  }

  // ── CLOSE: reverse FLIP fullscreen → card ─────────────────────
  const closeCampus = useCallback(() => {
    if (isAnimatingRef.current || activeCampus === null) return
    isAnimatingRef.current = true

    const idx = activeCampus
    const card = cardsRef.current[idx]
    const imgEl = card?.querySelector('.campus-image')
    const rect = imgEl?.getBoundingClientRect()

    // hide real fullscreen, create flying clone at full viewport
    const clone = document.createElement('div')
    clone.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-image: url(${encodeURI(campuses[idx].image)});
      background-size: cover;
      background-position: center;
      border-radius: 0;
      z-index: 9000;
      pointer-events: none;
      will-change: transform, border-radius;
    `
    document.body.appendChild(clone)

    // hide real fullscreen immediately
    setShowFullscreen(false)
    setActiveCampus(null)

    // FLIP reverse: clone full → card rect
    gsap.to(clone, {
      top: rect ? rect.top : 0,
      left: rect ? rect.left : 0,
      width: rect ? rect.width : 300,
      height: rect ? rect.height : 280,
      borderRadius: 16,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        clone.remove()
        // restore other cards
        gsap.to(cardsRef.current, {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 0.4, ease: 'power2.out'
        })
        isAnimatingRef.current = false
      }
    })
  }, [activeCampus])

  const campus = activeCampus !== null ? campuses[activeCampus] : null

  return (
    <section className="our-campuses-section" ref={sectionRef}>
      <div className="container">
        {/* section header */}
        <div className="section-header fade-up">
          <div className="section-label">OUR SCHOOLS</div>
          <h2 className="section-title">Excellence Across <em>Campuses</em></h2>
          <p className="section-desc">
            Four world-class institutions, one shared vision —<br />
            nurturing young minds to become global citizens.
          </p>
          <div className="section-divider">
            <span className="divider-line" />
            <span className="divider-dot" />
            <span className="divider-line" />
          </div>
        </div>

        {/* cards */}
        <div className="campuses-grid">
          {campuses.map((c, idx) => (
            <div
              key={c.id}
              className="campus-card"
              ref={el => cardsRef.current[idx] = el}
              style={{ perspective: '1000px' }}
              onClick={() => openCampus(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openCampus(idx)}
            >
              <div className="campus-number">{c.number}</div>
              <div className="campus-icon-badge">{c.icon}</div>
              <div
                className="campus-image"
                style={{
                  backgroundImage: `url(${encodeURI(c.image)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="campus-content">
                <h3 className="campus-name">{c.name}</h3>
                <p className="campus-description">{c.description}</p>
                <button className="btn-learn-more">
                  Learn More <span className="arrow-icon">→</span>
                </button>
              </div>
              <div className="campus-shimmer" />
            </div>
          ))}
        </div>

        {/* nav dots */}
        <div className="campuses-nav">
          <button className="nav-arrow">←</button>
          {campuses.map((_, i) => (
            <span key={i} className={`nav-dot${activeCampus === i ? ' active' : ''}`} />
          ))}
          <button className="nav-arrow">→</button>
        </div>

        <div className="scroll-hint">
          <span className="scroll-mouse" /><span>Scroll to explore</span>
        </div>
      </div>

      {/* ── FULLSCREEN VIEW ── */}
      {showFullscreen && campus && (
        <div className="campus-fullscreen" ref={fullscreenRef}>
          {/* background image */}
          <div
            className="fs-bg"
            style={{
              backgroundImage: `url(${encodeURI(campus.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* dark gradient over image */}
          <div className="fs-gradient" />

          {/* close button */}
          <button className="fs-close" onClick={closeCampus}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* scroll hint */}
          <div className="fs-scroll-hint">Scroll to close</div>

          {/* info panel — bottom of screen */}
          <div className="fs-info" ref={infoRef}>
            <p className="fs-tagline fs-panel-child">{campus.tagline}</p>
            <h2 className="fs-name fs-panel-child">{campus.name}</h2>
            <div className="fs-gold-bar fs-panel-child" />
            <p className="fs-desc fs-panel-child">{campus.fullDescription}</p>

            <div className="fs-highlights fs-panel-child">
              {campus.highlights.map((h, i) => (
                <span key={i} className="highlight-chip">{h}</span>
              ))}
            </div>

            <div className="fs-actions fs-panel-child">
              <button className="detail-btn-primary">
                Explore Campus
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="detail-btn-secondary" onClick={closeCampus}>
                ← Back to All
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default OurCampuses
