# Hợp Phú JSC: redesign website

Landing page song ngữ Việt/Anh cho [Công ty Cổ phần Sản xuất và Thương mại Hợp Phú](https://hopphujsc.com/), nhà sản xuất bao bì nhựa và túi nilon HDPE, LDPE, PP, OPP.

Đây là **bản thiết kế đang review**, chưa thay thế website hopphujsc.com. Bản xem trước trên GitHub Pages được dựng tự động từ nhánh `main` và có `noindex`.

## Chạy trên máy

Cần Node.js 20+. Không có dependency.

```bash
node build.mjs     # dựng dist/index.html (vi) và dist/en/index.html (en)
node serve.mjs     # xem ở http://localhost:4173
```

Kiểm tra (cần Python 3):

```bash
python .claude/skills/hopphu-web-design/scripts/check_page.py dist/index.html dist/en/index.html
```

## Tài liệu

- `CLAUDE.md`: trạng thái dự án, quyết định đã chốt, việc đang chờ.
- `docs/`: audit website và SEO, bản đồ URL, design system, asset manifest, bản dịch cần duyệt, báo cáo QA.
- `docs/prompts/redesign-landing-hengfor.md`: brief thiết kế.
