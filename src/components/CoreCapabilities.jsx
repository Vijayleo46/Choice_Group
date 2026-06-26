import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/core-capabilities.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    num: '01',
    icon: '🏭',
    title: 'Advanced Processing Excellence',
    desc: 'State-of-the-art automation and precision-driven manufacturing systems ensuring superior product consistency, operational efficiency and food safety.',
    color: '#00C6A7',
    tag: 'Automation',
  },
  {
    num: '02',
    icon: '🔗',
    title: 'Integrated Supply Chain',
    desc: 'A seamless ecosystem encompassing hatcheries, farms, feed mills, processing facilities and cold chain logistics.',
    color: '#3b82f6',
    tag: 'End-to-End',
  },
  {
    num: '03',
    icon: '🛡️',
    title: 'Quality Assurance Leadership',
    desc: 'Stringent quality control procedures, internationally recognised certifications and continuous monitoring systems.',
    color: '#f59e0b',
    tag: 'Certified',
  },
  {
    num: '04',
    icon: '🌱',
    title: 'Sustainability at Scale',
    desc: 'Responsible aquaculture practices and environmentally conscious operations supporting long-term ocean health and business growth.',
    color: '#22c55e',
    tag: 'Sustainable',
  },
  {
    num: '05',
    icon: '📡',
    title: 'End-to-End Traceability',
    desc: 'ERP-enabled production management, digital tracking and real-time operational visibility across every stage.',
    color: '#a78bfa',
    tag: 'Digital',
  },
  {
    num: '06',
    icon: '🌏',
    title: 'Global Market Readiness',
    desc: 'Decades of export expertise delivering premium seafood products to customers across North America, Europe and Asia.',
    color: '#f43f5e',
    tag: 'Export',
  },
]

const STATS = [
  { value: 70,      suffix: '+',    label: 'Years of Experience',          icon: '🏆' },
  { value: 140000,  suffix: '+',    label: 'Sq.ft Processing Infrastructure', icon: '🏗️' },
  { value: 70,      suffix: ' MT',  label: 'Daily Production Capacity',    icon: '⚙️' },
  { value: 100,     suffix: '%',    label: 'Traceability Commitment',       icon: '📡' },
]

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const start = () => {
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])
  return [count, start]
}

function StatCard({ stat, i }) {
  const [count, startCount] = useCountUp(stat.value)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 88%', once: true, onEnter: startCount,
    })
  }, [])

  const display = count >= 1000
    ? count.toLocaleString()
    : count

  return (
    <div ref={ref} className="cc-stat" style={{ '--i': i }}>
      <div className="cc-stat-icon">{stat.icon}</div>
      <div className="cc-stat-val">
        {display}<span className="cc-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="cc-stat-label">{stat.label}</div>
      <div className="cc-stat-shine" />
    </div>
  )
}

export default function CoreCapabilities() {
  const sectionRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  /* Mouse parallax */
  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return
      const r = sectionRef.current.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - r.left) / r.width  - 0.5) * 22,
        y: ((e.clientY - r.top)  / r.height - 0.5) * 14,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* GSAP */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Label */
      gsap.from('.cc-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })

      /* Heading lines */
      gsap.from('.cc-heading-line', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        opacity: 0, y: 52, skewY: 1.5,
        stagger: 0.1, duration: 1.1, ease: 'power4.out', delay: 0.1,
      })

      /* Subtitle + tagline */
      gsap.from('.cc-subtitle, .cc-tagline', {
        scrollTrigger: { trigger: '.cc-left', start: 'top 72%', once: true },
        opacity: 0, y: 26,
        stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.35,
      })

      /* CTA */
      gsap.from('.cc-cta-btn', {
        scrollTrigger: { trigger: '.cc-left', start: 'top 70%', once: true },
        opacity: 0, y: 18, scale: 0.94,
        duration: 0.75, ease: 'back.out(2)', delay: 0.6,
      })

      /* Cards stagger */
      gsap.from('.cc-card', {
        scrollTrigger: { trigger: '.cc-cards', start: 'top 82%', once: true },
        opacity: 0, y: 55, scale: 0.93,
        stagger: 0.1, duration: 0.88, ease: 'power3.out',
      })

      /* Stats */
      gsap.from('.cc-stat', {
        scrollTrigger: { trigger: '.cc-stats', start: 'top 86%', once: true },
        opacity: 0, y: 36, scale: 0.9,
        stagger: 0.09, duration: 0.8, ease: 'back.out(1.7)',
      })

      /* Orbs float */
      gsap.to('.cc-orb-1', { y: -30, x: 16,  duration: 8,  repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.cc-orb-2', { y:  22, x: -18, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 })
      gsap.to('.cc-orb-3', { y: -16, x: 10,  duration: 7,  repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 5 })

      /* Particles */
      gsap.utils.toArray('.cc-particle').forEach((p, i) => {
        gsap.to(p, {
          opacity: gsap.utils.random(0.5, 1),
          scale:   gsap.utils.random(1.3, 2.2),
          duration: gsap.utils.random(1.5, 3.5),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.22,
        })
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="core-capabilities" className="cc-section">

      {/* ── Background ── */}
      <div className="cc-bg" aria-hidden="true">
        <div className="cc-orb cc-orb-1" />
        <div className="cc-orb cc-orb-2" />
        <div className="cc-orb cc-orb-3" />
        <div className="cc-mesh" />
        <div className="cc-wave" />
        <div className="cc-vignette" />
        {/* Shrimp silhouette */}
        <svg className="cc-shrimp-deco" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 58 Q45 8 85 22 Q118 36 148 12" stroke="#00C6A7" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 65 Q55 18 90 30 Q122 42 150 20" stroke="#00C6A7" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="148" cy="12" r="5" fill="#00C6A7"/>
          <path d="M148 12 L155 6 M148 12 L156 14" stroke="#00C6A7" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {/* Particles */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} className="cc-particle" style={{
            left:   `${(i * 43 + 7) % 100}%`,
            top:    `${(i * 59 + 11) % 100}%`,
            width:  `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            opacity: 0.1,
          }} />
        ))}
      </div>

      <div className="cc-inner">

        {/* ════════ BODY — two column ════════ */}
        <div className="cc-body">

          {/* LEFT */}
          <div className="cc-left">
            <div className="cc-label">
              <span className="cc-label-dot" />
              Core Capabilities
            </div>

            <h2 className="cc-heading">
              <span className="cc-heading-line">Built for</span>
              <span className="cc-heading-line cc-heading-accent">Global Standards</span>
            </h2>

            <p className="cc-subtitle">
              For over seven decades, Choice Canning Company has continuously evolved its
              capabilities to meet the highest international expectations. Our integrated operations
              combine innovation, precision, sustainability, and advanced technology to deliver
              seafood solutions trusted by customers worldwide.
            </p>

            <p className="cc-tagline">
              "Engineered for Excellence. Trusted Worldwide."
            </p>

            <button className="cc-cta-btn">
              <span className="cc-cta-text">Explore Our Operations</span>
              <span className="cc-cta-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="cc-cta-glow" />
            </button>
          </div>

          {/* RIGHT — Cards */}
          <div className="cc-right">
            <div
              className="cc-cards"
              style={{
                transform: `translate(${mouse.x * 0.05}px, ${mouse.y * 0.05}px)`,
                transition: 'transform 0.12s linear',
              }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  className={`cc-card${hovered === i ? ' cc-card--on' : ''}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Top row */}
                  <div className="cc-card-top">
                    <span className="cc-card-num">{card.num}</span>
                    <span className="cc-card-tag">{card.tag}</span>
                  </div>

                  {/* Icon */}
                  <div className="cc-card-icon-wrap">
                    <span className="cc-card-icon">{card.icon}</span>
                    <div className="cc-card-icon-bg" />
                  </div>

                  <h3 className="cc-card-title">{card.title}</h3>
                  <p className="cc-card-desc">{card.desc}</p>

                  {/* Decorative elements */}
                  <div className="cc-card-bar" />
                  <div className="cc-card-corner" />
                  <div className="cc-card-shine" />
                  <div className="cc-card-glow-bg" />
                </div>
              ))}
            </div>
          </div>

        </div>{/* /cc-body */}

        {/* ════════ STATS ════════ */}
        <div className="cc-stats">
          {STATS.map((s, i) => <StatCard key={i} stat={s} i={i} />)}
        </div>

      </div>
    </section>
  )
}
