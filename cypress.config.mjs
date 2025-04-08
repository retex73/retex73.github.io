import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on /*, config */) {
      // `on` is used to hook into various events Cypress emits
      // `config` is the resolved Cypress config

      // Task for logging messages
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Task for logging table data
      on('task', {
        table(data) {
          console.table(data);
          return null;
        },
      });

      // If you were using the plugins file before, keep this part
      // Otherwise, remove it if cypress/plugins/index.js doesn't exist or is empty
      // return import("./cypress/plugins/index.js").then((module) =>
      //   module.default(on, config)
      // );
    },
    baseUrl: "http://127.0.0.1:5500",
  },
});
