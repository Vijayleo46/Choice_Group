import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '1950', event: 'Choice Canning Established', desc: 'Founded by OC Thomas with 25 employees, focusing on canned shrimp exports to Canada.' },
  { year: '1969', event: 'Technological Leap', desc: 'Introduced modern block frozen shrimp technology, revolutionizing the processing method.' },
  { year: '1978', event: 'Diversification into Shipping', desc: 'Choice Intermodal Services established, marking our entry into the shipping and logistics sector.' },
  { year: '1987', event: 'First Overseas Office', desc: 'Established our first international presence in New York, USA.' },
  { year: '1991', event: 'Education & Real Estate', desc: 'Launched Choice School with a vision of value education, and began our real estate division.' },
  { year: '1999', event: 'Tastee Choice Brand Born', desc: 'Established our own brand "Tastee Choice" for direct supply to US supermarkets.' },
  { year: '2008', event: 'USA Leadership & JTPac', desc: 'Achieved #1 ranking in USA unbreaded shrimp category and established JTPac performing arts theatre.' },
  { year: '2026', event: 'Global Legacy Continues', desc: 'Over 60 years of excellence spanning Marine Exports, Foods, Logistics, Shipping, Construction, Education & Technology.' }
]

export default function Evolution() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line grows
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none'
      })

      // Timeline items staggered fade
      if (itemsRef.current.length > 0) {
        itemsRef.current.forEach((item, i) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
            opacity: 1,
            x: i % 2 === 0 ? -40 : 40,
            duration: 0.8,
            ease: 'power3.out'
          })
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="evolution" className="evolution">
      <div className="evolution-inner">
        <div className="evolution-header">
          <div className="section-label">Our Journey</div>
          <h2 className="section-title">
            The <span className="gold">Evolution</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            A chronological look at how we grew from a single entity into a diversified global conglomerate.
          </p>
        </div>

        <div className="timeline">
          <div ref={lineRef} className="timeline-line" />

          <div className="timeline-items">
            {timeline.map((item, i) => (
              <div key={item.year} className="timeline-item" ref={el => itemsRef.current[i] = el}>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-event">{item.event}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>

                <div className="timeline-center">
                  <div className="timeline-node">
                    <span style={{ fontSize: '10px' }}>✦</span>
                  </div>
                </div>

                <div className="timeline-spacer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
