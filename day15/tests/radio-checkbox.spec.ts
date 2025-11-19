import { test, expect } from "@playwright/test";

test("Radio and checkbox working on LetCode", async ({ page }) => {

  await page.goto("https://letcode.in/radio");

  const yes = page.locator("#yes");
  const no = page.locator("#no");
  const remember = page.locator("#one");

  await yes.click();
  await remember.click();

  await expect(yes).toBeChecked();
  await expect(no).not.toBeChecked();
  await expect(remember).toBeChecked();

  await page.screenshot({ path: "letcode_radio.png" });
});
