// Review Plain Carousel Logic
(function () {
  // Function to initialize a carousel
  function initCarousel(track, controlsContainer) {
    if (!track || !controlsContainer) return;

    const cols = Array.from(track.querySelectorAll(".review-plain-col"));
    const leftArrow = controlsContainer.querySelector(".review-arrow-left");
    const rightArrow = controlsContainer.querySelector(".review-arrow-right");
    const dotsContainer = controlsContainer.querySelector(".review-dots");

    if (!cols.length || !leftArrow || !rightArrow || !dotsContainer) return;

    let currentSlide = 0;

    function getColsPerSlide() {
      return window.innerWidth <= 900 ? 1 : 2;
    }

    function getTotalSlides() {
      return Math.ceil(cols.length / getColsPerSlide());
    }

    function setWidths() {
      const colsPerSlide = getColsPerSlide();
      cols.forEach((col) => {
        col.style.flex = `0 0 ${100 / colsPerSlide}%`;
        col.style.maxWidth = `${100 / colsPerSlide - 5}%`;
      });
      track.style.width = "100%";
    }

    function updateDots() {
      // Remove existing dots
      dotsContainer.innerHTML = "";
      const totalSlides = getTotalSlides();
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.className = "review-dot";
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        if (i === currentSlide) dot.classList.add("active");
        dot.addEventListener("click", () => {
          updateSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlide(newIndex) {
      setWidths();
      const colsPerSlide = getColsPerSlide();
      const totalSlides = getTotalSlides();
      currentSlide = Math.max(0, Math.min(newIndex, totalSlides - 1));
      const percent = -(100 * currentSlide);
      track.style.transform = `translateX(${percent}%)`;
      updateDots();
    }

    leftArrow.addEventListener("click", () => {
      updateSlide(currentSlide - 1);
    });
    rightArrow.addEventListener("click", () => {
      updateSlide(currentSlide + 1);
    });

    window.addEventListener("resize", () => {
      updateSlide(currentSlide);
    });

    // Initialize
    updateSlide(0);
  }

  // Initialize all carousels on the page
  document.querySelectorAll('.review-plain-slider').forEach(slider => {
    const track = slider.querySelector('.review-plain-track');
    const controls = slider.querySelector('.review-plain-controls, .review-plain-controls-invisalign');
    if (track && controls) {
      initCarousel(track, controls);
    }
  });
})();

// Custom
// // Wait for the DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function () {
//   // Select all images inside the slide-images container
//   const images = document.querySelectorAll('.slide-images img');
//   // Select the range input
//   const slider = document.querySelector('.slider-range');
//   // Select the week label
//   const weekLabel = document.querySelector('.slide-week');
//   if (!images.length || !slider || !weekLabel) return;

//   // Function to update image visibility based on slider value
//   function updateImage() {
//       const index = parseInt(slider.value, 10);
//       images.forEach((img, i) => {
//           img.style.display = (i === index) ? '' : 'none';
//       });

//       // Update the week label (index + 1, since weeks start at 1)
//       weekLabel.textContent = `Week ${index + 1}`;
//   }

//   // Initialize: show the first image, hide the rest
//   updateImage();

//   // Add event listener to the slider
//   slider.addEventListener('input', updateImage);
// });

document.addEventListener('DOMContentLoaded', function () {
  // For each review column
  document.querySelectorAll('.review-plain-col').forEach(function (col) {
    const images = col.querySelectorAll('.slide-images img');
    const slider = col.querySelector('.slider-range');
    const weekLabel = col.querySelector('.slide-week');
    if (!images.length || !slider || !weekLabel) return; // skip if elements missing

    function updateImage() {
      const index = parseInt(slider.value, 10);
      images.forEach((img, i) => {
        img.style.display = (i === index) ? '' : 'none';
      });
      weekLabel.textContent = `Week ${index + 1}`;
    }

    updateImage();
    slider.addEventListener('input', updateImage);
  });
});