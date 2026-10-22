# Hợp Phú JSC: redesign website

Repo này chứa bản thiết kế lại website https://hopphujsc.com/ của Công ty Cổ phần Sản xuất và Thương mại Hợp Phú (bao bì nhựa, túi nilon HDPE/LDPE/PP/OPP). Giao tiếp với chủ dự án bằng tiếng Việt.

## Trạng thái hiện tại

- **Đang làm**: landing page HTML tĩnh song ngữ Việt/Anh, tham khảo chất lượng bố cục của https://www.hengforpacking.com/. Brief đầy đủ: `docs/prompts/redesign-landing-hengfor.md`.
- **Site thật** chạy WordPress + Betheme + Elementor Pro + Polylang + Yoast. Repo **không có** source WordPress, database hay quyền quản trị. Chưa tích hợp, chưa deploy.
- Bản trang chủ v1 (màu đỏ mận, font Barlow) đã lưu ở `archive/v1/`, không còn được build.
- **Repo**: https://github.com/hainc08/hophujsc_web (công khai). Mỗi lần push lên `main`, workflow `.github/workflows/pages.yml` dựng lại và deploy bản xem trước (noindex) lên https://hainc08.github.io/hophujsc_web/. Đây không phải production.
- Vì repo công khai: không commit ảnh chụp trang của bên thứ ba (`docs/reference/hengfor/` đã nằm trong `.gitignore`), dữ liệu Facebook thô, hay thông tin cá nhân.

## Kế hoạch thay WordPress (chốt 2026-10-22)

- Chủ dự án sẽ **bỏ WordPress**, giữ tên miền hopphujsc.com và email. Site hiện chạy ở **Hawk Host** (nameserver `ns13/ns14.hawkhost.com`, email cùng máy chủ), **không** nằm trong tài khoản Hostinger đang kết nối.
- **Hostinger chỉ dùng để khách review** (`--target=review`). Bản chính thức deploy lên hosting của khách (`--target=production`) sau khi khách duyệt, với sự đồng ý rõ ràng.
- Đã chọn: **dựng trang tĩnh giữ nguyên URL cũ** cho mọi nội dung thật (39 URL), còn lại 301/410 qua `.htaccess` sinh từ `src/data/redirects.json`. Bản EN chỉ có landing page; URL EN cũ chuyển về `/en/`.
- Ảnh đã tải từ site cũ về `assets/img/` (WebP), tra trong `src/data/images.json`. Không còn phụ thuộc vào `wp-content/uploads`.
- Form gửi qua `api/quote.php` (PHP `mail()` + lưu CSV ngoài thư mục web). Cấu hình `api/config.php` chỉ đặt trên máy chủ, không commit. Email nhận chưa được chủ dự án chốt.

## Lệnh

```bash
node build.mjs                       # local: 40 trang vào dist/, noindex
node build.mjs --target=review       # Hostinger review: + .htaccess, api/quote.php, robots chặn
node build.mjs --target=production   # hosting thật: cho index, sitemap, HTTPS + bỏ www, HSTS
python .claude/skills/hopphu-web-design/scripts/check_links.py dist [base]   # 0 liên kết gãy
node build.mjs --index    # cho phép index, chỉ dùng khi đo Lighthouse
node build.mjs --base=hophujsc_web   # dựng cho đường dẫn con như GitHub Pages (viết không có "/" đầu: Git Bash trên Windows tự đổi "/x" thành "C:/Program Files/Git/x")
node serve.mjs            # http://localhost:4173 (hoặc preview tool, cấu hình "preview")
python .claude/skills/hopphu-web-design/scripts/check_page.py dist/index.html dist/en/index.html
bash .claude/skills/hopphu-web-design/scripts/lighthouse.sh /      # hoặc /en/
```

Không có dependency, không cần `npm install`. Node 20+, Python 3.

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `src/data/site.json` | Dữ liệu doanh nghiệp, ảnh, danh mục, liên kết (chữ theo ngôn ngữ dạng `{ vi, en }`) |
| `src/data/copy.json` | Toàn bộ câu chữ landing page, song ngữ |
| `src/components.mjs` | Component dùng chung; `createContext(site, copy, lang)` cung cấp `t()`, `url()`, `img()` |
| `src/pages/landing.mjs` | `meta`, `schema`, `render` của landing page |
| `src/styles/` | `tokens.css` (design tokens), `base.css`, `components.css`, `landing.css` |
| `src/scripts/site.js` | Menu, mega menu, hiệu ứng xuất hiện, form báo giá |
| `docs/` | Audit, SEO, bản đồ URL, design system, asset manifest, QA, phân tích Hengfor |

## Quy tắc bắt buộc

1. **Không bịa dữ liệu doanh nghiệp**: số liệu, năm thành lập, chứng nhận, lời chứng thực, giá, ảnh nhà máy, logo đối tác chưa được phép. Chỉ dùng nội dung trên hopphujsc.com, trên Facebook đã được xuất, hoặc do chủ dự án cung cấp.
2. **Không deploy, không sửa hopphujsc.com, không gửi thử form production** khi chưa được duyệt rõ trong chat.
3. **Giữ nguyên URL đang có** (xem `docs/url-migration-map.md`).
4. REST API của site bị iThemes Security chặn có chủ đích. Không tìm cách vượt qua.
5. Trang Facebook https://www.facebook.com/ctyhopphu.jsc/ cần đăng nhập. Không tự đọc bài; chờ chủ dự án xuất dữ liệu.

Chi tiết thiết kế và quy trình làm việc nằm trong skill `hopphu-web-design`.

## Quyết định đã chốt

| Ngày | Quyết định |
|---|---|
| 2026-10-22 | Landing page HTML trước, song ngữ Việt/Anh, responsive |
| 2026-10-22 | Tham khảo Hengfor về chất lượng bố cục, không sao chép |
| 2026-10-22 | Font Be Vietnam Pro (một họ, 3 độ đậm) |
| 2026-10-22 | Màu chính `#C51F2B`: **giả định tạm** theo brief, chưa xác nhận có phải màu nhận diện chính thức. Logo thực tế là đỏ mận `#7A1508`. Đổi một dòng trong `tokens.css` nếu cần |

## Đang chờ chủ dự án

- Xác nhận màu chính (`#C51F2B` hay màu logo).
- Dữ liệu xuất từ Facebook: ảnh sản phẩm, ảnh nhà xưởng.
- Địa chỉ chính xác (đang có 2 phiên bản trên site).
- Quy trình 4 bước có đúng không, có gửi mẫu thử không.
- Duyệt bản dịch tiếng Anh: `docs/translation-review.md`.
- Quyền dùng logo khách hàng (Sunhouse, VinMart…).
- Quyền truy cập WordPress/staging khi chuyển sang giai đoạn tích hợp.
