import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Login and take screenshot in Digital Build app', async ({ page }) => {
  
  await page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded', timeout: 60000 });

  
  await page.waitForSelector('text=Login Id', { timeout: 20000 });

  
  await page.getByRole('textbox', { name: 'Login Id' }).fill(process.env.LOGIN_EMAIL!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.LOGIN_PASSWORD!);

  
  await page.locator('form ion-col').filter({ hasText: 'Submit' }).click();


  await page.waitForLoadState('networkidle', { timeout: 60000 });

  
  await page.screenshot({ path: 'test-results/logged-in.png', fullPage: true });

  
  console.log(' Login done credentials loaded from .env and screenshot saved.');
});
