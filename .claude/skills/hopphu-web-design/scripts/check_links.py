"""Kiểm tra mọi liên kết và ảnh nội bộ trong dist/ trỏ tới file có thật.

Cách dùng:  python check_links.py dist [base]
  base: đường dẫn con khi dựng cho GitHub Pages, ví dụ /hophujsc_web/ (mặc định /)
Thoát với mã 1 nếu có liên kết gãy.
"""
import html
import os
import re
import sys
from urllib.parse import unquote, urlsplit

sys.stdout.reconfigure(encoding="utf-8")
dist = sys.argv[1] if len(sys.argv) > 1 else "dist"
base_arg = sys.argv[2] if len(sys.argv) > 2 else "/"
# Chỉ lấy đoạn cuối: Git Bash trên Windows tự đổi "/hophujsc_web/" thành "C:/Program Files/Git/hophujsc_web/".
_last = base_arg.replace("\\", "/").strip("/").split("/")[-1]
base = f"/{_last}/" if _last else "/"


def exists(path):
    rel = unquote(path)[len(base):] if unquote(path).startswith(base) else None
    if rel is None:
        return False
    full = os.path.join(dist, rel)
    return os.path.isfile(full) or os.path.isfile(os.path.join(full, "index.html"))


broken = {}
pages = 0
for root_dir, _, files in os.walk(dist):
    for f in files:
        if not f.endswith(".html"):
            continue
        pages += 1
        p = os.path.join(root_dir, f)
        src = open(p, encoding="utf-8").read()
        for attr, val in re.findall(r'\b(href|src)="([^"]+)"', src):
            val = html.unescape(val)
            if val.startswith(("http:", "https:", "mailto:", "tel:", "#", "data:")):
                continue
            path = urlsplit(val).path
            if path and not exists(path):
                broken.setdefault(val, set()).add(os.path.relpath(p, dist))
        for val in re.findall(r'srcset="([^"]+)"', src):
            for part in val.split(","):
                url = part.strip().split(" ")[0]
                if url and not url.startswith("http") and not exists(urlsplit(url).path):
                    broken.setdefault(url, set()).add(os.path.relpath(p, dist))

print(f"{pages} trang HTML đã kiểm tra, {len(broken)} liên kết gãy")
for url, where in sorted(broken.items()):
    print(f"  {url}  <- {', '.join(sorted(where)[:3])}{' …' if len(where) > 3 else ''}")
sys.exit(1 if broken else 0)
