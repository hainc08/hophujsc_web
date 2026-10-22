# Phân tích tham chiếu Hengfor và phương án cho Hợp Phú

Ngày: 2026-10-22. Nguồn: https://www.hengforpacking.com/, truy cập trực tiếp ở 1440×900 và 390×844. Ảnh chụp: [hengfor/](hengfor/). Số đo lấy từ CSS đã tính toán của trình duyệt.

## Quan sát chung

| Hạng mục | Hengfor (đo được) |
|---|---|
| Font | Tiêu đề Cormorant Garamond 500 (serif); nội dung Plus Jakarta Sans |
| Cỡ H1 | 51px desktop, 28px mobile; line-height khoảng 0,96 |
| Cỡ H2 | 48px desktop, 25px mobile |
| Nhãn nhỏ trên tiêu đề | 12px, đậm 600, chữ hoa, giãn chữ 1,9px (ví dụ "PRODUCT RANGE") |
| Màu | Nền giấy kem `rgb(247,239,227)`, xanh rừng đậm `rgb(16,38,31)` cho hero và footer |
| Header | Cao 81px, `position: fixed`, nền trong suốt nằm đè lên hero |
| Nút | Bo 6px; nút chính dạng viên thuốc màu kem trên nền tối |
| Khoảng dọc section | 96px desktop, 80px mobile |
| Chiều cao trang | 5.701px desktop, 12.508px mobile |
| Ảnh | Ảnh dựng studio đồng bộ ánh sáng, nhiều khả năng là ảnh render |

## Đối chiếu từng section

| Section Hengfor | Hengfor làm gì | Hợp Phú có dữ liệu gì | Phương án |
|---|---|---|---|
| Header | Logo trái, menu giữa có menu con Products, nút "Request a Quote" viền | Logo, 8 danh mục, hotline | Header trắng dính trên cùng (không trong suốt, vì hero của Hợp Phú không phải ảnh tràn tối); mega menu 8 danh mục; nút đỏ "Nhận báo giá"; chuyển VI/EN |
| Hero | Ảnh tràn toàn màn hình, chữ serif trắng, 2 nút, cuộn xuống | Không có ảnh nào ≥ 1440px đủ đẹp để tràn toàn màn hình. Ảnh tốt nhất: cuộn túi trên bàn gỗ 1080×1080 | Hero chia đôi: chữ trên nền trắng, ảnh lớn tràn mép phải. Ghi nhu cầu ảnh hero ≥ 2400px vào manifest |
| Product range | Lưới mosaic 3 hàng (2 to + 1, 3 đều, 2 + thẻ CTA tối), ảnh không viền, tên nhỏ dưới ảnh | 8 danh mục thật; 5 có ảnh dùng được, 3 chỉ có banner in chữ | Mosaic tương tự nhịp điệu nhưng của Hợp Phú: thẻ CTA nền than "Cần quy cách riêng?"; danh mục thiếu ảnh dùng ô trung tính có nhãn "Ảnh tạm" |
| Process ("From idea to execution") | Danh sách 4 bước đánh số bên trái, cụm 4 ảnh bên phải | 4 bước đã nêu trong brief; không có ảnh quy trình | Danh sách 4 bước đánh số; bên phải là một ảnh sản phẩm thật (cuộn màng) thay cho cụm ảnh |
| Factory ("One supply chain") | 4 cột đánh số, cụm ảnh nhà máy lớn | Không có ảnh nhà máy; có mô tả chất liệu, kiểm soát chất lượng, máy móc nhập khẩu, vị trí QL5 | Theo prompt: rút gọn thành khối chữ nền than (chất liệu, kiểm soát chất lượng, nhà xưởng) và nút tới trang giới thiệu. Không dùng ảnh minh hoạ |
| Use cases | Ảnh editorial so le, nhãn ngành nhỏ | Ngành có sản phẩm thật tương ứng: bán lẻ, TMĐT, công nghiệp, thực phẩm, may mặc, y tế | Lưới editorial: ô có ảnh thật khi có, các ô còn lại là chữ, mỗi ô liệt kê sản phẩm đáp ứng |
| Footer | Nền xanh đậm, 4 cột, mũi tên sau mỗi liên kết | Tên pháp nhân, địa chỉ (cần xác nhận), hotline, Zalo | Footer nền than, 4 cột, gọn |
| (không có) | — | Form báo giá là trọng tâm chuyển đổi | Section báo giá riêng trước footer |

## Những gì không lấy từ Hengfor

- Font serif Cormorant: brief chọn Be Vietnam Pro, và serif mảnh khó đọc với dấu tiếng Việt ở cỡ lớn.
- Màu kem và xanh rừng: dùng đỏ, trắng, xám của Hợp Phú.
- Nhãn chữ hoa giãn chữ trên mỗi tiêu đề: chỉ giữ ở nơi có thông tin thật (số bước).
- Header trong suốt đè lên ảnh, mũi tên cuộn xuống, nhịp chữ hai dòng ngắt cố định.
- Bất kỳ ảnh, chữ, logo, code nào của Hengfor.

## Rủi ro chất lượng

Phần lớn ấn tượng "cao cấp" của Hengfor đến từ **ảnh studio đồng bộ**. Với bộ ảnh hiện có, bố cục có thể đạt nhịp và khoảng trắng tương đương, nhưng chưa đạt độ đồng đều về ảnh. Đây là việc của một buổi chụp ảnh, không phải của code. Xem danh sách cảnh cần chụp trong [asset-manifest.md](../asset-manifest.md).
