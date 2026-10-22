// Máy chủ tĩnh tối giản để xem dist/ ở http://localhost:4173
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
const port = Number(process.env.PORT) || 4173;

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\]|\.\.)+/, '');
  const file = join(dist, path === '' || path.endsWith('/') || path.endsWith('\\') ? path + 'index.html' : path);
  try {
    if (!file.startsWith(dist)) throw new Error('outside dist');
    const body = gzipSync(await readFile(file));
    const ext = extname(file);
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Content-Encoding': 'gzip',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Không tìm thấy trang');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
