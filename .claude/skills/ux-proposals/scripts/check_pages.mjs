#!/usr/bin/env node
// Layout check for proposal HTML files: full-page screenshots, horizontal
// overflow, and touch targets under 44 px, at 360, 390 and 1280 px wide.
//
// Usage:
//   node check_pages.mjs proposal-a.html proposal-b.html [--out shots/]
// Requires `playwright` or `playwright-core` (e.g. `npm i -D playwright-core`
// in a scratch folder). Uses the browser Playwright finds, or the one in
// $CHROMIUM_PATH if set.
import { resolve, basename } from 'node:path';
import { mkdirSync } from 'node:fs';

let pw;
try { pw = await import('playwright'); } catch {
  try { pw = await import('playwright-core'); } catch {
    console.error('Install playwright or playwright-core first (npm i -D playwright-core).');
    process.exit(2);
  }
}
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const out = outIdx >= 0 ? args.splice(outIdx, 2)[1] : 'shots';
if (!args.length) { console.error('Usage: node check_pages.mjs page.html [...] [--out dir]'); process.exit(2); }
mkdirSync(out, { recursive: true });

const browser = await pw.chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let problems = 0;
for (const file of args) {
  for (const width of [360, 390, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('file://' + resolve(file));
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      // Measure what a finger actually taps: links, buttons, text fields,
      // and for radios/checkboxes the label row that wraps them.
      const targets = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea')]
        .map((el) => (['radio', 'checkbox'].includes(el.type) && el.closest('label')) || el);
      const small = [...new Set(targets)]
        .filter((el) => {
          // WCAG 2.5.8 exempts links inline in a sentence.
          if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') return false;
          const b = el.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && b.height < 44;
        })
        .slice(0, 8).map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || el.value || '').trim().slice(0, 30)}"`);
      return { overflow, small };
    });
    const shot = `${out}/${basename(file, '.html')}-${width}.png`;
    await page.screenshot({ path: shot, fullPage: true });
    const flags = [];
    if (r.overflow > 0) { flags.push(`horizontal overflow ${r.overflow}px`); problems++; }
    if (r.small.length) { flags.push(`small targets: ${r.small.join(', ')}`); problems++; }
    console.log(`${basename(file)} @${width}px  ${flags.length ? 'CHECK ' + flags.join('; ') : 'OK'}  -> ${shot}`);
    await page.close();
  }
}
await browser.close();
process.exit(problems ? 1 : 0);
