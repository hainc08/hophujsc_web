# Redesign V3: trang chủ theo concept "Broadsheet"

Ngày: 2026-10-24. Branch: `redesign-v3` (tách từ `review-khach-01`).
Nguồn: `Hop Phu v3 - Landing.html` do chủ dự án dựng bằng Claude Design (file đóng gói, không commit).

## Concept

Phong cách tờ báo in, tách màu CMYK trên nền giấy:
- **Màu:** nền giấy `#F3F2F2`, mực đen `#201E1D`, cyan `#0088B0`, magenta `#D6006C`, vàng process `#EDBB00`.
- **Chữ:** một họ serif Source Serif 4, dùng cho cả tiêu đề và thân bài.
- **Hiệu ứng:** tiêu đề và số lớn có viền mực lệch; ảnh lớn in tách màu, rê chuột thì các bản in khớp lại; ảnh nhỏ phủ lưới chấm halftone.

Sáu phần: hero, Về chúng tôi (3 giá trị và nhà sáng lập), 9 dòng sản phẩm (có hộp chi tiết), Năng lực nhà máy (3 trụ cột), Sản xuất theo yêu cầu (7 bước), Liên hệ (bản đồ và form).

## Khác với concept, và lý do

| Concept | Bản dựng | Lý do |
|---|---|---|
| React chạy trong trình duyệt, ảnh lấy từ web cũ (có logo, khẩu hiệu in đè) | HTML tĩnh trong hệ build sẵn có; ảnh thật đã làm sạch trong `assets/source` | Nhanh, giữ URL và SEO; không dùng ảnh có chữ in đè |
| Hiệu ứng tách màu ảnh chạy bằng bộ lọc SVG, tính lại mỗi khung hình khi di chuột | Bản tách màu **tính sẵn khi build** (cùng ma trận màu và độ lệch của concept); rê chuột thì ảnh gốc hiện dần (opacity, 0,52 s) | Bộ lọc SVG trên ảnh lớn gây giật. Opacity chạy trên GPU nên mượt |
| Ảnh gốc luôn được tải | Ảnh gốc chỉ tải khi rê chuột lần đầu; điện thoại không tải | Nhẹ trang |
| Chữ tách màu: 4 bản sao chữ trong HTML, biến con trỏ đặt trên `:root` | Chữ thật một lần; bản M, Y là `::before/::after` (alt rỗng); biến con trỏ đặt trên từng tiêu đề đang hiển thị, chỉ chạy khi con trỏ di chuyển | Không lặp chữ với Google và trình đọc màn hình; không bắt cả trang tính lại style mỗi khung hình |
| Bản đồ Google nhúng sẵn | Nút "Xem bản đồ", bấm mới tải | Trang nhẹ, không gửi dữ liệu cho Google trước khi người dùng muốn |
| Câu trích dẫn nhà sáng lập tự đặt, "[Họ tên nhà sáng lập]" | Phương châm thật của công ty và Ban lãnh đạo thật (3 người, ảnh đã duyệt) | Không bịa lời trích dẫn |
| Các mục "[cần xác nhận]" (diện tích, công suất, giờ làm việc, chất liệu) | Bỏ; chất liệu chưa có ghi "Theo yêu cầu" | Không đưa chỗ trống lên web |
| Cyan `#0088B0` cho nút và chữ nhỏ (3,6:1 – 4,1:1) | Nút `#00779B` (5,1:1), chữ nhấn `#006786` (5,7:1); `#0088B0` giữ cho số lớn và hiệu ứng in | Đạt WCAG AA |
| Chữ phụ xám nhạt | `#4D4A4A` (7,9:1) | Góp ý khách: chữ phụ phải đậm, đọc được ngoài nắng |
| Lưới sản phẩm 1 cột trên điện thoại | 2 cột | 9 dòng, 5 ô chưa có ảnh: 1 cột quá dài |
| Icon Phosphor ở 7 bước | Không icon | Bớt tải một bộ icon; số lớn đã đủ nhịp |

Giữ từ các đợt trước: nút ngôn ngữ ở góc phải (góp ý khách), mega menu, form báo giá PHP, footer có liên kết nội bộ (đổi sang nền giấy, kẻ đôi như concept).

## Nội dung và nguồn

- **Mô tả, kích thước thông dụng, ứng dụng của 9 dòng:** trang danh mục cũ (`pages.json`) và bài viết công ty gửi (`assets/source/tai-lieu/*.md`). Ví dụ kích thước túi niêm phong 17x26 … 45x61 cm (+4 cm nắp dán).
- **Tầm nhìn, sứ mệnh, giá trị cốt lõi, phương châm:** trang Giới thiệu cũ. Câu tầm nhìn gốc có cụm "hàng đầu" nên thân thẻ dùng câu khác trong cùng bài.
- **Túi bầu ươm:** mô tả theo banner công ty gửi ("2 lớp trắng/đen, chống nóng, gấp phẳng, mở ra dạng đứng").
- **Bản tiếng Anh:** dịch mới, cần duyệt (xem `docs/translation-review.md`).

## Cần chủ dự án hoặc khách xác nhận

1. Quy trình **7 bước** của concept, nhất là bước "Thiết kế & duyệt file in" và "Làm mẫu". Bản trước (HP-07A) dùng 4 bước. Bài viết túi ép quai có nhắc "mẫu thử miễn phí".
2. Bảng màu CMYK thay cho đỏ: logo vẫn đỏ mận; nút và liên kết chuyển sang cyan.
3. Ảnh còn thiếu: túi lồng bao, túi lót, túi bầu ươm, túi thực phẩm, túi theo yêu cầu khác; ảnh toàn cảnh nhà xưởng. Ảnh xưởng hiện là ảnh điện thoại, khi in tách màu nhìn hơi mờ.
4. Giờ làm việc (concept có, chưa có dữ liệu nên chưa hiển thị).

## Kiểm thử (localhost, 2026-10-24)

| Hạng mục | Kết quả |
|---|---|
| Lighthouse trang chủ VI | Desktop 100/100/100/100; mobile 100 (3 lần), LCP 1,4 s, CLS 0,044 |
| Lighthouse trang chủ EN | Desktop 100; mobile 99–100 |
| Lighthouse trang danh mục | 100 |
| Liên kết | 40 trang, 0 gãy; `check_page.py` không lỗi |
| Tràn ngang 390 / 768 / 1440 | Không |
| Chuyển động (Chrome thật, qua DevTools Protocol) | Chữ lệch theo con trỏ; ảnh gốc hiện dần 0,52 s; hộp chi tiết mở mờ dần, Esc đóng; 15 khối xuất hiện so le khi cuộn; không lỗi console |
| Tiêu đề H1 | Chữ một lần trong HTML; tên đọc trình đọc màn hình đúng |

Ảnh chụp: `docs/screenshots/v3/`.
