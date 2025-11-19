import { test, expect } from '@playwright/test';

test('Handle dropdown', async ({ page }) => {
  await page.goto('/tags/tryit.asp?filename=tryhtml_select');

  const frame = page.frameLocator('#iframeResult');
  const dropdown = frame.locator('select');

  await dropdown.selectOption('volvo');
  await dropdown.selectOption({ index: 1 });
  await dropdown.selectOption({ label: 'Saab' });

  const value = await dropdown.inputValue();
  console.log('Selected dropdown value:', value);

  expect(['volvo', 'saab', 'opel', 'audi']).toContain(value);

  await page.screenshot({ path: 'dropdown_w3.png' });
});
