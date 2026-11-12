# Ghi chú gửi Đạt – Sprint 3 (Thứ Ba 10/11/2026, 11:45)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt (Leader S3). Ghi chú trước: `2026-11-09_Chinh-to-Dat.md`.*

Sprint 3 đang ở **D5/7**. Sáng nay GV có thêm 2 template mới. Mình đã đưa template vào repo và chuyển file c2, c3 của S1 và S2 sang template mới. Số liệu giữ nguyên như bản đã nộp.

## 1. Những việc Chính đã làm hôm nay

| PR | Nội dung | Task |
|---|---|---|
| #38 | Thanh tìm kiếm và lọc trên `/books`: ô từ khóa, danh mục, giá min/max, nút Clear filters; trang 2, 3 vẫn giữ tham số lọc; 104/104 test pass. Phần lọc thật chạy sau khi có S3-T11 của Đạt | S3-T10 |
| #39 | UAT script phần 1: 57 AC của F1, F2, F3 và US-24 được gán vào kịch bản UAT | S3-T12 |
| #36 | Nghiệm thu US-07 và NFR-04 sau khi chạy lại test trên host → **lũy kế 45/62 SP**, S3-T03 xong | S3-T03 |
| #42 | Thêm 2 template mới của GV: `FP_Template_SprintReport.docx` (c3) và `SprintBacklog_Template.xlsx` (c2). Mô tả cấu trúc trong `docs/templates/README.md` | P30 |
| #43 | Chuyển c2/c3 của S1 và S2 sang template mới bằng `tools/export_templates.py`. PR này đã gồm #42 | S3-T23 (làm sớm hơn lịch D6) |

## 2. PR #43 – điều Đạt cần biết

- **Số liệu không đổi.** Script đọc nguồn Markdown tại commit của bản đã nộp (S1 `04831ed`, S2 `469d2b9`), không đọc file hiện tại. Đã kiểm tra lại:
  - PSP: 55 (S1) và 62 (S2).
  - SP Done: 0 (S1) và 21 (S2).
  - Burndown: S1 đứng ở 48 h; S2 đi 39.75 → 30.75 → 6.25 h.
  - Giờ thực tế: 19.5 h; 41 h; 24 h.
  - Các sheet EVM, DoR, ReleasePlan, TestCases, CR06_Impact, WeeklyStatus được chép nguyên từng ô.
- **c3:** template nhảy số từ mục 7 sang mục 10. Mục 8 là biên bản Review/Retro, mục 9 là Status/EVM, Weekly Status và Jira snapshot. Cả hai mục này chép nguyên văn từ bản đã nộp.
- **Sửa template:**
  - Focus factor đặt **1.0**, để capacity vẫn là 40 h/Sprint như c1. Nếu để 0.8 thì capacity thành 32 h, lệch với c1.
  - Công thức chi phí ở ChangeLog bị lỗi `Team!#REF!`. Đã sửa thành giờ × đơn giá 200.000 VND/h.
- **Thứ tự merge:** merge #43 là có luôn #42 (đóng #42 hoặc merge #42 trước đều được).

## 3. Việc cần làm sớm (theo thứ tự)

| # | Việc | Vì sao |
|---|---|---|
| 1 | **S3-T11 (ECBS-157), hôm nay:** lọc theo danh mục và khoảng giá trong `validateFilters()` / `visibleBooksWhere()`, rồi merge và deploy | Thanh lọc của #38 đã sẵn sàng. Thiếu T11 thì TC-F5-04…07 chưa chạy được, và S3-T14 (test trên host, Chính, Thứ Tư) bị chặn. Interface đã ghi trong ghi chú 09/11, mục 3 |
| 2 | **Review và approve, rồi merge:** #36, #38, #39, #43 | Merge theo thứ tự: #36 → #38 (sau khi #38 chạy được với T11) → #39 → #43. Nhớ bấm **Approve** trước khi merge (issue I-06) |
| 3 | **PR #40:** Chính đề nghị *Request changes* | Nút *Favorite* là tính năng ngoài phạm vi Release 1.0 [03 §2.2], không có trong backlog. Nếu muốn giữ hiệu ứng hover thì bỏ nút Favorite |
| 4 | **PR #41 (Daily D5):** dòng của Chính sẽ được Chính điền trong hôm nay | Không merge trước khi dòng này được điền |
| 5 | **Thứ Năm 12/11 (S3-T21, T22):** sau khi cập nhật giờ và nghiệm thu, chạy `python3 tools/export_templates.py S3`, sau đó điền những chỗ còn TBD | Script tạo `deliverables/S3/…c2_SprintBacklog_S3.xlsx` và `…c3_SprintReport_S3.docx` theo template mới. Mục 8 (Review/Retro 3) và mục 9 (Weekly Status S3, EVM S3) còn TBD |

## 4. Lịch còn lại

| Ngày | Đạt | Chính |
|---|---|---|
| Tue 10/11 | S3-T11 | S3-T10 (#38), S3-T12 (#39), Daily D5 |
| Wed 11/11 | S3-T16 regression · S3-T17 Weekly Status S3 | S3-T14 chạy test F4/F5/US-25 trên host · S3-T15 đo NFR-05 |
| Thu 12/11 | S3-T19 release v1.0 · S3-T21 EVM + c3 · S3-T22 c2 + c0 · **nộp trước 23:59** | S3-T13 UAT phần 2 · S3-T18 nghiệm thu · S3-T20 biên bản UAT |
