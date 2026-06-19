/* ═══════════════════════════════════════════════════
   THE CHOICE GROUP — PREMIUM JS
   Animations · Interactions · Effects · v1.0
════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   1. PRELOADER
════════════════════════════════════════ */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
      triggerHeroReveal();
    }, 2400);
  });

  // Fallback
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
    triggerHeroReveal();
  }, 4000);
})();

/* ══════════════════════════════════════════
   2. HERO REVEAL
════════════════════════════════════════ */
function triggerHeroReveal() {
  const els = document.querySelectorAll('.hero .reveal-up');
  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 140);
  });
  // Start hero counters
  setTimeout(startHeroCounters, 900);
}

/* ══════════════════════════════════════════
   3. HERO CANVAS (Particle Grid)
════════════════════════════════════════ */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const dots = [];
  const DOT_COUNT = 80;

  for (let i = 0; i < DOT_COUNT; i++) {
    dots.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }

  let raf;
  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = (dots[i].x - dots[j].x) * w;
        const dy = (dots[i].y - dots[j].y) * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x * w, dots[i].y * h);
          ctx.lineTo(dots[j].x * w, dots[j].y * h);
          ctx.strokeStyle = `rgba(77,143,224,${(1 - dist / 120) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > 1) d.vx *= -1;
      if (d.y < 0 || d.y > 1) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${d.opacity})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  draw();
})();

/* ══════════════════════════════════════════
   4. FLOATING PARTICLES
════════════════════════════════════════ */
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 10}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
})();

/* ══════════════════════════════════════════
   5. NAVBAR
════════════════════════════════════════ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
})();

/* ══════════════════════════════════════════
   6. SCROLL PROGRESS INDICATOR
════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-bar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = `${progress}%`;
  });
})();

/* ══════════════════════════════════════════
   7. SCROLL ANIMATIONS (Intersection Observer)
════════════════════════════════════════ */
(function initScrollAnimations() {
  const items = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Respect delay classes
        const delay = entry.target.classList.contains('delay-1') ? 100
          : entry.target.classList.contains('delay-2') ? 200
          : entry.target.classList.contains('delay-3') ? 320
          : entry.target.classList.contains('delay-4') ? 440
          : entry.target.classList.contains('delay-5') ? 560
          : 0;
        setTimeout(() => {
          entry.target.classList.add('in');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
})();

/* ══════════════════════════════════════════
   8. ANIMATED COUNTERS
════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2200;
  const start = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const val = Math.floor(easeOut(t) * target);
    el.textContent = val.toLocaleString() + (t >= 1 ? suffix : '');
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function startHeroCounters() {
  document.querySelectorAll('.hs-num[data-target]').forEach(animateCounter);
}

(function initSectionCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
})();

/* ══════════════════════════════════════════
   9. PARALLAX EFFECTS
════════════════════════════════════════ */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-layer');
  const globalBg = document.querySelector('.global-parallax-bg');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
    }

    if (globalBg) {
      const section = document.getElementById('global');
      if (section) {
        const offsetTop = section.offsetTop;
        const relScroll = scrollY - offsetTop;
        globalBg.style.transform = `translateY(${relScroll * 0.25}px)`;
      }
    }
  });
})();

/* ══════════════════════════════════════════
   10. TESTIMONIALS CAROUSEL
════════════════════════════════════════ */
(function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.tc-dot');
  const prevBtn = document.getElementById('tc-prev');
  const nextBtn = document.getElementById('tc-next');

  if (!cards.length) return;

  let current = 0;
  let autoTimer;

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  startAuto();
})();

/* ══════════════════════════════════════════
   11. CONTACT FORM
════════════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit-btn');
    btn.style.opacity = '0.7';
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      btn.style.opacity = '1';
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }, 1800);
  });
})();

/* ══════════════════════════════════════════
   12. SCROLL TO TOP BUTTON
════════════════════════════════════════ */
(function initScrollToTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════
   13. SERVICE CARD INTERACTIONS
════════════════════════════════════════ */
(function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '2';
    });
    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '';
    });
  });
})();

/* ══════════════════════════════════════════
   14. WHY CARDS STAGGERED REVEAL
════════════════════════════════════════ */
(function initWhyCards() {
  const cards = document.querySelectorAll('.why-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (Array.from(cards).indexOf(entry.target)) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(32px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
})();

/* ══════════════════════════════════════════
   15. LEADERSHIP CARDS REVEAL
════════════════════════════════════════ */
(function initLeadershipCards() {
  const cards = document.querySelectorAll('.leadership-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(c => observer.observe(c));
})();

/* ══════════════════════════════════════════
   16. GLOBAL CARDS STAGGER
════════════════════════════════════════ */
(function initGlobalCards() {
  const cards = document.querySelectorAll('.global-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(24px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(card);
  });
})();

/* ══════════════════════════════════════════
   17. NEWS CARDS REVEAL
════════════════════════════════════════ */
(function initNewsCards() {
  const cards = document.querySelectorAll('.news-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    observer.observe(card);
  });
})();

/* ══════════════════════════════════════════
   18. VALUE PILLS HOVER COLOR CYCLE
════════════════════════════════════════ */
(function initValuePills() {
  const pills = document.querySelectorAll('.value-pill');
  const colors = [
    ['rgba(26,64,128,0.3)', 'rgba(77,143,224,0.3)'],
    ['rgba(201,168,76,0.2)', 'rgba(201,168,76,0.3)'],
    ['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.25)'],
    ['rgba(168,85,247,0.15)', 'rgba(168,85,247,0.25)'],
    ['rgba(239,68,68,0.15)', 'rgba(239,68,68,0.2)'],
    ['rgba(14,165,233,0.2)', 'rgba(14,165,233,0.3)'],
  ];

  pills.forEach((pill, i) => {
    const [from, border] = colors[i % colors.length];
    pill.addEventListener('mouseenter', () => {
      pill.style.background = `linear-gradient(135deg, ${from}, transparent)`;
      pill.style.borderColor = border;
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.background = '';
      pill.style.borderColor = '';
    });
  });
})();

/* ══════════════════════════════════════════
   19. FOOTER REVEAL
════════════════════════════════════════ */
(function initFooterReveal() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.style.opacity = '1';
        footer.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  footer.style.opacity = '0';
  footer.style.transform = 'translateY(24px)';
  footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(footer);
})();

/* ══════════════════════════════════════════
   20. SMOOTH HOVER ON CTA BUTTONS (ripple)
════════════════════════════════════════ */
(function initRipple() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;width:5px;height:5px;border-radius:50%;
        background:rgba(255,255,255,0.35);
        left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
        transform:scale(0);animation:ripple-expand 0.55s ease forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-expand {
      to { transform: scale(80); opacity: 0; }
    }
    .nav-link.active {
      color: #fff;
      background: rgba(77,143,224,0.12);
    }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════
   21. MOUSE PARALLAX ON HERO
════════════════════════════════════════ */
(function initMouseParallax() {
  const hero = document.getElementById('hero');
  const content = document.getElementById('hero-content');
  if (!hero || !content) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (clientX - cx) / cx;
    const dy = (clientY - cy) / cy;

    content.style.transform = `translate(${dx * -8}px, ${dy * -6}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    content.style.transform = '';
  });
})();

/* ══════════════════════════════════════════
   22. COUNTER CARDS IN IMPACT SECTION
════════════════════════════════════════ */
(function initCounterCards() {
  const cards = document.querySelectorAll('.counter-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(32px) scale(0.96)';
    card.style.transition = 'opacity 0.65s ease, transform 0.65s ease, background 0.35s ease, box-shadow 0.35s ease';
    observer.observe(card);
  });
})();

/* ══════════════════════════════════════════
   23. TICKER PAUSE ON HOVER
════════════════════════════════════════ */
(function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
  track.addEventListener('mouseleave', () => { track.style.animationPlayState = ''; });
})();

/* ══════════════════════════════════════════
   24. SECTION BACKGROUND GRID ROTATION
════════════════════════════════════════ */
(function initBgGrid() {
  const grid = document.querySelector('.why-bg-grid');
  if (!grid) return;
  window.addEventListener('scroll', () => {
    const section = document.getElementById('why');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const progress = 1 - (rect.top / window.innerHeight);
    const offset = progress * 20;
    grid.style.backgroundPosition = `${offset}px ${offset}px`;
  });
})();

console.log('%c THE CHOICE GROUP ', 'background:#1a4080;color:#e8c97a;font-size:18px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('%c Est. 1950 · Cochin, Kerala, India ', 'color:#9aabcc;font-size:12px;');

/* ══════════════════════════════════════════
   ENTERPRISE ANIMATION ENGINE v2.0
   40+ animation types, performance-optimised
════════════════════════════════════════ */

/* ── 25. Universal Scroll Reveal Observer ── */
(function initUniversalReveal() {
  const allAnimClasses = [
    'anim-fade-in', 'anim-fade-up', 'anim-fade-down', 'anim-fade-left', 'anim-fade-right',
    'anim-zoom-in', 'anim-zoom-out',
    'anim-slide-up', 'anim-slide-down', 'anim-slide-left', 'anim-slide-right',
    'anim-flip-x', 'anim-flip-y',
    'reveal-clip', 'reveal-clip-up',
    'text-reveal-inner'
  ];

  const selector = allAnimClasses.map(c => `.${c}`).join(', ');
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ── 26. 3D Tilt Effect ── */
(function initTiltEffect() {
  const MAX_TILT = 12;
  const PERSPECTIVE = 800;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.style.perspective = `${PERSPECTIVE}px`;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotY = dx * MAX_TILT;
      const rotX = -dy * MAX_TILT;
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── 27. Magnetic Buttons ── */
(function initMagneticButtons() {
  const STRENGTH = 0.35;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ── 28. Enhanced Ripple Effect ── */
(function initEnhancedRipple() {
  document.querySelectorAll('.btn-primary, .btn-ghost, .ripple-container').forEach(el => {
    el.classList.add('ripple-container');
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      wave.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        margin: 0;
      `;
      this.appendChild(wave);
      setTimeout(() => wave.remove(), 700);
    });
  });
})();

/* ── 29. Typewriter Effect ── */
(function initTypewriter() {
  const targets = document.querySelectorAll('[data-typewriter]');
  targets.forEach(el => {
    const phrases = (el.getAttribute('data-typewriter') || '').split('|');
    const speed   = parseInt(el.getAttribute('data-type-speed')  || '80');
    const pause   = parseInt(el.getAttribute('data-type-pause')  || '1800');
    const cursor  = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    el.after(cursor);

    let pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
      const current = phrases[pIdx];
      if (!deleting) {
        el.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) {
          deleting = true;
          return setTimeout(tick, pause);
        }
      } else {
        el.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? speed / 2 : speed);
    }

    setTimeout(tick, 800);
  });
})();

/* ── 30. Text Reveal Lines ── */
(function initTextReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.text-reveal-inner').forEach((inner, i) => {
          setTimeout(() => inner.classList.add('in'), i * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.text-reveal-wrap').forEach(wrap => observer.observe(wrap));
})();

/* ── 31. History Timeline Progress Bar ── */
(function initHistoryTimeline() {
  const section   = document.getElementById('history');
  const progress  = document.getElementById('timeline-progress');
  const decadeNav = document.getElementById('decade-nav');

  if (!section || !progress) return;

  /* Scroll-driven fill of the vertical progress bar */
  function updateProgress() {
    const rect   = section.getBoundingClientRect();
    const total  = section.offsetHeight - window.innerHeight;
    const filled = Math.max(0, Math.min(1, -rect.top / total));
    progress.style.height = (filled * 100) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* Decade button navigation — smooth scroll to first milestone of decade */
  if (decadeNav) {
    const decadeBtns = decadeNav.querySelectorAll('.decade-btn');

    decadeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const decade = btn.getAttribute('data-decade');
        const first  = section.querySelector(`[data-decade="${decade}"]`);
        if (first) {
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        decadeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    /* Auto-highlight active decade on scroll */
    const items = section.querySelectorAll('.timeline-item[data-decade]');
    const scrollObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const decade = entry.target.getAttribute('data-decade');
          decadeBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-decade') === decade);
          });
        }
      });
    }, { threshold: 0.5, rootMargin: '-20% 0px -60% 0px' });

    items.forEach(item => scrollObs.observe(item));
  }
})();

/* ── 32. Progress Bar Animation on Scroll ── */
(function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill, .counter-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-width') || '80';
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

/* ── 33. Page Transition ── */
(function initPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  /* Exit animation on page load */
  overlay.classList.add('exiting');
  overlay.addEventListener('animationend', () => {
    overlay.classList.remove('exiting');
  }, { once: true });

  /* Entrance animation on internal link click */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      // Only add an enter flash for hash links if desired
    });
  });
})();

/* ── 34. Multi-layer Parallax on Scroll ── */
(function initMultiLayerParallax() {
  const slowEls   = document.querySelectorAll('.parallax-slow');
  const mediumEls = document.querySelectorAll('.parallax-medium');
  const fastEls   = document.querySelectorAll('.parallax-fast');

  function updateParallax() {
    const y = window.scrollY;
    slowEls.forEach(el   => { el.style.transform = `translateY(${y * 0.08}px)`; });
    mediumEls.forEach(el => { el.style.transform = `translateY(${y * 0.15}px)`; });
    fastEls.forEach(el   => { el.style.transform = `translateY(${y * 0.28}px)`; });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
})();

/* ── 35. Floating Shape Initialisation (JS-generated extras) ── */
(function initFloatingShapes() {
  // Already handled via CSS for hero; this adds background orbs to other sections
  const sectionIds = ['about', 'expertise', 'impact', 'history'];
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const orbs = [
      { w: 300, h: 300, top: '10%', left: '-60px',  bg: 'var(--navy-600)',  dur: '22s', delay: '0s'  },
      { w: 200, h: 200, bottom: '5%', right: '-40px', bg: 'var(--blue-400)', dur: '18s', delay: '-9s' },
    ];
    orbs.forEach(o => {
      const d = document.createElement('div');
      d.className = 'mesh-orb';
      d.style.cssText = `
        width:${o.w}px;height:${o.h}px;
        top:${o.top || 'auto'};bottom:${o.bottom || 'auto'};
        left:${o.left || 'auto'};right:${o.right || 'auto'};
        background:${o.bg};
        animation-duration:${o.dur};
        animation-delay:${o.delay};
        position:absolute;pointer-events:none;z-index:0;
      `;
      if (getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
      }
      section.appendChild(d);
    });
  });
})();

/* ── 36. Gradient Text Animation on Hero Headline ── */
(function initGradientHeadline() {
  const em = document.querySelector('.hero-headline em');
  if (!em) return;
  em.classList.add('gradient-text-animated');
})();

/* ── 37. Hover Lift on Service Cards ── */
(function initHoverLift() {
  document.querySelectorAll('.service-card, .why-card, .counter-card').forEach(card => {
    card.classList.add('hover-lift-sm');
    card.classList.add('glass-card-hover');
  });
})();

/* ── 38. Add Tilt Cards to Leadership & Timeline ── */
(function initTiltCards() {
  document.querySelectorAll('.leadership-card').forEach(card => {
    card.classList.add('tilt-card');
  });
})();

/* ── 39. Image hover zoom on about-img-inner ── */
(function initImgZoom() {
  document.querySelectorAll('.about-img-inner').forEach(wrap => {
    wrap.classList.add('img-hover-zoom');
  });
})();

/* ── 40. Magnetic Buttons on Hero CTAs ── */
(function initHeroMagnetic() {
  document.querySelectorAll('#hero .btn').forEach(btn => {
    btn.classList.add('magnetic-btn');
  });
})();

/* ── 41. Enhanced Mouse Parallax with floating shapes ── */
(function initEnhancedMouseParallax() {
  const hero    = document.getElementById('hero');
  const orbs    = hero ? hero.querySelectorAll('.mesh-orb, .floating-shape') : [];
  if (!hero || !orbs.length) return;

  hero.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const depth = (i % 3 + 1) * 0.015;
      orb.style.transform = `translate(${dx * depth * 60}px, ${dy * depth * 60}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    orbs.forEach(orb => { orb.style.transform = ''; });
  });
})();

/* ── 42. Section Glow Dividers ── */
(function addGlowDividers() {
  const sectionIds = ['history', 'global', 'expertise', 'why', 'impact', 'testimonials', 'news', 'contact'];
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const div = document.createElement('div');
    div.className = 'section-glow-divider';
    section.insertAdjacentElement('beforebegin', div);
  });
})();

/* ── 43. GSAP ScrollTrigger Animations ── */
(function initGSAP() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-headline', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 2.5
    });

    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "back.out(1.4)"
      });
    });

    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: '#expertise',
          start: 'top 75%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }
  }
})();

/* ── 44. Framer (Motion One) Animations ── */
(function initFramerMotion() {
  if (typeof Motion !== 'undefined') {
    const { animate, hover, inView, spring } = Motion;
    
    document.querySelectorAll('.btn-primary').forEach(btn => {
      hover(btn, () => {
        animate(btn, { scale: 1.05 }, { easing: spring({ stiffness: 300, damping: 10 }) });
        return () => animate(btn, { scale: 1 }, { easing: spring({ stiffness: 300, damping: 10 }) });
      });
    });

    document.querySelectorAll('.hs-num').forEach(stat => {
      inView(stat, () => {
        animate(stat, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8, easing: "ease-out" });
      });
    });
  }
})();

/* ── 45. Evolution Dashboard Interactivity ── */
(function initEvolutionDashboard() {
  const milestoneCards = document.querySelectorAll('.milestone-card');
  const dashDecade = document.getElementById('dash-decade');
  const dashFocus = document.getElementById('dash-focus');
  const dashMilestone = document.getElementById('dash-milestone');
  const decadeBtns = document.querySelectorAll('.decade-btn');
  
  if (!milestoneCards.length || !dashDecade) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        milestoneCards.forEach(c => c.classList.remove('active'));
        
        const card = entry.target;
        card.classList.add('active');

        const decade = card.getAttribute('data-decade');
        const focus = card.getAttribute('data-focus');
        const ms = card.getAttribute('data-ms');

        if (dashDecade) dashDecade.textContent = decade;
        if (dashFocus) {
          dashFocus.style.opacity = 0;
          setTimeout(() => { dashFocus.textContent = focus; dashFocus.style.opacity = 1; }, 200);
        }
        if (dashMilestone) dashMilestone.textContent = ms;

        decadeBtns.forEach(btn => {
          if (btn.getAttribute('data-target-decade') === decade) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  milestoneCards.forEach(card => observer.observe(card));

  decadeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetDecade = btn.getAttribute('data-target-decade');
      
      const targetCard = document.querySelector(`.milestone-card[data-decade="${targetDecade}"]`);
      if (targetCard) {
        const offset = 140; 
        const top = targetCard.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
