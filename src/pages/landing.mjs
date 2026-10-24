// Landing page một trang (V4, 2026-10-24). Bố cục 6 phần theo concept V3; font và màu của bản khách đã góp ý lần 1.
// Tài liệu thiết kế: docs/superpowers/specs/2026-10-24-landing-only-design.md
// Nội dung: copy.v3 (song ngữ). Ảnh và 9 dòng sản phẩm: site.v3. Hành vi: src/scripts/site.js.
import { esc, image, quoteForm, resolveImage } from '../components.mjs';

// Bề rộng hiển thị thật của ảnh hero, để trình duyệt chọn đúng bản 720w trên mobile.
export const HERO_SIZES = '100vw';

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
const kicker = (text) => `<p class="kicker">${esc(text)}</p>`;

/** Ảnh trong khung giữ sẵn tỷ lệ (không xô bố cục khi tải). */
function frame(ctx, key, alt, { sizes, ratio, priority = false, className = '' }) {
  return `<span class="frame${className ? ` ${className}` : ''}" style="--ratio: ${ratio}">${image(ctx, { src: key, alt: { vi: alt, en: alt } }, { sizes, priority })}</span>`;
}

const icon = {
  plus: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  phone: '<svg class="icon icon--line" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  location: '<svg class="icon icon--line" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  mail: '<svg class="icon icon--line" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  zalo: '<svg class="icon icon--line" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  external: '<svg class="icon icon--sm" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
};

function material(ctx, line) {
  if (!line.material) return ctx.t(ctx.copy.v3.products.madeToOrder);
  return ctx.lang === 'en' && line.materialEn ? line.materialEn : line.material;
}

function lineMedia(ctx, line, sizes, alt = ctx.t(line.name)) {
  const P = ctx.copy.v3.products;
  return line.image
    ? frame(ctx, line.image, alt, { sizes, ratio: '4 / 5' })
    : `<span class="frame frame--empty" style="--ratio: 4 / 5"><span>${esc(ctx.t(P.pending))}</span></span>`;
}

/**
 * Thẻ một dòng sản phẩm (brief HP-09): ảnh 4:5, số đỏ, tên (H3), chất liệu, "Xem chi tiết".
 * Nút "Xem chi tiết" phủ cả thẻ (bấm chỗ nào cũng mở modal). 6 thẻ đầu hiện sẵn; các thẻ sau hiện khi bấm "Xem tất cả".
 */
function lineCard(ctx, line, i) {
  const { t, copy } = ctx;
  const P = copy.v3.products;
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  return `<li class="pcard${i >= 6 ? ' pcard--more' : ''}" id="${line.id}">
        <article>
          ${lineMedia(ctx, line, '(min-width: 64rem) 400px, (min-width: 36rem) 45vw, 50vw')}
          <p class="pcard__no" aria-hidden="true">${pad(i)}</p>
          <h3 class="pcard__name">${esc(t(line.name))}</h3>
          <p class="pcard__material">${esc(material(ctx, line))}</p>
          <button class="pcard__link" type="button" data-dialog-open="line-${line.id}" aria-haspopup="dialog">${esc(t(P.detail))}<span class="visually-hidden">: ${esc(t(line.name))}</span>${arrow}</button>
        </article>
      </li>`;
}

/** Modal chi tiết một dòng sản phẩm (dialog gốc của trình duyệt). */
function lineDialog(ctx, line, i, total) {
  const { t, copy, lang } = ctx;
  const P = copy.v3.products;
  const sizes = lang === 'en' ? line.sizesEn || line.sizes : line.sizes;
  const quoteValue = line.id === 'tui-khac' ? 'khac' : line.cat || line.id;
  return `<dialog class="sheet" id="line-${line.id}" aria-labelledby="line-${line.id}-title">
    <div class="sheet__body">
      <button class="sheet__close" type="button" data-dialog-close aria-label="${esc(t(P.close))}">${icon.close}</button>
      ${lineMedia(ctx, line, '(min-width: 48rem) 420px, 100vw', '')}
      <div class="sheet__text">
        ${kicker(`${t(P.line)} ${pad(i)} / ${String(total).padStart(2, '0')}`)}
        <h3 id="line-${line.id}-title" tabindex="-1" autofocus>${esc(t(line.name))}</h3>
        <p>${esc(t(line.desc))}</p>
        <dl class="sheet__facts">
          <div><dt>${esc(t(P.material))}</dt><dd>${esc(material(ctx, line))}</dd></div>
          ${sizes ? `<div><dt>${esc(t(P.sizes))}</dt><dd>${esc(sizes)}</dd></div>` : ''}
          <div><dt>${esc(t(P.custom))}</dt><dd>${esc(t(line.custom))}</dd></div>
          ${line.apps.length ? `<div><dt>${esc(t(P.apps))}</dt><dd class="tags">${line.apps.map((a) => `<span class="tag">${esc(t(a))}</span>`).join('')}</dd></div>` : ''}
        </dl>
        <div class="sheet__actions">
          <a class="btn btn--primary" href="#bao-gia" data-quote-line="${quoteValue}">${esc(t(P.quote))}</a>
        </div>
      </div>
    </div>
  </dialog>`;
}

/** Icon nét mảnh cho dải điểm mạnh dưới hero */
const featureIcon = {
  gear: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="4.5"/><path d="M16 3.5v4M16 24.5v4M3.5 16h4M24.5 16h4M7.2 7.2l2.8 2.8M22 22l2.8 2.8M7.2 24.8 10 22M22 10l2.8-2.8"/><circle cx="16" cy="16" r="9"/></svg>',
  layers: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4 4 10l12 6 12-6-12-6Z"/><path d="m4 16 12 6 12-6M4 22l12 6 12-6"/></svg>',
  factory: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 28V14l7 4v-4l7 4v-4l7 4V6h3v22H4Z"/><path d="M9 23h3M15 23h3M21 23h3"/></svg>',
};

/**
 * Hero slider toàn màn hình (brief HP-04D). Slide 1 mang H1 duy nhất của trang; slide 2, 3 dùng H2.
 * Không JS: chỉ slide 1 hiện. Có JS (site.js): tự chuyển 6 giây, dừng khi rê chuột/focus, nút trước/sau, chấm, vuốt.
 */
function heroSlider(ctx) {
  const { site, copy, t } = ctx;
  const S = copy.v3.slider;
  const slides = S.slides.map((s, i) => ({ ...s, ...site.v3.slides[i] }));
  const total = String(slides.length).padStart(2, '0');
  const arrow = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d === 'next' ? 'M5 12h14m-6-6 6 6-6 6' : 'M19 12H5m6-6-6 6 6 6'}"/></svg>`;
  return `<section class="hero2" id="top" aria-roledescription="carousel" aria-label="${esc(t(S.label))}" data-section data-slider>
    <div class="hero2__slides">
      ${slides.map((s, i) => {
        const m = resolveImage(ctx, s.image);
        const tag = i === 0 ? 'h1' : 'h2';
        return `<div class="hero2__slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${slides.length}"${i === 0 ? '' : ' inert'} data-slide>
        ${i === 0
          ? `<img class="hero2__bg" src="${ctx.asset(m.large.file)}" srcset="${ctx.asset(m.small.file)} ${m.small.width}w, ${ctx.asset(m.large.file)} ${m.large.width}w" sizes="100vw" width="${m.large.width}" height="${m.large.height}" alt="${esc(t(s.alt))}" style="object-position: ${s.position}" fetchpriority="high">`
          : `<img class="hero2__bg" data-src="${ctx.asset(m.large.file)}" data-srcset="${ctx.asset(m.small.file)} ${m.small.width}w, ${ctx.asset(m.large.file)} ${m.large.width}w" sizes="100vw" width="${m.large.width}" height="${m.large.height}" alt="${esc(t(s.alt))}" style="object-position: ${s.position}" decoding="async">`}
        <div class="container hero2__content">
          <p class="hero2__eyebrow">${esc(t(s.eyebrow))}</p>
          <${tag} class="hero2__title"${i === 0 ? ' id="hero-title"' : ''}>${s.title.map((l) => `<span>${esc(t(l))}</span>`).join(' ')}</${tag}>
          <p class="hero2__body">${esc(t(s.body))}</p>
          <div class="hero2__actions">
            <a class="btn hero2__btn hero2__btn--primary" href="${s.cta[0][1]}">${esc(t(s.cta[0][0]))}${arrow('next')}</a>
            <a class="btn hero2__btn hero2__btn--ghost" href="${s.cta[1][1]}">${esc(t(s.cta[1][0]))}${arrow('next')}</a>
          </div>
        </div>
      </div>`;
      }).join('\n      ')}
    </div>
    <div class="hero2__foot">
      <ul class="container hero2__features">
        ${S.features.map((f) => `<li>${featureIcon[f.icon]}<span><strong>${esc(t(f.title))}</strong>${esc(t(f.body))}</span></li>`).join('\n        ')}
      </ul>
      <div class="container hero2__nav" data-slider-nav>
        <div class="hero2__count"><span data-slider-current>01</span> / ${total}</div>
        <div class="hero2__progress" aria-hidden="true"><span data-slider-progress></span></div>
        <div class="hero2__dots">
          ${slides.map((_, i) => `<button type="button" class="hero2__dot${i === 0 ? ' is-active' : ''}" data-slider-dot="${i}" aria-label="${esc(t(S.goto))} ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
        </div>
        <div class="hero2__arrows">
          <button type="button" class="hero2__pause" data-slider-pause aria-label="${esc(t(S.pause))}" data-label-pause="${esc(t(S.pause))}" data-label-play="${esc(t(S.play))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-pause" d="M9 6v12M15 6v12"/><path class="i-play" d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></button>
          <button type="button" class="hero2__arrow" data-slider-prev aria-label="${esc(t(S.prev))}">${arrow('prev')}</button>
          <button type="button" class="hero2__arrow" data-slider-next aria-label="${esc(t(S.next))}">${arrow('next')}</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function render(ctx) {
  const { site, copy, t } = ctx;
  const V = copy.v3;
  const c = site.company;
  const lines = site.v3.lines;
  const flow = site.v3.flow;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.v3.mapQuery)}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.v3.mapQuery)}&output=embed&hl=${ctx.lang}`;
  const ill = resolveImage(ctx, flow.illustration);

  return `<main id="noi-dung" class="onepage">
  ${heroSlider(ctx)}

  <section class="about2" id="ve-chung-toi" aria-labelledby="ve-chung-toi-title" data-section>
    <div class="container">
      <header class="about2__head">
        ${kicker(t(V.about2.kicker))}
        <h2 id="ve-chung-toi-title" class="block__title">${esc(t(V.about2.title))}</h2>
        <p>${esc(t(V.about2.lead))}</p>
      </header>
      <div class="about2__grid" data-reveal-group>
        ${V.about2.items.map((v, i) => `<article class="about2__item" data-reveal>
          <p class="about2__no" aria-hidden="true">${pad(i)}</p>
          <p class="about2__label">${esc(t(v.label))}</p>
          <h3>${esc(t(v.title))}</h3>
          <p>${esc(t(v.body))}</p>
        </article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="team" id="lanh-dao" aria-labelledby="lanh-dao-title">
    <div class="container">
      <h2 id="lanh-dao-title" class="block__title">${esc(t(V.leadership.title))}</h2>
      <ul class="team__grid" data-reveal-group>
        ${site.founders.map((f) => {
          const m = resolveImage(ctx, f.image);
          return `<li data-reveal>
          <span class="team__photo"><img src="${ctx.asset(m.large.file)}" srcset="${ctx.asset(m.small.file)} ${m.small.width}w, ${ctx.asset(m.large.file)} ${m.large.width}w" sizes="(min-width: 80rem) 400px, (min-width: 36rem) 31vw, 46vw" width="${m.large.width}" height="${m.large.height}" alt="${esc(`${f.name}, ${f.role}`)}" style="object-position: ${f.position}" loading="lazy" decoding="async"></span>
          <h3 class="team__name">${esc(f.name)}</h3>
          <p class="team__role">${esc(f.role)}</p>
        </li>`;
        }).join('\n        ')}
      </ul>
    </div>
  </section>

  <section class="catalog" id="san-pham" aria-labelledby="san-pham-title" data-section>
    <div class="container">
      <header class="catalog__head">
        ${kicker(t(V.products.kicker))}
        <h2 id="san-pham-title" class="block__title">${esc(t(V.products.title))}</h2>
        <p>${esc(t(V.products.lead))}</p>
      </header>
      <ul class="catalog__grid" id="catalog-grid" data-catalog>
        ${lines.map((l, i) => lineCard(ctx, l, i)).join('\n        ')}
      </ul>
      ${lines.length > 6 ? `<p class="catalog__all"><button class="catalog__all-btn" type="button" data-catalog-all aria-controls="catalog-grid" aria-expanded="false">${esc(t(V.products.all))} (${lines.length})<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></p>` : ''}
    </div>
    ${lines.map((l, i) => lineDialog(ctx, l, i, lines.length)).join('\n    ')}
  </section>

  <section class="container block" id="nang-luc" aria-labelledby="nang-luc-title" data-section>
    ${kicker(t(V.capability.kicker))}
    <h2 id="nang-luc-title" class="block__title">${esc(t(V.capability.title))}</h2>
    <div class="pillars">
      ${V.capability.pillars.map((p, i) => `<article class="pillar${i % 2 ? ' pillar--flip' : ''}">
        ${frame(ctx, p.image, t(p.alt), { sizes: '(min-width: 64rem) 46vw, 100vw', ratio: '3 / 2', className: 'pillar__media' })}
        <div class="pillar__text" data-reveal>
          <p class="pillar__no" aria-hidden="true">${pad(i)}</p>
          <h3>${esc(t(p.title))}</h3>
          <p>${esc(t(p.body))}</p>
          <ul class="checks">
            ${p.points.map((pt) => `<li>${icon.check}<span>${esc(t(pt))}</span></li>`).join('\n            ')}
          </ul>
        </div>
      </article>`).join('\n      ')}
    </div>
  </section>

  <section class="flow" id="quy-trinh" aria-labelledby="quy-trinh-title">
    <div class="container">
      <header class="flow__head">
        <p class="kicker">${esc(t(V.flow.eyebrow))}</p>
        <h2 id="quy-trinh-title" class="block__title">${esc(t(V.flow.title))}</h2>
        <p>${esc(t(V.flow.lead))}</p>
      </header>
      <figure class="flow__illustration">
        <img src="${ctx.asset(ill.large.file)}" srcset="${ctx.asset(ill.small.file)} ${ill.small.width}w, ${ctx.asset(ill.large.file)} ${ill.large.width}w" sizes="(min-width: 80rem) 1280px, 100vw" width="${ill.large.width}" height="${ill.large.height}" alt="${esc(t(V.flow.alt))}" loading="lazy" decoding="async">
      </figure>
      <ol class="flow__steps" data-reveal-group>
        ${V.flow.steps.map((s, i) => {
          const m = resolveImage(ctx, flow.steps[i]).large;
          return `<li data-reveal>
          ${frame(ctx, flow.steps[i], '', { sizes: '100vw', ratio: `${m.width} / ${m.height}`, className: 'flow__step-media' })}
          <span class="flow__no" aria-hidden="true">${pad(i)}</span>
          <h3>${esc(t(s.title))}</h3>
          <p>${esc(t(s.body))}</p>
        </li>`;
        }).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="rfq-section" id="lien-he" aria-labelledby="lien-he-title" data-section>
    <div class="container">
      <header class="rfq-header">
        ${kicker(t(V.contact.kicker))}
        <h2 id="lien-he-title" class="rfq-header__title">${esc(t(V.contact.title))}</h2>
        <p class="rfq-header__desc">${esc(t(V.contact.desc))}</p>
      </header>

      <div class="rfq-layout">
        <!-- Cột trái: 40% Contact Information & Google Maps -->
        <aside class="rfq-info">
          <div class="rfq-info__card">
            <!-- Hotline & Zalo -->
            <div class="rfq-card-item rfq-card-item--highlight">
              <div class="rfq-card-item__icon" aria-hidden="true">${icon.phone}</div>
              <div class="rfq-card-item__body">
                <span class="rfq-card-item__label">${esc(t(V.contact.hotline))}</span>
                <a class="rfq-hotline" href="tel:${c.phone.tel}">
                  ${esc(c.phone.display)}
                </a>
                <div class="rfq-quick-links">
                  <a class="rfq-btn-sm rfq-btn-sm--call" href="tel:${c.phone.tel}">
                    ${icon.phone}<span>${ctx.lang === 'vi' ? 'Gọi trực tiếp' : 'Call now'}</span>
                  </a>
                  <a class="rfq-btn-sm rfq-btn-sm--zalo" href="${c.zalo}" target="_blank" rel="noopener noreferrer">
                    ${icon.zalo}<span>${ctx.lang === 'vi' ? 'Chat Zalo' : 'Zalo Chat'}</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Nhà máy & Địa chỉ -->
            <div class="rfq-card-item">
              <div class="rfq-card-item__icon" aria-hidden="true">${icon.location}</div>
              <div class="rfq-card-item__body">
                <span class="rfq-card-item__label">${esc(t(V.contact.factory))}</span>
                <p class="rfq-address">${esc(t(c.address))}</p>
                <a class="rfq-link-nav" href="${esc(mapsUrl)}" target="_blank" rel="noopener noreferrer">
                  <span>${esc(t(V.contact.openMaps))}</span>${icon.external}
                </a>
              </div>
            </div>

            <!-- Email liên hệ -->
            ${c.email ? `<div class="rfq-card-item">
              <div class="rfq-card-item__icon" aria-hidden="true">${icon.mail}</div>
              <div class="rfq-card-item__body">
                <span class="rfq-card-item__label">${esc(t(V.contact.email))}</span>
                <a class="rfq-email" href="mailto:${esc(c.email.value)}">${esc(c.email.value)}</a>
              </div>
            </div>` : ''}

            <!-- Bản đồ nhỏ tối ưu -->
            <div class="rfq-map-box">
              <div class="rfq-map frame">
                <iframe src="${esc(mapEmbed)}" title="${esc(t(V.contact.mapTitle))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </aside>

        <!-- Cột phải: 60% RFQ Form trên nền trắng -->
        <div class="rfq-form-wrap" id="bao-gia" tabindex="-1">
          <div class="rfq-form-card">
            <header class="rfq-form-card__head">
              <h3 class="rfq-form-card__title">${esc(t(V.contact.formTitle))}</h3>
              <p class="rfq-form-card__desc">${esc(t(V.contact.formDesc))}</p>
            </header>
            ${quoteForm(ctx)}
          </div>
        </div>
      </div>
    </div>
  </section>
</main>`;
}
