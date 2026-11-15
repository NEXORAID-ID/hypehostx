'use strict';
const { verify, createHash } = require('node:crypto');
function parseVerifiedRelease(envelope, publicKey, { now = Date.now(), minimumSequence = 0 } = {}) {
  if (
    !envelope ||
    Object.keys(envelope).sort().join(',') !== 'payload,signature' ||
    typeof envelope.payload !== 'string' ||
    typeof envelope.signature !== 'string' ||
    envelope.payload.length > 65536
  )
    throw new Error('INVALID_ENVELOPE');
  const bytes = Buffer.from(envelope.payload, 'base64');
  if (!verify(null, bytes, publicKey, Buffer.from(envelope.signature, 'base64')))
    throw new Error('INVALID_SIGNATURE');
  const m = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  if (
    m.schemaVersion !== 1 ||
    !Number.isSafeInteger(m.sequence) ||
    m.sequence <= minimumSequence ||
    !Number.isFinite(Date.parse(m.expiresAt)) ||
    Date.parse(m.expiresAt) <= now ||
    Date.parse(m.createdAt) > now ||
    !Number.isFinite(Date.parse(m.createdAt))
  )
    throw new Error('STALE_MANIFEST');
  if (
    !/^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/.test(m.version) ||
    !Array.isArray(m.artifacts) ||
    m.artifacts.length > 32
  )
    throw new Error('INVALID_MANIFEST');
  const seen = new Set();
  for (const f of m.artifacts) {
    if (
      !f ||
      !/^[-a-zA-Z0-9_]+\.(zip|json|exe|tar)$/.test(f.path) ||
      seen.has(f.path) ||
      !/^[a-f0-9]{64}$/.test(f.sha256) ||
      !Number.isSafeInteger(f.bytes) ||
      f.bytes < 0 ||
      f.bytes > 100 * 1024 * 1024 ||
      f.approval !== 'approved'
    )
      throw new Error('INVALID_ARTIFACT');
    seen.add(f.path);
  }
  return m;
}
function verifyArtifact(bytes, artifact) {
  return (
    bytes.length === artifact.bytes &&
    createHash('sha256').update(bytes).digest('hex') === artifact.sha256
  );
}
module.exports = { parseVerifiedRelease, verifyArtifact };
