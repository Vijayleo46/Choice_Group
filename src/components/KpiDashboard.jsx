import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/kpi-dashboard.css'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, duration = 2000, decimals = 0) {
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

const KPI_DATA = [
  {
    id: 'production',
    label: "Today's Production",
    value: 48.6,
    suffix: ' MT',
    decimals: 1,
    icon: '⚙️',
    color: '#00C6A7',
    sub: 'Live batch tracking',
    live: true,
  },
  {
    id: 'capacity',
    label: 'Production Capacity',
    value: 70,
    suffix: ' MT/day',
    decimals: 0,
    icon: '🏭',
    color: '#d4af37',
    sub: 'Maximum throughput',
    live: false,
  },
  {
    id: 'employees',
    label: 'Employees on Shift',
    value: 342,
    suffix: '',
    decimals: 0,
    icon: '👷',
    color: '#3b82f6',
    sub: 'Active workforce',
    live: true,
  },
  {
    id: 'export',
    label: 'Export Orders',
    value: 18,
    suffix: '',
    decimals: 0,
    icon: '🚢',
    color: '#f59e0b',
    sub: 'Pending dispatch',
    live: true,
  },
  {
    id: 'machines',
    label: 'Machines Running',
    value: 94,
    suffix: '%',
    decimals: 0,
    icon: '🔧',
    color: '#22c55e',
    sub: 'Uptime efficiency',
    live: true,
  },
  {
    id: 'coldtemp',
    label: 'Cold Storage',
    value: -18,
    suffix: '°C',
    decimals: 0,
    icon: '❄️',
    color: '#38bdf8',
    sub: 'Optimal temperature',
    live: false,
  },
  {
    id: 'quality',
    label: 'Quality Score',
    value: 98.7,
    suffix: '%',
    decimals: 1,
    icon: '✅',
    color: '#a78bfa',
    sub: 'Pass rate today',
    live: true,
  },
  {
    id: 'energy',
    label: 'Energy Consumption',
    value: 2.4,
    suffix: ' MW',
    decimals: 1,
    icon: '⚡',
    color: '#fb923c',
    sub: 'Current draw',
    live: true,
  },
]

function KpiCard({ kpi, index }) {
  const [count, startCount] = useCountUp(Math.abs(kpi.value), 1800, kpi.decimals)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 88%',
      once: true,
      onEnter: startCount,
    })
  }, [])

  const display = kpi.value < 0 ? `-${count}` : count

  return (
    <div
      ref={ref}
      className="kpi-card"
      style={{ '--kpi-color': kpi.color, '--delay': `${index * 0.08}s` }}
    >
      <div className="kpi-card-bg" />
      <div className="kpi-card-glow" />
      <div className="kpi-card-border" />

      <div className="kpi-top-row">
        <div className="kpi-icon-wrap" style={{ background: `${kpi.color}18` }}>
          <span className="kpi-icon">{kpi.icon}</span>
        </div>
        {kpi.live && (
          <div className="kpi-live-badge">
            <span className="kpi-live-dot" />
            LIVE
          </div>
        )}
      </div>

      <div className="kpi-value-row">
        <span className="kpi-value">{display}</span>
        <span className="kpi-suffix">{kpi.suffix}</span>
      </div>

      <div className="kpi-label">{kpi.label}</div>
      <div className="kpi-sub">{kpi.sub}</div>

      <div className="kpi-bar-wrap">
        <div
          className="kpi-bar-fill"
          style={{
            width: kpi.value < 0 ? '100%' : `${Math.min(Math.abs(kpi.value), 100)}%`,
            background: kpi.color,
          }}
        />
      </div>
    </div>
  )
}

export default function KpiDashboard() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.kpi-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.kpi-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.15,
      })
      gsap.from('.kpi-subline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', delay: 0.3,
      })
      gsap.from('.kpi-card', {
        scrollTrigger: { trigger: '.kpi-grid', start: 'top 85%', once: true },
        opacity: 0, y: 48, scale: 0.92,
        stagger: 0.07, duration: 0.85, ease: 'power3.out', delay: 0.2,
      })
      // Floating orbs
      gsap.to('.kpi-orb-1', { y: -28, x: 14, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.kpi-orb-2', { y: 22, x: -18, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="kpi-dashboard" className="kpi-section">
      <div className="kpi-bg-ambience">
        <div className="kpi-orb kpi-orb-1" />
        <div className="kpi-orb kpi-orb-2" />
        <div className="kpi-grid-overlay" />
      </div>

      <div className="kpi-inner">
        <div className="kpi-header">
          <div className="kpi-header-label">
            <span className="kpi-header-dot" />
            Real-Time Operations
          </div>
          <h2 className="kpi-headline">
            Live Manufacturing<br />
            <span className="kpi-headline-gold">KPI Dashboard</span>
          </h2>
          <p className="kpi-subline">
            Monitoring every dimension of production in real time — from throughput to temperature,
            quality to energy — ensuring peak performance across every shift.
          </p>
        </div>

        <div className="kpi-grid">
          {KPI_DATA.map((kpi, i) => (
            <KpiCard key={kpi.id} kpi={kpi} index={i} />
          ))}
        </div>

        <div className="kpi-footer-note">
          <span className="kpi-footer-dot" />
          Data refreshed every 30 seconds · Powered by PlantOS Digital Factory
        </div>
      </div>
    </section>
  )
}
