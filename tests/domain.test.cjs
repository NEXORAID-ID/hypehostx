const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  H = require('../src/core/domain.js');
test('T015-T020 bounded exact firmware hints and no float normalization', () => {
  assert.equal(H.detect('Mozilla/5.0 (PlayStation 4 9.00)'), '9.00');
  for (const ua of [
    '',
    null,
    'PlayStation 4 9.1)',
    'PlayStation 4 11.2)',
    'PlayStation 4 9.000)',
    'x'.repeat(2049)
  ])
    assert.equal(H.detect(ua), null);
  assert(H.firmware('9.10'));
  assert(!H.firmware('9.1'));
  assert(H.firmware('11.02'));
  assert(!H.firmware('11.2'));
  assert(!H.firmware('<img>'));
});
test('T021-T023 T031 T034 manual conflict and rights fail closed', () => {
  const s = H.selection('9.00', '9.10');
  assert.equal(s.status, 'conflict');
  assert.equal(H.guard({ selection: s }).eligible, false);
  assert.equal(H.selection(null, '9.00').status, 'manual_only');
  assert.equal(H.selection('9.00', null).status, 'detected_hint');
  assert.equal(H.guard({ selection: H.selection('9.00', '9.00') }).eligible, false);
  assert.equal(H.transition('checking', 'firmware_changed'), 'idle');
});
test('T036-T040 unconfirmed outcomes never promoted by timers', () => {
  let s = 'idle';
  for (const e of ['request', 'accept', 'handoff', 'timeout']) s = H.transition(s, e);
  assert.equal(s, 'unconfirmed');
  assert.equal(H.transition('checking', 'reload'), 'unconfirmed');
  assert.equal(H.transition('consent_required', 'cancel'), 'idle');
  assert.equal(H.transition('checking', 'accept'), 'checking');
  assert.equal(H.transition('checking', 'success'), 'checking');
});
test('T025 T026 metadata rejects ambiguous or unsupported verification', () => {
  const records = [{ firmware: '9.00', status: 'verified', evidenceIds: [] }];
  assert.throws(() => H.validateCatalog({ schemaVersion: 1, records }));
  records[0].status = 'reference_listed';
  assert(H.validateCatalog({ schemaVersion: 1, records }));
  assert.throws(() => H.validateCatalog({ schemaVersion: 1, records: [...records, ...records] }));
  assert.throws(() => H.validateCatalog({ schemaVersion: 2, records }));
});
test('T050-T053 storage denied, corrupt preferences and namespaced reset', () => {
  const values = { unrelated: 'keep' },
    s = H.storage({
      getItem: (k) => values[k],
      setItem: (k, v) => (values[k] = v),
      removeItem: (k) => delete values[k]
    });
  s.set('preferences', 'x');
  s.remove('preferences');
  assert.equal(values.unrelated, 'keep');
  const denied = H.storage(null);
  denied.set('preferences', 'value');
  assert.equal(denied.get('preferences'), 'value');
  assert.equal(denied.persistent(), false);
  assert.deepEqual(H.preferences('{broken'), H.preferences(null));
  assert.equal(H.preferences('{"manual":"9.1","locale":"xx"}').manual, null);
});
test('T055-T059 diagnostics only allow safe codes and cap storage', () => {
  const d = H.diagnostics();
  for (let i = 0; i < 220; i++) d.record('password=secret');
  const result = JSON.parse(d.export());
  assert.equal(result.events.length, 200);
  assert.equal(result.truncated, true);
  assert(!d.export().includes('secret'));
  d.clear();
  assert.equal(JSON.parse(d.export()).events.length, 0);
});
