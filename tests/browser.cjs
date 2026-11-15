const { chromium, webkit } = require('playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  { createServer } = require('../tools/serve.cjs');
const engineName = process.argv[2] || 'chromium',
  engines = { chromium, webkit },
  engine = engines[engineName];
if (!engine) throw new Error(`Unsupported browser engine: ${engineName}`);
(async () => {
  const server = createServer();
  await new Promise((r) => server.listen(4173, '127.0.0.1', r));
  const browser = await engine.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }),
      page = await context.newPage(),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://127.0.0.1:4173/hypehostx/');
    await page.getByRole('heading', { name: 'Dashboard', exact: true }).waitFor();
    const routes = [
      '',
      'hypehen',
      'firmware',
      'compatibility',
      'payloads',
      'offline',
      'system',
      'diagnostics',
      'recovery',
      'settings',
      'updates',
      'guide',
      'changelog',
      'credits',
      'about'
    ];
    for (const route of routes) {
      await page.goto('http://127.0.0.1:4173/hypehostx/#/' + route);
      assert(await page.locator('main h1').textContent());
    }
    await page.goto('http://127.0.0.1:4173/hypehostx/#/firmware');
    await page.locator('#firmware').fill('9.10');
    await page.getByRole('button', { name: 'Save selection' }).click();
    await page.getByText('Manually selected; not device-verified', { exact: true }).waitFor();
    await page.goto('http://127.0.0.1:4173/hypehostx/#/settings');
    await page.locator('#locale').selectOption('id');
    await page.getByRole('heading', { name: 'Pengaturan', exact: true }).waitFor();
    await page.reload();
    await page.getByRole('heading', { name: 'Pengaturan', exact: true }).waitFor();
    await page.locator('#locale').selectOption('en');
    await page.goto('http://127.0.0.1:4173/hypehostx/#/offline');
    await page.getByRole('button', { name: 'Prepare offline host' }).click();
    await page
      .getByText(
        'Shell files are present in browser cache. Offline device testing is still required.',
        { exact: true }
      )
      .waitFor({ timeout: 20000 });
    await context.setOffline(true);
    await page.reload();
    await page.getByRole('heading', { name: 'HYPECACHE', exact: true }).waitFor();
    await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
    await page.getByRole('heading', { name: 'Dashboard', exact: true }).waitFor();
    fs.mkdirSync('evidence/screenshots', { recursive: true });
    await page.screenshot({
      path: `evidence/screenshots/desktop-${engineName}.png`,
      fullPage: true
    });
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    await page.screenshot({
      path: `evidence/screenshots/mobile-${engineName}.png`,
      fullPage: true
    });
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      engineName === 'chromium'
        ? 'evidence/browser.json'
        : 'evidence/browser-' + engineName + '.json',
      JSON.stringify(
        {
          engine: engineName,
          browser: await browser.version(),
          viewport: [1440, 1000, 390, 844],
          checks: [
            '15 routes',
            'manual firmware',
            'locale persistence',
            'service worker preparation',
            'actual offline reload',
            'offline navigation',
            'mobile overflow',
            'no page exceptions'
          ],
          errors
        },
        null,
        2
      )
    );
    console.log(
      `PASS ${engineName} routes, preferences, cache, offline reopen, responsive width, console`
    );
  } finally {
    await browser.close();
    await new Promise((r) => server.close(r));
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
