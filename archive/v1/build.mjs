// Dựng bản xem trước tĩnh vào dist/. Không có dependency.
//   node build.mjs            -> bản xem trước, có noindex
//   node build.mjs --index    -> cho phép index (chỉ dùng khi đã duyệt lên production)
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { siteHeader, siteFooter, esc } from './src/components.mjs';
import * as home from './src/pages/home.mjs';

const allowIndex = process.argv.includes('--index');
const root = new URL('./', import.meta.url);
const read = (p) => readFile(new URL(p, root), 'utf8');

const site = JSON.parse(await read('src/data/site.json'));
// CSS đủ nhỏ (khoảng 5 KB sau nén) để nhúng thẳng vào HTML, bỏ một request chặn hiển thị.
const css = (await Promise.all(['tokens', 'base', 'components', 'home'].map((n) => read(`src/styles/${n}.css`)))).join('\n');
const js = await read('src/scripts/site.js');

const FONTS = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600&family=Be+Vietnam+Pro:wght@400;500;600&display=swap';

function document(page) {
  const { meta } = page;
  const url = site.origin + meta.path;
  const og = site.uploads + meta.ogImage;
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="${allowIndex ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}">
<link rel="canonical" href="${url}">
${Object.entries(meta.alternates).map(([lang, p]) => `<link rel="alternate" hreflang="${lang}" href="${site.origin + p}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.origin + meta.alternates.vi}">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="${esc(site.company.brand)}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#7a1508">
<link rel="icon" href="${site.uploads}2021/08/cropped-LOGO-32x32.jpg" sizes="32x32">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="${site.uploads + site.hero.image.src}" imagesrcset="${site.uploads + site.hero.image.srcSmall} 700w, ${site.uploads + site.hero.image.src} ${site.hero.image.width}w" imagesizes="${home.HERO_SIZES}" fetchpriority="high">
<style>${css}</style>
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
<script type="application/ld+json">${JSON.stringify(page.schema(site))}</script>
</head>
<body>
${siteHeader(site, { currentPath: meta.path })}
${page.render(site)}
${siteFooter(site)}
<script src="assets/site.js" defer></script>
</body>
</html>
`;
}

await rm(new URL('dist/', root), { recursive: true, force: true });
await mkdir(new URL('dist/assets/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), document(home));
await writeFile(new URL('dist/assets/site.js', root), js);
console.log(`Built dist/ (${allowIndex ? 'indexable' : 'noindex preview'}), css ${(css.length / 1024).toFixed(1)} KB, js ${(js.length / 1024).toFixed(1)} KB`);
