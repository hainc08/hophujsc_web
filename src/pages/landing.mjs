import { esc, button, image, sectionHeader, categoryTile, categoryHref, quoteForm, resolveImage } from '../components.mjs';

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

export function render(ctx) {
  const { site, copy, t } = ctx;
  const { hero, products, process, capability, applications, quote } = copy;
  const cats = site.categories;
  const byId = Object.fromEntries(cats.map((c) => [c.id, c]));
  const c = site.company;

  // Lưới catalogue: hàng 1 có ba ô rộng khác nhau, hàng 2 và 3 ba ô đều; ô cuối là thẻ báo giá.
  const layout = ['tile--wide', 'tile--mid', 'tile--narrow', '', '', '', '', ''];
  const tileSizes = '(min-width: 64rem) 34vw, 50vw';

  return `<main id="noi-dung">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__inner">
      <div class="hero__copy">
        <h1 id="hero-title">${esc(t(hero.title))}</h1>
        <p class="hero__lead">${esc(t(hero.lead))}</p>
        <div class="hero__actions">
          ${button(t(hero.primary), '#san-pham')}
          ${button(t(copy.ui.quote), '#bao-gia', 'secondary')}
        </div>
        <p class="hero__note">${esc(t(hero.note))}</p>
      </div>
      <div class="hero__media">
        ${image(ctx, 'hero', { sizes: HERO_SIZES, priority: true })}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="san-pham">
    <div class="container">
      ${sectionHeader(ctx, { id: 'san-pham', title: products.title, lead: products.lead })}
      <ul class="catalogue">
      ${cats.map((cat, i) => categoryTile(ctx, cat, { sizes: tileSizes, className: layout[i] })).join('\n      ')}
        <li class="tile tile--cta">
          <div class="tile__cta-body">
            <p class="tile__cta-title">${esc(t(products.ctaTitle))}</p>
            <p>${esc(t(products.ctaBody))}</p>
            <a class="text-link text-link--light" href="#bao-gia">${esc(t(products.ctaLink))}</a>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <section class="section section--surface" id="quy-trinh" aria-labelledby="quy-trinh-title">
    <div class="container process">
      <div class="process__text">
        ${sectionHeader(ctx, { id: 'quy-trinh-title', title: process.title, lead: process.lead })}
        <ol class="steps">
          ${process.steps.map((s) => `<li class="steps__item" data-reveal><h3>${esc(t(s.title))}</h3><p>${esc(t(s.body))}</p></li>`).join('\n          ')}
        </ol>
      </div>
      <figure class="process__media" data-reveal>
        ${image(ctx, 'film', { sizes: '(min-width: 64rem) 45vw, 100vw' })}
        <figcaption>${esc(t(process.caption))}</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--dark" id="nang-luc" aria-labelledby="nang-luc-title">
    <div class="container">
      ${sectionHeader(ctx, { id: 'nang-luc-title', title: capability.title, lead: capability.lead, light: true })}
      <dl class="capability">
        ${capability.items.map((it) => `<div class="capability__item" data-reveal><dt>${esc(t(it.title))}</dt><dd>${esc(t(it.body))}</dd></div>`).join('\n        ')}
      </dl>
      <p class="capability__more"><a class="text-link text-link--light" href="${ctx.url('about')}">${esc(t(capability.link))}</a></p>
    </div>
  </section>

  <section class="section" aria-labelledby="ung-dung">
    <div class="container applications">
      <figure class="applications__media" data-reveal>
        ${image(ctx, 'handleGroup', { sizes: '(min-width: 64rem) 40vw, 100vw' })}
      </figure>
      <div class="applications__body">
        ${sectionHeader(ctx, { id: 'ung-dung', title: applications.title })}
        <ul class="industries">
          ${applications.items.map((a) => {
            const href = a.link ? ctx.url(a.link) || `${ctx.local(ctx.lang)}?product=khac#bao-gia` : categoryHref(ctx, byId[a.category]);
            return `<li class="industries__item" data-reveal>
            <h3>${esc(t(a.title))}</h3>
            <p>${esc(t(a.body))}</p>
            <a class="text-link" href="${href}">${esc(t(applications.seeProduct))}<span class="visually-hidden">: ${esc(t(a.title))}</span></a>
          </li>`;
          }).join('\n          ')}
        </ul>
      </div>
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
