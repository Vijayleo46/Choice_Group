import './DigitalFactory.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Executive Dashboard',
    status: 'Live',
    desc: 'Real-time KPIs, production analytics, shift monitoring and executive business intelligence.',
    img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Cold Store Management',
    status: 'Launch',
    desc: 'Inventory tracking, pallet locations, stock movement, shipment control and cold storage monitoring.',
    img: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Quality Control',
    status: 'Live',
    desc: 'Automated QC checks, anomaly detection and audit-ready traceability.',
    img: 'https://images.unsplash.com/photo-1581091215367-6d7b2a7b7d2f?q=80&w=1400&auto=format&fit=crop'
  }
]

export default function DigitalFactory({ onOpenColdStore }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.df-heading, .df-subtitle'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="digital-factory" id="digital-factory">
      <div className="df-inner">
        <header className="df-header">
          <h2 className="df-heading">
            <span className="df-our">OUR DIGITAL</span>
            <span className="df-title">Factory Platform</span>
            <span className="df-underline" aria-hidden></span>
            <span className="df-dot" aria-hidden></span>
          </h2>
          <p className="df-subtitle">A complete suite of intelligent dashboards powering every stage of production—from receiving to dispatch, inventory, quality control, and executive analytics.</p>
          <div className="df-core" aria-labelledby="df-core-heading">
            <h3 id="df-core-heading">Core Capabilities</h3>
            <p>
              For over seven decades, Choice Canning Company has continuously evolved its capabilities to meet the highest international expectations. Our integrated operations combine innovation, precision, sustainability, and advanced technology to deliver seafood solutions trusted by customers worldwide.
            </p>
            <p className="df-tagline">"Engineered for Excellence. Trusted Worldwide."</p>
          </div>
        </header>

        <div ref={gridRef} className="df-grid">
          {cards.map((c, i) => (
            <article key={i} className="df-card" tabIndex={0}>
              <div className="df-card-inner">
                <div className="df-card-media">
                  <img src={c.img} alt={c.title} />
                  <div className="df-badge">
                    <span className="df-badge-text">{c.status.toUpperCase()}</span>
                    <span className="df-badge-dot" />
                  </div>
                </div>

                <div className="df-card-body">
                  <h3 className="df-card-title">{c.title}</h3>
                  <p className="df-card-desc">{c.desc}</p>
                  <div className="df-card-cta">
                      <button
                        className="df-btn"
                        onClick={() => {
                          if (c.title === 'Cold Store Management' && typeof onOpenColdStore === 'function') {
                            onOpenColdStore()
                          } else {
                            // fallback: open in new tab or noop
                            window.open('#', '_self')
                          }
                        }}
                      >
                        <span>Launch Dashboard</span>
                        <svg className="df-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="#C8A45D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                </div>

                <div className="df-reflection" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
