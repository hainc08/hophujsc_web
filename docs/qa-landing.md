# QA landing page song ngữ

Ngày kiểm thử: 2026-10-22. Đối tượng: `dist/index.html` (VI) và `dist/en/index.html` (EN), chạy ở `http://localhost:4173`. Ảnh chụp: `docs/screenshots/landing/`.

## Lighthouse

Lighthouse 12.8.2, Chrome headless, dựng với `--index`, đo bằng `scripts/lighthouse.sh` của skill. Đo ở localhost: không có thời gian phản hồi 2–3 giây của máy chủ thật. Ảnh vẫn tải từ hopphujsc.com.

| Trang | Lần đo | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| VI | Desktop | 99 | 100 | 100 | 100 | 0,9 s | 0,01 | 0 ms |
| VI | Mobile 1/2/3 | 99 / 99 / 99 | 100 | 100 | 100 | 2,1 s | 0 | 0 ms |
| EN | Desktop | 99 | 100 | 100 | 100 | 0,9 s | 0,001 | 0 ms |
| EN | Mobile 1/2/3 | 99 / 99 / 99 | 100 | 100 | 100 | 2,1 s | 0 | 0 ms |

Lỗi phát hiện trong lúc đo và đã sửa:

| Vấn đề | Cách sửa |
|---|---|
| Chữ trong ô "Ảnh tạm" tương phản 2,4:1 | Đổi sang `--muted` |
| Nút EN/VI có `aria-label` không chứa chữ "EN" đang hiển thị | Bỏ `aria-label`, thêm mô tả ẩn sau chữ hiển thị |
| LCP mobile dao động 2,3–3,1 s | Thêm `preconnect` tới hopphujsc.com; còn 2,1 s ổn định |

## Responsive

| Viewport | VI | EN | Tràn ngang | Ảnh lỗi | Nội dung ẩn sau khi cuộn |
|---|---|---|---|---|---|
| 375×812 | Có | — | Không | 0 | 0 |
| 390×844 | Có | Có | Không | 0 | 0 |
| 768×1024 | Có | — | Không | 0 | 0 |
| 1024×768 | Có | — | Không | 0 | 0 |
| 1440×900 | Có | Có | Không | 0 | 0 |
| 1920×1080 | Có | — | Không | 0 | 0 |

Đã chỉnh sau khi xem ảnh chụp:
- Mobile: lưới sản phẩm lệch một ô trống ở hàng cuối, đã đổi về lưới 2 cột đều.
- Mobile: ẩn dòng nhà xưởng trong hero để ảnh sản phẩm lộ ra trong màn hình đầu.
- "bao bì" không còn bị ngắt dòng trong tiêu đề hero.

## Tương tác

| Kiểm tra | Kết quả |
|---|---|
| Thứ tự Tab (desktop) | Bỏ qua → logo → Sản phẩm → nút mở danh mục → 4 mục menu → EN → Nhận báo giá → nội dung. Đạt |
| Mega menu bằng bàn phím | Enter mở, Tab vào danh mục, Esc đóng và trả focus. Đạt |
| Mega menu bằng chuột | Mở khi rê; đi chéo xuống bảng không bị đóng (lần đầu bị đóng, đã thêm trễ 200ms); rời đi thì đóng. Đạt |
| Mega menu đóng không lọt vào thứ tự Tab | Đạt |
| Menu mobile | Mở, mở danh mục, Esc đóng. Đạt |
| Chuyển ngôn ngữ | `/` → `/en/`, `lang="en"`. Đạt |
| Chọn sẵn sản phẩm | `?san-pham=tui-niem-phong` và `/en/?product=cuon-mang` chọn đúng. Đạt |
| Form trống | Báo số mục cần sửa, lỗi dưới từng ô, focus về ô đầu. Đạt (VI và EN) |
| Số điện thoại "abc" | Báo lỗi. Đạt sau khi sửa lỗi `pattern` (xem dưới) |
| Chưa tick đồng ý | Báo lỗi riêng cho ô đồng ý. Đạt |
| Dữ liệu hợp lệ | Báo rõ bản xem trước chưa gửi được, mời gọi hoặc nhắn Zalo. Đúng thiết kế |
| Lỗi console | 0 |

**Lỗi đáng chú ý đã sửa**: thuộc tính `pattern` của ô điện thoại không hợp lệ với cách Chrome biên dịch regex (cờ `v`). Chrome báo lỗi, `checkValidity()` ném lỗi và việc kiểm tra form dừng giữa chừng. Bản v1 trong `archive/v1/` cũng mắc lỗi này. `check_page.py` giờ có kiểm tra cho lỗi này.

## Công cụ kiểm tra tĩnh

`check_page.py` cho cả hai trang: tất cả PASS, chỉ có cảnh báo `noindex` (đúng cho bản xem trước).

## Chưa kiểm thử

- Gửi form thật (chưa có endpoint).
- Safari, Firefox, thiết bị thật, trình đọc màn hình.
- Trên máy chủ thật hoặc trong WordPress.
- Rich Results Test (cần URL công khai).
