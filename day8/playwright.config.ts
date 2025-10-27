import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',     // your test folder
  timeout: 30000,
  use: {
    headless: false,      // show the browser
    baseURL: `file://${path.join(__dirname, 'public')}/`,  // local folder for HTML
  },
});
