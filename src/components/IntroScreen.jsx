import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function IntroScreen({ onComplete }) {
  const introRef = useRef(null)
  const logoRef = useRef(null)
  const taglineRef = useRef(null)
  const progressRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Lock scroll during intro
    document.body.style.overflow = 'hidden'

    // Start: intro visible
    gsap.set(introRef.current, { opacity: 1 })
    gsap.set(logoRef.current, { opacity: 0, scale: 0.6, y: 30 })
    gsap.set(taglineRef.current, { opacity: 0, y: 20 })
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })

    tl
      // Logo fades + scales in
      .to(logoRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 1.2, ease: 'power4.out'
      })
      // Tagline fades in
      .to(taglineRef.current, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out'
      }, '-=0.4')
      // Progress bar fills
      .to(progressRef.current, {
        scaleX: 1,
        duration: 1.4, ease: 'power2.inOut'
      }, '-=0.2')
      // Hold for a moment
      .to({}, { duration: 0.6 })
      // Overlay slides up — revealing the website
      .to(introRef.current, {
        yPercent: -100,
        duration: 1.4,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.style.overflow = ''
          if (onComplete) onComplete()
        }
      })

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div ref={introRef} className="intro-screen">
      <div ref={overlayRef} className="intro-bg" />

      <div className="intro-content">
        <div ref={logoRef} className="intro-logo">
          <img
            src="/Choice-Group-Logo (1).png.png"
            alt="Choice Group"
            style={{ height: '160px', objectFit: 'contain' }}
          />
        </div>

        <h1 ref={taglineRef} className="intro-heading">
          A Legacy of Trust &amp; Quality
        </h1>

        <div className="intro-progress-bar">
          <div ref={progressRef} className="intro-progress-fill" />
        </div>
      </div>
    </div>
  )
}