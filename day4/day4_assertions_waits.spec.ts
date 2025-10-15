import { test, expect } from '@playwright/test';

test.describe('Day 4 - Assertions & Waits', () => {

  // 1️⃣ Multiple Assertions on a Static Page
  test('Verify title, heading text, and element count', async ({ page }) => {
    await page.goto('https://example.com');

    // Assertions
    await expect(page).toHaveTitle(/Example Domain/);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');

    // Count assertion
    const links = page.locator('a');
    await expect(links).toHaveCount(1);
  });


  // 2️⃣ Assert visibility after AJAX load (fixed)
test('Wait for dynamic content to appear', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  // Wait for button to be visible before clicking
  const startButton = page.locator('#start button');
  await expect(startButton).toBeVisible();

  await startButton.click(); // triggers AJAX load

  // Wait for the hidden element to appear after loading
  const message = page.locator('#finish h4');
  await message.waitFor({ state: 'visible', timeout: 10000 });

  // Assertions
  await expect(message).toBeVisible();
  await expect(message).toHaveText('Hello World!');
});

  // 3️⃣ Verify navigation and URL correctness
  test('Navigate between pages and assert URLs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

    // Click on “Form Authentication” link
    await page.click('text=Form Authentication');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Assert URL & Page heading
    await expect(page).toHaveURL(/.*login/);
    const header = page.locator('h2');
    await expect(header).toHaveText('Login Page');
  });

});
