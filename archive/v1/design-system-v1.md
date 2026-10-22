# Design system Hợp Phú

Phiên bản 0.1, ngày 2026-10-08. Nguồn code: [src/styles/tokens.css](../src/styles/tokens.css), [base.css](../src/styles/base.css), [components.css](../src/styles/components.css), [home.css](../src/styles/home.css).

## 1. Định hướng

Hợp Phú là nhà sản xuất, bán cho bộ phận mua hàng của doanh nghiệp. Người đọc cần biết ba điều trong vài giây: công ty làm ra cái gì, làm theo quy cách riêng được không, liên hệ báo giá ở đâu. Thiết kế phục vụ đúng ba điều đó.

Bốn nguyên tắc:

1. **Trình bày như bảng quy cách, không như tờ rơi.** Danh mục sản phẩm là một bảng có chất liệu, quy cách thông dụng, ứng dụng. Đây là thứ người mua bao bì thực sự so sánh.
2. **Chất liệu là nhân vật chính.** Bốn mã HDPE, LDPE, PP, OPP xuất hiện ngay dưới hero, cỡ chữ lớn, màu thương hiệu.
3. **Chỉ dùng thứ có thật.** Ảnh là ảnh sản phẩm của công ty. Không có số liệu thành tích, lời chứng thực hay ảnh nhà máy vì site chưa có dữ liệu xác thực cho các mục này.
4. **Tiết chế.** Một màu nhấn, hai họ chữ, góc gần vuông, không gradient, không hiệu ứng xuất hiện khi cuộn.

## 2. Màu

Bảng màu tham khảo trong đề bài (navy `#12304A`, xanh `#2878A8`, cam `#F29B38`) **không được dùng**, vì logo Hợp Phú là đỏ mận. Lấy mẫu điểm ảnh từ `LOGO-2.png` cho dải `#500000`–`#901000`, tập trung quanh `#701000`–`#801000`. Màu hồng tím `#830A48` và vàng `#FFCF00` của site hiện tại là màu của demo Betheme, cũng bị loại.

| Token | Giá trị | Vai trò |
|---|---|---|
| `--oxblood` | `#7A1508` | Màu thương hiệu: nút chính, liên kết, mã chất liệu, vạch nhấn |
| `--oxblood-deep` | `#5A0E04` | Trạng thái hover của nút chính |
| `--graphite` | `#1E252B` | Chữ chính, nền khối tối |
| `--steel` | `#55616B` | Chữ phụ |
| `--line` | `#D6DCE1` | Đường kẻ |
| `--mist` | `#F1F3F5` | Nền khối xen kẽ |
| `--film` | `#E3ECEA` | Nền ảnh hero, gợi màu màng PE |
| `--white` | `#FFFFFF` | Nền |

Token vai trò (`--color-text`, `--color-action`, `--color-border`…) trỏ về các màu trên; component chỉ dùng token vai trò.

Tương phản (tính theo WCAG, chữ thường cần 4,5:1):

| Cặp | Tỷ lệ | Đạt |
|---|---|---|
| Graphite trên trắng | 15,5:1 | AA, AAA |
| Steel trên trắng | 6,3:1 | AA |
| Steel trên mist | 5,7:1 | AA |
| Steel trên film (chú thích ảnh hero) | 5,3:1 | AA |
| Trắng trên oxblood | 10,8:1 | AA, AAA |
| `#C9D1D8` trên graphite | 10,0:1 | AA, AAA |
| Số bước `#E8A79E` trên graphite | 7,7:1 | AA, AAA |
| Chữ lỗi `#A3170D` trên trắng | 7,8:1 | AA, AAA |
| Viền ô nhập `#7B8690` trên trắng | 3,7:1 | Đạt 3:1 cho thành phần giao diện |
| Viền focus `#0B57D0` trên trắng | 6,4:1 | Đạt 3:1 |
| Viền focus `#9EC5FF` trên graphite | 8,8:1 | Đạt 3:1 |

Viền focus xanh đậm chỉ đạt 2,4:1 trên nền graphite, nên khối tối và footer dùng `--color-focus-on-dark`.

Lighthouse không báo lỗi `color-contrast` nào trên trang chủ mới.

## 3. Chữ

| Vai trò | Font | Độ đậm | Lý do |
|---|---|---|---|
| Tiêu đề, mã chất liệu, số bước | Barlow Semi Condensed | 600 | Nét chữ bảng hiệu công nghiệp; dáng hẹp cho phép tiêu đề tiếng Việt dài nằm gọn trên mobile |
| Nội dung, nút, form | Be Vietnam Pro | 400, 500, 600 | Thiết kế riêng cho tiếng Việt, dấu thanh rõ ở cỡ nhỏ |

Cả hai có bộ ký tự tiếng Việt đầy đủ. Tổng cộng 4 file font, so với 54 biến thể của site hiện tại.

Thang cỡ chữ:

| Token | Cỡ | Dùng cho |
|---|---|---|
| `--text-xs` | 13px | Chú thích ảnh, gợi ý form |
| `--text-sm` | 15px | Bảng, menu, footer |
| `--text-base` | 17px | Nội dung |
| `--text-lg` | 20px | Đoạn dẫn |
| `--text-xl` | 22–28px | H3 |
| `--text-2xl` | 28–40px | H2, mã chất liệu |
| `--text-3xl` | 36–68px | H1 |

Ba cỡ lớn dùng `clamp()` nên co giãn liên tục theo bề rộng màn hình. Line-height tiêu đề là 1,15 (không thấp hơn, vì dấu tiếng Việt xếp chồng như "ệ", "ẩ" sẽ chạm dòng trên). Nội dung 1,65. Đoạn văn giới hạn 68 ký tự mỗi dòng.

Quy ước: viết hoa đầu câu, không viết hoa toàn bộ. Các tiêu đề viết hoa toàn bộ trên site cũ ("TÚI NIÊM PHONG") được chuyển về dạng thường.

Font dự phòng: hai `@font-face` cục bộ dựa trên Arial với `size-adjust` 81% và 107% (đo bằng canvas trên chuỗi tiếng Việt) để chữ gần như không đổi bề rộng khi webfont tải xong.

## 4. Khoảng cách và lưới

- Khoảng cách: `--space-1` đến `--space-9`, bội số của 4px (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Khoảng cách dọc giữa các khối: `--section-y`, 56–112px.
- Container: tối đa 76rem (1216px); bản hẹp 46rem cho trang bài viết.
- Lề ngang: `--gutter`, 20–40px.
- Khe lưới: `--grid-gap`, 16–32px.
- Căn lề: toàn bộ căn trái. Tiêu đề khối không căn giữa.

Breakpoint (mobile-first):

| Tên | Giá trị | Thay đổi chính |
|---|---|---|
| sm | 40rem (640px) | Lưới sản phẩm 2 cột, form 2 cột |
| md | 56rem (896px) | Hero 2 cột, bảng quy cách thành bảng thật, ẩn thanh liên hệ đáy |
| lg | 72rem (1152px) | Menu ngang, lưới sản phẩm 4 cột, quy trình 6 cột |

## 5. Hình khối

- Bo góc `--radius-sm` 2px cho nút và ô nhập, `--radius-md` 4px cho khung form. Không có thẻ bo tròn lớn.
- Đường kẻ 2px màu graphite mở đầu một danh sách; 1px màu line ngăn các dòng; 3px màu oxblood đánh dấu thẻ sản phẩm và menu con.
- Không dùng đổ bóng trang trí. Chỉ menu thả xuống có bóng để tách khỏi nội dung bên dưới.

## 6. Component

Mỗi component là một hàm trong [src/components.mjs](../src/components.mjs).

| Component | Hàm | Biến thể và trạng thái |
|---|---|---|
| Nút | `button()` | `primary` (nền oxblood), `secondary` (viền graphite), `block`. Hover đổi nền; focus có viền xanh 3px; cao tối thiểu 48px |
| Liên kết văn bản | `.text-link` | Mặc định, `--light` trên nền tối. Luôn gạch chân |
| Ảnh | `image()` | Luôn có `width`, `height`, `alt`. `priority` cho ảnh LCP, còn lại `loading="lazy"` |
| Header | `siteHeader()` | Dính trên cùng. Từ 1152px: menu ngang, menu con mở khi rê chuột hoặc bấm nút mũi tên. Dưới 1152px: nút menu mở bảng điều hướng, Esc để đóng |
| Tiêu đề khối | `sectionHeader()` | H2 và đoạn dẫn tuỳ chọn |
| Thẻ sản phẩm | `productCard()` | Ảnh vuông, chất liệu, tên, mô tả. Hover phóng ảnh 3% |
| Dòng bài viết | `postItem()` | Chủ đề, ngày, tiêu đề |
| Bảng quy cách | `.spec-table` | Bảng thật từ 896px; dưới mức đó mỗi dòng thành một khối có nhãn |
| Form báo giá | `quoteForm()` | Nhãn luôn hiển thị phía trên ô. Lỗi hiện dưới từng ô khi rời ô và khi gửi, kèm `aria-invalid`; thông báo tổng dùng `role="status"` |
| Footer | `siteFooter()` | 3 cột: công ty, danh mục sản phẩm, liên kết |
| Thanh liên hệ | `.contact-bar` | Cố định ở đáy trên mobile: Gọi, Zalo, Báo giá. Thay cho 5 nút nổi của site cũ |

Khối riêng của trang chủ ([home.css](../src/styles/home.css)): hero, dải chất liệu, giới thiệu, lý do, quy trình, khách hàng, báo giá.

## 7. Chuyển động

- Chuyển màu 160ms trên nút, liên kết, dòng bảng.
- Ảnh sản phẩm phóng nhẹ khi rê chuột.
- Không có hiệu ứng xuất hiện khi cuộn, không có bộ đếm số, không có slider.
- `prefers-reduced-motion: reduce` tắt cuộn mượt và mọi transition.

## 8. Accessibility

Mục tiêu WCAG 2.2 AA.

- Liên kết "Bỏ qua, đến nội dung chính" là phần tử đầu tiên nhận focus.
- Một H1 mỗi trang; cấp heading không nhảy bậc.
- Mọi phần tử tương tác có viền focus nhìn thấy được (`:focus-visible`, 3px).
- Vùng bấm tối thiểu 24×24px; nút và ô nhập cao 48px.
- Cho phép phóng to (đã bỏ `maximum-scale=1`).
- Menu con điều khiển bằng `<button aria-expanded>`, không phụ thuộc hover.
- Số bước quy trình sinh bằng `<ol>`, vì đây là chuỗi có thứ tự.

## 9. Giọng văn giao diện

- Tiếng Việt, câu ngắn, chủ động. Nút nói đúng việc sẽ xảy ra: "Yêu cầu báo giá", "Gửi yêu cầu báo giá", "Xem sản phẩm".
- Một hành động giữ một tên xuyên suốt: nút "Gửi yêu cầu báo giá" cho ra thông báo "Đã gửi yêu cầu báo giá".
- Thông báo lỗi nói cần sửa gì: "Nhập số điện thoại gồm 9 đến 11 chữ số."
- Không dùng so sánh nhất chưa kiểm chứng ("hàng đầu", "nhanh nhất khu vực", "ưu đãi nhất thị trường", "24/7").
