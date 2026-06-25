import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EducationFooterCTA = () => {
  const sectionRef = useRef(null)
  const videoRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── video parallax — subtle scale-up as user scrolls in ──
      gsap.fromTo(videoRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.5,
          }
        }
      )

      // ── slow continuous drift on video once in view ──
      gsap.to(videoRef.current, {
        scale: 1.06,
        duration: 18,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        }
      })

      // ── gold line draws in ──
      tl.fromTo('.fcta-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.out', transformOrigin: 'left center' }
      )

      // ── eyebrow label ──
      tl.fromTo('.fcta-label',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

      // ── headline words split-reveal ──
      tl.fromTo('.fcta-headline',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power4.out' },
        '-=0.2'
      )

      // ── subheadline ──
      tl.fromTo('.fcta-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      // ── buttons stagger ──
      tl.fromTo('.fcta-btn',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
        '-=0.3'
      )

      // ── scroll indicator bounce ──
      gsap.to('.fcta-scroll-dot', {
        y: 8, duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="fcta-section" ref={sectionRef}>

      {/* ── background video ── */}
      <div className="fcta-video-wrap">
        <video
          ref={videoRef}
          className="fcta-video"
          src="/Drone_footage_school_campus_exte…_202606251156.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* layered gradients for depth */}
        <div className="fcta-grad-top"    />
        <div className="fcta-grad-bottom" />
        <div className="fcta-grad-sides"  />
      </div>

      {/* ── content ── */}
      <div className="fcta-content">
        <div className="fcta-inner">

          {/* decorative gold line */}
          <div className="fcta-line" />

          <p className="fcta-label">The Choice School · Est. 1991</p>

          <h2 className="fcta-headline">
            Empowering Future<br />Leaders Since 1991
          </h2>

          <p className="fcta-sub">
            Discover a learning environment where knowledge, character<br />
            and wellbeing inspire lifelong success.
          </p>

          <div className="fcta-buttons">
            <button className="fcta-btn fcta-btn--primary">
              Apply for Admission
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="fcta-btn fcta-btn--secondary">
              Schedule a Campus Visit
            </button>
          </div>

        </div>
      </div>

      {/* scroll indicator */}
      <div className="fcta-scroll-hint">
        <div className="fcta-scroll-mouse">
          <div className="fcta-scroll-dot" />
        </div>
      </div>

    </section>
  )
}

export default EducationFooterCTA
