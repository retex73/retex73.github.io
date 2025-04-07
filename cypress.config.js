import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return import("./cypress/plugins/index.js").then((module) =>
        module.default(on, config)
      );
    },
    baseUrl: "http://127.0.0.1:5500",
  },
});
