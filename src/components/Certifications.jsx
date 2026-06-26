import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Data ─────────────────────────────────────── */
const CERTS = [
  {
    name: 'BRC Global Standards',
    abbr: 'BRC',
    category: 'Food Safety',
    color: '#00d4ff',
    icon: '🏆',
    desc: 'British Retail Consortium Global Food Safety Standard',
  },
  {
    name: 'HACCP Certified',
    abbr: 'HACCP',
    category: 'Food Safety',
    color: '#22c55e',
    icon: '✅',
    desc: 'Hazard Analysis & Critical Control Points System',
  },
  {
    name: 'SGS Certified',
    abbr: 'SGS',
    category: 'Quality',
    color: '#f59e0b',
    icon: '⭐',
    desc: "World\u2019s Leading Testing, Inspection & Certification",
  },
  {
    name: 'Global Seafood Alliance',
    abbr: 'GSA',
    category: 'Sustainability',
    color: '#06b6d4',
    icon: '🌊',
    desc: 'Advancing Responsible Seafood Practices Globally',
  },
  {
    name: 'BAP 4-Star Certified',
    abbr: 'BAP',
    category: 'Aquaculture',
    color: '#a78bfa',
    icon: '⭐⭐⭐⭐',
    desc: 'Best Aquaculture Practices — Highest 4-Star Rating',
    featured: true,
  },
  {
    name: 'MSC Certified',
    abbr: 'MSC',
    category: 'Sustainability',
    color: '#3b82f6',
    icon: '🐟',
    desc: 'Marine Stewardship Council Sustainable Seafood',
  },
  {
    name: 'UKAS Certified',
    abbr: 'UKAS',
    category: 'Accreditation',
    color: '#f472b6',
    icon: '🎖️',
    desc: 'UK Accreditation Service Product Certification',
  },
  {
    name: 'ASC Certified',
    abbr: 'ASC',
    category: 'Aquaculture',
    color: '#34d399',
    icon: '🌿',
    desc: 'Aquaculture Stewardship Council Responsible Farming',
  },
  {
    name: 'amfori BSCI',
    abbr: 'BSCI',
    category: 'Ethics',
    color: '#fb923c',
    icon: '🤝',
    desc: 'Business Social Compliance Initiative — Ethical Trade',
  },
]

const ECOSYSTEM_NODES = [
  { label: 'Hatcheries', icon: '🥚', pos: 'top',    angle: -90 },
  { label: 'Feed Mills',  icon: '🌾', pos: 'right',  angle: 0   },
  { label: 'Farms',       icon: '🌊', pos: 'bottom', angle: 90  },
  { label: 'Factories',   icon: '🏭', pos: 'left',   angle: 180 },
]

export default function Certifications() {
  const sectionRef   = useRef(null)
  const ringRef      = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [hoveredCert, setHoveredCert] = useState(null)
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 })

  /* ── Mouse parallax ── */
  useEffect(() => {
    const onMove = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 30,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── GSAP animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Label reveal */
      gsap.from('.cert-label-tag', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })

      /* Heading word-by-word */
      gsap.from('.cert-heading-word', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        opacity: 0, y: 40, rotateX: 25,
        stagger: 0.08, duration: 1, ease: 'power4.out',
        delay: 0.2,
      })

      /* Subtitle */
      gsap.from('.cert-subtitle', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', delay: 0.6,
      })

      /* Ecosystem circle */
      gsap.from('.cert-ecosystem', {
        scrollTrigger: { trigger: '.cert-body', start: 'top 80%', once: true },
        opacity: 0, scale: 0.75,
        duration: 1.2, ease: 'power3.out', delay: 0.3,
      })

      /* Node cards stagger */
      gsap.from('.eco-node', {
        scrollTrigger: { trigger: '.cert-body', start: 'top 75%', once: true },
        opacity: 0, scale: 0.6,
        stagger: 0.15, duration: 0.7, ease: 'back.out(2)', delay: 0.6,
      })

      /* Ring slow rotate */
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: 'none',
        })
      }

      /* Cert cards stagger from right */
      gsap.from('.cert-card', {
        scrollTrigger: { trigger: '.cert-grid', start: 'top 80%', once: true },
        opacity: 0, y: 40, scale: 0.9,
        stagger: 0.09, duration: 0.75, ease: 'power3.out', delay: 0.2,
      })

      /* Bottom panel */
      gsap.from('.cert-bottom-left, .cert-bottom-right', {
        scrollTrigger: { trigger: '.cert-bottom', start: 'top 80%', once: true },
        opacity: 0, y: 30,
        stagger: 0.2, duration: 0.9, ease: 'power3.out',
      })

      /* Ambient orbs float */
      gsap.to('.cert-orb-1', {
        y: -30, x: 15, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to('.cert-orb-2', {
        y: 25, x: -20, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
      })
      gsap.to('.cert-orb-3', {
        y: -20, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* Node position on the circle (r = 155px) */
  const nodeStyle = (angle) => {
    const rad = (angle * Math.PI) / 180
    const r   = 155
    return {
      left: `calc(50% + ${r * Math.cos(rad)}px - 58px)`,
      top:  `calc(50% + ${r * Math.sin(rad)}px - 58px)`,
    }
  }

  return (
    <section ref={sectionRef} id="certifications" className="cert-section">

      {/* ── Ambient Background ── */}
      <div className="cert-bg">
        <div className="cert-orb cert-orb-1" />
        <div className="cert-orb cert-orb-2" />
        <div className="cert-orb cert-orb-3" />
        <div className="cert-grid-lines" />
        <div className="cert-vignette" />
      </div>

      <div className="cert-inner">

        {/* ── Header ── */}
        <div className="cert-header">
          <div className="cert-label-tag">
            <span className="cert-label-dot" />
            Certifications
          </div>
          <h2 className="cert-heading">
            {'Certified Excellence.'.split(' ').map((w, i) => (
              <span key={i} className="cert-heading-word">{w}&nbsp;</span>
            ))}
            <br />
            {'Trusted Globally.'.split(' ').map((w, i) => (
              <span key={i + 10} className="cert-heading-word cert-heading-word--aqua">{w}&nbsp;</span>
            ))}
          </h2>
          <p className="cert-subtitle">
            BAP 4-Star Certified Sustainable Shrimp Producer with Diversified Facilities in India &amp; USA.
          </p>
        </div>

        {/* ── Body: Ecosystem + Grid ── */}
        <div className="cert-body">

          {/* LEFT — Circular Ecosystem */}
          <div className="cert-ecosystem-wrap">
            <div
              className="cert-ecosystem"
              style={{
                transform: `translate(${mousePos.x * 0.12}px, ${mousePos.y * 0.12}px)`,
              }}
            >
              {/* Outer ring (slow rotation) */}
              <svg
                ref={ringRef}
                className="eco-ring-svg"
                viewBox="0 0 380 380"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dashed orbit circle */}
                <circle
                  cx="190" cy="190" r="155"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="8 6"
                />
                {/* Glow orbit */}
                <circle
                  cx="190" cy="190" r="155"
                  fill="none"
                  stroke="rgba(0,212,255,0.15)"
                  strokeWidth="12"
                />
                {/* Inner ring */}
                <circle
                  cx="190" cy="190" r="90"
                  fill="none"
                  stroke="rgba(0,212,255,0.08)"
                  strokeWidth="1"
                />
                {/* Connecting lines from center to nodes */}
                {ECOSYSTEM_NODES.map((n, i) => {
                  const rad = (n.angle * Math.PI) / 180
                  const r   = 155
                  return (
                    <line
                      key={i}
                      x1="190" y1="190"
                      x2={190 + r * Math.cos(rad)}
                      y2={190 + r * Math.sin(rad)}
                      stroke={hoveredNode === i ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.12)'}
                      strokeWidth="1"
                      style={{ transition: 'stroke 0.3s' }}
                    />
                  )
                })}
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0.8" />
                    <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center BAP Badge */}
              <div className="eco-center">
                <div className="eco-center-ring" />
                <div className="eco-center-ring eco-center-ring--2" />
                <div className="eco-center-content">
                  <div className="eco-center-stars">★★★★</div>
                  <div className="eco-center-title">BAP</div>
                  <div className="eco-center-sub">4-Star Certified</div>
                  <div className="eco-center-badge">SUSTAINABLE</div>
                </div>
              </div>

              {/* Ecosystem Nodes */}
              {ECOSYSTEM_NODES.map((node, i) => (
                <div
                  key={i}
                  className={`eco-node ${hoveredNode === i ? 'eco-node--active' : ''}`}
                  style={nodeStyle(node.angle)}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="eco-node-icon">{node.icon}</div>
                  <div className="eco-node-label">{node.label}</div>
                  <div className="eco-node-glow" />
                </div>
              ))}
            </div>

            {/* Ecosystem caption */}
            <p className="cert-eco-caption">
              BAP certification covers all four pillars of responsible aquaculture
            </p>
          </div>

          {/* RIGHT — Cert Cards Grid */}
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <div
                key={i}
                className={`cert-card ${c.featured ? 'cert-card--featured' : ''} ${hoveredCert === i ? 'cert-card--hovered' : ''}`}
                style={{ '--cert-color': c.color }}
                onMouseEnter={() => setHoveredCert(i)}
                onMouseLeave={() => setHoveredCert(null)}
              >
                <div className="cert-card-glow" />
                <div className="cert-card-top">
                  <span className="cert-card-icon">{c.icon}</span>
                  <span className="cert-card-abbr" style={{ color: c.color }}>{c.abbr}</span>
                </div>
                <div className="cert-card-name">{c.name}</div>
                <div className="cert-card-desc">{c.desc}</div>
                <div className="cert-card-category" style={{ background: c.color + '22', color: c.color }}>
                  {c.category}
                </div>
                {c.featured && <div className="cert-card-crown">⭐ FEATURED</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Panel ── */}
        <div className="cert-bottom">
          <div className="cert-bottom-left">
            <div className="cert-bottom-award">
              <span className="cert-bottom-award-icon">🏅</span>
            </div>
            <p className="cert-bottom-text">
              Our certifications reflect our commitment to <strong>sustainability</strong>, food safety,{' '}
              <strong>quality</strong> and ethical practices across every step — from hatcheries to global seafood markets.
            </p>
          </div>
          <div className="cert-bottom-right">
            <button className="cert-cta-btn">
              <span>Our Commitment</span>
              <svg className="cert-cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="cert-cta-glow" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
