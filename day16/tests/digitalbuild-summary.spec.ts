import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

test.setTimeout(360000);

test('Digital Build → Summary → Print → Save PDF', async ({ page }) => {

 
  const APP_URL = process.env.APP_URL!;
const LOGIN_EMAIL = process.env.LOGIN_EMAIL!;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD!;

  await page.goto(APP_URL);


  await page.getByRole('textbox', { name: 'Login Id' }).fill(LOGIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(LOGIN_PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();

  
  await page.locator('#EPTW').click();
  await page.getByText('Summary').click();


  await page.locator('#EPTWListFromDate').nth(1).click();
  await page.getByRole('button', { name: 'Saturday, 1 November' }).click();
  await page.getByRole('button', { name: 'Done' }).click();

  await page.locator('#EPTWListToDate').nth(1).click();
  await page.getByRole('button', { name: 'Sunday, 30 November' }).click();
  await page.getByRole('button', { name: 'Done' }).click();

  
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTitle('Print').first().click()
  ]);

  await popup.waitForLoadState('networkidle');

  const pdfBuffer = await popup.pdf({ format: 'A4' });
  fs.writeFileSync('test-results/summary-report.pdf', pdfBuffer);

  await page.screenshot({
    path: 'test-results/final-summary-page.png',
    fullPage: true
  });
});

