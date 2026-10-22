// Các trang nội dung tiếng Việt, giữ đúng URL của website WordPress cũ.
// Mỗi hàm trả về một "page": { lang, path, meta, schema(ctx), body(ctx) }.
// Chữ lấy từ src/content/pages.json (trang tĩnh) và src/content/posts.json (sản phẩm, bài viết).
import { esc, image, breadcrumbs, breadcrumbSchema, categoryTile, postCard, quoteForm, formatDate, resolveImage } from '../components.mjs';

const TILE_LAYOUT = ['tile--wide', 'tile--mid', 'tile--narrow', '', '', '', '', ''];
const TILE_SIZES = '(min-width: 64rem) 34vw, 50vw';

const orgRef = (ctx) => ({ '@id': `${ctx.site.origin}/#organization` });

function webPage(ctx, page, extra = {}) {
  return {
    '@type': 'WebPage',
    '@id': `${ctx.abs(page.path)}#webpage`,
    url: ctx.abs(page.path),
    name: page.meta.title,
    description: page.meta.description,
    inLanguage: 'vi',
    isPartOf: { '@id': `${ctx.site.origin}/#website` },
    ...extra,
  };
}

/** Khung chung của trang con: breadcrumb, tiêu đề, nội dung, và dải kêu gọi báo giá ở cuối. */
function shell(ctx, { crumbs, h1, lead, body, cta = true, quoteParam = '' }) {
  const p = ctx.pages.post;
  return `<main id="noi-dung">
  <div class="page-head">
    <div class="container">
      ${breadcrumbs(ctx, crumbs)}
      <h1>${esc(h1)}</h1>
      ${lead ? `<p class="page-head__lead">${esc(lead)}</p>` : ''}
    </div>
  </div>
  ${body}
  ${cta ? ctaBand(ctx, { title: quoteParam ? p.ctaTitle : p.ctaTitleGeneric, body: p.ctaBody, button: p.ctaButton, quoteParam }) : ''}
</main>`;
}

function ctaBand(ctx, { title, body, button, quoteParam }) {
  const c = ctx.site.company;
  const href = `${ctx.local('vi')}${quoteParam ? `?san-pham=${quoteParam}` : ''}#bao-gia`;
  return `<section class="cta-band" aria-labelledby="cta-title">
    <div class="container cta-band__inner">
      <div>
        <h2 id="cta-title">${esc(title)}</h2>
        <p>${esc(body)}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--primary" href="${href}">${esc(button)}</a>
        <a class="cta-band__phone" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a>
      </div>
    </div>
  </section>`;
}

function crumbsFor(ctx, items) {
  // items: [{ name, path }] -> thêm href theo base của bản dựng
  return items.map((it) => ({ ...it, href: ctx.href(it.path) }));
}

/** Nội dung bài viết từ posts.json: h2, đoạn văn, danh sách, ảnh. */
function renderBlocks(ctx, blocks, fallbackAlt) {
  return blocks
    .map((b) => {
      if (b.type === 'h2') return `<h2>${esc(b.text)}</h2>`;
      if (b.type === 'p') return `<p>${esc(b.text)}</p>`;
      if (b.type === 'list') return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
      if (b.type === 'img') return `<figure>${image(ctx, { src: b.src, alt: b.alt || fallbackAlt }, { sizes: '(min-width: 48rem) 42rem, 100vw' })}</figure>`;
      return '';
    })
    .join('\n        ');
}

// ---------- /san-pham/ ----------
export function catalogPage(data) {
  const { pages, posts, site } = data;
  const c = pages.catalog;
  const others = posts.filter((p) => p.kind === 'product' && !p.category);
  const page = {
    lang: 'vi',
    path: '/san-pham/',
    meta: { title: c.title, description: c.description, ogImage: site.images.film.src },
    crumbs: [{ name: pages.post.breadcrumbHome, path: '/' }, { name: pages.post.breadcrumbProducts, path: '/san-pham/' }],
  };
  page.schema = (ctx) => [webPage(ctx, page), breadcrumbSchema(ctx, page.crumbs)];
  page.body = (ctx) =>
    shell(ctx, {
      crumbs: crumbsFor(ctx, page.crumbs),
      h1: c.h1,
      lead: c.lead,
      body: `<section class="section section--tight" aria-label="${esc(c.h1)}">
    <div class="container">
      <ul class="catalogue">
      ${site.categories.map((cat, i) => categoryTile(ctx, cat, { sizes: TILE_SIZES, className: TILE_LAYOUT[i] })).join('\n      ')}
      </ul>
    </div>
  </section>
  <section class="section section--surface" aria-labelledby="sp-khac">
    <div class="container">
      <h2 id="sp-khac" class="section-title">${esc(c.otherTitle)}</h2>
      <ul class="cards">
      ${others.map((p) => postCard(ctx, p)).join('\n      ')}
      </ul>
    </div>
  </section>`,
    });
  return page;
}

// ---------- /category/<slug>/ ----------
export function categoryPages(data) {
  const { pages, posts, site } = data;
  return site.categories.map((cat) => {
    const info = pages.categories[cat.id];
    let items = posts.filter((p) => p.category === cat.id);
    // Danh mục chưa có bài riêng: hiển thị sản phẩm gần nhất về công dụng (túi siêu thị dùng cả cho thực phẩm).
    const related = items.length ? [] : posts.filter((p) => p.category === 'tui-sieu-thi');
    items = items.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'product' ? -1 : 1));
    const page = {
      lang: 'vi',
      path: cat.url.vi,
      meta: { title: info.title, description: info.intro.length > 160 ? info.intro.slice(0, 157).replace(/\s+\S*$/, '') + '…' : info.intro, ogImage: cat.image ? site.images[cat.image].src : site.images.film.src },
      crumbs: [{ name: pages.post.breadcrumbHome, path: '/' }, { name: pages.post.breadcrumbProducts, path: '/san-pham/' }, { name: cat.name.vi, path: cat.url.vi }],
    };
    page.schema = (ctx) => [webPage(ctx, page), breadcrumbSchema(ctx, page.crumbs)];
    page.body = (ctx) =>
      shell(ctx, {
        crumbs: crumbsFor(ctx, page.crumbs),
        h1: cat.name.vi,
        quoteParam: cat.id,
        body: `<section class="section section--tight" aria-label="${esc(cat.name.vi)}">
    <div class="container category">
      <div class="category__text">
        <p class="category__intro">${esc(info.intro)}</p>
        <dl class="category__facts">
          <div><dt>Chất liệu</dt><dd>${esc(ctx.t(cat.material))}</dd></div>
          <div><dt>Quy cách</dt><dd>Kích thước, màu, độ dày, nội dung in theo yêu cầu</dd></div>
        </dl>
        <div class="hero__actions">
          <a class="btn btn--primary" href="${ctx.local('vi')}?san-pham=${cat.id}#bao-gia">${esc(pages.post.ctaButton)}</a>
          <a class="btn btn--secondary" href="tel:${site.company.phone.tel}">${esc(site.company.phone.display)}</a>
        </div>
      </div>
      ${cat.image ? `<figure class="category__media">${image(ctx, cat.image, { sizes: '(min-width: 64rem) 40vw, 100vw', priority: true })}</figure>` : `<div class="category__media tile__placeholder"><span class="tile__ph-label">${esc(ctx.t(ctx.copy.ui.placeholder))}</span><span class="tile__ph-code" aria-hidden="true">${esc(ctx.t(cat.material))}</span></div>`}
    </div>
  </section>
  <section class="section section--surface" aria-labelledby="ds-${cat.id}">
    <div class="container">
      <h2 id="ds-${cat.id}" class="section-title">${items.length ? 'Sản phẩm và bài viết' : esc(pages.post.related)}</h2>
      <ul class="cards">
      ${(items.length ? items : related).map((p) => postCard(ctx, p)).join('\n      ')}
      </ul>
    </div>
  </section>`,
      });
    return page;
  });
}

// ---------- Sản phẩm, bài kiến thức, tin tức, tuyển dụng ----------
export function postPages(data) {
  const { pages, posts, site } = data;
  const P = pages.post;
  const catById = Object.fromEntries(site.categories.map((c) => [c.id, c]));
  return posts.map((p) => {
    const cat = p.category ? catById[p.category] : null;
    const isShop = p.kind === 'product' || p.kind === 'guide';
    const crumbs = [{ name: P.breadcrumbHome, path: '/' }];
    if (isShop) {
      crumbs.push({ name: P.breadcrumbProducts, path: '/san-pham/' });
      if (cat) crumbs.push({ name: cat.name.vi, path: cat.url.vi });
    } else if (p.kind === 'news') crumbs.push({ name: P.breadcrumbNews, path: '/category/tin-tuc/' });
    else crumbs.push({ name: P.breadcrumbJobs, path: '/category/tuyen-dung/' });
    crumbs.push({ name: p.name, path: p.url });

    // Title khoảng 50–65 ký tự: sản phẩm có hậu tố mô tả; bài viết cắt ở ranh giới từ nếu quá dài.
    const shorten = (s, n) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '').replace(/[\s,;:–-]+$/, '') + '…');
    const title = p.kind === 'product' ? `${p.name}: quy cách và báo giá | Hợp Phú` : `${shorten(p.h1.replace(/\s+Hợp Phú(?=\s*–)/, ''), 54)} | Hợp Phú`;
    const page = { lang: 'vi', path: p.url, meta: { title, description: p.summary, ogImage: p.image, type: p.kind === 'product' ? 'website' : 'article' }, crumbs };

    const sameGroup = posts.filter((o) => o.url !== p.url && (isShop ? (cat ? o.category === p.category : o.kind === 'product') : o.kind === p.kind));
    const fill = posts.filter((o) => o.url !== p.url && !sameGroup.includes(o) && (isShop ? o.kind === 'product' : o.kind === p.kind || o.kind === 'guide'));
    const related = [...sameGroup, ...fill].slice(0, 3);

    page.schema = (ctx) => {
      const imgUrl = ctx.abs('/assets/img/' + resolveImage(ctx, p.image).large.file);
      const nodes = [webPage(ctx, page, { primaryImageOfPage: { '@type': 'ImageObject', url: imgUrl } }), breadcrumbSchema(ctx, crumbs)];
      if (p.kind === 'guide' || p.kind === 'news') {
        nodes.push({
          '@type': 'BlogPosting',
          headline: p.h1,
          description: p.summary,
          image: imgUrl,
          datePublished: p.published,
          dateModified: p.modified,
          inLanguage: 'vi',
          mainEntityOfPage: { '@id': `${ctx.abs(p.url)}#webpage` },
          author: orgRef(ctx),
          publisher: orgRef(ctx),
        });
      }
      return nodes;
    };

    page.body = (ctx) => {
      const c = site.company;
      const dated = p.kind !== 'product';
      const aside =
        p.kind === 'job'
          ? `<aside class="post__aside"><p class="post__aside-title">${esc(P.jobApply)}</p><a class="quote__phone" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a><a class="text-link" href="${c.zalo}" rel="noopener">Zalo</a></aside>`
          : isShop
            ? `<aside class="post__aside" aria-label="${esc(P.ctaButton)}"><p class="post__aside-title">${esc(P.ctaTitle)}</p><p>${esc(P.ctaBody)}</p><a class="btn btn--primary btn--block" href="${ctx.local('vi')}${cat ? `?san-pham=${cat.id}` : ''}#bao-gia">${esc(P.ctaButton)}</a><a class="quote__phone" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a><a class="text-link" href="${c.zalo}" rel="noopener">Zalo</a></aside>`
            : '';
      // Ảnh đầu bài trùng ảnh đại diện thì bỏ, tránh lặp.
      // WordPress lưu cùng một ảnh dưới tên gốc và tên "-scaled", nên so sánh sau khi bỏ hậu tố này.
      const sameImage = (a, b) => a.replace(/-scaled(?=\.\w+$)/, '') === b.replace(/-scaled(?=\.\w+$)/, '');
      const blocks = p.blocks.filter((b) => !(b.type === 'img' && sameImage(b.src, p.image)));
      return shell(ctx, {
        crumbs: crumbsFor(ctx, crumbs),
        h1: p.h1,
        cta: p.kind !== 'job',
        quoteParam: cat ? cat.id : '',
        body: `<article class="section section--tight post">
    <div class="container post__grid">
      <div class="post__main">
        ${dated ? `<p class="post__meta">${esc(P.published)} <time datetime="${p.published}">${formatDate(p.published)}</time></p>` : ''}
        <figure class="post__media">${image(ctx, { src: p.image, alt: p.name }, { sizes: '(min-width: 64rem) 50vw, 100vw', priority: true })}</figure>
        <div class="prose">
        ${renderBlocks(ctx, blocks, p.name)}
        </div>
        ${cat ? `<p class="post__cat">${esc(P.inCategory)}: <a href="${ctx.href(cat.url.vi)}">${esc(cat.name.vi)}</a></p>` : ''}
      </div>
      ${aside}
    </div>
  </article>
  ${related.length ? `<section class="section section--surface" aria-labelledby="lien-quan">
    <div class="container">
      <h2 id="lien-quan" class="section-title">${esc(isShop ? P.related : P.relatedPosts)}</h2>
      <ul class="cards cards--3">
      ${related.map((o) => postCard(ctx, o, { showDate: !isShop })).join('\n      ')}
      </ul>
    </div>
  </section>` : ''}`,
      });
    };
    return page;
  });
}

// ---------- /category/tin-tuc/ và /category/tuyen-dung/ ----------
export function listPages(data) {
  const { pages, posts } = data;
  const byDate = (a, b) => b.published.localeCompare(a.published);
  const n = pages.news;
  const news = {
    lang: 'vi',
    path: '/category/tin-tuc/',
    meta: { title: n.title, description: n.description, ogImage: posts.find((p) => p.kind === 'guide').image },
    crumbs: [{ name: pages.post.breadcrumbHome, path: '/' }, { name: pages.post.breadcrumbNews, path: '/category/tin-tuc/' }],
  };
  news.schema = (ctx) => [webPage(ctx, news, { '@type': 'CollectionPage' }), breadcrumbSchema(ctx, news.crumbs)];
  news.body = (ctx) =>
    shell(ctx, {
      crumbs: crumbsFor(ctx, news.crumbs),
      h1: n.h1,
      body: `<section class="section section--tight" aria-labelledby="kien-thuc">
    <div class="container">
      <h2 id="kien-thuc" class="section-title">${esc(n.guidesTitle)}</h2>
      <ul class="cards">
      ${posts.filter((p) => p.kind === 'guide').sort(byDate).map((p) => postCard(ctx, p, { showDate: true })).join('\n      ')}
      </ul>
    </div>
  </section>
  <section class="section section--surface" aria-labelledby="tin-tuc">
    <div class="container">
      <h2 id="tin-tuc" class="section-title">${esc(n.newsTitle)}</h2>
      <ul class="cards">
      ${posts.filter((p) => p.kind === 'news').sort(byDate).map((p) => postCard(ctx, p, { showDate: true })).join('\n      ')}
      </ul>
    </div>
  </section>`,
    });

  const j = pages.jobs;
  const jobs = {
    lang: 'vi',
    path: '/category/tuyen-dung/',
    meta: { title: j.title, description: j.description, ogImage: posts.find((p) => p.kind === 'job').image },
    crumbs: [{ name: pages.post.breadcrumbHome, path: '/' }, { name: pages.post.breadcrumbJobs, path: '/category/tuyen-dung/' }],
  };
  jobs.schema = (ctx) => [webPage(ctx, jobs, { '@type': 'CollectionPage' }), breadcrumbSchema(ctx, jobs.crumbs)];
  jobs.body = (ctx) =>
    shell(ctx, {
      crumbs: crumbsFor(ctx, jobs.crumbs),
      h1: j.h1,
      cta: false,
      body: `<section class="section section--tight" aria-label="${esc(j.h1)}">
    <div class="container">
      <ul class="cards">
      ${posts.filter((p) => p.kind === 'job').sort(byDate).map((p) => postCard(ctx, p, { headingLevel: 2, showDate: true })).join('\n      ')}
      </ul>
    </div>
  </section>`,
    });
  return [news, jobs];
}

// ---------- /ve-chung-toi/, /dich-vu/, /lien-he/ ----------
export function companyPages(data) {
  const { pages, site } = data;
  const home = { name: pages.post.breadcrumbHome, path: '/' };

  const a = pages.about;
  const about = { lang: 'vi', path: '/ve-chung-toi/', meta: { title: a.title, description: a.description, ogImage: site.images.handleGroup.src }, crumbs: [home, { name: 'Về chúng tôi', path: '/ve-chung-toi/' }] };
  about.schema = (ctx) => [
    webPage(ctx, about, { '@type': 'AboutPage', about: orgRef(ctx) }),
    breadcrumbSchema(ctx, about.crumbs),
    // Lãnh đạo do chủ dự án xác nhận; gắn vào Organization qua @id.
    {
      '@type': 'Organization',
      '@id': `${site.origin}/#organization`,
      name: site.company.legalName.vi,
      url: `${site.origin}/`,
      founder: site.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.role })),
    },
  ];
  about.body = (ctx) => {
    const logo = (p, hidden) => {
      const m = resolveImage(ctx, p.logo).large;
      return `<li class="partners__item"${hidden ? ' aria-hidden="true"' : ''}><img src="${ctx.asset(m.file)}" width="${m.width}" height="${m.height}" alt="${hidden ? '' : esc(p.name)}" loading="lazy" decoding="async"></li>`;
    };
    return shell(ctx, {
      crumbs: crumbsFor(ctx, about.crumbs),
      h1: a.h1,
      body: `<section class="section section--tight" aria-labelledby="gt">
    <div class="container about">
      <div class="prose">
        <h2 id="gt">${esc(a.labels.intro)}</h2>
        ${a.intro.map((x) => `<p>${esc(x)}</p>`).join('\n        ')}
      </div>
      <figure class="about__media">${image(ctx, 'handleGroup', { sizes: '(min-width: 64rem) 40vw, 100vw' })}</figure>
    </div>
  </section>
  <section class="about-values" aria-label="${esc(a.labels.vision)}, ${esc(a.labels.mission)}, ${esc(a.labels.values)}">
    <div class="container">
      <div class="about-values__lead">
        <div><h2>${esc(a.labels.vision)}</h2><p>${esc(a.vision)}</p></div>
        <div><h2>${esc(a.labels.mission)}</h2><p>${esc(a.mission)}</p></div>
      </div>
      <h2 class="about-values__title">${esc(a.labels.values)}</h2>
      <ul class="about-values__list">
        ${a.values.map((v) => `<li>${esc(v)}</li>`).join('\n        ')}
      </ul>
    </div>
  </section>
  <section class="section" aria-labelledby="nsl">
    <div class="container">
      <h2 id="nsl" class="about-title">${esc(a.labels.founders)}</h2>
      <ul class="founders">
        ${site.founders.map((f) => `<li class="founders__item">${image(ctx, { src: f.image, alt: `${f.name}, ${f.role}` }, { sizes: '(min-width: 48rem) 30vw, 80vw' })}<p class="founders__name">${esc(f.name)}</p><p class="founders__role">${esc(f.role)}</p></li>`).join('\n        ')}
      </ul>
    </div>
  </section>
  <section class="section section--surface partners" aria-labelledby="dt">
    <div class="container">
      <h2 id="dt" class="about-title">${esc(a.labels.partners)}</h2>
    </div>
    <div class="partners__viewport" tabindex="0" aria-label="${esc(a.labels.partners)}">
      <ul class="partners__track">
        ${site.partners.map((p) => logo(p, false)).join('\n        ')}
        ${site.partners.map((p) => logo(p, true)).join('\n        ')}
      </ul>
    </div>
  </section>`,
    });
  };

  const s = pages.services;
  const services = { lang: 'vi', path: '/dich-vu/', meta: { title: s.title, description: s.description, ogImage: site.images.seal.src }, crumbs: [home, { name: 'Dịch vụ', path: '/dich-vu/' }] };
  services.schema = (ctx) => [webPage(ctx, services), breadcrumbSchema(ctx, services.crumbs)];
  services.body = (ctx) =>
    shell(ctx, {
      crumbs: crumbsFor(ctx, services.crumbs),
      h1: s.h1,
      body: `<section class="section section--tight" aria-labelledby="lv">
    <div class="container">
      <h2 id="lv" class="section-title">${esc(s.areasTitle)}</h2>
      <ul class="industries industries--2">
        ${s.areas.map((x) => `<li class="industries__item"><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></li>`).join('\n        ')}
      </ul>
    </div>
  </section>
  <section class="section section--surface" aria-labelledby="dv">
    <div class="container">
      <h2 id="dv" class="section-title">${esc(s.featuresTitle)}</h2>
      <ul class="industries industries--3">
        ${s.features.map((x) => `<li class="industries__item"><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></li>`).join('\n        ')}
      </ul>
    </div>
  </section>`,
    });

  const k = pages.contact;
  const contact = { lang: 'vi', path: '/lien-he/', meta: { title: k.title, description: k.description, ogImage: site.images.hero.src }, crumbs: [home, { name: 'Liên hệ', path: '/lien-he/' }] };
  contact.schema = (ctx) => [webPage(ctx, contact, { '@type': 'ContactPage', about: orgRef(ctx) }), breadcrumbSchema(ctx, contact.crumbs)];
  contact.body = (ctx) => {
    const c = site.company;
    return shell(ctx, {
      crumbs: crumbsFor(ctx, contact.crumbs),
      h1: k.h1,
      lead: k.lead,
      cta: false,
      body: `<section class="section section--tight" aria-label="${esc(k.h1)}">
    <div class="container quote__grid">
      <dl class="contact-list">
        <div><dt>${esc(k.labels.phone)}</dt><dd><a class="quote__phone" href="tel:${c.phone.tel}">${esc(c.phone.display)}</a></dd></div>
        <div><dt>${esc(k.labels.zalo)}</dt><dd><a href="${c.zalo}" rel="noopener">${esc(c.phone.display)}</a></dd></div>
        ${c.email ? `<div><dt>${esc(k.labels.email)}</dt><dd><a href="mailto:${esc(c.email.value)}">${esc(c.email.value)}</a></dd></div>` : ''}
        <div><dt>${esc(k.labels.address)}</dt><dd>${esc(c.address.vi)}</dd></div>
        <div><dt>${esc(k.labels.facebook)}</dt><dd><a href="${c.facebook}" rel="noopener">facebook.com/ctyhopphu.jsc</a></dd></div>
      </dl>
      ${quoteForm(ctx, { idPrefix: 'c' })}
    </div>
  </section>`,
    });
  };
  return [about, services, contact];
}

// ---------- 404 ----------
export function notFoundPage(data) {
  const n = data.pages.notFound;
  const page = { lang: 'vi', path: '/404.html', file: '404.html', meta: { title: n.title, description: n.body, ogImage: data.site.images.hero.src, noindex: true } };
  page.schema = () => [];
  page.body = (ctx) => `<main id="noi-dung">
  <div class="page-head page-head--center">
    <div class="container">
      <h1>${esc(n.h1)}</h1>
      <p class="page-head__lead">${esc(n.body)}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="${ctx.local('vi')}">${esc(n.home)}</a>
        <a class="btn btn--secondary" href="${ctx.href('/san-pham/')}">${esc(n.products)}</a>
      </div>
    </div>
  </div>
</main>`;
  return page;
}
