// Component giao diện dùng chung. Mỗi hàm nhận ngữ cảnh ctx (xem createContext) và trả về chuỗi HTML.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * Ngữ cảnh dựng trang cho một ngôn ngữ.
 * - t(v): lấy chữ theo ngôn ngữ từ { vi, en } hoặc chuỗi thường.
 * - href(path): đường dẫn trong site, có tính base (ví dụ /hophujsc_web/ trên GitHub Pages).
 * - url(key): liên kết theo khoá trong site.links; null nếu ngôn ngữ này không có trang tương ứng.
 * - abs(path): URL tuyệt đối trên tên miền production, dùng cho canonical, hreflang, JSON-LD, Open Graph.
 */
export function createContext({ site, copy, pages, images, lang, base = '/', endpoint = '' }) {
  const t = (v) => (v && typeof v === 'object' && lang in v ? v[lang] : v ?? '');
  const href = (path) => base + String(path).replace(/^\//, '');
  const url = (key) => {
    const p = t(site.links[key]);
    return p ? href(p) : null;
  };
  const abs = (path) => site.origin + path;
  const local = (l) => href(site.paths[l]);
  const asset = (file) => href(`assets/img/${file}`);
  return { site, copy, pages, images, lang, base, endpoint, t, href, url, abs, local, asset, img: (key) => site.images[key] };
}

const icons = {
  phone: '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  menu: '<svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.75" d="M3 7h18M3 12h18M3 17h18"/></svg>',
  chevron: '<svg class="icon icon--chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M2 4l4 4 4-4"/></svg>',
};

export function button(label, href, variant = 'primary') {
  return `<a class="btn btn--${variant}" href="${esc(href)}">${esc(label)}</a>`;
}

/** Tra ảnh trong src/data/images.json theo đường dẫn ảnh gốc. */
export function resolveImage(ctx, src) {
  const m = ctx.images[src];
  if (!m) throw new Error(`Ảnh chưa có trong src/data/images.json: ${src}`);
  return m;
}

/**
 * Ảnh WebP luôn có width/height/alt và srcset 2 cỡ.
 * ref: khoá trong site.images, hoặc { src, alt } cho ảnh trong nội dung bài viết.
 */
export function image(ctx, ref, { sizes = '100vw', priority = false, className = '', alt } = {}) {
  const im = typeof ref === 'string' ? ctx.img(ref) : ref;
  const m = resolveImage(ctx, im.src);
  const altText = alt ?? ctx.t(im.alt) ?? '';
  const srcset = m.small.file !== m.large.file ? ` srcset="${ctx.asset(m.small.file)} ${m.small.width}w, ${ctx.asset(m.large.file)} ${m.large.width}w" sizes="${sizes}"` : '';
  const load = priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img${className ? ` class="${className}"` : ''} src="${ctx.asset(m.large.file)}"${srcset} width="${m.large.width}" height="${m.large.height}" alt="${esc(altText)}" ${load}>`;
}

export function sectionHeader(ctx, { id, title, lead, light = false }) {
  return `<header class="section-head${light ? ' section-head--light' : ''}">
      <h2 id="${id}">${esc(ctx.t(title))}</h2>
      ${lead ? `<p>${esc(ctx.t(lead))}</p>` : ''}
    </header>`;
}

/** Liên kết của một danh mục: bản VI mở trang danh mục; bản EN (chưa có trang danh mục) mở form báo giá đã chọn sẵn. */
export function categoryHref(ctx, c) {
  return ctx.lang === 'vi' ? ctx.href(c.url.vi) : `${ctx.local('en')}?product=${c.id}#bao-gia`;
}

export function siteHeader(ctx) {
  const { site, copy, t, lang } = ctx;
  const other = lang === 'vi' ? 'en' : 'vi';
  const ui = copy.ui;
  const logo = resolveImage(ctx, site.images.logo.src).small;
  const landing = ctx.local(lang);
  const navHref = (n) => (n.link ? ctx.url(n.link) : landing + n.href);
  const navItem = (n) => {
    if (!n.mega || lang !== 'vi') return `<li><a class="nav__link" href="${esc(navHref(n))}">${esc(t(n.label))}</a></li>`;
    return `<li class="nav__item--mega">
          <a class="nav__link" href="${ctx.url('products')}">${esc(t(n.label))}</a>
          <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mega" aria-label="${esc(t(ui.openProducts))}">${icons.chevron}</button>
          <div class="mega" id="mega">
            <ul class="mega__list">
              ${site.categories.map((c) => `<li><a href="${categoryHref(ctx, c)}"><span>${esc(t(c.name))}</span><small>${esc(t(c.material))}</small></a></li>`).join('\n              ')}
            </ul>
            <a class="mega__all" href="${ctx.url('products')}">${esc(t(ui.allProducts))}</a>
          </div>
        </li>`;
  };
  return `<a class="skip-link" href="#noi-dung">${esc(t(ui.skip))}</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="${landing}" aria-label="${esc(t(site.company.brand))}, ${esc(t(ui.home))}">
      <img src="${ctx.asset(logo.file)}" width="${logo.width}" height="${logo.height}" alt="">
      <span>${esc(t(site.company.shortName))}</span>
    </a>
    <nav class="nav" id="menu-chinh" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}" data-menu>
      <ul class="nav__list">
        ${copy.nav.map(navItem).join('\n        ')}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="lang-switch" href="${ctx.local(other)}" hreflang="${other}">${other.toUpperCase()}<span class="visually-hidden">: ${esc(t(ui.switchLangLabel))}</span></a>
      <a class="btn btn--primary btn--sm site-header__cta" href="${landing}#bao-gia">${esc(t(ui.quote))}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-chinh" data-menu-toggle>
        ${icons.menu}<span class="visually-hidden">${esc(t(ui.menu))}</span>
      </button>
    </div>
  </div>
</header>`;
}

/** Breadcrumb hiển thị. items: [{ name, href }], mục cuối là trang hiện tại. */
export function breadcrumbs(ctx, items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        ${items.map((it, i) => (i === items.length - 1 ? `<li><span aria-current="page">${esc(it.name)}</span></li>` : `<li><a href="${esc(it.href)}">${esc(it.name)}</a></li>`)).join('\n        ')}
      </ol>
    </nav>`;
}

/** JSON-LD BreadcrumbList tương ứng; path là đường dẫn production của từng mục. */
export function breadcrumbSchema(ctx, items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: ctx.abs(it.path) })),
  };
}

/** Thẻ danh mục trong lưới catalogue. Danh mục chưa có ảnh hiển thị ô "Ảnh tạm". */
export function categoryTile(ctx, c, { sizes, className = '' }) {
  const { t, copy } = ctx;
  const media = c.image
    ? image(ctx, c.image, { sizes })
    : `<div class="tile__placeholder"><span class="tile__ph-label">${esc(t(copy.ui.placeholder))}</span><span class="tile__ph-code" aria-hidden="true">${esc(t(c.material))}</span></div>`;
  return `<li class="tile ${className}">
        <a href="${categoryHref(ctx, c)}">
          <div class="tile__media">${media}</div>
          <p class="tile__name">${esc(t(c.name))}</p>
          <p class="tile__meta">${esc(t(c.material))}</p>
        </a>
      </li>`;
}

/** Thẻ bài viết hoặc sản phẩm trong danh sách. */
export function postCard(ctx, p, { headingLevel = 3, showDate = false } = {}) {
  const h = `h${headingLevel}`;
  const date = showDate ? `<p class="card__meta"><time datetime="${p.published}">${formatDate(p.published)}</time></p>` : '';
  return `<li class="card">
        <a class="card__media" href="${ctx.href(p.url)}" tabindex="-1" aria-hidden="true">${image(ctx, { src: p.image, alt: '' }, { sizes: '(min-width: 64rem) 25vw, (min-width: 36rem) 50vw, 100vw', alt: '' })}</a>
        <div class="card__body">
          ${date}
          <${h} class="card__title"><a href="${ctx.href(p.url)}">${esc(p.name)}</a></${h}>
          <p>${esc(p.summary)}</p>
        </div>
      </li>`;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// Chrome biên dịch thuộc tính pattern với cờ "v": ( ) - trong lớp ký tự phải escape.
// Viết bằng String.raw để dấu \ không bị template literal nuốt mất.
const PHONE_PATTERN = String.raw`[0-9+ .\(\)\-]{9,16}`;

export function quoteForm(ctx, { idPrefix = 'q' } = {}) {
  const { t, copy, site } = ctx;
  const f = copy.quote.fields;
  const req = ` <span class="field__req">(${esc(t(f.required))})</span>`;
  const id = (name) => `${idPrefix}-${name}`;
  const field = (name, label, control, { required = false, hint } = {}) => `<div class="field" data-field="${name}">
          <label for="${id(name)}">${esc(t(label))}${required ? req : ''}</label>
          ${control}
          ${hint ? `<p class="field__hint" id="${id(name)}-hint">${esc(t(hint))}</p>` : ''}
          <p class="field__error" id="${id(name)}-error" hidden></p>
        </div>`;
  const describedBy = (name, hint) => `aria-describedby="${hint ? `${id(name)}-hint ` : ''}${id(name)}-error"`;
  const options = site.categories.map((c) => `<option value="${c.id}">${esc(t(c.name))}</option>`).join('');
  // Thông báo lỗi và trạng thái được nhúng sẵn để JS không phải chứa chữ của từng ngôn ngữ.
  const messages = {
    errors: Object.fromEntries(Object.entries(copy.quote.errors).map(([k, v]) => [k, t(v)])),
    status: Object.fromEntries(Object.entries(copy.quote.status).map(([k, v]) => [k, t(v)])),
  };
  return `<form class="quote-form" method="post" action="${esc(ctx.endpoint)}" novalidate data-quote-form data-messages="${esc(JSON.stringify(messages))}">
        <input type="hidden" name="lang" value="${ctx.lang}">
        <div class="quote-form__grid">
          ${field('name', f.name, `<input id="${id('name')}" name="name" type="text" autocomplete="name" required maxlength="120" ${describedBy('name')}>`, { required: true })}
          ${field('phone', f.phone, `<input id="${id('phone')}" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="${PHONE_PATTERN}" ${describedBy('phone')}>`, { required: true })}
          ${field('company', f.company, `<input id="${id('company')}" name="company" type="text" autocomplete="organization" maxlength="160">`)}
          ${field('product', f.product, `<select id="${id('product')}" name="product"><option value="">${esc(t(f.productNone))}</option>${options}<option value="khac">${esc(t(f.productOther))}</option></select>`)}
          ${field('quantity', f.quantity, `<input id="${id('quantity')}" name="quantity" type="text" maxlength="120" ${describedBy('quantity', true)}>`, { hint: f.quantityHint })}
        </div>
        ${field('message', f.message, `<textarea id="${id('message')}" name="message" rows="4" required maxlength="3000" ${describedBy('message', true)}></textarea>`, { required: true, hint: f.messageHint })}
        <div class="field field--check" data-field="consent">
          <input id="${id('consent')}" name="consent" type="checkbox" value="yes" required aria-describedby="${id('consent')}-error">
          <label for="${id('consent')}">${esc(t(f.consent))}</label>
          <p class="field__error" id="${id('consent')}-error" hidden></p>
        </div>
        <div class="quote-form__hp" aria-hidden="true"><label for="${id('website')}">Website</label><input id="${id('website')}" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn--primary btn--block" type="submit">${esc(t(copy.quote.submit))}</button>
        <p class="quote-form__status" role="status" aria-live="polite" data-form-status></p>
      </form>`;
}

export function siteFooter(ctx) {
  const { site, copy, t } = ctx;
  const f = copy.footer;
  const c = site.company;
  const companyLinks = [['about', f.about], ['services', f.services], ['news', f.news], ['careers', f.careers], ['contact', f.contactPage]]
    .map(([k, label]) => [ctx.url(k), label])
    .filter(([href]) => href)
    .map(([href, label]) => `<li><a href="${href}">${esc(t(label))}</a></li>`)
    .join('\n        ');
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div>
      <p class="site-footer__name">${esc(t(c.legalName))}</p>
      <address>${esc(t(c.address))}</address>
    </div>
    <nav aria-labelledby="ft-products">
      <h2 id="ft-products">${esc(t(f.products))}</h2>
      <ul>${site.categories.map((cat) => `<li><a href="${categoryHref(ctx, cat)}">${esc(t(cat.name))}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-labelledby="ft-company">
      <h2 id="ft-company">${esc(t(f.company))}</h2>
      <ul>
        ${companyLinks}
      </ul>
    </nav>
    <div>
      <h2>${esc(t(f.contact))}</h2>
      <ul>
        <li>${esc(t(f.hotline))}: <a href="tel:${c.phone.tel}">${esc(c.phone.display)}</a></li>
        <li>Zalo: <a href="${c.zalo}" rel="noopener">${esc(c.phone.display)}</a></li>
        ${c.email ? `<li>Email: <a href="mailto:${esc(c.email.value)}">${esc(c.email.value)}</a></li>` : ''}
        <li><a href="${c.facebook}" rel="noopener">Facebook</a></li>
      </ul>
    </div>
  </div>
  <div class="container site-footer__legal">
    <p>© ${new Date().getFullYear()} ${esc(t(c.legalName))}</p>
    ${ctx.lang === 'vi' ? `<a href="${ctx.href('/sitemap.xml')}">${esc(t(f.sitemap))}</a>` : ''}
  </div>
</footer>
<div class="contact-bar" role="group" aria-label="${esc(t(copy.ui.quickContact))}">
  <a href="tel:${c.phone.tel}">${icons.phone}<span>${esc(t(copy.ui.call))}</span></a>
  <a href="${c.zalo}" rel="noopener">Zalo</a>
  <a class="contact-bar__primary" href="${ctx.local(ctx.lang)}#bao-gia">${esc(t(copy.ui.quoteShort))}</a>
</div>`;
}
