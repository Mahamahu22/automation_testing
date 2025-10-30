import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    screenshot: 'on',
  },
  reporter: [['list'], ['html', { outputFolder: 'html-report' }]],
});
