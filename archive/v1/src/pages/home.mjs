import { esc, button, image, sectionHeader, productCard, postItem, quoteForm } from '../components.mjs';

// Khớp với bề rộng thật của ảnh hero để trình duyệt chọn đúng bản 700w trên mobile.
export const HERO_SIZES = '(min-width: 56rem) 46vw, 92vw';

export const meta = {
  path: '/',
  title: 'Sản xuất bao bì nhựa, túi nilon HDPE, LDPE, PP | Hợp Phú',
  description:
    'Hợp Phú sản xuất túi nilon, màng bọc, bao lót HDPE, LDPE, PP, OPP theo kích thước, màu và mẫu in riêng. Nhà xưởng tại Như Quỳnh, Hưng Yên. Gửi yêu cầu báo giá ngay.',
  ogImage: '2021/08/CUON-1.jpg',
  alternates: { vi: '/', en: '/en/homepage-2/' },
};

/** JSON-LD chỉ chứa dữ liệu đã có trên site. Không có giá, đánh giá hay giờ mở cửa. */
export function schema(site) {
  const { company, origin } = site;
  const a = company.address;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: company.legalName,
        alternateName: company.brand,
        url: `${origin}/`,
        logo: { '@type': 'ImageObject', url: site.uploads + company.logo.src, width: company.logo.width, height: company.logo.height },
        telephone: company.phone.tel,
        ...(company.email ? { email: company.email } : {}),
        address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.locality, addressRegion: a.region, addressCountry: a.country },
        contactPoint: { '@type': 'ContactPoint', telephone: company.phone.tel, contactType: 'sales', availableLanguage: ['vi', 'en'] },
      },
      { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: company.brand, inLanguage: 'vi', publisher: { '@id': `${origin}/#organization` } },
      {
        '@type': 'WebPage',
        '@id': `${origin}/#webpage`,
        url: `${origin}/`,
        name: meta.title,
        description: meta.description,
        inLanguage: 'vi',
        isPartOf: { '@id': `${origin}/#website` },
        about: { '@id': `${origin}/#organization` },
        primaryImageOfPage: { '@type': 'ImageObject', url: site.uploads + meta.ogImage },
      },
    ],
  };
}

export function render(site) {
  const { company, hero, materials, categories, reasons, process, products, customers, posts } = site;
  const a = company.address;

  return `<main id="noi-dung">
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__inner">
      <div class="hero__copy">
        <h1 id="hero-title">Sản xuất bao bì nhựa và túi nilon theo quy cách của doanh nghiệp bạn</h1>
        <p class="hero__lead">${esc(company.legalName)} sản xuất túi nilon, màng bọc, túi xốp và bao lót từ HDPE, LDPE, PP, OPP. Kích thước, màu sắc và nội dung in làm theo yêu cầu.</p>
        <div class="hero__actions">
          ${button({ label: 'Yêu cầu báo giá', href: '#bao-gia' })}
          ${button({ label: 'Xem sản phẩm', href: '/san-pham/', variant: 'secondary' })}
        </div>
      </div>
      <figure class="hero__media">
        ${image(site, hero.image, { sizes: HERO_SIZES, priority: true })}
        <figcaption>${esc(hero.caption)}</figcaption>
      </figure>
    </div>
    <div class="container">
      <dl class="materials" aria-label="Chất liệu Hợp Phú đang sản xuất">
        ${materials.map((m) => `<div class="materials__item">
          <dt><abbr title="${esc(m.name)}">${esc(m.code)}</abbr></dt>
          <dd>${esc(m.trait)} <span class="materials__uses">${esc(m.uses)}.</span></dd>
        </div>`).join('\n        ')}
      </dl>
    </div>
  </section>

  <section class="section intro" aria-labelledby="gioi-thieu">
    <div class="container intro__grid">
      <h2 id="gioi-thieu">Nhà sản xuất bao bì nhựa tại Như Quỳnh, Hưng Yên</h2>
      <div class="intro__body">
        <p>Hợp Phú sản xuất bao bì nhựa cho các doanh nghiệp chế biến thực phẩm, dược phẩm, hoá mỹ phẩm, may mặc và bán lẻ. Công ty làm việc theo phương châm trách nhiệm, uy tín, đổi mới, và xây dựng thương hiệu trên sự hài lòng của khách hàng.</p>
        <p>Dây chuyền dùng máy móc nhập khẩu, được cải tiến liên tục để giảm phế phẩm và hàng lỗi. Mỗi lô hàng được kiểm soát chất lượng trước khi giao.</p>
        <p><a class="text-link" href="/ve-chung-toi/">Tìm hiểu về Hợp Phú</a></p>
      </div>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="danh-muc">
    <div class="container">
      ${sectionHeader({ id: 'danh-muc', title: 'Danh mục sản phẩm', lead: 'Tám dòng bao bì đang sản xuất, kèm chất liệu và quy cách thông dụng. Mọi thông số đều có thể làm theo yêu cầu riêng.' })}
      <div class="spec-table-wrap">
        <table class="spec-table">
          <thead>
            <tr><th scope="col">Dòng sản phẩm</th><th scope="col">Chất liệu</th><th scope="col">Quy cách thông dụng</th><th scope="col">Ứng dụng</th></tr>
          </thead>
          <tbody>
            ${categories.map((c) => `<tr>
              <th scope="row"><a href="${c.href}">${esc(c.name)}</a></th>
              <td data-label="Chất liệu">${esc(c.material)}</td>
              <td data-label="Quy cách">${esc(c.sizes)}</td>
              <td data-label="Ứng dụng">${esc(c.use)}</td>
            </tr>`).join('\n            ')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="ly-do">
    <div class="container reasons">
      ${sectionHeader({ id: 'ly-do', title: 'Vì sao doanh nghiệp chọn Hợp Phú' })}
      <dl class="reasons__list">
        ${reasons.map((r) => `<div class="reasons__item"><dt>${esc(r.title)}</dt><dd>${esc(r.body)}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </section>

  <section class="section section--dark" aria-labelledby="nang-luc">
    <div class="container">
      ${sectionHeader({ id: 'nang-luc', title: 'Từ hạt nhựa đến thành phẩm', lead: 'Sáu công đoạn của một đơn hàng bao bì tại Hợp Phú.' })}
      <ol class="process">
        ${process.map((s) => `<li class="process__step"><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></li>`).join('\n        ')}
      </ol>
      <p class="process__more"><a class="text-link text-link--light" href="/dich-vu/">Xem dịch vụ sản xuất và gia công</a></p>
    </div>
  </section>

  <section class="section" aria-labelledby="noi-bat">
    <div class="container">
      ${sectionHeader({ id: 'noi-bat', title: 'Sản phẩm nổi bật' })}
      <div class="product-grid">
      ${products.map((p) => productCard(site, p)).join('\n      ')}
      </div>
      <div class="section__actions">
        ${button({ label: 'Yêu cầu báo giá', href: '#bao-gia' })}
        ${button({ label: 'Xem tất cả sản phẩm', href: '/san-pham/', variant: 'secondary' })}
      </div>
    </div>
  </section>

  <section class="section section--alt customers" aria-labelledby="khach-hang">
    <div class="container customers__grid">
      <h2 id="khach-hang">Khách hàng và đối tác</h2>
      <ul class="customers__list">
        ${customers.names.map((n) => `<li>${esc(n)}</li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="kien-thuc">
    <div class="container news">
      ${sectionHeader({ id: 'kien-thuc', title: 'Kiến thức và tin tức' })}
      <ul class="post-list">
      ${posts.map(postItem).join('\n      ')}
      </ul>
      <p><a class="text-link" href="/category/tin-tuc/">Xem tất cả bài viết</a></p>
    </div>
  </section>

  <section class="section section--dark quote" id="bao-gia" aria-labelledby="bao-gia-title" tabindex="-1">
    <div class="container quote__grid">
      <div class="quote__intro">
        <h2 id="bao-gia-title">Yêu cầu báo giá</h2>
        <p>Cho chúng tôi biết loại túi, kích thước và số lượng bạn cần. Bộ phận kinh doanh sẽ liên hệ lại để tư vấn và báo giá.</p>
        <p class="quote__direct">Cần trao đổi ngay?<br>
          Gọi <a href="tel:${company.phone.tel}">${esc(company.phone.display)}</a> hoặc <a href="${company.zalo}" rel="noopener">nhắn Zalo</a>.</p>
        <address>${esc(a.street)}, ${esc(a.locality)}, ${esc(a.region)}</address>
      </div>
      ${quoteForm(site)}
    </div>
  </section>
</main>`;
}
