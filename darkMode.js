export function initDarkMode() {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function toggleDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
    darkModeToggle.classList.toggle("dark-mode-active", state);
    localStorage.setItem("darkMode", state);
  }

  // --- Refactored Initialization Logic ---

  // 1. Determine the initial state (class is already set by inline script)
  let initialState = document.documentElement.classList.contains("dark-mode");

  // 2. Apply the class to the body immediately
  // No longer needed here - done by inline script
  // if (initialState) {
  //     document.body.classList.add("dark-mode");
  // }

  // 3. Set the initial toggle button state and icon
  if (initialState) {
    darkModeToggle.classList.add("dark-mode-active");
  }
  darkModeToggle.innerHTML = initialState
    ? '<i data-feather="sun"></i>'
    : '<i data-feather="moon"></i>';
  feather.replace(); // Render the initial icon

  // 4. Add listeners

  // Listen for changes to the prefers-color-scheme media query
  prefersDarkScheme.addListener((mediaQuery) => {
    // Check current state AFTER toggling based on media query
    const newState = mediaQuery.matches;
    // Avoid unnecessary toggles if state matches listener trigger
    if (document.documentElement.classList.contains("dark-mode") !== newState) {
      toggleDarkMode(newState);
    }
  });

  // Listen for clicks on the toggle
  darkModeToggle.addEventListener("click", () => {
    toggleDarkMode(!document.documentElement.classList.contains("dark-mode"));
  });
}
