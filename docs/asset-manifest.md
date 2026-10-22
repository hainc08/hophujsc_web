# Asset manifest

Cập nhật: 2026-10-22. Gốc ảnh: `https://hopphujsc.com/wp-content/uploads/`. Kích thước là kích thước thật đã kiểm tra bằng trình duyệt hoặc HTTP.

Dữ liệu Facebook (https://www.facebook.com/ctyhopphu.jsc/) **chưa được xuất**, nên chưa có ảnh nào từ Facebook trong bảng này. Không đăng nhập thì Facebook chỉ cho đọc tên Trang, số người theo dõi và ảnh đại diện.

## Ảnh đang dùng trên landing page

| Ảnh | Kích thước gốc | Bản nhỏ có sẵn | Dùng cho | Tình trạng | Crop đề xuất |
|---|---|---|---|---|---|
| `2025/07/LOGO-2-291x300.png` | 291×300 (gốc 377×389, PNG 96 KB) | — | Header, footer | Dùng được; nặng | Cần file SVG gốc |
| `2025/07/z6831021366870_0e97b08cc696075f8e30f4e4dec93d8f.jpg` | 1080×1080 | 768×768 | Hero | Ảnh thật, sạch, cuộn túi nhiều màu trên bàn gỗ. Chưa rõ là loại túi nào nên không gán cho danh mục | Desktop 1:1; mobile 4:5 lấy giữa |
| `2025/07/z6831832403506_14d6ba88590003036756fb828b175526-1200x1200.jpg` | 1200×1200 | 768×768 | Danh mục Túi hạt xoài | Sạch | 1:1 hoặc 4:5 |
| `2025/07/TUI-EP-QUAI-NAU-1200x1200.jpg` | 1200×1200 | 768×768 | Danh mục Túi ép quai | Có logo góc trái trên và khẩu hiệu viết tay phía dưới | 1:1 |
| `2025/07/Tui-NP-2-1200x1200.jpg` | 1200×1200 | 768×768 | Danh mục Túi niêm phong; ứng dụng TMĐT | Có logo và khẩu hiệu in đè | 1:1 |
| `2025/07/Tui-sieu-thi-2-1200x1200.jpg` | 1200×1200 | 768×768 | Danh mục Túi siêu thị; ứng dụng bán lẻ | Có logo và khẩu hiệu in đè | 1:1 |
| `2021/08/CUON-1.jpg` | 1280×853 | 768×512, 700×466 | Danh mục Cuộn màng; khối quy trình; ứng dụng công nghiệp | Sạch, nền trắng | 3:2 |

## Danh mục chưa có ảnh dùng được

Đang hiển thị ô trung tính có nhãn **"Ảnh tạm"**.

| Danh mục | Ảnh hiện có | Lý do không dùng |
|---|---|---|
| Túi đựng thực phẩm | Không có | — |
| Túi lồng bao (túi lót) | `2021/08/TUI-BAO-LOT-2-scaled.jpg` 2560×2048 | Banner quảng cáo, chữ lớn chiếm nửa ảnh |
| Túi may mặc xuất khẩu | `2021/08/TUI-MAY-MAC1-1-scaled.jpg` 2560×2048 | Banner quảng cáo, chữ lớn |

## Ảnh không dùng

| Ảnh | Lý do |
|---|---|
| `2026/10/anh1.jpg`, `anh2.jpg`, `anh3.jpg` (1000×1250) | Ảnh chân dung lãnh đạo. Tên và chức danh đang mâu thuẫn giữa các trang, cần công ty xác nhận |
| Các banner `2021/08/*-scaled.jpg` | Ảnh đồ hoạ có chữ in sẵn |
| `shopassistant-*` | Ảnh demo của theme Betheme |
| Logo đối tác (Sunhouse, VinMart…) | Chưa xác nhận quyền sử dụng |

## Cảnh cần chụp mới

Để đạt độ đồng đều ảnh như tham chiếu: cùng nền, cùng ánh sáng, không chữ in đè, cạnh dài ≥ 2400px cho hero và ≥ 1600px cho thẻ.

1. Hero ngang 16:9 và dọc 4:5: sản phẩm đa dạng xếp cạnh nhau, hoặc dây chuyền thổi màng.
2. Mỗi danh mục một ảnh 4:5 trên cùng một nền: 8 ảnh.
3. Nhà xưởng: máy thổi màng, máy in, máy cắt dán, khu kiểm tra, kho đóng gói.
4. Cận chất liệu: mặt màng HD (khô, mờ) so với PE (bóng), đường hàn, quai ép.
5. Ứng dụng: túi đang dùng thật ở quầy siêu thị, đóng hàng online, bao gạo có túi lót.

## Ảnh nhà máy (cập nhật 2026-10-22)

Mục "Bên trong nhà máy Hợp Phú" trên trang chủ đang hiển thị 4 ô chờ. Không dùng ảnh minh hoạ, ảnh stock hay ảnh tạo bằng AI thay thế. Khi có ảnh thật đã được công ty duyệt: thêm vào `assets/img/` (WebP, 2 cỡ 768 và 1600), đăng ký trong `src/data/images.json` và `site.json > images`, rồi điền khoá ảnh vào `site.json > factoryPhotos`.

| Vị trí (`factoryPhotos`) | Cảnh cần chụp | Khung | Kích thước tối thiểu | Ghi chú |
|---|---|---|---|---|
| `toan-canh` | Toàn cảnh xưởng sản xuất, thấy được dây chuyền và không gian | Ngang 21:9 (cắt từ 3:2) | 2400px cạnh dài | Ảnh mở đầu mục, quan trọng nhất. Ánh sáng tự nhiên, nền gọn gàng |
| `may-moc` | Máy móc sản xuất đang chạy (máy thổi màng, máy in, máy cắt dán) | 4:3 | 1600px | Nếu là máy thổi màng thì có thể thêm từ "thổi màng" vào nội dung; hiện nội dung chỉ ghi "máy móc nhập khẩu" |
| `kiem-tra` | Công nhân kiểm tra đường hàn, kích thước hoặc ngoại quan | 4:3 | 1600px | Cần đồng ý của người xuất hiện trong ảnh |
| `kho` | Thành phẩm đóng kiện hoặc kho hàng | 4:3 | 1600px | |

## Ảnh sản phẩm đã làm sạch (2026-10-22)

Năm ảnh sản phẩm (`sp-*.webp`) được xoá logo góc và cắt dải khẩu hiệu từ ảnh gốc. Chi tiết trong `docs/redesign-editorial.md` mục 3. Các trang bài viết và sản phẩm chi tiết vẫn dùng ảnh gốc có logo; cần quyết định có làm sạch đồng loạt hay không.
