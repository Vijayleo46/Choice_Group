import './News.css';
import { useEffect, useRef } from 'react';

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function News() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  // Ensure all elements are visible immediately (no initial hidden state)
  useEffect(() => {
    const elems = [];
    if (sectionRef.current) elems.push(sectionRef.current);
    if (headerRef.current) elems.push(headerRef.current);
    if (gridRef.current) elems.push(gridRef.current);
    gsap.set(elems, { opacity: 1, y: 0, x: 0 });
    if (titleRef.current) {
      gsap.set(titleRef.current.querySelectorAll('.char'), { opacity: 1, y: 0 });
    }
  }, []);

  // Scroll entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Entrance
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out'
      })

      // 2. Heading Animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.from(chars, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true
          },
          y: 40,
          opacity: 0,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        });
      }

      // Cards Animations
      if (gridRef.current && gridRef.current.children.length >= 4) {
        const cards = gridRef.current.children;

        // 3. Featured News Card
        gsap.from(cards[0], {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true
          },
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        });

        // 4. Side News Card
        gsap.from(cards[1], {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true
          },
          x: 100,
          opacity: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power4.out'
        });

        // 5. Bottom Cards
        gsap.from(Array.from(cards).slice(2), {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            once: true
          },
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  const newsItems = [
    {
      category: 'Corporate',
      title: 'Choice Group Announces Strategic Expansion into Renewable Energy',
      date: 'October 15, 2023',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
      featured: true,
    },
    {
      category: 'Awards',
      title: 'Recognized for Excellence in Export Quality',
      date: 'September 28, 2023',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'Partnerships',
      title: 'New Global Logistics Hub Opened in Dubai',
      date: 'August 12, 2023',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    },
    {
      category: 'Update',
      title: 'Introducing Our New Sustainable Initiative',
      date: 'September 30, 2023',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const renderChars = (text) => text.split('').map((char, i) => (
    <span key={i} className="char" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section ref={sectionRef} id="news" className="news" style={{ willChange: 'transform, opacity' }}>
      <div className="news-inner">
        <div ref={headerRef} className="news-header">
          <div>
            <div className="section-label">Latest Updates</div>
            <h2 ref={titleRef} className="section-title">
              {renderChars("News & ")}<span className="gold">{renderChars("Insights")}</span>
            </h2>
          </div>
          <button className="ghost-btn">View All News</button>
        </div>

        <div ref={gridRef} className="news-grid">
          {newsItems.map((item, idx) => (
            <div key={idx} className={`news-card${item.featured ? ' featured' : ''}`} style={{ willChange: 'transform, opacity' }}> 
              <div className="news-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-body">
                <span className="news-category">{item.category}</span>
                <h3 className="news-title">{item.title}</h3>
                <span className="news-date">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
