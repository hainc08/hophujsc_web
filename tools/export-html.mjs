// Xuất bản HTML/CSS/JS thuần vào thư mục html/: không cần Node hay máy chủ để xem.
//
//   node tools/export-html.mjs
//
// Kết quả:
//   html/index.html, html/en/index.html, html/404.html
//   html/assets/css/style.css   (CSS tách khỏi HTML)
//   html/assets/js/main.js
//   html/assets/img/            (chỉ ảnh đang dùng)
//   html/api/quote.php          (form báo giá, cần hosting có PHP)
//   html/.htaccess, robots.txt, sitemap.xml
// Mọi đường dẫn là tương đối, nên mở thẳng html/index.html bằng trình duyệt cũng chạy.
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, rm, cp, readdir, rename } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'html');

// 1. Build bản có form PHP (giống bản đưa lên Hostinger)
execFileSync(process.execPath, [join(ROOT, 'build.mjs'), '--target=review'], { stdio: 'inherit' });

// 2. Chép sang html/
await rm(OUT, { recursive: true, force: true });
await cp(DIST, OUT, { recursive: true });
await mkdir(join(OUT, 'assets/css'), { recursive: true });
await mkdir(join(OUT, 'assets/js'), { recursive: true });
await rename(join(OUT, 'assets/site.js'), join(OUT, 'assets/js/main.js'));
await rm(join(OUT, 'api/config.example.php'), { force: true }).catch(() => {});

// 3. Từng trang: tách CSS ra file riêng, đổi đường dẫn tuyệt đối thành tương đối
const pages = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'assets') await walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
};
await walk(OUT);

let css = '';
for (const file of pages) {
  let html = await readFile(file, 'utf8');
  const rel = relative(dirname(file), OUT).replace(/\\/g, '/');
  const up = rel ? `${rel}/` : '';
  const style = html.match(/<style>([\s\S]*?)<\/style>/);
  if (style) {
    css = style[1];
    html = html.replace(style[0], `<link rel="stylesheet" href="${up}assets/css/style.css">`);
  }
  html = html
    .replace(/(["' ,])\/assets\/site\.js\?v=[\w]+/g, `$1${up}assets/js/main.js`)
    .replace(/(["' ,])\/assets\//g, `$1${up}assets/`)
    .replace(/(["' ,])\/api\//g, `$1${up}api/`)
    .replace(/href="\/en\/(#[\w-]*)?"/g, (_, hash = '') => `href="${up}en/index.html${hash}"`)
    .replace(/href="\/(#[\w-]*)?"/g, (_, hash = '') => `href="${up}index.html${hash}"`);
  await writeFile(file, html);
}
await writeFile(join(OUT, 'assets/css/style.css'), css.trim() + '\n');

// 4. Hướng dẫn ngắn
await writeFile(join(OUT, 'README.md'), `# Hợp Phú: bản HTML/CSS/JS thuần

Sinh tự động từ repo bằng \`node tools/export-html.mjs\`. Nếu sửa trực tiếp các file ở đây, lần xuất sau sẽ ghi đè.

| File | Nội dung |
|---|---|
| \`index.html\` | Landing page tiếng Việt |
| \`en/index.html\` | Landing page tiếng Anh |
| \`404.html\` | Trang không tìm thấy |
| \`assets/css/style.css\` | Toàn bộ giao diện |
| \`assets/js/main.js\` | Menu, modal sản phẩm, hiệu ứng, form |
| \`assets/img/\` | Ảnh WebP đã tối ưu |
| \`api/quote.php\` | Nhận form báo giá (cần hosting có PHP và file \`api/config.php\` trên máy chủ) |
| \`.htaccess\` | HTTPS, chuyển URL cũ về trang chủ, cache (Apache/LiteSpeed) |

- Xem thử: mở \`index.html\` bằng trình duyệt. Form chỉ gửi được khi chạy trên hosting có PHP.
- Đưa lên hosting: chép toàn bộ thư mục này vào \`public_html\`.
- Font Be Vietnam Pro và bản đồ tải từ Google, cần có mạng.
`);

console.log(`Đã xuất ${pages.length} trang vào html/ | style.css ${(css.length / 1024).toFixed(1)} KB`);
