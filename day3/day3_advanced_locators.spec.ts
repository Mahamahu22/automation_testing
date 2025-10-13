import { test, expect, Browser, Page, chromium } from '@playwright/test';

let browser: Browser;
let page: Page;

test.setTimeout(120000);

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

test.afterAll(async () => {
  await browser.close();
});

test.describe('Day 3 - Advanced Selectors & Locators', () => {

  test.beforeEach(async () => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  
  test('Locate elements using various strategies', async () => {
    await page.goto('https://www.w3schools.com/html/html_forms.asp', { waitUntil: 'domcontentloaded' });

    const heading = page.locator('h1', { hasText: 'HTML Forms' });
    await heading.waitFor({ timeout: 15000 });
    await expect(heading).toBeVisible();

    
    const textInputs = page.locator('input[type="text"]');
    await textInputs.nth(0).fill('John');
    await textInputs.nth(1).fill('Doe');

    
    await expect(textInputs.nth(0)).toHaveValue('John');
    await expect(textInputs.nth(1)).toHaveValue('Doe');
  });

 
  test('Work with relative locators (child & parent)', async () => {
    await page.goto('https://www.w3schools.com/html/html_tables.asp', { waitUntil: 'domcontentloaded' });
    const table = page.locator('#customers');

    const firstRow = table.locator('tr').nth(1);
    const companyName = firstRow.locator('td').first();

    await expect(companyName).toHaveText(/Alfreds Futterkiste/i);
  });

 
  test('Handle iframe elements', async () => {
    await page.goto('https://the-internet.herokuapp.com/iframe', { waitUntil: 'domcontentloaded' });

    const frame = page.frameLocator('#mce_0_ifr');

    
    const editorBody = frame.locator('body');
    await editorBody.waitFor({ timeout: 15000 });

    
    await editorBody.click({ clickCount: 3 });
    await editorBody.type('Playwright typing inside iframe ✅');

    
    await expect(editorBody).toHaveText(/Playwright typing inside iframe ✅/);
  });

 
  test('Handle dynamic content', async () => {
    await page.goto('https://news.ycombinator.com/', { waitUntil: 'domcontentloaded' });

    const firstArticleLink = page.locator('.athing .titleline a').first();
    await expect(firstArticleLink).toBeVisible();

    console.log('📰 First news title:', await firstArticleLink.innerText());
  });

});
