const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "video": false,
  "watchForFileChanges": false,
  "chromeWebSecurity": false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
