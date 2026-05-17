import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const TARGETS = [
  { url: "http://localhost:3000/", name: "home", scrolls: [600, 900, 1200, 1500, 1800] },
  { url: "http://localhost:3000/ampirux", name: "ampirux", scrolls: [800, 1100, 1500, 1800, 2200] },
  {
    url: "http://localhost:3000/notamaestro",
    name: "notamaestro",
    scrolls: [800, 1100, 1500, 1800, 2200],
  },
];

for (const t of TARGETS) {
  await page.goto(t.url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  for (const y of t.scrolls) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(400);
    const file = `d:/tmp/codfy-shots/trans-${t.name}-${y}.jpg`;
    await page.screenshot({ path: file, type: "jpeg", quality: 86 });
    console.log(file);
  }
}

await browser.close();
console.log("Done");
