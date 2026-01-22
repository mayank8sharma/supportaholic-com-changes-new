'use strict';

/* ==================== PRELOADER ==================== */
const preloader = document.querySelector('[data-preaload]');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
  });
}

/* ==================== HELPER FUNCTION ==================== */
const addEventOnElements = (elements, eventType, callback) => {
  if (!elements || !elements.length) return;
  elements.forEach(el => el.addEventListener(eventType, callback));
};

/* ==================== NAVBAR ==================== */
const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

if (navbar && overlay && navTogglers.length) {
  const toggleNavbar = () => {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');
  };
  addEventOnElements(navTogglers, 'click', toggleNavbar);
}

/* ==================== HEADER & BACK TO TOP ==================== */
const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

if (header && backTopBtn) {
  let lastScrollPos = 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('active');
      backTopBtn.classList.add('active');

      if (lastScrollPos < window.scrollY) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }

      lastScrollPos = window.scrollY;
    } else {
      header.classList.remove('active', 'hide');
      backTopBtn.classList.remove('active');
    }
  });
}

/* ==================== HERO SLIDER ==================== */
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

if (heroSliderItems.length && heroSliderPrevBtn && heroSliderNextBtn) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = () => {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  };

  heroSliderNextBtn.addEventListener('click', () => {
    currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
    updateSliderPos();
  });

  heroSliderPrevBtn.addEventListener('click', () => {
    currentSlidePos =
      (currentSlidePos - 1 + heroSliderItems.length) %
      heroSliderItems.length;
    updateSliderPos();
  });

  let autoSlideInterval = setInterval(() => {
    heroSliderNextBtn.click();
  }, 7000);

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    'mouseover',
    () => clearInterval(autoSlideInterval)
  );

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    'mouseout',
    () => {
      autoSlideInterval = setInterval(() => {
        heroSliderNextBtn.click();
      }, 7000);
    }
  );
}

/* ==================== PARALLAX ==================== */
const parallaxItems = document.querySelectorAll('[data-parallax-item]');
if (parallaxItems.length) {
  window.addEventListener('mousemove', event => {
    let x = (event.clientX / window.innerWidth * 10) - 5;
    let y = (event.clientY / window.innerHeight * 10) - 5;

    x = -x;
    y = -y;

    parallaxItems.forEach(item => {
      const speed = Number(item.dataset.parallaxSpeed || 1);
      item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });
  });
}

/* ==================== VIDEO ==================== */
const videoFile = document.getElementById('video-file');
const videoButton = document.getElementById('video-button');
const videoIcon = document.getElementById('video-icon');

if (videoFile && videoButton && videoIcon) {
  const playPause = () => {
    if (videoFile.paused) {
      videoFile.play();
      videoIcon.classList.add('ri-pause-line');
      videoIcon.classList.remove('ri-play-line');
    } else {
      videoFile.pause();
      videoIcon.classList.remove('ri-pause-line');
      videoIcon.classList.add('ri-play-line');
    }
  };

  videoButton.addEventListener('click', playPause);
  videoFile.addEventListener('ended', () => {
    videoIcon.classList.remove('ri-pause-line');
    videoIcon.classList.add('ri-play-line');
  });
}

/* ==================== SWIPER ==================== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper === 'undefined') return;

  if (document.querySelector('.brand-slider')) {
    new Swiper('.brand-slider', {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      breakpoints: {
        450: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        991: { slidesPerView: 4 },
        1200: { slidesPerView: 5 }
      }
    });
  }

  if (document.querySelector('.test-swiper')) {
    new Swiper('.test-swiper', {
      loop: true,
      autoplay: { delay: 2000 }
    });
  }
});


// Menu Navigation services dropdown (Desktop + Mobile)

document.addEventListener("DOMContentLoaded", function () {

  const megaMenu = document.querySelector(".mega-menu");
  const toggle = document.querySelector(".mega-toggle");
  const tabs = document.querySelectorAll(".mega-tab");
  const panels = document.querySelectorAll(".mega-content");

  function activateTab(tab) {
    const target = tab.dataset.target;

    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  }

  /* Desktop hover */
  tabs.forEach(tab => {
    tab.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 992) activateTab(tab);
    });
  });

  /* Mobile click */
  toggle.addEventListener("click", () => {
    if (window.innerWidth < 992) {
      megaMenu.classList.toggle("active");
    }
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (window.innerWidth < 992) activateTab(tab);
    });
  });

});


// MENU ANIMATION

const canvas = document.getElementById("techCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null, radius: 140 };

/* ================= RESIZE (FIXED) ================= */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ================= MOUSE ================= */
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

/* ================= BACKGROUND GRADIENT ================= */
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(240,245,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* ================= PARTICLE ================= */
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.size = Math.random() * 2 + 1;
    this.density = Math.random() * 30 + 10;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x += Math.cos(angle) * force * this.density * 0.4;
        this.y += Math.sin(angle) * force * this.density * 0.4;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,102,204,0.45)";
    ctx.fill();
  }
}

/* ================= INIT ================= */
function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

/* ================= CONNECTIONS ================= */
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(0,102,204,${0.15 - dist / 1200})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

/* ================= ANIMATE ================= */
function animate() {
  drawBackground();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

animate();