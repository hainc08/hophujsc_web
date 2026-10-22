"""Kiểm tra tĩnh một trang HTML đã dựng theo quy tắc SEO và accessibility của dự án Hợp Phú.

Cách dùng:  python check_page.py dist/index.html [dist/khac/index.html ...]
Thoát với mã 1 nếu có mục FAIL.
"""
import html
import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

# Ghi chú: chỉ kiểm tra những gì xác định được từ HTML. Liên kết có sống hay không cần crawl riêng.
BANNED = ["hàng đầu", "nhanh nhất", "rẻ nhất", "ưu đãi nhất", "24/7", "lorem ipsum",
          "leading", "best price", "cheapest", "fastest", "number one"]
# "read more" chỉ cấm trên trang tiếng Việt (lẫn tiếng Anh vào giao diện Việt).
BANNED_VI_ONLY = ["read more", "related posts"]


def check(path):
    src = open(path, encoding="utf-8").read()
    body = re.sub(r"<(script|style)\b.*?</\1>", " ", src, flags=re.S | re.I)
    text = html.unescape(re.sub(r"<[^>]+>", " ", body)).lower()
    results = []

    def add(ok, label, detail=""):
        results.append(("PASS" if ok else "FAIL", label, detail))

    def warn(label, detail=""):
        results.append(("WARN", label, detail))

    title = html.unescape((re.search(r"<title>(.*?)</title>", src, re.S) or [None, ""])[1]).strip()
    add(bool(title), "Có <title>", title)
    if title and not 30 <= len(title) <= 65:
        warn("Độ dài title nên 50–60 ký tự", f"{len(title)} ký tự")
    lang = (re.search(r'<html[^>]+lang="([a-z]{2})"', src) or [None, ""])[1]
    if title and "Hợp Phú" not in title and "Hop Phu" not in title:
        warn("Title nên có tên thương hiệu", title)

    desc = html.unescape((re.search(r'<meta name="description" content="([^"]*)"', src) or [None, ""])[1])
    add(bool(desc), "Có meta description")
    if desc and not 110 <= len(desc) <= 170:
        warn("Độ dài description nên 140–160 ký tự", f"{len(desc)} ký tự")

    add(lang in ("vi", "en"), '<html lang> là "vi" hoặc "en"', lang)
    canon = (re.search(r'<link rel="canonical" href="([^"]+)"', src) or [None, ""])[1]
    if not path.endswith("404.html"):  # trang 404 cố ý không có canonical
        add(canon.startswith("https://hopphujsc.com/"), "Canonical trỏ về production", canon)
    hl = re.findall(r'<link rel="alternate" hreflang="([^"]+)"', src)
    if lang == "en" or "en" in hl:
        add({"vi", "en", "x-default"} <= set(hl), "Có hreflang vi, en, x-default", ", ".join(sorted(set(hl))))
    add("maximum-scale=1" not in src and "user-scalable=no" not in src, "Không chặn phóng to")

    robots = (re.search(r'<meta name="robots" content="([^"]+)"', src) or [None, ""])[1]
    if "noindex" in robots:
        warn("Đang noindex (đúng cho bản xem trước; dùng --index khi đo SEO)", robots)

    og_img = (re.search(r'<meta property="og:image" content="([^"]*)"', src) or [None, ""])[1]
    add(bool(og_img) and not og_img.lower().endswith(".svg"), "og:image có giá trị, không phải SVG", og_img)
    add(len(re.findall(r'property="og:title"', src)) == 1, "Chỉ một bộ Open Graph")

    h1 = re.findall(r"<h1\b", body, re.I)
    add(len(h1) == 1, "Đúng một H1", f"{len(h1)} thẻ")
    levels = [int(x) for x in re.findall(r"<h([1-6])\b", body, re.I)]
    jumps = [f"H{a}→H{b}" for a, b in zip(levels, levels[1:]) if b > a + 1]
    add(not jumps, "Heading không nhảy bậc", ", ".join(jumps))

    imgs = re.findall(r"<img\b[^>]*>", body, re.I)
    no_alt = [i for i in imgs if not re.search(r"\balt=", i)]
    no_dim = [i for i in imgs if not (re.search(r"\bwidth=", i) and re.search(r"\bheight=", i))]
    add(not no_alt, "Mọi ảnh có thuộc tính alt", f"thiếu {len(no_alt)}/{len(imgs)}")
    add(not no_dim, "Mọi ảnh có width và height", f"thiếu {len(no_dim)}/{len(imgs)}")
    prio = [i for i in imgs if "fetchpriority" in i]
    add(len(prio) <= 1, "Tối đa một ảnh fetchpriority (ảnh LCP)", f"{len(prio)}")

    links = re.findall(r"<a\b([^>]*)>", body, re.I)
    add(not [a for a in links if re.search(r'href="#"', a)], 'Không có href="#"')
    blank_internal = [a for a in links if 'target="_blank"' in a and re.search(r'href="(/|https://hopphujsc\.com)', a)]
    add(not blank_internal, "Liên kết nội bộ không mở tab mới", f"{len(blank_internal)}")
    eng = [p for p in ("/about-us/", "/services/", "/contact/", "/blog/")
           if f'href="{p}"' in body or f'href="https://hopphujsc.com{p}"' in body]
    add(not eng, "Không trỏ tới URL footer cũ bị lỗi", ", ".join(eng))

    # Chrome biên dịch pattern với cờ "v": ( ) { } / | và "-" không phải khoảng (a-z) phải escape trong lớp ký tự.
    bad_patterns = []
    for pat in re.findall(r'\bpattern="([^"]*)"', body):
        for cls in re.findall(r"\[((?:\\.|[^\]\\])*)\]", html.unescape(pat)):
            unesc = re.sub(r"\\.", "", cls)  # bỏ các ký tự đã escape
            loose_dash = re.sub(r"[0-9A-Za-z]-[0-9A-Za-z]", "", unesc)
            if re.search(r"[(){}/|]", unesc) or "-" in loose_dash:
                bad_patterns.append(pat)
    add(not bad_patterns, 'Thuộc tính pattern hợp lệ với cờ "v" của Chrome', ", ".join(bad_patterns))

    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', src, re.S):
        try:
            data = json.loads(block)
            types = [g.get("@type") for g in data.get("@graph", [data])]
            add(True, "JSON-LD hợp lệ", ", ".join(map(str, types)))
            bad = [t for t in types if t in ("Product", "LocalBusiness", "AggregateRating", "Review")]
            if bad:
                warn("Schema cần dữ liệu thật (giá, đánh giá, địa chỉ đã xác nhận)", ", ".join(bad))
        except json.JSONDecodeError as e:
            add(False, "JSON-LD hợp lệ", str(e))

    hits = [w for w in BANNED + (BANNED_VI_ONLY if lang == "vi" else []) if w in text]
    # Landing page là câu chữ do mình viết: lỗi. Trang khác giữ nguyên bài gốc của công ty: chỉ cảnh báo để duyệt.
    is_landing = re.search(r"(^|[\\/])dist[\\/](en[\\/])?index\.html$", path) is not None
    if is_landing:
        add(not hits, "Không có cụm so sánh nhất chưa kiểm chứng hay chữ demo", ", ".join(hits))
    elif hits:
        warn("Nội dung gốc có cụm so sánh nhất, cần công ty duyệt", ", ".join(hits))
    if re.search(r"\b0\s*(%|\+)", text):
        warn("Có số dạng '0%' hoặc '0+' - kiểm tra có phải bộ đếm demo không")

    return results


def main(paths):
    failed = False
    for p in paths:
        print(f"\n== {p}")
        for status, label, detail in check(p):
            failed |= status == "FAIL"
            print(f"  [{status}] {label}" + (f"  ({detail})" if detail else ""))
    return 1 if failed else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1:]))
