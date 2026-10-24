# Thiết kế: landing page một trang (bản V4)

Ngày: 2026-10-24. Trạng thái: **đã dựng** trên branch `landing-v4` (chủ dự án gửi ảnh HP-07B để bắt đầu).

## Ý định

Khách muốn web Hợp Phú chỉ còn **một trang landing** (song ngữ Việt/Anh). Bố cục 6 phần lấy theo concept V3; giao diện (font, màu) giữ như bản trước mà khách đã góp ý lần 1. Chi tiết từng dòng sản phẩm hiện trong modal, không còn trang riêng. Web cũ bỏ qua, không cần giữ URL hay thứ hạng cũ.

## Mục tiêu

- Một trang, đọc từ trên xuống thấy đủ: Hợp Phú là ai, làm sản phẩm gì, năng lực ra sao, đặt hàng thế nào, liên hệ ở đâu.
- Menu 5 mục nhảy tới từng phần: Trang chủ, Về chúng tôi, Sản phẩm, Năng lực, Liên hệ.
- 9 dòng sản phẩm theo đúng danh sách khách; bấm vào dòng nào mở modal chi tiết dòng đó.
- Giữ các điểm khách đã duyệt ở góp ý lần 1: nền xám ấm, chữ phụ đậm, chữ nhỏ nhất 14px, nút ngôn ngữ `VI | EN` ở góc phải, hover sản phẩm rõ ràng.

## Không làm

- Không còn trang danh mục, trang bài viết sản phẩm, tin tức, tuyển dụng, giới thiệu, dịch vụ, trang `/san-pham/`.
- Không mega menu, không nút "Nhận báo giá" trên header.
- Không hiệu ứng in tách màu CMYK, halftone hay bảng màu cyan/magenta của V3.
- Không mục đối tác (khách không liệt kê).

## Điều không được để xảy ra

- Bịa nội dung: số liệu, chứng nhận, lời trích dẫn, thông số. Mọi chữ lấy từ nguồn đã có: trang cũ, tài liệu công ty gửi, hoặc nội dung đã duyệt.
- Ảnh AI hoặc ảnh mạng giả làm ảnh nhà máy.
- Animation giật hay làm chậm trang (mục tiêu Lighthouse ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1).

## Đã quyết

| Hạng mục | Quyết định | Ai quyết |
|---|---|---|
| Phạm vi | Chỉ một trang landing VI (`/`) và EN (`/en/`), cộng trang 404 | Khách, chủ dự án |
| Bố cục | 6 phần theo V3: hero, về chúng tôi, sản phẩm, năng lực, sản xuất theo yêu cầu, liên hệ | Khách |
| Font, màu | Như bản `review-khach-01`: Be Vietnam Pro 400/500/700; đỏ `#C51F2B` cho nút; nền `#F6F5F2`, nền phụ `#EBE9E4`, mực `#26282B`, chữ phụ `#43484E` | Khách |
| Menu | Trang chủ · Về chúng tôi · Sản phẩm · Năng lực · Liên hệ; bỏ nút báo giá | Khách |
| Chi tiết sản phẩm | Modal | Chủ dự án |
| Quy trình | 4 bước, ảnh minh hoạ isometric, theo brief HP-07B | Chủ dự án |
| Web cũ | Bỏ qua | Chủ dự án |

## Từng phần

1. **Hero:** "Sản xuất bao bì nhựa theo yêu cầu", đoạn giới thiệu ngắn, 2 nút (gửi yêu cầu → Liên hệ; xem sản phẩm → Sản phẩm), một ảnh studio thật lớn.
2. **Về chúng tôi** (`#ve-chung-toi`):
   - Hàng 1: Tầm nhìn, Sứ mệnh, Giá trị cốt lõi, mỗi thẻ có ảnh thật (nội dung từ trang Giới thiệu cũ).
   - Hàng 2: các nhà sáng lập (Trần Mạnh Dân CEO, Lê Đăng Tá CFO, Nguyễn Ích Liêm CPO) với ảnh chân dung đã duyệt, kèm phương châm công ty.
3. **Sản phẩm** (`#san-pham`): lưới 9 dòng (3 cột desktop, 2 cột điện thoại). Mỗi ô: ảnh, số thứ tự, tên, chất liệu. Bấm mở modal gồm: ảnh, mô tả, chất liệu, kích thước thông dụng (nếu có nguồn), tuỳ chỉnh, ứng dụng, nút "Yêu cầu báo giá dòng này" (đóng modal, cuộn tới form, chọn sẵn dòng). Dòng chưa có ảnh hiện ô "Ảnh đang cập nhật".
4. **Năng lực nhà máy** (`#nang-luc`): 3 khối xen kẽ ảnh và chữ: Nhà máy, Quy trình sản xuất, Kiểm soát chất lượng; mỗi khối có 3 ý.
5. **Sản xuất theo yêu cầu** (`#quy-trinh`), theo brief **HP-07B** của chủ dự án. Không có trong menu.
   - Nền section `#F7F6F3`.
   - Đầu section: eyebrow đỏ "QUY TRÌNH HỢP TÁC"; tiêu đề "Từ yêu cầu đến sản xuất"; mô tả "Quy trình 4 bước rõ ràng, từ tư vấn vật liệu đến sản xuất bao bì theo yêu cầu."
   - Ảnh minh hoạ isometric 4 bước do chủ dự án cung cấp ("ảnh số 2"): dùng đúng ảnh đó, không thay bằng ảnh stock hay ảnh tạo mới.
     - File `assets/img/packaging-process-illustration.webp`: WebP tối ưu, không méo, không cắt mất bước nào, khai báo width/height.
     - Alt: "Quy trình sản xuất bao bì nhựa Hợp Phú từ tiếp nhận yêu cầu đến giao hàng".
     - Desktop: ảnh ngang, giữa container, rộng tối đa 1280px, không chữ đè, không gradient hay bóng.
   - Dưới ảnh có 4 cột:
     - 01 Tiếp nhận yêu cầu: "Khách hàng cung cấp loại túi, kích thước, số lượng và mẫu in."
     - 02 Tư vấn vật liệu: "Hỗ trợ lựa chọn HDPE, LDPE, PP hoặc OPP và quy cách phù hợp."
     - 03 Xác nhận thông số: "Thống nhất kích thước, màu sắc, số lượng và yêu cầu kỹ thuật."
     - 04 Sản xuất và bàn giao: "Sản xuất, kiểm tra chất lượng, đóng gói và giao hàng theo thỏa thuận."
     - Mỗi bước: số đỏ, tiêu đề đậm 600, mô tả 2–3 dòng, đường kẻ mảnh phía trên; không viền thẻ, không bóng.
   - Mobile: không thu nhỏ cả ảnh ngang. Cắt ảnh gốc thành 4 ảnh, mỗi ảnh một bước (không mất chi tiết chính); mỗi bước hiện ảnh của nó rồi tới chữ, xếp dọc; không cuộn ngang.
   - Chưa có ảnh: hiện ô chờ ghi rõ tên file cần thay, bố cục giữ nguyên tỷ lệ.
6. **Liên hệ** (`#lien-he`): bản đồ Google tới nhà máy bên trái (cùng địa chỉ, hotline, Zalo, nút mở Google Maps); form báo giá bên phải.

Footer gọn: tên công ty, địa chỉ, hotline, Zalo, email, Facebook, bản quyền. Không còn liên kết tới trang con.

## Phần mình tự quyết (chủ dự án xem lại khi đọc)

- **Base code:** branch mới `landing-v4` tách từ `redesign-v3`. Dùng lại dữ liệu, ảnh, modal của V3; khôi phục token màu và font của `review-khach-01`.
- **Liên kết cũ:** mọi URL cũ chuyển 301 về trang chủ (hoặc `/en/`). Gần như không tốn công, và tránh lỗi 404 cho người bấm link cũ trên Google.
- **Menu khi cuộn:** mục đang xem được đánh dấu. Header dính trên cùng. Trên điện thoại, menu thu vào nút ☰.
- **Thanh liên hệ dưới cùng trên điện thoại** (Gọi · Zalo · Báo giá): giữ, vì khách chỉ yêu cầu bỏ nút trên header.
- **Bản đồ:** nhúng trực tiếp, chỉ tải khi cuộn gần tới, vì khách muốn thấy bản đồ ngay.
- **Animation:** hiện dần khi cuộn (opacity và dịch chuyển nhẹ, so le), hover sản phẩm (ảnh phóng nhẹ, tên đổi màu), modal mở và đóng mượt, cuộn mượt khi bấm menu. Tắt hết khi người dùng bật giảm chuyển động.
- **Nền trang:** dùng `#F7F6F3` (theo HP-07B) cho cả trang thay cho `#F6F5F2`; hai màu gần như trùng nhau, dùng một màu cho đồng bộ.
- **SEO một trang:** title và description giữ như bản hiện tại; JSON-LD Organization và WebSite; sitemap chỉ có 2 URL.

## Chờ chủ dự án gửi

- Ảnh minh hoạ isometric 4 bước ("ảnh số 2" trong brief HP-07B). Cách cắt 4 ảnh cho mobile sẽ chốt khi có ảnh, theo vị trí thật của từng bước trong ảnh.

## Danh sách task

1. Tạo branch `landing-v4` từ `redesign-v3`.
2. Khôi phục font Be Vietnam Pro và token màu của `review-khach-01`; bỏ token và CSS in tách màu (`.print`, `.plates`, `.halftone`), bỏ ảnh `-in`.
3. Header mới: 5 liên kết neo, `VI | EN` góc phải, bỏ mega menu và nút báo giá, đánh dấu mục đang xem, menu ☰ trên điện thoại.
4. Hero theo nội dung V3, ảnh studio thường (không tách màu), giao diện font và màu cũ.
5. Về chúng tôi: hàng 3 thẻ có ảnh; hàng nhà sáng lập.
6. Sản phẩm: lưới 9 dòng, hover rõ, modal chi tiết, nút báo giá theo dòng chọn sẵn trong form.
7. Năng lực nhà máy: 3 khối xen kẽ ảnh và chữ.
8. Sản xuất theo yêu cầu theo HP-07B: ảnh isometric (desktop một ảnh ngang, mobile 4 ảnh cắt từ ảnh gốc) và 4 cột bước; ô chờ khi chưa có ảnh.
9. Liên hệ: bản đồ nhúng, thông tin liên hệ, form bên cạnh.
10. Footer gọn.
11. Build chỉ còn landing VI/EN và 404; `.htaccess` chuyển 301 mọi URL cũ về trang chủ; sitemap và robots tương ứng.
12. Animation và hiệu năng: hiện dần, hover, modal, cuộn mượt, giảm chuyển động.
13. Kiểm thử: check_page, check_links, Lighthouse VI/EN mobile và desktop, chụp 390, 768, 1440; thử modal, menu, form, chuyển ngôn ngữ.
14. Cập nhật `CLAUDE.md`, bản dịch cần duyệt, tài liệu thiết kế; commit; deploy lên Hostinger review khi được duyệt.

## Kết quả (2026-10-24, localhost)

- Build còn 3 trang (landing VI, EN, 404), CSS 29,7 KB, JS 6,9 KB; chỉ chép 38 ảnh đang dùng.
- Lighthouse: VI desktop 100, mobile 100 ×3 (LCP 1,5 s, CLS 0); EN desktop 100, mobile 99–100.
- Không tràn ngang ở 390, 768, 1440. Menu đánh dấu mục đang xem; modal mở/đóng mượt, Esc đóng; nút báo giá trong modal chọn sẵn dòng trong form.
- Ảnh quy trình: desktop một ảnh ngang (1672×580, 65 KB); dưới 64rem mỗi bước một ảnh cắt từ ảnh gốc (đã xoá mũi tên nối), ảnh desktop không tải.
- Ảnh chụp: `docs/screenshots/v4/`.
- Còn trong repo nhưng không dùng nữa: `src/pages/content.mjs` (trừ trang 404), `src/styles/landing.css`, `content.css`, `src/content/posts.json`, `src/data/redirects.json`. Giữ để tra cứu; có thể xoá khi chốt V4.
