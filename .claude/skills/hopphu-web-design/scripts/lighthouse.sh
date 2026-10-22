#!/usr/bin/env bash
# Đo Lighthouse cho một đường dẫn trên bản xem trước (http://localhost:4173).
# Cách dùng (từ thư mục gốc repo, khi máy chủ preview đang chạy):
#   bash .claude/skills/hopphu-web-design/scripts/lighthouse.sh /            -> trang chủ
#   bash .claude/skills/hopphu-web-design/scripts/lighthouse.sh /san-pham/
# Dựng tạm với --index (để điểm SEO không bị trừ vì noindex), chạy 3 lần mobile + 1 desktop,
# in bảng tóm tắt, rồi dựng lại bản noindex.
set -euo pipefail

PAGE="${1:-/}"
URL="http://localhost:4173${PAGE}"
OUT="${LH_OUT:-$(mktemp -d)}"

curl -sf -o /dev/null "http://localhost:4173/" || { echo "Máy chủ preview chưa chạy ở cổng 4173"; exit 1; }

node build.mjs --index
trap 'node build.mjs >/dev/null' EXIT

run() {
  npx --yes lighthouse@12 "$URL" "$@" --quiet --chrome-flags="--headless=new --no-sandbox" \
    --output=json --only-categories=performance,accessibility,best-practices,seo
}
for i in 1 2 3; do run --output-path="$OUT/mobile-$i.json"; done
run --preset=desktop --output-path="$OUT/desktop.json"

python -I - "$OUT" <<'PY'
import json, sys, glob, os
sys.stdout.reconfigure(encoding="utf-8")
out = sys.argv[1]
keys = ["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time", "first-contentful-paint"]
print(f"{'Lần đo':<12}{'Perf':>5}{'A11y':>6}{'BP':>5}{'SEO':>5}   LCP / CLS / TBT / FCP")
for f in sorted(glob.glob(os.path.join(out, "*.json"))):
    d = json.load(open(f, encoding="utf-8")); a = d["audits"]; c = d["categories"]
    s = [round(c[k]["score"] * 100) for k in ("performance", "accessibility", "best-practices", "seo")]
    m = " / ".join(a[k]["displayValue"].replace("\xa0", " ") for k in keys)
    print(f"{os.path.basename(f)[:-5]:<12}{s[0]:>5}{s[1]:>6}{s[2]:>5}{s[3]:>5}   {m}")
    for cid, cat in c.items():
        for r in cat["auditRefs"]:
            au = a[r["id"]]
            if cid != "performance" and au.get("score") is not None and au["score"] < 1:
                print(f"    lỗi {cid}: {r['id']}")
print(f"\nBáo cáo JSON: {out}")
print("Lưu ý: đo ở localhost, không có TTFB của máy chủ thật.")
PY
