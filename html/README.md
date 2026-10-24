# Hợp Phú: bản HTML/CSS/JS thuần

Sinh tự động từ repo bằng `node tools/export-html.mjs`. Nếu sửa trực tiếp các file ở đây, lần xuất sau sẽ ghi đè.

| File | Nội dung |
|---|---|
| `index.html` | Landing page tiếng Việt |
| `en/index.html` | Landing page tiếng Anh |
| `404.html` | Trang không tìm thấy |
| `assets/css/style.css` | Toàn bộ giao diện |
| `assets/js/main.js` | Menu, modal sản phẩm, hiệu ứng, form |
| `assets/img/` | Ảnh WebP đã tối ưu |
| `api/quote.php` | Nhận form báo giá (cần hosting có PHP và file `api/config.php` trên máy chủ) |
| `.htaccess` | HTTPS, chuyển URL cũ về trang chủ, cache (Apache/LiteSpeed) |

- Xem thử: mở `index.html` bằng trình duyệt. Form chỉ gửi được khi chạy trên hosting có PHP.
- Đưa lên hosting: chép toàn bộ thư mục này vào `public_html`.
- Font Be Vietnam Pro và bản đồ tải từ Google, cần có mạng.
