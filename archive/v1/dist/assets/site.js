// Hành vi giao diện: menu mobile, menu con, kiểm tra và gửi form báo giá.
(() => {
  'use strict';

  // ----- Menu chính (mobile) -----
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.hasAttribute('data-open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  // ----- Menu con -----
  document.querySelectorAll('.nav__toggle').forEach((btn) => {
    btn.addEventListener('click', () => btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true')));
    btn.closest('li').addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });

  // ----- Form báo giá -----
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');

  const messages = {
    name: 'Nhập họ tên của bạn.',
    phone: 'Nhập số điện thoại gồm 9 đến 11 chữ số.',
    email: 'Email chưa đúng định dạng, ví dụ ten@congty.vn.',
    message: 'Mô tả loại túi, kích thước hoặc số lượng bạn cần.',
  };

  const setError = (field, text) => {
    const error = form.querySelector(`#${field.id}-error`);
    field.toggleAttribute('aria-invalid', Boolean(text));
    if (text) field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = text;
      error.hidden = !text;
    }
  };

  const validate = (field) => {
    const text = field.checkValidity() ? '' : messages[field.name] || 'Kiểm tra lại trường này.';
    setError(field, text);
    return !text;
  };

  form.addEventListener('focusout', (e) => {
    if (e.target.matches('input, textarea') && (e.target.required || e.target.value)) validate(e.target);
  });

  const setStatus = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input:not([name="website"]), textarea')];
    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      setStatus('error', `Còn ${invalid.length} trường cần sửa trước khi gửi.`);
      invalid[0].focus();
      return;
    }
    // Trường bẫy bot: người dùng thật không nhìn thấy và không điền.
    if (form.elements.website.value) return;

    const endpoint = form.getAttribute('action');
    if (!endpoint) {
      setStatus('error', 'Bản xem trước chưa kết nối máy chủ nên yêu cầu chưa được gửi. Hãy gọi hoặc nhắn Zalo theo số bên cạnh.');
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    setStatus('pending', 'Đang gửi yêu cầu…');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('success', 'Đã gửi yêu cầu báo giá. Bộ phận kinh doanh sẽ liên hệ lại với bạn.');
    } catch {
      setStatus('error', 'Chưa gửi được yêu cầu do lỗi kết nối. Thử lại, hoặc gọi số hotline bên cạnh.');
    } finally {
      submit.disabled = false;
    }
  });
})();
