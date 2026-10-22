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

  // ----- Hiệu ứng xuất hiện khi cuộn (CSS bỏ qua nếu người dùng giảm chuyển động) -----
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
