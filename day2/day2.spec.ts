import { test, expect, chromium } from '@playwright/test';

test.describe('Day 2 Practice - Handling UI Components', () => {

  test.setTimeout(60000); 

  test('Fill demo form and validate submission', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://demoqa.com/automation-practice-form');

    await page.fill('#firstName', 'Maha');
    await page.fill('#lastName', 'lakshmi');
    await page.fill('#userEmail', 'maha.lakshmi@example.com');
    await page.click('label[for="gender-radio-2"]');
    await page.fill('#userNumber', '9876543210');
    await page.click('label[for="hobbies-checkbox-1"]');
    await page.click('label[for="hobbies-checkbox-3"]');

    await page.waitForSelector('#state');
    await page.click('#state');
    await page.click('div[id^="react-select-3-option-0"]'); 

    await page.waitForSelector('#city');
    await page.click('#city');
    await page.click('div[id^="react-select-4-option-0"]'); 

    await page.click('#submit');

    await page.waitForSelector('.modal-content');
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    const modalTitle = page.locator('#example-modal-sizes-title-lg');
    await expect(modalTitle).toHaveText('Thanks for submitting the form');

    console.log('Form submitted successfully!');

    await browser.close();
  });

});
