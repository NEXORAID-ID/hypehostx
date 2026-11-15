const { chromium } = require('playwright'),
  assert = require('node:assert/strict'),
  fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext(),
      page = await context.newPage(),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const email = 'qa' + Date.now() + '@example.test',
      password = 'Local-test-passphrase-123!';
    await page.goto('http://127.0.0.1:3000/#/signin');
    const register = page
      .locator('form')
      .filter({
        has: page.getByRole('heading', { name: 'Create independent account', exact: true })
      });
    await register.getByLabel('Email', { exact: true }).fill(email);
    await register.getByLabel('Password (12–128 characters)', { exact: true }).fill(password);
    await register.getByLabel('Display name', { exact: true }).fill('Local QA');
    await register.getByRole('button').click();
    await page
      .getByText(
        'If eligible, a verification message has been sent. Local development delivers it only to the private mail sink.',
        { exact: true }
      )
      .waitFor();
    const mails = fs
      .readdirSync('backend/data/mail')
      .map((f) => JSON.parse(fs.readFileSync('backend/data/mail/' + f)))
      .filter((m) => m.email === email);
    assert.equal(mails.length, 1);
    const verify = page
      .locator('form')
      .filter({ has: page.getByRole('heading', { name: 'Verify email', exact: true }) });
    await verify.getByLabel('Verification or reset token', { exact: true }).fill(mails[0].token);
    await verify.getByRole('button').click();
    await page.waitForTimeout(100);
    const login = page
      .locator('form')
      .filter({ has: page.getByRole('heading', { name: 'Sign in', exact: true }) });
    await login.getByLabel('Email', { exact: true }).fill(email);
    await login.getByLabel('Password (12–128 characters)', { exact: true }).fill(password);
    await login.getByRole('button').click();
    await page.getByRole('heading', { name: 'Profile & privacy' }).waitFor();
    for (const route of ['friends', 'chat', 'lobbies', 'saves', 'store', 'service']) {
      await page
        .getByRole('link', {
          name: {
            friends: 'Friends',
            chat: 'Chat',
            lobbies: 'Lobbies',
            saves: 'Cloud saves',
            store: 'Homebrew store',
            service: 'Service status'
          }[route],
          exact: true
        })
        .click();
      await page.locator('main h1').waitFor();
    }
    await page.getByRole('link', { name: 'Cloud saves', exact: true }).click();
    await page.getByLabel('Save slot', { exact: true }).fill('qa');
    await page.getByLabel('Own-app save content', { exact: true }).fill('Original app data');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await page.getByText('Expected revision (0 for new): 1', { exact: true }).waitFor();
    await page.getByRole('link', { name: 'Profile & privacy', exact: true }).click();
    await page.getByLabel('Display name', { exact: true }).waitFor();
    fs.mkdirSync('evidence/screenshots', { recursive: true });
    await page.screenshot({ path: 'evidence/screenshots/online-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#language').selectOption('id');
    await page.getByRole('heading', { name: 'Profil & privasi', exact: true }).waitFor();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: 'evidence/screenshots/online-mobile.png', fullPage: true });
    page.once('dialog', (d) => d.accept());
    await page.getByRole('button', { name: 'Hapus', exact: true }).click();
    await page.getByRole('heading', { name: 'Masuk', exact: true, level: 1 }).waitFor();
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      'evidence/online-browser.json',
      JSON.stringify(
        {
          result: 'PASS',
          browser: await browser.version(),
          checks: [
            'register',
            'local private mail verify',
            'sign in',
            'online routes',
            'cloud write acknowledgement',
            'locale',
            'mobile overflow',
            'account deletion'
          ],
          errors
        },
        null,
        2
      )
    );
    console.log('PASS HYPENET browser register/verify/login/cloud/delete EN/ID');
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
