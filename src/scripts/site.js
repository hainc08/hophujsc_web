// Hành vi giao diện: menu mobile, mega menu, hiệu ứng xuất hiện, form báo giá.
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

  // ----- Mega menu: nút mũi tên cho bàn phím và màn hình cảm ứng -----
  const megaBtn = document.querySelector('.nav__toggle');
  if (megaBtn) {
    megaBtn.addEventListener('click', () => megaBtn.setAttribute('aria-expanded', String(megaBtn.getAttribute('aria-expanded') !== 'true')));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav__item--mega')) megaBtn.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (megaBtn && megaBtn.getAttribute('aria-expanded') === 'true') {
      megaBtn.setAttribute('aria-expanded', 'false');
      megaBtn.focus();
    } else if (menu && menu.hasAttribute('data-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ----- v3: chữ in tách màu nghiêng nhẹ theo con trỏ -----
  // Chỉ chạy khi có chuột, không giảm chuyển động, và chỉ trong lúc con trỏ còn di chuyển.
  // Biến --nx/--ny đặt trên từng .plates đang hiển thị (không đặt trên :root) để trình duyệt chỉ tính lại phần chữ đó.
  const plates = [...document.querySelectorAll('.plates')];
  if (plates.length && finePointer && !reduceMotion) {
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    });
    plates.forEach((p) => io.observe(p));
    let tx = 0, ty = 0, nx = 0, ny = 0, raf = 0;
    const tick = () => {
      raf = 0;
      nx += (tx - nx) * 0.12;
      ny += (ty - ny) * 0.12;
      const x = nx.toFixed(3), y = ny.toFixed(3);
      visible.forEach((p) => {
        p.style.setProperty('--nx', x);
        p.style.setProperty('--ny', y);
      });
      if (Math.abs(tx - nx) > 0.002 || Math.abs(ty - ny) > 0.002) raf = requestAnimationFrame(tick);
    };
    addEventListener('pointermove', (e) => {
      tx = (2 * e.clientX) / innerWidth - 1;
      ty = (2 * e.clientY) / innerHeight - 1;
      if (!raf && visible.size) raf = requestAnimationFrame(tick);
    }, { passive: true });
  }

  // ----- v3: ảnh in tách màu. Ảnh gốc chỉ tải khi rê chuột lần đầu, hiện dần khi đã tải xong -----
  document.querySelectorAll('[data-print]').forEach((fig) => {
    const photo = fig.querySelector('.print__photo');
    if (!photo || !finePointer) return;
    fig.addEventListener('pointerenter', () => {
      if (photo.getAttribute('src')) return;
      photo.addEventListener('load', () => photo.classList.add('is-ready'), { once: true });
      photo.srcset = photo.dataset.srcset;
      photo.src = photo.dataset.src;
    });
  });

  // ----- v3: hộp chi tiết dòng sản phẩm (dialog gốc). Không có dialog thì liên kết vẫn mở trang như thường -----
  const openers = document.querySelectorAll('[data-line-open]');
  openers.forEach((a) => {
    const dialog = document.getElementById(a.dataset.lineOpen);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      dialog.showModal();
    });
  });
  document.querySelectorAll('dialog.sheet').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      // Bấm ra ngoài khung nội dung (vùng nền mờ) hoặc nút đóng thì đóng hộp
      if (e.target === dialog || e.target.closest('[data-dialog-close]')) dialog.close();
    });
    dialog.querySelectorAll('[data-quote-line]').forEach((a) => {
      a.addEventListener('click', () => {
        const select = document.querySelector('[data-quote-form] select[name="product"]');
        if (select && [...select.options].some((o) => o.value === a.dataset.quoteLine)) select.value = a.dataset.quoteLine;
        dialog.close();
      });
    });
  });

  // ----- v3: bản đồ Google chỉ tải khi người dùng bấm (nhẹ trang, không gửi dữ liệu cho Google trước) -----
  document.querySelectorAll('[data-map]').forEach((box) => {
    const btn = box.querySelector('.map__load');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = box.dataset.map;
      frame.title = box.dataset.mapTitle;
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      box.append(frame);
      box.classList.add('is-loaded');
      btn.remove();
      frame.focus();
    });
  });

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
