import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '1950', event: 'The Spark of an Idea', desc: 'An idea sparks in the mind of OC Thomas; and an empire is born.' },
  { year: '1950', event: 'Choice Canning Established', desc: 'Founded on November 1st by OC Thomas, Madhavan Nair and PK Nair with 25 employees, focusing on canned shrimp exports to Canada.' },
  { year: '1969', event: 'Block Frozen Technology', desc: 'Introduced modern block frozen shrimp technology, revolutionizing the processing method.' },
  { year: '1972', event: 'New Leadership Begins', desc: 'Jose Thomas joins the partnership with his mother and brothers after OC Thomas passes away on October 3rd.' },
  { year: '1974', event: 'First Own Factory', desc: 'Built first factory at Kannamally producing block frozen shrimp, expanding to 350 staff members.' },
  { year: '1978', event: 'Diversification into Shipping', desc: 'Choice Intermodal Services established as representatives of Maldives Shipping line, focusing on tea and spices.' },
  { year: '1983', event: 'The Monogram', desc: 'The Choice logo is designed to symbolize a global company spanning many divisions.' },
  { year: '1987', event: 'First Overseas Office', desc: 'Established first international presence at 19 Rector Street, New York, USA.' },
  { year: '1990', event: 'IQF Technology & Presidential Award', desc: 'First IQF Factory at Thoppumpady, Cochin. Received President\'s Award for highest seafood exports from India.' },
  { year: '1991', event: 'Choice School & Tours Launched', desc: 'Choice School started with vision of value education. Acquired United Tours, renamed Choice Tours and Travels.' },
  { year: '1992', event: 'Real Estate Expansion', desc: 'Launched Choice Village with 51 luxury independent homes. Set up processing plant in Nellore, Andhra Pradesh.' },
  { year: '1993', event: 'Export Leadership', desc: 'Jose Thomas heads Kerala chapter of Federation of Indian Export Organization. Obtained BRC Certification.' },
  { year: '1995', event: 'Shipping & Real Estate Growth', desc: 'Appointed South India agent of Hyundai Merchant Marine. Launched residential-commercial complex in Cochin.' },
  { year: '1996', event: 'Aviation Initiative', desc: 'Partnered with AP Mueller to promote Choice Airlines, pioneering vision for domestic aviation connectivity.' },
  { year: '1999', event: 'Tastee Choice Brand Born', desc: 'Established own brand "Tastee Choice" for direct supply to US supermarkets. Started Kinderland at Thripunithura.' },
  { year: '2003', event: 'BRC Certification', desc: 'Choice Canning Company obtains British Retail Consortium Certification.' },
  { year: '2004', event: 'ISO Certification & US Expansion', desc: 'Obtained ISO-9002 certification. Expanded business partnership with Ahold USA.' },
  { year: '2005', event: 'Frozen Food Business', desc: 'Diversified into frozen food manufacturing meal kits. Major breakthrough with Shop Rite supermarkets (46 outlets).' },
  { year: '2008', event: '#1 in USA & JTPac', desc: 'Achieved #1 ranking in USA unbreaded shrimp category. Established JTPac performing arts theatre with 625 seats.' },
  { year: '2010', event: 'Choice Paradise & Marina', desc: 'South India\'s tallest residential building inaugurated. New IQF factory at Palluruthy. Choice School reaches 2000 students.' },
  { year: '2012', event: 'Choice Paradise Completed', desc: 'South India\'s tallest residential building with 80% green concept completed.' },
  { year: '2014', event: 'Kinderland Expansion', desc: 'Choice Kinderland started at Parvana, Fort Kochi.' },
  { year: '2015', event: 'Multi-City School Launch', desc: 'Choice School Kozhikode launched. Kerala CM laid foundation for Thiruvalla campus. Kinderland expanded to 4 locations.' },
  { year: '2016', event: 'Educational Excellence', desc: 'Choice School Thiruvalla started. New Senior School block opened in Tripunithura campus.' },
  { year: '2026', event: 'Legacy Continues', desc: 'Over 60 years of excellence spanning Marine Exports, Foods, Logistics, Shipping, Construction, Education & Technology.' }
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
