# TODO từ góp ý khách hàng (lần 1)

Ngày nhận: 2026-10-23. Bản được góp ý: https://hopphu.manabihub.me/ (branch `redesign-v2`).
Trạng thái: **đợt 1 đã làm** trên branch `review-khach-01` (2026-10-23). Còn lại là các mục chờ khách gửi tài liệu hoặc chọn phương án.

### Đã làm ở đợt 1
- Ý 1: nền trang chuyển sang xám ấm rất nhạt `#F6F5F2` (phương án A, tạm áp dụng để khách xem; đổi bằng một dòng trong `tokens.css`). Nền phụ `#EBE9E4`, khối tối `#26282B`. Ô form, thẻ giữ nền trắng. Header, menu mobile, mega menu, thanh liên hệ dùng nền mới.
- Ý 2: khối sản phẩm khi rê chuột/focus/chạm: ảnh nhích lên 6px và phóng 6%, tên chuyển đỏ, hiện "Xem chi tiết →" (trên cảm ứng luôn hiện). Áp dụng cả lưới `/san-pham/`. Tắt chuyển động khi bật giảm chuyển động.
- Ý 3: header thành `Nhận báo giá | VI EN`; nút ngôn ngữ ngoài cùng bên phải trên desktop, có vạch ngăn; trên mobile nằm trước nút menu (nút báo giá ẩn ở màn hình nhỏ nên không còn sát nhau).
- Ý 4: chữ phụ `#5C636B` thành `#43484E` (8,5:1 trên nền mới), chữ nhỏ nhất 13px thành 14px, chữ phụ trên nền tối `#C9CED3`/`#E1E4E7` (9,3:1 và 11,6:1).
- Ý 5.1: `docs/gui-khach/huong-dan-chup-anh-nha-xuong.md`.
- Ý 6.2: `docs/gui-khach/mau-noi-dung-song-ngu.md`.
- Ý 7 (một phần): đổi tên "Túi siêu thị tự huỷ" (HDPE), "Túi thực phẩm"; chất liệu túi hạt xoài và túi niêm phong thành LDPE, HDPE, theo danh sách khách gửi. Chưa tách túi lót, chưa thêm túi bầu ươm và dòng "theo yêu cầu khác" (chờ 7.1, 7.2 và nội dung).

Kiểm thử (localhost): Lighthouse trang chủ mobile 99–100, desktop 100, A11y 100; 40 trang, 0 liên kết gãy; không tràn ngang ở 390 và 1440. Ảnh: `docs/screenshots/review-01/`.

Ký hiệu: 🟢 làm được ngay sau khi duyệt · 🟡 cần chủ dự án hoặc khách chọn phương án · 🔴 chờ khách gửi tài liệu.
Độ lớn: S (nhỏ, vài chỗ CSS), M (một vài component), L (thay đổi cấu trúc hoặc nhiều trang).

---

## Ý 1: Màu nền đơn điệu, nhìn lâu chói, mỏi mắt

**Phân tích.** Khách hài lòng với bố cục, mobile, khoảng trống; giữ đỏ trắng là đúng. Cái chói đến từ nền **trắng tinh `#FFFFFF` chiếm phần lớn trang**, xen với khối than `#272B30`. Tương phản trắng và than rất gắt khi xem lâu. Màu xám phụ `#F4F5F6` lại hơi xanh lạnh, nên trang vẫn có cảm giác trắng toát.

**TODO**
- [ ] 1.1 🟡 S: Đưa 3 bảng màu nền trung tính để chọn, mỗi bảng có ảnh chụp trang chủ:
  - A. Xám ấm rất nhạt: nền chính `#F6F5F2`, nền phụ `#ECEAE5`.
  - B. Xám trung tính: nền chính `#F4F4F2`, nền phụ `#E9E9E6`.
  - C. Giữ nền trắng ở phần nội dung đọc, chỉ đổi nền phụ và hero sang xám ấm.
- [x] 1.2 🟢 S: Khối tối (nhà máy, footer) dịch về than ấm hơn để bớt gắt khi đặt cạnh nền sáng.
- [x] 1.3 🟢 S: Ô form và thẻ giữ nền trắng để vẫn nổi trên nền trung tính.
- [x] 1.4 🟢 S: Kiểm tra lại tương phản WCAG cho mọi cặp chữ và nền sau khi đổi; giữ đỏ `#C51F2B` cho nút.

Ghi chú: chỉ đổi token trong `tokens.css`, toàn site ăn theo.

## Ý 2: Khối sản phẩm cần hiệu ứng tương tác khi rê chuột

**Phân tích.** Hiện đã có hiệu ứng nhưng quá nhẹ (ảnh phóng 3% trong 0,7 giây), khách không nhận ra. Ngoài ra chưa có trạng thái tương tự khi dùng bàn phím hoặc chạm trên điện thoại.

**TODO**
- [x] 2.1 🟢 S: Khi rê chuột, cả thẻ nổi lên rõ hơn:
  - ảnh phóng khoảng 6%;
  - thẻ nhích lên vài px, khung ảnh có viền mảnh;
  - tên sản phẩm đổi sang màu đỏ;
  - hiện dòng "Xem chi tiết".
- [x] 2.2 🟢 S: Hiệu ứng tương tự khi focus bằng bàn phím; khi chạm trên mobile có phản hồi ngắn.
- [x] 2.3 🟢 S: Tắt chuyển động khi người dùng bật "giảm chuyển động".
- [x] 2.4 🟢 S: Áp dụng cùng hiệu ứng cho trang `/san-pham/` và các trang danh mục cho đồng bộ.

## Ý 3: Nút chuyển ngôn ngữ đặt sát nút "Nhận báo giá", dễ bấm nhầm

**Phân tích.** Đúng. Thứ tự hiện tại là `EN` rồi đến `Nhận báo giá`, hai nút cạnh nhau, `EN` nhỏ.

**TODO**
- [x] 3.1 🟢 S: Desktop: đưa nút ngôn ngữ ra ngoài cùng bên phải, sau nút báo giá, có khoảng cách và vạch ngăn rõ.
- [x] 3.2 🟡 S: Mobile, chọn một trong hai:
  - A. Nút ngôn ngữ ngoài cùng bên phải, sau nút menu.
  - B. Đưa nút ngôn ngữ vào trong menu.
- [x] 3.3 🟢 S: Hiển thị cả hai lựa chọn `VI | EN` (ngôn ngữ đang xem in đậm) thay vì chỉ một chữ, để người dùng hiểu đó là nút chuyển ngôn ngữ.

## Ý 4: Chữ nhỏ màu xám nhạt khó đọc, nhất là ngoài nắng

**Phân tích.** Chữ phụ `#5C636B` đạt chuẩn WCAG AA (6,3:1) nhưng nhạt khi ra nắng. Các chỗ yếu nhất:
- chữ cỡ 13px dùng cho chất liệu dưới ảnh sản phẩm, chú thích, gợi ý form, ngày đăng (11 chỗ);
- chữ xám trên nền tối (`#C3C8CE`, `#9AA3AB`) ở mục nhà máy và footer.

**TODO**
- [x] 4.1 🟢 S: Chữ phụ đậm hơn: `#5C636B` thành khoảng `#434950` (từ khoảng 6:1 lên khoảng 9:1).
- [x] 4.2 🟢 S: Chữ nhỏ nhất tăng từ 13px lên 14px, cỡ chữ thân bài trên mobile giữ tối thiểu 16px.
- [x] 4.3 🟢 S: Chữ xám trên nền tối sáng hơn (`#9AA3AB` thành `#C9CED3`, `#C3C8CE` thành `#DADFE3`).
- [x] 4.4 🟢 S: Chạy lại kiểm tra tương phản và Lighthouse sau khi sửa.

## Ý 5: Cần nhiều ảnh thực tế nhà xưởng, nhưng chưa chụp và xưởng hơi luộm thuộm

**Phân tích.** Đây là điểm quyết định chất lượng cảm nhận của bản này. Không thể thay bằng ảnh mạng hay ảnh AI rồi gọi là ảnh nhà máy Hợp Phú, vì khách B2B có thể đến thăm xưởng và sẽ thấy khác. Nhưng xưởng luộm thuộm vẫn chụp được nếu chọn đúng cách chụp.

**Đề xuất cho khách**
- Chụp **cận cảnh và chi tiết** thay vì toàn cảnh: màng nhựa chạy ra từ máy, cuộn màng, đầu in, tay công nhân kiểm tra đường hàn, kiện thành phẩm xếp gọn. Cận cảnh tự loại bỏ phần bừa bộn và trông chuyên nghiệp hơn.
- Dọn **một góc** đẹp nhất (một máy và lối đi trước máy) để chụp ảnh toàn cảnh duy nhất, không cần dọn cả xưởng.
- Công nhân mặc đồng phục hoặc áo cùng màu, đeo găng tay; xin đồng ý của người xuất hiện trong ảnh.
- Chụp lúc ánh sáng tự nhiên tốt, tắt đèn màu lẫn lộn; điện thoại đời mới chụp ngang là đủ cho web.
- Có thể quay thêm vài đoạn video ngắn 5–10 giây cảnh máy chạy để làm ảnh động nhẹ.
- Nếu có ngân sách: thuê thợ ảnh công nghiệp nửa ngày, kèm danh sách cảnh có sẵn.

**TODO**
- [x] 5.1 🟢 S: Soạn **danh sách cảnh cần chụp một trang** bằng tiếng Việt để gửi khách: khoảng 12–15 cảnh, có khung ngang/dọc, gợi ý góc chụp, việc cần dọn trước. Dựa trên `docs/asset-manifest.md`.
- [ ] 5.2 🟢 M: Tăng số vị trí ảnh nhà máy để dùng ảnh khách gửi: toàn cảnh, máy móc, chi tiết sản xuất, kiểm tra, công nhân, kho thành phẩm.
- [ ] 5.3 🟡 S: Trong lúc chưa có ảnh, chọn một trong hai:
  - A. Giữ các ô chờ ảnh như hiện tại.
  - B. Ẩn tạm mục nhà máy, chỉ giữ phần chữ năng lực, cho đến khi có ảnh.
- [ ] 5.4 🔴 L: Đưa ảnh vào khi nhận được: xử lý ảnh (cắt, cân màu, WebP, 2 cỡ), cập nhật `images.json`, kiểm tra lại.

## Ý 6: Khách sẽ viết lại toàn bộ nội dung song ngữ và gửi ảnh sản phẩm

**Phân tích.**
- Tin nhắn ghi "hình ảnh các sản phẩm e gửi anh như dưới đây" nhưng **chưa có ảnh nào đi kèm**.
- "Toàn bộ nội dung song ngữ" là **thay đổi phạm vi**. Hiện bản tiếng Anh chỉ có trang chủ; các trang sản phẩm, danh mục, giới thiệu chỉ có tiếng Việt, và URL tiếng Anh cũ đang chuyển hướng về `/en/`.

**TODO**
- [ ] 6.1 🔴: Nhắc khách gửi ảnh sản phẩm (link Google Drive hoặc file zip, ảnh gốc chất lượng cao nhất, không chèn chữ hay logo).
- [x] 6.2 🟢 S: Soạn **mẫu nhập nội dung** (bảng tính hoặc tài liệu) để khách điền đúng cấu trúc, mỗi sản phẩm có:
  - tên VI/EN, mô tả ngắn VI/EN;
  - chất liệu, quy cách/kích thước thông dụng, ứng dụng VI/EN;
  - câu hỏi thường gặp (nếu có).
  Thêm các trang Giới thiệu, Dịch vụ, Liên hệ.
- [ ] 6.3 🟡 L: Quyết định phạm vi tiếng Anh: chỉ trang chủ như hiện nay, hay toàn bộ trang có bản tiếng Anh (cần thêm URL `/en/...`, hreflang, sitemap, bản đồ chuyển hướng mới).
- [ ] 6.4 🔴 M: Nhập nội dung khách gửi vào `src/content/` và `src/data/`, kiểm tra chính tả, độ dài title và description, liên kết.

## Ý 7: Thể hiện rõ 9 dòng sản phẩm

**So sánh với danh mục hiện tại**

| Khách yêu cầu | Hiện tại trên web | Việc cần làm |
|---|---|---|
| Túi hạt xoài LDPE, HDPE | Túi hạt xoài (HDPE, LDPE) | Giữ, sửa chất liệu theo khách |
| Túi niêm phong LDPE, HDPE | Túi niêm phong (HD, PE) | Giữ, sửa chất liệu |
| Túi siêu thị tự huỷ HDPE | Túi siêu thị (HDPE, LDPE) | Đổi tên thành "Túi siêu thị tự huỷ", chất liệu HDPE |
| Túi ép quai | Túi ép quai | Giữ |
| Túi lồng bao | Túi lồng bao (túi lót), đang gộp chung | Tách thành 2 dòng |
| Túi lót | (gộp ở trên) | **Dòng mới**, cần URL, nội dung, ảnh |
| Túi bầu ươm | Chưa có | **Dòng mới hoàn toàn**, cần URL, nội dung, ảnh |
| Túi thực phẩm | Túi đựng thực phẩm | Đổi tên thành "Túi thực phẩm" |
| Túi sản xuất theo yêu cầu khác | Chưa có (có trang Dịch vụ) | **Dòng mới**, có thể trỏ về trang Dịch vụ hoặc trang riêng |
| (không có trong danh sách) | Cuộn màng HD/PE/PP | Cần quyết định |
| (không có trong danh sách) | Túi may mặc xuất khẩu | Cần quyết định |

Tin tốt: 9 dòng xếp vừa đúng lưới 3 cột thành 3x3, đẹp hơn lưới 5 ảnh + 1 danh sách hiện nay.

**TODO**
- [ ] 7.1 🟡: Khách xác nhận 2 dòng không có trong danh sách (Cuộn màng, Túi may mặc xuất khẩu):
  - A. Bỏ khỏi trang chủ nhưng giữ trang cũ (để giữ thứ hạng Google), gộp vào "Túi sản xuất theo yêu cầu khác".
  - B. Bỏ hẳn, chuyển hướng 301 về trang "theo yêu cầu khác".
- [ ] 7.2 🟡 S: Xác nhận URL cho dòng mới:
  - `/category/tui-lot/`
  - `/category/tui-bau-uom/`
  - "Túi sản xuất theo yêu cầu khác": `/dich-vu/` có sẵn hay trang mới.
- [ ] 7.3 🟢 M: Cập nhật dữ liệu danh mục (`site.json`): tên, chất liệu, thứ tự 9 dòng theo danh sách khách; cập nhật menu, mega menu, footer, form "Loại bao bì", trang `/san-pham/`.
- [ ] 7.4 🟢 M: Dựng trang danh mục mới cho các dòng mới; trong lúc chờ nội dung, chỉ hiển thị phần có nguồn và để trống phần mô tả (không tự viết thông số).
- [ ] 7.5 🟢 S: Lưới sản phẩm trang chủ 3x3; ô chưa có ảnh dùng kiểu "chờ ảnh" thống nhất cho tới khi khách gửi.
- [ ] 7.6 🟢 S: Cập nhật `redirects.json`, sitemap, bản đồ URL nếu có URL đổi hoặc bỏ.

---

## Thứ tự đề xuất

1. **Làm ngay sau khi duyệt** (không cần chờ khách): 2, 3.1, 3.3, 4, 1.2–1.4, 5.1, 6.2.
2. **Cần bạn hoặc khách chọn trước**: 1.1 (bảng màu), 3.2 (vị trí nút ngôn ngữ trên mobile), 5.3 (ẩn hay giữ mục nhà máy), 6.3 (phạm vi tiếng Anh), 7.1 và 7.2 (danh mục và URL).
3. **Chờ khách gửi**: ảnh sản phẩm (6.1), nội dung song ngữ (6.4), ảnh nhà xưởng (5.4).

Sau mỗi đợt sửa: build, kiểm tra liên kết, Lighthouse, ảnh chụp 1440 và 390, rồi deploy lên Hostinger để khách xem.
