/* ===================================================
   Portfolio Script — Javier Aznar Ruiz
   - Navbar scroll effect
   - Scroll reveal animations
   - Mobile hamburger menu
   - Particle canvas background
   - Typing text effect in hero
=================================================== */

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const navClose = document.getElementById('navClose');

function openMobileNav() {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
navClose.addEventListener('click', closeMobileNav);

// Close on outside click
mobileNav.addEventListener('click', (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    closeMobileNav();
  }
});


// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// // ===== Typing Effect in Hero Badge =====
// (function () {
//   const messages = [
//     'Available for opportunities'
//   ];
//   let msgIdx = 0;
//   let charIdx = 0;
//   let deleting = false;
//   let waitTimer = null;

//   const badgeTextEl = document.querySelector('.hero-badge');
//   if (!badgeTextEl) return;

//   // Clear existing text content (keep only the dot span)
//   Array.from(badgeTextEl.childNodes).forEach(node => {
//     if (node.nodeType === Node.TEXT_NODE) badgeTextEl.removeChild(node);
//   });

//   let textNode = document.createTextNode('');
//   badgeTextEl.appendChild(textNode);

//   function tick() {
//     const currentMsg = messages[msgIdx];

//     if (!deleting) {
//       charIdx++;
//       textNode.textContent = currentMsg.slice(0, charIdx);
//       if (charIdx === currentMsg.length) {
//         deleting = true;
//         waitTimer = setTimeout(tick, 2000);
//         return;
//       }
//     } else {
//       charIdx--;
//       textNode.textContent = currentMsg.slice(0, charIdx);
//       if (charIdx === 0) {
//         deleting = false;
//         msgIdx = (msgIdx + 1) % messages.length;
//       }
//     }

//     const speed = deleting ? 40 : 80;
//     waitTimer = setTimeout(tick, speed);
//   }

//   // Initialize
//   textNode.textContent = '';
//   setTimeout(tick, 1500);
// })();


// ===== Animated particle canvas behind hero =====
(function () {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.35;
  `;

  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.2,
    }));
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
    ctx.fill();
  }

  function drawConnections() {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  let raf;
  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;

      drawParticle(p);
    }
    drawConnections();
    raf = requestAnimationFrame(animate);
  }

  // Pause when hero not visible (performance)
  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!raf) animate();
    } else {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }, { threshold: 0 });
  heroObserver.observe(hero);

  resize();
  createParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  }, { passive: true });
})();


// ===== Skill tag hover stagger =====
document.querySelectorAll('.skill-category').forEach(card => {
  const tags = card.querySelectorAll('.skill-tag');
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = `${i * 30}ms`;
  });
});


// ===== Active nav link highlight on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });


// ===== Stat number count-up animation =====
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  function step(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(easedProgress * target);
    el.innerHTML = isFloat ? (easedProgress * target).toFixed(1) : value;
    if (progress < 1) requestAnimationFrame(step);
    else el.innerHTML = target;
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.replace(/[^0-9.]/g, '');
      const target = parseFloat(raw) || 0;
      const suffix = el.textContent.replace(/[0-9.]/g, '');
      animateCount(el, target);
      el.setAttribute('data-suffix', suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));


// ===== Projects Carousel =====
(function () {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll('.project-card'));
  console.log(cards)
  const isMobile = () => window.innerWidth <= 768;

  // How many cards are visible at once
  const visibleCount = () => 1;

  // Have one dot per card as requested
  const totalSlides = () => 2;
  console.log(totalSlides())
  let current = 0;

  // Build dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const total = totalSlides();
    if (total <= 1) return; // No dots if no scrolling needed

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    const total = totalSlides();
    if (total === 0) return;

    current = Math.max(0, Math.min(index, total - 1));

    const vc = visibleCount();
    const cardWidth = cards[0].offsetWidth + 24; // gap = 1.5rem = 24px

    // The maximum index we can slide to without showing empty space at the end
    const maxIndex = Math.max(0, total - vc);

    // The visual slide position is clamped to not exceed the maxIndex
    const visualIndex = Math.min(current, maxIndex);

    // Shift by card width based on the clamped visual index
    track.style.transform = `translateX(-${visualIndex * cardWidth}px)`;

    // Update dots (the active dot still reflects 'current')
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });

    // Disable/enable buttons
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= total - 1;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const el = document.getElementById('projects');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Touch / drag swipe
  let startX = 0;
  track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  track.addEventListener('pointerup', (e) => {
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
  });

  // Rebuild on resize
  window.addEventListener('resize', () => {
    // If resized from mobile (total=4) to desktop (total=3), current might be out of bounds
    current = Math.min(current, totalSlides() - 1);
    current = Math.max(0, current);
    buildDots();
    goTo(current);
  }, { passive: true });

  buildDots();
  goTo(0);
})();


// ===== Email Clipboard Copy =====
function copyEmail() {
  const email = 'javieraznarruiz@gmail.com';
  const toast = document.getElementById('emailToast');
  const btnText = document.getElementById('emailBtnText');

  navigator.clipboard.writeText(email).then(() => {
    if (btnText) btnText.textContent = 'Copied!';
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        if (btnText) btnText.textContent = 'Email Me';
      }, 2500);
    }
  }).catch(() => {
    // Fallback for browsers that block clipboard API
    window.location.href = `mailto:${email}`;
  });
}

// ===== Phone Clipboard Copy =====
function copyPhone() {
  const phone = '+34634931807';
  const toast = document.getElementById('phoneToast');
  const btnText = document.getElementById('phoneBtnText');

  navigator.clipboard.writeText(phone).then(() => {
    if (btnText) btnText.textContent = 'Copied!';
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        if (btnText) btnText.textContent = 'Call Me';
      }, 2500);
    }
  }).catch(() => {
    // Fallback for browsers that block clipboard API
    window.location.href = `tel:${phone}`;
  });
}

// ===== Theme Selection =====
(function initThemeSelect() {
  const selectWrapper = document.getElementById('themeSelect');
  const triggerBtn = document.getElementById('themeSelectTrigger');
  const optionsMenu = document.getElementById('themeOptions');
  const optionBtns = document.querySelectorAll('.theme-option');
  const htmlEl = document.documentElement;

  if (!selectWrapper || !triggerBtn) return;

  const ICONS = {
    dark: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>`,
    light: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>`,
    system: `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z"/><path d="M7 20h10"/><path d="M9 16v4"/><path d="M15 16v4"/>`
  };

  // Load saved preference or default to 'system'
  let currentTheme = localStorage.getItem('portfolio-theme') || 'system';

  function applyTheme(theme) {
    let modeToApply = theme;

    // Resolve system theme to actual light/dark
    if (theme === 'system') {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      modeToApply = prefersLight ? 'light' : 'dark';
    }

    // Apply to document
    if (modeToApply === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
    } else {
      htmlEl.removeAttribute('data-theme'); // default is dark
    }

    // Update trigger icon
    const svgIcon = triggerBtn.querySelector('svg');
    if (svgIcon) {
      svgIcon.innerHTML = ICONS[theme];
    }

    // Update active class in options
    optionBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeValue === theme);
    });

    // Save to storage
    if (theme === 'system') {
      localStorage.removeItem('portfolio-theme');
    } else {
      localStorage.setItem('portfolio-theme', theme);
    }

    currentTheme = theme;
  }

  // Toggle menu
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    selectWrapper.classList.toggle('active');
  });

  // Selection
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeValue;
      applyTheme(theme);
      selectWrapper.classList.remove('active');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', () => {
    selectWrapper.classList.remove('active');
  });

  // Initial load
  applyTheme(currentTheme);

  // Listen for OS theme changes if on system mode
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  });
})();
