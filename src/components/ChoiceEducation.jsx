import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EducationHero from './education/EducationHero'
import VisionMission from './education/VisionMission'
import OurCampuses from './education/OurCampuses'
import Admissions from './education/Admissions'
import GuidingPrinciples from './education/GuidingPrinciples'
import StudentExperience from './education/StudentExperience'
import PresidentsDesk from './education/PresidentsDesk'
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
      <EducationHero onBackToHome={onBackToHome} />
      <VisionMission />
      <OurCampuses />
      <Admissions />
      <GuidingPrinciples />
      <StudentExperience />
      <PresidentsDesk />
      <EducationFooterCTA />
    </div>
  )
}

export default ChoiceEducation
