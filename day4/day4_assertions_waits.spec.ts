import { test, expect } from '@playwright/test';

test.describe('Day 4 - Assertions & Waits', () => {

  
  test('Verify title, heading text, and element count', async ({ page }) => {
    await page.goto('https://example.com');

    
    await expect(page).toHaveTitle(/Example Domain/);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');

   
    const links = page.locator('a');
    await expect(links).toHaveCount(1);
  });


  
test('Wait for dynamic content to appear', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  
  const startButton = page.locator('#start button');
  await expect(startButton).toBeVisible();

  await startButton.click(); 

  
  const message = page.locator('#finish h4');
  await message.waitFor({ state: 'visible', timeout: 10000 });

  
  await expect(message).toBeVisible();
  await expect(message).toHaveText('Hello World!');
});

  
  test('Navigate between pages and assert URLs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

    
    await page.click('text=Form Authentication');

    
    await page.waitForLoadState('networkidle');

    
    await expect(page).toHaveURL(/.*login/);
    const header = page.locator('h2');
    await expect(header).toHaveText('Login Page');
  });

});
