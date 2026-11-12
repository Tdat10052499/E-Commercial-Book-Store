# Ghi chú gửi Đạt – Sprint 3 (Thứ Tư 11/11/2026, 20:20)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt (Leader S3). Ghi chú trước: `2026-11-10_Chinh-to-Dat.md`.*

Cảm ơn Đạt đã xong S3-T11 (PR #47) và đã approve, merge PR #38 của Chính. Trên `develop`, bộ lọc đã chạy đủ: từ khóa, danh mục và khoảng giá; `npm test` pass **114/114**. Sprint 3 đang ở **D6/7**.

## 1. Quyết định của PO tại D6
- Chính **đồng ý** đề xuất "người chạy test không phải người viết test case":
  - **S3-T14 (ECBS-160) chuyển cho Đạt**: chạy TC-F4-01…04, TC-F5-01…07, TC-CR-06…08 trên host. Jira đã đổi assignee; `sprint-backlog.md` v0.7 (trong #43) đã cập nhật.
  - Các case còn lại của S3-T02 (TC-F2-11, TC-F2-12, TC-F2-19) Chính đã chạy trên host từ 09–10/11 (PR #34, #36), tất cả **Pass**. Vì vậy S3-T02 chỉ còn chờ merge #36.
- Kết quả của S3-T14 ghi vào cột *Actual – hosted, manual* trong `pm/sprints/S3/test-cases-F4F5.md`. Dữ liệu mong đợi tính từ 30 cuốn sách seed (đã ghi sẵn trong file).

## 2. Việc cần làm sớm (theo thứ tự)

| # | Việc | Vì sao |
|---|---|---|
| 1 | **Approve rồi merge PR #50** (release `develop → main`) | Site thật chưa có thanh lọc (Chính kiểm tra lúc 20:05: `/books?min=200000&max=100000` vẫn hiện tất cả sách, không có thông báo lỗi). S3-T14 (Đạt) và S3-T15 (Chính) đều phải chờ bản deploy này. Release không có migration |
| 2 | Review rồi merge **#36 → #39 → #41 → #51 → #43** (merge #43 là có luôn #42) | Chính đã merge `develop` vào tất cả các PR và giải xung đột với #48, nên PR nào cũng merge được. Nhớ **Approve** trước khi merge (I-06) |
| 3 | **Nút Favorite (PR #40) đã lên `main`** | Favorite nằm ngoài phạm vi Release 1.0 [03 §2.2] và không có trong backlog. Đề nghị Đạt **gỡ nút Favorite trước UAT 13/11** (giữ khung hover và nút View), hoặc ghi vào release notes là *known issue / out of scope*. Đạt chọn cách nào thì ghi vào PR |
| 4 | **Điền dòng Daily D6 của Đạt** trên nhánh `docs/P23-s3-daily-d6` (PR #51) | Dòng của Chính đã điền (20:15) |
| 5 | **Dọn dữ liệu test trên site thật trước UAT** | Còn: danh mục *Kids*, tác giả *Tuấn Đạt* / *Minh Chính*, giá và tồn kho của *Emma*, tài khoản *READER D* (sách id 33 đã ẩn) |

## 3. Thứ Năm 12/11 – dùng script xuất file
- Sau khi đã cập nhật giờ trên Jira và có nghiệm thu: `python3 tools/export_templates.py S3` → `deliverables/S3/HK261_SPM_FP_Team6_c2_SprintBacklog_S3.xlsx` và `…c3_SprintReport_S3.docx`.
- Script dùng 2 template mới của GV. Mục 9 của c3 lấy nguyên văn `sprint-report.md`, `weekly-status.md`, `regression-F1-F3.md` của Đạt. Chỉ cần sửa các file Markdown rồi chạy lại script.
- Mục 8 (Review/Retro 3) để TBD, vì buổi họp là ngày 13/11.

## 4. Lịch còn lại

| Ngày | Đạt | Chính |
|---|---|---|
| Wed 11/11 (tối nay) | Merge #50; S3-T16, S3-T17; S3-T14 sau khi deploy | S3-T15 NFR-05 sau khi deploy |
| Thu 12/11 | S3-T19 release v1.0 + tag · S3-T21 · S3-T22 · **nộp trước 23:59** | S3-T13 UAT phần 2 (PR #44 đang ở draft) · S3-T18 nghiệm thu · S3-T20 biên bản UAT (c5) |
