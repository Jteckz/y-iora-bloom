import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const url = process.env.URL || "http://localhost:5173";
const outDir = path.resolve(process.cwd(), "screenshots");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const devices = [
  { name: "iphone-se", width: 320, height: 568, deviceScaleFactor: 2, isMobile: true },
  { name: "iphone-14", width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: "galaxy", width: 360, height: 800, deviceScaleFactor: 3, isMobile: true },
];

(async () => {
  const browser = await chromium.launch();
  for (const d of devices) {
    const context = await browser.newContext({
      viewport: { width: d.width, height: d.height },
      isMobile: d.isMobile,
      deviceScaleFactor: d.deviceScaleFactor,
    });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle" });
      // small delay to allow any animations to settle
      await page.waitForTimeout(400);
      const file = path.join(outDir, `${d.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log("Saved", file);
    } catch (err) {
      console.error("Failed for", d.name, err);
    } finally {
      await context.close();
    }
  }
  await browser.close();
})();
