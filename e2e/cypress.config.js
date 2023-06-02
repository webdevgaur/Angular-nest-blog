const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',  
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
    },
  },
  
});
