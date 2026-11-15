const { chromium } = require('playwright'),
  { default: AxeBuilder } = require('@axe-core/playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  { createServer } = require('../tools/serve.cjs');
(async () => {
  const server = createServer();
  await new Promise((r) => server.listen(4173, '127.0.0.1', r));
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    const results = [];
    for (const route of ['', 'firmware', 'payloads', 'settings', 'diagnostics', 'recovery']) {
      await page.goto('http://127.0.0.1:4173/hypehostx/#/' + route);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      results.push({ route, violations: result.violations });
    }
    fs.writeFileSync('evidence/accessibility.json', JSON.stringify(results, null, 2));
    assert.deepEqual(
      results.flatMap((r) => r.violations),
      []
    );
    console.log('PASS automated WCAG checks on six routes; physical controller not tested');
  } finally {
    if (browser) await browser.close();
    await new Promise((r) => server.close(r));
  }
})().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
