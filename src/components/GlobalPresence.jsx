import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GlobalPresence() {
  const sectionRef = useRef(null)
  const mapRef = useRef(null)
  const infoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map scale
      gsap.from(mapRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 1, scale: 0.9, duration: 1.2, ease: 'power3.out'
      })
      gsap.from(infoRef.current?.children, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 1, x: 40, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="global" className="global">
      <div className="global-inner">
        <div ref={mapRef} className="global-map">
          {/* Simple SVG World Map Placeholder */}
          <svg className="world-svg" viewBox="0 0 1000 500" fill="currentColor">
            <path d="M150,120 Q180,80 220,100 T280,110 T320,80 T380,100 T420,130 T390,160 T340,180 T280,160 T220,180 T180,160 Z" />
            <path d="M480,100 Q520,70 560,90 T620,80 T680,110 T720,150 T680,180 T620,170 T580,200 T520,180 Z" />
            <path d="M220,250 Q260,230 300,260 T340,300 T310,350 T280,380 T240,360 T200,320 Z" />
            <path d="M520,240 Q560,210 600,230 T640,280 T610,340 T560,320 T530,280 Z" />
            <path d="M750,280 Q780,260 820,290 T850,330 T810,360 T760,340 Z" />
          </svg>
          
          <div className="map-markers">
            <div className="map-marker marker-hq" style={{ left: '62%', top: '48%' }}>
              <div className="marker-ring" />
              <div className="marker-ring" />
              <div className="marker-ring" />
              <div className="marker-dot" />
              <div className="marker-label">Kochi, India (HQ)</div>
            </div>
            
            <div className="map-marker" style={{ left: '25%', top: '35%' }}>
              <div className="marker-ring" />
              <div className="marker-dot" />
              <div className="marker-label">New York, USA</div>
            </div>
            
            <div className="map-marker" style={{ left: '85%', top: '38%' }}>
              <div className="marker-ring" />
              <div className="marker-dot" />
              <div className="marker-label">Tokyo, Japan</div>
            </div>
            
            <div className="map-marker" style={{ left: '80%', top: '42%' }}>
              <div className="marker-ring" />
              <div className="marker-dot" />
              <div className="marker-label">Seoul, South Korea</div>
            </div>
            
            <div className="map-marker" style={{ left: '22%', top: '28%' }}>
              <div className="marker-ring" />
              <div className="marker-dot" />
              <div className="marker-label">Toronto, Canada</div>
            </div>
          </div>
        </div>

        <div ref={infoRef} className="global-info">
          <div className="section-label">Global Presence</div>
          <h2 className="section-title">
            Connecting <span className="gold">Continents</span>
          </h2>
          <p className="section-desc" style={{ marginBottom: '3rem' }}>
            From our headquarters in Kochi, we coordinate a massive global operation. Our international offices ensure seamless service delivery across major markets.
          </p>

          <h3>Active Operations Hubs</h3>
          <div className="global-offices">
            <div className="office-card">
              <div className="office-flag">🇮🇳</div>
              <div>
                <span className="office-city">Kochi, India</span>
                <span className="office-type">Global Headquarters</span>
              </div>
              <div className="office-status">
                <div className="status-dot" /> Active
              </div>
            </div>
            
            <div className="office-card">
              <div className="office-flag">🇺🇸</div>
              <div>
                <span className="office-city">New York, USA</span>
                <span className="office-type">North America Hub</span>
              </div>
              <div className="office-status">
                <div className="status-dot" /> Active
              </div>
            </div>

            <div className="office-card">
              <div className="office-flag">🇯🇵</div>
              <div>
                <span className="office-city">Tokyo, Japan</span>
                <span className="office-type">East Asia Operations</span>
              </div>
              <div className="office-status">
                <div className="status-dot" /> Active
              </div>
            </div>
          </div>

          <button className="ghost-btn">
            View Global Network
          </button>
        </div>
      </div>
    </section>
  )
}
