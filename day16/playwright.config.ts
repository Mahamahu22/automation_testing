import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  
  timeout: 900000,

  use: {
    headless: false,                
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    navigationTimeout: 0,           
    actionTimeout: 0,                

    viewport: { width: 1400, height: 900 },
    ignoreHTTPSErrors: true,
    javaScriptEnabled: true,
  },

  workers: 1,


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
