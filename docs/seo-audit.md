# Audit SEO hopphujsc.com

Ngày audit: 2026-10-08. Phương pháp: crawl 156 URL trong sitemap Yoast và 80 đích liên kết nội bộ khác, đọc HTML thô (không chạy JS), Lighthouse 12.8.2.

Giới hạn: không có Search Console, Analytics, dữ liệu backlink hay công cụ từ khoá. Báo cáo này mô tả tình trạng kỹ thuật và on-page; nó không cho biết trang nào đang có thứ hạng.

## 1. Tóm tắt

| Chỉ số | Kết quả |
|---|---|
| URL trong sitemap | 156 (92 bài viết, 16 trang, 44 category, 2 product, 1 product_cat, 1 author) |
| Trả về 200 | 152 |
| Trả về 301 nhưng vẫn trong sitemap | 2 |
| Trả về 404 nhưng vẫn trong sitemap | 2 |
| Có meta description | **0 / 152** |
| Có `noindex` | 0 / 152 (mọi thứ đều được phép index) |
| Có canonical tự tham chiếu | 152 / 152 |
| Đúng 1 thẻ H1 | 139 |
| Không có H1 | 8 (gồm trang chủ, Sản phẩm, Dịch vụ, Liên hệ và bản EN) |
| Nhiều hơn 1 H1 | 5 |
| Ảnh thiếu `alt` | 1.973 / 3.202 thẻ `<img>` (62%) |
| Ảnh thiếu `width`/`height` | 1.387 / 3.202 |
| URL nên giữ index | 70 |
| URL nên noindex, gỡ hoặc chuyển hướng | 86 |

Vấn đề lớn nhất không phải thiếu từ khoá mà là **chỉ số index bị pha loãng**: hơn một nửa số URL Google được mời crawl là mảnh bố cục, trang WooCommerce rỗng hoặc nội dung thử nghiệm.

## 2. Thu thập và lập chỉ mục

### robots.txt

```
User-agent: *
Disallow: /wp-content/uploads/wc-logs/
Disallow: /wp-content/uploads/woocommerce_transient_files/
Disallow: /wp-content/uploads/woocommerce_uploads/
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
```

- Thiếu dòng `Sitemap: https://hopphujsc.com/sitemap_index.xml`. Lighthouse desktop báo `robots-txt` không đạt.
- Không chặn tìm kiếm nội bộ `/?s=`.

### Sitemap

`/sitemap.xml`, `/sitemap_index.xml` và `/wp-sitemap.xml` đều trả về chỉ mục của Yoast. Chỉ mục liệt kê 8 sitemap con, trong đó `e-landing-page-sitemap.xml` và `portfolio-sitemap.xml` rỗng.

Sitemap chứa những URL không nên có:

| Loại | Ví dụ | Số lượng |
|---|---|---|
| Bài viết là mảnh bố cục | `/tieu-de/tai-sao-lai-chon-hop-phu/`, `/footer/cong-ty-cp-sx-tm-hop-phu/`, `/logo/…`, `/doi-tac/doi-tac-vinmart/` | 47 |
| Category kỹ thuật | `/category/footer/`, `/category/tieu-de-2/`, `/category/logo/` | 25 |
| Trang WooCommerce rỗng | `/gio-hang/`, `/thanh-toan/`, `/tai-khoan/`, `/cua-hang/`, `/shop/` | 6 |
| Nội dung không phù hợp | `/ve-cong-ty/fuck/` (slug tục, đang 200, index được) | 1 |
| Nội dung thử nghiệm | `/en/product/test-san-pham/` | 1 |
| 404 | `/sản phẩm/dasd/`, `/category/video/` | 2 |
| 301 | `/ve-chung-toi/ve-chung-toi/`, `/en/about-us/about-us/` | 2 |
| Trang trùng | `/lien-he-3/`, `/ve-chung-toi-2/` | 2 |

Ngược lại, hai category có trên menu chính lại **không có** trong sitemap: `/category/tui-may-mac-xuat-khau/` và `/category/cuon-mang-hd-pe-pp/` (trả về 200, nhiều khả năng chưa có bài nào được gán).

### Chuyển hướng

- `http://` → `https://` và `www` → không `www` đều là 301 một bước. Đạt.
- HTTPS không có header HSTS.
- Polylang chuyển hướng `/` sang `/en/homepage-2/` theo ngôn ngữ trình duyệt. Googlebot không gửi `Accept-Language` nên không bị ảnh hưởng trực tiếp, nhưng các công cụ kiểm tra, trình xem trước liên kết và người dùng quốc tế đều bị.

## 3. On-page

### Title

Mẫu hiện tại: `{Tên trang} - hopphujsc.com`. Tên site đang là tên miền thay vì tên thương hiệu.

| URL | Title hiện tại | Nhận xét |
|---|---|---|
| `/` | Trang chủ - hopphujsc.com | Không có từ khoá, không có tên công ty |
| `/san-pham/` | Sản phẩm - hopphujsc.com | Chung chung |
| `/ve-chung-toi/` | Về chúng tôi - hopphujsc.com | Chung chung |
| `/dich-vu/` | Dịch vụ - hopphujsc.com | Chung chung |
| `/lien-he/` | Liên hệ - hopphujsc.com | Chung chung |
| `/san-pham/tui-niem-phong/` | TÚI NIÊM PHONG - hopphujsc.com | Viết hoa toàn bộ, không có ngữ cảnh |
| `/san-pham/tui-hd/` | Túi hạt xoài HD - hopphujsc.com | Slug không khớp tên |
| `/category/tui-hat-xoai/` | Lưu trữ Túi hạt xoài - hopphujsc.com | Tiền tố "Lưu trữ" mặc định của Yoast |
| `/en/homepage-2/` | Homepage - hopphujsc.com | Như trên |

Trùng title: 2 cặp bài viết và 1 cặp category (xem [url-migration-map.md](url-migration-map.md)).

### Meta description

Không trang nào có. Yoast chưa được cấu hình mẫu mô tả, nên Google tự lấy đoạn trích; với trang chủ, đoạn `og:description` hiện là "TẠI SAO LẠI CHỌN HỢP PHÚ Công ty Cổ phần…".

### Heading

- Trang chủ: 0 H1, 6 H2, 0 H3, 2 H4, 6 H5, 1 H6. Tiêu đề hero nằm trong lớp của Slider Revolution, không phải heading.
- `/san-pham/`, `/dich-vu/`, `/lien-he/`: 0 H1.
- `/ve-chung-toi/`: H1 là "Tâm huyết tạo nên giá trị", không chứa tên công ty hay ngành nghề.
- `/ve-chung-toi-2/`: 4 H1.
- Trang sản phẩm: 1 H1 viết hoa, sau đó nhảy thẳng xuống H4/H5/H6 của sidebar và footer. Nội dung mô tả không có heading phụ nào.
- Một số H2 là mảnh câu bị cắt bởi hiệu ứng: "khách hàng hài lòng", "Thành tựu đã đạt được".

### Nội dung

| Trang | Độ dài nội dung chính (ước lượng, đã trừ khung trang) | Nhận xét |
|---|---|---|
| Trang sản phẩm gốc (9 trang) | 60–200 từ | Mỏng nhưng có dữ liệu thật: chủng loại, màu, kích thước |
| Bài PR sản phẩm 2025 (6 bài) | 500–700 từ | Nội dung dài, chưa có cấu trúc heading |
| Tin thị trường 2021 (5 bài) | 500–1.000 từ | Tin tổng hợp từ nguồn khác, đã cũ 5 năm, không phục vụ khách mua bao bì |
| Category sản phẩm | 0 | Chỉ có danh sách bài, không có đoạn mô tả |

Không có trang nào trả lời các câu hỏi mua hàng B2B: số lượng đặt tối thiểu, thời gian sản xuất, quy cách in, cách chọn độ dày, khác biệt HDPE và LDPE.

### Hình ảnh

- 62% thẻ ảnh thiếu `alt`. Tên file phần lớn không mô tả: `z2674366085360_39a0…jpg`, `ANH-NEN-3-700x560.jpg`, `Untitled-1.png`.
- Ảnh trang trí của demo (`shopassistant-*.svg/webp`) vẫn được nạp trên mọi trang.
- `og:image` trang chủ là một file SVG trang trí của demo (`shopassistant-sep1.svg`). Mạng xã hội không hiển thị SVG; có thêm một thẻ `og:image` thứ hai rỗng do Betheme xuất trùng với Yoast.

## 4. Liên kết nội bộ

| Vấn đề | Chi tiết | Số trang bị ảnh hưởng |
|---|---|---|
| Liên kết gãy ở footer | "Sản phẩm" trỏ tới `/blog/` (404). `data-id` còn nguyên URL demo `themes.muffingroup.com` | 152 |
| Liên kết footer sai ngôn ngữ | "Về chúng tôi", "Dịch vụ", "Liên hệ" trỏ tới `/about-us/`, `/services/`, `/contact/`, bị 301 sang bản tiếng Anh | 152 |
| Chuỗi chuyển hướng | `/about-us/` → `/en/about-us/about-us/` → `/en/about-us/` | 152 |
| Footer mở tab mới | Mọi liên kết điều hướng footer có `target="_blank"` | 152 |
| Trang sản phẩm không liên kết về danh mục của nó | Breadcrumb là "Home › Sản Phẩm › {tên}", bỏ qua category loại túi | Mọi trang sản phẩm |
| Sidebar trang sản phẩm | Liên kết tới các mảnh bố cục ("Chúng tôi cung ứng", "Đối tác sunhouse", "Trưởng Phòng Kinh Doanh") | Mọi bài viết |
| Liên kết không crawl được | Lighthouse `crawlable-anchors` không đạt (thẻ `<a>` không có `href` trong menu và slider) | Mọi trang |

## 5. Dữ liệu có cấu trúc

Yoast đang xuất `WebSite`, `WebPage` hoặc `CollectionPage`, `BreadcrumbList`, `ImageObject`, `Person` (tác giả).

- **Không có `Organization`.** Yoast chưa được khai báo site đại diện cho tổ chức nào, nên không có tên pháp nhân, logo, địa chỉ, điện thoại.
- `WebSite.name` là "hopphujsc.com".
- `ImageObject` chính của trang chủ có `url` rỗng.
- Bài viết không có `Article`; tác giả là `Person` "Daniel".
- Trang sản phẩm không có `Product`. Site không niêm yết giá, nên theo hướng dẫn của Google, kết quả nhiều định dạng dạng Product không áp dụng được; xem cách xử lý trong [seo-implementation.md](seo-implementation.md).
- `<html>` còn mang microdata `itemscope itemtype="https://schema.org/WebPage"` do Betheme xuất, trùng với JSON-LD của Yoast.

## 6. Đa ngôn ngữ

- `hreflang="vi"` và `hreflang="en"` có trên các trang có bản dịch. Không có `x-default`.
- Trang chủ EN nằm ở `/en/homepage-2/` thay vì `/en/`.
- Một số bài trong ngôn ngữ EN có slug và tiêu đề tiếng Việt.
- `og:locale:alternate` có khai báo.

## 7. Mạng xã hội

- Open Graph bị xuất hai lần (Yoast và Betheme), bản của Betheme ghi `og:type=article` cho trang chủ và `og:image` rỗng.
- `twitter:card` có, không có `twitter:image`.

## 8. Trang có nguy cơ mất thứ hạng khi redesign

Chưa có Search Console nên danh sách này dựa trên nội dung và vị trí trong cấu trúc site, không dựa trên lưu lượng thật.

| Mức rủi ro | URL | Lý do | Biện pháp |
|---|---|---|---|
| Cao | `/` | Thay toàn bộ nội dung và template | Giữ URL, giữ các đoạn mô tả công ty đang có, thêm H1 |
| Cao | 9 trang `/san-pham/{slug}/` | Đổi template từ bài blog sang trang sản phẩm | Giữ nguyên URL, H1, toàn bộ đoạn văn và thông số hiện có; chỉ thêm nội dung |
| Cao | 8 trang `/category/tui-*/` | Là mục menu chính | Giữ URL; thêm mô tả, không đổi slug |
| Trung bình | 6 bài PR sản phẩm 2025 | Mới nhất, dài nhất, có thể đang bắt đầu có hiển thị | Giữ nguyên; chỉ thêm heading và liên kết nội bộ |
| Trung bình | `/ve-chung-toi/`, `/dich-vu/`, `/lien-he/` | Trang chính | Giữ URL |
| Trung bình | 78 URL mảnh bố cục chuyển sang noindex | Một số có thể đang nhận lượt hiển thị theo tên thương hiệu hoặc tên đối tác | Đối chiếu Search Console trước khi noindex |
| Thấp | Tin thị trường 2021 | Cũ, không liên quan mua hàng | Giữ nguyên, không đầu tư |

## 9. Danh sách URL được giữ index và title hiện tại

| URL | Title hiện tại | Số H1 | Số từ (cả khung trang) |
|---|---|---|---|
| `/category/san-pham/` | Lưu trữ Sản Phẩm - hopphujsc.com | 1 | 711 |
| `/category/tin-tuc/` | Lưu trữ Tin Tức - hopphujsc.com | 1 | 762 |
| `/category/tui-dung-thuc-pham/` | Lưu trữ Túi đựng thực phẩm - hopphujsc.com | 1 | 311 |
| `/category/tui-ep-quai/` | Lưu trữ Túi ép quai - hopphujsc.com | 1 | 363 |
| `/category/tui-hat-xoai/` | Lưu trữ Túi hạt xoài - hopphujsc.com | 1 | 314 |
| `/category/tui-long-bao/` | Lưu trữ Túi lồng bao - hopphujsc.com | 1 | 311 |
| `/category/tui-niem-phong/` | Lưu trữ Túi niêm phong - hopphujsc.com | 1 | 355 |
| `/category/tui-sieu-thi/` | Lưu trữ Túi siêu thị - hopphujsc.com | 1 | 491 |
| `/category/tuyen-dung/` | Lưu trữ Tuyển Dụng - hopphujsc.com | 1 | 349 |
| `/en/category/die-cut-bag/` | Lưu trữ Die-cut bag - hopphujsc.com | 1 | 227 |
| `/en/category/export-garment-bag/` | Lưu trữ Export garment bag - hopphujsc.com | 1 | 230 |
| `/en/category/food-bag/` | Lưu trữ Food bag - hopphujsc.com | 1 | 220 |
| `/en/category/handle-sealed-bags/` | Lưu trữ Handle-Sealed Bag - hopphujsc.com | 1 | 269 |
| `/en/category/inner-bag/` | Lưu trữ Inner bag - hopphujsc.com | 1 | 223 |
| `/en/category/news/` | Lưu trữ News - hopphujsc.com | 1 | 620 |
| `/en/category/product/` | Lưu trữ Product - hopphujsc.com | 1 | 588 |
| `/en/category/supermarket-bag/` | Lưu trữ Supermarket bag - hopphujsc.com | 1 | 271 |
| `/` | Trang chủ - hopphujsc.com | 0 | 684 |
| `/dich-vu/` | Dịch vụ - hopphujsc.com | 0 | 626 |
| `/en/about-us/` | About us - hopphujsc.com | 1 | 593 |
| `/en/contact/` | Contact - hopphujsc.com | 0 | 251 |
| `/en/homepage-2/` | Homepage - hopphujsc.com | 0 | 496 |
| `/en/product/` | Product - hopphujsc.com | 0 | 677 |
| `/en/services/` | Services - hopphujsc.com | 0 | 415 |
| `/lien-he/` | Liên hệ - hopphujsc.com | 0 | 360 |
| `/san-pham/` | Sản phẩm - hopphujsc.com | 0 | 824 |
| `/ve-chung-toi/` | Về chúng tôi - hopphujsc.com | 1 | 876 |
| `/en/handle-sealed-bags/hop-phu-pe-handle-sealed-bag-durable-stylish-and-eco-friendly/` | Hop Phu PE Handle-Sealed Bag – Durable, Stylish, and Eco-Friendly - hopphujsc.com | 1 | 403 |
| `/en/news/asian-naphtha-crackers-start-to-cut-run-rates-as-spread-to-ethylene-falls/` | Asian naphtha crackers start to cut run rates as spread to ethylene falls - hopphujsc.com | 1 | 956 |
| `/en/news/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp/` | Hiệp hội Nhựa phát hoảng vì công ty Hàn đòi tăng thuế nhập nguyên liệu nhựa PP - hopphujsc.com | 1 | 1058 |
| `/en/news/hop-phu-biodegradable-supermarket-bags-eco-friendly-packaging-for-sustainable-retail/` | Hop Phu Biodegradable Supermarket Bags – Eco-Friendly Packaging for Sustainable Retail - hopphujsc.com | 1 | 691 |
| `/en/news/hop-phu-line-in-plastic-bags-reliable-inner-liner-for-agricultural-industrial-packaging/` | Hop Phu Line-In Plastic Bags – Reliable Inner Liner for Agricultural & Industrial Packaging - hopphujsc.com | 1 | 705 |
| `/en/news/hop-phu-pe-hd-mango-seed-bags-elegant-durable-packaging-for-modern-brands/` | Hop Phu PE/HD Mango-Seed Bags – Elegant, Durable Packaging for Modern Brands - hopphujsc.com | 1 | 661 |
| `/en/news/hop-phu-shipping-bags-secure-professional-packaging-for-online-sellers/` | Hop Phu Shipping Bags – Secure & Professional Packaging for Online Sellers - hopphujsc.com | 1 | 731 |
| `/en/news/thi-truong-pe-viet-nam-tiep-tuc-tang-gia-nho-nguon-cung-dac-biet-la-lldpe/` | Vietnam PE market sees further supply-driven hikes, particularly for LLDPE - hopphujsc.com | 1 | 670 |
| `/en/news/thu-tuong-giao-bo-y-te-ho-tro-doanh-nghiep-mua-vaccine-sputnik-v/` | Egypt’s PP, PE markets firmer in August despite muted demand - hopphujsc.com | 1 | 829 |
| `/en/news/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai/` | Hop Phu Handle-sealed Bags – Modern Packaging Solutions for Stylish Brands - hopphujsc.com | 1 | 610 |
| `/en/product/courier-seal-bags/` | COURIER SEAL BAGS - hopphujsc.com | 1 | 462 |
| `/en/product/exporting-garments-and-households-packing-bags/` | EXPORTING GARMENTS AND HOUSEHOLDS PACKING BAGS - hopphujsc.com | 1 | 366 |
| `/en/product/food-and-vegetable-bags/` | FOOD AND VEGETABLE BAGS - hopphujsc.com | 1 | 405 |
| `/en/product/garbage-bags/` | GARBAGE BAGS - hopphujsc.com | 1 | 349 |
| `/en/product/hd-mango-seed-shopping-bags/` | MANGO-SEED HDPE SHOPPING BAGS - hopphujsc.com | 1 | 464 |
| `/en/product/line-in-bags/` | LINER BAGS - hopphujsc.com | 1 | 361 |
| `/en/product/pe-mango-seed-shopping-bags/` | MANGO-SEED LDPE SHOPPING BAGS - hopphujsc.com | 1 | 387 |
| `/en/product/pe-pp-hdpe-film-in-roll/` | PE, PP, HDPE FILM IN ROLL - hopphujsc.com | 1 | 333 |
| `/en/product/polyethylene/` | POLYETHYLENE - hopphujsc.com | 1 | 727 |
| `/en/product/self-destructing-supermarket-bags/` | SELF-DESTRUCTING SUPERMARKET BAGS - hopphujsc.com | 1 | 429 |
| `/san-pham/cuon-mang-hd-pe-pp-cac-loai/` | CUỘN MÀNG HD/PE/PP CÁC LOẠI - hopphujsc.com | 1 | 466 |
| `/san-pham/hat-nhua-nguyen-sinh/` | HẠT NHỰA NGUYÊN SINH - hopphujsc.com | 1 | 975 |
| `/san-pham/tui-dung-rac-tu-huy/` | TÚI ĐỰNG RÁC TỰ HUỶ - hopphujsc.com | 1 | 492 |
| `/san-pham/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai-2/` | Túi Ép Quai Cao Cấp – Giải Pháp Bao Bì Thời Thượng Cho Thương Hiệu Hiện Đại - hopphujsc.com | 1 | 836 |
| `/san-pham/tui-hat-xoai-pe-hd-hop-phu-giai-phap-bao-bi-tinh-te-cho-thuong-hieu-hien-dai/` | Túi Hạt Xoài PE/HD Hợp Phú – Giải Pháp Bao Bì Tinh Tế Cho Thương Hiệu Hiện Đại - hopphujsc.com | 1 | 945 |
| `/san-pham/tui-hd/` | Túi hạt xoài HD - hopphujsc.com | 1 | 636 |
| `/san-pham/tui-hot-xoai/` | TÚI HẠT XOÀI PE - hopphujsc.com | 1 | 524 |
| `/san-pham/tui-long-bao-tui-lot-hop-phu-giai-phap-dong-goi-ben-chac-an-toan-cho-nong-lam-san/` | Túi Lồng Bao (Túi Lót) Hợp Phú – Giải Pháp Đóng Gói Bền Chắc & An Toàn Cho Nông, Lâm Sản - hopphujsc.com | 1 | 973 |
| `/san-pham/tui-long-bao-tui-lot/` | TÚI LỒNG BAO (TÚI LÓT) - hopphujsc.com | 1 | 501 |
| `/san-pham/tui-may-mac-xuat-khau/` | TÚI MAY MẶC XUẤT KHẨU - hopphujsc.com | 1 | 519 |
| `/san-pham/tui-niem-phong-hop-phu-giai-phap-bao-bi-hieu-qua-cho-nha-ban-hang-online/` | Túi Niêm Phong Hợp Phú – Giải Pháp Bao Bì Hiệu Quả Cho Nhà Bán Hàng Online - hopphujsc.com | 1 | 1026 |
| `/san-pham/tui-niem-phong/` | TÚI NIÊM PHONG - hopphujsc.com | 1 | 714 |
| `/san-pham/tui-sieu-thi-tu-huy-hop-phu-lua-chon-bao-bi-xanh-cho-doanh-nghiep-hien-dai/` | Túi Siêu Thị Tự Hủy Hợp Phú – Lựa Chọn Bao Bì Xanh Cho Doanh Nghiệp Hiện Đại - hopphujsc.com | 1 | 962 |
| `/san-pham/tui-sieu-thi/` | TÚI SIÊU THỊ TỰ HUỶ - hopphujsc.com | 1 | 597 |
| `/tin-tuc/bao-gia-pe-pp-thang-8-tang-len-bat-chap-nhu-cau-thap-o-chau-phi/` | Báo giá PE, PP tháng 8 tăng lên bất chấp nhu cầu thấp ở châu Phi - hopphujsc.com | 1 | 1048 |
| `/tin-tuc/cac-nha-may-cracker-naphtha-chau-a-bat-dau-cat-giam-cong-suat-van-hanh-do-giam-muc-chenh-lech-voi-ethylene/` | Các nhà máy cracker naphtha châu Á bắt đầu cắt giảm công suất vận hành do giảm mức chênh lệch với ethylene - hopphujsc.com | 2 | 1425 |
| `/tin-tuc/gia-nhap-khau-ld-hdpe-cua-trung-quoc-di-xuong-sau-2-thang-gia-lldpe-khoi-sac-hon/` | Giá nhập khẩu LD, HDPE của Trung Quốc đi xuống sau 2 tháng; giá LLDPE khởi sắc hơn - hopphujsc.com | 1 | 911 |
| `/tin-tuc/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp-2/` | Hiệp hội Nhựa phát hoảng vì công ty Hàn đòi tăng thuế nhập nguyên liệu nhựa PP - hopphujsc.com | 1 | 1153 |
| `/tin-tuc/tam-ly-ppbc-cua-trung-quoc-yeu-hon-so-voi-pp-homo-do-thieu-nhu-cau/` | Tâm lý PPBC của Trung Quốc yếu hơn so với PP homo do thiếu nhu cầu - hopphujsc.com | 1 | 924 |
| `/tin-tuc/tb-cap-nhat-dia-chi-theo-thay-doi-dia-gioi-hanh-chinh/` | TB CẬP NHẬT ĐỊA CHỈ THEO THAY ĐỔI ĐỊA GIỚI HÀNH CHÍNH - hopphujsc.com | 1 | 616 |
| `/tui-ep-quai/tui-ep-quai-pe-hop-phu-ben-dep-tien-dung-than-thien-moi-truong/` | Túi Ép Quai PE Hợp Phú – Bền đẹp, tiện dụng, thân thiện môi trường - hopphujsc.com | 1 | 562 |
| `/tuyen-dung/truong-phong-kinh-doanh/` | Trưởng Phòng Kinh Doanh - hopphujsc.com | 1 | 601 |
| `/tuyen-dung/viec-lam-moi-nhan-vien-kinh-doanh-tai-ha-noi-hung-yen/` | [Việc làm mới] NHÂN VIÊN KINH DOANH TẠI HÀ NỘI, HƯNG YÊN - hopphujsc.com | 2 | 539 |
