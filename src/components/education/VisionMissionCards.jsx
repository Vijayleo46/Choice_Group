import React from 'react'

const VisionMissionCards = ({
  vision = `At The Choice School, we envision a passionate learning community that nurtures curiosity, creativity and confidence while fostering a growth mindset in a caring environment.`,
  mission = `Anchored in Knowledge, Character and Health (KCH), The Choice School empowers students to become responsible global citizens through inclusive and holistic learning.`
}) => {
  return (
    <section className="vm-section">
      <div className="vm-container">
        <div className="vm-card vm-left">
          <div className="vm-badge" aria-hidden="true"></div>
          <h3 className="vm-title">Vision</h3>
          <p className="vm-text">{vision}</p>
        </div>

        <div className="vm-center" aria-hidden="true">
          <div className="vm-center-word">KNOWLEDGE</div>
          <div className="vm-center-word">CHARACTER</div>
          <div className="vm-center-word">HEALTH</div>
        </div>

        <div className="vm-card vm-right">
          <div className="vm-badge" aria-hidden="true"></div>
          <h3 className="vm-title">Mission</h3>
          <p className="vm-text">{mission}</p>
        </div>
      </div>
    </section>
  )
}

export default VisionMissionCards
