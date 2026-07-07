import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Truck,
  ClipboardCheck,
  Sliders,
  Sparkles,
  Cpu,
  Snowflake,
  Package,
  Warehouse,
  Ship
} from 'lucide-react'
import '../styles/factory-timeline.css'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    id: 1,
    number: '01',
    title: 'Receiving',
    desc: 'Fresh shrimp received from certified farms.',
    color: '#0066ff',
    icon: Truck,
    gradient: 'linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(0, 240, 255, 0.03) 100%)',
    glow: 'rgba(0, 102, 255, 0.35)'
  },
  {
    id: 2,
    number: '02',
    title: 'Quality Inspection',
    desc: 'Raw material inspected by QC experts.',
    color: '#00f0ff',
    icon: ClipboardCheck,
    gradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 102, 255, 0.03) 100%)',
    glow: 'rgba(0, 240, 255, 0.35)'
  },
  {
    id: 3,
    number: '03',
    title: 'Grading',
    desc: 'Automated grading based on size and quality.',
    color: '#3b82f6',
    icon: Sliders,
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.03) 100%)',
    glow: 'rgba(59, 130, 246, 0.35)'
  },
  {
    id: 4,
    number: '04',
    title: 'Peeling & Cleaning',
    desc: 'Hygienic preparation under strict standards.',
    color: '#00f0ff',
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(16, 185, 129, 0.03) 100%)',
    glow: 'rgba(0, 240, 255, 0.35)'
  },
  {
    id: 5,
    number: '05',
    title: 'Processing',
    desc: 'Cutting, washing and value addition.',
    color: '#10b981',
    icon: Cpu,
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(0, 240, 255, 0.03) 100%)',
    glow: 'rgba(16, 185, 129, 0.35)'
  },
  {
    id: 6,
    number: '06',
    title: 'Cooking / IQF Freezing',
    desc: 'Rapid freezing to preserve freshness.',
    color: '#06b6d4',
    icon: Snowflake,
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.03) 100%)',
    glow: 'rgba(6, 182, 212, 0.35)'
  },
  {
    id: 7,
    number: '07',
    title: 'Packaging',
    desc: 'Automated packing and labeling.',
    color: '#8b5cf6',
    icon: Package,
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(249, 115, 22, 0.03) 100%)',
    glow: 'rgba(139, 92, 246, 0.35)'
  },
  {
    id: 8,
    number: '08',
    title: 'Cold Storage',
    desc: 'Temperature-controlled storage facility.',
    color: '#0284c7',
    icon: Warehouse,
    gradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(0, 240, 255, 0.03) 100%)',
    glow: 'rgba(2, 132, 199, 0.35)'
  },
  {
    id: 9,
    number: '09',
    title: 'Export Dispatch',
    desc: 'Container loading and worldwide shipment.',
    color: '#f97316',
    icon: Ship,
    gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(59, 130, 246, 0.03) 100%)',
    glow: 'rgba(249, 115, 22, 0.35)'
  }
]

const KPI_DATA = [
  {
    id: 'area',
    targetValue: 140000,
    suffix: ' sq.ft',
    label: 'Factory Area',
    sub: 'World-Class Facility',
    format: true
  },
  {
    id: 'capacity',
    targetValue: 70,
    suffix: ' MT/day',
    label: 'Production Capacity',
    sub: 'High-Throughput Output'
  },
  {
    id: 'quality',
    targetValue: 100,
    suffix: '%',
    label: 'Quality',
    sub: '100% Export Standard'
  },
  {
    id: 'operations',
    targetValue: 24,
    suffix: '×7',
    label: 'Operations',
    sub: 'Continuous Shift Operations'
  }
]

function useCountUp(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4) // easeOutQuart
      setCount(Math.round(ease * target))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, active])

  return count
}

function KpiCard({ kpi, startCount }) {
  const count = useCountUp(kpi.targetValue, 2000, startCount)

  const formatValue = () => {
    if (kpi.format) {
      return count.toLocaleString()
    }
    return count
  }

  return (
    <div className="fj-kpi-card">
      <div className="fj-kpi-card-glow" />
      <div className="fj-kpi-card-border" />
      <div className="fj-kpi-card-inner">
        <div className="fj-kpi-val-container">
          <span className="fj-kpi-value">{formatValue()}</span>
          <span className="fj-kpi-suffix">{kpi.suffix}</span>
        </div>
        <h4 className="fj-kpi-label">{kpi.label}</h4>
        <p className="fj-kpi-sub">{kpi.sub}</p>
      </div>
    </div>
  )
}

export default function FactoryTimeline() {
  const sectionRef = useRef(null)
  const horizontalTrackRef = useRef(null)
  const progressBarRef = useRef(null)
  const kpiSectionRef = useRef(null)
  const [kpisActive, setKpisActive] = useState(false)
  const [activeStage, setActiveStage] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      // ── DESKTOP: Horizontal Scroll Pinning (>= 1024px) ──
      mm.add("(min-width: 1024px)", () => {
        const track = horizontalTrackRef.current
        const section = sectionRef.current
        if (!track || !section) return

        // Calculate horizontal translation length
        const scrollWidth = track.scrollWidth - window.innerWidth + 160

        // Pinned horizontal scroll
        gsap.to(track, {
          x: () => -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Scroll progress indicator
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`
              }

              // Determine active stage card dynamically as we scroll
              const progress = self.progress
              const totalStages = STAGES.length
              const currentIndex = Math.min(
                Math.floor(progress * totalStages),
                totalStages - 1
              )
              setActiveStage(currentIndex)
            }
          }
        })

        // Staggered card entry
        gsap.fromTo('.fj-card-wrapper',
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true
            }
          }
        )
      })

      // ── TABLET & MOBILE: Standard Scroll Flow (< 1024px) ──
      mm.add("(max-width: 1023px)", () => {
        // Staggered card fade-in on vertical grid/list
        gsap.fromTo('.fj-card-wrapper',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.fj-stages-grid',
              start: 'top 85%',
              once: true
            }
          }
        )

        // Mobile vertical line drawing
        gsap.fromTo('.fj-vertical-line-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.fj-stages-grid',
              start: 'top 10%',
              end: 'bottom 90%',
              scrub: true
            }
          }
        )
      })

      // ── Trigger KPI Count-up ──
      ScrollTrigger.create({
        trigger: kpiSectionRef.current,
        start: 'top 85%',
        onEnter: () => setKpisActive(true)
      })

      // Ambient particle animations
      gsap.to('.fj-particle', {
        y: '-=40',
        x: '+=20',
        rotation: 360,
        opacity: 'random(0.2, 0.6)',
        duration: 'random(6, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="factory-journey" className="fj-section">
      
      {/* ── Background Aesthetics ── */}
      <div className="fj-bg">
        <div className="fj-grid-overlay" />
        <div className="fj-orb fj-orb-blue" />
        <div className="fj-orb fj-orb-cyan" />
        
        {/* Floating particles */}
        <div className="fj-particles-container">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="fj-particle"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="fj-inner">
        {/* ── Header ── */}
        <div className="fj-header">
          <div className="fj-header-badge">
            <span className="fj-header-badge-dot" />
            Bapatla Smart Workflow
          </div>
          <h2 className="fj-title">Factory Journey</h2>
          <p className="fj-subtitle">
            Every shrimp follows a carefully controlled production journey, ensuring world-class quality, food safety, and export excellence.
          </p>
        </div>

        {/* ── Horizontal Scroll Scrollbar Progress (Desktop Only) ── */}
        <div className="fj-progress-container-outer">
          <div className="fj-progress-bar-inner" ref={progressBarRef} />
        </div>

        {/* ── Timeline Showcase Area ── */}
        <div className="fj-timeline-viewport">
          <div className="fj-timeline-track" ref={horizontalTrackRef}>
            
            {/* Desktop horizontal progress line running behind cards */}
            <div className="fj-horizontal-line">
              <div className="fj-horizontal-line-fill" />
            </div>

            {/* Mobile/Tablet vertical progress line */}
            <div className="fj-vertical-line">
              <div className="fj-vertical-line-fill" />
            </div>

            <div className="fj-stages-grid">
              {STAGES.map((stage, i) => {
                const IconComponent = stage.icon
                const isActive = activeStage === i
                
                return (
                  <div
                    key={stage.id}
                    className={`fj-card-wrapper ${isActive ? 'fj-card-active' : ''}`}
                    style={{
                      '--stage-color': stage.color,
                      '--stage-glow': stage.glow,
                      '--card-gradient': stage.gradient
                    }}
                    onMouseEnter={() => setActiveStage(i)}
                  >
                    
                    {/* Node on the line */}
                    <div className="fj-timeline-node">
                      <div className="fj-node-dot" />
                      <div className="fj-node-pulse" />
                    </div>

                    {/* Stage Card */}
                    <div className="fj-card">
                      <div className="fj-card-bg-glow" />
                      <div className="fj-card-border" />
                      
                      <div className="fj-card-content">
                        {/* 3D Glassmorphism Icon container */}
                        <div className="fj-icon-container">
                          <div className="fj-icon-glow" />
                          <div className="fj-icon-sphere" />
                          <IconComponent className="fj-icon-svg" size={26} />
                        </div>

                        {/* Step tag */}
                        <div className="fj-step-number">
                          STAGE {stage.number}
                        </div>

                        {/* Heading */}
                        <h3 className="fj-card-title">{stage.title}</h3>
                        
                        {/* Description */}
                        <p className="fj-card-desc">{stage.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── KPI Dashboard Cards ── */}
        <div className="fj-kpi-section" ref={kpiSectionRef}>
          <div className="fj-kpi-grid">
            {KPI_DATA.map((kpi) => (
              <KpiCard
                key={kpi.id}
                kpi={kpi}
                startCount={kpisActive}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
