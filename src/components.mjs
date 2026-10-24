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
  arrowUp: '<svg class="floating-btn__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>',
  facebook: '<svg class="floating-btn__icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  zalo: '<svg class="floating-btn__icon" viewBox="0 0 48 48" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M11 16h9c.6 0 1 .4 1 1 0 .3-.1.6-.4.8L13.8 27h6.2c.6 0 1 .4 1 1s-.4 1-1 1h-9c-.6 0-1-.4-1-1 0-.3.1-.6.4-.8l6.8-9.2H11c-.6 0-1-.4-1-1s.4-1 1-1zm14.5 4.5c2 0 3.5 1.5 3.5 3.5v5c0 .6-.4 1-1 1s-1-.4-1-1v-.8c-.7.6-1.6 1-2.5 1-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5c.9 0 1.8.4 2.5 1v-1.7c0-.9-.8-1.5-1.5-1.5-.6 0-1-.4-1-1s.4-1 1-1c.3 0 1.8 0 2 0zm-2 4.2c-1 0-1.8.7-1.8 1.8s.8 1.8 1.8 1.8 1.8-.7 1.8-1.8-.8-1.8-1.8-1.8zM29 14.5c.6 0 1 .4 1 1v13.5c0 .6-.4 1-1 1s-1-.4-1-1V15.5c0-.6.4-1 1-1zm6 6c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5zm0 2.2c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3z"/></svg>',
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
  const ui = copy.ui;
  const logo = resolveImage(ctx, site.images.logo.src).small;
  const landing = ctx.local(lang);
  // Trang một trang: mọi mục menu là liên kết neo. Trên trang 404 thì neo về trang chủ.
  const navItem = (n) => `<li><a class="nav__link" href="${landing}${n.href === '#top' ? '' : n.href}" data-nav="${n.href.slice(1)}">${esc(t(n.label))}</a></li>`;
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
      <a class="site-header__hotline" href="tel:${site.company.phone.tel}">${icons.phone}<span><small>${esc(t(copy.v3.slider.hotline))}</small>${esc(site.company.phone.display)}</span></a>
      <div class="lang-switch">
        ${['vi', 'en'].map((l) => (l === lang
          ? `<span class="lang-switch__item is-current" lang="${l}">${l.toUpperCase()}</span>`
          : `<a class="lang-switch__item" href="${ctx.local(l)}" hreflang="${l}" lang="${l}">${l.toUpperCase()}<span class="visually-hidden">: ${esc(t(ui.switchLangLabel))}</span></a>`)).join('<span class="lang-switch__sep" aria-hidden="true">|</span>')}
      </div>
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
  const pl = f.placeholders || {};
  const req = ` <span class="field__req" aria-hidden="true">*</span><span class="visually-hidden"> (${esc(t(f.required))})</span>`;
  const id = (name) => `${idPrefix}-${name}`;
  const field = (name, label, control, { required = false, hint, className = '' } = {}) => `<div class="field${className ? ` ${className}` : ''}" data-field="${name}">
          <label for="${id(name)}">${esc(t(label))}${required ? req : ''}</label>
          ${control}
          ${hint ? `<p class="field__hint" id="${id(name)}-hint">${esc(t(hint))}</p>` : ''}
          <p class="field__error" id="${id(name)}-error" hidden></p>
        </div>`;
  const describedBy = (name, hint) => `aria-describedby="${hint ? `${id(name)}-hint ` : ''}${id(name)}-error"`;
  
  // Danh sách dòng sản phẩm thực tế từ website
  const lines = (site.v3?.lines || []).filter((l) => l.id !== 'tui-khac');
  const lineValues = new Set(lines.map((l) => l.cat || l.id));
  const options = [
    ...lines.map((l) => [l.cat || l.id, l.name]),
    ...site.categories.filter((c) => !lineValues.has(c.id)).map((c) => [c.id, c.name]),
  ].map(([value, name]) => `<option value="${value}">${esc(t(name))}</option>`).join('');

  // Thông báo lỗi và trạng thái được nhúng sẵn để JS dùng chung cho song ngữ
  const messages = {
    errors: Object.fromEntries(Object.entries(copy.quote.errors).map(([k, v]) => [k, t(v)])),
    status: Object.fromEntries(Object.entries(copy.quote.status).map(([k, v]) => [k, t(v)])),
  };

  return `<form class="quote-form" method="post" action="${esc(ctx.endpoint)}" novalidate data-quote-form data-messages="${esc(JSON.stringify(messages))}">
        <input type="hidden" name="lang" value="${ctx.lang}">
        <div class="quote-form__grid">
          ${field('name', f.name, `<input id="${id('name')}" name="name" type="text" autocomplete="name" required maxlength="120" placeholder="${esc(t(pl.name))}" ${describedBy('name')}>`, { required: true })}
          ${field('phone', f.phone, `<input id="${id('phone')}" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="${PHONE_PATTERN}" placeholder="${esc(t(pl.phone))}" ${describedBy('phone')}>`, { required: true })}
          ${field('company', f.company, `<input id="${id('company')}" name="company" type="text" autocomplete="organization" maxlength="160" placeholder="${esc(t(pl.company))}">`)}
          ${field('email', f.email, `<input id="${id('email')}" name="email" type="email" autocomplete="email" maxlength="160" placeholder="${esc(t(pl.email))}" ${describedBy('email')}>`)}
          ${field('product', f.product, `<select id="${id('product')}" name="product"><option value="">${esc(t(f.productNone))}</option>${options}<option value="khac">${esc(t(f.productOther))}</option></select>`)}
          ${field('quantity', f.quantity, `<input id="${id('quantity')}" name="quantity" type="text" maxlength="120" placeholder="${esc(t(pl.quantity))}" ${describedBy('quantity', true)}>`, { hint: f.quantityHint })}
        </div>
        ${field('message', f.message, `<textarea id="${id('message')}" name="message" rows="4" required maxlength="3000" placeholder="${esc(t(pl.message))}" ${describedBy('message', true)}></textarea>`, { required: true, hint: f.messageHint, className: 'field--full' })}
        ${f.fileNotice ? `<div class="field field--full field--notice"><p class="field__notice"><svg class="icon icon--info" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>${esc(t(f.fileNotice))}</span></p></div>` : ''}
        <div class="field field--check field--full" data-field="consent">
          <input id="${id('consent')}" name="consent" type="checkbox" value="yes" required aria-describedby="${id('consent')}-error">
          <label for="${id('consent')}">${esc(t(f.consent))}${req}</label>
          <p class="field__error" id="${id('consent')}-error" hidden></p>
        </div>
        <div class="quote-form__hp" aria-hidden="true"><label for="${id('website')}">Website</label><input id="${id('website')}" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn--primary btn--rfq btn--block" type="submit">
          <span class="btn__spinner" aria-hidden="true"></span>
          <span class="btn__text">${esc(t(copy.quote.submit))}</span>
        </button>
        <p class="quote-form__status" role="status" aria-live="polite" data-form-status></p>
      </form>`;
}

export function siteFooter(ctx) {
  const { site, copy, t, lang } = ctx;
  const f = copy.footer;
  const c = site.company;
  const logo = resolveImage(ctx, site.images.logo.src).small;
  const landing = ctx.local(lang);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.v3?.mapQuery || 'Số 16 Khu Đường Tàu, Như Quỳnh, Hưng Yên')}`;

  // 4 danh mục sản phẩm chính từ dữ liệu thực tế
  const prioritySlugs = ['hat-xoai', 'niem-phong', 'sieu-thi', 'ep-quai'];
  const productLines = (site.v3?.lines || []).filter((l) => prioritySlugs.includes(l.id));

  return `<footer class="site-footer">
  <div class="container site-footer__main">
    <div class="site-footer__grid">
      <!-- Cột 1: Thương hiệu -->
      <div class="site-footer__col site-footer__col--brand">
        <a class="site-footer__logo-link" href="${landing}" aria-label="${esc(t(c.brand))}">
          <img class="site-footer__logo" src="${ctx.asset(logo.file)}" width="${logo.width}" height="${logo.height}" alt="${esc(t(c.brand))}">
          <span class="site-footer__brand-text">${esc(t(c.brand))}</span>
        </a>
        <p class="site-footer__legal-name">${esc(t(c.legalName))}</p>
        <p class="site-footer__desc">${esc(t(f.desc))}</p>
      </div>

      <!-- Cột 2: Khám phá -->
      <div class="site-footer__col">
        <h3 class="site-footer__title">${esc(t(f.navTitle))}</h3>
        <nav class="site-footer__nav" aria-label="${esc(t(f.navTitle))}">
          <ul class="site-footer__list">
            <li><a href="${landing}#ve-chung-toi">${esc(t(f.about))}</a></li>
            <li><a href="${landing}#san-pham">${esc(t(f.productsTitle))}</a></li>
            <li><a href="${landing}#quy-trinh">${esc(t(f.process))}</a></li>
            <li><a href="${landing}#lien-he">${esc(t(f.rfq))}</a></li>
          </ul>
        </nav>
      </div>

      <!-- Cột 3: Sản phẩm -->
      <div class="site-footer__col">
        <h3 class="site-footer__title">${esc(t(f.productsTitle))}</h3>
        <nav class="site-footer__nav" aria-label="${esc(t(f.productsTitle))}">
          <ul class="site-footer__list">
            ${productLines.map((l) => `<li><a href="${landing}#${l.id}">${esc(t(l.name))}</a></li>`).join('\n            ')}
            <li class="site-footer__all-link"><a href="${landing}#san-pham"><strong>${esc(t(f.allProducts))} →</strong></a></li>
          </ul>
        </nav>
      </div>

      <!-- Cột 4: Liên hệ -->
      <div class="site-footer__col site-footer__col--contact">
        <h3 class="site-footer__title">${esc(t(f.contactTitle))}</h3>
        <ul class="site-footer__list site-footer__list--contact">
          <li>
            <span class="site-footer__contact-lbl">${esc(t(f.hotline))}</span>
            <div class="site-footer__hotline-row">
              <a class="site-footer__hotline-num" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a>
              <span class="site-footer__sep" aria-hidden="true">·</span>
              <a class="site-footer__zalo-link" href="${c.zalo}" target="_blank" rel="noopener noreferrer">Zalo</a>
            </div>
          </li>
          ${c.email ? `<li>
            <span class="site-footer__contact-lbl">${esc(t(f.email))}</span>
            <a href="mailto:${esc(c.email.value)}">${esc(c.email.value)}</a>
          </li>` : ''}
          <li>
            <span class="site-footer__contact-lbl">${esc(t(f.factory))}</span>
            <address class="site-footer__address">${esc(t(c.address))}</address>
            <a class="site-footer__maps-link" href="${esc(mapsUrl)}" target="_blank" rel="noopener noreferrer">
              <span>${esc(t(f.openMaps))}</span> ↗
            </a>
          </li>
          ${c.facebook ? `<li>
            <a class="site-footer__social-link" href="${c.facebook}" target="_blank" rel="noopener noreferrer">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook Page</span>
            </a>
          </li>` : ''}
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom Bar: Bản quyền & Lên đầu trang -->
  <div class="site-footer__bottom">
    <div class="container site-footer__bottom-inner">
      <p class="site-footer__copy">© ${new Date().getFullYear()} ${esc(t(c.brand))}. ${esc(t(f.allRights))}</p>
      <div class="site-footer__bottom-actions">
        <button class="site-footer__back-top" type="button" data-scroll-top aria-label="${esc(t(f.backToTop))}">
          <span>${esc(t(f.backToTop))}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>
        </button>
      </div>
    </div>
  </div>
</footer>
<div class="contact-bar" role="group" aria-label="${esc(t(copy.ui.quickContact))}">
  <a href="tel:${c.phone.tel}">${icons.phone}<span>${esc(t(copy.ui.call))}</span></a>
  <a href="${c.zalo}" rel="noopener">Zalo</a>
  <a class="contact-bar__primary" href="${ctx.local(ctx.lang)}#bao-gia">${esc(t(copy.ui.quoteShort))}</a>
</div>
${floatingActions(ctx)}`;
}

export function floatingActions(ctx) {
  const { site, copy, t, lang } = ctx;
  const c = site.company;
  const ui = copy.ui;
  const zaloUrl = c.zalo || 'https://zalo.me/0983771565';
  const fbUrl = c.facebook || 'https://www.facebook.com/ctyhopphu.jsc/';
  const zaloLabel = t(ui.chatZalo) || 'Zalo: 0983 771 565';
  const fbLabel = t(ui.facebookPage) || 'Facebook Fanpage';
  const topLabel = t(ui.scrollToTop) || (lang === 'vi' ? 'Lên đầu trang' : 'Back to top');

  return `<div class="floating-actions" role="region" aria-label="${lang === 'vi' ? 'Liên hệ nhanh và tiện ích' : 'Quick contact and tools'}">
  <button class="floating-btn floating-btn--top" type="button" aria-label="${esc(topLabel)}" data-scroll-top title="${esc(topLabel)}">
    ${icons.arrowUp}
    <span class="floating-btn__tooltip">${esc(topLabel)}</span>
  </button>
  <a class="floating-btn floating-btn--facebook" href="${esc(fbUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(fbLabel)}" title="${esc(fbLabel)}">
    ${icons.facebook}
    <span class="floating-btn__tooltip">${esc(fbLabel)}</span>
  </a>
  <a class="floating-btn floating-btn--zalo" href="${esc(zaloUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(zaloLabel)}" title="${esc(zaloLabel)}">
    <span class="floating-btn__pulse" aria-hidden="true"></span>
    ${icons.zalo}
    <span class="floating-btn__tooltip">${esc(zaloLabel)}</span>
  </a>
</div>`;
}
