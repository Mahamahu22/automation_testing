import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

Before(async function () {
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
});

After(async function () {
  await this.browser.close();
});
