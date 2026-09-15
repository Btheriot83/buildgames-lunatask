import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const out = process.argv[2];
const url = process.argv[3] || 'http://127.0.0.1:4188/';
const mode = process.argv[4] || 'today'; // today | walk | habits | full

fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--disable-dev-shm-usage'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await context.addInitScript((m) => {
  try {
    if (m !== 'walk') localStorage.setItem('tideglass-walk-done', '1');
    else localStorage.removeItem('tideglass-walk-done');
  } catch {}
}, mode);
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForSelector('.desk-paper', { timeout: 20000 });
await page.waitForTimeout(600);
// Ensure sample day if barren
const barren = await page.locator('.today-empty').count();
if (barren > 0) {
  const ledger = page.locator('summary:has-text("Ledger")');
  if (await ledger.count()) {
    await ledger.click();
    const demo = page.getByRole('button', { name: /Demo day/i });
    if (await demo.count()) await demo.click();
    await page.waitForTimeout(500);
  }
}
if (mode === 'habits') {
  await page.getByTestId('tab-habits').click();
  await page.waitForTimeout(700);
}
if (mode === 'full') {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
}
const buf = await page.screenshot({ type: 'png', fullPage: mode === 'full', animations: 'disabled' });
fs.writeFileSync(out, buf);
await browser.close();
console.log('wrote', out, buf.length);
