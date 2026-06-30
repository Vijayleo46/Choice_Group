import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './premiumIntro.css';

const EducationHero = ({ onBackToHome }) => {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const descRef = useRef(null)
  const statsRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to('.ehp-bg-video', {
        y: (index, target) => gsap.getProperty(target, 'clientHeight') * 0.15,
        scrollTrigger: {
          trigger: '.edu-hero-premium',
          scrub: 1,
        }
      })

      // Staggered reveal for left content
      gsap.fromTo('.ehp-tagline, .ehp-title-white, .ehp-title-gold, .ehp-accent-lines, .ehp-desc, .ehp-discover-btn',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      // Features list right side
      gsap.fromTo('.ehp-feature-item',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.6 }
      );

      // Bottom stats bar
      gsap.fromTo('.ehp-bottom-bar',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="edu-hero-premium" ref={heroRef}>
      <div className="ehp-bg-video">
        <img className="ehp-bg-image" src="/choice-kochi.jpg" alt="Choice School Kochi" />
        <video className="ehp-video" autoPlay muted loop playsInline preload="auto">
          <source src="/Drone_video_showcasing_building_…_202606241709.mp4" type="video/mp4" />
        </video>
        <div className="ehp-gradient-overlay"></div>
      </div>

      <header className="ehp-header">
        <div className="ehp-header-left">
          <button className="ehp-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <button className="ehp-outline-btn" onClick={onBackToHome}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Home
          </button>
        </div>
        
        <div className="ehp-header-right">
          <div className="ehp-socials">
            <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
            <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
          </div>
          <button className="ehp-gold-btn">
            Enquire Now 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </header>

      <div className="ehp-main-content">
        <div className="ehp-left-content">
          <div className="ehp-tagline">THREE DECADES OF TRANSFORMING YOUNG MINDS INTO GLOBAL CITIZENS</div>
          <h1 className="ehp-title">
            <div className="ehp-title-white">CHOICE</div>
            <div className="ehp-title-gold">SCHOOLS</div>
          </h1>
          <div className="ehp-accent-lines">
            <span className="ehp-line-gold"></span>
            <span className="ehp-line-grey"></span>
          </div>
          <p className="ehp-desc">
            For over three decades, The Choice School has made an indelible mark in meaningful education. Since 1991, Choice has spread its wings across Kochi, Kozhikode and Thiruvalla, nurturing generations of learners through innovation, excellence and holistic development.
          </p>
          <button className="ehp-discover-btn">
            Discover Our Journey
            <span className="btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </button>
        </div>

        <div className="ehp-right-content">
          <div className="ehp-feature-list">
            <div className="ehp-feature-line"></div>
            
            <div className="ehp-feature-item">
              <div className="ehp-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div className="ehp-feature-text">
                <h4>Holistic Learning</h4>
                <p>Nurturing brilliance<br/>beyond academics.</p>
              </div>
            </div>

            <div className="ehp-feature-item">
              <div className="ehp-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <div className="ehp-feature-text">
                <h4>Global Outlook</h4>
                <p>Preparing students<br/>to lead tomorrow.</p>
              </div>
            </div>

            <div className="ehp-feature-item">
              <div className="ehp-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div className="ehp-feature-text">
                <h4>Values & Integrity</h4>
                <p>Building character<br/>that lasts a lifetime.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="ehp-bottom-bar">
        <div className="ehp-stats-container">
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
            <div className="ehp-stat-num">1991</div>
            <div className="ehp-stat-label">FOUNDED</div>
          </div>
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg></div>
            <div className="ehp-stat-num">4</div>
            <div className="ehp-stat-label">PREMIER SCHOOLS</div>
          </div>
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            <div className="ehp-stat-num">8</div>
            <div className="ehp-stat-label">KINDERGARTENS</div>
          </div>
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
            <div className="ehp-stat-num">30+</div>
            <div className="ehp-stat-label">YEARS OF EXCELLENCE</div>
          </div>
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            <div className="ehp-stat-num">3500+</div>
            <div className="ehp-stat-label">STUDENTS</div>
          </div>
          <div className="ehp-stat">
            <div className="ehp-stat-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
            <div className="ehp-stat-num">550+</div>
            <div className="ehp-stat-label">STAFF</div>
          </div>
        </div>
        <div className="ehp-locations">
          KOCHI <span className="sep">|</span> KOZHIKODE <span className="sep">|</span> THIRUVALLA
        </div>
      </div>
    </section>
  )
}

export default EducationHero