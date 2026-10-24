// Landing page một trang (V4, 2026-10-24). Bố cục 6 phần theo concept V3; font và màu của bản khách đã góp ý lần 1.
// Tài liệu thiết kế: docs/superpowers/specs/2026-10-24-landing-only-design.md
// Nội dung: copy.v3 (song ngữ). Ảnh và 9 dòng sản phẩm: site.v3. Hành vi: src/scripts/site.js.
import { esc, image, quoteForm, resolveImage } from '../components.mjs';

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
const kicker = (text) => `<p class="kicker">${esc(text)}</p>`;

/** Ảnh trong khung giữ sẵn tỷ lệ (không xô bố cục khi tải). */
function frame(ctx, key, alt, { sizes, ratio, priority = false, className = '' }) {
  return `<span class="frame${className ? ` ${className}` : ''}" style="--ratio: ${ratio}">${image(ctx, { src: key, alt: { vi: alt, en: alt } }, { sizes, priority })}</span>`;
}

const icon = {
  plus: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
};

function material(ctx, line) {
  if (!line.material) return ctx.t(ctx.copy.v3.products.madeToOrder);
  return ctx.lang === 'en' && line.materialEn ? line.materialEn : line.material;
}

function lineMedia(ctx, line, sizes) {
  const P = ctx.copy.v3.products;
  return line.image
    ? frame(ctx, line.image, ctx.t(line.name), { sizes, ratio: '1' })
    : `<span class="frame frame--empty" style="--ratio: 1"><span>${esc(ctx.t(P.pending))}</span></span>`;
}

/** Ô một dòng sản phẩm: nút mở modal chi tiết. */
function lineCard(ctx, line, i) {
  const { t, copy } = ctx;
  return `<li>
        <button class="line" type="button" data-dialog-open="line-${line.id}" aria-haspopup="dialog">
          ${lineMedia(ctx, line, '(min-width: 64rem) 28vw, 45vw')}
          <span class="line__head"><span class="line__no">${pad(i)}</span><span class="line__name">${esc(t(line.name))}</span></span>
          <span class="line__foot"><span class="line__material">${esc(material(ctx, line))}</span><span class="line__more">${esc(t(copy.ui.viewDetails))}${icon.plus}</span></span>
        </button>
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
      ${lineMedia(ctx, line, '(min-width: 48rem) 420px, 100vw')}
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
  <section class="container hero1" id="top" aria-labelledby="hero-title" data-section>
    <div class="hero1__copy">
      ${kicker(t(V.hero.kicker))}
      <h1 id="hero-title" class="hero1__title">${V.hero.lines.map((l) => `<span>${esc(t(l))}</span>`).join(' ')}</h1>
      <p class="hero1__lead">${esc(t(V.hero.lead))}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#lien-he">${esc(t(V.hero.primary))}</a>
        <a class="btn btn--secondary" href="#san-pham">${esc(t(V.hero.secondary))}</a>
      </div>
    </div>
    ${frame(ctx, site.v3.hero.image, t(site.v3.hero.alt), { sizes: HERO_SIZES, ratio: '4 / 5', priority: true, className: 'hero1__media' })}
  </section>

  <section class="container block" id="ve-chung-toi" aria-labelledby="ve-chung-toi-title" data-section>
    ${kicker(t(V.about.kicker))}
    <h2 id="ve-chung-toi-title" class="block__title">${esc(t(V.about.title))}</h2>
    <div class="values" data-reveal-group>
      ${V.about.values.map((v) => `<article class="value" data-reveal>
        ${frame(ctx, v.image, t(v.alt), { sizes: '(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw', ratio: '4 / 3' })}
        ${kicker(t(v.kicker))}
        <h3>${esc(t(v.title))}</h3>
        <p>${esc(t(v.body))}</p>
      </article>`).join('\n      ')}
    </div>
    <div class="leaders">
      <div class="leaders__motto" data-reveal>
        ${kicker(t(V.about.leadersTitle))}
        <blockquote>${esc(t(V.about.motto))}</blockquote>
        <p class="leaders__cite">${esc(t(V.about.mottoKicker))}</p>
      </div>
      <ul class="leaders__people" data-reveal-group>
        ${site.founders.map((f) => `<li data-reveal>
          ${frame(ctx, f.image, f.name, { sizes: '(min-width: 64rem) 18vw, 30vw', ratio: '4 / 5' })}
          <span class="leaders__name">${esc(f.name)}</span>
          <span class="leaders__role">${esc(f.role)}</span>
        </li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  <section class="container block" id="san-pham" aria-labelledby="san-pham-title" data-section>
    ${kicker(t(V.products.kicker))}
    <header class="block__head">
      <h2 id="san-pham-title" class="block__title">${esc(t(V.products.title))}</h2>
      <p>${esc(t(V.products.lead))}</p>
    </header>
    <ul class="lines">
      ${lines.map((l, i) => lineCard(ctx, l, i)).join('\n      ')}
    </ul>
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

  <section class="container block contact" id="lien-he" aria-labelledby="lien-he-title" data-section>
    ${kicker(t(V.contact.kicker))}
    <h2 id="lien-he-title" class="block__title">${esc(t(V.contact.title))}</h2>
    <div class="contact__grid">
      <div>
        <div class="map frame" style="--ratio: 4 / 3">
          <iframe src="${esc(mapEmbed)}" title="${esc(t(V.contact.mapTitle))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <dl class="contact__facts">
          <div><dt>${esc(t(V.contact.factory))}</dt><dd>${esc(t(c.address))}</dd></div>
          <div><dt>${esc(t(V.contact.hotline))}</dt><dd><a href="tel:${c.phone.tel}">${esc(c.phone.display)}</a> · <a href="${c.zalo}" rel="noopener">Zalo</a></dd></div>
          <div><dt>${esc(t(V.contact.directions))}</dt><dd><a href="${esc(mapsUrl)}" rel="noopener" target="_blank">${esc(t(V.contact.openMaps))} →</a></dd></div>
        </dl>
      </div>
      <div class="contact__form" id="bao-gia" tabindex="-1">
        <h3>${esc(t(V.contact.formTitle))}</h3>
        ${quoteForm(ctx)}
      </div>
    </div>
  </section>
</main>`;
}
