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
