import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/export-world-map.css'

gsap.registerPlugin(ScrollTrigger)

// Approximate SVG coords for destinations on a simplified world map (viewBox 0 0 1000 500)
const BAPATLA = { x: 660, y: 270 }
const DESTINATIONS = [
  { name: 'USA', x: 170, y: 210, color: '#3b82f6' },
  { name: 'Europe', x: 490, y: 155, color: '#a78bfa' },
  { name: 'Japan', x: 800, y: 195, color: '#f43f5e' },
  { name: 'Australia', x: 790, y: 360, color: '#22c55e' },
  { name: 'Middle East', x: 570, y: 235, color: '#d4af37' },
  { name: 'Singapore', x: 760, y: 295, color: '#fb923c' },
  { name: 'Canada', x: 155, y: 150, color: '#00C6A7' },
]

// Simplified world map path (major land outlines)
const WORLD_PATH = `
M 170 120 L 240 118 L 260 135 L 275 130 L 290 140 L 285 160 L 270 175 L 250 180 L 230 170 L 210 175 L 190 165 L 175 145 Z
M 130 150 L 200 145 L 230 160 L 240 180 L 260 190 L 275 210 L 270 235 L 250 245 L 230 250 L 210 245 L 195 230 L 175 220 L 155 215 L 140 200 L 125 185 L 120 165 Z
M 155 260 L 195 255 L 210 270 L 225 285 L 220 310 L 200 325 L 175 320 L 160 305 L 150 285 Z
M 415 120 L 450 115 L 480 120 L 510 130 L 530 145 L 545 165 L 540 185 L 525 195 L 505 200 L 480 195 L 460 185 L 440 170 L 420 155 L 410 138 Z
M 430 200 L 460 195 L 490 200 L 520 215 L 540 235 L 545 255 L 535 275 L 515 285 L 490 285 L 465 275 L 445 260 L 430 240 L 420 220 Z
M 545 140 L 580 135 L 615 140 L 650 150 L 670 165 L 680 185 L 675 205 L 660 215 L 640 220 L 615 215 L 590 205 L 565 190 L 548 170 L 540 152 Z
M 640 215 L 680 210 L 720 215 L 750 230 L 765 250 L 760 270 L 745 285 L 720 290 L 695 285 L 670 270 L 650 250 L 635 230 Z
M 760 160 L 810 155 L 840 165 L 855 185 L 850 205 L 830 215 L 805 215 L 780 205 L 762 188 Z
M 730 340 L 800 335 L 840 345 L 865 365 L 870 390 L 855 410 L 825 420 L 795 415 L 765 400 L 740 380 L 725 358 Z
`

export default function ExportWorldMap() {
  const sectionRef = useRef(null)
  const lineRefs = useRef([])
  const dotRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ewm-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.ewm-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.ewm-map-container', {
        scrollTrigger: { trigger: '.ewm-map-container', start: 'top 82%', once: true },
        opacity: 0, scale: 0.94, duration: 1.2, ease: 'power3.out', delay: 0.2,
      })

      // Animate travel lines
      ScrollTrigger.create({
        trigger: '.ewm-map-container',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          lineRefs.current.forEach((line, i) => {
            if (!line) return
            const len = line.getTotalLength ? line.getTotalLength() : 300
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
            gsap.to(line, {
              strokeDashoffset: 0,
              duration: 1.5,
              delay: 0.8 + i * 0.25,
              ease: 'power2.inOut',
            })
          })
          // Animate destination dots
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return
            gsap.from(dot, {
              scale: 0, opacity: 0,
              duration: 0.5,
              delay: 1.5 + i * 0.25,
              ease: 'back.out(2)',
              transformOrigin: 'center',
            })
          })
        },
      })

      // Pulse animations for destination dots
      gsap.utils.toArray('.ewm-dest-pulse').forEach((el, i) => {
        gsap.to(el, {
          scale: 3, opacity: 0,
          duration: 1.5, repeat: -1, ease: 'power2.out',
          delay: i * 0.3,
        })
      })

      // Bapatla origin pulse
      gsap.to('.ewm-origin-pulse', {
        scale: 4, opacity: 0,
        duration: 2, repeat: -1, ease: 'power2.out',
      })

      gsap.to('.ewm-orb-1', { y: -30, x: 18, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.ewm-orb-2', { y: 24, x: -14, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="export-world-map" className="ewm-section">
      <div className="ewm-bg">
        <div className="ewm-orb ewm-orb-1" />
        <div className="ewm-orb ewm-orb-2" />
        <div className="ewm-grid" />
      </div>

      <div className="ewm-inner">
        <div className="ewm-header">
          <div className="ewm-header-label">
            <span className="ewm-header-dot" />
            Global Export
          </div>
          <h2 className="ewm-headline">
            Delivering to<br />
            <span className="ewm-headline-gold">Every Corner of the World</span>
          </h2>
          <p className="ewm-subline">
            From the shores of Bapatla, our premium seafood reaches dining tables and
            supermarkets across 7 major international markets.
          </p>
        </div>

        <div className="ewm-map-container">
          <svg viewBox="0 0 1000 480" className="ewm-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="ewmMapGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.03)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <filter id="ewmGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            <rect width="1000" height="480" fill="url(#ewmMapGrad)" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 48} x2="1000" y2={i * 48} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="480" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            ))}

            {/* Land masses */}
            <path d={WORLD_PATH} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

            {/* Travel lines from Bapatla to each destination */}
            {DESTINATIONS.map((dest, i) => (
              <g key={dest.name}>
                <path
                  ref={el => lineRefs.current[i] = el}
                  d={`M ${BAPATLA.x} ${BAPATLA.y} Q ${(BAPATLA.x + dest.x) / 2} ${Math.min(BAPATLA.y, dest.y) - 80} ${dest.x} ${dest.y}`}
                  fill="none"
                  stroke={dest.color}
                  strokeWidth="1.5"
                  opacity="0.7"
                  filter="url(#ewmGlow)"
                />
              </g>
            ))}

            {/* Destination dots */}
            {DESTINATIONS.map((dest, i) => (
              <g key={`dot-${dest.name}`} ref={el => dotRefs.current[i] = el}>
                <circle cx={dest.x} cy={dest.y} r="4" fill={dest.color} opacity="0.9" filter="url(#ewmGlow)" />
                <circle className="ewm-dest-pulse" cx={dest.x} cy={dest.y} r="4" fill="none" stroke={dest.color} strokeWidth="1.5" opacity="0.6" />
                <text x={dest.x} y={dest.y - 12} textAnchor="middle" fill={dest.color} fontSize="10" fontWeight="700">{dest.name}</text>
              </g>
            ))}

            {/* Bapatla origin */}
            <g>
              <circle cx={BAPATLA.x} cy={BAPATLA.y} r="8" fill="#d4af37" opacity="1" filter="url(#ewmGlow)" />
              <circle className="ewm-origin-pulse" cx={BAPATLA.x} cy={BAPATLA.y} r="8" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.8" />
              <text x={BAPATLA.x} y={BAPATLA.y + 20} textAnchor="middle" fill="#d4af37" fontSize="11" fontWeight="800">Bapatla</text>
            </g>
          </svg>
        </div>

        {/* Destination badges */}
        <div className="ewm-dest-grid">
          {DESTINATIONS.map((d, i) => (
            <div key={i} className="ewm-dest-badge" style={{ '--dc': d.color }}>
              <div className="ewm-dest-dot" />
              <span className="ewm-dest-name">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
