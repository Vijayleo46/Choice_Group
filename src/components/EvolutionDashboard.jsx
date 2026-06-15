import React, { useEffect, useRef, useState } from 'react';

const EvolutionDashboard = () => {
  const [activeDecade, setActiveDecade] = useState('1960s');
  const [activeFocus, setActiveFocus] = useState('Seafood & Canning');
  const [activeMs, setActiveMs] = useState('Founded in Cochin');
  const observerRef = useRef(null);

  useEffect(() => {
    const milestoneCards = document.querySelectorAll('.milestone-card');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          milestoneCards.forEach(c => c.classList.remove('active'));
          entry.target.classList.add('active');

          setActiveDecade(entry.target.getAttribute('data-decade'));
          setActiveFocus(entry.target.getAttribute('data-focus'));
          setActiveMs(entry.target.getAttribute('data-ms'));
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    milestoneCards.forEach(card => observerRef.current.observe(card));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleNavClick = (decade) => {
    const targetCard = document.querySelector(`.milestone-card[data-decade="${decade}"]`);
    if (targetCard) {
      const offset = 140; 
      const top = targetCard.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const decades = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];

  return (
    <section id="history" className="section history-section">
      <div className="container">
        <div className="section-header fade-up">
          <div className="section-label">Our Journey</div>
          <h2 className="section-title">The Choice Group <em>Evolution</em></h2>
          <p className="section-desc">More Than Six Decades of Innovation, Leadership, and Excellence.</p>
        </div>

        <div className="evolution-container">
          <div className="evolution-dashboard fade-right">
            <div className="dashboard-inner glass-card">
              <h3 className="dash-title">Era Overview</h3>
              <div className="dash-decade" id="dash-decade">{activeDecade}</div>
              <div className="dash-stats">
                <div className="dash-stat">
                  <span className="ds-label">Focus</span>
                  <span className="ds-val" id="dash-focus" style={{ transition: 'opacity 0.2s' }}>{activeFocus}</span>
                </div>
                <div className="dash-stat">
                  <span className="ds-label">Milestone</span>
                  <span className="ds-val" id="dash-milestone">{activeMs}</span>
                </div>
              </div>
              <div className="decade-nav-wrapper">
                <div className="decade-nav" id="decade-nav">
                  {decades.map(decade => (
                    <button 
                      key={decade}
                      className={`decade-btn ${activeDecade === decade ? 'active' : ''}`}
                      onClick={() => handleNavClick(decade)}
                    >
                      {decade}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-scroll-area">
            <div className="timeline-track">
              <div className="milestone-card fade-up" data-decade="1960s" data-focus="Seafood & Canning" data-ms="Founded in Cochin" id="year-1962">
                <div className="mc-year">1962</div>
                <div className="mc-content">
                  <h4 className="mc-title">Founding of Choice Canning</h4>
                  <p className="mc-desc">Choice Canning Company is founded by O.C. Thomas, Madhavan Nair, and P.K. Nair with 25 employees, starting the group's legacy in Kerala.</p>
                  <div className="mc-image">
                    <img src="file:///C:/Users/vijay/.gemini/antigravity-ide/brain/c596875b-8033-4c2e-bd56-2b8e43be67eb/milestone_1960s_1781259030246.png" onError={(e) => e.target.style.display='none'} alt="1960s Milestone" />
                  </div>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1960s" data-focus="Seafood Innovation" data-ms="Modern Block Frozen Tech" id="year-1969">
                <div className="mc-year">1969</div>
                <div className="mc-content">
                  <h4 className="mc-title">Modern Block Frozen Technology</h4>
                  <p className="mc-desc">Introduced modern block frozen shrimp technology, pioneering advanced preservation methods and expanding seafood exports to Canada.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1970s" data-focus="Infrastructure Growth" data-ms="Kannamally Plant" id="year-1974">
                <div className="mc-year">1974</div>
                <div className="mc-content">
                  <h4 className="mc-title">First Factory at Kannamally</h4>
                  <p className="mc-desc">Built the group's first major factory at Kannamally, expanding seafood processing capacity and strengthening operations.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1970s" data-focus="Shipping & Logistics" data-ms="Choice Intermodal" id="year-1978">
                <div className="mc-year">1978</div>
                <div className="mc-content">
                  <h4 className="mc-title">Diversification into Shipping</h4>
                  <p className="mc-desc">Diversified into logistics and shipping through Choice Intermodal Services, marking the group's transition into a conglomerate.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1980s" data-focus="Maritime Operations" data-ms="Ceylon Shipping Agents" id="year-1982">
                <div className="mc-year">1982</div>
                <div className="mc-content">
                  <h4 className="mc-title">Ceylon Shipping Corp Agents</h4>
                  <p className="mc-desc">Appointed general agents for the Ceylon Shipping Corporation, expanding shipping routes and international trade representation.</p>
                  <div className="mc-image">
                    <img src="file:///C:/Users/vijay/.gemini/antigravity-ide/brain/c596875b-8033-4c2e-bd56-2b8e43be67eb/milestone_1980s_1781259043482.png" onError={(e) => e.target.style.display='none'} alt="1980s Milestone" />
                  </div>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1980s" data-focus="Brand Identity" data-ms="Iconic Monogram" id="year-1983">
                <div className="mc-year">1983</div>
                <div className="mc-content">
                  <h4 className="mc-title">Iconic Corporate Monogram</h4>
                  <p className="mc-desc">Created the iconic Choice Group corporate monogram—a red and blue winged sphere representing global unity and trust.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1980s" data-focus="Global Presence" data-ms="New York Office" id="year-1987">
                <div className="mc-year">1987</div>
                <div className="mc-content">
                  <h4 className="mc-title">First US Office in New York</h4>
                  <p className="mc-desc">Opened the first overseas office in New York, USA, establishing direct marketing channels and distribution in North America.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="Export Leadership" data-ms="President's Award" id="year-1990">
                <div className="mc-year">1990</div>
                <div className="mc-content">
                  <h4 className="mc-title">IQF Factory & Export Award</h4>
                  <p className="mc-desc">Established the first Individual Quick Freezing (IQF) factory and received the prestigious President of India Export Award for outstanding performance.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="Education & Travel" data-ms="Choice School Founded" id="year-1991">
                <div className="mc-year">1991</div>
                <div className="mc-content">
                  <h4 className="mc-title">Founding of Choice School & Travels</h4>
                  <p className="mc-desc">Founded The Choice School and Choice Tours & Travels, pioneering world-class education and travel services in Kerala.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="Real Estate" data-ms="Choice Village" id="year-1992">
                <div className="mc-year">1992</div>
                <div className="mc-content">
                  <h4 className="mc-title">Choice Village & Andhra Plant</h4>
                  <p className="mc-desc">Developed the Choice Village residential community in Tripunithura and established a state-of-the-art shrimp processing plant in Andhra Pradesh.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="Logistics Hub" data-ms="Hyundai Merchant Agents" id="year-1995">
                <div className="mc-year">1995</div>
                <div className="mc-content">
                  <h4 className="mc-title">Hyundai Merchant Marine Agents</h4>
                  <p className="mc-desc">Appointed South India agents for Hyundai Merchant Marine of South Korea, establishing major shipping lanes and business hubs.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="Conglomerate Growth" data-ms="Diversified Portfolio" id="year-1996">
                <div className="mc-year">1996</div>
                <div className="mc-content">
                  <h4 className="mc-title">Multidisciplinary Expansion</h4>
                  <p className="mc-desc">Accelerated investments across shipping, real estate, travel, and education sectors, consolidating regional leadership.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="1990s" data-focus="FMCG Retail" data-ms="Tastee Choice Launch" id="year-1999">
                <div className="mc-year">1999</div>
                <div className="mc-content">
                  <h4 className="mc-title">Tastee Choice Retail Brand</h4>
                  <p className="mc-desc">Launched the Tastee Choice brand, expanding direct exports of value-added seafood products to major U.S. supermarkets.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2000s" data-focus="Quality Standards" data-ms="BRC Certification" id="year-2003">
                <div className="mc-year">2003</div>
                <div className="mc-content">
                  <h4 className="mc-title">Obtained BRC Certification</h4>
                  <p className="mc-desc">Obtained the prestigious British Retail Consortium (BRC) certification, validating international food safety and processing standards.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2000s" data-focus="Global Retail" data-ms="Ahold USA Partnership" id="year-2004">
                <div className="mc-year">2004</div>
                <div className="mc-content">
                  <h4 className="mc-title">ISO 9002 & Ahold USA Supply</h4>
                  <p className="mc-desc">Received ISO 9002 certification and expanded key retail business supply chains with global supermarket giant Ahold USA.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2000s" data-focus="Product Innovation" data-ms="Ready-to-Eat Range" id="year-2005">
                <div className="mc-year">2005</div>
                <div className="mc-content">
                  <h4 className="mc-title">Frozen Food & Meal Kits</h4>
                  <p className="mc-desc">Diversified into retail frozen food and meal kit manufacturing, establishing a dedicated product line for global consumers.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2000s" data-focus="Arts & Culture" data-ms="JTPac Established" id="year-2008">
                <div className="mc-year">2008</div>
                <div className="mc-content">
                  <h4 className="mc-title">JTPac Performing Arts Center</h4>
                  <p className="mc-desc">Established the Jose Thomas Performing Arts Center (JTPac), a world-class venue for promoting music, theatre, and visual arts.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2010s" data-focus="Real Estate Landmarks" data-ms="Marina Towers" id="year-2010">
                <div className="mc-year">2010</div>
                <div className="mc-content">
                  <h4 className="mc-title">Leadership & Real Estate Ventures</h4>
                  <p className="mc-desc">The Choice School became Kerala's leading academic institution. Launched the premium Choice Paradise and Choice Marina residential towers.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2010s" data-focus="Iconic Real Estate" data-ms="Choice Paradise Tower" id="year-2012">
                <div className="mc-year">2012</div>
                <div className="mc-content">
                  <h4 className="mc-title">Choice Paradise Tallest Tower</h4>
                  <p className="mc-desc">Inaugurated South India's tallest residential tower, Choice Paradise, standing as an architectural landmark of Kochi.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2010s" data-focus="Early Education" data-ms="Choice Kinderland" id="year-2014">
                <div className="mc-year">2014</div>
                <div className="mc-content">
                  <h4 className="mc-title">Choice Kinderland Fort Kochi</h4>
                  <p className="mc-desc">Expanded early childhood education with the launch of Choice Kinderland preschool in the heritage town of Fort Kochi.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2010s" data-focus="Academic Expansion" data-ms="Kozhikode & Thiruvalla" id="year-2015">
                <div className="mc-year">2015</div>
                <div className="mc-content">
                  <h4 className="mc-title">Kozhikode & Thiruvalla Projects</h4>
                  <p className="mc-desc">Launched expansion plans for The Choice School in Kozhikode and Thiruvalla, replicating the premium academic model.</p>
                </div>
              </div>

              <div className="milestone-card fade-up" data-decade="2010s" data-focus="Campus Development" data-ms="Senior School Block" id="year-2016">
                <div className="mc-year">2016</div>
                <div className="mc-content">
                  <h4 className="mc-title">Thiruvalla Operations & Tripunithura Block</h4>
                  <p className="mc-desc">Choice School Thiruvalla commenced operations, and a state-of-the-art senior school block opened in Tripunithura.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvolutionDashboard;
