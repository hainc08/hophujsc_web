# Bản đồ URL và chuyển hướng

Ngày lập: 2026-10-08. Nguồn: 8 sitemap con của Yoast và kết quả crawl thực tế.

## Nguyên tắc

1. **Không đổi permalink nào đang có nội dung thật.** Toàn bộ trang, sản phẩm, tin tức, danh mục sản phẩm giữ nguyên URL. Redesign chỉ thay template và nội dung.
2. Trang trùng lặp được 301 về bản chính.
3. Mảnh bố cục (bài viết và category dùng để dựng khối giao diện) được đặt `noindex, follow` và loại khỏi sitemap, **không xoá**, vì template Elementor hiện tại vẫn đọc dữ liệu từ chúng. Chỉ xoá sau khi trang chủ mới không còn phụ thuộc.
4. Nội dung thử nghiệm hoặc không phù hợp trả về 410.
5. Chưa có dữ liệu Search Console, nên chưa biết URL nào đang có thứ hạng hay backlink. Trước khi áp dụng bất kỳ dòng `NOINDEX`, `301` hay `410` nào, phải đối chiếu với báo cáo Hiệu suất và Liên kết trong Search Console. URL nào có lượt nhấp thì chuyển sang 301 tới trang liên quan nhất thay vì noindex.

## Tổng hợp

| Hành động | Số URL |
|---|---|
| NOINDEX | 78 |
| GIỮ | 69 |
| GỠ khỏi sitemap | 2 |
| XOÁ → 410 | 2 |
| 301 | 2 |
| GỠ | 2 |
| GIỮ (đề xuất 301 sau) | 1 |

## Bảng đầy đủ theo URL (nguồn: sitemap Yoast, crawl ngày 2026-10-08)

| Loại | URL hiện tại | HTTP | Hành động | URL đích | Lý do |
|---|---|---|---|---|---|
| category | `/category/san-pham/` | 200 | **GIỮ** | `/category/san-pham/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tin-tuc/` | 200 | **GIỮ** | `/category/tin-tuc/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-dung-thuc-pham/` | 200 | **GIỮ** | `/category/tui-dung-thuc-pham/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-ep-quai/` | 200 | **GIỮ** | `/category/tui-ep-quai/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-hat-xoai/` | 200 | **GIỮ** | `/category/tui-hat-xoai/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-long-bao/` | 200 | **GIỮ** | `/category/tui-long-bao/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-niem-phong/` | 200 | **GIỮ** | `/category/tui-niem-phong/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tui-sieu-thi/` | 200 | **GIỮ** | `/category/tui-sieu-thi/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/category/tuyen-dung/` | 200 | **GIỮ** | `/category/tuyen-dung/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/die-cut-bag/` | 200 | **GIỮ** | `/en/category/die-cut-bag/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/export-garment-bag/` | 200 | **GIỮ** | `/en/category/export-garment-bag/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/food-bag/` | 200 | **GIỮ** | `/en/category/food-bag/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/handle-sealed-bags/` | 200 | **GIỮ** | `/en/category/handle-sealed-bags/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/inner-bag/` | 200 | **GIỮ** | `/en/category/inner-bag/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/news/` | 200 | **GIỮ** | `/en/category/news/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/product/` | 200 | **GIỮ** | `/en/category/product/` | Danh mục thật; cần title/description/nội dung mô tả |
| category | `/en/category/supermarket-bag/` | 200 | **GIỮ** | `/en/category/supermarket-bag/` | Danh mục thật; cần title/description/nội dung mô tả |
| page | `/` | 200 | **GIỮ** | `/` | Giữ nguyên permalink |
| page | `/dich-vu/` | 200 | **GIỮ** | `/dich-vu/` | Giữ nguyên permalink |
| page | `/en/about-us/` | 200 | **GIỮ** | `/en/about-us/` | Giữ nguyên permalink |
| page | `/en/contact/` | 200 | **GIỮ** | `/en/contact/` | Giữ nguyên permalink |
| page | `/en/product/` | 200 | **GIỮ** | `/en/product/` | Giữ nguyên permalink |
| page | `/en/services/` | 200 | **GIỮ** | `/en/services/` | Giữ nguyên permalink |
| page | `/lien-he/` | 200 | **GIỮ** | `/lien-he/` | Giữ nguyên permalink |
| page | `/san-pham/` | 200 | **GIỮ** | `/san-pham/` | Giữ nguyên permalink |
| page | `/ve-chung-toi/` | 200 | **GIỮ** | `/ve-chung-toi/` | Giữ nguyên permalink |
| post | `/en/handle-sealed-bags/hop-phu-pe-handle-sealed-bag-durable-stylish-and-eco-friendly/` | 200 | **GIỮ** | `/en/handle-sealed-bags/hop-phu-pe-handle-sealed-bag-durable-stylish-and-eco-friendly/` | Giữ nguyên permalink |
| post | `/en/news/asian-naphtha-crackers-start-to-cut-run-rates-as-spread-to-ethylene-falls/` | 200 | **GIỮ** | `/en/news/asian-naphtha-crackers-start-to-cut-run-rates-as-spread-to-ethylene-falls/` | Giữ nguyên permalink |
| post | `/en/news/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp/` | 200 | **GIỮ** | `/en/news/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp/` | Giữ nguyên permalink |
| post | `/en/news/hop-phu-biodegradable-supermarket-bags-eco-friendly-packaging-for-sustainable-retail/` | 200 | **GIỮ** | `/en/news/hop-phu-biodegradable-supermarket-bags-eco-friendly-packaging-for-sustainable-retail/` | Giữ nguyên permalink |
| post | `/en/news/hop-phu-line-in-plastic-bags-reliable-inner-liner-for-agricultural-industrial-packaging/` | 200 | **GIỮ** | `/en/news/hop-phu-line-in-plastic-bags-reliable-inner-liner-for-agricultural-industrial-packaging/` | Giữ nguyên permalink |
| post | `/en/news/hop-phu-pe-hd-mango-seed-bags-elegant-durable-packaging-for-modern-brands/` | 200 | **GIỮ** | `/en/news/hop-phu-pe-hd-mango-seed-bags-elegant-durable-packaging-for-modern-brands/` | Giữ nguyên permalink |
| post | `/en/news/hop-phu-shipping-bags-secure-professional-packaging-for-online-sellers/` | 200 | **GIỮ** | `/en/news/hop-phu-shipping-bags-secure-professional-packaging-for-online-sellers/` | Giữ nguyên permalink |
| post | `/en/news/thi-truong-pe-viet-nam-tiep-tuc-tang-gia-nho-nguon-cung-dac-biet-la-lldpe/` | 200 | **GIỮ** | `/en/news/thi-truong-pe-viet-nam-tiep-tuc-tang-gia-nho-nguon-cung-dac-biet-la-lldpe/` | Giữ nguyên permalink |
| post | `/en/news/thu-tuong-giao-bo-y-te-ho-tro-doanh-nghiep-mua-vaccine-sputnik-v/` | 200 | **GIỮ** | `/en/news/thu-tuong-giao-bo-y-te-ho-tro-doanh-nghiep-mua-vaccine-sputnik-v/` | Giữ nguyên permalink |
| post | `/en/news/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai/` | 200 | **GIỮ** | `/en/news/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai/` | Giữ nguyên permalink |
| post | `/en/product/courier-seal-bags/` | 200 | **GIỮ** | `/en/product/courier-seal-bags/` | Giữ nguyên permalink |
| post | `/en/product/exporting-garments-and-households-packing-bags/` | 200 | **GIỮ** | `/en/product/exporting-garments-and-households-packing-bags/` | Giữ nguyên permalink |
| post | `/en/product/food-and-vegetable-bags/` | 200 | **GIỮ** | `/en/product/food-and-vegetable-bags/` | Giữ nguyên permalink |
| post | `/en/product/garbage-bags/` | 200 | **GIỮ** | `/en/product/garbage-bags/` | Giữ nguyên permalink |
| post | `/en/product/hd-mango-seed-shopping-bags/` | 200 | **GIỮ** | `/en/product/hd-mango-seed-shopping-bags/` | Giữ nguyên permalink |
| post | `/en/product/line-in-bags/` | 200 | **GIỮ** | `/en/product/line-in-bags/` | Giữ nguyên permalink |
| post | `/en/product/pe-mango-seed-shopping-bags/` | 200 | **GIỮ** | `/en/product/pe-mango-seed-shopping-bags/` | Giữ nguyên permalink |
| post | `/en/product/pe-pp-hdpe-film-in-roll/` | 200 | **GIỮ** | `/en/product/pe-pp-hdpe-film-in-roll/` | Giữ nguyên permalink |
| post | `/en/product/polyethylene/` | 200 | **GIỮ** | `/en/product/polyethylene/` | Giữ nguyên permalink |
| post | `/en/product/self-destructing-supermarket-bags/` | 200 | **GIỮ** | `/en/product/self-destructing-supermarket-bags/` | Giữ nguyên permalink |
| post | `/san-pham/cuon-mang-hd-pe-pp-cac-loai/` | 200 | **GIỮ** | `/san-pham/cuon-mang-hd-pe-pp-cac-loai/` | Giữ nguyên permalink |
| post | `/san-pham/hat-nhua-nguyen-sinh/` | 200 | **GIỮ** | `/san-pham/hat-nhua-nguyen-sinh/` | Giữ nguyên permalink |
| post | `/san-pham/tui-dung-rac-tu-huy/` | 200 | **GIỮ** | `/san-pham/tui-dung-rac-tu-huy/` | Giữ nguyên permalink |
| post | `/san-pham/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai-2/` | 200 | **GIỮ** | `/san-pham/tui-ep-quai-cao-cap-giai-phap-bao-bi-thoi-thuong-cho-thuong-hieu-hien-dai-2/` | Giữ nguyên permalink |
| post | `/san-pham/tui-hat-xoai-pe-hd-hop-phu-giai-phap-bao-bi-tinh-te-cho-thuong-hieu-hien-dai/` | 200 | **GIỮ** | `/san-pham/tui-hat-xoai-pe-hd-hop-phu-giai-phap-bao-bi-tinh-te-cho-thuong-hieu-hien-dai/` | Giữ nguyên permalink |
| post | `/san-pham/tui-hd/` | 200 | **GIỮ** | `/san-pham/tui-hd/` | Giữ nguyên permalink |
| post | `/san-pham/tui-hot-xoai/` | 200 | **GIỮ** | `/san-pham/tui-hot-xoai/` | Giữ nguyên permalink |
| post | `/san-pham/tui-long-bao-tui-lot-hop-phu-giai-phap-dong-goi-ben-chac-an-toan-cho-nong-lam-san/` | 200 | **GIỮ** | `/san-pham/tui-long-bao-tui-lot-hop-phu-giai-phap-dong-goi-ben-chac-an-toan-cho-nong-lam-san/` | Giữ nguyên permalink |
| post | `/san-pham/tui-long-bao-tui-lot/` | 200 | **GIỮ** | `/san-pham/tui-long-bao-tui-lot/` | Giữ nguyên permalink |
| post | `/san-pham/tui-may-mac-xuat-khau/` | 200 | **GIỮ** | `/san-pham/tui-may-mac-xuat-khau/` | Giữ nguyên permalink |
| post | `/san-pham/tui-niem-phong-hop-phu-giai-phap-bao-bi-hieu-qua-cho-nha-ban-hang-online/` | 200 | **GIỮ** | `/san-pham/tui-niem-phong-hop-phu-giai-phap-bao-bi-hieu-qua-cho-nha-ban-hang-online/` | Giữ nguyên permalink |
| post | `/san-pham/tui-niem-phong/` | 200 | **GIỮ** | `/san-pham/tui-niem-phong/` | Giữ nguyên permalink |
| post | `/san-pham/tui-sieu-thi-tu-huy-hop-phu-lua-chon-bao-bi-xanh-cho-doanh-nghiep-hien-dai/` | 200 | **GIỮ** | `/san-pham/tui-sieu-thi-tu-huy-hop-phu-lua-chon-bao-bi-xanh-cho-doanh-nghiep-hien-dai/` | Giữ nguyên permalink |
| post | `/san-pham/tui-sieu-thi/` | 200 | **GIỮ** | `/san-pham/tui-sieu-thi/` | Giữ nguyên permalink |
| post | `/tin-tuc/bao-gia-pe-pp-thang-8-tang-len-bat-chap-nhu-cau-thap-o-chau-phi/` | 200 | **GIỮ** | `/tin-tuc/bao-gia-pe-pp-thang-8-tang-len-bat-chap-nhu-cau-thap-o-chau-phi/` | Giữ nguyên permalink |
| post | `/tin-tuc/cac-nha-may-cracker-naphtha-chau-a-bat-dau-cat-giam-cong-suat-van-hanh-do-giam-muc-chenh-lech-voi-ethylene/` | 200 | **GIỮ** | `/tin-tuc/cac-nha-may-cracker-naphtha-chau-a-bat-dau-cat-giam-cong-suat-van-hanh-do-giam-muc-chenh-lech-voi-ethylene/` | Giữ nguyên permalink |
| post | `/tin-tuc/gia-nhap-khau-ld-hdpe-cua-trung-quoc-di-xuong-sau-2-thang-gia-lldpe-khoi-sac-hon/` | 200 | **GIỮ** | `/tin-tuc/gia-nhap-khau-ld-hdpe-cua-trung-quoc-di-xuong-sau-2-thang-gia-lldpe-khoi-sac-hon/` | Giữ nguyên permalink |
| post | `/tin-tuc/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp-2/` | 200 | **GIỮ** | `/tin-tuc/hiep-hoi-nhua-phat-hoang-vi-cong-ty-han-doi-tang-thue-nhap-nguyen-lieu-nhua-pp-2/` | Giữ nguyên permalink |
| post | `/tin-tuc/tam-ly-ppbc-cua-trung-quoc-yeu-hon-so-voi-pp-homo-do-thieu-nhu-cau/` | 200 | **GIỮ** | `/tin-tuc/tam-ly-ppbc-cua-trung-quoc-yeu-hon-so-voi-pp-homo-do-thieu-nhu-cau/` | Giữ nguyên permalink |
| post | `/tin-tuc/tb-cap-nhat-dia-chi-theo-thay-doi-dia-gioi-hanh-chinh/` | 200 | **GIỮ** | `/tin-tuc/tb-cap-nhat-dia-chi-theo-thay-doi-dia-gioi-hanh-chinh/` | Giữ nguyên permalink |
| post | `/tui-ep-quai/tui-ep-quai-pe-hop-phu-ben-dep-tien-dung-than-thien-moi-truong/` | 200 | **GIỮ** | `/tui-ep-quai/tui-ep-quai-pe-hop-phu-ben-dep-tien-dung-than-thien-moi-truong/` | Giữ nguyên permalink |
| post | `/tuyen-dung/truong-phong-kinh-doanh/` | 200 | **GIỮ** | `/tuyen-dung/truong-phong-kinh-doanh/` | Giữ nguyên permalink |
| post | `/tuyen-dung/viec-lam-moi-nhan-vien-kinh-doanh-tai-ha-noi-hung-yen/` | 200 | **GIỮ** | `/tuyen-dung/viec-lam-moi-nhan-vien-kinh-doanh-tai-ha-noi-hung-yen/` | Giữ nguyên permalink |
| page | `/en/homepage-2/` | 200 | **GIỮ (đề xuất 301 sau)** | `/en/` | Slug trang chủ EN không chuẩn; chỉ đổi khi đã có redirect và cập nhật hreflang |
| page | `/lien-he-3/` | 200 | **301** | `/lien-he/` | Trang liên hệ trùng lặp |
| page | `/ve-chung-toi-2/` | 200 | **301** | `/ve-chung-toi/` | Trang giới thiệu trùng lặp, có 4 thẻ H1 |
| post | `/en/product/test-san-pham/` | 200 | **XOÁ → 410** | — | Nội dung thử nghiệm/không phù hợp đang được index |
| post | `/ve-cong-ty/fuck/` | 200 | **XOÁ → 410** | — | Nội dung thử nghiệm/không phù hợp đang được index |
| category | `/category/video/` | 404 | **GỠ** | — | Đang 404 nhưng vẫn nằm trong sitemap; gỡ khỏi sitemap, xoá bản ghi rác |
| product | `/s%E1%BA%A3n%20ph%E1%BA%A9m/dasd/` | 404 | **GỠ** | — | Đang 404 nhưng vẫn nằm trong sitemap; gỡ khỏi sitemap, xoá bản ghi rác |
| post | `/en/about-us/about-us/` | 301 | **GỠ khỏi sitemap** | `/en/about-us/` | Đã 301 sẵn; sitemap không nên chứa URL chuyển hướng |
| post | `/ve-chung-toi/ve-chung-toi/` | 301 | **GỠ khỏi sitemap** | `/ve-chung-toi/` | Đã 301 sẵn; sitemap không nên chứa URL chuyển hướng |
| author | `/author/daniel/` | 200 | **NOINDEX** | — | Trang tác giả, không có giá trị tìm kiếm |
| category | `/category/doi-tac/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/footer-new/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/footer/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/khach-hang-noi-gi-ve-chung-toi/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/logo/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/loi-gioi-thieu/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/tai-sao-chon-chung-toi/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/tieu-de-2/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/tieu-de-3/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/tieu-de/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/uncategorized/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/ve-chung-toi/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/category/ve-cong-ty/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/about-us/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/eng/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/footer-eng/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/footer-new1/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/introduction/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/logo-en/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/partner/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/title-2/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/title-3/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/title/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/uncategorized-en/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/what-customers-say-about-us/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| category | `/en/category/why-choose-us/` | 200 | **NOINDEX** | — | Danh mục kỹ thuật dùng để dựng bố cục, không phải nội dung |
| page | `/cua-hang/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |
| page | `/gio-hang/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |
| page | `/tai-khoan/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |
| page | `/thanh-toan/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |
| post | `/doi-tac/doi-tac-homemart/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-homicook/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-prosport/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-sunhouse/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-tuyen-tuyet/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-vinmart/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/doi-tac/doi-tac-yody/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/eng/we-are-providing-2/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/footer-eng/hop-phu-manufacturing-and-trading-jsc/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/footer-new1/news/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/introduction/welcome-hop-phu-jsc/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/logo-en/hop-phu-manufacturing-and-trading-joint-stock-company/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/homemart/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/homicook/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/prosport/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/sunhouse/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/tuyen-tuyet-mart/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/vinmart/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/partner/yody/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/title-2/customer-reviews/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/title-3/our-partners/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/title/reasons-for-sellecting-hop-phu-jsc/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/uncategorized-en/we-are-providing/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/what-customers-say-about-us/hanh-trang-2/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/what-customers-say-about-us/hoang-bang-2/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/what-customers-say-about-us/hong-giang-2/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/why-choose-us/discounted-price/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/why-choose-us/quick-supply/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/en/why-choose-us/superior-quality/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/footer-new/tin-tuc-moi-nhat/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/footer/cong-ty-cp-sx-tm-hop-phu/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/khach-hang-noi-gi-ve-chung-toi/hanh-trang/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/khach-hang-noi-gi-ve-chung-toi/hoang-bang/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/khach-hang-noi-gi-ve-chung-toi/hong-giang/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/logo/cong-ty-co-phan-san-xuat-va-thuong-mai-hop-phu/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/loi-gioi-thieu/chao-mung-den-voi-hop-phu/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tai-sao-chon-chung-toi/chat-luong-vuot-troi/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tai-sao-chon-chung-toi/gia-uu-dai/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tai-sao-chon-chung-toi/nhanh-chong/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tieu-de-2/khach-hang-noi-ve-chung-toi/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tieu-de-3/doi-tac-cua-chung-toi/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/tieu-de/tai-sao-lai-chon-hop-phu/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/uncategorized/chung-toi-cung-ung/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/video/video-2/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| post | `/video/video1/` | 200 | **NOINDEX** | — | Bài viết là mảnh bố cục (tiêu đề khối, footer, logo, đối tác, lời chứng thực) |
| product | `/shop/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |
| product_cat | `/danh-muc-san-pham/chua-phan-loai/` | 200 | **NOINDEX** | — | Trang WooCommerce không dùng (không có sản phẩm thật) |

## Liên kết nội bộ ngoài sitemap cần xử lý

| URL | HTTP | Đích hiện tại | Số trang trỏ tới | Hành động |
|---|---|---|---|---|
| `/about-us/` | 301 | `/en/about-us/about-us/` | 152 | Sửa liên kết footer thành `/ve-chung-toi/` (đang đẩy người dùng tiếng Việt sang bản EN) |
| `/services/` | 301 | `/en/services/` | 152 | Sửa liên kết footer thành `/dich-vu/` |
| `/blog/` | 404 | — | 152 | Sửa liên kết footer thành `/san-pham/` |
| `/contact/` | 301 | `/en/contact/` | 152 | Sửa liên kết footer thành `/lien-he/` |
| `/en/homepage-2` | 301 | `/en/homepage-2/` | 69 | Thêm dấu `/` cuối trong bộ chuyển ngôn ngữ |
| `/sản%20phẩm/dasd/` | 404 | — | 2 | Gỡ liên kết |
| `/en/danh-muc-san-pham/chua-phan-loai/` | 404 | — | 1 | Gỡ liên kết |

## Trùng lặp nội dung cần hợp nhất (không đổi URL ở giai đoạn này)

| Nhóm | URL | Đề xuất |
|---|---|---|
| Túi hạt xoài | `/san-pham/tui-hd/` (H1 "Túi hạt xoài HD"), `/san-pham/tui-hot-xoai/` (H1 "Túi hạt xoài PE", slug sai chính tả), `/san-pham/tui-hat-xoai-pe-hd-hop-phu-…/` (bài PR) | Giữ cả ba URL. Hai trang đầu là trang sản phẩm riêng theo chất liệu; bài PR liên kết về hai trang đó và về `/category/tui-hat-xoai/`. Không sửa slug `tui-hot-xoai` vì lợi ích nhỏ hơn rủi ro |
| Túi niêm phong, túi siêu thị, túi lồng bao, túi ép quai | Mỗi loại có 1 trang sản phẩm ngắn và 1 bài PR dài | Trang sản phẩm là trang đích chính cho từ khoá giao dịch; bài PR nhắm từ khoá thông tin và liên kết về trang sản phẩm |
| Tin PP | `/tin-tuc/hiep-hoi-nhua-…-pp-2/` (VI) và `/en/news/hiep-hoi-nhua-…-pp/` (EN nhưng slug và nội dung tiếng Việt) | Trùng title. Kiểm tra bản EN: nếu là nội dung tiếng Việt thì chuyển về ngôn ngữ `vi` hoặc noindex |
| Bài EN có slug tiếng Việt | `/en/news/thi-truong-pe-viet-nam-…/`, `/en/news/thu-tuong-giao-bo-y-te-…/`, `/en/news/tui-ep-quai-cao-cap-…/` | Kiểm tra ngôn ngữ nội dung thực tế; gán đúng ngôn ngữ trong Polylang |

## Cách triển khai chuyển hướng

Site đã có Yoast SEO. Bản Yoast miễn phí không có trình quản lý redirect, nên các dòng 301/410 đặt trong plugin riêng của dự án (`wp-content/mu-plugins/hopphu-seo.php`, xem [seo-implementation.md](seo-implementation.md)) để theo dõi được bằng git và gỡ được bằng cách xoá một file.

## Kiểm tra sau khi áp dụng

Chạy lại script crawl với danh sách URL trong bảng trên và xác nhận:

- Mọi dòng `GIỮ` trả về 200, canonical trỏ về chính nó.
- Mọi dòng `301` trả về đúng một bước chuyển hướng tới URL đích, URL đích trả về 200.
- Mọi dòng `NOINDEX` trả về 200 kèm `<meta name="robots" content="noindex, follow">` và không còn trong sitemap.
- Mọi dòng `410` trả về 410.
- Sitemap không chứa URL nào có mã khác 200.

Trạng thái: **chưa áp dụng**. Chưa có thay đổi nào trên production.
