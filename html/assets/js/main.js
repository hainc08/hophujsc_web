// Hành vi giao diện: menu mobile, mục menu đang xem, modal sản phẩm, hiệu ứng xuất hiện, form báo giá.
// Chữ hiển thị của form lấy từ data-messages để dùng chung cho bản Việt và Anh.
(() => {
  'use strict';

  // ----- Menu mobile -----
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const setMenu = (open) => {
    menu.toggleAttribute('data-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!menu.hasAttribute('data-open')));
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && menu.hasAttribute('data-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // ----- Menu: đánh dấu mục đang xem khi cuộn -----
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const sections = navLinks.map((a) => document.getElementById(a.dataset.nav)).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const setCurrent = (id) => navLinks.forEach((a) => (a.dataset.nav === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    // Một mục được coi là "đang xem" khi nó cắt qua dải ngang ở khoảng 35% chiều cao màn hình
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setCurrent(en.target.id); });
    }, { rootMargin: '-35% 0px -64% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // ----- Modal chi tiết dòng sản phẩm (dialog gốc của trình duyệt) -----
  document.querySelectorAll('[data-dialog-open]').forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.dialogOpen);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    btn.addEventListener('click', () => dialog.showModal());
    // Đóng xong thì trả focus về đúng ô sản phẩm vừa mở
    dialog.addEventListener('close', () => {
      if (!dialog.dataset.toQuote) btn.focus({ preventScroll: true });
      delete dialog.dataset.toQuote;
    });
  });
  document.querySelectorAll('dialog.sheet').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      // Bấm ra vùng nền mờ hoặc nút đóng thì đóng modal
      if (e.target === dialog || e.target.closest('[data-dialog-close]')) dialog.close();
    });
    dialog.querySelectorAll('[data-quote-line]').forEach((a) => {
      a.addEventListener('click', () => {
        const select = document.querySelector('[data-quote-form] select[name="product"]');
        if (select && [...select.options].some((o) => o.value === a.dataset.quoteLine)) select.value = a.dataset.quoteLine;
        dialog.dataset.toQuote = '1';
        dialog.close();
      });
    });
  });

  // ----- Danh mục sản phẩm (brief HP-09) -----
  // 6 thẻ đầu hiện sẵn, "Xem tất cả" mở các thẻ còn lại. Mỗi dòng có địa chỉ riêng #<mã dòng>:
  // mở modal thì địa chỉ đổi theo, mở link #<mã dòng> thì tự cuộn tới và mở đúng modal.
  const catalog = document.querySelector('[data-catalog]');
  if (catalog) {
    const allBtn = document.querySelector('[data-catalog-all]');
    document.documentElement.classList.add('has-catalog-js');
    const expand = () => {
      catalog.classList.add('is-expanded');
      if (allBtn) {
        allBtn.setAttribute('aria-expanded', 'true');
        allBtn.closest('p').hidden = true;
      }
    };
    if (allBtn) {
      allBtn.closest('p').classList.add('has-js');
      allBtn.addEventListener('click', () => {
        expand();
        const first = catalog.querySelector('.pcard--more .pcard__link');
        if (first) first.focus();
      });
    }

    const base = () => location.pathname + location.search;
    catalog.querySelectorAll('.pcard').forEach((card) => {
      const dialog = document.getElementById(`line-${card.id}`);
      if (!dialog) return;
      card.querySelector('[data-dialog-open]').addEventListener('click', () => history.replaceState(null, '', `${base()}#${card.id}`));
      dialog.addEventListener('close', () => {
        if (location.hash === `#${card.id}`) history.replaceState(null, '', `${base()}#san-pham`);
      });
    });

    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const card = id && catalog.querySelector(`.pcard[id="${CSS.escape(id)}"]`);
      const dialog = card && document.getElementById(`line-${id}`);
      if (!dialog || dialog.open || typeof dialog.showModal !== 'function') return;
      if (card.classList.contains('pcard--more')) expand();
      card.scrollIntoView({ block: 'center' });
      dialog.showModal();
    };
    openFromHash();
    addEventListener('hashchange', openFromHash);
  }

  // ----- Hero slider (brief HP-04D) -----
  // Nhịp tự chuyển do chính animation của thanh tiến trình quyết định (animationend -> slide sau),
  // nên khi tạm dừng thì thanh và nhịp dừng cùng lúc. Tạm dừng khi: rê chuột, focus bên trong,
  // tab bị ẩn, hoặc người dùng bấm nút dừng. Người dùng bật giảm chuyển động: không tự chuyển.
  const slider = document.querySelector('[data-slider]');
  const slides = slider ? [...slider.querySelectorAll('[data-slide]')] : [];
  if (slides.length > 1) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = slider.querySelector('[data-slider-nav]');
    const dots = [...slider.querySelectorAll('[data-slider-dot]')];
    const counter = slider.querySelector('[data-slider-current]');
    const bar = slider.querySelector('[data-slider-progress]');
    const pauseBtn = slider.querySelector('[data-slider-pause]');
    const state = { user: reduce, hover: false, focus: false, hidden: document.hidden };
    let current = 0;
    slider.classList.add('has-js');

    // Ảnh slide 2, 3 chỉ tải sau khi trang đã hiện xong, để không tranh băng thông với ảnh slide đầu
    const loadRest = () => slider.querySelectorAll('img[data-src]').forEach((img) => {
      img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    if (document.readyState === 'complete') setTimeout(loadRest, 300);
    else addEventListener('load', () => setTimeout(loadRest, 300), { once: true });

    const paused = () => state.user || state.hover || state.focus || state.hidden;
    const sync = () => {
      slider.classList.toggle('is-paused', paused());
      slider.classList.toggle('is-user-paused', state.user);
      pauseBtn.setAttribute('aria-label', state.user ? pauseBtn.dataset.labelPlay : pauseBtn.dataset.labelPause);
    };
    const restartBar = () => {
      bar.classList.remove('is-running');
      void bar.offsetWidth; // ép trình duyệt chạy lại animation từ đầu
      if (!reduce) bar.classList.add('is-running');
    };
    const go = (i) => {
      const next = (i + slides.length) % slides.length;
      if (next === current) return;
      loadRest();
      slides[current].classList.remove('is-active');
      slides[current].inert = true;
      slides[next].classList.add('is-active');
      slides[next].inert = false;
      dots.forEach((d, k) => {
        d.classList.toggle('is-active', k === next);
        if (k === next) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
      counter.textContent = String(next + 1).padStart(2, '0');
      current = next;
      restartBar();
    };

    bar.addEventListener('animationend', () => go(current + 1));
    slider.querySelector('[data-slider-prev]').addEventListener('click', () => go(current - 1));
    slider.querySelector('[data-slider-next]').addEventListener('click', () => go(current + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    pauseBtn.hidden = reduce;
    pauseBtn.addEventListener('click', () => {
      state.user = !state.user;
      sync();
    });

    if (matchMedia('(hover: hover)').matches) {
      slider.addEventListener('pointerenter', () => { state.hover = true; sync(); });
      slider.addEventListener('pointerleave', () => { state.hover = false; sync(); });
    }
    slider.addEventListener('focusin', () => { state.focus = true; sync(); });
    slider.addEventListener('focusout', (e) => {
      if (!slider.contains(e.relatedTarget)) { state.focus = false; sync(); }
    });
    document.addEventListener('visibilitychange', () => { state.hidden = document.hidden; sync(); });

    // Phím mũi tên khi đang focus trong slider
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(current + 1);
      else if (e.key === 'ArrowLeft') go(current - 1);
    });

    // Vuốt ngang trên màn hình cảm ứng
    let startX = null;
    slider.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') startX = e.clientX; }, { passive: true });
    slider.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    sync();
    restartBar();
    // Từ khung hình sau mới bật chuyển động cho chữ và ảnh (slide đầu hiện ngay khi tải trang)
    requestAnimationFrame(() => requestAnimationFrame(() => slider.classList.add('is-ready')));
  }

  // ----- Hiệu ứng xuất hiện khi cuộn (CSS bỏ qua nếu người dùng giảm chuyển động) -----
  // Phần tử trong cùng một nhóm xuất hiện so le 90ms.
  document.querySelectorAll('[data-reveal-group]').forEach((g) => {
    g.querySelectorAll(':scope > [data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 90}ms`));
  });
  const revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  // ----- Form báo giá -----
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;
  const msg = JSON.parse(form.dataset.messages);
  const status = form.querySelector('[data-form-status]');

  // Chọn sẵn loại bao bì khi đến từ trang sản phẩm: ?san-pham=<id> hoặc ?product=<id>
  const params = new URLSearchParams(location.search);
  const pre = params.get('san-pham') || params.get('product');
  const select = form.elements.product;
  if (pre && select && [...select.options].some((o) => o.value === pre)) select.value = pre;

  const setError = (field, text) => {
    const error = form.querySelector(`#${field.id}-error`);
    if (text) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = text;
      error.hidden = !text;
    }
  };

  const validate = (field) => {
    const text = field.checkValidity() ? '' : msg.errors[field.name] || '';
    setError(field, text);
    return !text;
  };

  form.addEventListener('focusout', (e) => {
    if (e.target.matches('input, textarea') && e.target.type !== 'checkbox' && (e.target.required || e.target.value)) validate(e.target);
  });
  form.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') validate(e.target);
  });
  // Ô đang báo lỗi: kiểm tra lại ngay khi gõ, để lỗi biến mất lúc đang nhập
  // chứ không phải lúc rời ô (tránh form co lại đúng lúc người dùng bấm sang ô khác).
  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') validate(e.target);
  });

  const setStatus = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('[required]')];
    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      setStatus('error', msg.errors.summary.replace('{n}', invalid.length));
      invalid[0].focus();
      return;
    }
    if (form.elements.website.value) return; // trường bẫy bot

    const endpoint = form.getAttribute('action');
    if (!endpoint) {
      setStatus('error', msg.status.preview);
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    setStatus('pending', msg.status.pending);
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        form.reset();
        setStatus('success', msg.status.success);
      } else if (body.code === 'not_configured') {
        setStatus('error', msg.status.preview);
      } else if (body.code === 'rate_limited') {
        setStatus('error', msg.status.rateLimited);
      } else {
        throw new Error(String(res.status));
      }
    } catch {
      setStatus('error', msg.status.error);
    } finally {
      submit.disabled = false;
    }
  });
})();
