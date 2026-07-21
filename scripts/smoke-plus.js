const { chromium } = require("playwright");

const baseUrl = process.env.GAME_LAB_URL || "http://127.0.0.1:4173";
const accessCode = process.env.GAME_LAB_PLUS_CODE;

if (!accessCode) {
  throw new Error("Set GAME_LAB_PLUS_CODE before running the Game Lab+ smoke test");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Game Lab+" }).first().click();
  await page.waitForLoadState("networkidle");

  const library = page.locator("#plus-library");
  if (await library.isVisible()) throw new Error("Game Lab+ should begin locked");

  await page.locator("#plus-code").fill("WRONG");
  await page.getByRole("button", { name: "Unlock games" }).click();
  await page.getByText("That code did not work. Try again.").waitFor();

  await page.locator("#plus-code").fill(accessCode);
  await page.getByRole("button", { name: "Unlock games" }).click();
  await library.waitFor({ state: "visible" });

  const gameCount = await page.locator("#plus-grid .game-card").count();
  if (gameCount !== 9) throw new Error(`Expected 9 curated games, found ${gameCount}`);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (hasHorizontalOverflow) throw new Error("Game Lab+ overflows the mobile viewport");

  await page.reload({ waitUntil: "networkidle" });
  if (!(await library.isVisible())) throw new Error("Game Lab+ did not stay unlocked for the browser session");

  await page.getByRole("button", { name: "Lock Game Lab+" }).click();
  if (await library.isVisible()) throw new Error("Lock control did not hide the special games");

  if (errors.length) throw new Error(`Browser errors: ${errors.join(" | ")}`);

  console.log(`Game Lab+ smoke test passed with ${gameCount} special games.`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
