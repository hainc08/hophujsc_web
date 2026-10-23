# Redesign V2: trang chủ theo tham chiếu PPC Flex

Ngày: 2026-10-23. Branch: `redesign-v2` (tách từ `redesign-editorial`). Brief: "HỢP PHÚ JSC — PREMIUM WEBSITE REDESIGN V2".

## 1. Audit tham chiếu

| Trang | Quan sát được (truy cập trực tiếp 1440px và 390px) |
|---|---|
| ppcflex.com | Hero: ảnh sản phẩm lớn trên nền xám nhạt, tiêu đề đậm (Outfit 700, 60px), một nút chính. Lưới "Markets" 4 cột ảnh thật. Giới thiệu, hoàn thiện, năng lực dùng ảnh nhà máy tràn toàn chiều rộng. Phần lớn cảm giác cao cấp đến từ ảnh studio đồng bộ |
| awwwards.com/sites/icpg | Tiêu đề rất đậm, ảnh sản phẩm tách nền trên nền trắng, nhiều khoảng trắng |
| pfu.com.ua | **Không quan sát được**: trang dựng bằng JavaScript và trả về trang trắng khi tải tự động. Không đưa nhận xét nào về trang này |

Ảnh chụp tham chiếu lưu cục bộ ở `docs/reference/v2/` (không commit vì là nội dung của bên thứ ba).

## 2. Thay đổi so với bản editorial

| Phần | Trước | Sau (V2) |
|---|---|---|
| Hero | Nền trắng, chữ đậm 500, 2 ảnh lệch | Nền xám nhạt, chữ đậm 700, một ảnh sản phẩm lớn, 2 dữ kiện bên dưới |
| Sản phẩm | Lưới so le 12 cột | Lưới 3 cột đều (desktop), 5 ảnh cùng tỷ lệ 4:5; ô thứ 6 là danh sách 3 dòng chưa có ảnh. Mobile: ảnh đầu chiếm cả hàng, 4 ảnh còn lại 2x2. Ảnh cuộn màng nền trắng hiển thị trọn, hoà vào nền xám |
| Phương châm | Khối riêng | Gộp vào phần nhà máy (brief: không thêm khối đứng riêng) |
| Nhà máy | Ô ảnh chính trong khung container | Ô ảnh chính tràn toàn chiều rộng; nhãn "Ảnh thật đang chờ chụp" ghi một lần thay vì lặp ở từng ô |
| Quy trình | Danh sách dọc + ảnh | 4 bước ngang, số lớn, không ảnh minh hoạ |
| Ứng dụng theo ngành | Bảng chỉ mục | Bỏ khỏi trang chủ (brief không liệt kê) |
| Footer | 4 cột | Gọn hơn: ít khoảng đệm, danh sách sản phẩm 2 cột |
| Font | 400, 500, 600 | 400, 500, 700 |

Trang con, URL, SEO và form báo giá giữ nguyên.

## 3. Kiểm thử (localhost)

| Hạng mục | Kết quả |
|---|---|
| Lighthouse trang chủ VI, mobile 3 lần | Performance 99/100/100, các mục khác 100; LCP 1,4–1,5 s; CLS 0 |
| Lighthouse trang chủ VI, desktop | 100/100/100/100 |
| Lighthouse trang chủ EN | Mobile 99–100, desktop 100 |
| Liên kết và trang (40 trang) | 0 liên kết gãy; công cụ kiểm tra trang không có lỗi |
| Nút hero, nút header, menu, mega menu, menu mobile | Đúng đích, dừng dưới header 92px |
| Form | Chọn sẵn sản phẩm, báo lỗi, tick đồng ý, gửi: đúng |
| Tràn ngang 390 / 768 / 1440 / 1920 | Không |

Đã sửa: ô đồng ý 22px nâng lên 24px (vùng chạm tối thiểu WCAG 2.2).

## 4. Ảnh còn thiếu

Không có ảnh nhà máy thật. Bốn ô chờ và danh sách cảnh cần chụp: `docs/asset-manifest.md`, mục "Ảnh nhà máy". Brief yêu cầu đủ 4 cảnh: xưởng sản xuất, máy móc, kiểm tra chất lượng, thành phẩm.
