import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(inner, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
    }

    const tick = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      gsap.set(outer, { x: outerX, y: outerY })
      requestAnimationFrame(tick)
    }

    const onEnter = () => {
      outer.classList.add('hovering')
      inner.classList.add('hovering')
    }

    const onLeave = () => {
      outer.classList.remove('hovering')
      inner.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"], .expertise-card, .leader-card, .testimonial-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  )
}
