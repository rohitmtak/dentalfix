const serviceData = {
  restorative: {
    title: "Restorative Bliss",
    img: "/assets/images/dental-implant/473.jpg",
    aboutTitle: "About Restorative Bliss",
    aboutText: "Content for Restorative Bliss...",
  },
  pediatric: {
    title: "Pediatric Dentistry",
    img: "/assets/images/pediatric.jpg",
    aboutTitle: "About Pediatric Dentistry",
    aboutText: "Content for Pediatric Dentistry...",
  },
  // ...add all categories here...
};

document.querySelectorAll(".services-list-item").forEach((item) => {
  item.addEventListener("click", function () {
    const cat = this.getAttribute("data-category");
    const data = serviceData[cat];
    if (!data) return;
    document.querySelector(".services-title").textContent = data.title;
    document.querySelector(".services-img").src = data.img;
    document.querySelector(".services-img").alt = data.title;
    document.querySelector(".services-about-title").textContent =
      data.aboutTitle;
    document.querySelector(".services-about-text").textContent = data.aboutText;
  });
});
