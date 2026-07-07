import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/food-safety-workflow.css'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    id: 1,
    icon: '🌊',
    title: 'Raw Material',
    desc: 'Farm-fresh shrimp sourced from BAP-certified aquaculture partners. Each batch is traceable to its origin farm.',
    color: '#00C6A7',
    status: 'Intake',
  },
  {
    id: 2,
    icon: '🔬',
    title: 'Lab Testing',
    desc: 'Microbiological, chemical and organoleptic testing in NABL-accredited in-house laboratory before processing begins.',
    color: '#3b82f6',
    status: 'Analysis',
  },
  {
    id: 3,
    icon: '🛡️',
    title: 'HACCP',
    desc: 'Critical Control Points validated and documented at every stage. Temperature, time and hygiene parameters continuously monitored.',
    color: '#d4af37',
    status: 'Control',
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'Processing',
    desc: 'Automated peeling, deveining and cooking under GMP conditions. All operators follow strict hygiene and PPE protocols.',
    color: '#a78bfa',
    status: 'Production',
  },
  {
    id: 5,
    icon: '🔍',
    title: 'Metal Detection',
    desc: 'Every finished carton passes through calibrated metal detectors sensitive to Fe 1.0mm. Automatic reject conveyor activated on detection.',
    color: '#f43f5e',
    status: 'Safety Check',
  },
  {
    id: 6,
    icon: '📦',
    title: 'Packing',
    desc: 'Export-grade packaging with date code, lot number, and full traceability labels. Weight verified by auto-weigher.',
    color: '#22c55e',
    status: 'Packaging',
  },
  {
    id: 7,
    icon: '🚢',
    title: 'Shipment',
    desc: 'Reefer containers pre-cooled to −18°C before loading. Electronic seals applied and documentation completed for international customs.',
    color: '#fb923c',
    status: 'Export',
  },
]

export default function FoodSafetyWorkflow() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fsw-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.fsw-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      // Stagger each step
      gsap.utils.toArray('.fsw-step').forEach((step, i) => {
        gsap.from(step, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          opacity: 0, y: 50, scale: 0.9,
          duration: 0.8, ease: 'back.out(1.4)', delay: 0.3 + i * 0.1,
        })
      })
      // Animate connectors
      gsap.utils.toArray('.fsw-connector-line').forEach((line, i) => {
        gsap.from(line, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.6, ease: 'power2.out', delay: 0.5 + i * 0.1,
        })
      })
      gsap.to('.fsw-orb-1', { y: -24, x: 12, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.fsw-orb-2', { y: 20, x: -14, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="food-safety-workflow" className="fsw-section">
      <div className="fsw-bg">
        <div className="fsw-orb fsw-orb-1" />
        <div className="fsw-orb fsw-orb-2" />
        <div className="fsw-grid" />
      </div>

      <div className="fsw-inner">
        <div className="fsw-header">
          <div className="fsw-header-label">
            <span className="fsw-header-dot" />
            Food Safety
          </div>
          <h2 className="fsw-headline">
            Quality at Every<br />
            <span className="fsw-headline-accent">Step</span>
          </h2>
          <p className="fsw-subline">
            Our HACCP-driven food safety workflow ensures the highest standards of hygiene,
            traceability, and quality are maintained from raw material to global shipment.
          </p>
        </div>

        {/* Workflow */}
        <div className="fsw-flow">
          {STEPS.map((step, i) => (
            <div key={step.id} className="fsw-step-wrap">
              <div className="fsw-step" style={{ '--step-color': step.color }}>
                <div className="fsw-step-bg" />
                <div className="fsw-step-glow" />
                <div className="fsw-step-border" />

                <div className="fsw-step-num">{step.id.toString().padStart(2, '0')}</div>

                <div className="fsw-step-icon-wrap" style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}>
                  <span className="fsw-step-icon">{step.icon}</span>
                </div>

                <div className="fsw-step-status" style={{ color: step.color, background: `${step.color}12`, borderColor: `${step.color}30` }}>
                  {step.status}
                </div>
                <h3 className="fsw-step-title">{step.title}</h3>
                <p className="fsw-step-desc">{step.desc}</p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="fsw-connector">
                  <div className="fsw-connector-line" />
                  <svg className="fsw-connector-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications bar */}
        <div className="fsw-cert-bar">
          {['HACCP', 'ISO 22000', 'BRC Grade A', 'EU Approved', 'USFDA', 'BAP 4-Star'].map((c, i) => (
            <div key={i} className="fsw-cert-pill">
              <span className="fsw-cert-check">✓</span>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
