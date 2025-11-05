import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/loginPage';
import { credentials } from './utils/testData';

test('Login test with custom credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();

  await page.pause();  
  await loginPage.login(credentials.username, credentials.password);

  const resultText = await page.locator('#result').textContent();
  await expect(resultText).toContain('Login Successful!');
});
