feather.replace();
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Dark mode functionality
const darkModeToggle = document.querySelector(".dark-mode-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function toggleDarkMode(state) {
  document.body.classList.toggle("dark-mode", state);
  darkModeToggle.innerHTML = state
    ? '<i data-feather="sun"></i>'
    : '<i data-feather="moon"></i>';
  feather.replace();
  localStorage.setItem("darkMode", state);
}

// Check for saved user preference, if any, on load
const darkModeState = localStorage.getItem("darkMode");
if (darkModeState !== null) {
  toggleDarkMode(JSON.parse(darkModeState));
} else {
  toggleDarkMode(prefersDarkScheme.matches);
}

// Listen for changes to the prefers-color-scheme media query

prefersDarkScheme.addListener((mediaQuery) =>
  toggleDarkMode(mediaQuery.matches)
);

// Listen for clicks on the toggle
darkModeToggle.addEventListener("click", () => {
  toggleDarkMode(!document.body.classList.contains("dark-mode"));
});

document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.getElementById("email-link");
  const phoneLink = document.getElementById("phone-link");

  function animateCopyMessage(element, originalText) {
    const copyText = element.classList.contains("email")
      ? "Email Copied!"
      : "Phone Number Copied!";

    gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        element.textContent = copyText;
        gsap.fromTo(
          element,
          { opacity: 0, y: 20, rotation: -5, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
              gsap.to(element, {
                opacity: 0,
                y: 20,
                rotation: 5,
                scale: 0.8,
                delay: 1.5,
                duration: 0.3,
                onComplete: () => {
                  element.textContent = originalText;
                  gsap.fromTo(
                    element,
                    { opacity: 0, y: -20, rotation: 0, scale: 0.8 },
                    {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      duration: 0.3,
                      ease: "back.out(1.7)",
                    }
                  );
                },
              });
            },
          }
        );
      },
    });
  }

  function setupLinkAnimation(element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const textToCopy = element.classList.contains("email")
        ? element.getAttribute("href").replace("mailto:", "")
        : element.textContent;

      navigator.clipboard.writeText(textToCopy);
      animateCopyMessage(element, element.textContent);
    });
  }

  if (emailLink) {
    emailLink.classList.add("email");
    setupLinkAnimation(emailLink);
  }

  if (phoneLink) {
    phoneLink.classList.add("phone");
    setupLinkAnimation(phoneLink);
  }
});
