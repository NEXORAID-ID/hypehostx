import { randomBytes, createHash, scrypt, timingSafeEqual } from 'node:crypto';
export const token = () => randomBytes(32).toString('hex');
export const digest = (s: string) => createHash('sha256').update(s).digest('hex');
function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  );
}
export async function passwordHash(password: string) {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + (await derive(password, salt)).toString('hex');
}
export async function passwordMatches(password: string, encoded: string) {
  const [salt, hash] = encoded.split(':');
  if (!salt || !hash) return false;
  const key = await derive(password, salt),
    stored = Buffer.from(hash, 'hex');
  return key.length === stored.length && timingSafeEqual(key, stored);
}
