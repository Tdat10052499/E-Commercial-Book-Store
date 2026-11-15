# Ghi chú gửi Đạt – Nộp cuối kỳ (Chủ nhật 15/11/2026, 13:30)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt. Ghi chú trước: `2026-11-12_Chinh-to-Dat.md`. **Hạn nộp Final: 23:59 hôm nay.***

## 1. Chính đã làm (PR `docs/P33-final-report`)
Kết quả ngày 13/11 đã được ghi vào hồ sơ: UAT **Accepted** (73/73 AC Pass, không có lỗi, không có CR mới), CCB **Approve CR-07**, đợt S3 đã nộp đúng hạn, video Review 3 đã nộp.

| File | Nội dung |
|---|---|
| `pm/uat/uat-script.md` v1.0, `uat-minutes.md` v1.0 | Kết quả 73/73 Pass, quyết định Accepted. Còn TBD: giờ bắt đầu/kết thúc, chữ ký GV, nhận xét của GV |
| `pm/change/change-log.md` v1.4 | CR-07 Approve 13/11 → baseline v1.2; CR-06 Closed |
| `pm/backlog/product-backlog.md` v1.4 | US-12 = 5, NFR-05 = 5, US-25 = 3 → **PSP 68** |
| `pm/pmp/03-master-release-plan.md` v1.4 | §3.4 và §3.8: thêm baseline v1.2 (PSP 68, BAC giữ 26,4 triệu) |
| `pm/pmp/05-risk-plan.md` v1.8 | Trạng thái đóng của mọi rủi ro và issue (R03 vẫn theo dõi đến 17/11) |
| `pm/sprints/S3/po-acceptance.md` v1.5 | Lũy kế **66/68 SP**; NFR-03 nghiệm thu sau khi kiểm tra ngày 17/11 |
| `pm/final/final-report.md` v0.1 → `deliverables/Final/…c6_FinalReport.docx` | Final Report đủ các mục theo [03 §6.4]: EVM đóng dự án (SPI 0.97, CPI 1.50), 3 burndown, 7 Lessons Learned, khai báo AI |
| `tools/export_final.py` → `deliverables/Final/…c2_SprintBacklog_Final.xlsx` | Workbook lũy kế S1–S3 + sheet EVM (có công thức), UAT, Weekly Status S3, Lessons Learned, AI usage |

Branch này được tạo từ **PR #65 của Đạt** (`fix/P30-export-any-cr`), nên merge #65 trước rồi mới merge PR này. PR #66 của Chính trùng nội dung với #65, nên có thể đóng.

## 2. Đạt cần làm hôm nay (theo thứ tự)
| # | Việc | Vì sao |
|---|---|---|
| 1 | **Review rồi merge #65, sau đó review và merge PR này** (nhớ bấm Approve) | c2 Final và c6 lấy số liệu từ các file trong PR này |
| 2 | **Gắn tag `v1.0`** trên `main` (merge PR #64 trước), sau đó gắn `baseline-v1.2` trên `develop` sau khi PR này đã merge | Checklist Phụ lục C yêu cầu tag `v1.0`; RD-3. Final Report hiện còn ghi TBD |
| 3 | **Log giờ còn thiếu trên Jira** (S3-T17, T19, T21, D7 của Đạt), rồi **đóng Sprint 3** trên Jira | Jira không có worklog nào sau 12/11 18:46 và Sprint 3 vẫn đang mở. Có giờ mới thì Chính chạy lại `python3 tools/export_final.py` để cập nhật AC và CPI |
| 4 | **c1_ProjectPlan_Final.docx** (PMP cập nhật theo góp ý GV và CR) | Phần của Đạt. Release Plan và risk register đã cập nhật trong PR này |
| 5 | **c6_Slides.pptx** + **video demo ≤ 3 phút** (có cả kịch bản AC pass và AC fail) [03 §8] | Phần của Đạt. Số liệu lấy từ Final Report §2–§3 để khớp nhau |
| 6 | Gửi Chính **tài khoản demo** (Admin, Staff, Customer) qua tin nhắn riêng | Chính điền vào file docx nộp, **không** đưa lên repo |
| 7 | Mỗi người nộp **Eval360** của mình | Checklist Phụ lục C |
| 8 | Nếu được, đưa file S3 đã nộp (c2, c3, c0) vào `deliverables/S3/` | Để lưu trữ (mục Closure 6) |

## 3. Số liệu dùng chung (để slide khớp với report)
- **Scope:** 20/20 item; 66/68 SP Done (baseline v1.2); UAT 73/73.
- **Velocity:** S1 0, S2 5, S3 45 SP; trung bình 22 SP/Sprint.
- **Giờ:** kế hoạch 48 / 39.75 / 39.5 h; thực tế 41 / 24 / 20.23 h, tổng 85.23 h (Jira 15/11; chưa gồm giờ sau 12/11 19:59).
- **EVM đóng dự án:**

  | Chỉ số | Giá trị (VND) |
  |---|---|
  | PV | 26.400.000 |
  | EV | 25.623.529 |
  | AC | 17.046.000 |
  | SV | −776.471 |
  | CV | +8.577.529 |
  | SPI / CPI | 0.97 / 1.50 |
  | EAC | 17.562.545 |
- **Lỗi:** 6 lỗi tìm thấy, đều đã sửa, 0 lỗi còn mở; 114/114 test tự động pass.
