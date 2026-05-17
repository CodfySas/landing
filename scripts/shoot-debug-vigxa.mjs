import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const VIEWPORTS = [
  { name: "short", width: 1366, height: 700 },
  { name: "normal", width: 1440, height: 900 },
];

const OUT = "d:/tmp/codfy-vigxa-debug";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (err) => console.log(`[pageerror] ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log(`[console.error] ${msg.text()}`);
  });

  await page.goto("http://localhost:3000/vigxa", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);

  const layout = await page.evaluate(() => {
    const out = {};
    for (const id of ["modulos", "modulos-track", "compliance", "planes"]) {
      const el = document.getElementById(id);
      if (el) {
        const r = el.getBoundingClientRect();
        out[id] = { topAbs: r.top + window.scrollY, height: r.height };
      }
    }
    out.total = document.documentElement.scrollHeight;
    out.vh = window.innerHeight;
    return out;
  });
  console.log(`[${vp.name}] layout`, layout);

  // Hero — scroll through it
  for (const f of [0, 0.3, 0.6, 0.9]) {
    const y = Math.floor(900 * f * 1.6);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/${vp.name}-hero-${String(Math.round(f * 100)).padStart(3, "0")}.jpg`, type: "jpeg", quality: 82 });
  }

  // Scrolly modules — sample at each of the 6 step centers. Use the INNER
  // pin track (#modulos-track) because that's the element ScrollyStep and
  // the page scene both read for their progress — `start start` to `end end`
  // means the pin-active scroll range is (trackHeight - viewport) pixels.
  const track = layout["modulos-track"];
  if (track) {
    for (let i = 0; i < 6; i++) {
      const f = (i + 0.5) / 6;
      const y = Math.floor(track.topAbs + (track.height - layout.vh) * f);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(700);
      const name = `${vp.name}-modulos-step${i + 1}.jpg`;
      await page.screenshot({ path: `${OUT}/${name}`, type: "jpeg", quality: 82 });
      console.log(`  -> ${name}`);
    }
  }

  // Features (after scrolly), compliance, pricing, cta
  for (const id of ["compliance", "planes"]) {
    const sec = layout[id];
    if (!sec) continue;
    for (const f of [0, 0.5, 0.9]) {
      const y = Math.floor(sec.topAbs + sec.height * f - vp.height * 0.1);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(500);
      const name = `${vp.name}-${id}-${String(Math.round(f * 100)).padStart(3, "0")}.jpg`;
      await page.screenshot({ path: `${OUT}/${name}`, type: "jpeg", quality: 82 });
    }
  }

  // Features grid (no id) — between modulos end and compliance start
  if (layout.modulos && layout.compliance) {
    const featStart = layout.modulos.topAbs + layout.modulos.height;
    const featEnd = layout.compliance.topAbs;
    for (const f of [0.2, 0.6]) {
      const y = Math.floor(featStart + (featEnd - featStart) * f - vp.height * 0.1);
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/${vp.name}-features-${String(Math.round(f * 100)).padStart(3, "0")}.jpg`, type: "jpeg", quality: 82 });
    }
  }

  // CTA — last viewport
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}-cta.jpg`, type: "jpeg", quality: 82 });

  await ctx.close();
}

await browser.close();
console.log(`Done -> ${OUT}`);
