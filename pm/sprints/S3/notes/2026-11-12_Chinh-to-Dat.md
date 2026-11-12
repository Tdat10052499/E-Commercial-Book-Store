# Ghi chú gửi Đạt – Sprint 3 (Thứ Năm 12/11/2026, 19:00)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt (Leader S3). Ghi chú trước: `2026-11-11_Chinh-to-Dat.md` (nhánh `docs/P23-s3-daily-d6`).*

Cảm ơn Đạt đã chạy xong S3-T14 và S3-T15 (#56, #58), sửa DEF-S3-03 (#52) và release (#57). Hôm nay là ngày cuối Sprint 3; **hạn nộp 23:59**.

## 1. Chính đã làm hôm nay (D7)

| Việc | Kết quả | PR |
|---|---|---|
| Review PR của Đạt | Đã **approve** #41, #52, #53, #59 | – |
| Retro 2 | PO xác nhận A1–A4 (ghi trong `review-retro.md`, trên #41) | #41 |
| Chạy test trên host (người chạy ≠ người viết, theo quyết định D6) | Smoke 1–5 và 12–14, TC-CR-01…05: **tất cả Pass** (18:06–18:31). Dùng tài khoản test mới *UAT Customer* (Customer; được đổi sang Store Staff cho TC-CR-04, sau đó đã trả về Customer). Dữ liệu test đã dọn: sách SMOKE STAFF BOOK 12-11 đã ẩn, category và author test đã xoá; `/books` lại hiện 30 cuốn | #60 |
| A3 – cột *Writer* / *Run by (hosted)* | Đã thêm vào 3 file test case. TC-CR-08 viết lại: R1.0 không có màn hình đổi tên tài khoản, nên trên host chỉ kiểm tra bước khoá; phần đổi tên do `audit.test.js` kiểm | #60 |
| CR-07 | PO đề nghị CCB ngày 13/11 **đổi baseline** sang kết quả Planning Poker Session 3 (PSP 62 → 68; giờ và chi phí không đổi). Trước khi CCB quyết định, các file S3 vẫn dùng baseline v1.1 | #60 |
| S3-T13 UAT script phần 2 | Ready for review | #44 |
| S3-T20 Biên bản UAT + `c5_UAT.docx` | Sẵn sàng; chưa điền gì trước buổi UAT | #54 (nối tiếp #44) |
| S3-T18 Nghiệm thu | **Nhận** US-11, US-12, US-13, NFR-05, US-25 (+15 SP). **NFR-04 tạm giữ** cho tới khi TC-F3-06 pass lại sau bản sửa DEF-S3-03 → lũy kế **57/62 SP** (60/62 khi NFR-04 pass) | #61 |
| S3-T22 Script c0_Eval_S3 | `tools/export_templates.py S3` tạo cả c0. Workload tính theo giờ kế hoạch; **cột E–G để Leader S3 (Đạt) chấm** | #55 |
| Giờ Jira của Chính | Đã log đủ: T01, T13, T18, T20, T23, D5, D6, cùng phần chạy lại của T02 và T16 | – |

## 2. Việc Đạt cần làm tối nay (theo thứ tự)

| # | Việc | Ghi chú |
|---|---|---|
| 1 | Review rồi merge: **#44 → #54**, **#55**, **#60**, **#61** | Nhớ approve trước khi merge (A2) |
| 2 | **Chạy lại TC-F3-06 ở 360 px** sau #57 (smoke 11) | Pass thì NFR-04 được tính lại → 60/62 SP. Ghi vào `test-cases-F2F3.md` |
| 3 | S3-T21: EVM S3 và Sprint Report | Dùng số trong #61: 57 (hoặc 60)/62 SP, baseline v1.1. CR-07 ghi là *Pending CCB* |
| 4 | Chạy `python3 tools/export_templates.py S3` sau khi đã merge xong và giờ Jira đã đủ | Ra c2, c3, c0 của S3 trong `deliverables/S3/` |
| 5 | **Chấm cột E–G** trong `c0_Eval_S3.xlsx` (Leader S3) | Script không bao giờ ghi đè khi đã có điểm |
| 6 | Nộp c0, c2, c3, c5 trước **23:59** | `c5_UAT.docx` đã có trong #54 |
| 7 | Daily D7 lúc 22:00 trên Discord (A1) | |

## 3. Chuẩn bị UAT ngày 13/11
- Tài khoản *UAT Customer* (uat.customer@test.com, Customer) đã có. Mật khẩu do Chính giữ, không ghi vào repo.
- Còn cần trước buổi UAT: một tài khoản *UAT Staff* và *UAT Customer 2* (theo UAT script). Ngoài ra danh mục *Kids* và tác giả *Tuấn Đạt* / *Minh Chính* vẫn còn trên site.
