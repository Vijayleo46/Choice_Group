import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EducationHero from './education/EducationHero'
import VisionMission from './education/VisionMission'
import OurCampuses from './education/OurCampuses'
import GuidingPrinciples from './education/GuidingPrinciples'
import StudentExperience from './education/StudentExperience'
import PresidentsDesk from './education/PresidentsDesk'
import QuickAccess from './education/QuickAccess'
import EducationFooterCTA from './education/EducationFooterCTA'
import '../styles/education.css'

gsap.registerPlugin(ScrollTrigger)

const ChoiceEducation = ({ onBackToHome }) => {
  const headerRef = useRef(null)

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh()
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    // Animate header on load
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  return (
    <div className="choice-education">
      <header className="education-header" ref={headerRef}>
        <div className="edu-header-container">
          <button className="back-button" onClick={onBackToHome} aria-label="Back to home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
        </div>
      </header>

      <EducationHero />
      <VisionMission />
      <OurCampuses />
      <GuidingPrinciples />
      <StudentExperience />
      <PresidentsDesk />
      <QuickAccess />
      <EducationFooterCTA />
    </div>
  )
}

export default ChoiceEducation
