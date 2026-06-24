import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OurCampuses = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isMinimized, setIsMinimized] = useState(false)

  const campuses = [
    {
      name: 'Choice School Kochi',
      description: 'Our flagship campus in Kochi, setting standards for excellence and innovation in education.',
      image: '/Screenshot 2026-06-24 104416.jpg',
      video: '/inside_to_move_the_school_202606241149.mp4'
    },
    {
      name: 'Choice School Thiruvalla',
      description: 'Nurturing young minds with the same commitment to holistic development and character building.',
      image: 'linear-gradient(135deg, rgba(199, 160, 60, 0.1) 0%, rgba(29, 27, 58, 0.1) 100%)'
    },
    {
      name: 'Choice School Kozhikode',
      description: 'Bringing quality education and transformative learning to the vibrant community of Kozhikode.',
      image: 'linear-gradient(135deg, rgba(29, 27, 58, 0.1) 0%, rgba(199, 160, 60, 0.1) 100%)'
    },
    {
      name: 'Choice IB School Kochi',
      description: 'Our premium International Baccalaureate program, preparing global leaders for tomorrow.',
      image: 'linear-gradient(135deg, rgba(199, 160, 60, 0.1) 0%, rgba(29, 27, 58, 0.1) 100%)'
    }
  ]

  const playVideo = (src) => {
    setSelectedVideo(src)
    setIsMinimized(false)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for campus cards
      gsap.fromTo('.campus-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.our-campuses-section',
            start: 'top 70%',
            markers: false
          }
        }
      )

      // Hover effects with mouse move
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            
            gsap.to(card, {
              rotationX: (y - 0.5) * 10,
              rotationY: (x - 0.5) * 10,
              duration: 0.3,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
          })
        }
      })
    }, sectionRef)

    const onPlay = (e) => {
      const src = e.detail && e.detail.src ? e.detail.src : null
      if (src) playVideo(src)
    }
    window.addEventListener('playCampusVideo', onPlay)

    return () => {
      window.removeEventListener('playCampusVideo', onPlay)
      ctx.revert()
    }
  }, [])

  // minimize video to small player when user scrolls while video is open
  useEffect(() => {
    if (!selectedVideo) return
    const onScroll = () => {
      // if user scrolls more than 150px from top, minimize
      if (window.scrollY > 150) setIsMinimized(true)
      else setIsMinimized(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [selectedVideo])

  return (
    <section className="our-campuses-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Across India</div>
          <h2 className="section-title">Our <em>Campuses</em></h2>
          <p className="section-desc">Excellence replicated, innovation amplified across our premier campuses.</p>
        </div>

        <div className="campuses-grid">
          {campuses.map((campus, idx) => (
            <div
              key={idx}
              className="campus-card"
              role="button"
              tabIndex={0}
              ref={el => cardsRef.current[idx] = el}
              style={{ perspective: '1000px' }}
              onClick={() => playVideo(campus.video || '/inside_to_move_the_school_202606241149.mp4')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  playVideo(campus.video || '/inside_to_move_the_school_202606241149.mp4')
                }
              }}
            >
              <div
                className="campus-image"
                style={
                  campus.image && (campus.image.startsWith('/') || campus.image.startsWith('http'))
                    ? { backgroundImage: `url(${encodeURI(campus.image)})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: campus.image }
                }
              ></div>
              <div className="campus-content">
                <h3 className="campus-name">{campus.name}</h3>
                <p className="campus-description">{campus.description}</p>
                <button
                  className="btn-explore"
                  onClick={(e) => {
                    e.stopPropagation()
                    playVideo(campus.video || '/inside_to_move_the_school_202606241149.mp4')
                  }}
                >
                  Explore Campus
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <div className="campus-overlay"></div>
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && !isMinimized && (
        <div className="video-modal" onClick={() => { setSelectedVideo(null); setIsMinimized(false) }}>
          <div className="video-wrap" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => { setSelectedVideo(null); setIsMinimized(false) }}>✕</button>
            <video key={selectedVideo} src={encodeURI(selectedVideo)} controls autoPlay playsInline style={{ width: '100%', height: '100%', borderRadius: 8 }} />
          </div>
        </div>
      )}

      {selectedVideo && isMinimized && (
        <div className="video-miniplayer" onClick={() => setIsMinimized(false)}>
          <video key={selectedVideo + '-mini'} src={encodeURI(selectedVideo)} controls autoPlay playsInline style={{ width: '100%', height: '100%' }} />
          <div className="video-mini-controls">
            <button className="video-mini-restore" onClick={(e) => { e.stopPropagation(); setIsMinimized(false) }}>⤢</button>
            <button className="video-mini-close" onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); setIsMinimized(false) }}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default OurCampuses
