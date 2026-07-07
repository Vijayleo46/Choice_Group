import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../styles/sticky-contact.css'

const BUTTONS = [
  { icon: '📞', label: 'Call', href: 'tel:+918632224455', color: '#22c55e' },
  { icon: '✉️', label: 'Email', href: 'mailto:info@choicecanning.com', color: '#3b82f6' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/918632224455', color: '#25d366' },
  { icon: '📄', label: 'Brochure', href: '#', color: '#d4af37' },
]

export default function StickyContact() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const btnsRef = useRef([])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { autoAlpha: 0, y: 20, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }
      )
      btnsRef.current.forEach((btn, i) => {
        if (btn) gsap.fromTo(btn,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.3, delay: 0.1 + i * 0.06, ease: 'power3.out' }
        )
      })
    }
  }

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })
  }

  return (
    <div className="sc-wrapper">
      {/* Expanded panel */}
      {open && (
        <div ref={panelRef} className="sc-panel">
          <div className="sc-panel-bg" />
          <div className="sc-panel-border" />
          {BUTTONS.map((btn, i) => (
            <a
              key={i}
              ref={el => btnsRef.current[i] = el}
              href={btn.href}
              target={btn.href.startsWith('http') ? '_blank' : undefined}
              rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="sc-action"
              style={{ '--ac': btn.color }}
            >
              <span className="sc-action-icon">{btn.icon}</span>
              <span className="sc-action-label">{btn.label}</span>
            </a>
          ))}
          <button className="sc-action sc-action-top" onClick={scrollToTop} style={{ '--ac': '#fb923c' }}>
            <span className="sc-action-icon">⬆️</span>
            <span className="sc-action-label">Top</span>
          </button>
        </div>
      )}

      {/* Toggle FAB */}
      <button
        className={`sc-fab${open ? ' sc-fab--open' : ''}`}
        onClick={toggle}
        aria-label={open ? 'Close contact panel' : 'Open contact panel'}
      >
        <span className="sc-fab-icon">{open ? '✕' : '💬'}</span>
        <div className="sc-fab-pulse" />
      </button>
    </div>
  )
}
