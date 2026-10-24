# Ảnh và tài liệu công ty gửi (2026-10-24)

Nguồn: chủ dự án chép vào `assets/Ảnh sản phẩm HP` (440 tệp, khoảng 790 MB). Đã đổi tên, sắp xếp sang `assets/source/` và **không commit** (`.gitignore`). Bảng đối chiếu tên cũ và tên mới: `assets/source/_doi-ten.csv`. 20 tệp trùng hệt nhau từng byte đã bỏ bản sao.

Ảnh dùng trên web sẽ được chọn từ đây, tối ưu sang WebP 2 cỡ và đặt vào `assets/img/` như các ảnh hiện có.

## Kiểm kê

| Thư mục | Số tệp | Loại | Nhận xét |
|---|---|---|---|
| `tui-hat-xoai/studio-pe` | 66 | Ảnh studio gốc 5472x3648 | Ảnh thật, chất lượng cao, nền đen/xám. Đủ màu, có ảnh đứng và xếp quạt |
| `tui-hat-xoai/studio-hd` | 20 | Ảnh studio gốc 5472x3648 | Như trên |
| `tui-hat-xoai/tach-nen-pe`, `tach-nen-hd` | 41 + 15 | PNG tách nền 1365x2048 | Dùng tốt cho lưới sản phẩm (nền trong suốt) |
| `tui-hat-xoai/da-sua` | 33 | Ảnh 1280x1280 | Sản phẩm ghép vào cảnh dựng; nhiều ảnh có logo và khẩu hiệu in đè |
| `tui-niem-phong/studio` | 56 | Ảnh studio gốc 5472x3648 | Ảnh thật; cuộn túi nhiều màu và từng túi trên nền đen |
| `tui-niem-phong/tach-nen` | 12 | PNG tách nền | |
| `tui-niem-phong/da-sua` | 27 | Ảnh quảng cáo | Có **bảng size túi niêm phong** (thông tin dùng được cho trang sản phẩm), infographic, banner |
| `tui-ep-quai/studio` | 34 | Ảnh studio gốc 5472x3648 | Ảnh thật, nhiều màu quai |
| `tui-ep-quai/da-sua` | 33 | Ảnh 1280 và 1707x2560 | Một phần nền đen sạch, một phần cảnh dựng có logo và khẩu hiệu |
| `tui-sieu-thi/studio` | 3 | 2 ảnh gốc + 1 ảnh chụp mẫu | Ảnh mẫu in có thương hiệu của khách hàng khác |
| `tui-sieu-thi/da-sua` | 18 | Ảnh quảng cáo | 4 ảnh có chữ "Meta AI" (ảnh tạo bằng AI, có người mẫu) |
| `tui-sieu-thi/tach-nen` | 1 | Ảnh nền đen | |
| `tui-bau-uom/quang-cao` | 2 | Banner | Chưa có ảnh studio |
| `nha-xuong` | 19 ảnh + 21 video | Ảnh điện thoại 960x1280, video mp4 | **Ảnh thật dây chuyền cắt dán túi ép quai** và bảng mẫu sản phẩm. Một số ảnh có in thương hiệu khách hàng (Rabity) |
| `chung/banner`, `banner-web-cu` | 12 | Banner cũ | Có chữ in đè; không dùng làm ảnh sản phẩm |
| `tai-lieu` | 7 docx (+ bản .md) | Bài viết | Giới thiệu công ty, túi ép quai (2 bản), hạt xoài PE, lồng bao, niêm phong, siêu thị tự huỷ. Có kích thước thông dụng |

## Lưu ý khi dùng

- **Ưu tiên ảnh studio và ảnh tách nền**: là ảnh thật của sản phẩm, đồng bộ ánh sáng, độ phân giải cao.
- **Ảnh "da-sua" có nền dựng bằng AI**: sản phẩm thật nhưng bối cảnh là ảnh dựng. Dùng được cho ảnh minh hoạ sản phẩm nếu chủ dự án đồng ý; không dùng làm ảnh nhà xưởng. Ảnh có chữ "Meta AI" hoặc người mẫu tạo bằng AI thì không dùng.
- **Thương hiệu của khách hàng khác** (Rabity, Homemart, các mẫu túi in): cần khách hàng đó đồng ý mới đưa lên web.
- **Ảnh nhà xưởng** chỉ có ảnh điện thoại khổ dọc 960x1280 của khâu cắt dán. Đủ cho 1–2 ô chi tiết, chưa đủ cho ảnh toàn cảnh.
- **Còn thiếu ảnh**: túi lồng bao, túi lót, túi thực phẩm, túi bầu ươm (chỉ có banner), cuộn màng.
- Bài viết có những cụm "hàng đầu", "an toàn tuyệt đối", "mẫu thử miễn phí": cần xác nhận trước khi đưa lên web (quy tắc không dùng so sánh nhất chưa kiểm chứng).

## Đã đưa lên web (2026-10-24)

Cắt khung và thu nhỏ bằng script (không chỉnh sửa sản phẩm), WebP 2 cỡ trong `assets/img/hp-*.webp`, khai báo trong `src/data/images.json` (khoá `source/...`, có `derivedFrom` và vị trí cắt).

| Vị trí | Ảnh gốc |
|---|---|
| Hero trang chủ | `tui-niem-phong/studio/tui-niem-phong-studio-01.jpg` |
| Túi hạt xoài | `tui-hat-xoai/studio-pe/tui-hat-xoai-pe-studio-51.jpg` |
| Túi niêm phong | `tui-niem-phong/studio/tui-niem-phong-studio-12.jpg` |
| Túi ép quai | `tui-ep-quai/studio/tui-ep-quai-studio-27.jpg` |
| Túi siêu thị tự huỷ | `tui-sieu-thi/studio/tui-sieu-thi-studio-02.jpg` |
| Nhà máy: dây chuyền | `nha-xuong/nha-xuong-03.jpg` |
| Nhà máy: kiểm tra | `nha-xuong/nha-xuong-08.jpg` |
| Nhà máy: thành phẩm | `nha-xuong/nha-xuong-13.jpg` |

Ô ảnh toàn cảnh nhà xưởng tự ẩn cho tới khi có ảnh ngang chụp toàn cảnh (điền `site.json > factoryPhotos > toan-canh`). Ảnh "da-sua" (nền dựng AI) chưa dùng, chờ chủ dự án quyết định.
