import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/workforce-excellence.css'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const start = () => {
    const startTime = performance.now()
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
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
  { value: 99.8, suffix: '%', decimals: 1, label: 'Employee Safety Rate', icon: '🛡️', color: '#22c55e', desc: 'Zero lost-time injuries in 2024' },
  { value: 120, suffix: ' hrs', decimals: 0, label: 'Avg. Annual Training', icon: '📚', color: '#3b82f6', desc: 'Per employee per year' },
  { value: 42, suffix: '%', decimals: 0, label: 'Women Workforce', icon: '👩‍🏭', color: '#a78bfa', desc: 'Active inclusion program' },
  { value: 85, suffix: '+', decimals: 0, label: 'Technical Experts', icon: '🔬', color: '#d4af37', desc: 'Certified specialists on team' },
  { value: 12, suffix: ' yrs', decimals: 0, label: 'Avg. Experience', icon: '⭐', color: '#fb923c', desc: 'Per senior team member' },
]

function StatCard({ stat, index }) {
  const [count, startCount] = useCountUp(stat.value, 2000, stat.decimals)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({ trigger: ref.current, start: 'top 88%', once: true, onEnter: startCount })
  }, [])
  return (
    <div ref={ref} className="wfe-stat" style={{ '--sc': stat.color }}>
      <div className="wfe-stat-bg" />
      <div className="wfe-stat-glow" />
      <div className="wfe-stat-border" />
      <div className="wfe-stat-icon-wrap" style={{ background: `${stat.color}15`, borderColor: `${stat.color}30` }}>
        <span className="wfe-stat-icon">{stat.icon}</span>
      </div>
      <div className="wfe-stat-value" style={{ color: stat.color }}>
        {count}<span className="wfe-stat-suffix">{stat.suffix}</span>
      </div>
      <div className="wfe-stat-label">{stat.label}</div>
      <div className="wfe-stat-desc">{stat.desc}</div>
    </div>
  )
}

export default function WorkforceExcellence() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wfe-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.wfe-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.wfe-image-wrap', {
        scrollTrigger: { trigger: '.wfe-body', start: 'top 82%', once: true },
        opacity: 0, x: -50, duration: 1.1, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.wfe-stat', {
        scrollTrigger: { trigger: '.wfe-stats-grid', start: 'top 85%', once: true },
        opacity: 0, y: 40, scale: 0.9,
        stagger: 0.1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.2,
      })
      gsap.to('.wfe-orb-1', { y: -28, x: 14, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="workforce-excellence" className="wfe-section">
      <div className="wfe-bg">
        <div className="wfe-orb wfe-orb-1" />
        <div className="wfe-grid" />
      </div>

      <div className="wfe-inner">
        <div className="wfe-header">
          <div className="wfe-header-label">
            <span className="wfe-header-dot" />
            Our People
          </div>
          <h2 className="wfe-headline">
            Workforce<br />
            <span className="wfe-headline-gold">Excellence</span>
          </h2>
          <p className="wfe-subline">
            Our greatest asset is our people. We invest in safety, training, and wellbeing
            to build a world-class team that delivers world-class products.
          </p>
        </div>

        <div className="wfe-body">
          {/* Image Panel */}
          <div className="wfe-image-wrap">
            <img
              src="/37_Choice-Canning-Factory-01.jpg"
              alt="Choice Canning Company workforce"
              className="wfe-image"
            />
            <div className="wfe-image-overlay" />
            <div className="wfe-image-badge">
              <span className="wfe-badge-icon">👷</span>
              <div>
                <div className="wfe-badge-title">500+</div>
                <div className="wfe-badge-sub">Total Workforce</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="wfe-content">
            <p className="wfe-body-text">
              With over 500 dedicated employees, Choice Canning Company has built a culture of
              excellence, safety, and continuous improvement. Our workforce spans skilled technicians,
              quality scientists, cold chain specialists, and export professionals — all united by a
              commitment to delivering the world's finest seafood products.
            </p>
            <p className="wfe-body-text">
              We invest over 60,000 training hours annually to ensure every team member is equipped
              with the latest skills in food safety, GMP, and operational excellence.
            </p>

            <div className="wfe-stats-grid">
              {STATS.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
