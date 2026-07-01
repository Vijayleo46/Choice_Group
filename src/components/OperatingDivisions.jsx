import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DIVISIONS = [
  {
    name: 'Choice Canning Co. Inc.',
    location: 'New Jersey, USA',
    desc: 'Leading seafood brand and distribution network in North America.',
    category: 'Marine Exports',
    icon: '🇺🇸',
  },
  {
    name: 'Choice Canning Co.',
    location: 'Cochin, India',
    desc: 'State-of-the-art seafood processing and global export hub.',
    category: 'Marine Exports',
    icon: '⚓',
  },
  {
    name: 'Choice Trading Corporation Pvt. Ltd.',
    location: 'Cochin, India',
    desc: 'International trade operations and diversified commercial business.',
    category: 'Trading',
    icon: '📈',
  },
  {
    name: 'Choice Canning Co.',
    location: 'Ontario, Canada',
    desc: 'Seafood imports, logistics, and distribution across the Canadian market.',
    category: 'Marine Exports',
    icon: '🇨🇦',
  },
  {
    name: 'Choice Group Holdings Pte Ltd',
    location: 'Singapore',
    desc: 'Strategic global holdings and international business development.',
    category: 'Corporate Holdings',
    icon: '🇸🇬',
  },
  {
    name: 'Choice Intermodal Services',
    location: 'Cochin, India',
    desc: 'Comprehensive logistics network with branches in Chennai, Tuticorin, Vizag, Goa, Bangalore, Hyderabad, Coimbatore, and Krishnapatnam.',
    category: 'Logistics',
    icon: '📦',
  },
  {
    name: 'Choice Shipping Lines',
    location: 'Cochin, India',
    desc: 'Global shipping and port agency services with branches in Tuticorin, Vizag, Goa, Hyderabad, Bangalore, Chennai, Coimbatore, and Mumbai.',
    category: 'Shipping',
    icon: '🚢',
  },
  {
    name: 'Choice Constructions',
    location: 'Cochin, India',
    desc: 'Premium infrastructure development and high-rise green concept residences.',
    category: 'Infrastructure',
    icon: '🏗️',
  },
  {
    name: 'Choice School',
    location: 'Cochin, India',
    desc: 'Premier educational institutions nurturing character, knowledge, and health.',
    category: 'Education',
    icon: '🎓',
  },
  {
    name: 'JTPAC (Jose Thomas Performing Arts Centre)',
    location: 'Cochin, India',
    desc: 'World-class performing arts center promoting heritage, music, and theater.',
    category: 'Performing Arts',
    icon: '🎭',
  },
  {
    name: 'Choice Infoway',
    location: 'Cochin, India',
    desc: 'Cutting-edge information technology, software solutions, and digital enterprise systems.',
    category: 'Technology',
    icon: '💻',
  },
]

export default function OperatingDivisions() {
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} id="divisions" className="section" style={{ background: '#fcfbfa', padding: '6rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ color: 'var(--gold-primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Corporate Structure
          </div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a' }}>
            Operating <span style={{ color: 'var(--gold-primary)' }}>Divisions</span>
          </h2>
          <p className="section-desc" style={{ color: '#64748b', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
            A highly diversified portfolio of operating companies and subsidiaries spanning continents and sectors.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="divisions-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          padding: '0.5rem'
        }}>
          {DIVISIONS.map((div, idx) => (
            <div
              key={idx}
              className="division-card glass-card"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)'
                e.currentTarget.style.borderColor = 'rgba(196,158,63,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)'
                e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--gold-primary)',
                    background: 'rgba(196,158,63,0.08)',
                    padding: '4px 10px',
                    borderRadius: '30px',
                    letterSpacing: '0.05em'
                  }}>
                    {div.category}
                  </span>
                  <span style={{ fontSize: '1.5rem' }}>{div.icon}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 650, color: '#0f172a', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {div.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {div.desc}
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(241, 245, 249, 0.8)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#64748b',
                fontWeight: 500
              }}>
                <span style={{ fontSize: '1rem' }}>📍</span> {div.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
