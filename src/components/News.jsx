import './News.css';
import { useEffect, useRef } from 'react';

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function News() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  // Ensure all elements are visible immediately (no initial hidden state)
  useEffect(() => {
    const elems = [];
    if (headerRef.current) elems.push(headerRef.current);
    if (gridRef.current) elems.push(gridRef.current);
    gsap.set(elems, { opacity: 1, y: 0 });
  }, []);

  // Scroll entrance animations
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

      gsap.from(gridRef.current?.children, {
        scrollTrigger: {
          trigger: gridRef.current,
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
  const newsItems = [
    {
      category: 'Corporate',
      title: 'Choice Group Announces Strategic Expansion into Renewable Energy',
      date: 'October 15, 2023',
      emoji: '🗞️',
      featured: true,
    },
    {
      category: 'Awards',
      title: 'Recognized for Excellence in Export Quality',
      date: 'September 28, 2023',
      emoji: '🏆',
    },
    {
      category: 'Partnerships',
      title: 'New Global Logistics Hub Opened in Dubai',
      date: 'August 12, 2023',
      emoji: '🤝',
    },
    // New item added as requested
    {
      category: 'Update',
      title: 'Introducing Our New Sustainable Initiative',
      date: 'September 30, 2023',
      emoji: '📰',
    },
  ];
  return (
    <section ref={sectionRef} id="news" className="news">
      <div className="news-inner">
        <div ref={headerRef} className="news-header">
          <div>
            <div className="section-label">Latest Updates</div>
            <h2 className="section-title">
              News &amp; <span className="gold">Insights</span>
            </h2>
          </div>
          <button className="ghost-btn">View All News</button>
        </div>

        <div ref={gridRef} className="news-grid">
          {newsItems.map((item, idx) => (
            <div key={idx} className={`news-card${item.featured ? ' featured' : ''}`}> 
              <div className="news-img">{item.emoji}</div>
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
