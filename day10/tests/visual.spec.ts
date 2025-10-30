import { test, expect } from '@playwright/test';

test('Visual comparison of a page', async ({ page }) => {
   await page.goto('https://playwright.dev');
 await page.waitForSelector('h1');
expect(await page.screenshot()).toMatchSnapshot('playwright-home.png');
});
