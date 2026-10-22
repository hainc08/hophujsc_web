# Kế hoạch triển khai SEO và tích hợp WordPress

Ngày lập: 2026-10-08. Tài liệu này tách rõ ba trạng thái: **đã làm** trong repository, **sẵn sàng làm** khi có quyền truy cập, và **cần công ty quyết định**.

## 1. Đã triển khai trong repository

Áp dụng cho bản dựng trang chủ ở `dist/index.html`, sinh từ [build.mjs](../build.mjs) và [src/pages/home.mjs](../src/pages/home.mjs).

| Hạng mục | Cách làm | Kiểm chứng |
|---|---|---|
| HTML ngữ nghĩa | `header`, `nav`, `main`, `section` có `aria-labelledby`, `footer`, `address`, `table` có `scope`, `ol` cho quy trình, `dl` cho chất liệu và lý do | Lighthouse Accessibility 100 |
| Title | "Sản xuất bao bì nhựa, túi nilon HDPE, LDPE, PP \| Hợp Phú" | Có trong HTML |
| Meta description | 164 ký tự, có sản phẩm, chất liệu, địa điểm, lời kêu gọi | Có trong HTML |
| H1 | Đúng 1 thẻ, chứa "sản xuất bao bì nhựa" và "túi nilon" | Kiểm tra bằng Playwright |
| Cấp heading | H1 → H2 → H3, không nhảy bậc | Lighthouse `heading-order` đạt |
| Canonical | `https://hopphujsc.com/` | Có trong HTML |
| hreflang | `vi`, `en`, và `x-default` (site cũ thiếu) | Có trong HTML |
| Open Graph, Twitter Card | Một bộ duy nhất; `og:image` là ảnh JPEG sản phẩm thật thay cho SVG trang trí | Có trong HTML |
| JSON-LD | `Organization`, `WebSite`, `WebPage` trong một `@graph` | Phân tích cú pháp JSON thành công; chưa chạy qua Rich Results Test |
| Alt ảnh | 6/6 ảnh có `alt`; logo trong liên kết có nhãn dùng `alt=""` | Playwright: 0 ảnh thiếu `alt` |
| Kích thước ảnh | 6/6 ảnh có `width`, `height` | Playwright: 0 ảnh thiếu |
| Liên kết nội bộ | 100% là URL tiếng Việt đang trả về 200; không còn `/blog/`, `/about-us/`, `/services/`, `/contact/`; không có `href="#"`; không `target="_blank"` cho liên kết nội bộ | Đối chiếu với kết quả crawl |
| Nội dung trong HTML | Toàn bộ nội dung render sẵn, không phụ thuộc JS | Xem mã nguồn `dist/index.html` |
| Chống index nhầm | Bản xem trước mặc định `noindex, nofollow`; chỉ `node build.mjs --index` mới cho index | Có trong HTML |

Về dữ liệu có cấu trúc:

- `Organization` chỉ gồm tên pháp nhân, tên gọi khác, URL, logo, điện thoại, địa chỉ, đầu mối bán hàng. Không có `email` (site không công bố), `foundingDate`, `numberOfEmployees`, `aggregateRating`.
- **Không dùng `LocalBusiness`.** Kiểu này dành cho cơ sở đón khách tại chỗ và cần giờ mở cửa, toạ độ. Hợp Phú là nhà sản xuất B2B và địa chỉ đang chưa nhất quán giữa các trang. Khi công ty xác nhận địa chỉ nhà xưởng và có hồ sơ Google Business Profile, có thể cân nhắc lại.
- **Không dùng `Product` cho trang sản phẩm ở giai đoạn này.** Kết quả nhiều định dạng dạng Product của Google yêu cầu `offers`, `review` hoặc `aggregateRating`. Site không niêm yết giá và không có đánh giá thật. Thêm giá hay đánh giá giả để qua kiểm tra là vi phạm chính sách.
- `BreadcrumbList` không đặt trên trang chủ (không có cấp cha). Sẽ có trên mọi trang con.

## 2. Tích hợp vào WordPress

Site giữ nguyên WordPress, Betheme, Elementor, Polylang, Yoast. Không đổi nền tảng.

### Cấu trúc file dự kiến trong child theme

```
wp-content/themes/betheme-child/
  functions.php                 nạp CSS/JS, gỡ tài nguyên thừa trên template mới
  assets/site.css               từ src/styles/*
  assets/site.js                từ src/scripts/site.js
  template-home.php             template trang "Trang chủ Hợp Phú"
  template-parts/
    site-header.php             ← siteHeader()
    site-footer.php             ← siteFooter()
    product-card.php            ← productCard()
    post-item.php               ← postItem()
    section-header.php          ← sectionHeader()
    quote-form.php              ← bọc form Elementor hiện có
wp-content/mu-plugins/
  hopphu-seo.php                noindex, redirect, sitemap, schema Organization
```

### Ánh xạ dữ liệu

`src/data/site.json` là dữ liệu tạm cho bản dựng tĩnh. Trong WordPress, không mục nào được viết cứng:

| Dữ liệu | Nguồn trong WordPress |
|---|---|
| Menu chính, menu footer | `wp_nav_menu()` với menu đang có |
| 8 danh mục và quy cách | `get_categories()` cùng 3 trường term meta mới: chất liệu, quy cách, ứng dụng |
| Sản phẩm nổi bật | `WP_Query` bài trong category `san-pham` có đánh dấu "nổi bật" (sticky hoặc post meta) |
| Bài viết mới | `WP_Query` 4 bài mới nhất thuộc `tin-tuc` và các bài kiến thức |
| Ảnh | `wp_get_attachment_image()`, WordPress tự sinh `srcset`, `width`, `height` |
| Thông tin công ty | Một trang tuỳ chọn (Customizer hoặc options page) dùng chung cho header, footer, schema |
| Chất liệu, lý do, quy trình | Trường tuỳ biến của trang chủ, sửa được trong trang quản trị |

### Form báo giá

Form hiện tại là widget Elementor Pro Form và đang là cơ chế gửi thư duy nhất đã hoạt động. Phương án giữ nguyên tích hợp:

1. Giữ widget, thêm hai trường **Công ty** và **Loại sản phẩm** (danh sách chọn), sửa nhãn "Số diện thoại" và "Message".
2. Nhúng widget vào `quote-form.php` bằng một Elementor template, áp CSS của `.quote-form` lên các class của Elementor.
3. Bật lưu Submissions trong Elementor để không mất yêu cầu khi thư lỗi.
4. Bật honeypot của Elementor; chỉ thêm reCAPTCHA nếu có spam thật.

Form trong bản dựng tĩnh có kiểm tra dữ liệu đầy đủ nhưng **không gửi đi đâu** vì `quoteForm.endpoint` đang để trống; khi bấm gửi, trang nói rõ điều đó. Đây là giới hạn của bản xem trước, không phải của thiết kế.

### `hopphu-seo.php` (chưa viết, cần môi trường staging để kiểm thử)

| Việc | Cách làm |
|---|---|
| Noindex 78 URL mảnh bố cục | Bộ lọc `wpseo_robots` trả về `noindex, follow` cho bài và category thuộc danh sách slug trong [url-migration-map.md](url-migration-map.md) |
| Loại khỏi sitemap | `wpseo_exclude_from_sitemap_by_post_ids` và `wpseo_sitemap_exclude_taxonomy` |
| Noindex trang WooCommerce, tác giả | Cài đặt Yoast: tắt lưu trữ tác giả; noindex 4 trang giỏ hàng, thanh toán, tài khoản, cửa hàng |
| 301 | `/lien-he-3/` → `/lien-he/`, `/ve-chung-toi-2/` → `/ve-chung-toi/` qua `template_redirect` |
| 410 | `/ve-cong-ty/fuck/`, `/en/product/test-san-pham/` |
| Organization | Khai báo trong Yoast (Cài đặt → Đại diện trang web → Tổ chức) thay vì tự xuất, để không trùng graph |
| Gỡ Open Graph trùng | Tắt Open Graph trong Betheme Theme Options, giữ bản của Yoast |
| Gỡ microdata trên `<html>` | Bộ lọc của Betheme hoặc ghi đè `header.php` trong child theme |

### Cấu hình không cần code

| Việc | Ở đâu |
|---|---|
| Đổi tên site từ "hopphujsc.com" thành "Hợp Phú" | Cài đặt → Tổng quan |
| Mẫu title và meta description | Yoast → Giao diện tìm kiếm; bỏ tiền tố "Lưu trữ" |
| Title và description từng trang | Theo [seo-keyword-map.md](seo-keyword-map.md) |
| Thêm `Sitemap:` vào robots.txt, chặn `/?s=` | Yoast → Công cụ → Trình chỉnh sửa tệp |
| Sửa 4 liên kết footer | Betheme → Footer |
| Tắt tự chuyển hướng theo ngôn ngữ trình duyệt | Polylang → Cài đặt → Phát hiện ngôn ngữ trình duyệt |
| Alt cho ảnh | Thư viện media; ưu tiên ảnh đại diện của 15 trang sản phẩm |
| Gán bài cho 2 danh mục trống | Túi may mặc xuất khẩu, Cuộn màng HD/PE/PP |
| Bật cache trang | Máy chủ là LiteSpeed nhưng chưa thấy plugin LiteSpeed Cache hoạt động; đây là thay đổi có tác động lớn nhất tới TTFB |

## 3. Hiệu năng

Đã làm trong bản dựng:

- Bỏ Slider Revolution và video nền 1,5 MB; hero là một ảnh tĩnh có `fetchpriority="high"` và `preload` kèm `imagesrcset`.
- CSS 23 KB (khoảng 5 KB sau nén) nhúng trong HTML; JS 3,6 KB, `defer`.
- 2 họ font, 4 file, `display=swap`, nạp không chặn hiển thị, có font dự phòng chỉnh `size-adjust`.
- Ảnh dưới màn hình đầu dùng `loading="lazy"`.
- Không có script bên thứ ba.

Còn lại, cần quyền truy cập máy chủ:

- Ảnh sản phẩm đang là JPEG 1200×1200 hiển thị ở khoảng 290px. WordPress sẽ tự sinh `srcset`; cần thêm plugin chuyển WebP/AVIF.
- Logo PNG 59 KB cho kích thước hiển thị 44px. Cần file SVG gốc từ công ty.
- Tự lưu trữ font thay vì gọi Google Fonts.
- Thời hạn cache tài nguyên tĩnh đang là 7 ngày; nâng lên 1 năm cho file có phiên bản.
- Dừng nạp tài nguyên của WooCommerce, wpDiscuz, Contact Form 7, Slider Revolution trên các template mới.

## 4. Thứ tự triển khai và rollback

| Bước | Việc | Rủi ro | Rollback |
|---|---|---|---|
| 0 | Sao lưu toàn bộ file và database; dựng staging | — | — |
| 1 | Cấu hình Yoast: tên site, mẫu title, description, robots.txt, Organization | Thấp | Khôi phục cài đặt Yoast từ bản xuất |
| 2 | Sửa liên kết footer, tắt chuyển hướng ngôn ngữ, bật cache trang | Thấp | Đảo từng cài đặt |
| 3 | Cài `hopphu-seo.php` trên staging, chạy lại crawl để đối chiếu bản đồ URL | Trung bình | Xoá một file mu-plugin |
| 4 | Thêm template trang chủ vào child theme; gán cho một trang nháp để duyệt | Thấp, trang cũ vẫn chạy | Không gán template |
| 5 | Chuyển trang chủ sang template mới | Cao | Đổi template của trang về "Mặc định"; nội dung Elementor cũ vẫn nguyên trong database |
| 6 | Template trang sản phẩm và danh mục | Cao | Xoá `single.php`, `category.php` trong child theme |
| 7 | Gỡ plugin không dùng | Trung bình | Kích hoạt lại plugin |

Sau mỗi bước 3, 5, 6: chạy lại crawl, Lighthouse, và theo dõi báo cáo Trang và Hiệu suất trong Search Console trong 2–4 tuần.

Không bước nào ở trên đã được thực hiện trên production.
