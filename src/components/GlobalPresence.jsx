import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


/* ── Country data ─────────────────────────────── */
const COUNTRIES = [
  {
    id: 'india',
    flag: '🇮🇳',
    label: 'India — HQ',
    city: 'Kochi, Kerala',
    role: 'Global Headquarters',
    detail: 'Marine exports, logistics, education, construction & performing arts',
    color: '#C49E3F',
    glowColor: 'rgba(196,158,63,0.7)',
    // Kochi, Kerala — calibrated to pexels map image
    cx: 718, cy: 248,
    paths: [],
  },
  {
    id: 'usa',
    flag: '🇺🇸',
    label: 'USA',
    city: 'New Jersey',
    role: 'Shrimp Exports',
    detail: '#1 unbreaded shrimp brand · 46+ Shop Rite outlets',
    color: '#4A90D9',
    glowColor: 'rgba(74,144,217,0.7)',
    // New Jersey — calibrated to pexels map image
    cx: 250, cy: 178,
    paths: [],
  },
  {
    id: 'canada',
    flag: '🇨🇦',
    label: 'Canada',
    city: 'Ontario',
    role: 'Marine Distribution',
    detail: 'Choice Canning Co. — seafood distribution across Canada',
    color: '#E05252',
    glowColor: 'rgba(224,82,82,0.7)',
    // Ontario, Canada — calibrated to pexels map image
    cx: 222, cy: 150,
    paths: [],
  },
  {
    id: 'japan',
    flag: '🇯🇵',
    label: 'Japan',
    city: 'Tokyo',
    role: 'Seafood Market',
    detail: 'Premium seafood exports & marine product distribution',
    color: '#E05C7D',
    glowColor: 'rgba(224,92,125,0.7)',
    // Tokyo — calibrated to pexels map image
    cx: 872, cy: 185,
    paths: [],
  },
  {
    id: 'korea',
    flag: '🇰🇷',
    label: 'South Korea',
    city: 'Seoul',
    role: 'Logistics Hub',
    detail: 'S.India agent of Hyundai Merchant Marine (HMM)',
    color: '#7E57C2',
    glowColor: 'rgba(126,87,194,0.7)',
    // Seoul — calibrated to pexels map image
    cx: 848, cy: 178,
    paths: [],
  },
]

/* Trade route connection lines (HQ India → each country) */
const ROUTES = [
  { id: 'r-usa',    d: 'M 718,248 Q 480,80 250,178',   country: 'usa' },
  { id: 'r-canada', d: 'M 718,248 Q 460,50 222,150',   country: 'canada' },
  { id: 'r-japan',  d: 'M 718,248 Q 800,140 872,185',  country: 'japan' },
  { id: 'r-korea',  d: 'M 718,248 Q 785,160 848,178',  country: 'korea' },
]

/* Simplified continent shapes */
const CONTINENTS = [
  // North America
  'M 68,58 L 270,52 L 290,80 L 283,110 L 260,135 L 230,185 L 195,205 L 160,212 L 125,205 L 95,185 L 68,155 L 62,120 Z',
  // South America
  'M 165,240 L 248,230 L 265,270 L 258,330 L 232,390 L 200,420 L 173,400 L 152,360 L 148,305 L 152,265 Z',
  // Europe
  'M 438,55 L 525,50 L 545,75 L 535,100 L 510,115 L 480,122 L 452,112 L 435,90 Z',
  // Africa
  'M 448,128 L 535,118 L 562,148 L 558,200 L 542,258 L 512,312 L 480,332 L 458,310 L 442,268 L 435,208 L 438,160 Z',
  // Asia (main body, excl. India subcontinent)
  'M 535,48 L 755,42 L 825,68 L 842,98 L 820,130 L 788,150 L 750,160 L 698,152 L 648,142 L 600,138 L 558,128 L 532,108 L 528,82 Z',
  // Australia
  'M 758,288 L 872,278 L 892,318 L 882,358 L 850,380 L 808,375 L 772,348 L 752,318 Z',
]

export default function GlobalPresence() {
  const sectionRef  = useRef(null)
  const svgRef      = useRef(null)
  const headerRef   = useRef(null)
  const cardsRef    = useRef(null)
  const routeRefs   = useRef({})
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  /* ── Scroll-triggered GSAP animations ─────── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. Header fade-up */
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      })

      /* 2. SVG map scale-in */
      gsap.from(svgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        opacity: 0, scale: 0.92, duration: 1.3, ease: 'power3.out',
      })

      /* 3. Country glow — stagger on scroll enter */
      COUNTRIES.forEach((c, i) => {
        const pathEls = svgRef.current?.querySelectorAll(`[data-country="${c.id}"]`)
        if (!pathEls) return
        gsap.from(pathEls, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
          opacity: 0, scale: 0.8, transformOrigin: 'center center',
          duration: 0.7, delay: 0.3 + i * 0.18, ease: 'back.out(2)',
        })
        /* Continuous idle pulse glow */
        gsap.to(pathEls, {
          filter: `drop-shadow(0 0 6px ${c.glowColor}) drop-shadow(0 0 12px ${c.glowColor})`,
          duration: 1.6 + i * 0.2,
          repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })

      /* 4. Route line draw-on animation */
      const routeEls = svgRef.current?.querySelectorAll('.trade-route')
      if (routeEls) {
        routeEls.forEach((el, i) => {
          const len = el.getTotalLength?.() ?? 600
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(el, {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
            strokeDashoffset: 0,
            duration: 2, delay: 0.8 + i * 0.35, ease: 'power2.inOut',
          })
        })
      }

      /* 5. Dot markers pop-in */
      const dots = svgRef.current?.querySelectorAll('.country-dot')
      if (dots) {
        gsap.from(dots, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
          scale: 0, transformOrigin: 'center center',
          duration: 0.5, stagger: 0.15, delay: 1.2, ease: 'back.out(3)',
        })
      }

      /* 6. Cards stagger */
      gsap.from(cardsRef.current?.children, {
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        opacity: 0, x: 40, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── Hover / active glow on country ─────── */
  const handleCountryEnter = (id) => setHovered(id)
  const handleCountryLeave = () => setHovered(null)
  const handleCountryClick = (country) => {
    setActive(prev => prev?.id === country.id ? null : country)
  }

  const getPathFill = (c) => {
    const isActive  = active?.id  === c.id
    const isHovered = hovered === c.id
    if (isActive)  return c.color
    if (isHovered) return c.color + 'cc'
    return c.color + '55'
  }

  const getPathFilter = (c) => {
    const isActive  = active?.id  === c.id
    const isHovered = hovered === c.id
    if (isActive)  return `drop-shadow(0 0 14px ${c.glowColor}) drop-shadow(0 0 28px ${c.glowColor})`
    if (isHovered) return `drop-shadow(0 0 10px ${c.glowColor})`
    return undefined
  }

  return (
    <section ref={sectionRef} id="global" className="global">
      <div className="global-inner-v2">

        {/* ── Header ── */}
        <div ref={headerRef} className="global-header-v2">
          <div className="section-label">Global Presence</div>
          <h2 className="section-title">
            Connecting <span className="gold">Continents</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto', maxWidth: 580 }}>
            From our headquarters in Kochi, we orchestrate a global operation spanning 5 countries
            across 3 continents — exporting seafood, managing logistics, and building futures.
          </p>
        </div>

        {/* ── Map + Cards layout ── */}
        <div className="global-layout-v2">

          {/* SVG Map */}
          <div className="global-map-v2" style={{ position: 'relative' }}>
            {/* World Map Photo Background - pexels */}
            <img
              src="/pexels-tima-miroshnichenko-5725589.jpg"
              alt="World Map"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                opacity: 0.22,
                pointerEvents: 'none',
                filter: 'sepia(0.4) hue-rotate(20deg) saturate(1.5) brightness(0.65)',
                borderRadius: 'var(--radius-lg)',
                zIndex: 0,
              }}
            />
            <svg
              ref={svgRef}
              viewBox="0 0 1000 500"
              xmlns="http://www.w3.org/2000/svg"
              className="world-svg-v2"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <defs>
                {COUNTRIES.map(c => (
                  <radialGradient key={c.id} id={`glow-${c.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={c.color} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={c.color} stopOpacity="0.3" />
                  </radialGradient>
                ))}
                <filter id="blur-soft">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>



              {/* Trade route curves */}
              {ROUTES.map(r => {
                const country = COUNTRIES.find(c => c.id === r.country)
                const isActive  = active?.id  === r.country
                const isHovered = hovered === r.country
                return (
                  <path
                    key={r.id}
                    className="trade-route"
                    d={r.d}
                    stroke={isActive ? country.color : isHovered ? country.color + 'bb' : 'rgba(196,158,63,0.35)'}
                    strokeWidth={isActive ? 2 : 1.2}
                    fill="none"
                    strokeLinecap="round"
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                )
              })}

              {/* Country location halos */}
              {COUNTRIES.map(c => (
                <g
                  key={c.id}
                  style={{ cursor: 'pointer', transition: 'filter 0.3s' }}
                  filter={getPathFilter(c) ?? undefined}
                  onMouseEnter={() => handleCountryEnter(c.id)}
                  onMouseLeave={handleCountryLeave}
                  onClick={() => handleCountryClick(c)}
                >
                  <circle
                    data-country={c.id}
                    cx={c.cx}
                    cy={c.cy}
                    r={active?.id === c.id ? 25 : 18}
                    fill={getPathFill(c)}
                    stroke={c.color}
                    strokeWidth={active?.id === c.id ? 2 : 1}
                    style={{ transition: 'fill 0.3s, stroke-width 0.3s, r 0.3s' }}
                  />
                </g>
              ))}

              {/* Animated dots + labels at each country center */}
              {COUNTRIES.map(c => {
                const isActive  = active?.id  === c.id
                const isHovered = hovered === c.id
                return (
                  <g key={`dot-${c.id}`}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleCountryEnter(c.id)}
                    onMouseLeave={handleCountryLeave}
                    onClick={() => handleCountryClick(c)}
                  >
                    {/* Pulse rings */}
                    {(isActive || isHovered) && (<>
                      <circle cx={c.cx} cy={c.cy} r="22" fill="none"
                        stroke={c.color} strokeWidth="1" opacity="0.5"
                        style={{ animation: 'svgPulse 1.5s ease-out infinite' }} />
                      <circle cx={c.cx} cy={c.cy} r="34" fill="none"
                        stroke={c.color} strokeWidth="0.7" opacity="0.3"
                        style={{ animation: 'svgPulse 1.5s ease-out 0.5s infinite' }} />
                    </>)}

                    {/* Core dot */}
                    <circle
                      className="country-dot"
                      cx={c.cx} cy={c.cy}
                      r={c.id === 'india' ? 9 : 7}
                      fill={c.color}
                      stroke="#fff"
                      strokeWidth={c.id === 'india' ? 2.5 : 1.5}
                      style={{
                        filter: `drop-shadow(0 0 ${isActive ? 12 : 6}px ${c.glowColor})`,
                        transition: 'r 0.2s, filter 0.3s',
                      }}
                    />

                    {/* Tooltip label */}
                    {(isActive || isHovered) && (
                      <foreignObject
                        x={c.cx + (c.id === 'japan' || c.id === 'korea' ? -130 : 16)}
                        y={c.cy - 28}
                        width="120" height="60"
                        style={{ overflow: 'visible' }}
                      >
                        <div className="map-tooltip-v2">
                          <span className="map-tooltip-flag">{c.flag}</span>
                          <span className="map-tooltip-name">{c.label}</span>
                          <span className="map-tooltip-role">{c.role}</span>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                )
              })}

              {/* HQ star marker */}
              <text x="718" y="238" textAnchor="middle"
                fontSize="12" fill="#C49E3F"
                style={{ filter: 'drop-shadow(0 0 4px rgba(196,158,63,0.8))' }}
              >★</text>
            </svg>

            {/* Map legend */}
            <div className="map-legend">
              {COUNTRIES.map(c => (
                <button
                  key={c.id}
                  className={`map-legend-item${active?.id === c.id ? ' active' : ''}`}
                  style={{ '--legend-color': c.color }}
                  onClick={() => handleCountryClick(c)}
                  onMouseEnter={() => handleCountryEnter(c.id)}
                  onMouseLeave={handleCountryLeave}
                >
                  <span className="legend-dot" />
                  <span>{c.flag} {c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="global-side-v2">

            {/* Active country detail */}
            <div className={`country-detail-panel${active ? ' visible' : ''}`}
              style={{ '--panel-color': active?.color ?? '#C49E3F', '--panel-glow': active?.glowColor ?? 'rgba(196,158,63,0.5)' }}>
              {active ? (<>
                <div className="cdp-header">
                  <span className="cdp-flag">{active.flag}</span>
                  <div>
                    <div className="cdp-name">{active.label}</div>
                    <div className="cdp-city">{active.city}</div>
                  </div>
                </div>
                <div className="cdp-role">{active.role}</div>
                <p className="cdp-detail">{active.detail}</p>
                <div className="cdp-status">
                  <span className="cdp-dot" /> Active Operations
                </div>
              </>) : (
                <div className="cdp-placeholder">
                  <span style={{ fontSize: '2rem' }}>🌐</span>
                  <p>Click a country on the map to see details</p>
                </div>
              )}
            </div>

            {/* Office cards */}
            <div ref={cardsRef} className="global-cards-v2">
              {COUNTRIES.map(c => (
                <div
                  key={c.id}
                  className={`gc-v2${active?.id === c.id ? ' active' : ''}`}
                  style={{ '--gc-color': c.color }}
                  onClick={() => handleCountryClick(c)}
                  onMouseEnter={() => handleCountryEnter(c.id)}
                  onMouseLeave={handleCountryLeave}
                >
                  <span className="gc-flag-v2">{c.flag}</span>
                  <div className="gc-info-v2">
                    <strong>{c.label}</strong>
                    <span>{c.role}</span>
                  </div>
                  <div className="gc-pulse-v2" style={{ background: c.color }} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes svgPulse {
          0%   { r: 16; opacity: 0.8; }
          100% { r: 40; opacity: 0; }
        }
      `}</style>
    </section>
  )
}