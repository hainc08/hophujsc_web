// Dựng website tĩnh vào dist/. Không có dependency.
//
//   node build.mjs                      local: xem ở máy (node serve.mjs), noindex
//   node build.mjs --target=pages       GitHub Pages: base /<tên repo>/, noindex, không PHP/.htaccess
//   node build.mjs --target=review      Hostinger cho khách duyệt: .htaccess + PHP form, noindex, chặn robots
//   node build.mjs --target=production  Hosting thật của hopphujsc.com: cho phép index, sitemap, HTTPS + bỏ www
//
// Tuỳ chọn: --base=<đường dẫn con> (ghi đè base), --index (cho phép index, dùng khi đo Lighthouse).
// Trên Git Bash/Windows viết --base=hophujsc_web (không có "/" đầu) để shell không tự đổi đường dẫn.
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createContext, siteHeader, siteFooter, esc, resolveImage } from './src/components.mjs';
import * as landing from './src/pages/landing.mjs';
import { catalogPage, categoryPages, postPages, listPages, companyPages, notFoundPage } from './src/pages/content.mjs';

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const TARGETS = {
  local: { base: '/', index: false, server: false },
  pages: { base: '/hophujsc_web/', index: false, server: false },
  review: { base: '/', index: false, server: true },
  production: { base: '/', index: true, server: true },
};
const targetName = arg('target') || 'local';
const target = TARGETS[targetName];
if (!target) throw new Error(`--target không hợp lệ: ${targetName}. Chọn: ${Object.keys(TARGETS).join(', ')}`);
const normBase = (b) => ('/' + b.replace(/^\/+|\/+$/g, '') + '/').replace('//', '/');
const BASE = arg('base') ? normBase(arg('base')) : target.base;
const INDEX = target.index || process.argv.includes('--index');
const ENDPOINT = target.server ? `${BASE}api/quote.php` : '';

const root = new URL('./', import.meta.url);
const read = (p) => readFile(new URL(p, root), 'utf8');
const json = async (p) => JSON.parse(await read(p));
const out = (p) => new URL(`dist/${p}`, root);

const [site, copy, pages, posts, images, redirects] = await Promise.all(
  ['src/data/site.json', 'src/data/copy.json', 'src/content/pages.json', 'src/content/posts.json', 'src/data/images.json', 'src/data/redirects.json'].map(json),
);
// CSS nhỏ (khoảng 8 KB sau nén) nên nhúng thẳng vào HTML, bỏ một request chặn hiển thị.
const css = (await Promise.all(['tokens', 'base', 'components', 'landing', 'content', 'home'].map((n) => read(`src/styles/${n}.css`)))).join('\n');
const js = await read('src/scripts/site.js');
// Mã băm trong URL để trình duyệt tải lại JS mỗi khi nội dung đổi (máy chủ cache tài nguyên lâu).
const jsVersion = createHash('sha256').update(js).digest('hex').slice(0, 10);

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&display=swap';
const data = { site, copy, pages, posts, images };
const ctxFor = (lang) => createContext({ site, copy, pages, images, lang, base: BASE, endpoint: ENDPOINT });

// ---------- Danh sách trang ----------
const landingPage = (lang) => ({ lang, path: site.paths[lang], landing: true });
const allPages = [
  landingPage('vi'),
  landingPage('en'),
  catalogPage(data),
  ...categoryPages(data),
  ...postPages(data),
  ...listPages(data),
  ...companyPages(data),
  notFoundPage(data),
];

function documentFor(page) {
  const ctx = ctxFor(page.lang);
  const m = page.landing ? landing.meta(ctx) : page.meta;
  const url = ctx.abs(page.path);
  const ogFile = m.ogImage.endsWith('.jpg') && !m.ogImage.includes('/') ? m.ogImage : resolveImage(ctx, m.ogImage).large.file;
  const og = ctx.abs('/assets/img/' + ogFile);
  const schema = page.landing ? landing.schema(ctx) : { '@context': 'https://schema.org', '@graph': page.schema(ctx) };
  const noindex = !INDEX || m.noindex;
  const hero = page.landing ? resolveImage(ctx, site.images.hero.src) : null;
  const alternates = page.landing
    ? `${['vi', 'en'].map((l) => `<link rel="alternate" hreflang="${l}" href="${ctx.abs(site.paths[l])}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${ctx.abs(site.paths.vi)}">`
    : '';
  const body = page.landing ? landing.render(ctx) : page.body(ctx);
  return `<!doctype html>
<html lang="${page.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
${m.noindex ? '' : `<link rel="canonical" href="${url}">`}
${alternates}
<meta property="og:type" content="${m.type || 'website'}">
<meta property="og:locale" content="${page.lang === 'vi' ? 'vi_VN' : 'en_US'}">
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
<link rel="icon" href="${ctx.href('/assets/img/cropped-logo-32x32.jpg')}" sizes="32x32">
<link rel="apple-touch-icon" href="${ctx.href('/assets/img/cropped-logo-192x192.jpg')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${hero ? `<link rel="preload" as="image" href="${ctx.asset(hero.large.file)}" imagesrcset="${ctx.asset(hero.small.file)} ${hero.small.width}w, ${ctx.asset(hero.large.file)} ${hero.large.width}w" imagesizes="${landing.HERO_SIZES}" fetchpriority="high">` : ''}
<style>${css}</style>
<link rel="stylesheet" href="${FONTS}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS}"></noscript>
${schema['@graph'].length ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
</head>
<body>
${siteHeader(ctx)}
${body}
${siteFooter(ctx)}
<script src="${BASE}assets/site.js?v=${jsVersion}" defer></script>
</body>
</html>
`.replace(/\n{2,}/g, '\n');
}

// ---------- .htaccess (Apache/LiteSpeed: Hostinger và Hawk Host) ----------
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\ ');
function htaccess() {
  const prod = targetName === 'production';
  const exact = redirects.exact.map(([from, to]) => {
    const pat = '^' + reEsc(from.replace(/^\//, '').replace(/\/$/, '')) + '/?$';
    return to === 410 ? `RewriteRule ${pat} - [G,L]` : `RewriteRule ${pat} ${to} [R=301,L,NE]`;
  });
  return `# Sinh tự động bởi build.mjs (--target=${targetName}). Không sửa tay: sửa src/data/redirects.json rồi build lại.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 ${BASE}404.html
AddDefaultCharset utf-8

# Chặn truy cập file cấu hình và dữ liệu
<FilesMatch "^(config\\.php|config\\.example\\.php|.*\\.(csv|json|md|mjs|sh))$">
  Require all denied
</FilesMatch>

<IfModule mod_rewrite.c>
RewriteEngine On
${prod ? `# HTTPS và tên miền chính không có www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^ https://hopphujsc.com%{REQUEST_URI} [L,R=301]` : `# HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`}

# URL cũ của WordPress: nội dung thật giữ nguyên URL; phần còn lại chuyển hướng 301 hoặc báo 410.
${exact.join('\n')}

# Quy tắc chung (bỏ qua file và thư mục có thật)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/page/[0-9]+/?$ /$1/ [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*/)?feed/?$ /$1 [R=301,L]
RewriteRule ^(${redirects.gonePatterns.map((p) => p.replace(/^\^/, '')).join('|')}) - [G,L]
RewriteCond %{QUERY_STRING} (^|&)s= [NC]
RewriteRule ^$ /? [R=301,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^en/.+ /en/ [R=301,L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
${prod ? '  Header always set Strict-Transport-Security "max-age=31536000"\n' : '  Header always set X-Robots-Tag "noindex, nofollow"\n'}  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
  <FilesMatch "\\.js$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(webp|jpg|png)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml application/xml text/plain
</IfModule>
`;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const byUrl = Object.fromEntries(posts.map((p) => [p.url, p.modified]));
  const urls = allPages.filter((p) => !p.file).map((p) => `  <url><loc>${site.origin + p.path}</loc><lastmod>${byUrl[p.path] || today}</lastmod></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const robots = INDEX ? `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n';

// ---------- Ghi file ----------
await rm(new URL('dist/', root), { recursive: true, force: true });
await mkdir(out('assets/'), { recursive: true });
for (const page of allPages) {
  const file = page.file || (page.path.replace(/^\//, '') + 'index.html');
  await mkdir(new URL('.', out(file)), { recursive: true });
  await writeFile(out(file), documentFor(page));
}
await writeFile(out('assets/site.js'), js);
await cp(new URL('assets/img/', root), out('assets/img/'), { recursive: true });
await writeFile(out('robots.txt'), robots);
await writeFile(out('sitemap.xml'), sitemap());
if (target.server) {
  await writeFile(out('.htaccess'), htaccess());
  await mkdir(out('api/'), { recursive: true });
  await cp(new URL('api/quote.php', root), out('api/quote.php'));
  await cp(new URL('api/config.example.php', root), out('api/config.example.php'));
}
console.log(
  `Built dist/ target=${targetName} base=${BASE} ${INDEX ? 'indexable' : 'noindex'} | ${allPages.length} trang | form ${ENDPOINT || 'tắt'} | css ${(css.length / 1024).toFixed(1)} KB, js ${(js.length / 1024).toFixed(1)} KB`,
);
