import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120000,
  use: {
    baseURL: 'https://www.w3schools.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 120000,
  },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
});
