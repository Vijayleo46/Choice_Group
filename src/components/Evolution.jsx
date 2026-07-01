import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '1962', event: 'The Genesis of Choice', desc: 'Choice Canning is founded by visionary entrepreneur O.C. Thomas, laying the cornerstone of a global conglomerate.' },
  { year: '1969', event: 'Pioneering Block Frozen Technology', desc: 'A bold technological pivot marks the end of canning as Choice introduces block freezing, setting a new industry benchmark.' },
  { year: '1978', event: 'Charting New Waters', desc: 'Stepping beyond marine exports, the group establishes Choice Intermodal Services, entering shipping, logistics, and trading.' },
  { year: '1987', event: 'Planting Global Roots', desc: 'Choice establishes its first international corporate outpost on Rector Street in New York, securing direct access to the US.' },
  { year: '1990', event: 'Peak Honors & Tech Supremacy', desc: 'Opening the flagship Cochin IQF facility, the group receives the prestigious President’s Export Award for seafood leadership.' },
  { year: '1991', event: 'Fostering Future Minds', desc: 'Believing in community empowerment, the group launches The Choice School, introducing premium, value-based education.' },
  { year: '1995', event: 'Global Alliances & Shipping Supremacy', desc: 'Choice is appointed South India\'s representative for HMM South Korea, scaling international cargo operations.' },
  { year: '1999', event: 'The Birth of ‘Tastee Choice’', desc: 'Breaking retail boundaries, Choice launches its own brand, Tastee Choice, supplying premium seafood directly to US supermarkets.' },
  { year: '2005', event: 'Conquering the US Retail Market', desc: 'Secures a massive retail breakthrough, placing premium meal kits in 46 Shop Rite supermarket chains across the US.' },
  { year: '2008', event: 'Cultural Patronage & Market Leadership', desc: 'Establishing JTPac performing arts center, while Tastee Choice captures the #1 spot in the US unbreaded shrimp market.' },
  { year: '2010-12', event: 'Vertical Luxury & Ecological Wonders', desc: 'Inaugurating Choice Paradise, South India’s tallest green tower built on an 80% ecological concept, as student strength crosses 2,000.' },
  { year: '2015-16', event: 'Expanding the Educational Legacy', desc: 'Choice School expands with state-of-the-art campuses in Thiruvalla and Kozhikode, alongside a modern Kinderland pre-school network.' }
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
