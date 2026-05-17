import { chromium } from "playwright";

const browser = await chromium.launch();

const VIEWPORTS = [
  { w: 1440, h: 900, name: "1440" },
  { w: 1024, h: 768, name: "1024" },
  { w: 390, h: 844, name: "390", dpr: 2 },
];

const PAGES = [
  { url: "http://localhost:3000/", name: "home" },
  { url: "http://localhost:3000/ampirux", name: "ampirux" },
  { url: "http://localhost:3000/notamaestro", name: "notamaestro" },
];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: vp.dpr ?? 1,
  });
  const page = await ctx.newPage();

  for (const p of PAGES) {
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    const file = `d:/tmp/codfy-shots/top-${p.name}-${vp.name}.jpg`;
    await page.screenshot({ path: file, type: "jpeg", quality: 86 });
    console.log(file);
  }

  await ctx.close();
}

await browser.close();
console.log("Done");
