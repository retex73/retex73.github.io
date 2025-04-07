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
});
