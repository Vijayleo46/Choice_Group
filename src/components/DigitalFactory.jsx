import './DigitalFactory.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Executive Dashboard',
    desc: 'Real-time KPIs, production analytics, shift monitoring and executive business intelligence.',
    img: '/qa_1.png'
  },
  {
    title: 'Cold Store Management',
    desc: 'Inventory tracking, pallet locations, stock movement, shipment control and cold storage monitoring.',
    img: '/qa2.png'
  },
  {
    title: 'Process Overview',
    desc: 'Interactive visualization of the complete shrimp processing workflow from Receiving to Dispatch.',
    img: '/QCbC1.png'
  },
  {
    title: 'Production Dashboard',
    desc: 'Monitor contractor productivity, production batches, machine performance and daily factory metrics.',
    img: '/QCbC2.png'
  },
  {
    title: 'PlantOS Integration',
    desc: 'Machine monitoring, PLC connectivity, conveyors, alarms and production tracking.',
    img: '/qa_1.png'
  },
  {
    title: 'PPC Dashboard',
    desc: 'Division-wise contractor dashboards with Romeo, Bravo, Golf and Papa production statistics.',
    img: '/qa2.png'
  },
  {
    title: 'Inventory Dashboard',
    desc: 'Stock management, pallet movement, shipment tracking, export tools and warehouse operations.',
    img: '/QCbC1.png'
  },
  {
    title: 'Operations Dashboard',
    desc: 'Cold store operations, approvals, throughput, excess returns and processing statistics.',
    img: '/QCbC2.png'
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Interactive charts, shift comparison, production trends, product analytics and executive insights.',
    img: '/qa_1.png'
  }
]

export default function DigitalFactory({ onOpenColdStore }) {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.df-label, .df-our, .df-title, .df-marker, .df-copy'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="digital-factory" id="digital-factory">
      <div className="df-inner">
        <div className="df-watermark" aria-hidden>DIGITAL</div>

        <header className="df-copy-block">
          <div className="df-label">DIGITAL ECOSYSTEM</div>
          <h2 className="df-heading">
            <span className="df-our">OUR DIGITAL</span>
            <span className="df-title">Factory Platform</span>
          </h2>
          <div className="df-marker">
            <span className="df-marker-line" />
            <span className="df-marker-dot" />
            <span className="df-marker-line" />
          </div>
          <p className="df-copy">A complete suite of intelligent dashboards powering every stage of production—from receiving to dispatch, inventory, quality control, inventory management, executive reporting and business intelligence.</p>
        </header>

        <div ref={gridRef} className="df-grid">
          {cards.map((card, index) => (
            <article key={index} className="df-card" tabIndex={0}>
              <div className="df-card-inner">
                <div className="df-card-media">
                  <img src={card.img} alt={card.title} />
                  <div className="df-badge">
                    <span className="df-badge-text">LIVE</span>
                    <span className="df-badge-dot" />
                  </div>
                </div>

                <div className="df-card-body">
                  <h3 className="df-card-title">{card.title}</h3>
                  <p className="df-card-desc">{card.desc}</p>
                  <div className="df-card-cta">
                    <button
                      className="df-btn"
                      onClick={() => {
                        if (card.title === 'Cold Store Management' && typeof onOpenColdStore === 'function') {
                          onOpenColdStore()
                        } else {
                          window.open('#', '_self')
                        }
                      }}
                    >
                      <span>Launch Dashboard</span>
                      <svg className="df-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="df-footer">
          <span className="df-footer-line" />
          <span>POWERING EXCELLENCE • DRIVING INNOVATION • DELIVERING RESULTS</span>
        </div>
      </div>
    </section>
  )
}
