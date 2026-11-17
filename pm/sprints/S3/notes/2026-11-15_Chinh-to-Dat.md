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

## 4. Cập nhật 16/11/2026 02:50 – bộ nộp Final đã xuất đủ
Đã quá hạn 15/11 23:59 mà repo chưa có c1 Final và slide, nên Chính xuất đủ bộ Final trong PR #67 (`deliverables/Final/`):

| File | Cách tạo | Đạt cần làm |
|---|---|---|
| `…c1_ProjectPlan_Final.docx` | PMP 7 phần trong `pm/pmp/` + mục *Changes since v1.0* (`00-pmp-final.md`) | Đọc lại, bổ sung góp ý của GV ở Review 1 và Review 3 (đang để TBD) |
| `…c2_SprintBacklog_Final.xlsx` | `tools/export_final.py` | – |
| `…c6_FinalReport.docx` | `pm/final/final-report.md` | – |
| `…c6_Slides.pptx` | `tools/slides_final.js`: 15 slide, mỗi slide có ghi chú ai nói và nói gì (Đạt: slide 1–2, 5, 7, 9–10, 13; Chính: 3–4, 6, 8, 11–12, 14) | Xem phần mình nói; làm **video demo ≤ 3 phút** (slide 10) |
| `Eval360_Team6_2374802010097.xlsx` | Template Eval của GV; khối lượng = giờ kế hoạch S1–S3 (Đạt 73.75 h, Chính 53.5 h) | **Tự chấm cột E–G** cho cả hai người rồi nộp |

Mục 2 ở trên (tag v1.0, log giờ, đóng Sprint 3 trên Jira, gửi tài khoản demo) vẫn còn nguyên.

## 5. Cập nhật 16/11/2026 22:40 – chuẩn bị thuyết trình 17/11 07:00
- Đạt đã được gán review **PR #67**. Thứ tự merge: #65 → #67 → #64, rồi gắn tag `v1.0`.
- Chính gửi Đạt file **kịch bản thuyết trình** (đi theo 15 slide, dài 10:00). Phần của Đạt: slide 1–2, 5, 7, 9–10 (demo), 13.
- Sáng 17/11 lúc 06:45, **Đạt mở website và chụp màn hình** làm bằng chứng NFR-03 (TC-F1-24), gửi Chính để Chính nghiệm thu 2 SP còn lại.
- Website đang chạy (16/11 22:30, 30 sách). Danh mục thử nghiệm *Kids* vẫn còn trong bộ lọc: nếu Đạt muốn thì xóa trước giờ thuyết trình (danh mục không có sách thì xóa được).

## 6. Cập nhật 16/11/2026 23:30 – sau khi Đạt merge và gắn tag
Cảm ơn Đạt đã merge #65, #67, #64 và gắn `v1.0`, `baseline-v1.2`. PR #66 cũng đã đóng.

- Có 4 worklog mới của Đạt (4.5 h) nên tổng giờ đổi: **89.73 h**, AC 17.946.000, **CPI 1.43**, EAC 18.489.818. SPI giữ 0.97.
- PR mới `docs/P33-final-hours` đã cập nhật Final Report v0.3, c2 Final và slide (slide 2, 11, 12) theo số này. Đạt nhớ **dùng CPI 1.43** khi trình bày.
- Trên Jira, S3-T17, T19, T21 và D7 đã có giờ nhưng vẫn ở *To Do / In Progress*, còn Sprint 3 vẫn mở. Đạt chuyển 4 việc này sang Done rồi **Complete sprint**. Chính sẽ tự log giờ T22 của mình.

## 7. Cập nhật 17/11/2026 22:45 – hạn nộp mới 18/11 23:59, thuyết trình Thứ Sáu 20/11
- **NFR-03 đạt:** Chính mở website lúc 17/11 22:33, `/books` trả về 200 và đủ 30 sách (TC-F1-24 Pass, `pm/sprints/S3/evidence/NFR-03-check-2026-11-17.md`). PO đã nghiệm thu, nên giờ là **68/68 SP**.
- **Số liệu khi đóng dự án** (dùng thống nhất ở mọi file và trên slide):

  | Chỉ số | Giá trị |
  |---|---|
  | SPI | 1.00 |
  | CPI | 1.47 |
  | EV = PV = BAC | 26.400.000 |
  | AC | 17.946.000 (89.73 h) |
  | EAC | 17.946.000 |
- **PR #68** đã thêm các thay đổi này. Đạt **review rồi merge trước 18/11 tối** để bộ file nộp khớp với repo.
- **Jira:**
  - S3-T17, T19, T21, D7 có giờ nhưng chưa Done. Đạt chuyển sang Done.
  - D2, D3 không họp: để nguyên hoặc ghi chú "Not held".
  - Bấm **Complete sprint** cho Sprint 3.
  - S3-T22 của Chính: Chính tự chuyển và log.
- **Trước 18/11 23:59, mỗi người:**
  - chấm cột E–G trong file Eval360 của mình (`deliverables/Final/Eval360_Team6_2374802010097.xlsx` là của Đạt);
  - Đạt làm video demo ≤ 3 phút (slide 10) và gửi tài khoản demo cho Chính qua tin nhắn riêng.

**→ Bản tổng hợp đầy đủ (17/11 23:00): `pm/final/HANDOVER_2026-11-17_Chinh-to-Dat.md`.**
