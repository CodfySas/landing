import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "d:/tmp/codfy-all";
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

const PAGES = [
  { path: "/", name: "home", positions: [0, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 0.97] },
  { path: "/ampirux", name: "ampirux", positions: [0, 0.2, 0.4, 0.55, 0.75, 0.9, 0.97] },
  { path: "/notamaestro", name: "notamaestro", positions: [0, 0.3, 0.55, 0.8, 0.97] },
];

for (const p of PAGES) {
  await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`${p.name}: ${total}px`);
  for (const pos of p.positions) {
    const y = Math.floor(total * pos);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(500);
    const file = `${OUT}/${p.name}-${String(Math.round(pos * 100)).padStart(2, "0")}.jpg`;
    await page.screenshot({ path: file, type: "jpeg", quality: 82 });
  }
}

await browser.close();
console.log(`Done -> ${OUT}`);
