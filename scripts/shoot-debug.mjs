import { chromium } from "playwright";

// Viewport approximating user's screenshot (1335x657 visible content area).
// We use 1366x700 which is a common short-viewport laptop.
const VIEWPORTS = [
  { name: "short", width: 1366, height: 700 },
  { name: "normal", width: 1440, height: 900 },
];

const OUT = "d:/tmp/codfy-debug";

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);

  // Locate the custom-software section (id="desarrollo")
  const desarrollo = await page.evaluate(() => {
    const el = document.getElementById("desarrollo");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { topAbs: r.top + window.scrollY, height: r.height };
  });
  console.log(`[${vp.name}] desarrollo:`, desarrollo);

  // Locate productos section
  const productos = await page.evaluate(() => {
    const el = document.getElementById("productos");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { topAbs: r.top + window.scrollY, height: r.height };
  });
  console.log(`[${vp.name}] productos:`, productos);

  if (desarrollo) {
    // Scroll so the sticky pin of desarrollo is fully active (middle of its scroll range)
    const samples = [0, 0.25, 0.5, 0.75, 1.0];
    for (const f of samples) {
      const y = Math.floor(desarrollo.topAbs + desarrollo.height * f);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(400);
      const name = `${vp.name}-desarrollo-${String(Math.round(f * 100)).padStart(3, "0")}.jpg`;
      await page.screenshot({ path: `${OUT}/${name}`, type: "jpeg", quality: 82 });
      console.log(`  -> ${name}`);
    }
  }

  if (productos) {
    const samples = [0, 0.15, 0.4, 0.65, 0.9];
    for (const f of samples) {
      const y = Math.floor(productos.topAbs + productos.height * f);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(400);
      const name = `${vp.name}-productos-${String(Math.round(f * 100)).padStart(3, "0")}.jpg`;
      await page.screenshot({ path: `${OUT}/${name}`, type: "jpeg", quality: 82 });
      console.log(`  -> ${name}`);
    }
  }

  // Hero
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-hero-top.jpg`, type: "jpeg", quality: 82 });
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-hero-mid.jpg`, type: "jpeg", quality: 82 });

  await ctx.close();
}

await browser.close();
console.log("Done -> d:/tmp/codfy-debug");
