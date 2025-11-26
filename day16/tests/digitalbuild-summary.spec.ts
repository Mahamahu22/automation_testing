import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.setTimeout(900000);

test('Summary → Print → Download Full PDF', async ({ browser }) => {
  const context = await browser.newContext({
    acceptDownloads: true
  });

  const page = await context.newPage();

  
  await page.goto(process.env.APP_URL!);

  await page.getByRole('textbox', { name: 'Login Id' })
    .fill(process.env.LOGIN_EMAIL!);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.LOGIN_PASSWORD!);

  await page.getByRole('button', { name: 'Submit' }).click();

  
  await page.locator('#EPTW').click();
  await page.getByText('Summary').click();

  
  const popupPromise = page.waitForEvent('popup');
  await page.getByTitle('Print').first().click();
  const popup = await popupPromise;

  await popup.waitForLoadState('networkidle');
  await popup.waitForTimeout(10000);


  const pdfBytes = await popup.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    scale: 1,
    format: 'A4',
    landscape: false
  });

  
  const folderPath = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

  const filePath = path.join(folderPath, 'pdf1.pdf');
  fs.writeFileSync(filePath, pdfBytes);

  await context.close();

  console.log("📄 PDF Saved Successfully:", filePath);
});
