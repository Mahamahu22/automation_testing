import { test, expect } from '@playwright/test';

test('Handle child window', async ({ page, context }) => {
  await page.goto('/tags/tryit.asp?filename=tryhtml_link_target');

  const frame = page.frameLocator('#iframeResult');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    frame.locator('a[target="_blank"]').click()
  ]);

  await newPage.waitForLoadState();

  const title = await newPage.title();
  console.log('Child page title:', title);

  expect(title.length).toBeGreaterThan(0);

  await newPage.screenshot({ path: 'child_window_w3.png' });
});
