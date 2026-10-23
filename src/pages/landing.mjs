import { esc, button, image, categoryHref, quoteForm, resolveImage } from '../components.mjs';

// Bề rộng hiển thị thật của ảnh hero, để trình duyệt chọn đúng bản 768w trên mobile.
export const HERO_SIZES = '(min-width: 64rem) 50vw, 100vw';

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

/**
 * Ô ảnh nhà máy: ảnh thật nếu đã có trong site.factoryPhotos, ngược lại là ô chờ ảnh ghi rõ.
 * Không bao giờ thay bằng ảnh minh hoạ hay ảnh tạo bằng AI.
 */
function factorySlot(ctx, slot, { sizes, className }) {
  const key = ctx.site.factoryPhotos?.[slot.id];
  const caption = esc(ctx.t(slot.caption));
  if (key) {
    return `<figure class="factory__photo ${className}">${image(ctx, key, { sizes })}<figcaption>${caption}</figcaption></figure>`;
  }
  return `<figure class="factory__photo factory__photo--pending ${className}" data-photo-slot="${slot.id}">
          <div class="factory__pending">
            <span class="factory__pending-what">${caption}</span>
          </div>
        </figure>`;
}

/** Một sản phẩm trong bộ sưu tập: ảnh lớn, tên, chất liệu. Không viền, không bóng. */
function collectionItem(ctx, cat, { sizes, className }) {
  // Ảnh chụp trên nền trắng (cutout) hiển thị trọn sản phẩm thay vì cắt khung.
  const cutout = ctx.img(cat.image).cutout ? ' collection__media--cutout' : '';
  return `<li class="collection__item ${className}">
        <a href="${categoryHref(ctx, cat)}">
          <span class="collection__media${cutout}">${image(ctx, cat.image, { sizes })}</span>
          <span class="collection__caption"><span class="collection__name">${esc(ctx.t(cat.name))}</span><span class="collection__material">${esc(ctx.t(cat.material))}</span></span>
        </a>
      </li>`;
}

export function render(ctx) {
  const { site, copy, t } = ctx;
  const { hero, products, process, capability, quote, about, factory } = copy;
  const cats = site.categories;
  const c = site.company;
  const withPhoto = cats.filter((cat) => cat.image);
  const withoutPhoto = cats.filter((cat) => !cat.image);
  const slots = factory.slots;
  const anyPending = slots.some((s) => !site.factoryPhotos?.[s.id]);

  return `<main id="noi-dung">
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <h1 id="hero-title" class="hero__title">${esc(t(hero.title))}</h1>
        <p class="hero__lead">${esc(t(hero.lead))}</p>
        <div class="hero__actions">
          ${button(t(hero.primary), '#san-pham')}
          ${button(t(copy.ui.quote), '#bao-gia', 'secondary')}
        </div>
      </div>
      <figure class="hero__main">
        ${image(ctx, 'hero', { sizes: HERO_SIZES, priority: true })}
      </figure>
    </div>
    <div class="container">
      <dl class="hero__facts">
        ${hero.facts.map((f) => `<div><dt>${esc(t(f.label))}</dt><dd>${esc(t(f.value))}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </section>

  <section class="section collection-section" id="san-pham" aria-labelledby="san-pham-title">
    <div class="container">
      <header class="split-head">
        <h2 id="san-pham-title">${esc(t(products.title))}</h2>
        <p>${esc(t(products.lead))}</p>
      </header>
      <ul class="collection">
      ${withPhoto.map((cat) => collectionItem(ctx, cat, { sizes: '(min-width: 64rem) 30vw, (min-width: 36rem) 50vw, 100vw', className: '' })).join('\n      ')}
        <li class="collection__more">
          <h3>${esc(t(products.moreTitle))}</h3>
          <ul>
            ${withoutPhoto.map((cat) => `<li><a href="${categoryHref(ctx, cat)}"><span>${esc(t(cat.name))}</span><small>${esc(t(cat.material))}</small></a></li>`).join('\n            ')}
          </ul>
          <a class="text-link" href="${ctx.url('products')}">${esc(t(copy.ui.allProducts))}</a>
        </li>
      </ul>
    </div>
  </section>

  <section class="factory" id="nang-luc" aria-labelledby="nang-luc-title">
    <div class="container factory__head">
      <h2 id="nang-luc-title">${esc(t(factory.title))}</h2>
      <div>
        <p class="factory__subtitle">${esc(t(factory.subtitle))}</p>
        <p class="factory__body">${esc(t(about.body))} ${esc(t(factory.body))}</p>
        <a class="text-link text-link--light" href="${ctx.url('about')}">${esc(t(about.link))}</a>
      </div>
    </div>
    <div class="factory__hero">
      ${factorySlot(ctx, slots[0], { sizes: '100vw', className: 'factory__photo--wide' })}
    </div>
    <div class="container">
      ${anyPending ? `<p class="factory__pending-note">${esc(t(factory.pending))}</p>` : ''}
      <div class="factory__gallery">
        ${slots.slice(1).map((s) => factorySlot(ctx, s, { sizes: '(min-width: 48rem) 33vw, 100vw', className: '' })).join('\n        ')}
      </div>
      <dl class="factory__facts">
        ${capability.items.map((it) => `<div><dt>${esc(t(it.title))}</dt><dd>${esc(t(it.body))}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </section>

  <section class="section" id="quy-trinh" aria-labelledby="quy-trinh-title">
    <div class="container">
      <header class="split-head">
        <h2 id="quy-trinh-title">${esc(t(process.title))}</h2>
        <p>${esc(t(process.lead))}</p>
      </header>
      <ol class="flow">
        ${process.steps.map((s) => `<li class="flow__step"><h3>${esc(t(s.title))}</h3><p>${esc(t(s.body))}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="section section--surface quote" id="bao-gia" aria-labelledby="bao-gia-title" tabindex="-1">
    <div class="container quote__grid">
      <div class="quote__intro">
        <h2 id="bao-gia-title">${esc(t(quote.title))}</h2>
        <p>${esc(t(quote.lead))}</p>
        <div class="quote__direct">
          <p>${esc(t(quote.direct))}</p>
          <a class="quote__phone" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a>
          <a class="text-link" href="${c.zalo}" rel="noopener">${esc(t(quote.zalo))}</a>
        </div>
      </div>
      ${quoteForm(ctx)}
    </div>
  </section>
</main>`;
}
