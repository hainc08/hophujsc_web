---
name: hopphu-web-design
description: Thiết kế và dựng giao diện website Hợp Phú JSC (hopphujsc.com, bao bì nhựa, túi nilon HDPE/LDPE/PP/OPP) theo design system, quy tắc nội dung, component song ngữ Việt/Anh và quy trình build/QA của repo này. Dùng skill này mỗi khi làm việc trong repo hophujsc_web và có bất kỳ việc gì chạm tới giao diện hoặc nội dung trang - landing page, thêm hoặc sửa section, catalogue sản phẩm, trang sản phẩm, danh mục, giới thiệu, liên hệ, form báo giá, header, mega menu, footer, màu, font, bản tiếng Anh, dịch nội dung, ảnh, asset manifest, dữ liệu từ Facebook của công ty, SEO on-page, Lighthouse, Core Web Vitals, responsive, accessibility - kể cả khi người dùng chỉ nói ngắn như "sửa giao diện", "thêm khối này", "làm bản tiếng Anh", "tham khảo Hengfor".
---

# Thiết kế website Hợp Phú

Skill này giữ mọi thay đổi nhất quán với landing page đã dựng, và giữ các nguyên tắc đã thống nhất với chủ dự án: không bịa dữ liệu, không phá URL hiện có, không đụng production khi chưa được duyệt.

Đọc `CLAUDE.md` ở gốc repo trước: nó ghi trạng thái hiện tại, các quyết định đã chốt và những thứ đang chờ chủ dự án. Brief chính là `docs/prompts/redesign-landing-hengfor.md`.

## Bối cảnh

- Repo là bản dựng HTML tĩnh, không dependency. Site thật là WordPress (Betheme + Elementor + Polylang + Yoast) và chưa có source trong repo. Không đổi sang framework khác.
- Sản phẩm trên site thật là **bài viết** trong category, không phải sản phẩm WooCommerce.
- Liên kết tới các trang chưa redesign trỏ về URL tuyệt đối trên `https://hopphujsc.com` (qua `ctx.url(key)` hoặc `site.origin + t(category.url)`), để bản xem trước không có liên kết chết.

| Khi cần | Đọc |
|---|---|
| Màu, chữ, khoảng cách, component | `docs/design-system.md` |
| Phân tích tham chiếu Hengfor | `docs/reference/hengfor-analysis.md` |
| Ảnh có sẵn, ảnh thiếu, cảnh cần chụp | `docs/asset-manifest.md` |
| Title, description, H1 theo URL | `docs/seo-keyword-map.md` |
| URL nào giữ, noindex, 301 | `docs/url-migration-map.md` |
| Bản dịch EN cần duyệt | `docs/translation-review.md` |
| Kết quả đo lần trước | `docs/qa-landing.md` |

## Cấu trúc code và song ngữ

```
src/data/site.json     dữ liệu doanh nghiệp, ảnh (images.<key>), danh mục, liên kết
src/data/copy.json     toàn bộ câu chữ, mỗi chuỗi dạng { "vi": ..., "en": ... }
src/components.mjs     createContext(site, copy, lang) -> ctx { t, url, img, lang }; các component
src/pages/landing.mjs  meta(ctx), schema(ctx), render(ctx)
src/styles/            tokens.css, base.css, components.css, landing.css (nhúng vào HTML khi build)
src/scripts/site.js    menu, mega menu, reveal, form (chữ lấy từ data-messages, không viết cứng)
build.mjs              xuất dist/index.html (vi) và dist/en/index.html (en)
```

- **Không viết cứng chữ trong template hay JS.** Thêm chuỗi mới vào `copy.json` cho cả hai ngôn ngữ cùng lúc; lấy bằng `t()`.
- Ảnh mới: thêm vào `site.json > images` với `src`, `small` (bản 768px WordPress đã sinh), `width`, `height`, `alt: { vi, en }`; ghi vào `docs/asset-manifest.md`.
- Trang mới: tạo `src/pages/<ten>.mjs` cùng giao diện `meta/schema/render`, đăng ký trong `build.mjs` cho cả hai ngôn ngữ.
- Bản dịch EN mới: dịch sát nghĩa, không thêm tuyên bố, và thêm vào `docs/translation-review.md` để chủ dự án duyệt. Ưu tiên câu chữ EN đã có trên `/en/` của site.

## Hệ thiết kế (v3, "Industrial Editorial", 2026-10-22)

Trang chủ đã chuyển sang hướng tạp chí công nghiệp. Chi tiết và lý do: `docs/redesign-editorial.md`.
- Ảnh dẫn dắt, không dùng lưới thẻ. Lưới 12 cột bất đối xứng; mỗi section một kiểu bố cục riêng (hero chữ lớn + 2 ảnh lệch, bộ sưu tập so le, phương châm chữ lớn, nhà máy nền tối, quy trình số lớn, ứng dụng dạng bảng chỉ mục).
- Tiêu đề lớn: đậm 500, giãn chữ -0.035em. Bo góc `--radius: 2px`; ảnh trang chủ góc vuông, không bóng.
- Đỏ chỉ cho nút chính và liên kết. Số bước, đường kẻ dùng màu mực.
- Danh mục chưa có ảnh không đặt ô trống giữa ảnh thật; chuyển thành danh sách chữ.
- Ảnh nhà máy: chỉ ảnh thật đã duyệt, điền vào `site.json > factoryPhotos`. Chưa có thì component tự hiện ô chờ ghi rõ.
- Ảnh sản phẩm có logo hoặc khẩu hiệu in đè: được làm sạch (xoá logo góc, cắt dải chữ) bằng ffmpeg; ghi `derivedFrom`/`edit` trong `images.json`. Không chỉnh sửa bản thân sản phẩm.

## Hệ thiết kế (v2, landing page, các phần vẫn áp dụng)

- **Định hướng**: công nghiệp, nhiều khoảng trắng, ảnh sản phẩm lớn; nhịp bố cục ngang tầm Hengfor nhưng là của Hợp Phú. Không sao chép ảnh, chữ, bố cục đặc trưng của Hengfor.
- **Màu**: trắng là nền chính; `--surface #F4F5F6` cho khối xen kẽ; `--ink #272B30` cho chữ và khối tối; đỏ `--red #C51F2B` (hover `#A71924`) chỉ cho nút chính, trạng thái đang chọn, điểm nhấn nhỏ, liên kết. Màu đỏ đang là **giả định tạm**, xem `CLAUDE.md`; mọi chỗ phải dùng token, không dùng mã hex trực tiếp, để đổi màu chỉ cần sửa `tokens.css`.
- Viền ô nhập dùng `--input-border` (đạt 3:1); `--line #DADDE1` chỉ cho đường kẻ trang trí vì chỉ đạt 1,4:1.
- **Chữ**: Be Vietnam Pro 400/500/600 cho toàn trang, cả bản Anh. Line-height tiêu đề không dưới 1,12 vì dấu tiếng Việt. Viết hoa đầu câu. Giữ cụm từ không nên ngắt dòng bằng ` ` trong `copy.json` (ví dụ "bao bì").
- **Không dùng**: theme xanh dương, gradient nặng, glassmorphism, nhãn chữ hoa giãn chữ trên mọi tiêu đề, bộ đếm số, slider, parallax, carousel tự chạy.
- **Đánh số** chỉ cho chuỗi có thứ tự thật (quy trình), dùng `<ol>`.
- **Chuyển động**: hover đổi màu, phóng ảnh 4%; hiệu ứng xuất hiện khi cuộn qua `data-reveal`, chỉ cho nội dung dưới màn hình đầu. Lớp ẩn `.reveal-ready` do JS gắn, nên nếu JS lỗi thì nội dung vẫn hiện. Tôn trọng `prefers-reduced-motion`.
- **Ảnh thiếu**: danh mục không có ảnh dùng ô `tile__placeholder` có nhãn "Ảnh tạm" nhìn thấy được. Không dùng ảnh stock giả làm ảnh nhà máy hay sản phẩm.

## Quy tắc nội dung

1. Chỉ dùng dữ liệu có nguồn: hopphujsc.com (VI và `/en/`), dữ liệu Facebook đã được chủ dự án xuất vào repo, hoặc thông tin trong chat. Facebook cần đăng nhập nên không tự đọc được; nếu cần mà chưa có thì hỏi.
2. Không tạo số liệu năng lực, năm thành lập, số khách hàng, chứng nhận, lời chứng thực, đánh giá, giá, thông số máy móc, logo đối tác chưa được phép. Thiếu dữ liệu thì rút gọn section hoặc dùng phương án trung thực, rồi ghi vào mục "Cần xác nhận" của báo cáo.
3. Không so sánh nhất chưa kiểm chứng ("hàng đầu", "nhanh nhất", "24/7", "leading", "best price"). Thông số không có nguồn thì ghi "Theo yêu cầu" / "Made to order", không đoán.
4. Mục `"verify": true` trong `site.json` (địa chỉ) đang mâu thuẫn trên site thật; dùng được nhưng phải nhắc trong báo cáo.
5. Giọng văn: câu ngắn, chủ động; nút nói đúng việc sẽ xảy ra và giữ một tên xuyên suốt; lỗi form nói cần sửa gì. Liên hệ đã xác minh: hotline/Zalo `0983 771 565`; site không công bố email nên không thêm email.

## SEO và accessibility

- Mỗi ngôn ngữ: một H1, heading không nhảy bậc, title khoảng 50–60 ký tự có "Hợp Phú"/"Hop Phu", description khoảng 140–160 ký tự, canonical về production, `hreflang` vi/en/x-default, Open Graph một bộ với ảnh JPEG.
- JSON-LD chỉ dữ liệu thật: `Organization` (có `sameAs` Facebook), `WebSite`, `WebPage`. Không `Product` khi chưa có giá hoặc đánh giá thật; không `LocalBusiness` khi địa chỉ chưa xác nhận.
- Mọi `<img>` có `alt` theo ngôn ngữ, `width`, `height`. Ảnh LCP `fetchpriority="high"` + `preload` có `imagesrcset`, `imagesizes` khớp `sizes` của ảnh; ảnh khác `loading="lazy"`. Giữ `preconnect` tới `hopphujsc.com` vì ảnh tải từ đó.
- WCAG 2.2 AA: tương phản, focus nhìn thấy, vùng chạm ≥ 44px trên mobile, menu và mega menu dùng được bằng bàn phím (nút `aria-expanded`, Esc để đóng).

## Bẫy đã gặp

- **Thuộc tính `pattern` của input**: Chrome biên dịch với cờ `v`, nên `( ) -` trong lớp ký tự phải escape. Trong template literal, dấu `\` bị nuốt mất, nên viết bằng `String.raw`. Nếu không, Chrome báo lỗi console, `checkValidity()` ném lỗi và kiểm tra form dừng giữa chừng. `check_page.py` có kiểm tra mục này.
- **Đường dẫn gốc**: bản xem trước chạy dưới `/hophujsc_web/` trên GitHub Pages. Liên kết tới trang của chính bản dựng phải dùng `ctx.local(lang)` hoặc `${BASE}` trong `build.mjs`, không viết cứng `/` hay `/en/`. Canonical và hreflang thì vẫn trỏ về `https://hopphujsc.com`.
- **Cache JS**: `serve.mjs` cache tài nguyên 1 năm, nên `build.mjs` gắn `?v=<hash>` vào URL `site.js`. Giữ cơ chế này khi thêm file tĩnh.
- **Kiểm thử bằng Playwright**: điều hướng chỉ khác `#hash` sẽ không tải lại trang. Thêm query (`?t=1`) hoặc đi qua `about:blank` trước khi kiểm thử lại sau khi build.
- **Dấu `\` khi sửa file**: chèn code qua heredoc của shell trong môi trường này có thể làm mất hoặc đổi dấu `\` (ví dụ `\b` thành ký tự backspace). Code có regex hay escape thì sửa bằng công cụ Edit/Write, rồi kiểm tra lại byte thật.
- **Form nhảy làm trượt cú bấm**: dòng báo lỗi xuất hiện hoặc biến mất lúc rời ô làm form dịch chuyển đúng lúc nhấn chuột. Giữ sẵn chỗ cho dòng lỗi ở ô bắt buộc (`.field:has([required]) .field__error`) và kiểm tra lại khi `input`.
- **Anchor dưới header dính**: dùng một cơ chế bù duy nhất (`scroll-padding-top` trên `html` trong base.css); thêm `scroll-margin-top` cho `[id]` sẽ cộng đôi khoảng bù.
- **Mega menu**: đóng có trễ 200ms để chuột đi chéo xuống bảng không làm bảng đóng; bảng ẩn bằng `visibility` để không nằm trong thứ tự Tab.

## Quy trình làm việc

1. Đọc `CLAUDE.md`, tài liệu liên quan và dữ liệu trong `src/data/`.
2. Lập kế hoạch ngắn: section, component tái dùng, dữ liệu còn thiếu. Với thay đổi bố cục lớn, đưa wireframe cho chủ dự án duyệt trước.
3. Sửa code, rồi `node build.mjs` và xem ở `http://localhost:4173` (VI) và `/en/` (EN).
4. `python .claude/skills/hopphu-web-design/scripts/check_page.py dist/index.html dist/en/index.html`. Sửa mọi mục FAIL.
5. Playwright: chụp 375, 390, 768, 1024, 1440, 1920px cho VI, và ít nhất 390 và 1440px cho EN. Kiểm tra tràn ngang, ảnh lỗi, `[data-reveal]` đều hiện sau khi cuộn, menu mobile, mega menu (chuột và bàn phím), form (lỗi, đồng ý, chọn sẵn `?san-pham=<id>`), chuyển ngôn ngữ. Lưu ảnh vào `docs/screenshots/landing/`.
6. `bash .claude/skills/hopphu-web-design/scripts/lighthouse.sh /` và `/en/`. Mục tiêu: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1.
7. Cập nhật `docs/qa-landing.md`, `docs/asset-manifest.md`, `docs/translation-review.md` và `CLAUDE.md` nếu có quyết định mới.

Khi báo kết quả: chỉ nêu số đã đo, ghi rõ đo ở localhost (không có TTFB 2–3 giây của máy chủ thật), liệt kê những gì chưa kiểm thử và những thông tin cần công ty xác nhận.

## Ranh giới an toàn

- Không deploy, không gửi thử form, không sửa hopphujsc.com hay WP Admin khi chưa được duyệt rõ trong chat.
- Không vượt qua chặn REST API của iThemes Security; đọc HTML công khai.
- Bản dựng mặc định `noindex`; `--index` chỉ để đo hoặc khi đã được duyệt lên production.
