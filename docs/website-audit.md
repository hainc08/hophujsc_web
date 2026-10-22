# Audit website hopphujsc.com

Ngày audit: 2026-10-08. Người thực hiện: Claude (phiên làm việc redesign).

## 1. Phạm vi và giới hạn

| Hạng mục | Tình trạng |
|---|---|
| Website đang chạy | Truy cập được. Đã crawl toàn bộ 156 URL trong sitemap và 80 đích liên kết nội bộ khác. |
| Source code (theme, plugin) | **Không có.** Thư mục làm việc `hophujsc_web` trống hoàn toàn, không phải git repository. |
| Cơ sở dữ liệu, WP Admin, hosting | **Không có quyền truy cập.** |
| Google Search Console, Analytics | **Không có.** Không biết trang nào đang có thứ hạng, lượt hiển thị hay backlink. |
| Công cụ từ khoá (Ahrefs, Similarweb…) | Chưa được uỷ quyền trong phiên này. Không có số liệu lượng tìm kiếm. |

Mọi kết luận dưới đây đến từ HTML công khai, header phản hồi, sitemap, robots.txt, ảnh chụp màn hình và Lighthouse 12.8.2 chạy trên máy cục bộ. Những gì chỉ xác định được khi có source code được ghi rõ là "chưa xác minh".

## 2. Nền tảng kỹ thuật (đã xác minh từ HTML và header)

| Thành phần | Phát hiện |
|---|---|
| CMS | WordPress 7.1.3, PHP 8.4.26, máy chủ LiteSpeed |
| Theme | Betheme (Muffin Group) + child theme `betheme-child` v2.0.2. `style.css` của child theme chỉ có phần header, tức mọi tuỳ biến nằm trong Theme Options và Elementor, không nằm trong code |
| Page builder | Elementor 3.19.2 + Elementor Pro (trang nội dung), kèm Muffin Builder của Betheme |
| Hero | Slider Revolution 6.7.4, nền video `hero-video.mp4` (1,5 MB) |
| Thương mại | WooCommerce 10.0.6 đang bật nhưng không có sản phẩm thật (1 sản phẩm thử tên `dasd`, đang 404) |
| Đa ngôn ngữ | Polylang Pro, tiếng Việt ở gốc, tiếng Anh ở `/en/` |
| SEO | Yoast SEO (sinh sitemap, canonical, JSON-LD) |
| Form | Elementor Pro Form (`name="New Form"`, gửi qua `admin-ajax.php`). Contact Form 7 có nạp CSS/JS nhưng không thấy form CF7 nào trên các trang đã xem |
| Liên hệ nổi | 3 plugin chồng nhau: `button-contact-vr`, `quick-call-button`, `hotline-phone-ring`, cộng nút chia sẻ Facebook |
| Bình luận | wpDiscuz trên mọi bài viết, kể cả trang sản phẩm |
| Rendering | PHP render phía máy chủ; nội dung chính có trong HTML. Không có cache trang (TTFB 1,9–3,5 giây, không thấy header `x-litespeed-cache`) |
| Build/deploy | Chưa xác minh. Không có dấu hiệu pipeline; nhiều khả năng sửa trực tiếp trên production |

Hệ quả cho việc redesign: đây là site WordPress dựng bằng page builder, nên "sửa code" thực chất là sửa child theme, template và cấu hình plugin. Không có lý do để đổi framework.

## 3. Cấu trúc nội dung thực tế

Site **không dùng** custom post type cho sản phẩm. Toàn bộ sản phẩm, tin tức, tuyển dụng đều là `post` thường, phân biệt bằng category:

- Trang (page): Trang chủ, Về chúng tôi, Dịch vụ, Sản phẩm, Liên hệ, cùng bản EN.
- Sản phẩm: bài viết trong category `san-pham` (9 trang sản phẩm gốc từ 2021, cập nhật 07/2025) và 6 bài dạng bài PR sản phẩm viết 07–08/2025.
- Danh mục sản phẩm trên menu: 8 category (`tui-hat-xoai`, `tui-ep-quai`, `tui-niem-phong`, `tui-sieu-thi`, `tui-dung-thuc-pham`, `tui-long-bao`, `tui-may-mac-xuat-khau`, `cuon-mang-hd-pe-pp`).
- Tin tức: 6 bài tiếng Việt, 5 bài là tin thị trường nhựa năm 2021, 1 bài thông báo đổi địa chỉ 07/2025.
- Tuyển dụng: 2 bài (2021, 2022).

Vấn đề gốc: người dựng site đã dùng **bài viết và category làm "ngăn chứa" cho các khối giao diện** (tiêu đề khối, footer, logo, lời giới thiệu, lý do chọn, lời chứng thực, đối tác). Mỗi mảnh đó thành một URL công khai, có trong sitemap, được phép index. 78 trên 156 URL trong sitemap thuộc loại này.

## 4. UI/UX

Ảnh chụp trước khi thay đổi nằm trong [screenshots/before](screenshots/before/).

### Điểm mạnh

- Có ảnh sản phẩm thật, chụp sạch (túi ép quai, túi siêu thị, túi niêm phong, túi lồng bao).
- Menu sản phẩm đã chia theo loại túi, đúng cách khách hàng B2B tìm kiếm.
- Có sẵn kênh gọi điện và Zalo, đúng thói quen liên hệ ở Việt Nam.
- Không tràn ngang ở cả 4 viewport (375, 768, 1440, 1920).
- Trang sản phẩm gốc có thông số thật: chủng loại, màu, kích thước thông dụng.

### Điểm yếu

| # | Vấn đề | Bằng chứng | Mức độ |
|---|---|---|---|
| U1 | Hero không nói công ty làm gì. Nền là ảnh trái đất từ vũ trụ với các icon giỏ hàng, ổ khoá, biểu đồ bay lơ lửng, tức nguyên bản demo "Shop Assistant" của Betheme, không liên quan đến bao bì nhựa | `home-desktop1440-fold.png` | Nghiêm trọng |
| U2 | Số liệu "thành tựu" hiển thị `0%`, `0+ Chi nhánh`, `0+ Nhà máy`, `0+ Quốc gia`, `0+ Đơn hàng`. Bộ đếm phụ thuộc JS; cả khi chạy, các nhãn như "giá trị đơn hàng 10 000 $ / 16 900$" là nội dung demo | HTML trang chủ, ảnh full-page | Nghiêm trọng |
| U3 | Lời chứng thực là nội dung demo: "hỗ trợ tư vấn Marketing Online bán hàng", "theo dõi trạng thái đơn hàng liên tục" không khớp với một nhà sản xuất bao bì | HTML trang chủ | Nghiêm trọng |
| U4 | Màu giao diện (hồng tím `#830A48` + vàng `#FFCF00`) là màu của demo, không khớp logo (đỏ mận `#7A1508`) | So sánh logo và CSS | Cao |
| U5 | Icon khối "Tại sao chọn" là icon thương mại điện tử của demo (điện thoại, loa, giỏ hàng) | Ảnh full-page | Trung bình |
| U6 | Trên mobile, 5 nút nổi (Zalo ×2, gọi ×2, email, chia sẻ Facebook) che gần hết màn hình đầu, đè lên tiêu đề và CTA | `home-mobile375-fold.png` | Nghiêm trọng |
| U7 | Biểu tượng giỏ hàng "0 ₫" và đăng nhập tài khoản trên header của một site không bán online | Header | Cao |
| U8 | Lưới sản phẩm ở `/san-pham/` có 4 thẻ mất ảnh, để lại khoảng trắng lớn; tiêu đề khối có chữ "blog" mờ làm nền | `san-pham-desktop1440-full.jpg` | Cao |
| U9 | Trang sản phẩm dùng template bài blog: có tác giả "Daniel", nút Share, "Related posts", "Read more", form bình luận wpDiscuz, một bình luận rác `asds` | `/san-pham/tui-niem-phong/` | Cao |
| U10 | Trang sản phẩm **không có CTA báo giá** nào trong nội dung | HTML trang sản phẩm | Nghiêm trọng |
| U11 | Lẫn tiếng Anh trong giao diện tiếng Việt: "Home", "Read more", "Related posts", "Do you like it?", "Message", "Links" | Nhiều trang | Trung bình |
| U12 | Khối "Khách hàng của chúng tôi" là carousel, logo tải chậm nên phần lớn thời gian hiển thị ô trống | Ảnh full-page | Trung bình |
| U13 | Typography không có hệ thống: nạp Montserrat, Roboto, Roboto Slab và Inter cùng lúc, đủ mọi độ đậm | 5 request Google Fonts | Trung bình |
| U14 | Footer nền vàng, chữ xám nhỏ, tương phản thấp; không có hotline, email, mã số thuế | Ảnh full-page, Lighthouse `color-contrast` | Cao |

### Thông tin doanh nghiệp không nhất quán (cần công ty xác nhận)

| Mục | Trang A | Trang B |
|---|---|---|
| Nhà sáng lập | `/ve-chung-toi/`: Lê Đăng Tá (CFO), Trần Mạnh Dân (CEO), Nguyễn Ích Liêm (CPO) | `/lien-he/`: Micheal Le (CFO), Daniel Tran (CEO), Steve Nguyen (CPO) |
| Địa chỉ | Footer: Số 16 Khu Đường Tàu, Xã Như Quỳnh, Tỉnh Hưng Yên (sau thay đổi địa giới 07/2025) | `/ve-chung-toi/`: "thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên" (địa danh cũ) |
| Email công ty | Không xuất hiện ở bất kỳ đâu trong HTML | — |
| Hotline | Chỉ có `0983771565` trong nút nổi, không có trong footer hay trang liên hệ dạng văn bản | — |

## 5. Phễu chuyển đổi

Đường đi hiện tại của một khách B2B: tìm Google → vào trang sản phẩm → đọc mô tả → **không có nút báo giá** → phải tự tìm menu "Liên hệ" hoặc bấm nút nổi.

- Form duy nhất là form Elementor 4 trường (Họ tên, Số điện thoại, Email, Nội dung), lặp ở cuối mọi trang chính. Thiếu trường **Công ty** và **Loại sản phẩm**, nên đội kinh doanh không phân loại được yêu cầu.
- Nhãn form có lỗi chính tả ("Số diện thoại") và lẫn tiếng Anh ("Message").
- Chưa xác minh được form gửi đi đâu, có lưu vào Elementor Submissions hay không, có chống spam hay không. Tôi không gửi thử vào production.
- Nút "Liên hệ ngay" trên hero là CTA duy nhất ở màn hình đầu; không có CTA "Xem sản phẩm".
- Các nút gọi và Zalo hoạt động (`tel:0983771565`, `https://zalo.me/0983771565`) và cần được giữ.
- Người dùng có trình duyệt tiếng Anh bị Polylang tự chuyển từ `/` sang `/en/homepage-2/`. Hành vi này ảnh hưởng cả Lighthouse lẫn khách quốc tế chia sẻ đường dẫn.

## 6. Hiệu năng (đo thực tế)

Lighthouse 12.8.2, Chrome headless, chạy từ máy cục bộ ngày 2026-10-08. Đây là dữ liệu phòng thí nghiệm một lần đo, không phải dữ liệu người dùng thật (CrUX).

| Trang | Thiết bị | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | TTFB |
|---|---|---|---|---|---|---|---|---|---|
| Trang chủ (*) | Mobile | **57** | 80 | 100 | 85 | **12,3 s** | 0,018 | 160 ms | 2,0 s |
| Trang chủ (*) | Desktop | **73** | 80 | 96 | 77 | 2,9 s | 0,003 | 0 ms | 2,2 s |
| `/san-pham/tui-niem-phong/` | Mobile | **59** | 83 | 96 | 85 | **12,0 s** | 0,02 | 110 ms | 1,9 s |

(*) Lighthouse bị chuyển hướng sang `/en/homepage-2/` do Polylang dò ngôn ngữ trình duyệt. Bản EN dùng cùng template và cùng tài nguyên với bản tiếng Việt, nên số đo vẫn đại diện, nhưng điểm SEO là của bản EN.

Nguyên nhân chính:

1. **TTFB 2–3,5 giây.** Không có cache trang. Thời gian phản hồi trung bình khi crawl 152 trang là 7,5 giây mỗi trang ở mức 4 kết nối đồng thời, cao nhất 28 giây.
2. **Trang chủ nặng 3,4 MB, 147 request**: 53 file JS (628 KB), 40 file CSS (240 KB), 11 file font (425 KB), video hero 1,5 MB.
3. **Phần tử LCP là một lớp chữ của Slider Revolution**, chỉ hiện sau khi JS của slider chạy xong (trễ render 1,6 giây sau TTFB 3 giây).
4. Logo là PNG 96 KB và 83 KB cho kích thước hiển thị khoảng 100 px.
5. `display=auto` trên một bộ Google Fonts 54 biến thể.
6. CLS và TBT đang tốt; không cần can thiệp.

## 7. Accessibility

Lỗi Lighthouse thực tế: `color-contrast`, `heading-order`, `list`, `listitem`, `meta-viewport`, `target-size`, `link-name`, `aria-prohibited-attr`.

- `maximum-scale=1` trong meta viewport chặn người dùng phóng to, vi phạm WCAG 1.4.4.
- Chữ vàng trên nền trắng và chữ xám trên nền vàng không đạt tỷ lệ 4,5:1.
- Trang chủ không có H1; cấp heading nhảy H2 → H5.
- 1.973 trên 3.202 thẻ `<img>` trong toàn site thiếu `alt`.
- Liên kết chỉ có icon, không có tên truy cập được.

## 8. Tổng hợp vấn đề theo mức ưu tiên

| Ưu tiên | Vấn đề | Giải quyết ở đâu |
|---|---|---|
| P0 | Hero, số liệu, lời chứng thực là nội dung demo không xác thực | Thiết kế lại trang chủ, chỉ dùng dữ liệu đã xác minh |
| P0 | Trang sản phẩm không có CTA báo giá | Template sản phẩm mới |
| P0 | 78 URL mảnh bố cục và 2 trang nội dung không phù hợp đang được index | Xem [url-migration-map.md](url-migration-map.md) |
| P0 | Không trang nào có meta description; trang chủ không có H1; title trang chủ là "Trang chủ - hopphujsc.com" | Xem [seo-audit.md](seo-audit.md) |
| P1 | LCP mobile 12 giây | Bỏ Slider Revolution và video ở hero, bật cache trang, ảnh hero tĩnh có `fetchpriority` |
| P1 | Nút nổi che màn hình mobile | Một thanh liên hệ cố định ở đáy, thay 3 plugin |
| P1 | Form thiếu trường Công ty và Loại sản phẩm | Form báo giá mới, giữ cơ chế gửi hiện có |
| P1 | Bảng màu và font là của demo | Design system mới dựa trên logo |
| P2 | WooCommerce, wpDiscuz, Contact Form 7, Slider Revolution nạp tài nguyên nhưng không phục vụ nghiệp vụ nào | Tắt nạp tài nguyên trước, gỡ plugin sau khi công ty xác nhận |
| P2 | Thông tin sáng lập, địa chỉ không nhất quán; thiếu email, hotline dạng văn bản | Cần công ty xác nhận |
