import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/interactive-stats.css'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, duration = 2200, decimals = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const start = () => {
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      const val = ease * target
      setCount(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.round(val))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])
  return [count, start]
}

const STATS = [
  { value: 70, suffix: '+', label: 'Years of Excellence', sub: 'Since 1954', color: '#d4af37', icon: '🏆' },
  { value: 140000, suffix: '', label: 'Sq.ft Campus', sub: 'Processing Infrastructure', color: '#3b82f6', icon: '🏗️', format: true },
  { value: 70, suffix: ' MT/day', label: 'Production Capacity', sub: 'Maximum Throughput', color: '#00C6A7', icon: '⚙️' },
  { value: 100, suffix: '%', label: 'Export Quality', sub: 'International Standards', color: '#22c55e', icon: '✅' },
  { value: 24, suffix: '/7', label: 'Operations', sub: 'Non-Stop Manufacturing', color: '#fb923c', icon: '⏰' },
]

function BigStat({ stat, index }) {
  const [count, startCount] = useCountUp(stat.value, 2000)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({ trigger: ref.current, start: 'top 88%', once: true, onEnter: startCount })
  }, [])

  const display = stat.format ? count.toLocaleString() : count

  return (
    <div ref={ref} className="is-stat" style={{ '--isc': stat.color }}>
      <div className="is-stat-bg" />
      <div className="is-stat-glow" />
      <div className="is-stat-border" />

      <div className="is-stat-icon">{stat.icon}</div>
      <div className="is-stat-value">
        {display}<span className="is-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="is-stat-label">{stat.label}</div>
      <div className="is-stat-sub">{stat.sub}</div>

      <div className="is-stat-line" style={{ background: stat.color }} />
    </div>
  )
}

export default function InteractiveStats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.is-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.is-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.is-stat', {
        scrollTrigger: { trigger: '.is-grid', start: 'top 85%', once: true },
        opacity: 0, y: 60, scale: 0.88,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.5)', delay: 0.15,
      })
      gsap.to('.is-orb-1', { y: -30, x: 18, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="interactive-stats" className="is-section">
      <div className="is-bg">
        <div className="is-orb is-orb-1" />
        <div className="is-grid-lines" />
      </div>

      <div className="is-inner">
        <div className="is-header">
          <div className="is-header-label">
            <span className="is-header-dot" />
            By the Numbers
          </div>
          <h2 className="is-headline">
            Numbers That<br />
            <span className="is-headline-gold">Define Excellence</span>
          </h2>
          <p className="is-subline">
            Seven decades of relentless pursuit of quality, innovation, and sustainable growth.
          </p>
        </div>

        <div className="is-grid">
          {STATS.map((s, i) => <BigStat key={i} stat={s} index={i} />)}
        </div>
      </div>
    </section>
  )
}
