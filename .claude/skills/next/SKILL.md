---
name: next
description: Xác định và thực hiện phase tiếp theo của Final Project Team 6 theo plan/ROADMAP.md. Dùng khi thành viên hỏi "cần làm gì", "làm gì tiếp theo", "tiếp tục", "next", hoặc nêu một mã phase như P15.
---

# Skill `next` – làm phase tiếp theo

Tham số tùy chọn: `plan` (chỉ trình bày, không thực hiện) · `Pxx` (chọn phase cụ thể).

## Bước 1 – Đồng bộ và lấy bối cảnh
1. `git fetch origin` rồi cập nhật nhánh `develop` (nếu chưa có `develop` thì dùng nhánh mặc định). Nếu working tree có thay đổi chưa commit, hỏi người dùng trước khi làm gì khác.
2. `TZ=Asia/Ho_Chi_Minh date '+%A %d/%m/%Y %H:%M'` để biết hôm nay.
3. Xác định người dùng: `git config user.name`, `git config user.email`; đối chiếu bảng thành viên trong `CLAUDE.md` §6 và `plan/INPUTS.md` §1. Không chắc thì hỏi "Bạn là Đạt hay Chính?".
4. Đọc `plan/STATUS.md`, `plan/ROADMAP.md` (bảng tổng quan + mục chi tiết của phase sẽ làm), `plan/INPUTS.md`. Mở thêm tài liệu nguồn trong `docs/knowledge/` mà phase trích dẫn.
5. Liệt kê các PR đang mở (nếu có công cụ GitHub) để không làm trùng việc người kia đang làm.

## Bước 2 – Chọn phase
Áp dụng đúng "Quy tắc chọn phase" ở đầu `plan/ROADMAP.md`:
1. Phase `in_progress` của người hỏi.
2. Phase quá hạn → cảnh báo rõ số giờ còn lại hoặc đã trễ (nộp trễ bị −10% điểm Sprint mỗi 5 giờ [03 §4.2]).
3. Phase `todo` hạn sớm nhất, đủ phụ thuộc, gate thỏa; ưu tiên phase hợp vai trò người hỏi và phase có trọng số rubric cao.
4. **Làm trước tiến độ** được phép nếu phụ thuộc đã `done` và gate không phải `EVENT` chưa xảy ra. Nếu phase thuộc Sprint sau, nhắc: PO đồng ý, thêm item vào Sprint hiện tại trên Jira, ghi Daily log.
5. Nếu người dùng chỉ định `Pxx` mà phụ thuộc/gate chưa thỏa: giải thích phần nào thiếu, đề xuất phase thay thế; chỉ làm khi người dùng xác nhận và gate không phải `EVENT`.

Luôn kèm **nhắc việc liên tục** (P10/P19/P29): Daily log hôm nay đã ghi chưa, giờ thực tế đã log vào Jira chưa.

## Bước 3 – Trình bày (ngắn, tiếng Việt)
```
📍 Hôm nay <thứ, ngày>, đang ở <Sprint>. Hạn gần nhất: <mốc> (còn <x> giờ).
▶ Phase <Pxx – tên> (hạn <…>) – vì <lý do chọn>.
Các bước:
  1. [Claude] …
  2. [Claude] …
  3. [Bạn] … (dữ liệu cần cung cấp / việc trên Jira, eLearning, lớp học)
Xong khi: <tiêu chí>.
Sau phase này: <phase kế tiếp dự kiến>.
```
Nếu tham số là `plan` thì dừng ở đây.

## Bước 4 – Thực hiện ngay trong lượt này
1. Đánh dấu phase `in_progress` (tên người, ngày) trong `plan/STATUS.md`.
2. Tạo nhánh từ `develop`: `docs/Pxx-<slug>` cho hồ sơ PM, `feat/Pxx-<slug>` cho code.
3. Làm các bước `[Claude]`. Quy tắc:
   - Bám nguồn, trích dẫn `[03 §x]`, `[CR-06 §x]`. Đề `03` là chuẩn cao nhất.
   - **Không bịa** giờ thực tế, velocity, phiếu Planning Poker, quyết định CCB, kết quả UAT, điểm đánh giá. Để `TBD – cần nhập vào plan/INPUTS.md` và hỏi.
   - Tài liệu kế thừa có bảng version history. AC theo Given–When–Then (main, exception, boundary), đánh số `US-xx/AC-0n`.
   - Số liệu khớp giữa các file; trình bày công thức (200.000 VND/giờ, N = 3).
   - Code: kiểm tra quyền ở server, validate client + server, mật khẩu hash, không commit secret; viết/chạy test nếu có.
4. Ghi 1 dòng vào `pm/ai-usage-log.md`.
5. Khi cần dữ liệu từ con người mà chưa có: dừng, hỏi đúng câu cần thiết, giữ phase `in_progress` (hoặc `blocked` kèm lý do).

## Bước 5 – Kết thúc phase
1. Kiểm tra tiêu chí "Xong khi" trong ROADMAP. Chưa đạt thì giữ `in_progress` và liệt kê phần còn thiếu.
2. Đạt thì cập nhật `plan/STATUS.md`: `done`, ngày xong, link PR; thêm dòng vào "Nhật ký thay đổi trạng thái".
3. Commit theo Conventional Commits (`docs(pmp): …`, `feat(F1): …`, `chore(plan): mark Pxx done`) với dòng `Refs: Pxx`. Commit đứng tên người dùng.
4. Push và mở PR vào `develop`, nhờ thành viên còn lại review. **Không merge vào `main`, không push thẳng `main`.**
5. Báo người dùng: đã làm gì, việc `[Bạn]` còn lại, và phase tiếp theo. Lần sau người dùng hỏi "tiếp theo", chạy lại skill này từ Bước 1.
