import { test, expect, chromium, firefox, webkit } from '@playwright/test';


test.describe('Day 1 Practice - Playwright Basics', () => {

  test('Launch Chrome and navigate to example.com', async () => {
   
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext(); 
    const page = await context.newPage(); 

    
    await page.goto('https://example.com');
    


    
    const title = await page.title();
    const url = page.url();
    console.log('Page Title:', title);
    console.log('Page URL:', url);

    
    await expect(page).toHaveTitle('Example Domain');

    
    const heading = page.locator('h1'); 
    console.log('Heading Text:', await heading.textContent());


    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev');
    console.log('Second Page Title:', await page2.title());

    await page2.close();
    await page.close();
    await browser.close();
  });

});
