import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1366, height: 700 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// Scroll into the middle of the desarrollo section
const desarrollo = await page.evaluate(() => {
  const el = document.getElementById("desarrollo");
  if (!el) return null;
  return { topAbs: el.getBoundingClientRect().top + window.scrollY, height: el.offsetHeight };
});

await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }),
  Math.floor(desarrollo.topAbs + desarrollo.height * 0.5));
await page.waitForTimeout(700);

const data = await page.evaluate(() => {
  const desarrollo = document.getElementById("desarrollo");
  const sticky = desarrollo?.querySelector("[class*='sticky']");
  const inner = sticky?.firstElementChild;
  const header = inner?.firstElementChild;
  const timeline = inner?.children[1];
  const detail = inner?.children[1]?.children[1];
  function rect(e) {
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, h: r.height };
  }
  return {
    viewportH: window.innerHeight,
    desarrollo: rect(desarrollo),
    sticky: rect(sticky),
    inner: rect(inner),
    header: rect(header),
    timeline: rect(timeline),
    detail: rect(detail),
  };
});

console.log(JSON.stringify(data, null, 2));

await browser.close();
