import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/sustainability.css'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    icon: '☀️',
    title: 'Solar Energy',
    desc: 'Rooftop solar panels generating 400 kW of clean energy, reducing grid dependency and carbon emissions.',
    metric: '400 kW',
    metricLabel: 'Solar Capacity',
    color: '#f59e0b',
    progress: 68,
  },
  {
    icon: '💧',
    title: 'Water Recycling',
    desc: 'Advanced water treatment and recycling systems recover up to 70% of process water for non-food use.',
    metric: '70%',
    metricLabel: 'Water Recovered',
    color: '#38bdf8',
    progress: 70,
  },
  {
    icon: '🏭',
    title: 'Waste Water Treatment',
    desc: 'On-site ETP processes all effluent to zero-liquid discharge standards before safe environmental release.',
    metric: 'ZLD',
    metricLabel: 'Zero Liquid Discharge',
    color: '#00C6A7',
    progress: 100,
  },
  {
    icon: '⚡',
    title: 'Energy Efficiency',
    desc: 'Variable frequency drives and LED lighting reduce energy consumption by 25% versus industry baseline.',
    metric: '−25%',
    metricLabel: 'Energy Reduction',
    color: '#d4af37',
    progress: 75,
  },
  {
    icon: '🌿',
    title: 'Carbon Reduction',
    desc: 'Carbon footprint reduction program targeting 30% scope-1 and scope-2 emissions by 2027.',
    metric: '−30%',
    metricLabel: 'Target by 2027',
    color: '#22c55e',
    progress: 55,
  },
  {
    icon: '♻️',
    title: 'Eco Packaging',
    desc: 'Transition to biodegradable and recyclable packaging materials for all export products by 2026.',
    metric: '85%',
    metricLabel: 'Recyclable Materials',
    color: '#a78bfa',
    progress: 85,
  },
]

export default function Sustainability() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sust-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.sust-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.sust-card', {
        scrollTrigger: { trigger: '.sust-grid', start: 'top 85%', once: true },
        opacity: 0, y: 50, scale: 0.92,
        stagger: 0.1, duration: 0.85, ease: 'power3.out', delay: 0.15,
      })
      // Animate progress bars
      ScrollTrigger.create({
        trigger: '.sust-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.utils.toArray('.sust-progress-fill').forEach((el) => {
            const target = el.dataset.progress
            gsap.fromTo(el, { width: '0%' }, { width: `${target}%`, duration: 1.5, ease: 'power3.out', delay: 0.5 })
          })
        },
      })
      gsap.to('.sust-orb-1', { y: -28, x: 16, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.sust-orb-2', { y: 24, x: -18, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sustainability" className="sust-section">
      <div className="sust-bg">
        <div className="sust-orb sust-orb-1" />
        <div className="sust-orb sust-orb-2" />
        <div className="sust-grid-lines" />
      </div>

      <div className="sust-inner">
        <div className="sust-header">
          <div className="sust-header-label">
            <span className="sust-header-dot" />
            Our Commitment
          </div>
          <h2 className="sust-headline">
            Sustainability<br />
            <span className="sust-headline-green">at Scale</span>
          </h2>
          <p className="sust-subline">
            Every decision we make considers our responsibility to the planet, our communities,
            and the oceans that sustain our business.
          </p>
        </div>

        <div className="sust-grid">
          {CARDS.map((card, i) => (
            <div key={i} className="sust-card" style={{ '--sust-color': card.color }}>
              <div className="sust-card-bg" />
              <div className="sust-card-glow" />
              <div className="sust-card-border" />

              <div className="sust-card-top">
                <div className="sust-icon-wrap" style={{ background: `${card.color}15`, borderColor: `${card.color}30` }}>
                  <span className="sust-icon">{card.icon}</span>
                </div>
                <div className="sust-metric-wrap">
                  <div className="sust-metric" style={{ color: card.color }}>{card.metric}</div>
                  <div className="sust-metric-label">{card.metricLabel}</div>
                </div>
              </div>

              <h3 className="sust-title">{card.title}</h3>
              <p className="sust-desc">{card.desc}</p>

              <div className="sust-progress-wrap">
                <div className="sust-progress-track">
                  <div
                    className="sust-progress-fill"
                    data-progress={card.progress}
                    style={{ background: `linear-gradient(90deg, ${card.color}80, ${card.color})` }}
                  />
                </div>
                <span className="sust-progress-pct" style={{ color: card.color }}>{card.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
