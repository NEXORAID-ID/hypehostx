'use strict';
require('./validate.cjs');
const fs = require('node:fs'),
  crypto = require('node:crypto'),
  path = require('node:path');
const out = 'dist/web';
fs.mkdirSync(out, { recursive: true });
const inputs = {
  'index.html': 'src/index.html',
  'styles.css': 'src/styles.css',
  'domain.js': 'src/core/domain.js',
  'app.js': 'src/app.js',
  'release.json': 'src/data/release.json'
};
for (const [name, source] of Object.entries(inputs)) fs.copyFileSync(source, path.join(out, name));
fs.copyFileSync('src/index.html', out + '/404.html');
const assets = [
  'index.html',
  '404.html',
  'styles.css',
  'domain.js',
  'app.js',
  'data.js',
  'release.json'
];
const hash = crypto.createHash('sha256');
for (const source of [
  ...Object.values(inputs),
  'src/locales/en.json',
  'src/locales/id.json',
  'src/data/compatibility.json',
  'src/data/components.json'
])
  hash.update(fs.readFileSync(source));
const cacheName = 'hypehostx-' + hash.digest('hex').slice(0, 20);
const read = (p) => JSON.parse(fs.readFileSync(p));
fs.writeFileSync(
  out + '/data.js',
  'window.HX_DATA = ' +
    JSON.stringify({
      cacheName,
      assets,
      locales: { en: read('src/locales/en.json'), id: read('src/locales/id.json') },
      catalog: read('src/data/compatibility.json'),
      components: read('src/data/components.json').components
    }) +
    ';\n'
);
const inventory = assets.map((name) => {
  const b = fs.readFileSync(out + '/' + name);
  return {
    path: name,
    bytes: b.length,
    sha256: crypto.createHash('sha256').update(b).digest('hex')
  };
});
const sw = `'use strict';
const CACHE=${JSON.stringify(cacheName)}, FILES=${JSON.stringify(inventory)};
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const responses=[];
  for(const file of FILES){
    const response=await fetch(new URL(file.path,self.registration.scope),{cache:'no-store'});
    if(!response.ok)throw new Error('HX-3001');
    const buffer=await response.clone().arrayBuffer();
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',buffer))).map(x=>x.toString(16).padStart(2,'0')).join('');
    if(buffer.byteLength!==file.bytes||digest!==file.sha256)throw new Error('HX-2002');
    responses.push(response);
  }
  const cache=await caches.open(CACHE);
  for(let i=0;i<FILES.length;i++)await cache.put(new URL(FILES[i].path,self.registration.scope),responses[i]);
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(event.request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  const relative=url.pathname.slice(scope.pathname.length)||'index.html';
  if(!FILES.some(f=>f.path===relative))return;
  event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL(relative,self.registration.scope))).then(r=>r||fetch(event.request)));
});
`;
fs.writeFileSync(out + '/sw.js', sw);
inventory.push({
  path: 'sw.js',
  bytes: Buffer.byteLength(sw),
  sha256: crypto.createHash('sha256').update(sw).digest('hex')
});
fs.writeFileSync(
  out + '/integrity.json',
  JSON.stringify({ schemaVersion: 1, cacheName, files: inventory }, null, 2) + '\n'
);
console.log('Built ' + out + ' ' + cacheName);
