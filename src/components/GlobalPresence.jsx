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
  {
    id: 'uk',
    flag: '🇬🇧',
    label: 'UK',
    city: 'London',
    role: 'European Sales & Logistics',
    detail: 'Strategic seafood sales and logistics office catering to UK and European markets',
    color: '#00D2C4',
    glowColor: 'rgba(0,210,196,0.7)',
    cx: 460, cy: 85,
    paths: [],
  },
  {
    id: 'kenya',
    flag: '🇰🇪',
    label: 'Kenya',
    city: 'Mombasa',
    role: 'East Africa Distribution',
    detail: 'Marine operations, processing partners, and African distribution network',
    color: '#FF9F43',
    glowColor: 'rgba(255,159,67,0.7)',
    cx: 535, cy: 230,
    paths: [],
  },
]

/* Trade route connection lines (HQ India → each country) */
const ROUTES = [
  { id: 'r-usa',    d: 'M 718,248 Q 480,80 250,178',   country: 'usa' },
  { id: 'r-canada', d: 'M 718,248 Q 460,50 222,150',   country: 'canada' },
  { id: 'r-japan',  d: 'M 718,248 Q 800,140 872,185',  country: 'japan' },
  { id: 'r-korea',  d: 'M 718,248 Q 785,160 848,178',  country: 'korea' },
  { id: 'r-uk',     d: 'M 718,248 Q 590,140 460,85',   country: 'uk' },
  { id: 'r-kenya',  d: 'M 718,248 Q 620,240 535,230',  country: 'kenya' },
]

/* Continent silhouettes — Equirectangular 1000×500 viewport
   Pin reference: India(718,248) USA(250,178) Canada(222,150)
                  Japan(872,185) Korea(848,178) UK(460,85) Kenya(535,230) */
const CONTINENTS = [
  // ── North America (incl. Central America)
  `M 55,62 C 70,55 120,45 168,42 C 210,39 248,38 275,44
   C 300,50 310,58 305,72 C 300,84 288,95 280,108
   C 270,122 265,135 255,148 C 244,162 232,175 218,188
   C 204,200 192,210 180,215 C 168,220 155,218 140,212
   C 124,206 108,195 94,182 C 80,169 68,155 60,138
   C 52,122 50,104 52,88 C 53,78 53,68 55,62 Z
   M 195,215 C 200,222 208,238 205,252 C 202,262 195,268 190,262
   C 184,255 182,240 184,228 C 186,218 193,212 195,215 Z`,

  // ── Greenland
  `M 300,22 C 318,14 348,10 370,14 C 390,18 398,28 395,40
   C 392,52 378,60 358,65 C 338,70 316,68 302,58
   C 290,50 286,30 300,22 Z`,

  // ── South America
  `M 175,230 C 190,222 218,218 240,220 C 262,222 278,230 288,244
   C 298,258 300,275 296,295 C 292,315 282,332 268,348
   C 254,364 238,378 220,388 C 202,398 186,402 174,395
   C 162,388 156,374 152,356 C 148,338 148,316 150,296
   C 152,276 155,256 160,242 C 164,234 170,232 175,230 Z`,

  // ── Europe (incl. Scandinavia & Iberian Peninsula)
  `M 436,52 C 450,44 470,40 490,40 C 510,40 525,46 535,56
   C 542,64 544,74 540,84 C 536,94 526,102 514,108
   C 502,114 488,117 474,116 C 460,115 448,110 440,102
   C 432,94 430,82 432,72 C 433,64 434,56 436,52 Z
   M 448,42 C 452,32 460,26 468,28 C 476,30 480,38 478,46
   C 476,54 468,58 460,56 C 452,54 446,50 448,42 Z
   M 464,32 C 466,24 472,20 478,22 C 484,24 486,30 484,36
   C 482,42 476,46 470,44 C 464,42 462,38 464,32 Z
   M 416,62 C 420,54 428,50 434,54 C 440,58 440,66 436,72
   C 432,78 424,80 418,76 C 412,72 412,68 416,62 Z`,

  // ── Africa
  `M 448,122 C 465,114 492,110 518,112 C 544,114 564,124 572,140
   C 580,156 576,175 570,194 C 564,213 554,232 542,250
   C 530,268 516,284 502,296 C 488,308 474,316 460,318
   C 446,320 434,316 424,306 C 414,296 408,280 406,262
   C 404,244 406,224 410,205 C 414,186 420,168 430,152
   C 438,138 442,128 448,122 Z`,

  // ── Arabian Peninsula
  `M 578,148 C 590,142 608,140 620,148 C 632,156 634,168 628,180
   C 622,192 608,198 596,196 C 584,194 576,184 574,172
   C 572,162 574,152 578,148 Z`,

  // ── Asia main body (Siberia + China + SE Asia block)
  `M 540,42 C 570,34 620,28 670,26 C 720,24 768,26 808,34
   C 840,40 862,52 870,68 C 878,84 872,102 860,116
   C 848,130 830,140 810,148 C 790,156 768,160 744,160
   C 720,160 695,158 670,154 C 644,150 618,144 594,138
   C 572,132 554,125 542,115 C 530,105 525,92 526,78
   C 527,66 532,50 540,42 Z
   M 790,155 C 802,158 814,164 820,174 C 826,184 822,196 812,202
   C 802,208 788,206 778,198 C 768,190 766,178 772,168
   C 778,158 786,152 790,155 Z`,

  // ── Indian Subcontinent (Kochi at ~718,248)
  `M 658,142 C 672,138 690,138 706,142 C 722,146 734,156 740,170
   C 746,184 744,200 736,215 C 728,230 714,242 700,250
   C 686,258 672,260 660,254 C 648,248 640,236 636,222
   C 632,208 634,192 640,178 C 646,164 652,148 658,142 Z`,

  // ── Southeast Asia / Indonesia (simplified)
  `M 776,196 C 790,192 808,192 822,200 C 834,208 838,220 832,232
   C 826,244 812,250 798,248 C 784,246 774,236 770,224
   C 766,212 770,200 776,196 Z
   M 806,224 C 816,220 828,222 836,230 C 844,238 842,250 832,256
   C 822,262 808,260 800,252 C 792,244 794,230 806,224 Z`,

  // ── Japan archipelago (Tokyo at ~872,185)
  `M 858,168 C 864,162 874,160 882,166 C 890,172 890,182 884,190
   C 878,198 866,200 858,194 C 850,188 852,174 858,168 Z
   M 870,158 C 876,152 884,152 890,158 C 896,164 894,172 888,176
   C 882,180 874,178 870,172 C 866,166 866,162 870,158 Z`,

  // ── Korean Peninsula (Seoul at ~848,178)
  `M 836,164 C 842,158 852,156 860,162 C 868,168 868,178 862,186
   C 856,194 846,196 838,190 C 830,184 830,172 836,164 Z`,

  // ── Australia
  `M 758,288 C 774,278 802,272 832,272 C 862,272 888,280 904,296
   C 918,312 916,332 904,348 C 892,364 872,374 850,378
   C 828,382 804,378 784,368 C 764,358 750,342 746,324
   C 742,308 748,296 758,288 Z`,

  // ── New Zealand
  `M 938,340 C 942,332 950,328 958,332 C 966,336 966,346 960,354
   C 954,362 944,364 938,358 C 932,352 934,346 938,340 Z`,

  // ── UK / British Isles (London at ~460,85)
  `M 444,74 C 450,66 460,62 470,66 C 480,70 482,80 476,88
   C 470,96 458,98 448,94 C 438,90 438,82 444,74 Z
   M 455,64 C 460,56 468,54 474,58 C 480,62 480,70 474,74
   C 468,78 460,76 456,70 C 452,66 452,68 455,64 Z`,

  // ── Iceland
  `M 400,36 C 408,28 420,26 428,32 C 436,38 434,48 426,54
   C 418,60 406,58 400,52 C 394,46 394,42 400,36 Z`,
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
          <p className="section-desc" style={{ margin: '0 auto', maxWidth: 800 }}>
            The Choice Group is one of the largest and highly diversified business conglomerate headquartered in Cochin with branches in all the major trading centers in South India, besides United States of America, Canada, South Korea &amp; Japan. The history of Choice Group spans half a century of entrepreneurial excellence dating back from modest beginnings in 1962 to its present day stature as a highly reputed business house in the South Indian state of Kerala.
          </p>
        </div>

        {/* ── Map + Cards layout ── */}
        <div className="global-layout-v2">

          {/* SVG Map */}
          <div className="global-map-v2" style={{ position: 'relative' }}>
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
                <radialGradient id="hq-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C49E3F" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#C49E3F" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ocean-bg" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#F0F4FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F8F9FC" stopOpacity="1" />
                </radialGradient>
                <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="#CBD5E1" opacity="0.5" />
                </pattern>
                <filter id="blur-soft">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Ocean background */}
              <rect x="0" y="0" width="1000" height="500" fill="url(#ocean-bg)" />

              {/* Subtle dot grid */}
              <rect x="0" y="0" width="1000" height="500" fill="url(#dot-grid)" opacity="0.6" pointerEvents="none" />

              {/* Subtle HQ Cochin Radial Glow */}
              <circle cx="718" cy="248" r="90" fill="url(#hq-glow)" pointerEvents="none" />

              {/* Vector World Map Continent Silhouettes */}
              <g className="map-continents" fill="#C8D3E8" opacity="0.55" pointerEvents="none">
                {CONTINENTS.map((path, idx) => (
                  <path key={`continent-${idx}`} d={path} />
                ))}
              </g>

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

              {/* Permanent Location Labels on the Map */}
              {COUNTRIES.map(c => {
                let dx = 14;
                let dy = 4;
                let textAnchor = "start";
                if (c.id === 'japan' || c.id === 'korea') {
                  dx = -14;
                  textAnchor = "end";
                }
                if (c.id === 'india') {
                  dy = 22;
                  dx = 0;
                  textAnchor = "middle";
                }
                return (
                  <text
                    key={`label-${c.id}`}
                    x={c.cx + dx}
                    y={c.cy + dy}
                    textAnchor={textAnchor}
                    fill={c.color}
                    fontSize="11.5"
                    fontWeight="800"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      pointerEvents: 'none',
                      filter: 'drop-shadow(0px 1px 3px rgba(255,255,255,0.95)) drop-shadow(0px 0px 4px rgba(255,255,255,0.8))',
                      userSelect: 'none',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {c.id === 'india' ? 'Cochin (HQ)' : c.label}
                  </text>
                )
              })}
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