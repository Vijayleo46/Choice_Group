import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Why() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const visualRef = useRef(null)

  // Make all elements visible and animate them
  useEffect(() => {
    const elements = [];
    if (headerRef.current) elements.push(headerRef.current);
    if (visualRef.current) elements.push(visualRef.current);
    if (gridRef.current?.children) elements.push(...gridRef.current.children);
    // Ensure they are visible initially
    gsap.set(elements, { opacity: 1, y: 0, x: 0, scale: 1 });

    // GSAP animations (kept for smooth entry, can be removed if not needed)
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Image reveal
      gsap.from(visualRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -50,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
      });

      // Grid cards stagger
      gsap.from(gridRef.current?.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="why section" style={{ padding: '120px 5%', position: 'relative' }}>
      <div className="why-inner" style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
        
        <div ref={visualRef} className="why-visual" style={{ position: 'relative', height: '600px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-gold)' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/DSC_8013.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)' }} />
          <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold-primary)', marginBottom: '10px' }}>Excellence in Infrastructure</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Showcasing one of our premier educational facilities, demonstrating our commitment to building the future.</p>
          </div>
        </div>

        <div className="why-content">
          <div ref={headerRef} className="section-header" style={{ marginBottom: '3rem' }}>
            <div className="section-label">The Choice Advantage</div>
            <h2 className="section-title">Why Choose <span className="gold">The Choice Group</span></h2>
          </div>

          <div ref={gridRef} className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {[
              { num: '01', icon: '🏆', title: '60+ Years Excellence', desc: 'Six decades of proven performance and value creation.' },
              { num: '02', icon: '⭐', title: 'Trusted Leadership', desc: 'Recognized as a benchmark of trust and reliability.' },
              { num: '03', icon: '🌍', title: 'Global Presence', desc: 'Strategic presence across India, US, Canada, Korea, and Japan.' },
              { num: '04', icon: '💡', title: 'Customer-Centric', desc: 'Solutions designed around the unique needs of clients.' },
              { num: '05', icon: '🚀', title: 'Innovation-Driven', desc: 'Investment in emerging technologies and practices.' },
              { num: '06', icon: '🌱', title: 'Sustainable', desc: 'Long-term thinking and sustainable development.' }
            ].map((item, idx) => (
              <div key={idx} className="why-card glass-card" style={{ padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold-dim)' }}>{item.num}</div>
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
