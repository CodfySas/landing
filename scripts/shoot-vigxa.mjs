import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "d:/tmp/codfy-vigxa";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

page.on("pageerror", (err) => console.log(`[pageerror] ${err.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") console.log(`[console.error] ${msg.text()}`);
});

const URL = "http://localhost:3000/vigxa";

await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1500);

const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`Page height: ${totalHeight}px (~${(totalHeight / 900).toFixed(1)}vh)`);

// Take screenshots at scroll positions matching the scene's breakpoints
const positions = [
  { pos: 0.00, name: "00-hero" },
  { pos: 0.08, name: "08-hero-end" },
  { pos: 0.16, name: "16-step1-left" },
  { pos: 0.25, name: "25-step2-right" },
  { pos: 0.34, name: "34-step3-left" },
  { pos: 0.43, name: "43-step4-right" },
  { pos: 0.52, name: "52-step5-left" },
  { pos: 0.61, name: "61-step6-right" },
  { pos: 0.70, name: "70-features" },
  { pos: 0.80, name: "80-compliance" },
  { pos: 0.90, name: "90-pricing" },
  { pos: 0.98, name: "98-cta" },
];

for (const p of positions) {
  const y = Math.floor(totalHeight * p.pos);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(900);
  const file = `${OUT}/${p.name}.jpg`;
  await page.screenshot({ path: file, type: "jpeg", quality: 80 });
  console.log(`${file}  (scroll=${y}px)`);
}

// Also mobile
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
await mpage.waitForTimeout(1200);
const mh = await mpage.evaluate(() => document.documentElement.scrollHeight);
for (const [i, frac] of [0, 0.2, 0.4, 0.6, 0.8, 0.97].entries()) {
  await mpage.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), Math.floor(mh * frac));
  await mpage.waitForTimeout(500);
  await mpage.screenshot({ path: `${OUT}/m-${String(i).padStart(2, "0")}-${Math.round(frac * 100)}.jpg`, type: "jpeg", quality: 80 });
}

await browser.close();
console.log(`Done -> ${OUT}`);
