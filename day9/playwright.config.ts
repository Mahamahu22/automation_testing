import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,


  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html', { outputFolder: 'html-report', open: 'never' }]
  ],

  use: {
    browserName: 'chromium',
    headless: true,
  },
});
