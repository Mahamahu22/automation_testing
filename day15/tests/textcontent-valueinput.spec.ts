import { test, expect } from '@playwright/test';

test('textContent vs valueInput', async ({ page }) => {
  await page.goto('/html/html_forms.asp');

  const input = page.locator('#fname');  

  await input.fill('Maha');

  const value = await input.inputValue();
  const text = await input.textContent(); 

  console.log("Input value:", value);
  console.log("Text content:", text);

  expect(value).toBe('Maha');
  expect(text).toBe(""); 

  await page.screenshot({ path: 'text_vs_value_w3.png' });
});
