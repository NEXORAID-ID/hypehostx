'use strict';
const http = require('node:http'),
  fs = require('node:fs'),
  path = require('node:path');
const root = path.resolve('dist/web'),
  types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
  };
function createServer() {
  return http.createServer((req, res) => {
    let url;
    try {
      url = new URL(req.url, 'http://localhost');
    } catch {
      return res.writeHead(400).end();
    }
    if (!url.pathname.startsWith('/hypehostx/')) return res.writeHead(404).end();
    let relative;
    try {
      relative = decodeURIComponent(url.pathname.slice(11)) || 'index.html';
    } catch {
      return res.writeHead(400).end();
    }
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile())
      return res.writeHead(404).end();
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    fs.createReadStream(file).pipe(res);
  });
}
module.exports = { createServer };
if (require.main === module)
  createServer().listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173/hypehostx/'));
