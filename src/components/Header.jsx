import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const links = ['About', 'Expertise', 'Global', 'Evolution', 'Leadership', 'News']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from(logoRef.current, { opacity: 0, x: -30, duration: 0.8, ease: 'power3.out' })
      .from(linksRef.current?.children, { opacity: 0, y: -15, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(ctaRef.current, { opacity: 0, x: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div ref={logoRef} className="header-logo-wrapper" onClick={() => window.scrollTo(0, 0)}>
          <div className="logo-container">
            <img
              src="/Choice-Group-Logo (1).png.png"
              alt="Choice Group Logo"
              className="logo-img"
            />
          </div>
        </div>

        <nav ref={linksRef} className="nav-links">
          {links.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}>
              {l}
            </button>
          ))}
        </nav>

        <div ref={ctaRef} className="nav-right">
          <button className="nav-cta" onClick={() => scrollTo('footer')}>
            Contact Us
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </header>

      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button key={l} className="nav-link" onClick={() => scrollTo(l)}>
            {l}
          </button>
        ))}
        <button className="nav-cta" onClick={() => scrollTo('footer')}>
          Contact Us
        </button>
      </nav>
    </>
  )
}
