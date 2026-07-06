import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/bap-digital-factory.css'

gsap.registerPlugin(ScrollTrigger)

const DASHBOARDS = [
  {
    title: 'Executive Dashboard',
    desc: 'Real-time KPIs, production analytics, shift monitoring and executive business intelligence.',
    accent: 'linear-gradient(135deg, #2c3e8a, #6b5bde)',
  },
  {
    title: 'Cold Store Management',
    desc: 'Inventory tracking, pallet locations, stock movement, shipment control and cold storage monitoring.',
    accent: 'linear-gradient(135deg, #1f4769, #1fbfa8)',
  },
  {
    title: 'Process Overview',
    desc: 'Interactive visualization of the complete shrimp processing workflow from Receiving to Dispatch.',
    accent: 'linear-gradient(135deg, #7e4bb8, #ff8f49)',
  },
  {
    title: 'Production Dashboard',
    desc: 'Monitor contractor productivity, batches, machine performance and daily production metrics.',
    accent: 'linear-gradient(135deg, #19345e, #2dc78f)',
  },
  {
    title: 'PlantOS Integration',
    desc: 'Machine monitoring, conveyors, PLC connectivity, alarms and production tracking.',
    accent: 'linear-gradient(135deg, #2c3e8a, #ff8f49)',
  },
  {
    title: 'PPC Dashboard',
    desc: 'Division-wise contractor dashboards with Romeo, Bravo, Golf and Papa production statistics.',
    accent: 'linear-gradient(135deg, #321a73, #6b5bde)',
  },
  {
    title: 'Inventory Dashboard',
    desc: 'Stock management, shipments, weight tracking, pallet management and export tools.',
    accent: 'linear-gradient(135deg, #0d4f6c, #1fbfa8)',
  },
  {
    title: 'Operations Dashboard',
    desc: 'Cold store operations, approvals, throughput, excess returns and processing statistics.',
    accent: 'linear-gradient(135deg, #3b2f75, #ff8f49)',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Interactive charts, shift comparison, production trends, product breakdown and business insights.',
    accent: 'linear-gradient(135deg, #1f4769, #7e4bb8)',
  },
]

export default function BaplatlaDigitalFactory() {
  const sectionRef = useRef(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
        opacity: 0,
        y: 44,
        duration: 1.1,
        ease: 'power3.out',
      })

      gsap.from('.bap-digital-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        opacity: 0,
        y: 38,
        scale: 0.96,
        stagger: 0.11,
        duration: 1,
        ease: 'power4.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (event) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10
    setPointer({ x, y })
  }

  return (
    <section
      ref={sectionRef}
      className="bap-digital-section"
      onMouseMove={handleMouseMove}
      style={{ '--pointer-x': `${pointer.x}px`, '--pointer-y': `${pointer.y}px` }}
    >
      <div className="bap-digital-inner">
        <div className="bap-digital-copy">
          <span className="bap-digital-label">DIGITAL ECOSYSTEM</span>
          <h2>Digital Factory Platform</h2>
          <div className="bap-digital-divider" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <p>
            A complete suite of intelligent dashboards powering every stage of production—from receiving to dispatch,
            inventory, quality control, and executive analytics.
          </p>
        </div>

        <div className="bap-digital-grid">
          {DASHBOARDS.map((item, index) => (
            <article key={index} className="bap-digital-card" style={{ '--accent': item.accent }}>
              <div className="bap-digital-card-inner">
                <div className="bap-digital-screenshot">
                  <div className="bap-digital-screenshot-frame" />
                  <div className="bap-digital-screenshot-ui" />
                </div>

                <div className="bap-digital-card-body">
                  <div className="bap-digital-card-label">Live</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="bap-digital-card-footer">
                  <span className="bap-digital-action">Launch</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
