import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/factory-gallery.css'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  { id: 1, label: 'Drone View', icon: '🚁', src: '/37_Choice-Canning-Factory-01.jpg', span: 'wide', desc: 'Aerial view of the 140,000 sq.ft Bapatla campus' },
  { id: 2, label: 'Processing Hall', icon: '⚙️', src: '/f09f4253-0f52-4877-98fd-ae31fdb4688f.jpg', span: 'normal', desc: 'State-of-the-art automated processing lines' },
  { id: 3, label: 'Cold Storage', icon: '❄️', src: '/guide-to-cold-storage.webp', span: 'normal', desc: '−18°C finished goods storage at 2,000 MT capacity' },
  { id: 4, label: 'Packaging', icon: '📦', src: '/001824955-1.jpeg', span: 'normal', desc: 'Export-grade packaging and carton sealing' },
  { id: 5, label: 'Laboratory', icon: '🔬', src: '/fresh-shrimp-lying-black-net-which-water-farm-370270568.webp', span: 'normal', desc: 'NABL-accredited in-house quality testing lab' },
  { id: 6, label: 'Warehouse', icon: '🏗️', src: '/IC-executive-portfolio-dashboard-example.png', span: 'wide', desc: 'Finished goods warehouse with racking systems' },
  { id: 7, label: 'Office', icon: '💼', src: '/ChatGPT Image Jul 6, 2026, 04_10_20 PM.png', span: 'normal', desc: 'Digital operations command center' },
  { id: 8, label: 'Dispatch', icon: '🚢', src: '/ChatGPT Image Jul 6, 2026, 04_24_58 PM.png', span: 'normal', desc: 'Reefer container loading at dispatch bay' },
]

export default function FactoryGallery() {
  const sectionRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fgal-header-label', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.fgal-headline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 40, duration: 1, ease: 'power4.out', delay: 0.1,
      })
      gsap.from('.fgal-tile', {
        scrollTrigger: { trigger: '.fgal-grid', start: 'top 85%', once: true },
        opacity: 0, scale: 0.9, y: 30,
        stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Keyboard handler
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') setLightbox(l => (l + 1) % GALLERY_ITEMS.length)
      if (e.key === 'ArrowLeft') setLightbox(l => (l - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const openLightbox = (index) => {
    setLightbox(index)
    document.body.style.overflow = 'hidden'
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
    }
  }
  const closeLightbox = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        autoAlpha: 0, duration: 0.25,
        onComplete: () => { setLightbox(null); document.body.style.overflow = '' },
      })
    } else {
      setLightbox(null)
      document.body.style.overflow = ''
    }
  }

  return (
    <section ref={sectionRef} id="factory-gallery" className="fgal-section">
      <div className="fgal-bg">
        <div className="fgal-orb fgal-orb-1" />
        <div className="fgal-grid-lines" />
      </div>

      <div className="fgal-inner">
        <div className="fgal-header">
          <div className="fgal-header-label">
            <span className="fgal-header-dot" />
            Visual Tour
          </div>
          <h2 className="fgal-headline">
            Factory<br />
            <span className="fgal-headline-gold">Gallery</span>
          </h2>
          <p className="fgal-subline">
            A visual journey through our world-class processing campus.
            Click any image to view in fullscreen.
          </p>
        </div>

        <div className="fgal-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`fgal-tile fgal-tile--${item.span}`}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.label}`}
            >
              <img src={item.src} alt={item.label} className="fgal-tile-img" loading="lazy" />
              <div className="fgal-tile-overlay">
                <div className="fgal-tile-icon">{item.icon}</div>
                <div className="fgal-tile-label">{item.label}</div>
                <div className="fgal-tile-expand">↗</div>
              </div>
              <div className="fgal-tile-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          ref={overlayRef}
          className="fgal-lightbox"
          onClick={closeLightbox}
        >
          <div className="fgal-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="fgal-lb-close" onClick={closeLightbox}>×</button>
            <button className="fgal-lb-prev" onClick={() => setLightbox(l => (l - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}>‹</button>
            <button className="fgal-lb-next" onClick={() => setLightbox(l => (l + 1) % GALLERY_ITEMS.length)}>›</button>
            <img
              src={GALLERY_ITEMS[lightbox].src}
              alt={GALLERY_ITEMS[lightbox].label}
              className="fgal-lb-img"
            />
            <div className="fgal-lb-caption">
              <span className="fgal-lb-icon">{GALLERY_ITEMS[lightbox].icon}</span>
              <div>
                <div className="fgal-lb-title">{GALLERY_ITEMS[lightbox].label}</div>
                <div className="fgal-lb-desc">{GALLERY_ITEMS[lightbox].desc}</div>
              </div>
              <div className="fgal-lb-counter">{lightbox + 1} / {GALLERY_ITEMS.length}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
