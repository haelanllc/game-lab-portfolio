const { chromium } = require("playwright");

const baseUrl = process.env.GAME_LAB_URL || "http://127.0.0.1:4173";
const accessCode = process.env.GAME_LAB_PLUS_CODE;

if (!accessCode) {
  throw new Error("Set GAME_LAB_PLUS_CODE before running the shelf smoke test");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const publicTitles = await page.locator("#game-grid .game-card h3").allTextContents();
  await page.getByRole("heading", { name: "Where the best games go." }).waitFor();
  const homeHasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (homeHasHorizontalOverflow) throw new Error("The homepage overflows the mobile viewport");

  await page.goto(`${baseUrl}/plus.html`, { waitUntil: "networkidle" });
  await page.locator("#plus-code").fill(accessCode);
  await page.getByRole("button", { name: "Unlock games" }).click();
  await page.locator("#plus-library").waitFor({ state: "visible" });
  const plusTitles = await page.locator("#plus-grid .game-card h3").allTextContents();

  const repeatedTitles = plusTitles.filter((title) => publicTitles.includes(title));
  if (repeatedTitles.length) {
    throw new Error(`Games appear on both shelves: ${repeatedTitles.join(", ")}`);
  }
  if (!publicTitles.length || !plusTitles.length) {
    throw new Error("Both the public and Game Lab+ shelves must contain games");
  }

  console.log(`Shelf separation passed: ${plusTitles.length} Plus games and ${publicTitles.length} public games, with no duplicates.`);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
