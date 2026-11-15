const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  fs = require('node:fs'),
  { execFileSync } = require('node:child_process');
test('T065 repeat builds produce byte-identical manifest', () => {
  execFileSync(process.execPath, ['tools/build.cjs']);
  const first = fs.readFileSync('dist/web/integrity.json', 'utf8');
  execFileSync(process.execPath, ['tools/build.cjs']);
  assert.equal(fs.readFileSync('dist/web/integrity.json', 'utf8'), first);
  execFileSync(process.execPath, ['tools/verify.cjs']);
});
