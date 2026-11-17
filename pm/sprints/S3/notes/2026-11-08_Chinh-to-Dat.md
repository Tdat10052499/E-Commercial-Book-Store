# Ghi chú gửi Đạt – Sprint 3 (Chủ Nhật 08/11/2026, 20:40)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt (Leader S3). Kế hoạch gốc: `pm/sprints/S3/sprint-backlog.md` và `daily-plan.md` (PR #20).*

Sprint 3 đang ở **ngày D3/7** (Fri 06/11 → Thu 12/11, nộp 23:59 Thu 12/11). Trên Jira chưa có task S3 nào Done, nên burndown vẫn nằm ngang. Phần dưới đây là những việc Đạt cần làm, theo thứ tự ưu tiên.

## 1. Việc cần làm ngay (tối nay hoặc sáng mai)

| # | Việc | Ở đâu | Vì sao gấp |
|---|---|---|---|
| 1 | **Start Sprint 3** trên Jira (sau khi Chính bấm *Complete sprint* cho Sprint 2) | Board ECBS → Backlog → Sprint 3 → *Start sprint*, ngày 06/11 00:00 → 12/11 23:59 | Sprint chưa start thì Jira không ghi burndown S3, mà c3_S3 cần burndown từ PM tool |
| 2 | **Review và approve trên GitHub**, rồi merge: PR #20 → #21 → #22 (và #18 của S2) | GitHub → Pull requests → *Files changed* → *Review changes* → **Approve** → *Merge* | Task chỉ tính Done khi đã merge; không có approve trên GitHub thì rubric S5 yếu (issue I-06) |
| 3 | **S3-T02 (ECBS-148, trễ từ Thứ Bảy):** chạy các test case admin/Staff còn *Blocked* của S2 trên host bằng tài khoản Staff; ghi Pass/Fail vào `pm/sprints/S2/test-cases-F2F3.md` | https://pagetunnel.vercel.app/ | Chính chưa nghiệm thu được 24 SP (US-05…09, NFR-04, US-24 – task S3-T03) khi chưa có kết quả này. Đây là phần EV lớn nhất của dự án |
| 4 | **S3-T05 (ECBS-151, trễ) và S3-T07 (ECBS-153, hôm nay):** US-25 "Last updated by" | Danh sách test: TC-CR-06…08 trong `test-cases-F4F5.md` (PR #21) | Cùng một PR là gọn nhất |

**Khi merge:** PR #21 và #22 đều thêm một dòng vào cuối `pm/ai-usage-log.md`. Merge PR thứ hai có thể báo conflict ở file này; giữ **cả hai dòng** là xong.

## 2. Chính đã làm (08/11)

| Task | Kết quả | PR / Jira |
|---|---|---|
| S3-T04 Test case F4, F5, NFR-05, US-25 | 16 test case (mỗi AC một case); kết quả mong đợi tính từ 30 sách seed | PR #21 · ECBS-150 In Review |
| S3-T06 US-11 trang chi tiết | `/books/[id]` + trang "Sorry, this book is not available" (404); thẻ sách mở trang chi tiết; `npm test` 75/75; Vercel build OK | PR #22 · ECBS-152 In Review |
| Dọn Sprint 2 trên Jira | 7 story đã build (US-05…09, NFR-04, US-24) chuyển sang Sprint 3; NFR-03 và 7 task S1/S2 còn mở chuyển về Backlog; Sprint 2 chỉ còn item Done | Chính sẽ bấm *Complete sprint* |

## 3. Phối hợp cho Thứ Hai và Thứ Ba – thống nhất interface trước khi code

S3-T09 (search) và S3-T11 (filter) là phần backend của Đạt; S3-T10 (thanh lọc trên `/books`) là phần UI của Chính. Hai bên dùng chung một interface nên cần thống nhất trước. Đề xuất (theo đúng các test case TC-F5-01…07):

- **Tham số URL:** `q` (keyword), `category` (id thể loại), `min`, `max` (giá VND), `page`. Ví dụ `/books?q=austen&category=1&min=50000&max=150000&page=2`.
- **Hàm dữ liệu:** `listBooksPage(rawPage, { q, category, min, max })` trong `lib/catalog.js`, trả về `{ books, page, lastPage, total, pageSize, filters, error }`.
  - `filters`: giá trị đã chuẩn hoá (keyword đã trim, cắt còn ≤ 100 ký tự), để UI điền lại vào form.
  - `error`: `"Minimum price must not exceed maximum price"` khi min > max. Khi có lỗi thì **không áp dụng** bộ lọc giá (US-13/AC-03).
- **Validate:** một hàm `validateFilters()` trong `lib/catalog-validation.js`, dùng chung cho UI và server (giống `validateBook`).
- **Search:** `ILIKE` trên `title` **hoặc** tên tác giả, escape `%` `_` `\`; vẫn sắp xếp mới nhất trước, 12 cuốn mỗi trang.

Nếu Đạt muốn đổi tên hay cấu trúc thì sửa thẳng vào file này, hoặc nhắn trước tối Thứ Hai (09/11), để Chính làm S3-T10 theo đúng interface.

## 4. Lịch còn lại của Đạt (theo kế hoạch)

| Ngày | Task | Jira | Giờ (plan) |
|---|---|---|---|
| Sat 07/11 (trễ) | S3-T02 Test admin/Staff trên host · S3-T05 Data model US-25 | ECBS-148, 151 | 1.5 + 1.5 |
| Sun 08/11 | S3-T07 US-25 lưu và hiển thị "Last updated by" + test, merge | ECBS-153 | 2.5 |
| Mon 09/11 | S3-T09 Search trong `listBooksPage` + test | ECBS-155 | 2.5 |
| Tue 10/11 | S3-T11 Filter category + giá + test, merge và deploy | ECBS-157 | 2.5 |
| Wed 11/11 | S3-T16 Regression F1–F3 · S3-T17 Weekly Status S3 + risk/issue | ECBS-162, 163 | 1.5 + 1 |
| Thu 12/11 | S3-T19 Release v1.0 (tag, release notes) · S3-T21 EVM + c3_S3 · S3-T22 c2_S3 + c0_S3 + **nộp trước 23:59** | ECBS-165, 167, 168 | 1.5 + 1.5 + 1.5 |
| Mỗi ngày | Daily ≤ 10 phút (S3-D1…D7, ECBS-170…176; Đạt facilitate) | | 0.5 |

## 5. Cần Đạt xác nhận hoặc trả lời

1. **Review 2 / Retro 2 / Planning 3 (06/11):** đã diễn ra chưa, kết quả thế nào (thầy có nhận xét gì không, có nghiệm thu item nào lúc demo không)? Nếu đã họp thì điền `06/11` vào cột *Done on* của S3-T01 trong `sprint-backlog.md`. Phiếu Planning Poker Session 3 ghi vào `pm/backlog/planning-poker-log.md`.
2. **Làm Thứ Bảy và Chủ Nhật:** kế hoạch đang xếp hai ngày này là ngày nhẹ (~3 h). Nếu không làm cuối tuần thì dời task sang Thứ Hai và chạy `python tools/s3_tracker.py plan`.
3. **Kênh Daily** (issue I-05): Zalo hay Teams? Ghi vào đầu `pm/sprints/S3/daily-log.md`.
4. **Vercel preview** đang yêu cầu đăng nhập tài khoản của Đạt, nên Chính không mở được preview của PR để test. Đạt có thể tắt ở Vercel → Project *page_tunnel* → Settings → **Deployment Protection** → *Vercel Authentication* → Disabled (chỉ áp dụng cho preview), hoặc tự mở preview của PR #22 để kiểm tra trước khi merge.
5. **Default branch** của repo vẫn là `claude/project-thread-8jl2n6`. Đổi thành `develop` (Settings → General → Default branch) để commit được tính lên trang cá nhân và PR mặc định vào `develop`.

## 6. Thói quen mỗi ngày (cả hai)

```bash
git pull
python tools/s3_tracker.py today dat      # việc hôm nay + việc trễ
```
Xong một task:
1. Mở PR trong ngày; người kia approve rồi merge.
2. Kéo thẻ Jira sang Done và **log giờ thật** (Log time) trước 22:00.
3. Điền *Done on* (dd/mm) và *Actual h* vào bảng trong `sprint-backlog.md`, commit, push.
4. `python tools/s3_tracker.py burndown` để xem burndown.

Cảm ơn Đạt! Có gì vướng thì nhắn Chính trước 22:00 mỗi ngày.
