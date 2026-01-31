import { test, expect } from "@playwright/test";

test("Pos_UI_0001 - Real-time output update", async ({ page }) => {
  await page.goto("https://www.swifttranslator.com/", { waitUntil: "domcontentloaded" });

  const input = page.getByPlaceholder("Input Your Singlish Text Here.");
  const output = page.locator('xpath=(//*[normalize-space()="Sinhala"])[last()]/following-sibling::*[1]');

  await input.fill("mama gamee innavaa");
  await input.type("", { delay: 100 });

  await expect(output).toHaveText(/[\S]/, { timeout: 15000 });
  const out = (await output.textContent()) || "";

  expect(out.trim().length).toBeGreaterThan(0);
  expect(out).toMatch(/[\u0D80-\u0DFF]/); // Sinhala letters exist
});
