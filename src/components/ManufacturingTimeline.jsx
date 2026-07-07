import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/manufacturing-timeline.css'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '1954',
    icon: '🏗️',
    title: 'Company Foundation',
    desc: 'Choice Canning Company established in Bapatla, Andhra Pradesh as a pioneering shrimp processing venture for the Indian export market.',
    color: '#d4af37',
    tag: 'Foundation',
  },
  {
    year: '1978',
    icon: '🏭',
    title: 'Factory Expansion',
    desc: 'Major infrastructure expansion tripling plant capacity to meet surging global demand. New cold storage and processing halls commissioned.',
    color: '#3b82f6',
    tag: 'Growth',
  },
  {
    year: '1998',
    icon: '⚙️',
    title: 'Automation Era',
    desc: 'First-generation automated peeling and grading lines installed. Production efficiency improved by 40% and product consistency standardized.',
    color: '#00C6A7',
    tag: 'Innovation',
  },
  {
    year: '2012',
    icon: '💻',
    title: 'ERP Integration',
    desc: 'Company-wide Enterprise Resource Planning system deployed. Full digital traceability from farm intake to export dispatch achieved.',
    color: '#a78bfa',
    tag: 'Digital',
  },
  {
    year: '2022',
    icon: '📊',
    title: 'Digital Factory Platform',
    desc: 'PlantOS Digital Factory Platform launched with real-time dashboards for production, cold storage, inventory and analytics across all operations.',
    color: '#fb923c',
    tag: 'Industry 4.0',
  },
  {
    year: '2027',
    icon: '🤖',
    title: 'AI Manufacturing',
    desc: 'Next-generation AI-powered predictive maintenance, computer vision quality inspection, and autonomous inventory management — the future begins.',
    color: '#f43f5e',
    tag: 'Future',
    isFuture: true,
  },
]

export default function ManufacturingTimeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mft-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.mft-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })

      // Animate center line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: '.mft-track',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: 'top center',
        })
      }

      // Alternate left/right milestones
      gsap.utils.toArray('.mft-milestone').forEach((el, i) => {
        const isLeft = i % 2 === 0
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, x: isLeft ? -70 : 70,
          duration: 0.9, ease: 'power3.out', delay: 0.1,
        })
      })

      gsap.to('.mft-orb-1', { y: -28, x: 14, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.mft-orb-2', { y: 20, x: -16, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="manufacturing-timeline" className="mft-section">
      <div className="mft-bg">
        <div className="mft-orb mft-orb-1" />
        <div className="mft-orb mft-orb-2" />
        <div className="mft-grid" />
      </div>

      <div className="mft-inner">
        <div className="mft-header">
          <div className="mft-header-label">
            <span className="mft-header-dot" />
            70 Years of Excellence
          </div>
          <h2 className="mft-headline">
            Manufacturing<br />
            <span className="mft-headline-gold">Legacy & Vision</span>
          </h2>
          <p className="mft-subline">
            Seven decades of continuous evolution — from traditional processing to
            digital factory leadership, and toward an AI-powered future.
          </p>
        </div>

        <div className="mft-track">
          {/* Center vertical line */}
          <div className="mft-center-line">
            <div ref={lineRef} className="mft-center-line-fill" />
          </div>

          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className={`mft-milestone mft-milestone--${i % 2 === 0 ? 'left' : 'right'}${m.isFuture ? ' mft-milestone--future' : ''}`}
            >
              {/* Card */}
              <div className="mft-card" style={{ '--mc': m.color }}>
                <div className="mft-card-bg" />
                <div className="mft-card-glow" />
                <div className="mft-card-border" />

                <div className="mft-card-header">
                  <div className="mft-card-icon-wrap" style={{ background: `${m.color}18`, borderColor: `${m.color}30` }}>
                    <span className="mft-card-icon">{m.icon}</span>
                  </div>
                  <div className="mft-card-meta">
                    <div className="mft-card-year" style={{ color: m.color }}>{m.year}</div>
                    <div className="mft-card-tag" style={{ color: m.color, background: `${m.color}12`, borderColor: `${m.color}30` }}>
                      {m.tag}
                    </div>
                  </div>
                </div>

                <h3 className="mft-card-title">{m.title}</h3>
                <p className="mft-card-desc">{m.desc}</p>

                {m.isFuture && <div className="mft-future-badge">🔮 Coming Soon</div>}
              </div>

              {/* Center node */}
              <div className="mft-node" style={{ '--nc': m.color }}>
                <div className="mft-node-core" />
                <div className="mft-node-ring" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
