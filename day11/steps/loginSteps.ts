import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";

let browser: Browser;
let page: Page;

Given('I launch the browser', async () => {
  browser = await chromium.launch({ headless: false }); 
  page = await browser.newPage();
});

When('I open the login page', async () => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
});

When('I enter valid credentials', async () => {
  await page.fill('#username', 'student');
  await page.fill('#password', 'Password123');
  await page.click('#submit');
});

Then('I should see the dashboard', async () => {
 
  await page.waitForSelector('text=Log out', { timeout: 15000 });
  console.log(" Login successful – dashboard visible!");
  await browser.close();
});
