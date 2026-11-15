'use strict';
const fs = require('node:fs'),
  assert = require('node:assert/strict'),
  acorn = require('acorn');
const H = require('../src/core/domain.js');
const Ajv = require('ajv');
const validate = new Ajv().compile(require('../packages/contracts/compatibility.schema.json'));
assert(validate(JSON.parse(fs.readFileSync('src/data/compatibility.json'))), JSON.stringify(validate.errors));
for (const path of ['src/core/domain.js', 'src/app.js']) {
  acorn.parse(fs.readFileSync(path, 'utf8'), { ecmaVersion: 5 });
}
const en = JSON.parse(fs.readFileSync('src/locales/en.json')),
  id = JSON.parse(fs.readFileSync('src/locales/id.json'));
assert.deepEqual(Object.keys(en).sort(), Object.keys(id).sort());
for (const value of [...Object.values(en), ...Object.values(id)])
  assert.equal(typeof value, 'string');
H.validateCatalog(JSON.parse(fs.readFileSync('src/data/compatibility.json')));
const urls = [
  'https://github.com/GoldHEN/GoldHEN',
  'https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain',
  'https://github.com/OpenOrbis/mira-project'
];
for (const c of JSON.parse(fs.readFileSync('src/data/components.json')).components) {
  assert.equal(c.distributionStatus, 'link-only');
  assert(urls.includes(c.sourceUrl));
  assert(!c.artifact);
}
console.log('PASS ES5 parsing, locale parity, compatibility validation, link-only catalog policy');
