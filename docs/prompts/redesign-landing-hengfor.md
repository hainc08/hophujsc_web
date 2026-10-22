# REDESIGN HỢP PHÚ JSC: LANDING PAGE SONG NGỮ, THAM KHẢO HENGFOR

Bạn là Senior UI/UX Designer, Art Director và Senior Front-end Developer.

---

## 0. QUYẾT ĐỊNH CẦN ĐIỀN TRƯỚC KHI CHẠY

| Hạng mục | Giá trị | Ghi chú |
|---|---|---|
| Màu chính | `#C51F2B` (**giả định tạm** từ 2026-10-22, chờ xác nhận; màu logo là `#7A1508`) | Nếu `#C51F2B` đến từ bộ nhận diện chính thức thì dùng. Nếu không, dùng màu lấy từ logo để khớp với logo trên header |
| Dữ liệu Facebook | Chưa có (2026-10-22) | Xem mục 3. Khi có, đặt vào `assets/facebook/` và cập nhật dòng này |
| Ảnh nhà máy | Chưa có (2026-10-22) | Nếu chưa có, ẩn hoặc rút gọn mục Nhà máy theo mục 6 |

Nếu một ô còn để trống, dừng lại và hỏi. Không tự chọn thay.

---

## 1. MỤC TIÊU VÀ PHẠM VI

Thiết kế lại website https://hopphujsc.com/ thành **một landing page HTML tĩnh, song ngữ Việt và Anh, responsive**, chất lượng bố cục ngang tầm https://www.hengforpacking.com/.

Phạm vi giai đoạn này:

- **Làm**: landing page tiếng Việt và landing page tiếng Anh, có chuyển ngôn ngữ; form báo giá (giao diện và kiểm tra dữ liệu); tài liệu và ảnh chụp kiểm thử.
- **Chưa làm**: tích hợp WordPress, trang chi tiết sản phẩm, gửi form thật tới máy chủ, deploy. Thẻ sản phẩm trên landing page liên kết tới URL sản phẩm đang có trên hopphujsc.com.

Không deploy lên production và không sửa gì trên hopphujsc.com khi chưa được duyệt.

---

## 2. BỐI CẢNH ĐÃ CÓ: ĐỌC TRƯỚC, KHÔNG AUDIT LẠI TỪ ĐẦU

Repo `hophujsc_web` đã có:

- Skill dự án `hopphu-web-design` (`.claude/skills/`). Dùng nó, nhưng **mục 5 của prompt này thay thế phần màu và font trong skill**. Sau khi làm xong, cập nhật skill và `docs/design-system.md` cho khớp.
- Bộ dựng tĩnh: `src/data/site.json`, `src/components.mjs`, `src/pages/`, `src/styles/`, `build.mjs`, `serve.mjs`. Mở rộng bộ dựng này để xuất `dist/index.html` (VI) và `dist/en/index.html` (EN). Không dựng lại từ đầu bằng framework khác.
- Tài liệu audit trong `docs/`: hiện trạng site, URL cần giữ, bản đồ từ khoá, các thông tin còn mâu thuẫn cần công ty xác nhận.

---

## 3. NGUỒN DỮ LIỆU ĐƯỢC PHÉP DÙNG

Chỉ dùng nội dung có nguồn. Thứ tự ưu tiên:

1. Thông tin chủ dự án đưa trong chat.
2. **Trang Facebook https://www.facebook.com/ctyhopphu.jsc/**, nơi công ty đăng bài thường xuyên. Trang này cần đăng nhập nên Claude không đọc trực tiếp được. Chủ dự án sẽ xuất dữ liệu vào thư mục ở mục 0. Cách xuất: Facebook → Cài đặt Trang → Tải xuống thông tin của bạn → chọn Bài viết và Ảnh, định dạng JSON hoặc HTML, chất lượng ảnh cao nhất. Hoặc lưu thủ công ảnh và nội dung các bài cần dùng.
   - Dùng bài đăng để lấy: ảnh sản phẩm, ảnh nhà xưởng, ảnh sản xuất thật; tên và quy cách sản phẩm; nhóm khách hàng hoặc ngành ứng dụng mà công ty tự nêu.
   - Không lấy: bình luận, tên hoặc ảnh khách hàng cá nhân, giá trong bài quảng cáo, các câu khuyến mãi.
   - Ảnh Facebook bị nén. Ghi kích thước thật vào asset manifest; ảnh nào dưới 1200px cạnh dài thì không dùng cho hero.
3. Nội dung đang công khai trên hopphujsc.com, bản VI và `/en/`. Lưu ý: một số bài trong mục EN thực chất là tiếng Việt.

Không tạo: số liệu năng lực, năm thành lập, số khách hàng, chứng nhận, lời chứng thực, đánh giá sao, giá, thông số máy móc, logo đối tác chưa được phép. Nếu một mục cần dữ liệu chưa có, xử lý theo mục 6.

---

## 4. PHÂN TÍCH THAM CHIẾU (BẮT BUỘC, TRƯỚC KHI VIẾT CODE)

1. Truy cập https://www.hengforpacking.com/ ở 1440px và 390px. Chụp ảnh màn hình.
2. Phân tích header, hero, danh mục sản phẩm, quy trình, nhà máy, ứng dụng, footer: nhịp khoảng cách, cỡ chữ, tỷ lệ ảnh, lưới, tương tác.
3. Lập bảng đối chiếu từng section: Hengfor làm gì, Hợp Phú có dữ liệu gì để làm tương ứng, phương án nếu thiếu.

Nếu không truy cập được trang nào, báo rõ. Không mô tả giao diện mà bạn không quan sát được.

Hengfor là chuẩn chất lượng bố cục, **không phải mẫu để sao chép**. Không chép code, ảnh, chữ, logo, bố cục đặc trưng nhận diện của họ. Kết quả phải trông là Hợp Phú, không phải "một Hengfor màu đỏ".

---

## 5. NHẬN DIỆN

- Màu chính: theo mục 0. Màu hover đậm hơn màu chính khoảng 15%.
- Trắng `#FFFFFF` làm nền chính. Bề mặt phụ `#F4F5F6`. Chữ `#272B30`.
- Đường kẻ trang trí `#DADDE1`. Viền ô nhập dùng màu đậm hơn, đạt tối thiểu 3:1 trên nền trắng (`#DADDE1` chỉ đạt 1,4:1).
- Màu chính dùng tiết chế: nút chính, trạng thái đang chọn của menu, điểm nhấn nhỏ, liên kết và hover, phần tử form đang chọn.
- Font: Be Vietnam Pro cho toàn bộ trang, cả bản tiếng Anh. Tối đa 3 độ đậm.
- Không theme xanh dương, không gradient nặng, không glassmorphism, không trang trí thừa.

---

## 6. CẤU TRÚC LANDING PAGE

Tiếng Việt là ngôn ngữ chính. Mỗi section có `id` để menu cuộn tới.

| # | Section | Yêu cầu | Nếu thiếu dữ liệu |
|---|---|---|---|
| 01 | Header | Logo Hợp Phú; menu: Sản phẩm (mega menu trên desktop), Sản xuất theo yêu cầu, Năng lực, Về chúng tôi, Liên hệ; nút đỏ "Nhận báo giá"; chuyển ngôn ngữ VI/EN; dính trên cùng; menu mobile dùng được bằng bàn phím | — |
| 02 | Hero | Ảnh sản phẩm lớn; tiêu đề "Giải pháp bao bì nhựa cho doanh nghiệp"; mô tả ngắn nêu HDPE, LDPE, PP, OPP và sản xuất theo yêu cầu; nút "Khám phá sản phẩm" và "Nhận báo giá"; ảnh có crop riêng cho mobile | Dùng ảnh sản phẩm tốt nhất hiện có; ghi nhu cầu chụp mới vào manifest |
| 03 | Sản phẩm | Lưới dạng catalogue 6–8 danh mục thật; ảnh lớn cùng tỷ lệ; ít chữ; hover tinh tế; mỗi thẻ liên kết tới URL danh mục hoặc sản phẩm đang có trên hopphujsc.com | Danh mục không có ảnh tốt thì dùng nền trung tính và tên danh mục, không dùng ảnh minh hoạ không phải của công ty |
| 04 | Từ ý tưởng đến sản xuất | Các bước có đánh số: Tiếp nhận yêu cầu → Tư vấn vật liệu và quy cách → Xác nhận mẫu / thông số → Sản xuất và bàn giao | Bước "Xác nhận mẫu" phải được công ty xác nhận; chưa xác nhận thì ghi "Xác nhận thông số" |
| 05 | Nhà máy và năng lực | Ảnh nhà xưởng thật, quy trình kiểm soát chất lượng, chất liệu đang sản xuất, nút tới phần giới thiệu | Chưa có ảnh nhà xưởng thì rút gọn thành khối chữ về chất liệu và kiểm soát chất lượng. Không dùng ảnh nhà máy minh hoạ |
| 06 | Ứng dụng | Lưới ảnh kiểu editorial theo ngành: siêu thị và bán lẻ, thương mại điện tử, sản xuất công nghiệp, thực phẩm và hàng tiêu dùng, may mặc xuất khẩu, y tế | Chỉ giữ ngành có sản phẩm thật tương ứng |
| 07 | Báo giá | Họ tên, Số điện thoại, Tên công ty, Loại bao bì, Số lượng dự kiến, Yêu cầu chi tiết; dòng đồng ý xử lý dữ liệu; gọi điện và Zalo bên cạnh | — |
| 08 | Footer | Gọn, chỉ thông tin có nguồn; đưa "Tin tức" và "Tuyển dụng" xuống đây, trỏ về URL đang có | Thông tin còn mâu thuẫn (địa chỉ) phải dùng bản đã được xác nhận |

Ánh xạ menu sang URL đang có trên site: "Sản xuất theo yêu cầu" → `/dich-vu/`, "Về chúng tôi" → `/ve-chung-toi/`, "Liên hệ" → `/lien-he/`, "Năng lực" → anchor `#nang-luc` trong landing page. Ở landing page, các mục có section tương ứng thì cuộn tới section đó.

Form ở giai đoạn này:

- Kiểm tra dữ liệu phía trình duyệt, thông báo lỗi cụ thể theo từng ô, trạng thái gửi, thành công và lỗi rõ ràng, có trường bẫy bot.
- Endpoint gửi lấy từ cấu hình. Khi endpoint trống, form nói rõ là chưa gửi được và mời gọi điện hoặc nhắn Zalo. Không giả vờ gửi thành công.
- Khi URL có `?san-pham=<slug>` hoặc `#bao-gia?san-pham=<slug>`, tự chọn sẵn loại bao bì.
- Trong tài liệu, đề xuất cách gửi thật: Elementor Pro Form trên WordPress hiện có, hoặc một handler PHP trên hosting LiteSpeed hiện tại. Kèm xác thực phía máy chủ và chống spam. Chưa triển khai.

---

## 7. SONG NGỮ VIỆT VÀ ANH

- Cấu trúc: `dist/index.html` (VI, `lang="vi"`) và `dist/en/index.html` (EN, `lang="en"`). Hai trang dùng chung template và component; chữ lấy từ file nội dung riêng theo ngôn ngữ, ví dụ `src/data/site.vi.json` và `site.en.json`. Không viết cứng chữ trong template.
- Nút chuyển ngôn ngữ ở header, có trên cả mobile, dẫn tới đúng section tương ứng nếu có thể.
- `hreflang="vi"`, `hreflang="en"`, `hreflang="x-default"` trỏ về bản VI. Mỗi bản có title, description, Open Graph, `og:locale` riêng.
- Nội dung tiếng Anh: ưu tiên chữ đang có ở `/en/` trên site và trên Facebook. Phần nào phải dịch mới thì dịch sát nghĩa, không thêm tuyên bố, và liệt kê trong tài liệu để chủ dự án duyệt.
- Thẻ sản phẩm ở bản EN trỏ tới URL EN tương ứng nếu có (ví dụ `/en/product/...`). Không có thì trỏ về bản VI và ghi chú.
- Tên riêng giữ nguyên: Hợp Phú, HDPE, LDPE, PP, OPP.
- Kiểm tra bố cục với chữ tiếng Anh. Chữ tiếng Anh thường ngắn hơn, nhưng một số nhãn nút có thể dài hơn.

---

## 8. RESPONSIVE

- Thiết kế mobile-first. Mobile là một bố cục có chủ đích, không phải desktop thu nhỏ.
- Kiểm thử bắt buộc: 375px, 390px, 768px, 1024px, 1440px, 1920px. Nội dung tối đa 1240–1280px.
- Mobile:
  - vùng chạm tối thiểu 44×44px;
  - thanh liên hệ cố định ở đáy (Gọi, Zalo, Báo giá) không che nội dung;
  - menu sản phẩm dễ dùng bằng một tay;
  - lưới sản phẩm 1–2 cột đọc rõ;
  - form một cột, bàn phím số cho ô điện thoại;
  - không tràn ngang ở bất kỳ viewport nào.
- Ảnh: `srcset`/`sizes` hoặc `<picture>` với crop riêng cho mobile ở hero; luôn có `width`, `height`, `alt`; ảnh LCP ưu tiên tải, ảnh dưới màn hình đầu tải lười.
- Chuyển động: chuyển màu nhẹ, phóng ảnh khi rê chuột. Hiệu ứng xuất hiện khi cuộn chỉ áp dụng dưới màn hình đầu, và chỉ khi không làm tăng CLS. Tôn trọng `prefers-reduced-motion`. Không parallax, không carousel tự chạy.

---

## 9. TÀI SẢN HÌNH ẢNH

- Dùng logo và ảnh sản phẩm của Hợp Phú (website và Facebook). Không dùng ảnh của Hengfor hay ảnh stock giả làm ảnh nhà máy.
- Tạo `docs/asset-manifest.md` gồm:
  - ảnh có sẵn, kèm nguồn, kích thước và crop đề xuất;
  - ảnh còn thiếu;
  - ảnh bị in chữ hoặc logo đè;
  - liên kết giữa ảnh và sản phẩm hoặc danh mục;
  - danh sách cảnh cần chụp mới.
- Placeholder chỉ dùng khi đang phát triển. Placeholder phải có chữ "Ảnh tạm" nhìn thấy được và được liệt kê trong manifest.

---

## 10. SEO, ACCESSIBILITY, HIỆU NĂNG

- Mỗi ngôn ngữ một H1; heading không nhảy bậc; HTML ngữ nghĩa.
- Title, description, canonical, hreflang, Open Graph và Twitter Card cho từng bản.
- JSON-LD chỉ dữ liệu thật: `Organization`, `WebSite`, `WebPage`. Không dùng `Product` hay `LocalBusiness` khi chưa có giá, đánh giá thật hoặc địa chỉ đã xác nhận.
- Liên kết nội bộ chỉ trỏ tới URL đang trả về 200. Giữ nguyên mọi URL trong `docs/url-migration-map.md`.
- WCAG 2.2 AA: tương phản, focus nhìn thấy, điều hướng bàn phím, nhãn form.
- Mục tiêu Lighthouse (mobile và desktop, cả hai ngôn ngữ): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95; LCP ≤ 2,5 s; CLS ≤ 0,1. Phải đo thật, ghi rõ đo ở localhost hay máy chủ thật. Không tuyên bố đạt nếu chưa đo.

---

## 11. DỌN NỘI DUNG CŨ

Không mang sang: bộ đếm số liệu, nội dung demo của theme, lời chứng thực chưa xác thực, các khối giới thiệu lặp lại, slider, icon thừa, widget bình luận, giỏ hàng và đăng nhập WooCommerce, các câu quảng cáo chung chung ("hàng đầu", "nhanh nhất", "24/7"). Giữ lại mọi thông tin sản phẩm và doanh nghiệp hữu ích.

---

## 12. CÁC GIAI ĐOẠN

1. Đọc tài liệu có sẵn; phân tích Hengfor; xử lý dữ liệu Facebook; lập asset manifest và bảng đối chiếu.
2. Cập nhật design tokens; vẽ wireframe desktop và mobile (ASCII hoặc ảnh) cho từng section. Dừng lại để chủ dự án duyệt wireframe.
3. Dựng landing page tiếng Việt.
4. Dựng bản tiếng Anh từ cùng template.
5. Hoàn thiện form và các trạng thái.
6. Kiểm thử: ảnh chụp ở 6 viewport cho cả hai ngôn ngữ, bàn phím, form, chạy `check_page.py` và Lighthouse; sửa lỗi rồi đo lại.
7. Báo cáo: ảnh chụp trước và sau; điểm thực đo; danh sách nội dung dịch cần duyệt; ảnh cần chụp; thông tin cần công ty xác nhận; hướng dẫn đưa landing page lên hosting hoặc tích hợp WordPress (chưa thực hiện).

---

## TIÊU CHÍ HOÀN THÀNH

Thứ tự ưu tiên khi có xung đột:

1. Thông tin đúng sự thật, không bịa dữ liệu.
2. Nhận diện Hợp Phú (đỏ, trắng, xám) và ảnh sản phẩm thật.
3. Chất lượng bố cục, khoảng trắng, chữ ngang tầm Hengfor.
4. Trải nghiệm mobile và báo giá dễ dàng.
5. Song ngữ hoàn chỉnh và nhất quán.
6. SEO và hiệu năng đạt mục tiêu mục 10.
