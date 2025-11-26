import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.setTimeout(900000);

test('Download 4 PDFs one-by-one fully', async ({ browser }) => {

  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  
  await page.goto(process.env.APP_URL!);

  await page.getByRole('textbox', { name: 'Login Id' })
    .fill(process.env.LOGIN_EMAIL!);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.LOGIN_PASSWORD!);

  await page.getByRole('button', { name: 'Submit' }).click();

  
  await page.locator('#EPTW').click();
  await page.getByText('Summary').click();

 
  const folderPath = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

  
  async function downloadFullPDF(index: number) {

    console.log(`📄 Downloading PDF ${index + 1} ...`);

    const popupPromise = page.waitForEvent('popup');
    await page.getByTitle('Print').nth(index).click();
    const popup = await popupPromise;

    await popup.waitForLoadState('networkidle');
    await popup.waitForTimeout(7000);

    const pdfBytes = await popup.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      scale: 1,
      format: 'A4',
    });

    const filePath = path.join(folderPath, `pdf${index + 1}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);

    console.log(`✅ Saved → ${filePath}`);

    await popup.close();
  }

  
  for (let i = 0; i < 4; i++) {
    await downloadFullPDF(i);
  }

  await context.close();
});
