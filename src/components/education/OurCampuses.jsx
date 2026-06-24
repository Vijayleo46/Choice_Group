import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OurCampuses = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const videoWrapRef = useRef(null)
  const modalRef = useRef(null)
  const videoRef = useRef(null)
  const isAnimatingRef = useRef(false)

  const campuses = [
    {
      name: 'Choice School Kochi',
      description: 'Our flagship campus in Kochi, setting standards for excellence and innovation in education.',
      image: '/Screenshot 2026-06-24 104416.jpg'
    },
    {
      name: 'Choice School Thiruvalla',
      description: 'Nurturing young minds with the same commitment to holistic development and character building.',
      image: '/1H9A7464.jpg'
    },
    {
      name: 'Choice School Kozhikode',
      description: 'Bringing quality education and transformative learning to the vibrant community of Kozhikode.',
      image: '/1H9A8497-Edit.jpg'
    },
    {
      name: 'Choice Kindergarden',
      description: 'Our premium International Baccalaureate program, preparing global leaders for tomorrow.',
      image: '/kindergarden.jpg'
    }
  ]

  const playVideo = (src) => {
    if (!src) return
    setSelectedVideo(src)
  }

  const requestFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
      return
    }

    if (video.requestFullscreen) video.requestFullscreen()
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen()
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen()
    else if (video.msRequestFullscreen) video.msRequestFullscreen()
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for campus cards - enter from left
      gsap.fromTo('.campus-card',
        { opacity: 0, x: -100, y: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
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

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && selectedVideo) {
        closeVideo()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('playCampusVideo', onPlay)
      window.removeEventListener('keydown', onKeyDown)
      ctx.revert()
    }
  }, [selectedVideo])

  useEffect(() => {
    if (!selectedVideo) return

    const onScroll = () => {
      if (!isMinimized) {
        setIsMinimized(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onScroll, { passive: true })
    window.addEventListener('touchmove', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
    }
  }, [selectedVideo, isMinimized])

  const closeVideo = () => {
    if (!selectedVideo || isAnimatingRef.current) return

    const overlay = modalRef.current
    const target = videoWrapRef.current
    const closeComplete = () => {
      setSelectedVideo(null)
      isAnimatingRef.current = false
    }

    if (overlay || target) {
      isAnimatingRef.current = true
      const timeline = gsap.timeline({ onComplete: closeComplete })

      if (target) {
        timeline.to(target, {
          scale: 0.92,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut'
        }, 0)
      }

      if (overlay) {
        timeline.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut'
        }, 0)
      }

      return
    }

    setSelectedVideo(null)
  }

  useEffect(() => {
    if (selectedVideo && modalRef.current && videoWrapRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: 'power3.out' }
      )

      gsap.fromTo(videoWrapRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
    }
  }, [selectedVideo])

  useEffect(() => {
    if (!selectedVideo || !videoWrapRef.current || !modalRef.current) return

    if (isMinimized) {
      gsap.to(videoWrapRef.current, {
        width: '320px',
        height: '180px',
        top: 'auto',
        left: 'auto',
        bottom: '24px',
        right: '24px',
        transform: 'translate(0, 0)',
        borderRadius: '12px',
        duration: 0.4,
        ease: 'power2.inOut'
      })

      gsap.to(modalRef.current, {
        background: 'transparent',
        backdropFilter: 'none',
        duration: 0.3
      })
    } else {
      gsap.to(videoWrapRef.current, {
        width: '95%',
        height: 'auto',
        top: '50%',
        left: '50%',
        bottom: 'auto',
        right: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '18px',
        duration: 0.4,
        ease: 'power2.inOut'
      })

      gsap.to(modalRef.current, {
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        duration: 0.3
      })
    }
  }, [isMinimized, selectedVideo])

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
              onClick={() => campus.video && playVideo(campus.video)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && campus.video) {
                  e.preventDefault()
                  playVideo(campus.video)
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
                {campus.video ? (
                  <button
                    className="btn-explore"
                    onClick={(e) => {
                      e.stopPropagation()
                      playVideo(campus.video)
                    }}
                  >
                    Explore Campus
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                ) : (
                  <button className="btn-explore btn-learn">
                    Learn More →
                  </button>
                )}
              </div>
              <div className="campus-overlay"></div>
            </div>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <div className="video-modal" ref={modalRef} onClick={() => !isMinimized && closeVideo()}>
          <div className="video-wrap" ref={videoWrapRef} onClick={(e) => {
            e.stopPropagation()
            if (isMinimized) {
              setIsMinimized(false)
            }
          }}>
            {!isMinimized && <button className="video-close" onClick={(e) => { e.stopPropagation(); closeVideo() }}>✕</button>}
            {!isMinimized && <button className="video-fullscreen" onClick={(e) => { e.stopPropagation(); requestFullscreen() }}>⤢</button>}
            <video ref={videoRef} key={selectedVideo} src={encodeURI(selectedVideo)} controls autoPlay loop playsInline style={{ width: '100%', height: '100%', borderRadius: 8 }} />
          </div>
        </div>
      )}
    </section>
  )
}

export default OurCampuses
