import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/legacy-section.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    num: '01',
    icon: '🤖',
    title: 'Advanced Automation',
    desc: 'State-of-the-art processing technologies ensuring efficiency, precision and consistency at every stage of production.',
    color: '#00C6A7',
  },
  {
    num: '02',
    icon: '🛡️',
    title: 'Quality Assurance',
    desc: 'Stringent food safety protocols and globally recognised certification standards maintained across all operations.',
    color: '#3b82f6',
  },
  {
    num: '03',
    icon: '🌱',
    title: 'Sustainable Aquaculture',
    desc: 'Responsible farming and environmentally conscious production practices protecting ocean ecosystems for future generations.',
    color: '#22c55e',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Industry Innovation',
    desc: 'Continuous investments in technology, research and process excellence to stay ahead in global seafood manufacturing.',
    color: '#a78bfa',
  },
]

const STATS = [
  { value: 70,   suffix: '+', label: 'Years of Expertise',           icon: '🏆' },
  { value: 24,   suffix: '/7', label: 'Quality Monitoring',          icon: '🔬' },
  { value: null, display: 'Global', label: 'Export Presence',        icon: '🌏' },
  { value: 100,  suffix: '%', label: 'Commitment to Sustainability',  icon: '🌱' },
]

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  const start = () => {
    if (target === null) return
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])
  return [count, start]
}

function StatCard({ stat, index }) {
  const [count, startCount] = useCountUp(stat.value)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: startCount,
    })
  }, [])

  return (
    <div ref={ref} className="leg-stat-card" style={{ '--leg-stat-delay': `${index * 0.12}s` }}>
      <div className="leg-stat-icon">{stat.icon}</div>
      <div className="leg-stat-value">
        {stat.display ?? count}
        <span className="leg-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="leg-stat-label">{stat.label}</div>
      <div className="leg-stat-glow" />
    </div>
  )
}

export default function LegacySection() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const timelineRef = useRef(null)
  const [cardHover, setCardHover] = useState(null)
  const [mousePos,  setMousePos]  = useState({ x: 0, y: 0 })

  /* Mouse parallax */
  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return
      const r = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - r.left)  / r.width  - 0.5) * 28,
        y: ((e.clientY - r.top)   / r.height - 0.5) * 18,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* GSAP */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Section label */
      gsap.from('.leg-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 22, duration: 0.8, ease: 'power3.out',
      })

      /* Heading lines */
      gsap.from('.leg-heading-line', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        opacity: 0, y: 55, skewY: 2,
        stagger: 0.12, duration: 1.1, ease: 'power4.out', delay: 0.15,
      })

      /* Subtitle + timeline badge */
      gsap.from('.leg-subtitle, .leg-timeline-badge', {
        scrollTrigger: { trigger: headingRef.current, start: 'top 70%', once: true },
        opacity: 0, y: 28,
        stagger: 0.18, duration: 0.95, ease: 'power3.out', delay: 0.4,
      })

      /* Timeline line draw */
      gsap.from('.leg-tl-line', {
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
        scaleX: 0, transformOrigin: 'left center',
        duration: 1.4, ease: 'power3.inOut', delay: 0.3,
      })

      /* CTA */
      gsap.from('.leg-cta-btn', {
        scrollTrigger: { trigger: headingRef.current, start: 'top 68%', once: true },
        opacity: 0, y: 20, scale: 0.95,
        duration: 0.8, ease: 'back.out(2)', delay: 0.65,
      })

      /* Feature cards stagger */
      gsap.from('.leg-card', {
        scrollTrigger: { trigger: '.leg-cards-grid', start: 'top 82%', once: true },
        opacity: 0, y: 50, scale: 0.94,
        stagger: 0.13, duration: 0.85, ease: 'power3.out', delay: 0.1,
      })

      /* Stats row */
      gsap.from('.leg-stat-card', {
        scrollTrigger: { trigger: '.leg-stats-row', start: 'top 84%', once: true },
        opacity: 0, y: 40, scale: 0.88,
        stagger: 0.1, duration: 0.8, ease: 'back.out(1.8)',
      })

      /* Ambient orbs float */
      gsap.to('.leg-orb-1', { y: -28, x: 14,  duration: 8,   repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.leg-orb-2', { y: 22,  x: -18, duration: 10,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.leg-orb-3', { y: -18, x: 10,  duration: 7,   repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 })

      /* Shrimp illustration gentle bob */
      gsap.to('.leg-shrimp-deco', {
        y: -14, rotation: 3, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

      /* Particle twinkle */
      gsap.utils.toArray('.leg-particle').forEach((p, i) => {
        gsap.to(p, {
          opacity: gsap.utils.random(0.5, 1),
          scale:   gsap.utils.random(1.2, 2),
          duration: gsap.utils.random(1.5, 3.5),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.25,
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="legacy" className="leg-section">

      {/* ── Background ── */}
      <div className="leg-bg">
        <div className="leg-orb leg-orb-1" />
        <div className="leg-orb leg-orb-2" />
        <div className="leg-orb leg-orb-3" />
        <div className="leg-mesh" />
        <div className="leg-wave-lines" />
        <div className="leg-vignette" />
        {/* Shrimp silhouette decoration */}
        <div className="leg-shrimp-deco" aria-hidden="true">
          <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" opacity="0.06">
            <path d="M10 45 Q30 10 60 20 Q90 30 110 15" stroke="#00C6A7" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M20 50 Q40 20 65 28 Q88 36 105 22" stroke="#00C6A7" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <circle cx="110" cy="15" r="4" fill="#00C6A7"/>
          </svg>
        </div>
        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="leg-particle" style={{
            left:   `${(i * 41 + 5) % 100}%`,
            top:    `${(i * 57 + 9) % 100}%`,
            width:  `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            opacity: 0.12,
          }} />
        ))}
      </div>

      <div className="leg-inner">

        {/* ════════════════════════════════
            MAIN BODY — two column
        ════════════════════════════════ */}
        <div className="leg-body">

          {/* LEFT ── Text Column */}
          <div className="leg-left" ref={headingRef}>

            {/* Label */}
            <div className="leg-label">
              <span className="leg-label-dot" />
              Legacy of Excellence
            </div>

            {/* Heading */}
            <h2 className="leg-heading" ref={headingRef}>
              <span className="leg-heading-line">70 Years of</span>
              <span className="leg-heading-line leg-heading-line--accent">Sustainable Shrimp</span>
              <span className="leg-heading-line">Processing Leadership</span>
            </h2>

            {/* Subtitle */}
            <p className="leg-subtitle">
              Choice Canning Company has been a pioneer in sustainable aquaculture and shrimp
              processing for over seven decades. Through state-of-the-art automation, rigorous
              quality assurance systems, and industry-leading innovation, the company continues
              to set new benchmarks in responsible seafood manufacturing and global excellence.
            </p>

            {/* Timeline Badge */}
            <div className="leg-timeline-badge" ref={timelineRef}>
              <div className="leg-tl-node leg-tl-node--start">
                <span className="leg-tl-year">1956</span>
                <span className="leg-tl-dot" />
              </div>
              <div className="leg-tl-track">
                <div className="leg-tl-line" />
                <div className="leg-tl-progress" />
              </div>
              <div className="leg-tl-node leg-tl-node--end">
                <span className="leg-tl-dot leg-tl-dot--active" />
                <span className="leg-tl-year leg-tl-year--today">Today</span>
              </div>
              <div className="leg-tl-tagline">
                Seven Decades of Trust, Innovation &amp; Sustainability
              </div>
            </div>

            {/* CTA */}
            <button className="leg-cta-btn">
              <span className="leg-cta-text">Explore Our Journey</span>
              <span className="leg-cta-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="leg-cta-glow" />
            </button>

          </div>{/* /leg-left */}

          {/* RIGHT ── Feature Cards */}
          <div className="leg-right">
            <div
              className="leg-cards-grid"
              style={{ transform: `translate(${mousePos.x * 0.06}px, ${mousePos.y * 0.06}px)`, transition: 'transform 0.1s linear' }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  className={`leg-card${cardHover === i ? ' leg-card--hovered' : ''}`}
                  style={{ '--card-color': card.color, '--card-delay': `${i * 0.08}s` }}
                  onMouseEnter={() => setCardHover(i)}
                  onMouseLeave={() => setCardHover(null)}
                >
                  <div className="leg-card-glow" />
                  <div className="leg-card-top">
                    <span className="leg-card-num">{card.num}</span>
                    <span className="leg-card-icon">{card.icon}</span>
                  </div>
                  <h3 className="leg-card-title">{card.title}</h3>
                  <p className="leg-card-desc">{card.desc}</p>
                  <div className="leg-card-bar" />
                  <div className="leg-card-shine" />
                </div>
              ))}
            </div>
          </div>{/* /leg-right */}

        </div>{/* /leg-body */}

        {/* ════════════════════════════════
            STATISTICS ROW
        ════════════════════════════════ */}
        <div className="leg-stats-row">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

      </div>{/* /leg-inner */}
    </section>
  )
}
