import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/factory-layout.css'

gsap.registerPlugin(ScrollTrigger)

const ZONES = [
  {
    id: 'receiving',
    label: 'Receiving',
    icon: '🚚',
    color: '#00C6A7',
    x: 8, y: 12, w: 18, h: 22,
    area: '8,000 sq.ft',
    capacity: '150 MT / shift',
    staff: '24 workers',
    equipment: 'Weighbridges, ERP terminals, QA stations',
    desc: 'Primary intake point for all raw material. Features 4 dock levelers, live ERP integration, and dedicated QA lab annexure.',
  },
  {
    id: 'processing',
    label: 'Processing',
    icon: '⚙️',
    color: '#d4af37',
    x: 28, y: 8, w: 30, h: 40,
    area: '32,000 sq.ft',
    capacity: '70 MT / day',
    staff: '180 workers',
    equipment: 'Peeling lines, deveining machines, graders, conveyor belts',
    desc: 'The heart of the facility. Fully automated peeling and grading lines with integrated CCP monitoring and real-time yield tracking.',
  },
  {
    id: 'coldstorage',
    label: 'Cold Storage',
    icon: '❄️',
    color: '#38bdf8',
    x: 60, y: 8, w: 16, h: 40,
    area: '18,000 sq.ft',
    capacity: '2,000 MT capacity',
    staff: '12 operators',
    equipment: 'Blast freezers, IQF tunnels, temperature monitoring',
    desc: 'Multi-zone cold storage operating from −2°C pre-processing to −35°C blast freezing. HACCP validated CCP system.',
  },
  {
    id: 'packaging',
    label: 'Packaging',
    icon: '📦',
    color: '#a78bfa',
    x: 28, y: 52, w: 30, h: 20,
    area: '14,000 sq.ft',
    capacity: '80,000 cartons / day',
    staff: '60 workers',
    equipment: 'Auto-weighers, carton sealers, labeling systems, metal detectors',
    desc: 'Export-grade packaging with automated weight verification, tamper-evident sealing, and 100% metal detection compliance.',
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    icon: '🏗️',
    color: '#f59e0b',
    x: 60, y: 52, w: 16, h: 20,
    area: '12,000 sq.ft',
    capacity: '5,000 pallet positions',
    staff: '18 operators',
    equipment: 'Racking systems, forklifts, WMS terminals',
    desc: 'Finished goods warehouse at −18°C with rack-and-pallet storage, FIFO management, and automated dispatch sequencing.',
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    icon: '🔬',
    color: '#22c55e',
    x: 8, y: 38, w: 18, h: 18,
    area: '3,200 sq.ft',
    capacity: '200 samples / day',
    staff: '8 scientists',
    equipment: 'Microbiology lab, chemical analysis, sensory panels',
    desc: 'NABL-accredited in-house laboratory performing microbiological, chemical, and organoleptic testing on every batch.',
  },
  {
    id: 'dispatch',
    label: 'Dispatch',
    icon: '🚢',
    color: '#fb923c',
    x: 8, y: 58, w: 18, h: 14,
    area: '6,000 sq.ft',
    capacity: '10 containers / day',
    staff: '20 workers',
    equipment: 'Reefer dock, container stuffing equipment, seal station',
    desc: 'Reefer container loading dock with temperature-verified container pre-cooling, electronic seal management, and port documentation.',
  },
]

export default function FactoryLayout() {
  const sectionRef = useRef(null)
  const [activeZone, setActiveZone] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fl-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.fl-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.fl-map-wrap', {
        scrollTrigger: { trigger: '.fl-map-wrap', start: 'top 82%', once: true },
        opacity: 0, scale: 0.94, duration: 1.1, ease: 'power3.out', delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    if (activeZone !== null) {
      gsap.fromTo(panelRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [activeZone])

  const zone = activeZone !== null ? ZONES[activeZone] : null

  return (
    <section ref={sectionRef} id="factory-layout" className="fl-section">
      <div className="fl-bg">
        <div className="fl-orb fl-orb-1" />
        <div className="fl-orb fl-orb-2" />
        <div className="fl-grid-bg" />
      </div>

      <div className="fl-inner">
        <div className="fl-header">
          <div className="fl-header-label">
            <span className="fl-header-dot" />
            Facility Overview
          </div>
          <h2 className="fl-headline">
            Interactive<br />
            <span className="fl-headline-gold">Plant Layout</span>
          </h2>
          <p className="fl-subline">
            Click any zone to explore detailed information about each department of our
            140,000 sq.ft world-class processing campus.
          </p>
        </div>

        <div className="fl-content">
          {/* Map */}
          <div className="fl-map-wrap">
            <div className="fl-map-label">Choice Canning Company · Bapatla, Andhra Pradesh</div>
            <svg
              viewBox="0 0 100 80"
              className="fl-map-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              <defs>
                <pattern id="flGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100" height="80" fill="url(#flGrid)" />

              {/* Building outline */}
              <rect x="6" y="6" width="72" height="68" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />

              {/* Zones */}
              {ZONES.map((z, i) => (
                <g key={z.id} onClick={() => setActiveZone(activeZone === i ? null : i)} style={{ cursor: 'pointer' }}>
                  <rect
                    x={z.x} y={z.y} width={z.w} height={z.h}
                    rx="1.5"
                    fill={activeZone === i ? `${z.color}28` : `${z.color}10`}
                    stroke={activeZone === i ? z.color : `${z.color}50`}
                    strokeWidth={activeZone === i ? '0.8' : '0.4'}
                    className="fl-zone-rect"
                  >
                    <animate
                      attributeName="fill-opacity"
                      values={activeZone === i ? "0.16" : "0.06;0.1;0.06"}
                      dur="2s"
                      repeatCount={activeZone === i ? '1' : 'indefinite'}
                    />
                  </rect>
                  <text
                    x={z.x + z.w / 2} y={z.y + z.h / 2 - 2}
                    textAnchor="middle"
                    fontSize="3.2"
                    fill={activeZone === i ? z.color : 'rgba(255,255,255,0.7)'}
                    fontWeight="600"
                    style={{ userSelect: 'none' }}
                  >
                    {z.label}
                  </text>
                  <text
                    x={z.x + z.w / 2} y={z.y + z.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="5"
                    style={{ userSelect: 'none' }}
                  >
                    {z.icon}
                  </text>
                </g>
              ))}

              {/* Compass */}
              <text x="88" y="10" fontSize="4" fill="rgba(255,255,255,0.3)" textAnchor="middle">N</text>
              <line x1="88" y1="11.5" x2="88" y2="15" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
            </svg>
            <div className="fl-map-hint">
              <span>👆</span> Click any zone for details
            </div>
          </div>

          {/* Info Panel */}
          {zone && (
            <div ref={panelRef} className="fl-info-panel" style={{ '--zone-color': zone.color }}>
              <button className="fl-panel-close" onClick={() => setActiveZone(null)}>×</button>
              <div className="fl-panel-bg" />
              <div className="fl-panel-glow" />
              <div className="fl-panel-border" />

              <div className="fl-panel-header">
                <div className="fl-panel-icon-wrap" style={{ background: `${zone.color}18` }}>
                  <span className="fl-panel-icon">{zone.icon}</span>
                </div>
                <h3 className="fl-panel-title" style={{ color: zone.color }}>{zone.label}</h3>
              </div>

              <p className="fl-panel-desc">{zone.desc}</p>

              <div className="fl-panel-stats">
                {[
                  { label: 'Area', value: zone.area },
                  { label: 'Capacity', value: zone.capacity },
                  { label: 'Staff', value: zone.staff },
                ].map((s, i) => (
                  <div key={i} className="fl-panel-stat">
                    <div className="fl-panel-stat-val" style={{ color: zone.color }}>{s.value}</div>
                    <div className="fl-panel-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="fl-panel-equip">
                <div className="fl-panel-equip-label">Equipment</div>
                <div className="fl-panel-equip-val">{zone.equipment}</div>
              </div>
            </div>
          )}

          {!zone && (
            <div className="fl-legend">
              <h4 className="fl-legend-title">Plant Zones</h4>
              {ZONES.map((z, i) => (
                <div
                  key={z.id}
                  className="fl-legend-item"
                  onClick={() => setActiveZone(i)}
                  style={{ '--zc': z.color }}
                >
                  <span className="fl-legend-dot" />
                  <span className="fl-legend-icon">{z.icon}</span>
                  <span className="fl-legend-name">{z.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
