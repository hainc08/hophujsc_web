// Máy chủ tĩnh tối giản để xem dist/ ở http://localhost:4173 (không chạy PHP, không đọc .htaccess).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
const port = Number(process.env.PORT) || 4173;

async function resolve(pathname) {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^([/\\]|\.\.)+/, '');
  let file = join(dist, rel);
  if (!file.startsWith(dist)) return null;
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolve(new URL(req.url, 'http://x').pathname);
  const status = file ? 200 : 404;
  const target = file || join(dist, '404.html');
  try {
    const ext = extname(target);
    const raw = await readFile(target);
    const compress = /^(text|application)\//.test(types[ext] || '');
    res.writeHead(status, {
      'Content-Type': types[ext] || 'application/octet-stream',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
      // JS có mã phiên bản trong URL nên cache lâu; HTML luôn kiểm tra lại.
      'Cache-Control': ext === '.html' ? 'no-cache' : ext === '.js' ? 'public, max-age=31536000, immutable' : 'public, max-age=86400',
    });
    res.end(compress ? gzipSync(raw) : raw);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Không tìm thấy trang');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
