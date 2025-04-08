import { initDarkMode } from "./darkMode.js";
import { initCopyAnimation } from "./copyAnimation.js";
import { initDownloadResume } from "./downloadResume.js";

feather.replace();
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

document.addEventListener("DOMContentLoaded", function () {
  initDarkMode();
  initCopyAnimation();
  initDownloadResume();

  // Initialize TypeIt for the H1 element
  const h1Element = document.querySelector("header h1");
  if (h1Element) {
    const originalText = h1Element.textContent; // Store original text
    h1Element.innerHTML = ""; // Clear the element first
    new TypeIt(h1Element, {
      strings: [originalText], // Use the stored original text
      speed: 75,
      waitUntilVisible: true,
      cursor: true,
      cursorChar: "_",
      lifeLike: true,
      afterComplete: function (instance) {
        instance.destroy(); // Remove cursor after completion
      },
    }).go();
  }

  // Wrap skills in span tags for styling
  const skillParagraphs = document.querySelectorAll(".skill-category p");
  skillParagraphs.forEach((p) => {
    const skills = p.textContent
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    if (skills.length > 0) {
      p.innerHTML = ""; // Clear existing text
      skills.forEach((skill) => {
        const span = document.createElement("span");
        span.classList.add("skill-tag");
        span.textContent = skill;
        p.appendChild(span);
      });
    }
  });
});
