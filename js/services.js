const serviceData = {
  root: {
    title: "Root Canal Treatment",
    img: "/assets/images/dental-implant/473.jpg",
    aboutTitle: "About Root Canal",
    aboutText: "Content for Root...",
  },
  braces: {
    title: "Braces",
    img: "/assets/images/dental-implant/2149164279.jpg",
    aboutTitle: "About Braces",
    aboutText: "Content for Braces...",
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
