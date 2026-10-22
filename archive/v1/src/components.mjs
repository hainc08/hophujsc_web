// Các component giao diện dùng chung. Mỗi hàm nhận dữ liệu và trả về chuỗi HTML.
// Khi chuyển sang WordPress, mỗi hàm tương ứng một file trong template-parts/.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const dateFmt = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (iso) => dateFmt.format(new Date(iso + 'T00:00:00Z'));

const icons = {
  phone: '<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  menu: '<svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" d="M3 6h18M3 12h18M3 18h18"/></svg>',
  chevron: '<svg class="icon icon--chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.75" d="M2 4l4 4 4-4"/></svg>',
};

export function button({ label, href, variant = 'primary', attrs = '' }) {
  return `<a class="btn btn--${variant}" href="${esc(href)}" ${attrs}>${esc(label)}</a>`;
}

/** Ảnh có kích thước cố định để tránh layout shift. priority=true dành cho ảnh LCP. */
export function image(site, img, { sizes = '100vw', priority = false, className = '' } = {}) {
  const src = site.uploads + img.src;
  const srcset = img.srcSmall ? ` srcset="${site.uploads + img.srcSmall} 700w, ${src} ${img.width}w" sizes="${sizes}"` : '';
  const loading = priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img class="${className}" src="${src}"${srcset} width="${img.width}" height="${img.height}" alt="${esc(img.alt)}" ${loading}>`;
}

export function sectionHeader({ id, title, lead }) {
  return `<header class="section-header">
      <h2 id="${id}">${esc(title)}</h2>
      ${lead ? `<p class="section-header__lead">${esc(lead)}</p>` : ''}
    </header>`;
}

export function siteHeader(site, { currentPath = '/' } = {}) {
  const { company, nav, categories } = site;
  const item = (n, i) => {
    const current = n.href === currentPath ? ' aria-current="page"' : '';
    if (n.children !== 'categories') return `<li><a class="nav__link" href="${n.href}"${current}>${esc(n.label)}</a></li>`;
    return `<li class="nav__item--has-menu">
          <a class="nav__link" href="${n.href}"${current}>${esc(n.label)}</a>
          <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="submenu-${i}" aria-label="Mở danh mục ${esc(n.label.toLowerCase())}">${icons.chevron}</button>
          <ul class="nav__submenu" id="submenu-${i}">
            ${categories.map((c) => `<li><a href="${c.href}">${esc(c.name)}</a></li>`).join('\n            ')}
          </ul>
        </li>`;
  };
  return `<a class="skip-link" href="#noi-dung">Bỏ qua, đến nội dung chính</a>
<header class="site-header" data-site-header>
  <div class="container site-header__inner">
    <a class="site-header__brand" href="/" aria-label="${esc(company.brand)}, về trang chủ">
      <img src="${site.uploads + company.logo.src}" width="${company.logo.width}" height="${company.logo.height}" alt="">
      <span class="site-header__name">${esc(company.shortName)}</span>
    </a>
    <button class="site-header__menu-btn" type="button" aria-expanded="false" aria-controls="menu-chinh" data-menu-toggle>
      ${icons.menu}<span class="visually-hidden">Menu</span>
    </button>
    <nav class="nav" id="menu-chinh" aria-label="Điều hướng chính" data-menu>
      <ul class="nav__list">
        ${nav.map(item).join('\n        ')}
      </ul>
      <div class="nav__actions">
        <a class="nav__phone" href="tel:${company.phone.tel}">${icons.phone}<span>${esc(company.phone.display)}</span></a>
        <a class="nav__lang" href="/en/homepage-2/" hreflang="en" lang="en">English</a>
        ${button({ label: 'Yêu cầu báo giá', href: '#bao-gia' })}
      </div>
    </nav>
  </div>
</header>`;
}

export function productCard(site, p) {
  return `<article class="product-card">
        <a class="product-card__media" href="${p.href}" tabindex="-1" aria-hidden="true">
          ${image(site, p.image, { sizes: '(min-width: 72rem) 18rem, (min-width: 40rem) 45vw, 92vw' })}
        </a>
        <div class="product-card__body">
          <p class="product-card__material">${esc(p.material)}</p>
          <h3><a href="${p.href}">${esc(p.name)}</a></h3>
          <p>${esc(p.summary)}</p>
        </div>
      </article>`;
}

export function postItem(p) {
  return `<li class="post-item">
        <p class="post-item__meta"><span>${esc(p.topic)}</span> <time datetime="${p.date}">${formatDate(p.date)}</time></p>
        <h3><a href="${p.href}">${esc(p.title)}</a></h3>
      </li>`;
}

export function quoteForm(site) {
  const options = site.categories.map((c) => `<option>${esc(c.name)}</option>`).join('');
  const field = (id, label, control, { required = false, hint = '' } = {}) => `<div class="field">
          <label for="${id}">${label}${required ? ' <span class="field__req">(bắt buộc)</span>' : ''}</label>
          ${control}
          ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
          <p class="field__error" id="${id}-error" hidden></p>
        </div>`;
  return `<form class="quote-form" id="form-bao-gia" method="post" action="${esc(site.quoteForm.endpoint)}" novalidate data-quote-form>
        <div class="quote-form__grid">
          ${field('q-name', 'Họ tên', '<input id="q-name" name="name" type="text" autocomplete="name" required aria-describedby="q-name-error">', { required: true })}
          ${field('q-company', 'Công ty', '<input id="q-company" name="company" type="text" autocomplete="organization">')}
          ${field('q-phone', 'Số điện thoại', '<input id="q-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+ .()-]{9,16}" aria-describedby="q-phone-error">', { required: true })}
          ${field('q-email', 'Email', '<input id="q-email" name="email" type="email" autocomplete="email" aria-describedby="q-email-error">')}
          ${field('q-product', 'Loại sản phẩm', `<select id="q-product" name="product"><option value="">Chưa xác định</option>${options}<option>Khác</option></select>`)}
        </div>
        ${field('q-message', 'Yêu cầu chi tiết', '<textarea id="q-message" name="message" rows="5" required aria-describedby="q-message-hint q-message-error"></textarea>', { required: true, hint: 'Ví dụ: kích thước, độ dày, màu, số lượng, có in hay không.' })}
        <div class="quote-form__hp" aria-hidden="true"><label for="q-website">Website</label><input id="q-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <button class="btn btn--primary btn--block" type="submit">Gửi yêu cầu báo giá</button>
        <p class="quote-form__status" role="status" aria-live="polite" data-form-status></p>
      </form>`;
}

export function siteFooter(site) {
  const { company, categories, nav, policies } = site;
  const a = company.address;
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__company">
      <p class="site-footer__name">${esc(company.legalName)}</p>
      <address>
        ${esc(a.street)}, ${esc(a.locality)}, ${esc(a.region)}<br>
        Hotline: <a href="tel:${company.phone.tel}">${esc(company.phone.display)}</a><br>
        ${company.email ? `Email: <a href="mailto:${esc(company.email)}">${esc(company.email)}</a><br>` : ''}
        Zalo: <a href="${company.zalo}" rel="noopener">${esc(company.phone.display)}</a>
      </address>
    </div>
    <nav aria-labelledby="ft-sp">
      <h2 id="ft-sp">Danh mục sản phẩm</h2>
      <ul>${categories.map((c) => `<li><a href="${c.href}">${esc(c.name)}</a></li>`).join('')}</ul>
    </nav>
    <nav aria-labelledby="ft-ct">
      <h2 id="ft-ct">Công ty</h2>
      <ul>
        <li><a href="/">Trang chủ</a></li>
        ${nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}
        ${policies.map((p) => `<li><a href="${p.href}">${esc(p.label)}</a></li>`).join('')}
        <li><a href="/sitemap_index.xml">Sơ đồ trang</a></li>
      </ul>
    </nav>
  </div>
  <div class="container site-footer__legal">
    <p>© ${new Date().getFullYear()} ${esc(company.legalName)}.</p>
  </div>
</footer>
<div class="contact-bar" role="group" aria-label="Liên hệ nhanh">
  <a href="tel:${company.phone.tel}">${icons.phone}<span>Gọi</span></a>
  <a href="${company.zalo}" rel="noopener">Zalo</a>
  <a class="contact-bar__primary" href="#bao-gia">Báo giá</a>
</div>`;
}
