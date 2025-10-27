import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',   
  timeout: 30000,
  use: {
    headless: false,     
    baseURL: `file://${path.join(__dirname, 'public')}/`,  
  },
});
