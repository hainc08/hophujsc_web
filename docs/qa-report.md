# Báo cáo QA

Ngày kiểm thử: 2026-10-08. Đối tượng: trang chủ mới, bản dựng tĩnh `dist/index.html`, chạy ở `http://localhost:4173` (`node serve.mjs`).

## Phạm vi

| Đã kiểm thử | Chưa kiểm thử |
|---|---|
| Trang chủ mới ở 4 viewport | Trang chủ mới chạy trong WordPress (chưa có source và staging) |
| Menu, menu con, điều hướng bàn phím | Gửi form thật tới máy chủ |
| Kiểm tra dữ liệu form | Các trang khác (chưa redesign) |
| Metadata, heading, liên kết, JSON-LD | Rich Results Test, PageSpeed Insights (cần URL công khai) |
| Lighthouse mobile và desktop | Trình duyệt Safari, Firefox; thiết bị thật; trình đọc màn hình |

## 1. Lighthouse

Lighthouse 12.8.2, Chrome headless, cùng một máy, cùng ngày. Số "trước" đo trên site đang chạy; số "sau" đo trên bản dựng tĩnh ở localhost với cờ `--index`.

### Mobile

| Chỉ số | Mục tiêu | Trước (site đang chạy) | Sau (3 lần đo) |
|---|---|---|---|
| Performance | ≥ 90 | 57 | 100, 100, 100 |
| Accessibility | ≥ 95 | 80 | 100, 100, 100 |
| Best Practices | ≥ 95 | 100 | 100, 100, 100 |
| SEO | ≥ 95 | 85 | 100, 100, 100 |
| LCP | ≤ 2,5 s | 12,3 s | 1,8 s, 1,6 s, 1,8 s |
| CLS | ≤ 0,1 | 0,018 | 0,006, 0,044, 0,006 |
| TBT | — | 160 ms | 0 ms |
| FCP | — | 3,3 s | 0,8–0,9 s |
| Số request | — | 147 | 18 |
| Dung lượng tải | — | 3.425 KB | 206 KB |

### Desktop

| Chỉ số | Trước | Sau |
|---|---|---|
| Performance | 73 | 100 |
| Accessibility | 80 | 100 |
| Best Practices | 96 | 100 |
| SEO | 77 | 100 |
| LCP | 2,9 s | 0,7 s |
| CLS | 0,003 | 0,002 |

### Cách đọc các con số này

So sánh trước và sau **không cùng điều kiện**, và phần chênh lệch không hoàn toàn do thiết kế:

- Số "sau" đo trên máy chủ tĩnh cục bộ, thời gian phản hồi gần như bằng 0. Site thật có TTFB 2–3,5 giây. Nếu chưa bật cache trang, riêng TTFB đã đẩy LCP trên production vượt 2,5 giây dù template mới nhẹ đến đâu.
- Trang mới trong WordPress sẽ còn mang CSS và JS của Betheme, Elementor và các plugin cho tới khi chúng được gỡ khỏi template.
- Ảnh trong bản dựng vẫn tải từ `hopphujsc.com`, nên phần ảnh phản ánh đúng máy chủ thật.
- Lần đo "trước" bị chuyển hướng sang bản tiếng Anh `/en/homepage-2/` (xem [website-audit.md](website-audit.md)).
- INP không đo được bằng Lighthouse; cần dữ liệu người dùng thật. TBT 0 ms là tín hiệu tốt nhưng không thay thế INP.
- Không có dữ liệu Core Web Vitals thực địa (CrUX) cho cả hai phiên bản.

Phần chắc chắn do thiết kế mới: số request giảm từ 147 xuống 18, dung lượng giảm từ 3,4 MB xuống 0,2 MB, phần tử LCP là một ảnh tĩnh được ưu tiên tải thay cho lớp chữ chờ JavaScript của slider. Mục tiêu Lighthouse **chưa thể coi là đạt** cho tới khi đo lại trên staging WordPress.

### Vấn đề phát hiện trong lúc đo và đã sửa

| Lần đo | Vấn đề | Cách sửa | Kết quả |
|---|---|---|---|
| 1 | Performance mobile 78, LCP 4,5 s: CSS Google Fonts chặn hiển thị 860 ms; mobile tải ảnh hero bản 1280px | Nạp font không chặn hiển thị; nhúng CSS vào HTML; sửa `sizes` thành `92vw` để chọn bản 700px | LCP 1,8 s |
| 2 | CLS mobile 0,11–0,17: chữ đổi font làm tiêu đề đổi số dòng, đẩy ảnh hero | Thêm font dự phòng có `size-adjust` | CLS 0,09–0,13, chưa ổn định dưới 0,1 |
| 3 | Như trên | Trên mobile đưa ảnh hero lên trước tiêu đề | CLS 0,006–0,044 |

## 2. Responsive

Ảnh chụp: [screenshots/before](screenshots/before/) và [screenshots/after](screenshots/after/).

| Viewport | Tràn ngang | Ảnh lỗi | Ghi chú |
|---|---|---|---|
| Mobile 375×812 | Không | 0 | Ảnh hero trên, tiêu đề dưới; thanh Gọi, Zalo, Báo giá cố định ở đáy; bảng quy cách thành các khối có nhãn |
| Tablet 768×1024 | Không | 0 | Lưới sản phẩm 2 cột; menu vẫn dạng nút |
| Desktop 1440×900 | Không | 0 | Hero 2 cột; menu ngang; quy trình 6 cột |
| Large 1920×1080 | Không | 0 | Nội dung giữ trong 1216px; nền ảnh hero tràn tới mép phải |

## 3. Điều hướng và bàn phím

| Kiểm tra | Kết quả |
|---|---|
| Thứ tự Tab trên desktop | Bỏ qua tới nội dung → logo → Sản phẩm → nút mở danh mục → Dịch vụ → Về chúng tôi → Tin tức → Tuyển dụng → Liên hệ. Đạt |
| Viền focus | Hiển thị trên mọi phần tử đã thử. Đạt |
| Menu con bằng chuột | Mở khi rê. Đạt |
| Menu con bằng bàn phím | Enter trên nút mũi tên mở, Esc đóng và trả focus về nút. Đạt |
| Menu mobile | Nút menu mở bảng điều hướng; nút mũi tên mở 8 danh mục; Esc đóng. Đạt |
| CTA "Yêu cầu báo giá" | Cuộn tới form, URL thành `#bao-gia`. Đạt |
| Vùng bấm nhỏ hơn 24px | Lần đầu: 5 liên kết cao 19–22px. Đã thêm đệm dọc. |
| Liên kết nội bộ | 25 liên kết, cả 25 trỏ tới URL đang trả về 200 trên site thật. Đạt |

Lỗi đã sửa: ban đầu menu con mở theo `:focus-within`, khiến người dùng bàn phím phải Tab qua 8 mục con trước khi tới "Dịch vụ". Đã bỏ quy tắc này; menu con chỉ mở khi bấm nút.

## 4. Form báo giá

| Kịch bản | Kết quả |
|---|---|
| Gửi form trống | Thông báo "Còn 3 trường cần sửa trước khi gửi."; 3 lỗi hiện dưới Họ tên, Số điện thoại, Yêu cầu chi tiết; focus về ô đầu tiên. Đạt |
| Email sai định dạng | "Email chưa đúng định dạng, ví dụ ten@congty.vn." Đạt |
| Dữ liệu hợp lệ | Trang báo "Bản xem trước chưa kết nối máy chủ nên yêu cầu chưa được gửi…". Đúng như thiết kế của bản xem trước |
| Gửi thật tới máy chủ | **Chưa kiểm thử.** Không có endpoint; không gửi thử vào form production |

Form chưa đáp ứng yêu cầu "thực sự gửi được dữ liệu". Việc này chỉ hoàn tất khi nối với Elementor Pro Form trên staging (xem [seo-implementation.md](seo-implementation.md)).

## 5. SEO trên trang

| Kiểm tra | Kết quả |
|---|---|
| Title | "Sản xuất bao bì nhựa, túi nilon HDPE, LDPE, PP \| Hợp Phú", 56 ký tự |
| Meta description | 164 ký tự; Google có thể cắt vài từ cuối |
| H1 | 1 |
| Thứ tự heading | H1, sau đó H2 và H3, không nhảy bậc |
| Canonical | `https://hopphujsc.com/` |
| hreflang | `vi`, `en`, `x-default` |
| JSON-LD | `Organization`, `WebSite`, `WebPage`; phân tích cú pháp thành công |
| Ảnh thiếu `alt` | 0 / 6 |
| Ảnh thiếu kích thước | 0 / 6 |
| `href="#"` | 0 |
| `lang` | `vi` |
| Robots | `noindex, nofollow` ở bản xem trước; `index, follow` khi dựng với `--index` |

## 6. Tồn tại

| # | Vấn đề | Mức độ | Hướng xử lý |
|---|---|---|---|
| Q1 | Form chưa gửi được dữ liệu | Chặn phát hành | Nối Elementor Pro Form trên staging |
| Q2 | Chưa kiểm thử trong WordPress | Chặn phát hành | Cần source theme và staging |
| Q3 | Ảnh sản phẩm 1200×1200 cho ô hiển thị khoảng 290px | Trung bình | `srcset` của WordPress và WebP |
| Q4 | Ba ảnh sản phẩm có sẵn logo và khẩu hiệu in đè | Thấp | Cần ảnh gốc không chữ từ công ty |
| Q5 | Logo PNG 59 KB | Thấp | Cần file SVG |
| Q6 | Font tải từ Google Fonts | Thấp | Tự lưu trữ khi tích hợp |
| Q7 | Khối khách hàng chỉ là tên dạng chữ | Chờ quyết định | Cần xác nhận quyền dùng logo |
| Q8 | Chưa kiểm thử Safari, Firefox, trình đọc màn hình, thiết bị thật | Trung bình | Kiểm thử trên staging |
| Q9 | Chưa chạy Rich Results Test | Thấp | Cần URL công khai |
