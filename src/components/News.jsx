import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function News() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from(gridRef.current?.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="news" className="news">
      <div className="news-inner">
        <div ref={headerRef} className="news-header">
          <div>
            <div className="section-label">Latest Updates</div>
            <h2 className="section-title">
              News & <span className="gold">Insights</span>
            </h2>
          </div>
          <button className="ghost-btn">View All News</button>
        </div>

        <div ref={gridRef} className="news-grid">
          <div className="news-card featured">
            <div className="news-img">🗞️</div>
            <div className="news-body">
              <span className="news-category">Corporate</span>
              <h3 className="news-title">Choice Group Announces Strategic Expansion into Renewable Energy</h3>
              <span className="news-date">October 15, 2023</span>
            </div>
          </div>

          <div className="news-card">
            <div className="news-img">🏆</div>
            <div className="news-body">
              <span className="news-category">Awards</span>
              <h3 className="news-title">Recognized for Excellence in Export Quality</h3>
              <span className="news-date">September 28, 2023</span>
            </div>
          </div>

          <div className="news-card">
            <div className="news-img">🤝</div>
            <div className="news-body">
              <span className="news-category">Partnerships</span>
              <h3 className="news-title">New Global Logistics Hub Opened in Dubai</h3>
              <span className="news-date">August 12, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
