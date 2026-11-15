'use strict';
const fs = require('node:fs'),
  crypto = require('node:crypto'),
  assert = require('node:assert/strict');
const dir = 'dist/web',
  manifest = JSON.parse(fs.readFileSync(dir + '/integrity.json'));
assert.deepEqual(
  fs.readdirSync(dir).sort(),
  [...manifest.files.map((x) => x.path), 'integrity.json'].sort()
);
let total = 0,
  js = 0,
  css = 0;
for (const f of manifest.files) {
  const b = fs.readFileSync(dir + '/' + f.path);
  assert.equal(b.length, f.bytes);
  assert.equal(crypto.createHash('sha256').update(b).digest('hex'), f.sha256);
  total += b.length;
  if (f.path.endsWith('.js')) js += b.length;
  if (f.path.endsWith('.css')) css += b.length;
  if (/\.(js|html)$/.test(f.path))
    assert(
      !/eval\s*\(|new Function|innerHTML\s*=|document\.write|BEGIN PRIVATE KEY/.test(b.toString())
    );
}
assert(total <= 500 * 1024);
assert(js <= 100 * 1024);
assert(css <= 60 * 1024);
console.log(
  JSON.stringify({
    result: 'PASS',
    totalBytes: total,
    jsBytes: js,
    cssBytes: css,
    files: manifest.files.length
  })
);
