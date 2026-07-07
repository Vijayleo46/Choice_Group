import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/equipment-showcase.css'

gsap.registerPlugin(ScrollTrigger)

const EQUIPMENT = [
  {
    name: 'IQF Freezer',
    icon: '🧊',
    color: '#38bdf8',
    brand: 'Scanico / Frigoscandia',
    spec: '−35°C · 5 MT/hr throughput',
    desc: 'Individual Quick Freezing tunnel ensuring each shrimp freezes separately at −35°C, preserving texture, color and moisture within 8 minutes.',
    tag: 'Freezing',
  },
  {
    name: 'Steam Cooker',
    icon: '♨️',
    color: '#fb923c',
    brand: 'Stork / Marel',
    spec: '100°C steam · 2 MT/hr',
    desc: 'Continuous steam cooking tunnel with precise time-temperature control, validated HACCP critical limits and automatic documentation.',
    tag: 'Thermal',
  },
  {
    name: 'Packing Machine',
    icon: '📦',
    color: '#a78bfa',
    brand: 'Ishida / Marel',
    spec: '±0.5g accuracy · 40 packs/min',
    desc: 'Multi-head weigher with auto-packing integration. Ensures weight compliance and minimizes product giveaway to ±0.5g tolerance.',
    tag: 'Packaging',
  },
  {
    name: 'Metal Detector',
    icon: '🔍',
    color: '#f43f5e',
    brand: 'Mettler-Toledo / Loma',
    spec: 'Fe 1.0mm sensitivity',
    desc: 'Final-stage inline metal detection on every carton with automatic rejection conveyor and alarm log. BRC and HACCP compliant.',
    tag: 'Safety',
  },
  {
    name: 'Cold Storage',
    icon: '❄️',
    color: '#00C6A7',
    brand: 'Refcomp / Bitzer',
    spec: '−18°C ± 1°C · 2000 MT',
    desc: 'Ammonia refrigeration system maintaining −18°C across 18,000 sq.ft of racked cold storage with 24/7 automated temperature monitoring.',
    tag: 'Storage',
  },
  {
    name: 'Boiler',
    icon: '🔥',
    color: '#d4af37',
    brand: 'Thermax / Forbes Marshall',
    spec: '6 Bar · 3 TPH capacity',
    desc: 'High-efficiency steam boiler supplying cooking and blanching lines. Continuous operation with integrated pressure safety controls.',
    tag: 'Utilities',
  },
  {
    name: 'Conveyor System',
    icon: '🔗',
    color: '#22c55e',
    brand: 'Custom / Stainless Systems',
    spec: '1.2 km total length',
    desc: 'Food-grade stainless steel conveyor network connecting all processing stages. Modular, CIP-cleanable and VFD-controlled for variable speed.',
    tag: 'Material Flow',
  },
  {
    name: 'Blast Freezer',
    icon: '💨',
    color: '#3b82f6',
    brand: 'Daikin / Carrier',
    spec: '−40°C · 10 MT batch',
    desc: 'High-velocity blast freezer for large batch rapid freezing. Reduces core temperature from +20°C to −18°C in under 90 minutes.',
    tag: 'Freezing',
  },
]

export default function EquipmentShowcase() {
  const sectionRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eq-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.eq-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.15,
      })
      gsap.from('.eq-card', {
        scrollTrigger: { trigger: '.eq-grid', start: 'top 85%', once: true },
        opacity: 0, y: 50, scale: 0.9, rotateX: 8,
        stagger: 0.09, duration: 0.88, ease: 'power3.out',
      })
      gsap.to('.eq-orb-1', { y: -30, x: 18, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.eq-orb-2', { y: 24, x: -16, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="equipment-showcase" className="eq-section">
      <div className="eq-bg">
        {/* Video Background */}
        <video
          className="eq-video-bg"
          src="/Drone_video_industrial_facility_…_202606251808.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="eq-video-overlay" />
        <div className="eq-orb eq-orb-1" />
        <div className="eq-orb eq-orb-2" />
        <div className="eq-mesh" />
      </div>

      <div className="eq-inner">
        <div className="eq-header">
          <div className="eq-header-label">
            <span className="eq-header-dot" />
            Machinery & Equipment
          </div>
          <h2 className="eq-headline">
            World-Class<br />
            <span className="eq-headline-gold">Equipment Showcase</span>
          </h2>
          <p className="eq-subline">
            Precision industrial equipment from global leaders, maintained to the highest
            standards and calibrated for peak performance every shift.
          </p>
        </div>

        <div className="eq-grid">
          {EQUIPMENT.map((eq, i) => (
            <div
              key={i}
              className={`eq-card${hovered === i ? ' eq-card--on' : ''}`}
              style={{ '--eq-color': eq.color }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="eq-card-bg" />
              <div className="eq-card-glow" />
              <div className="eq-card-border" />
              <div className="eq-card-shine" />

              <div className="eq-card-top">
                <div className="eq-card-icon-wrap">
                  <span className="eq-card-icon">{eq.icon}</span>
                  <div className="eq-card-icon-ring" />
                </div>
                <span className="eq-card-tag">{eq.tag}</span>
              </div>

              <h3 className="eq-card-name">{eq.name}</h3>
              <div className="eq-card-brand">{eq.brand}</div>
              <div className="eq-card-spec">
                <span className="eq-spec-dot" />
                {eq.spec}
              </div>
              <p className="eq-card-desc">{eq.desc}</p>

              <div className="eq-card-footer">
                <div className="eq-card-status">
                  <span className="eq-status-dot" />
                  Operational
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
