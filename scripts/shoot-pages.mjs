import { chromium } from "playwright";

const PAGES = ["/", "/ampirux", "/notamaestro"];
const POSITIONS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
const OUT = "d:/tmp/codfy-debug-pages";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 700 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const path of PAGES) {
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const name = path === "/" ? "home" : path.slice(1);
  for (const pos of POSITIONS) {
    const y = Math.floor(total * pos);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(350);
    const filename = `${name}-${String(Math.round(pos * 100)).padStart(2, "0")}.jpg`;
    await page.screenshot({ path: `${OUT}/${filename}`, type: "jpeg", quality: 80 });
  }
}

await browser.close();
console.log("Done -> d:/tmp/codfy-debug-pages");
