
  document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".menu .grid-list li");

    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.12}s`;

      if (index % 2 === 0) {
        item.classList.add("animate-left");
      } else {
        item.classList.add("animate-right");
      }
    });
  });

