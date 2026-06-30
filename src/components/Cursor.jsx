import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // Hide until first mouse move
    gsap.set([outer, inner], { autoAlpha: 0, xPercent: -50, yPercent: -50 })

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0
    let rafId = null
    let started = false

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Snap inner dot immediately to mouse
      gsap.set(inner, { x: mouseX, y: mouseY })

      if (!started) {
        started = true
        outerX = mouseX
        outerY = mouseY
        gsap.set([outer, inner], { autoAlpha: 1 })
      }
    }

    // Smooth lerp for the outer ring — trails the mouse
    const tick = () => {
      outerX += (mouseX - outerX) * 0.13
      outerY += (mouseY - outerY) * 0.13
      gsap.set(outer, { x: outerX, y: outerY })
      rafId = requestAnimationFrame(tick)
    }

    // ── Hover: expand ring, hide inner dot ──
    const onEnterHover = () => {
      gsap.to(outer, {
        width: 60, height: 60,
        borderColor: 'var(--gold-bright)',
        backgroundColor: 'rgba(184, 146, 42, 0.06)',
        boxShadow: '0 0 24px rgba(184,146,42,0.15), 0 0 48px rgba(184,146,42,0.06), inset 0 0 12px rgba(184,146,42,0.05)',
        duration: 0.4, ease: 'power3.out', overwrite: 'auto'
      })
      gsap.to(inner, {
        scale: 0, opacity: 0,
        duration: 0.25, ease: 'power3.out', overwrite: 'auto'
      })
    }

    const onLeaveHover = () => {
      gsap.to(outer, {
        width: 36, height: 36,
        borderColor: 'rgba(184, 146, 42, 0.6)',
        backgroundColor: 'transparent',
        boxShadow: '0 0 12px rgba(184,146,42,0.08), inset 0 0 8px rgba(184,146,42,0.04)',
        duration: 0.4, ease: 'power3.out', overwrite: 'auto'
      })
      gsap.to(inner, {
        scale: 1, opacity: 1,
        duration: 0.25, ease: 'power3.out', overwrite: 'auto'
      })
    }

    // ── Input fields: hide cursor completely ──
    const onInputEnter = () => {
      gsap.to([outer, inner], { scale: 0, autoAlpha: 0, duration: 0.2, ease: 'power2.out' })
    }
    const onInputLeave = () => {
      gsap.to([outer, inner], { scale: 1, autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
    }

    // ── Event delegation for hover targets ──
    const HOVER_SELECTOR = 'a, button, [role="button"], .campus-card, .se-card, .exp-card, .expertise-card, .principle-card, .leader-card, .testimonial-card, .glass-card, .fcta-btn, .btn-learn-more, .nav-link, .nav-cta, .ehp-discover-btn, .ehp-gold-btn, .ehp-outline-btn, .ehp-icon-btn, .bap-eco-node, .bap-cta-btn, .cert-cta-btn, .cc-card, .bp-back-btn, .bp-cta-btn-primary, .bp-cta-btn-secondary'

    const onDocEnter = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) onEnterHover()
      if (e.target.closest('input, textarea, select')) onInputEnter()
    }
    const onDocLeave = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) onLeaveHover()
      if (e.target.closest('input, textarea, select')) onInputLeave()
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
