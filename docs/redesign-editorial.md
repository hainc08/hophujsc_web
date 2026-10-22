# Tinh chỉnh "Industrial Editorial": trang chủ và mục nhà máy

Ngày: 2026-10-22. Brief: "HỢP PHÚ JSC — PREMIUM DESIGN REFINEMENT". Phạm vi: tinh chỉnh, không dựng lại. Giữ màu, nội dung thật, URL, form báo giá.

## 1. Vì sao bản trước trông như template

| Dấu hiệu | Ở đâu | Vì sao gây cảm giác "AI làm" |
|---|---|---|
| Ảnh không đồng bộ | Catalogue, ứng dụng | Mỗi ảnh một kiểu: logo và khẩu hiệu viết tay in đè, banner quảng cáo, nền trắng cắt ghép. Mắt đọc thành "ghép từ nhiều nguồn" |
| Ô "Ảnh tạm" trong lưới sản phẩm | Catalogue | 3/9 ô là khung viền đứt nằm ngang hàng ảnh thật, trông như trang chưa làm xong |
| Mọi section cùng một khuôn | Toàn trang | Tiêu đề trái, đoạn dẫn, rồi lưới; lặp 5 lần. Không section nào có hình dạng riêng |
| Tiêu đề cỡ vừa, đậm 600 | Toàn trang | Thiếu tương phản cỡ chữ; không có khoảnh khắc chữ làm chủ |
| Đỏ rải khắp nơi | Gạch đỏ trên ghi chú hero, số bước, đường kẻ báo giá, liên kết | Đỏ mất vai trò "hành động chính" |
| Khối chữ 4 cột trên nền tối | Năng lực | Không có hình ảnh, trông như bảng tính năng SaaS |
| 6 ô ngành + 6 liên kết "Xem sản phẩm" giống hệt | Ứng dụng | Lặp lại, không có thứ tự ưu tiên |
| Bo góc 6px trên mọi ảnh, thẻ, form | Toàn trang | Dấu hiệu bộ UI kit |

## 2. Kế hoạch theo trang (đã thực hiện cho trang chủ)

| Section | Trước | Sau |
|---|---|---|
| Hero | Hai cột chữ trái, ảnh phải | Tiêu đề rất lớn (tới 96px) chiếm 9/12 cột; ảnh dọc nhỏ bên phải cùng hàng; hàng dưới: đoạn dẫn, 2 nút, 2 dữ kiện (chất liệu, nhà xưởng) bên trái, ảnh ngang lớn bên phải. Bố cục bất đối xứng |
| Sản phẩm | Lưới 9 ô có 3 ô "Ảnh tạm" và thẻ CTA tối | 5 ảnh sản phẩm đã làm sạch xếp lệch nhịp trên lưới 12 cột (5 / 3 / 3, rồi 4 / 5); 3 dòng chưa có ảnh chuyển thành danh sách chữ "Các dòng khác". Không còn ô trống giữa ảnh thật |
| Phương châm (mới) | Không có | Câu "Trách nhiệm, Uy tín, Đổi mới." của chính công ty, cỡ chữ lớn, kèm một đoạn giới thiệu và liên kết |
| Bên trong nhà máy (mới, thay mục Năng lực) | 4 cột chữ trên nền tối | Tiêu đề lớn và phụ đề theo brief; 1 ô ảnh toàn cảnh 21:9 và 3 ô ảnh phụ; 4 dữ kiện năng lực. Chưa có ảnh thật nên hiển thị ô chờ ghi rõ "Ảnh thật đang chờ chụp" kèm mô tả cảnh cần chụp |
| Quy trình | 4 bước, số đỏ, ảnh cuộn màng | Số lớn màu mực, đường kẻ mảnh; ảnh thành phẩm dọc 4:5 dính bên phải trên desktop. Chú thích ảnh mô tả đúng nội dung ảnh |
| Ứng dụng | Ảnh + lưới 6 ô | Bảng chỉ mục: ngành, mô tả, liên kết; mỗi ngành một hàng, đường kẻ mảnh |
| Báo giá | Form trong thẻ bo góc | Tiêu đề lớn; form viền mảnh, góc vuông; ô nhập cao 52px, chữ 16px (tránh iOS phóng to); trên mobile form tràn hết bề ngang |

Thay đổi hệ thống: bo góc `--radius` từ 6px xuống 2px; ảnh trang chủ góc vuông; tiêu đề lớn dùng đậm 500, giãn chữ âm.

## 3. Ảnh sản phẩm đã làm sạch

Không có ảnh mới, không ảnh tạo bằng AI. Năm ảnh sản phẩm thật của công ty được xử lý bằng ffmpeg:
- xoá logo góc trên trái bằng bộ lọc `delogo` (lấp bằng nền xung quanh: tường, gỗ, cỏ);
- cắt dải khẩu hiệu viết tay phía dưới.

Bản thân sản phẩm không bị chỉnh. Nguồn và cách xử lý ghi trong `src/data/images.json` (trường `derivedFrom`, `edit`).

| Ảnh mới | Từ ảnh gốc | Dùng cho |
|---|---|---|
| `sp-ep-quai` | `2025/07/TUI-EP-QUAI-NAU.jpg` | Túi ép quai |
| `sp-niem-phong` | `2025/07/Tui-NP-2.jpg` | Túi niêm phong |
| `sp-sieu-thi` | `2025/07/Tui-sieu-thi-2-1.jpg` | Túi siêu thị (thay banner nền xanh) |
| `sp-ep-quai-mau` | `2025/08/TEQ-chung.jpg` | Ảnh mục Quy trình |
| `sp-ep-quai-trang` | `2025/08/tep-su.jpg` | Ảnh nhỏ ở hero |

## 4. Ảnh còn thiếu (cần công ty cung cấp)

Xem danh sách chụp chi tiết trong `docs/asset-manifest.md`, mục "Ảnh nhà máy". Khi có ảnh, điền khoá ảnh vào `site.json > factoryPhotos`, mỗi vị trí một ảnh. Ô chờ tự chuyển thành ảnh thật, không cần sửa template.

## 5. Kiểm thử (localhost, 2026-10-22)

| Hạng mục | Kết quả |
|---|---|
| Lighthouse trang chủ VI, mobile 3 lần | Performance 100/100/100, các mục khác 100; LCP 1,5 s; CLS 0 |
| Lighthouse trang chủ VI, desktop | 100/100/100/100; LCP 0,3 s |
| Lighthouse trang chủ EN | Mobile 99–100, desktop 100 |
| Liên kết và anchor nội bộ (40 trang) | 0 gãy |
| Nút hero, menu "Sản xuất theo yêu cầu", "Năng lực" | Cuộn tới đúng section, dừng ngay dưới header (92px) |
| Form: gửi trống, sửa, tick đồng ý, gửi | Đúng ở 1440px và 390px |
| `prefers-reduced-motion` | Tắt chuyển động (transition 0,01ms) |
| Tràn ngang 1440 / 390 | Không |

Hai lỗi phát hiện và đã sửa trong đợt này:
1. **Anchor dừng lệch 92px thừa.** Trong `base.css`, quy tắc `[id] { scroll-margin-top }` (thay đổi chưa commit trước đó) cộng dồn với `scroll-padding-top` có sẵn. Đã bỏ `scroll-padding-top`.
2. **Bấm ô đồng ý bị trượt sau khi form báo lỗi.** Khi người dùng rời một ô vừa sửa đúng, dòng báo lỗi biến mất và form co lên khoảng 20px ngay lúc nhấn chuột, nên cú bấm rơi chỗ khác. Đã giữ sẵn chỗ cho dòng lỗi ở ô bắt buộc, và xoá lỗi ngay khi đang gõ.
