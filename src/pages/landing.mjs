// Trang chủ v3 (concept "Broadsheet" của chủ dự án, 2026-10-24): in tách màu CMYK trên nền giấy.
// Nội dung: copy.v3 (song ngữ). Ảnh và 9 dòng sản phẩm: site.v3. Hành vi: src/scripts/site.js (mục v3).
import { esc, image, categoryHref, quoteForm, resolveImage } from '../components.mjs';

// Bề rộng hiển thị thật của ảnh hero, để trình duyệt chọn đúng bản 720w trên mobile.
export const HERO_SIZES = '(min-width: 64rem) 44vw, 100vw';

export const meta = (ctx) => ({
  path: ctx.site.paths[ctx.lang],
  title: ctx.t(ctx.copy.meta.title),
  description: ctx.t(ctx.copy.meta.description),
  ogLocale: ctx.t(ctx.copy.meta.ogLocale),
  ogImage: 'og-hopphu.jpg',
  alternates: true,
});

/** JSON-LD chỉ chứa dữ liệu có thật. Không Product, LocalBusiness, đánh giá hay giá. */
export function schema(ctx) {
  const { site, t, lang } = ctx;
  const c = site.company;
  const org = `${site.origin}/#organization`;
  const page = site.origin + site.paths[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: c.legalName.vi,
        alternateName: [c.legalName.en, c.brand.vi],
        url: `${site.origin}/`,
        logo: { '@type': 'ImageObject', url: ctx.abs('/assets/img/' + resolveImage(ctx, site.images.logo.src).large.file) },
        ...(c.email ? { email: c.email.value } : {}),
        telephone: c.phone.tel,
        sameAs: [c.facebook],
        contactPoint: { '@type': 'ContactPoint', telephone: c.phone.tel, contactType: 'sales', availableLanguage: ['vi', 'en'] },
      },
      { '@type': 'WebSite', '@id': `${site.origin}/#website`, url: `${site.origin}/`, name: t(c.brand), inLanguage: lang, publisher: { '@id': org } },
      { '@type': 'WebPage', '@id': `${page}#webpage`, url: page, name: t(ctx.copy.meta.title), description: t(ctx.copy.meta.description), inLanguage: lang, isPartOf: { '@id': `${site.origin}/#website` }, about: { '@id': org } },
    ],
  };
}

const pad = (i) => String(i + 1).padStart(2, '0');

/**
 * Chữ in tách màu: chữ thật màu mực đen (đọc một lần, đạt tương phản); hai bản mực M và Y là
 * nội dung CSS (::before/::after) lấy từ data-text, có alt rỗng, nên không lặp chữ trong HTML,
 * với công cụ tìm kiếm hay trình đọc màn hình. Bản C trùng vị trí chữ đen nên không cần vẽ.
 */
function plates(text, className = '') {
  const t = esc(text);
  return `<span class="plates${className ? ` ${className}` : ''}" data-text="${t}">${t}</span>`;
}

/**
 * Ảnh in tách màu: bản in (tính sẵn khi build) hiển thị mặc định; rê chuột hoặc focus thì
 * ảnh gốc hiện dần lên trên ("các bản in khớp lại"). Ảnh gốc chỉ tải khi người dùng rê chuột lần đầu.
 */
function printFigure(ctx, key, alt, { sizes, priority = false, ratio, className = '' }) {
  const ink = resolveImage(ctx, `${key}-in`);
  const photo = resolveImage(ctx, key);
  const srcset = (m) => `${ctx.asset(m.small.file)} ${m.small.width}w, ${ctx.asset(m.large.file)} ${m.large.width}w`;
  const load = priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<figure class="print${className ? ` ${className}` : ''}" style="--ratio: ${ratio}" data-print>
        <img class="print__ink" src="${ctx.asset(ink.large.file)}" srcset="${srcset(ink)}" sizes="${sizes}" width="${ink.large.width}" height="${ink.large.height}" alt="${esc(alt)}" ${load}>
        <img class="print__photo" data-src="${ctx.asset(photo.large.file)}" data-srcset="${srcset(photo)}" sizes="${sizes}" width="${photo.large.width}" height="${photo.large.height}" alt="" aria-hidden="true" decoding="async">
      </figure>`;
}

/** Ảnh có lưới chấm halftone (ảnh giá trị, ban lãnh đạo, sản phẩm). */
function halftone(ctx, key, alt, { sizes, ratio }) {
  return `<span class="halftone" style="--ratio: ${ratio}">${image(ctx, { src: key, alt: { vi: alt, en: alt } }, { sizes })}</span>`;
}

const kicker = (text) => `<p class="kicker">${esc(text)}</p>`;

const icon = {
  arrow: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  pin: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};

/** Liên kết của một dòng sản phẩm: trang danh mục nếu có, trang dịch vụ, hoặc form báo giá chọn sẵn. */
function lineHref(ctx, line) {
  const cat = line.cat && ctx.site.categories.find((c) => c.id === line.cat);
  if (cat) return categoryHref(ctx, cat);
  if (line.link && ctx.lang === 'vi') return ctx.url(line.link);
  return `#bao-gia`;
}

function lineCard(ctx, line, i) {
  const { t, copy } = ctx;
  const P = copy.v3.products;
  const material = line.material ? (ctx.lang === 'en' && line.materialEn ? line.materialEn : line.material) : t(P.madeToOrder);
  const media = line.image
    ? halftone(ctx, line.image, t(line.name), { sizes: '(min-width: 64rem) 28vw, 45vw', ratio: '1' })
    : `<span class="halftone halftone--empty" style="--ratio: 1"><span>${esc(t(P.pending))}</span></span>`;
  return `<li>
        <a class="line" href="${esc(lineHref(ctx, line))}" data-line-open="line-${line.id}" aria-haspopup="dialog">
          ${media}
          <span class="line__head"><span class="line__no">${pad(i)}</span><span class="line__name">${esc(t(line.name))}</span>${icon.arrow}</span>
          <span class="line__material">${esc(material)}</span>
        </a>
      </li>`;
}

function lineDialog(ctx, line, i, total) {
  const { t, copy, lang } = ctx;
  const P = copy.v3.products;
  const material = line.material ? (lang === 'en' && line.materialEn ? line.materialEn : line.material) : t(P.madeToOrder);
  const sizes = lang === 'en' ? line.sizesEn || line.sizes : line.sizes;
  const page = lineHref(ctx, line);
  const quoteValue = line.id === 'tui-khac' ? 'khac' : line.cat || line.id;
  const media = line.image
    ? halftone(ctx, line.image, '', { sizes: '(min-width: 48rem) 420px, 100vw', ratio: '1' })
    : `<span class="halftone halftone--empty" style="--ratio: 1"><span>${esc(t(P.pending))}</span></span>`;
  return `<dialog class="sheet" id="line-${line.id}" aria-labelledby="line-${line.id}-title">
    <div class="sheet__body">
      <button class="sheet__close" type="button" data-dialog-close aria-label="${esc(t(P.close))}">${icon.close}</button>
      ${media}
      <div class="sheet__text">
        ${kicker(`${t(P.line)} ${pad(i)} / ${String(total).padStart(2, '0')}`)}
        <h3 id="line-${line.id}-title" tabindex="-1" autofocus>${esc(t(line.name))}</h3>
        <p>${esc(t(line.desc))}</p>
        <dl class="sheet__facts">
          <div><dt>${esc(t(P.material))}</dt><dd>${esc(material)}</dd></div>
          ${sizes ? `<div><dt>${esc(t(P.sizes))}</dt><dd>${esc(sizes)}</dd></div>` : ''}
          <div><dt>${esc(t(P.custom))}</dt><dd>${esc(t(line.custom))}</dd></div>
          ${line.apps.length ? `<div><dt>${esc(t(P.apps))}</dt><dd class="tags">${line.apps.map((a) => `<span class="tag">${esc(t(a))}</span>`).join('')}</dd></div>` : ''}
        </dl>
        <div class="sheet__actions">
          <a class="btn btn--primary" href="#bao-gia" data-quote-line="${quoteValue}">${esc(t(P.quote))}</a>
          ${page !== '#bao-gia' ? `<a class="btn btn--secondary" href="${esc(page)}">${esc(t(P.page))}</a>` : ''}
        </div>
      </div>
    </div>
  </dialog>`;
}

export function render(ctx) {
  const { site, copy, t } = ctx;
  const V = copy.v3;
  const c = site.company;
  const lines = site.v3.lines;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.v3.mapQuery)}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.v3.mapQuery)}&output=embed`;

  return `<main id="noi-dung" class="v3">
  <section class="container v3-hero" aria-labelledby="hero-title">
    <div class="v3-hero__copy">
      ${kicker(t(V.hero.kicker))}
      <h1 id="hero-title" class="v3-hero__title">${V.hero.lines.map((l) => plates(t(l), 'plates--line')).join('')}</h1>
      <p class="v3-hero__lead">${esc(t(V.hero.lead))}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#bao-gia">${esc(t(V.hero.primary))}</a>
        <a class="btn btn--secondary" href="#san-pham">${esc(t(V.hero.secondary))}</a>
      </div>
    </div>
    ${printFigure(ctx, site.v3.hero.image, t(site.v3.hero.alt), { sizes: HERO_SIZES, priority: true, ratio: '4 / 5', className: 'v3-hero__media' })}
  </section>

  <section class="container v3-section" id="ve-chung-toi" aria-labelledby="ve-chung-toi-title">
    ${kicker(t(V.about.kicker))}
    <h2 id="ve-chung-toi-title" class="v3-title">${esc(t(V.about.title))}</h2>
    <div class="values" data-reveal-group>
      ${V.about.values.map((v) => `<article class="value" data-reveal>
        ${halftone(ctx, v.image, t(v.alt), { sizes: '(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw', ratio: '4 / 3' })}
        ${kicker(t(v.kicker))}
        <h3>${esc(t(v.title))}</h3>
        <p>${esc(t(v.body))}</p>
      </article>`).join('\n      ')}
    </div>
    <div class="leaders">
      <div class="leaders__motto" data-reveal>
        ${kicker(t(V.about.mottoKicker))}
        <blockquote>${esc(t(V.about.motto))}</blockquote>
        <a class="text-link" href="${ctx.url('about')}">${esc(t(V.about.more))}</a>
      </div>
      <div class="leaders__people" data-reveal>
        <h3 class="kicker">${esc(t(V.about.leadersTitle))}</h3>
        <ul>
          ${site.founders.map((f) => `<li>
            ${halftone(ctx, f.image, f.name, { sizes: '(min-width: 64rem) 14vw, 30vw', ratio: '4 / 5' })}
            <span class="leaders__name">${esc(f.name)}</span>
            <span class="leaders__role">${esc(f.role)}</span>
          </li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <section class="container v3-section" id="san-pham" aria-labelledby="san-pham-title">
    ${kicker(t(V.products.kicker))}
    <header class="v3-head">
      <h2 id="san-pham-title" class="v3-title">${esc(t(V.products.title))}</h2>
      <p>${esc(t(V.products.lead))}</p>
    </header>
    <ul class="lines">
      ${lines.map((l, i) => lineCard(ctx, l, i)).join('\n      ')}
    </ul>
    ${lines.map((l, i) => lineDialog(ctx, l, i, lines.length)).join('\n  ')}
  </section>

  <section class="container v3-section" id="nang-luc" aria-labelledby="nang-luc-title">
    ${kicker(t(V.capability.kicker))}
    <h2 id="nang-luc-title" class="v3-title">${esc(t(V.capability.title))}</h2>
    <div class="pillars">
      ${V.capability.pillars.map((p, i) => `<article class="pillar${i % 2 ? ' pillar--flip' : ''}">
        ${printFigure(ctx, p.image, t(p.alt), { sizes: '(min-width: 64rem) 46vw, 100vw', ratio: '3 / 2', className: 'pillar__media' })}
        <div class="pillar__text" data-reveal>
          <p class="pillar__no">${plates(pad(i), 'plates--num')}</p>
          <h3>${esc(t(p.title))}</h3>
          <p>${esc(t(p.body))}</p>
          <ul class="checks">
            ${p.points.map((pt) => `<li>${icon.check}<span>${esc(t(pt))}</span></li>`).join('\n            ')}
          </ul>
        </div>
      </article>`).join('\n      ')}
    </div>
  </section>

  <section class="container v3-section" id="quy-trinh" aria-labelledby="quy-trinh-title">
    ${kicker(t(V.process.kicker))}
    <header class="v3-head">
      <h2 id="quy-trinh-title" class="v3-title">${esc(t(V.process.title))}</h2>
      <p>${esc(t(V.process.lead))}</p>
    </header>
    <ol class="steps7" data-reveal-group>
      ${V.process.steps.map((s, i) => `<li data-reveal>
        <span class="steps7__no" aria-hidden="true">${pad(i)}</span>
        <h3>${esc(t(s.title))}</h3>
        <p>${esc(t(s.body))}</p>
        ${s.approve ? `<span class="tag tag--magenta">${esc(t(V.process.approve))}</span>` : ''}
      </li>`).join('\n      ')}
    </ol>
  </section>

  <section class="container v3-section v3-contact" id="lien-he" aria-labelledby="lien-he-title">
    ${kicker(t(V.contact.kicker))}
    <h2 id="lien-he-title" class="v3-title">${esc(t(V.contact.title))}</h2>
    <div class="v3-contact__grid">
      <div>
        <div class="map halftone" style="--ratio: 4 / 3" data-map="${esc(mapEmbed)}" data-map-title="${esc(t(V.contact.mapTitle))}">
          <button class="map__load" type="button">${icon.pin}<span>${esc(t(V.contact.mapButton))}</span><small>${esc(t(V.contact.mapNote))}</small></button>
        </div>
        <dl class="v3-contact__facts">
          <div><dt>${esc(t(V.contact.factory))}</dt><dd>${esc(t(c.address))}</dd></div>
          <div><dt>${esc(t(V.contact.hotline))}</dt><dd><a href="tel:${c.phone.tel}">${esc(c.phone.display)}</a> · <a href="${c.zalo}" rel="noopener">Zalo</a></dd></div>
          <div><dt>${esc(t(V.contact.directions))}</dt><dd><a href="${esc(mapsUrl)}" rel="noopener" target="_blank">${esc(t(V.contact.openMaps))} →</a></dd></div>
        </dl>
      </div>
      <div class="v3-contact__form" id="bao-gia" tabindex="-1">
        <h3>${esc(t(V.contact.formTitle))}</h3>
        ${quoteForm(ctx)}
      </div>
    </div>
  </section>
</main>`;
}
