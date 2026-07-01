# <p align="center"><img src="./public/Choice-Group-Logo%20(1).png.png" alt="Choice Group" width="180"/><br>Choice Group Web Portal</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP Animations" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Styling" />
</p>

---

## 🌍 Overview
The **Choice Group Web Portal** is a high-end, responsive corporate web application showcasing the diversified business divisions of the Choice Group (Marine Exports, Logistics, Infrastructure, Education, and Technology). 

Built with **React**, **Vite**, and **GSAP**, it features advanced interactive sections, custom-engineered visual diagrams, and fluid scroll animations matching premium fintech / Apple-inspired design guidelines.

---

## ✨ Key Features

### 🛰️ Interactive Global Presence Map
- **Geographically Calibrated Viewport**: Rendered directly in SVG (`1000×500`) with smooth Bézier curve silhouettes representing continents.
- **Interactive Nodes**: Glowing, pulsed location markers for Global HQ (Cochin), USA, Canada, UK, Kenya, Japan, and South Korea.
- **Dynamic Trade Routes**: Animated parabolic paths connecting HQ to all international branches on scroll.
- **Rich Context Tooltips & Info Cards**: Interactive hover/click panels featuring branch roles, sales statistics, and details.

### 🛡️ Interactive Certifications & Aquaculture Cycle
- **BAP Certifications Core Ecosystem**: An interactive cycle illustrating **Farms** and **Factories** (repositioned for a clean, balanced layout).
- **Responsive Trust Grid**: Fully responsive certifications showcase highlighting BRC, HACCP, SGS, GSA, MSC, UKAS, ASC, and BSCI standards.

### 💎 Rich & Premium Design Aesthetics
- **Luxury Color Palette**: Deep corporate navy blues (`#0a1128`), warm gold accents (`#C49E3F`), and clean grays (`#E5E7EB`).
- **Glassmorphism Styling**: Translucent panels with background blurs, subtle inner borders, and soft shadows.
- **Scroll-Triggered Micro-Animations**: Smooth, non-obtrusive enter states driven by GSAP ScrollTrigger.

---

## 🛠️ Technology Stack
* **Frontend Library:** React (Functional Components, Hooks)
* **Build System:** Vite (Fast Refresh, Optimized Bundling)
* **Animation Engine:** GSAP (GreenSock) & ScrollTrigger
* **Styling:** Vanilla CSS Custom Properties (Design System tokens)

## 🎬 GSAP Animation Showcases

The project utilizes GreenSock (GSAP) and ScrollTrigger to create fluid, high-performance scroll animations. Below is a breakdown of how the key animations are structured in this portal:

### 1. Parabolic Trade Route Draw-In
Draws the paths from the global headquarters to the international branches using SVG dash arrays:
```javascript
const routeEls = svgRef.current.querySelectorAll('.trade-route');
routeEls.forEach((el, i) => {
  const length = el.getTotalLength();
  
  // Set initial hidden state
  gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
  
  // Animate on scroll trigger
  gsap.to(el, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 60%',
      once: true,
    },
    strokeDashoffset: 0,
    duration: 2,
    delay: 0.8 + (i * 0.35),
    ease: 'power2.inOut',
  });
});
```

### 2. Location Pin Stagger & Idle Pulse
Staggers the entrance of location markers on scroll, followed by an infinite pulse:
```javascript
COUNTRIES.forEach((c, i) => {
  const pathEls = svgRef.current.querySelectorAll(`[data-country="${c.id}"]`);
  
  // Pop-in animation
  gsap.from(pathEls, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 65%',
      once: true,
    },
    opacity: 0,
    scale: 0.8,
    transformOrigin: 'center center',
    duration: 0.7,
    delay: 0.3 + (i * 0.18),
    ease: 'back.out(2)',
  });
  
  // Continuous breathing pulse glow
  gsap.to(pathEls, {
    filter: `drop-shadow(0 0 6px ${c.glowColor})`,
    duration: 1.6 + (i * 0.2),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.3,
  });
});
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vijayleo46/Choice_Group.git
   cd Choice_Group
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

<p align="center">Made with ❤️ for <b>Choice Group</b></p>
