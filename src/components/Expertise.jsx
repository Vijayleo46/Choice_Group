import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertise = [
  {
    id: 'marine', title: 'Marine Exports', icon: '⚓',
    tags: ['Seafood', 'Processing', 'Global Export'],
    desc: 'Pioneering marine exports since 1962 with state-of-the-art processing and cold chain facilities.',
    detail: 'Choice Canning Company began its marine export journey in 1962. Today we are the #1 unbreaded shrimp brand in the USA, with EU & FDA approved facilities, IQF processing plants, and a global cold chain spanning India, USA, Canada, Japan and South Korea.',
    img: '/36_Tastee Choice-02.jpg',
    stat1: '#1', stat1l: 'USA Shrimp Brand',
    stat2: '60+', stat2l: 'Years Experience',
    stat3: '5', stat3l: 'Export Markets',
  },
  {
    id: 'foods', title: 'Food Production', icon: '🍽️',
    tags: ['Ready-to-eat', 'Quality', 'Distribution'],
    desc: 'Delivering premium packaged foods and ready-to-eat products globally under the Tastee Choice brand.',
    detail: 'Under the Tastee Choice brand, we manufacture premium frozen meal kits and ready-to-eat products. Our products are sold in 46+ Shop Rite outlets across North Eastern USA and major supermarket chains globally.',
    img: '/37_Choice-Canning-Factory-01.jpg',
    stat1: '46+', stat1l: 'US Retail Outlets',
    stat2: '1990', stat2l: 'IQF Factory Est.',
    stat3: 'Global', stat3l: 'Distribution',
  },
  {
    id: 'logistics', title: 'Logistics', icon: '📦',
    tags: ['Supply Chain', 'Warehousing', 'Transport'],
    desc: 'End-to-end logistics solutions ensuring seamless global supply chain management.',
    detail: 'Choice Intermodal Services provides comprehensive logistics and shipping agency services. Established as South India agents of Hyundai Merchant Marine of South Korea, we handle cargo, warehousing and end-to-end supply chain solutions.',
    img: '/warehouse.jpg.png',
    stat1: '1978', stat1l: 'Established',
    stat2: 'S.India', stat2l: 'Agent HMM Korea',
    stat3: 'End-to-End', stat3l: 'Solutions',
  },
  {
    id: 'construction', title: 'Construction', icon: '🏗️',
    tags: ['Real Estate', 'Infrastructure', 'Design'],
    desc: 'Building sustainable and innovative spaces that redefine modern living and working.',
    detail: 'Choice Paradise — South India\'s tallest residential building — stands as a testament to our construction excellence. Built with 80% green concept, we also developed Choice Village (51 luxury homes) and Choice Marina luxury apartments.',
    img: '/63_Choice-Paradise-07.jpg',
    stat1: 'S.India', stat1l: 'Tallest Bldg',
    stat2: '51', stat2l: 'Luxury Homes',
    stat3: '80%', stat3l: 'Green Design',
  },
  {
    id: 'education', title: 'Education', icon: '🎓',
    tags: ['Schools', 'Excellence', 'Future'],
    desc: 'Fostering the next generation of leaders through world-class educational institutions.',
    detail: 'The Choice School, founded in 1991, has grown into one of Kerala\'s finest institutions with campuses in Tripunithura, Kozhikode, and Thiruvalla. With 2000+ students and 180 staff, we nurture minds with value-based education and world-class infrastructure.',
    img: '/DSC_8013.jpg',
    stat1: '2000+', stat1l: 'Students',
    stat2: '180+', stat2l: 'Staff Members',
    stat3: '4', stat3l: 'Campuses',
  },
  {
    id: 'tech', title: 'Technology', icon: '💻',
    tags: ['Innovation', 'IT Solutions', 'Digital'],
    desc: 'Driving digital transformation and cutting-edge technological solutions.',
    detail: 'Our technology division drives digital transformation across all Choice Group businesses and external clients. From ERP solutions to digital supply chain management, we deliver innovative tech solutions for the modern enterprise.',
    img: '/Gemini_Generated_Image_rix6jwrix6jwrix6.png',
    stat1: 'Digital', stat1l: 'Transformation',
    stat2: 'ERP', stat2l: 'Solutions',
    stat3: 'Modern', stat3l: 'Enterprise',
  },
  {
    id: 'shipping', title: 'Shipping', icon: '🚢',
    tags: ['Vessels', 'Charter', 'Operations'],
    desc: 'Comprehensive shipping operations and vessel management across major trade routes.',
    detail: 'Choice began its shipping journey in 1978 as representatives of The Maldives Shipping Line. Today we handle cargo operations, vessel management and shipping agency services across India\'s major ports, focusing on tea, spices and seafood exports.',
    img: '/warehouse.jpg.png',
    stat1: '1978', stat1l: 'Established',
    stat2: 'Multi', stat2l: 'Port Operations',
    stat3: 'Global', stat3l: 'Trade Routes',
  },
  {
    id: 'jtpac', title: 'JTPac Arts', icon: '🎭',
    tags: ['Performing Arts', 'Theatre', 'Culture'],
    desc: 'A world-class performing arts centre with a 625-seat theatre and state-of-the-art equipment.',
    detail: 'JTPac — Jose Thomas Performing Arts Centre — was established in 2008 with a vision to preserve, nurture and celebrate the performing arts. With a 625-seat theatre equipped with state-of-the-art sound and lighting, JTPac is a performing space par excellence.',
    img: '/70_Jtpac-photo-06.jpg',
    stat1: '625', stat1l: 'Seat Theatre',
    stat2: '2008', stat2l: 'Established',
    stat3: 'State-of-Art', stat3l: 'Equipment',
  },
]

export default function Expertise() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const gridRef     = useRef(null)
  const panelRef    = useRef(null)
  const overlayRef  = useRef(null)
  const [active, setActive] = useState(null)

  // Ensure all elements are visible immediately (no initial hidden state)
  useEffect(() => {
    const elems = [];
    if (headerRef.current) elems.push(headerRef.current);
    if (gridRef.current) elems.push(gridRef.current);
    gsap.set(elems, { opacity: 1, y: 0 });
  }, []);

  // Scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 1, y: 30, duration: 0.8, ease: 'power3.out'
      })
      gsap.from(gridRef.current?.children, {
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        opacity: 1, y: 50, stagger: 0.08, duration: 0.7, ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Open panel
  const openPanel = (item) => {
    setActive(item)
    document.body.style.overflow = 'hidden'
    gsap.set(overlayRef.current, { display: 'block' })
    gsap.set(panelRef.current, { x: '100%' })
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    gsap.to(panelRef.current, { x: '0%', duration: 0.6, ease: 'power4.out' })
    // Animate panel children
    gsap.from(panelRef.current.querySelectorAll('.panel-anim'), {
      opacity: 0, y: 30, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.3
    })
  }

  // Close panel
  const closePanel = () => {
    gsap.to(panelRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.4, ease: 'power2.in',
      onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' })
        setActive(null)
        document.body.style.overflow = ''
      }
    })
  }

  return (
    <section ref={sectionRef} id="expertise" className="expertise">
      <div className="expertise-inner">

        <div ref={headerRef} className="expertise-header">
          <div className="section-label">Areas of Expertise</div>
          <h2 className="section-title">Diversified <span className="gold">Excellence</span></h2>
          <p className="section-desc">
            With decades of experience across multiple sectors, the Choice Group has established a track record of innovation, quality, and leadership.
          </p>
        </div>

        <div ref={gridRef} className="expertise-grid">
          {expertise.map((item) => (
            <div key={item.id} className="expertise-card" onClick={() => openPanel(item)}>
              <div className="expertise-card-bg" />
              <div className="expertise-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="expertise-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="expertise-tag">{tag}</span>
                ))}
              </div>
              <div className="expertise-arrow">↗</div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="expertise-overlay"
        style={{ display: 'none', opacity: 0 }}
        onClick={closePanel}
      />

      {/* Slide-in panel */}
      <div ref={panelRef} className="expertise-panel">
        {active && (
          <>
            <div
              className="expertise-panel-img panel-anim"
              style={{ backgroundImage: `url("${active.img}")` }}
            >
              <div className="expertise-panel-img-overlay" />
              <button className="expertise-panel-close" onClick={closePanel}>✕</button>
              <div className="expertise-panel-img-title panel-anim">
                <span>{active.icon}</span>
                <h2>{active.title}</h2>
              </div>
            </div>

            <div className="expertise-panel-body">
              <div className="expertise-panel-tags panel-anim">
                {active.tags.map(t => (
                  <span key={t} className="expertise-tag">{t}</span>
                ))}
              </div>

              <p className="expertise-panel-desc panel-anim">{active.detail}</p>

              <div className="expertise-panel-stats panel-anim">
                <div className="ep-stat">
                  <span className="ep-stat-num">{active.stat1}</span>
                  <span className="ep-stat-label">{active.stat1l}</span>
                </div>
                <div className="ep-stat">
                  <span className="ep-stat-num">{active.stat2}</span>
                  <span className="ep-stat-label">{active.stat2l}</span>
                </div>
                <div className="ep-stat">
                  <span className="ep-stat-num">{active.stat3}</span>
                  <span className="ep-stat-label">{active.stat3l}</span>
                </div>
              </div>

              <button className="gold-btn panel-anim" onClick={closePanel} style={{ marginTop: '1rem' }}>
                <span>Close</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
