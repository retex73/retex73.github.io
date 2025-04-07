import { toggleDarkMode } from "../darkMode.js";

describe("Dark Mode", () => {
  beforeEach(() => {
    document.body.innerHTML = '<button class="dark-mode-toggle"></button>';
    localStorage.clear();
  });

  test("toggleDarkMode should toggle dark mode class on body", () => {
    toggleDarkMode(true);
    expect(document.body.classList.contains("dark-mode")).toBeTruthy();
    expect(localStorage.getItem("darkMode")).toBe("true");

    toggleDarkMode(false);
    expect(document.body.classList.contains("dark-mode")).toBeFalsy();
    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
