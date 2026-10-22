# Design system Hợp Phú (v2: landing page)

Phiên bản 2.0, ngày 2026-10-22. Thay cho v1 (đỏ mận, Barlow), bản cũ lưu ở `archive/v1/design-system-v1.md`. Nguồn code: `src/styles/tokens.css`, `base.css`, `components.css`, `landing.css`.

## 1. Định hướng

Landing page công nghiệp, nhiều khoảng trắng, ảnh sản phẩm lớn. Nhịp bố cục học từ Hengfor (xem `docs/reference/hengfor-analysis.md`): hero rộng, catalogue dạng mosaic, quy trình đánh số đặt cạnh ảnh, khối năng lực nền tối, lưới ứng dụng kiểu editorial. Nhận diện vẫn là của Hợp Phú: đỏ, trắng, xám, chữ Be Vietnam Pro, ảnh thật của công ty.

## 2. Màu

| Token | Giá trị | Vai trò |
|---|---|---|
| `--red` | `#C51F2B` | Nút chính, điểm nhấn nhỏ, liên kết, số bước, gạch chân menu khi rê |
| `--red-hover` | `#A71924` | Hover của nút chính và liên kết |
| `--white` | `#FFFFFF` | Nền chính |
| `--surface` | `#F4F5F6` | Nền khối xen kẽ (quy trình, báo giá), nền ô "Ảnh tạm" |
| `--ink` | `#272B30` | Chữ; nền khối Năng lực và thẻ CTA |
| `--ink-deep` | `#1D2024` | Nền footer |
| `--muted` | `#5C636B` | Chữ phụ |
| `--line` | `#DADDE1` | Đường kẻ trang trí |
| `--input-border` | `#868D95` | Viền ô nhập |

**`#C51F2B` là giả định tạm** lấy từ brief, chưa xác nhận là màu nhận diện chính thức; logo thực tế là đỏ mận `#7A1508`. Nếu đổi, chỉ sửa `--red` và `--red-hover` trong `tokens.css`.

Tương phản (WCAG; chữ thường cần 4,5:1, thành phần giao diện cần 3:1):

| Cặp | Tỷ lệ |
|---|---|
| Trắng trên `--red` | 5,8:1 |
| Trắng trên `--red-hover` | 7,5:1 |
| `--red` trên `--surface` | 5,3:1 |
| `--ink` trên trắng | 14,2:1 |
| `--line` trên trắng | 1,4:1 (chỉ dùng trang trí, không dùng làm viền ô nhập) |

Lighthouse Accessibility đạt 100 ở cả hai ngôn ngữ (xem `docs/qa-landing.md`).

## 3. Chữ

Một họ chữ: **Be Vietnam Pro** 400 / 500 / 600, cho cả bản Việt và Anh. Font dự phòng Arial với `size-adjust: 107%` để giảm xô lệch khi webfont tải xong.

| Token | Cỡ | Dùng cho |
|---|---|---|
| `--text-3xl` | 38–76px | H1 hero |
| `--text-2xl` | 30–52px | H2 section, số hotline |
| `--text-xl` | 20–24px | H3, tiêu đề thẻ CTA, số bước |
| `--text-lg` | 18–20px | Đoạn dẫn, mục menu mobile |
| `--text-base` | 17px | Nội dung |
| `--text-sm` | 15px | Menu desktop, footer, mô tả ngành |
| `--text-xs` | 13px | Chất liệu dưới thẻ, chú thích, gợi ý form |

Tiêu đề: đậm 600, giãn chữ -0,02em, line-height 1,12. Không viết hoa toàn bộ. Cụm không nên ngắt dòng dùng khoảng trắng không ngắt trong `copy.json`.

## 4. Khoảng cách và lưới

- Khoảng cách bội số 4px: `--space-1` (4px) đến `--space-9` (96px).
- Khoảng dọc section: `--section-y`, 64–128px.
- Container tối đa 80rem (1280px); lề `--gutter` 20–40px; khe lưới `--gap` 12–24px.
- Breakpoint mobile-first: 36rem (576px), 40rem (640px), 48rem (768px), 64rem (1024px).
- Bo góc một giá trị: `--radius` 6px.

## 5. Bố cục từng section

| Section | Mobile | Desktop (≥ 1024px) |
|---|---|---|
| Header | Logo, nút EN/VI, nút menu; từ 576px thêm nút "Nhận báo giá" | Logo, 5 mục menu, mega menu sản phẩm 4 cột, EN/VI, nút đỏ |
| Hero | Chữ trên, ảnh 4:5 dưới (16:11 từ 640px); ẩn dòng nhà xưởng để ảnh lộ trong màn hình đầu | Hai cột; ảnh tràn mép phải, cao bằng màn hình (tối đa 832px) |
| Sản phẩm | Lưới 2 cột ảnh 4:5; thẻ CTA chiếm 2 cột | Lưới 12 cột: hàng 1 là 5/4/3 cột cao hơn, hàng 2–3 là 4/4/4; thẻ CTA nền than |
| Quy trình | Danh sách 4 bước, ảnh dưới | Hai cột: bước bên trái, ảnh bên phải |
| Năng lực | Nền than, 1 cột (2 cột từ 768px) | 4 cột |
| Ứng dụng | Ảnh trên, 6 ngành 1 cột (2 cột từ 768px) | Ảnh 4:5 dính bên trái, 6 ngành 2 cột bên phải |
| Báo giá | Giới thiệu và hotline trên, form dưới | 5/7 cột |
| Footer | 1 cột (2 cột từ 768px) | 4 cột |
| Thanh liên hệ | Cố định đáy: Gọi, Zalo, Báo giá | Ẩn |

## 6. Component

Mỗi component là một hàm trong `src/components.mjs`, nhận `ctx` từ `createContext(site, copy, lang)`.

| Component | Hàm | Ghi chú |
|---|---|---|
| Nút | `button()` | `primary` nền đỏ, `secondary` viền mực; cao tối thiểu 48px (`--sm` 44px) |
| Ảnh | `image()` | Luôn có `srcset` 768w + gốc, `width`, `height`, `alt` theo ngôn ngữ; `priority` cho ảnh LCP |
| Tiêu đề section | `sectionHeader()` | H2 và đoạn dẫn; biến thể `light` cho nền tối |
| Header | `siteHeader()` | Mega menu ẩn bằng `visibility`, đóng trễ 200ms; nút mũi tên `aria-expanded` cho bàn phím; Esc đóng |
| Thẻ danh mục | `categoryTile()` | Ảnh, tên, chất liệu; danh mục chưa có ảnh dùng ô "Ảnh tạm" viền đứt |
| Form báo giá | `quoteForm()` | 6 trường + đồng ý + bẫy bot; lỗi theo từng ô; chữ thông báo nhúng qua `data-messages`; chọn sẵn sản phẩm qua `?san-pham=` hoặc `?product=` |
| Footer | `siteFooter()` | 4 cột và thanh liên hệ mobile |

## 7. Chuyển động

- Đổi màu 180ms; gạch chân đỏ chạy ngang dưới mục menu khi rê.
- Ảnh catalogue phóng 4% khi rê.
- Hiệu ứng xuất hiện (mờ dần, dịch lên 16px, 600ms) cho bước quy trình, ô năng lực, ảnh và ô ngành. Không áp dụng cho màn hình đầu.
- Không parallax, không carousel, không bộ đếm số. `prefers-reduced-motion` tắt mọi chuyển động.

## 8. Accessibility

- Liên kết "Bỏ qua, đến nội dung chính" là phần tử đầu tiên nhận focus.
- Viền focus 3px xanh `#0B57D0`; trên nền tối dùng `#9EC5FF`. Ô nhập khi focus có viền đỏ.
- Vùng chạm trên mobile tối thiểu 44px.
- Nút EN/VI có tên truy cập chứa chữ đang hiển thị kèm mô tả ẩn.
- Mỗi ngôn ngữ một H1; `lang` đúng theo trang.
