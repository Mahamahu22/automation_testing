import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Day 5 - Handling Popups, Alerts, and Modals', () => {

  
  test('Handle JavaScript Alerts and Confirm boxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    
    page.once('dialog', async (dialog) => {
      console.log('Alert message:', dialog.message());
      await dialog.accept();
    });
    await page.click('button:has-text("Click for JS Alert")');
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

   
    page.once('dialog', async (dialog) => {
      console.log('Confirm message:', dialog.message());
      await dialog.accept();
    });
    await page.click('button:has-text("Click for JS Confirm")');
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');

   
    page.once('dialog', async (dialog) => {
      console.log('Confirm message:', dialog.message());
      await dialog.dismiss();
    });
    await page.click('button:has-text("Click for JS Confirm")');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');

   
    page.once('dialog', async (dialog) => {
      console.log('Prompt message:', dialog.message());
      await dialog.accept('Playwright');
    });
    await page.click('button:has-text("Click for JS Prompt")');
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
  });


  
  test('Upload a file to a demo page', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    const filePath = path.join(__dirname, 'sample.txt');
    fs.writeFileSync(filePath, 'This is a test file for upload.');

    const uploadInput = page.locator('input#file-upload');
    await uploadInput.setInputFiles(filePath);

    await page.click('input#file-submit');
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
  });


  
  
  test('Open a link in a new tab and validate its content', async ({ browser, context, page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a:has-text("Click Here")'),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage.locator('h3')).toHaveText('New Window');

   
    expect(context.pages().length).toBe(2);
  });


  
  test('Download a file and verify it exists', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.click('a:text("some-file.txt")');
    const download = await downloadPromise;

    const downloadPath = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadPath)) fs.mkdirSync(downloadPath);

    const filePath = path.join(downloadPath, await download.suggestedFilename());
    await download.saveAs(filePath);

   
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBeTruthy();
    console.log('✅ File downloaded:', filePath);
  });

});
