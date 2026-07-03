import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/bap-certifications.css'

gsap.registerPlugin(ScrollTrigger)

const ECOSYSTEM_NODES = [
  { label: 'Farms',     icon: '🌊', angle: 90  },
  { label: 'Factories', icon: '🏭', angle: 270 },
]

export default function BaplatlaCertifications() {
  const sectionRef  = useRef(null)
  const ringRef     = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [mousePos,    setMousePos]    = useState({ x: 0, y: 0 })

  /* ── Mouse parallax ── */
  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 24,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 16,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── GSAP ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.bap-label-tag', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })

      gsap.from('.bap-heading-word', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        opacity: 0, y: 48, rotateX: 28,
        stagger: 0.09, duration: 1.1, ease: 'power4.out', delay: 0.15,
      })

      gsap.from('.bap-subtitle', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        opacity: 0, y: 22, duration: 0.9, ease: 'power3.out', delay: 0.55,
      })

      gsap.from('.bap-ecosystem', {
        scrollTrigger: { trigger: '.bap-body', start: 'top 82%', once: true },
        opacity: 0, scale: 0.72,
        duration: 1.3, ease: 'power3.out', delay: 0.25,
      })

      gsap.from('.bap-eco-node', {
        scrollTrigger: { trigger: '.bap-body', start: 'top 78%', once: true },
        opacity: 0, scale: 0.55,
        stagger: 0.14, duration: 0.72, ease: 'back.out(2)', delay: 0.55,
      })

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotation: 360, duration: 44, repeat: -1, ease: 'none',
          transformOrigin: '190px 190px',
        })
      }

      gsap.fromTo('.bap-cert-img-wrapper',
        { opacity: 0, scale: 0.84, y: 90 },
        {
          scrollTrigger: {
            trigger: '.bap-body',
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.9,
          },
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power3.out',
        }
      )

      gsap.fromTo('.bap-video',
        { scale: 1.08 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'bottom top',
            scrub: 0.8,
          },
          scale: 1,
          ease: 'power1.out',
        }
      )

      gsap.from('.bap-bottom-left, .bap-bottom-right', {
        scrollTrigger: { trigger: '.bap-bottom', start: 'top 82%', once: true },
        opacity: 0, y: 28,
        stagger: 0.18, duration: 0.9, ease: 'power3.out',
      })

      gsap.to('.bap-orb-1', { y: -32, x: 18, duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.bap-orb-2', { y: 26, x: -22, duration: 9.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.bap-orb-3', { y: -18, x: 12, duration: 6.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 })

      gsap.utils.toArray('.bap-particle').forEach((p, i) => {
        gsap.to(p, {
          opacity: gsap.utils.random(0.6, 1),
          scale:   gsap.utils.random(1.2, 1.8),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nodeStyle = (angle) => {
    const rad = (angle * Math.PI) / 180
    const r   = 155
    return {
      left: `calc(50% + ${r * Math.cos(rad)}px - 58px)`,
      top:  `calc(50% + ${r * Math.sin(rad)}px - 58px)`,
    }
  }

  return (
    <section ref={sectionRef} id="bap-certifications" className="bap-cert-section">

      {/* ── Video Background ── */}
      <div className="bap-video-bg">
        <video autoPlay muted loop playsInline className="bap-video">
          <source src="/video_202606261445 (1).mp4" type="video/mp4" />
        </video>
        <div className="bap-video-overlay" />
      </div>

      {/* ── Ambient Background ── */}
      <div className="bap-bg">
        <div className="bap-orb bap-orb-1" />
        <div className="bap-orb bap-orb-2" />
        <div className="bap-orb bap-orb-3" />
        <div className="bap-grid-lines" />
        <div className="bap-vignette" />
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="bap-particle"
            style={{
              left:   `${(i * 37 + 7) % 100}%`,
              top:    `${(i * 53 + 13) % 100}%`,
              width:  `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      <div className="bap-inner">

        {/* ── Header ── */}
        <div className="bap-header">
          <div className="bap-label-tag">
            <span className="bap-label-dot" />
            Certifications
          </div>

          <h2 className="bap-heading">
            {['Certified', 'Excellence.'].map((w, i) => (
              <span key={i} className="bap-heading-word">{w}&nbsp;</span>
            ))}
            <br />
            {['Trusted', 'Globally.'].map((w, i) => (
              <span key={i + 10} className="bap-heading-word bap-heading-word--aqua">{w}&nbsp;</span>
            ))}
          </h2>

          <p className="bap-subtitle">
            BAP 4-Star Certified Sustainable Shrimp Producer with Diversified Facilities in India &amp; USA.
          </p>
        </div>

        {/* ── Body ── */}
        <div className="bap-body">

          {/* LEFT — Ecosystem */}
          <div className="bap-ecosystem-wrap">
            <div
              className="bap-ecosystem"
              style={{
                transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                transition: 'transform 0.08s linear',
              }}
            >
              <svg ref={ringRef} className="bap-ring-svg" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bapRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#b8922a" stopOpacity="0.9" />
                    <stop offset="50%"  stopColor="#d4af37" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#b8922a" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="bapGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <circle cx="190" cy="190" r="155" fill="none" stroke="url(#bapRingGrad)" strokeWidth="1.4" strokeDasharray="9 7" />
                <circle cx="190" cy="190" r="155" fill="none" stroke="rgba(184,146,42,0.1)" strokeWidth="14" />
                <circle cx="190" cy="190" r="88"  fill="none" stroke="rgba(184,146,42,0.07)" strokeWidth="1" />
                {ECOSYSTEM_NODES.map((n, i) => {
                  const rad = (n.angle * Math.PI) / 180
                  const r   = 155
                  return (
                    <line key={i}
                      x1="190" y1="190"
                      x2={190 + r * Math.cos(rad)}
                      y2={190 + r * Math.sin(rad)}
                      stroke={hoveredNode === i ? 'rgba(184,146,42,0.55)' : 'rgba(184,146,42,0.15)'}
                      strokeWidth="1.2"
                      filter="url(#bapGlow)"
                      style={{ transition: 'stroke 0.3s' }}
                    />
                  )
                })}
              </svg>

              <div className="bap-eco-center">
                <div className="bap-eco-ring bap-eco-ring--1" />
                <div className="bap-eco-ring bap-eco-ring--2" />
                <div className="bap-eco-center-content">
                  <div className="bap-eco-stars">★★★★</div>
                  <div className="bap-eco-title">BAP</div>
                  <div className="bap-eco-sub">4-Star</div>
                  <div className="bap-eco-badge-label">CERTIFIED</div>
                </div>
              </div>

              {ECOSYSTEM_NODES.map((node, i) => (
                <div
                  key={i}
                  className={`bap-eco-node${hoveredNode === i ? ' bap-eco-node--active' : ''}`}
                  style={nodeStyle(node.angle)}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="bap-eco-node-icon">{node.icon}</div>
                  <div className="bap-eco-node-label">{node.label}</div>
                  <div className="bap-eco-node-glow" />
                </div>
              ))}
            </div>

            <p className="bap-eco-caption">
              BAP certification covers the core pillars of responsible aquaculture
            </p>
          </div>

          {/* RIGHT — Certificate Image */}
          <div className="bap-cert-image-panel">
            <div className="bap-cert-image-header">
              <div className="bap-cert-image-label">
                <span className="bap-cert-image-dot" />
                Our Certifications
              </div>
              <p className="bap-cert-image-sub">
                Internationally recognised standards in food safety, sustainability &amp; ethical trade
              </p>
            </div>

            <div className="bap-cert-img-wrapper">
              <div className="bap-cert-img-glow" />
              <img
                src="/ChatGPT%20Image%20Jul%201,%202026,%2010_09_43%20AM.png"
                alt="Choice Group Certifications — BRC, HACCP, SGS, Global Seafood Alliance, BAP, MSC, UKAS, ASC, amfori BSCI"
                className="bap-cert-img"
              />
              <div className="bap-cert-img-overlay" />
            </div>

            <div className="bap-trust-row">
              {[
                { icon: '🏆' },
                { icon: '✅' },
                { icon: '⭐' },
                { icon: '🌊' },
                { icon: '🐟' },
                { icon: '🎖️' },
                { icon: '🌿' },
                { icon: '🤝' },
              ].map((t, i) => (
                <div key={i} className="bap-trust-badge">
                  <span className="bap-trust-icon">{t.icon}</span>
                </div>
              ))}
            </div>
          </div>

        </div>{/* /bap-body */}

        {/* ── Bottom Panel ── */}
        <div className="bap-bottom">
          <div className="bap-bottom-left">
            <div className="bap-bottom-award-icon">🏅</div>
            <p className="bap-bottom-text">
              Our certifications reflect our commitment to{' '}
              <strong>sustainability</strong>, food safety, <strong>quality</strong>{' '}
              and ethical practices across every step — from hatcheries to global seafood markets.
            </p>
          </div>
          <div className="bap-bottom-right">
            <button className="bap-cta-btn">
              <span className="bap-cta-label">Our Commitment</span>
              <svg className="bap-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="bap-cta-glow" />
            </button>
          </div>
        </div>

      </div>{/* /bap-inner */}
    </section>
  )
}
