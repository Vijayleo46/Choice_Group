import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import EvolutionDashboard from './components/EvolutionDashboard';
import Global from './components/Global';
import Expertise from './components/Expertise';
import Why from './components/Why';
import Impact from './components/Impact';
import Leadership from './components/Leadership';
import Testimonials from './components/Testimonials';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Basic GSAP Animations that were originally in app.js
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach((el) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    const fadeLefts = document.querySelectorAll('.fade-left');
    fadeLefts.forEach((el) => {
      gsap.fromTo(el,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });

    const fadeRights = document.querySelectorAll('.fade-right');
    fadeRights.forEach((el) => {
      gsap.fromTo(el,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        }
      );
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="react-app-container">
      <Header />
      <Hero />
      <About />
      <EvolutionDashboard />
      <Global />
      <Expertise />
      <Why />
      <Impact />
      <Leadership />
      <Testimonials />
      <News />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
