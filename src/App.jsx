import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Expertise from './components/Expertise'
import DigitalFactory from './components/DigitalFactory'
import ColdStoreManagement from './components/ColdStoreManagement'
import GlobalPresence from './components/GlobalPresence'
import Evolution from './components/Evolution'
import Leadership from './components/Leadership'
import Testimonials from './components/Testimonials'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import IntroScreen from './components/IntroScreen'
import ChoiceEducation from './components/ChoiceEducation'
import BapatlaPage from './components/BapatlaPage'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'education' | 'bapatla'
  const pageRef = useRef(null)

  useEffect(() => {
    const path = window.location.pathname
    if (path.includes('education')) {
      setCurrentPage('education')
      setIntroComplete(true)
    } else if (path.includes('bapatla')) {
      setCurrentPage('bapatla')
      setIntroComplete(true)
    } else {
      setCurrentPage('home')
    }
  }, [])

  useEffect(() => {
    if (introComplete && pageRef.current && currentPage === 'home') {
      const sections = pageRef.current.querySelectorAll(
        'header, main > section, footer'
      )
      gsap.set(sections, { opacity: 0, y: 60 })
      gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        onComplete: () => ScrollTrigger.refresh(),
      })
    }
  }, [introComplete, currentPage])

  if (currentPage === 'education') {
    return (
      <>
        <Cursor />
        <ChoiceEducation onBackToHome={() => setCurrentPage('home')} />
      </>
    )
  }

  if (currentPage === 'bapatla') {
    return (
      <>
        <Cursor />
        <BapatlaPage onBackToHome={() => setCurrentPage('home')} />
      </>
    )
  }

  if (currentPage === 'coldstore') {
    return (
      <>
        <Cursor />
        <ColdStoreManagement onBack={() => setCurrentPage('home')} />
      </>
    )
  }

  return (
    <>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      <Cursor />
      <div ref={pageRef}>
        <Header
          onNavigateToEducation={() => setCurrentPage('education')}
          onNavigateToBapatla={() => setCurrentPage('bapatla')}
        />
        <main>
          <Hero />
          <About />
          <Why />
          <Expertise />
          <DigitalFactory onOpenColdStore={() => setCurrentPage('coldstore')} />
          <GlobalPresence />
          <Evolution />
          <Leadership />
          <Testimonials />
          <News />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
