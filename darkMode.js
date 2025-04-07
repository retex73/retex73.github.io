export function initDarkMode() {
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
}
