import { chromium } from "playwright";

const PAGES = [
  { url: "http://localhost:3000/", name: "home" },
  { url: "http://localhost:3000/ampirux", name: "ampirux" },
  { url: "http://localhost:3000/notamaestro", name: "notamaestro" },
];

const POSITIONS = [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 0.97];

const OUT = "d:/tmp/codfy-shots";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const p of PAGES) {
  await page.goto(p.url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(900);
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewport = 900;
  console.log(`${p.name}: ${totalHeight}px tall (~${(totalHeight / viewport).toFixed(1)}vh)`);

  for (const pos of POSITIONS) {
    const y = Math.floor(totalHeight * pos);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(500);
    const filename = `${p.name}-${String(Math.round(pos * 100)).padStart(2, "0")}.jpg`;
    await page.screenshot({ path: `${OUT}/${filename}`, type: "jpeg", quality: 78 });
    console.log(`  ${filename}  (y=${y})`);
  }
}

// also do mobile of home
console.log("Mobile shots:");
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const mPage = await mobileCtx.newPage();
for (const p of PAGES) {
  await mPage.goto(p.url, { waitUntil: "networkidle", timeout: 30000 });
  await mPage.waitForTimeout(800);
  const totalHeight = await mPage.evaluate(() => document.documentElement.scrollHeight);
  for (const pos of [0, 0.3, 0.6, 0.9]) {
    const y = Math.floor(totalHeight * pos);
    await mPage.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await mPage.waitForTimeout(500);
    const filename = `m-${p.name}-${String(Math.round(pos * 100)).padStart(2, "0")}.jpg`;
    await mPage.screenshot({ path: `${OUT}/${filename}`, type: "jpeg", quality: 78 });
    console.log(`  ${filename}`);
  }
}

await browser.close();
console.log("Done -> d:/tmp/codfy-shots");
