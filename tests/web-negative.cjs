const { chromium, webkit } = require('playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  { createServer } = require('../tools/serve.cjs');
const engineName = process.argv[2] || 'chromium',
  engines = { chromium, webkit },
  engine = engines[engineName];
if (!engine) throw new Error(`Unsupported browser engine: ${engineName}`);
(async () => {
  const server = createServer();
  await new Promise((r) => server.listen(4173, '127.0.0.1', r));
  let browser;
  const passed = [];
  try {
    browser = await engine.launch();
    async function scenario(name, setup, check) {
      const context = await browser.newContext();
      try {
        await setup(context);
        const page = await context.newPage();
        await page.goto('http://127.0.0.1:4173/hypehostx/');
        await check(page);
        passed.push(name);
      } finally {
        await context.close();
      }
    }
    await scenario(
      'T003 missing required script fallback',
      async (c) => c.route('**/data.js', (r) => r.abort()),
      async (p) => {
        await p.getByText(/HX-4001:/).waitFor();
        await p.getByText(/Reload from a reviewed host/).waitFor();
      }
    );
    await scenario(
      'T041 T069 absent cache APIs',
      async (c) =>
        c.addInitScript(() => {
          Object.defineProperty(navigator, 'serviceWorker', { value: undefined });
          Object.defineProperty(window, 'caches', { value: undefined });
        }),
      async (p) => {
        await p.getByRole('link', { name: 'HYPECACHE', exact: true }).click();
        await p
          .getByText('HX-3003: Offline API unavailable; online mode only.', { exact: true })
          .waitFor();
        assert.equal(await p.getByRole('button', { name: 'Prepare offline host' }).count(), 0);
      }
    );
    await scenario(
      'T050 denied localStorage keeps session settings',
      async (c) =>
        c.addInitScript(() =>
          Object.defineProperty(window, 'localStorage', {
            get() {
              throw new Error('denied');
            }
          })
        ),
      async (p) => {
        await p.getByRole('link', { name: 'Settings', exact: true }).click();
        await p.locator('#locale').selectOption('id');
        await p.getByRole('heading', { name: 'Pengaturan', exact: true }).waitFor();
        await p
          .getByText('HX-4003: Penyimpanan tidak tersedia; pengaturan hanya untuk sesi ini.', {
            exact: true
          })
          .waitFor();
      }
    );
    await scenario(
      'T005 T007 invalid route and browser back',
      async () => {},
      async (p) => {
        await p.goto('http://127.0.0.1:4173/hypehostx/#/missing');
        await p.getByRole('heading', { name: 'HX-5002: Page not found' }).waitFor();
        await p.getByRole('link', { name: 'Return to dashboard' }).click();
        await p.getByRole('heading', { name: 'Dashboard', exact: true }).waitFor();
        await p.goBack();
        await p.getByRole('heading', { name: 'HX-5002: Page not found' }).waitFor();
      }
    );
    await scenario(
      'T011 T053 confirmed scoped reset and focus restoration',
      async (c) =>
        c.addInitScript(() => {
          localStorage.setItem('unrelated', 'keep');
          localStorage.setItem('hypehostx:v1:preferences', '{"locale":"en","manual":"9.00"}');
        }),
      async (p) => {
        await p.getByRole('link', { name: 'HYPERECOVERY', exact: true }).click();
        p.once('dialog', (d) => d.dismiss());
        await p.getByRole('button', { name: 'Reset host preferences' }).click();
        assert(
          (await p.evaluate(() => localStorage.getItem('hypehostx:v1:preferences'))).includes(
            '9.00'
          )
        );
        p.once('dialog', (d) => d.accept());
        await p.getByRole('button', { name: 'Reset host preferences' }).click();
        assert.equal(await p.evaluate(() => localStorage.getItem('unrelated')), 'keep');
        assert.equal(
          await p.evaluate(() => localStorage.getItem('hypehostx:v1:preferences')),
          null
        );
        assert.equal(await p.evaluate(() => document.activeElement.id), 'reset-preferences');
      }
    );
    await scenario(
      'HX-029 documentation favorites persist and empty filters',
      async () => {},
      async (p) => {
        await p.getByRole('link', { name: 'HYPEPAYLOAD', exact: true }).click();
        const card = p
          .locator('section')
          .filter({ has: p.getByRole('heading', { name: 'GoldHEN', exact: true }) });
        await card.getByRole('button', { name: 'Add favorite' }).click();
        await p.reload();
        await p.getByLabel('Favorites only').check();
        assert.equal(await p.locator('main section').count(), 1);
        await p.getByLabel('Search documentation').fill('not-a-source');
        await p.getByText('No matching documentation.', { exact: true }).waitFor();
      }
    );
    const stylesFile = path.resolve('dist/web/styles.css'),
      originalStyles = fs.readFileSync(stylesFile);
    try {
      fs.writeFileSync(stylesFile, 'body {color: white}');
      await scenario(
        'T032 service-worker refuses tampered shell assets',
        async () => {},
        async (p) => {
          await p.getByRole('link', { name: 'HYPECACHE', exact: true }).click();
          await p.getByRole('button', { name: 'Prepare offline host' }).click();
          await p
            .getByText(
              'HX-3001: Cache preparation or verification failed. Retry with connectivity.',
              { exact: true }
            )
            .waitFor({ timeout: 15000 });
        }
      );
    } finally {
      fs.writeFileSync(stylesFile, originalStyles);
    }
    fs.writeFileSync(
      engineName === 'chromium'
        ? 'evidence/web-negative.json'
        : 'evidence/web-negative-' + engineName + '.json',
      JSON.stringify(
        { result: 'PASS', engine: engineName, browser: await browser.version(), checks: passed },
        null,
        2
      )
    );
    console.log('PASS ' + engineName + ' ' + passed.length + ' browser denial/recovery scenarios');
  } finally {
    if (browser) await browser.close();
    await new Promise((r) => server.close(r));
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
