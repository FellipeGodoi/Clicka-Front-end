import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    defaultCommandTimeout: 100000,
    pageLoadTimeout: 60000,
    requestTimeout:20000,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      
    },
  },
});
