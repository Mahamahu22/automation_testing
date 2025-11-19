import { test, expect } from '@playwright/test';

test('Input field assertions', async ({ page }) => {
  await page.goto('/html/html_forms.asp');

  const input = page.locator('#fname');  

  await input.fill('Maha');

  await expect(input).toHaveAttribute('name', 'fname');
  await expect(input).toHaveValue('Maha');

  await page.screenshot({ path: 'assertions_w3.png' });
});
