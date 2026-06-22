import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { text: "The Choice Group's commitment to quality and timeline delivery is unparalleled. They have been instrumental in our regional expansion strategy.", author: "James Chen", role: "VP Operations", initial: "J" },
  { text: "A truly global partner with local expertise. Their marine exports division consistently delivers premium quality products that exceed expectations.", author: "Maria Rodriguez", role: "Procurement Director", initial: "M" },
  { text: "Innovative, reliable, and deeply committed to sustainable practices. It's a privilege to partner with an organization that values long-term relationships.", author: "David Thompson", role: "CEO, Global Logistics", initial: "D" }
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 1,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from(cardsRef.current?.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
        },
        opacity: 1,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials">
      <div className="testimonials-inner">
        <div ref={headerRef} className="testimonials-header">
          <div className="section-label">Client Success</div>
          <h2 className="section-title">
            Words of <span className="gold">Trust</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Hear from our global partners and clients about their experience working with the Choice Group.
          </p>
        </div>

        <div ref={cardsRef} className="testimonials-track">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <span className="quote-mark">&quot;</span>
              <p className="testimonial-text">{t.text}</p>
              
              <div className="stars">★★★★★</div>
              
              <div className="testimonial-author">
                <div className="author-avatar">{t.initial}</div>
                <div>
                  <span className="author-name">{t.author}</span>
                  <span className="author-company">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
