import { test, expect } from '@playwright/test';
import { FormPage } from '../pages/form.page';

test.describe('Common POM', () => {

  test.beforeEach(async () => {
    console.log(' Test started');
  });

  test.afterEach(async () => {
    console.log(' Test finished');
  });

  test('Submit form successfully', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.fillForm('Selva', 'selva@example.com', 'IN');
    await formPage.checkSubscribe();
    await formPage.submit();
    const msg = await formPage.getSuccessMessage();
    expect(msg).toContain('Thank you');
  });

  test('Show validation errors for empty fields', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.submit();
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
  });

});
