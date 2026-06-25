import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // hide until first mouse move
    gsap.set([outer, inner], { autoAlpha: 0, xPercent: -50, yPercent: -50 })

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0
    let rafId = null
    let started = false

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // snap inner dot immediately
      gsap.set(inner, { x: mouseX, y: mouseY })

      if (!started) {
        started = true
        outerX = mouseX
        outerY = mouseY
        gsap.set([outer, inner], { autoAlpha: 1 })
      }
    }

    const tick = () => {
      // lerp outer ring toward mouse
      outerX += (mouseX - outerX) * 0.1
      outerY += (mouseY - outerY) * 0.1
      gsap.set(outer, { x: outerX, y: outerY })
      rafId = requestAnimationFrame(tick)
    }

    const onEnterHover = () => {
      gsap.to(outer, {
        width: 56, height: 56,
        borderColor: 'var(--gold-bright)',
        backgroundColor: 'rgba(201,168,76,0.1)',
        duration: 0.3, ease: 'power2.out',
        overwrite: 'auto'
      })
      gsap.to(inner, {
        width: 4, height: 4,
        duration: 0.2, ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const onLeaveHover = () => {
      gsap.to(outer, {
        width: 32, height: 32,
        borderColor: 'var(--gold-primary)',
        backgroundColor: 'transparent',
        duration: 0.3, ease: 'power2.out',
        overwrite: 'auto'
      })
      gsap.to(inner, {
        width: 6, height: 6,
        duration: 0.2, ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    // attach hover listeners using event delegation — works for dynamic elements too
    const onDocEnter = (e) => {
      const t = e.target.closest('a, button, [role="button"], .campus-card, .se-card, .exp-card, .expertise-card, .principle-card, .leader-card, .testimonial-card, .glass-card, .fcta-btn, .btn-learn-more')
      if (t) onEnterHover()
    }
    const onDocLeave = (e) => {
      const t = e.target.closest('a, button, [role="button"], .campus-card, .se-card, .exp-card, .expertise-card, .principle-card, .leader-card, .testimonial-card, .glass-card, .fcta-btn, .btn-learn-more')
      if (t) onLeaveHover()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onDocEnter, true)
    document.addEventListener('mouseleave', onDocLeave, true)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onDocEnter, true)
      document.removeEventListener('mouseleave', onDocLeave, true)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  )
}
