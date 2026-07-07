import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import '../styles/bap-digital-factory.css'

gsap.registerPlugin(ScrollTrigger, Flip)

const DASHBOARDS = [
  {
    title: 'Executive Dashboard',
    desc: 'Real-time KPIs, production analytics, shift monitoring and executive business intelligence.',
    detail: 'A consolidated command center for senior leadership, with live plant performance, throughput and quality metrics.',
    img: '/IC-executive-portfolio-dashboard-example.png',
    accent: 'linear-gradient(135deg, #2c3e8a, #6b5bde)',
  },
  {
    title: 'Cold Store Management',
    desc: 'Inventory tracking, pallet locations, stock movement, shipment control and cold storage monitoring.',
    detail: 'Complete cold-chain visibility for inventory, temperature control and shipment readiness across all storage zones.',
    img: '/guide-to-cold-storage.webp',
    accent: 'linear-gradient(135deg, #1f4769, #1fbfa8)',
  },
  {
    title: 'Process Overview',
    desc: 'Shrimp processing workflow from receiving through dispatch.',
    detail: 'A step-by-step look at material flow, process stages and quality gates from raw intake to finished export-ready product.',
    img: '/f09f4253-0f52-4877-98fd-ae31fdb4688f.jpg',
    accent: 'linear-gradient(135deg, #7e4bb8, #ff8f49)',
  },
  {
    title: 'Production Dashboard',
    desc: 'Monitor contractor productivity, batches, machine performance and daily production metrics.',
    detail: 'Operational visibility into batch counts, machine utilization, contractor output and performance versus target.',
    img: '/001824955-1.jpeg',
    accent: 'linear-gradient(135deg, #19345e, #2dc78f)',
  },
  {
    title: 'PlantOS Integration',
    desc: 'Machine monitoring, conveyors, PLC connectivity, alarms and production tracking.',
    detail: 'Real-time plant floor integration with sensors, PLCs, alarms and conveyor systems for faster response and uptime.',
    img: '/fresh-shrimp-lying-black-net-which-water-farm-370270568.webp',
    accent: 'linear-gradient(135deg, #2c3e8a, #ff8f49)',
  },
  {
    title: 'PPC Dashboard',
    desc: 'Division-wise contractor dashboards with Romeo, Bravo, Golf and Papa production statistics.',
    detail: 'Planner and production control dashboards for each contractor division, delivering clarity across schedules and outcomes.',
    img: '/ChatGPT Image Jul 6, 2026, 04_10_20 PM.png',
    accent: 'linear-gradient(135deg, #321a73, #6b5bde)',
  },
  {
    title: 'Inventory Dashboard',
    desc: 'Stock management, shipments, weight tracking, pallet management and export tools.',
    detail: 'A unified inventory command panel for raw materials, finished goods, shipment preparation and export readiness.',
    img: '/ChatGPT Image Jul 6, 2026, 04_24_58 PM.png',
    accent: 'linear-gradient(135deg, #0d4f6c, #1fbfa8)',
  },
  {
    title: 'Operations Dashboard',
    desc: 'Cold store operations, approvals, throughput, excess returns and processing statistics.',
    detail: 'Day-to-day operational oversight for cold storage, approvals, throughput efficiency, and return management.',
    img: '/ChatGPT Image Jul 6, 2026, 04_44_32 PM.png',
    accent: 'linear-gradient(135deg, #3b2f75, #ff8f49)',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Interactive charts, shift comparison, production trends, product breakdown and business insights.',
    detail: 'Deep analytics with trend comparisons, SKU performance, shift variance and insights for smarter planning.',
    img: '/ChatGPT Image Jul 6, 2026, 04_54_23 PM.png',
    accent: 'linear-gradient(135deg, #1f4769, #7e4bb8)',
  },
]

const dashboardImage = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `/${slug}.png`
}

export default function BaplatlaDigitalFactory() {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const overlayImageRef = useRef(null)
  const activeCardRef = useRef(null)
  const bodyOverflowRef = useRef('')
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [selectedIndex, setSelectedIndex] = useState(null)

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

  const resetOverlay = () => {
    const overlay = overlayRef.current
    const card = activeCardRef.current

    if (overlay) {
      gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
      overlay.classList.remove('is-open')
    }

    if (card) {
      gsap.to(card.querySelectorAll('.bap-digital-card-label, .bap-digital-card h3, .bap-digital-card p, .bap-digital-card-footer'), {
        opacity: 1,
        duration: 0.25,
        ease: 'power3.out',
      })
    }

    document.body.style.overflow = bodyOverflowRef.current || ''
    setSelectedIndex(null)
    activeCardRef.current = null
  }

  const closeOverlay = () => {
    const overlay = overlayRef.current
    const overlayImage = overlayImageRef.current
    const card = activeCardRef.current
    const sourceImage = card?.querySelector('.bap-digital-screenshot-image')

    if (!overlay || !overlayImage || !sourceImage) {
      resetOverlay()
      return
    }

    const state = Flip.getState(overlayImage)
    overlay.classList.remove('is-open')

    Flip.from(state, {
      targets: sourceImage,
      absolute: true,
      duration: 0.8,
      ease: 'power4.inOut',
      scale: true,
      onStart: () => {
        gsap.set(sourceImage, { autoAlpha: 1 })
      },
      onComplete: resetOverlay,
    })
  }

  const openOverlay = (index, event) => {
    const card = event.currentTarget.closest('.bap-digital-card')
    const sourceImage = card?.querySelector('.bap-digital-screenshot-image')
    const overlay = overlayRef.current
    const overlayImage = overlayImageRef.current

    if (!card || !sourceImage || !overlay || !overlayImage) return

    activeCardRef.current = card
    bodyOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const sourceSrc = DASHBOARDS[index].img
    if (!sourceSrc) return

    setSelectedIndex(index)
    gsap.to(card.querySelectorAll('.bap-digital-card-label, .bap-digital-card h3, .bap-digital-card p, .bap-digital-card-footer'), {
      opacity: 0,
      duration: 0.22,
      ease: 'power3.out',
    })

    const state = Flip.getState(sourceImage)
    overlayImage.src = sourceSrc
    gsap.set(overlay, { autoAlpha: 1 })
    overlay.classList.add('is-open')
    gsap.set(overlayImage, {
      borderRadius: '24px',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
      boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
    })
    Flip.from(state, {
      targets: overlayImage,
      absolute: true,
      duration: 0.8,
      ease: 'power4.inOut',
      scale: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { rotationX: 5, rotationY: -5, scale: 1, opacity: 0.95 },
          { rotationX: 0, rotationY: 0, scale: 1.08, opacity: 1, duration: 0.8, ease: 'power4.inOut' }
        )
      },
      onComplete: () => {
        gsap.to(overlayImage, {
          y: -8,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: 'sine.inOut',
        })
        gsap.to(overlayImage, {
          borderRadius: '16px',
          duration: 0.8,
          ease: 'power4.out',
        })
      },
    })
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeOverlay()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

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
          <p>
            Explore every digital section on this screen: executive control, cold store monitoring, process overview, production tracking,
            PlantOS integration, PPC reporting, inventory management, operations supervision and analytics.
          </p>
        </div>

        <div className="bap-digital-grid">
          {DASHBOARDS.map((item, index) => (
            <article key={index} className="bap-digital-card" style={{ '--accent': item.accent }}>
              <div className="bap-digital-card-inner">
                <div className="bap-digital-screenshot" onClick={(event) => openOverlay(index, event)}>
                  {item.img ? (
                    <img src={item.img} alt={item.title} className="bap-digital-screenshot-image" />
                  ) : (
                    <div className="bap-digital-screenshot-empty" aria-hidden />
                  )}
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

      <div
        ref={overlayRef}
        className="bap-digital-overlay"
        onClick={(event) => {
          if (event.target === overlayRef.current) closeOverlay()
        }}
      >
        <div className="bap-digital-overlay-inner">
          <button className="bap-digital-overlay-close" onClick={closeOverlay} aria-label="Close image preview">
            <span />
            <span />
          </button>
          <div className="bap-digital-overlay-pane">
            <img ref={overlayImageRef} src={selectedIndex !== null ? DASHBOARDS[selectedIndex].img : ''} alt="Expanded dashboard" />
          </div>
          {selectedIndex !== null && (
            <div className="bap-digital-overlay-copy">
              <h3>{DASHBOARDS[selectedIndex].title}</h3>
              <p>{DASHBOARDS[selectedIndex].detail || DASHBOARDS[selectedIndex].desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
