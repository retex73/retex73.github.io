export function initDownloadResume() {
  function downloadResume() {
    // Store the original styles
    const originalStyles = document.body.getAttribute("style");
    const originalClasses = [...document.body.classList];

    // Create a link to the print CSS
    const printCSS = document.createElement("link");
    printCSS.rel = "stylesheet";
    printCSS.type = "text/css";
    printCSS.href = "print.css";
    document.head.appendChild(printCSS);

    // Store AOS attributes and remove them
    const aosElements = document.querySelectorAll("[data-aos]");
    const aosData = new Map();
    aosElements.forEach((el) => {
      aosData.set(el, {
        aos: el.getAttribute("data-aos"),
        aosOffset: el.getAttribute("data-aos-offset"),
        aosDelay: el.getAttribute("data-aos-delay"),
        aosDuration: el.getAttribute("data-aos-duration"),
      });
      el.removeAttribute("data-aos");
      el.removeAttribute("data-aos-offset");
      el.removeAttribute("data-aos-delay");
      el.removeAttribute("data-aos-duration");
    });

    // Wait for print CSS to load and apply
    setTimeout(() => {
      window.print();

      // Remove print CSS
      document.head.removeChild(printCSS);

      // Restore original styles and classes
      document.body.setAttribute("style", originalStyles || "");
      document.body.className = originalClasses.join(" ");

      // Restore AOS attributes
      aosData.forEach((data, el) => {
        Object.entries(data).forEach(([attr, value]) => {
          if (value) el.setAttribute(`data-${attr}`, value);
        });
      });

      // Reinitialize AOS
      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    }, 500);
  }

  const downloadButton = document.querySelector(".download-resume-btn");
  if (downloadButton) {
    downloadButton.addEventListener("click", downloadResume);
  }
}
