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

  if (emailLink) {
    emailLink.addEventListener("click", function (event) {
      event.preventDefault();
      const email = this.getAttribute("href").replace("mailto:", "");
      navigator.clipboard.writeText(email);

      const originalText = this.textContent;
      this.textContent = "Email Copied!";
      gsap.fromTo(
        this,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          onComplete: () => {
            setTimeout(() => {
              gsap.to(this, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                onComplete: () => {
                  this.textContent = originalText;
                  gsap.fromTo(
                    this,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                  );
                },
              });
            }, 2000);
          },
        }
      );
    });
  }

  if (phoneLink) {
    phoneLink.addEventListener("click", function (event) {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        return; // Proceed with normal behavior on mobile devices
      } else {
        event.preventDefault();
        const phoneNumber = this.textContent;
        navigator.clipboard.writeText(phoneNumber);

        const originalText = this.textContent;
        this.textContent = "Telephone Number Copied!";
        gsap.fromTo(
          this,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: () => {
              setTimeout(() => {
                gsap.to(this, {
                  opacity: 0,
                  y: 20,
                  duration: 0.5,
                  onComplete: () => {
                    this.textContent = originalText;
                    gsap.fromTo(
                      this,
                      { opacity: 0, y: -20 },
                      { opacity: 1, y: 0, duration: 0.5 }
                    );
                  },
                });
              }, 2000);
            },
          }
        );
      }
    });
  }
});
