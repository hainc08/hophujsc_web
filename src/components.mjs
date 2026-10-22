// Component giao diện dùng chung. Mỗi hàm nhận ngữ cảnh ctx = { site, copy, lang, t, url, img }
// và trả về chuỗi HTML. Khi chuyển sang WordPress, mỗi hàm ứng với một file trong template-parts/.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Tạo ngữ cảnh dựng trang cho một ngôn ngữ. */
export function createContext(site, copy, lang, base = '/') {
  // t(): lấy chữ theo ngôn ngữ từ giá trị dạng { vi, en } hoặc chuỗi thường.
  const t = (v) => (v && typeof v === 'object' && lang in v ? v[lang] : v ?? '');
  // url(): liên kết tới trang đang có trên hopphujsc.com (landing page chưa thay các trang này).
  const url = (key) => site.origin + t(site.links[key]);
  // local(): đường dẫn tới trang của chính bản dựng này, có tính base (ví dụ /hophujsc_web/ trên GitHub Pages).
  // Canonical và hreflang vẫn dùng site.origin + site.paths vì trỏ về URL production.
  const local = (l) => base + site.paths[l].replace(/^\//, '');
  return { site, copy, lang, t, url, local, base, img: (key) => site.images[key] };
}

const icons = {
  phone: '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  menu: '<svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.75" d="M3 7h18M3 12h18M3 17h18"/></svg>',
  chevron: '<svg class="icon icon--chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M2 4l4 4 4-4"/></svg>',
};

export function button(label, href, variant = 'primary') {
  return `<a class="btn btn--${variant}" href="${esc(href)}">${esc(label)}</a>`;
}

/** Ảnh luôn có width/height/alt. priority dành cho ảnh LCP; các ảnh khác tải lười. */
export function image(ctx, key, { sizes = '100vw', priority = false, className = '' } = {}) {
  const im = ctx.img(key);
  const up = ctx.site.uploads;
  const srcset = im.small ? ` srcset="${up + im.small} ${im.smallWidth}w, ${up + im.src} ${im.width}w" sizes="${sizes}"` : '';
  const load = priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img${className ? ` class="${className}"` : ''} src="${up + im.src}"${srcset} width="${im.width}" height="${im.height}" alt="${esc(ctx.t(im.alt))}" ${load}>`;
}

export function sectionHeader(ctx, { id, title, lead, light = false }) {
  return `<header class="section-head${light ? ' section-head--light' : ''}">
      <h2 id="${id}">${esc(ctx.t(title))}</h2>
      ${lead ? `<p>${esc(ctx.t(lead))}</p>` : ''}
    </header>`;
}

export function siteHeader(ctx) {
  const { site, copy, t, lang } = ctx;
  const other = lang === 'vi' ? 'en' : 'vi';
  const ui = copy.ui;
  const navItem = (n) => {
    const href = n.link ? ctx.url(n.link) : n.href;
    if (!n.mega) return `<li><a class="nav__link" href="${esc(href)}">${esc(t(n.label))}</a></li>`;
    return `<li class="nav__item--mega">
          <a class="nav__link" href="${href}">${esc(t(n.label))}</a>
          <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mega" aria-label="${esc(t(ui.openProducts))}">${icons.chevron}</button>
          <div class="mega" id="mega">
            <ul class="mega__list">
              ${site.categories.map((c) => `<li><a href="${site.origin + t(c.url)}"><span>${esc(t(c.name))}</span><small>${esc(t(c.material))}</small></a></li>`).join('\n              ')}
            </ul>
            <a class="mega__all" href="${ctx.url('products')}">${esc(t(ui.allProducts))}</a>
          </div>
        </li>`;
  };
  return `<a class="skip-link" href="#noi-dung">${esc(t(ui.skip))}</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="${ctx.local(lang)}" aria-label="${esc(t(site.company.brand))}, ${esc(t(ui.home))}">
      <img src="${site.uploads + site.company.logo.src}" width="${site.company.logo.width}" height="${site.company.logo.height}" alt="">
      <span>${esc(t(site.company.shortName))}</span>
    </a>
    <nav class="nav" id="menu-chinh" aria-label="${lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}" data-menu>
      <ul class="nav__list">
        ${copy.nav.map(navItem).join('\n        ')}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="lang-switch" href="${ctx.local(other)}" hreflang="${other}">${other.toUpperCase()}<span class="visually-hidden">: ${esc(t(ui.switchLangLabel))}</span></a>
      <a class="btn btn--primary btn--sm site-header__cta" href="#bao-gia">${esc(t(ui.quote))}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-chinh" data-menu-toggle>
        ${icons.menu}<span class="visually-hidden">${esc(t(ui.menu))}</span>
      </button>
    </div>
  </div>
</header>`;
}

/** Thẻ danh mục trong lưới catalogue. Danh mục chưa có ảnh hiển thị ô "Ảnh tạm". */
export function categoryTile(ctx, c, { sizes, className = '' }) {
  const { t, site, copy } = ctx;
  const media = c.image
    ? image(ctx, c.image, { sizes })
    : `<div class="tile__placeholder"><span class="tile__ph-label">${esc(t(copy.ui.placeholder))}</span><span class="tile__ph-code" aria-hidden="true">${esc(t(c.material))}</span></div>`;
  return `<li class="tile ${className}">
        <a href="${site.origin + t(c.url)}">
          <div class="tile__media">${media}</div>
          <p class="tile__name">${esc(t(c.name))}</p>
          <p class="tile__meta">${esc(t(c.material))}</p>
        </a>
      </li>`;
}

// Chrome biên dịch thuộc tính pattern với cờ "v": ( ) - trong lớp ký tự phải escape.
// Viết bằng String.raw để dấu \ không bị template literal nuốt mất.
const PHONE_PATTERN = String.raw`[0-9+ .\(\)\-]{9,16}`;

export function quoteForm(ctx) {
  const { t, copy, site } = ctx;
  const f = copy.quote.fields;
  const req = ` <span class="field__req">(${esc(t(f.required))})</span>`;
  const field = (id, label, control, { required = false, hint } = {}) => `<div class="field" data-field="${id}">
          <label for="q-${id}">${esc(t(label))}${required ? req : ''}</label>
          ${control}
          ${hint ? `<p class="field__hint" id="q-${id}-hint">${esc(t(hint))}</p>` : ''}
          <p class="field__error" id="q-${id}-error" hidden></p>
        </div>`;
  const describedBy = (id, hint) => `aria-describedby="${hint ? `q-${id}-hint ` : ''}q-${id}-error"`;
  const options = site.categories.map((c) => `<option value="${c.id}">${esc(t(c.name))}</option>`).join('');
  // Thông báo lỗi và trạng thái được nhúng sẵn để JS không phải chứa chữ của từng ngôn ngữ.
  const messages = {
    errors: Object.fromEntries(Object.entries(copy.quote.errors).map(([k, v]) => [k, t(v)])),
    status: Object.fromEntries(Object.entries(copy.quote.status).map(([k, v]) => [k, t(v)])),
  };
  return `<form class="quote-form" method="post" action="${esc(site.quoteForm.endpoint)}" novalidate data-quote-form data-messages="${esc(JSON.stringify(messages))}">
        <div class="quote-form__grid">
          ${field('name', f.name, `<input id="q-name" name="name" type="text" autocomplete="name" required ${describedBy('name')}>`, { required: true })}
          ${field('phone', f.phone, `<input id="q-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="${PHONE_PATTERN}" ${describedBy('phone')}>`, { required: true })}
          ${field('company', f.company, '<input id="q-company" name="company" type="text" autocomplete="organization">')}
          ${field('product', f.product, `<select id="q-product" name="product"><option value="">${esc(t(f.productNone))}</option>${options}<option value="khac">${esc(t(f.productOther))}</option></select>`)}
          ${field('quantity', f.quantity, `<input id="q-quantity" name="quantity" type="text" ${describedBy('quantity', true)}>`, { hint: f.quantityHint })}
        </div>
        ${field('message', f.message, `<textarea id="q-message" name="message" rows="4" required ${describedBy('message', true)}></textarea>`, { required: true, hint: f.messageHint })}
        <div class="field field--check" data-field="consent">
          <input id="q-consent" name="consent" type="checkbox" required aria-describedby="q-consent-error">
          <label for="q-consent">${esc(t(f.consent))}</label>
          <p class="field__error" id="q-consent-error" hidden></p>
        </div>
        <div class="quote-form__hp" aria-hidden="true"><label for="q-website">Website</label><input id="q-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn--primary btn--block" type="submit">${esc(t(copy.quote.submit))}</button>
        <p class="quote-form__status" role="status" aria-live="polite" data-form-status></p>
      </form>`;
}

export function siteFooter(ctx) {
  const { site, copy, t } = ctx;
  const f = copy.footer;
  const c = site.company;
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div>
      <p class="site-footer__name">${esc(t(c.legalName))}</p>
      <address>${esc(t(c.address))}</address>
    </div>
    <nav aria-labelledby="ft-products">
      <h2 id="ft-products">${esc(t(f.products))}</h2>
      <ul>${site.categories.map((cat) => `<li><a href="${site.origin + t(cat.url)}">${esc(t(cat.name))}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-labelledby="ft-company">
      <h2 id="ft-company">${esc(t(f.company))}</h2>
      <ul>
        <li><a href="${ctx.url('about')}">${esc(t(f.about))}</a></li>
        <li><a href="${ctx.url('services')}">${esc(t(f.services))}</a></li>
        <li><a href="${ctx.url('news')}">${esc(t(f.news))}</a></li>
        <li><a href="${ctx.url('careers')}">${esc(t(f.careers))}</a></li>
        <li><a href="${ctx.url('contact')}">${esc(t(f.contactPage))}</a></li>
      </ul>
    </nav>
    <div id="lien-he">
      <h2>${esc(t(f.contact))}</h2>
      <ul>
        <li>${esc(t(f.hotline))}: <a href="tel:${c.phone.tel}">${esc(c.phone.display)}</a></li>
        <li>Zalo: <a href="${c.zalo}" rel="noopener">${esc(c.phone.display)}</a></li>
        <li><a href="${c.facebook}" rel="noopener">Facebook</a></li>
      </ul>
    </div>
  </div>
  <div class="container site-footer__legal">
    <p>© ${new Date().getFullYear()} ${esc(t(c.legalName))}</p>
    <a href="${site.origin}/sitemap_index.xml">${esc(t(f.sitemap))}</a>
  </div>
</footer>
<div class="contact-bar" role="group" aria-label="${esc(t(copy.ui.quickContact))}">
  <a href="tel:${c.phone.tel}">${icons.phone}<span>${esc(t(copy.ui.call))}</span></a>
  <a href="${c.zalo}" rel="noopener">Zalo</a>
  <a class="contact-bar__primary" href="#bao-gia">${esc(t(copy.ui.quoteShort))}</a>
</div>`;
}
