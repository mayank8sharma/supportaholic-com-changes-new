document.addEventListener("DOMContentLoaded", function () {

  const sections = document.querySelectorAll(".section.menu");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const items = entry.target.querySelectorAll(".grid-list li");

        items.forEach((item, index) => {
          item.style.animationDelay = `${index * 0.12}s`;

          if (index % 2 === 0) {
            item.classList.add("animate-left");
          } else {
            item.classList.add("animate-right");
          }
        });

        observer.unobserve(entry.target); // run once per section
      });
    },
    {
      threshold: 0.25
    }
  );

  sections.forEach(section => observer.observe(section));
});

// ABOUT ANIMATION
document.addEventListener("DOMContentLoaded", function () {

  const aboutSections = document.querySelectorAll(".about");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // run once per section
      });
    },
    {
      threshold: 0.25
    }
  );

  aboutSections.forEach(section => observer.observe(section));
});

