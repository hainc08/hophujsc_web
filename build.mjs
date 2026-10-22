// Dựng landing page song ngữ vào dist/. Không có dependency.
//   node build.mjs            -> bản xem trước, có noindex
//   node build.mjs --index    -> cho phép index (chỉ dùng khi đo Lighthouse hoặc đã duyệt lên production)
// Đầu ra: dist/index.html (vi), dist/en/index.html (en), dist/assets/site.js
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createContext, siteHeader, siteFooter, esc } from './src/components.mjs';
import * as landing from './src/pages/landing.mjs';

const allowIndex = process.argv.includes('--index');
// --base=/hophujsc_web/ khi phục vụ dưới đường dẫn con (GitHub Pages). Mặc định "/".
const baseArg = process.argv.find((a) => a.startsWith('--base='));
const BASE = baseArg ? ('/' + baseArg.slice(7).replace(/^\/+|\/+$/g, '') + '/').replace('//', '/') : '/';
const root = new URL('./', import.meta.url);
const read = (p) => readFile(new URL(p, root), 'utf8');

const site = JSON.parse(await read('src/data/site.json'));
const copy = JSON.parse(await read('src/data/copy.json'));
// CSS nhỏ (khoảng 6 KB sau nén) nên nhúng thẳng vào HTML, bỏ một request chặn hiển thị.
const css = (await Promise.all(['tokens', 'base', 'components', 'landing'].map((n) => read(`src/styles/${n}.css`)))).join('\n');
const js = await read('src/scripts/site.js');
// Mã băm trong URL để trình duyệt tải lại JS mỗi khi nội dung đổi (máy chủ cache tài nguyên 1 năm).
const jsVersion = createHash('sha256').update(js).digest('hex').slice(0, 10);

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&display=swap';
const LANGS = ['vi', 'en'];

function documentFor(lang) {
  const ctx = createContext(site, copy, lang, BASE);
  const m = landing.meta(ctx);
  const url = site.origin + m.path;
  const og = site.uploads + m.ogImage;
  const hero = site.images.hero;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<meta name="robots" content="${allowIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}">
<link rel="canonical" href="${url}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.origin + site.paths[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.origin + site.paths.vi}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${m.ogLocale}">
<meta property="og:locale:alternate" content="${lang === 'vi' ? 'en_US' : 'vi_VN'}">
<meta property="og:site_name" content="${esc(ctx.t(site.company.brand))}">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(m.title)}">
<meta name="twitter:description" content="${esc(m.description)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${site.uploads}2021/08/cropped-LOGO-32x32.jpg" sizes="32x32">
<link rel="preconnect" href="${site.origin}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="${site.uploads + hero.src}" imagesrcset="${site.uploads + hero.small} ${hero.smallWidth}w, ${site.uploads + hero.src} ${hero.width}w" imagesizes="${landing.HERO_SIZES}" fetchpriority="high">
<style>${css}</style>
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
<script type="application/ld+json">${JSON.stringify(landing.schema(ctx))}</script>
</head>
<body>
${siteHeader(ctx)}
${landing.render(ctx)}
${siteFooter(ctx)}
<script src="${BASE}assets/site.js?v=${jsVersion}" defer></script>
</body>
</html>
`;
}

await rm(new URL('dist/', root), { recursive: true, force: true });
await mkdir(new URL('dist/assets/', root), { recursive: true });
await mkdir(new URL('dist/en/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), documentFor('vi'));
await writeFile(new URL('dist/en/index.html', root), documentFor('en'));
await writeFile(new URL('dist/assets/site.js', root), js);
console.log(`Built dist/ vi + en, base ${BASE} (${allowIndex ? 'indexable' : 'noindex preview'}), css ${(css.length / 1024).toFixed(1)} KB, js ${(js.length / 1024).toFixed(1)} KB`);
