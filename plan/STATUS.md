# STATUS – Trạng thái các phase

*Cập nhật file này ở cuối mỗi phase (trong cùng PR với sản phẩm của phase). Trạng thái: `todo` · `in_progress` · `blocked` (ghi lý do) · `done`. Ngày theo GMT+7. Định nghĩa phase ở `plan/ROADMAP.md`.*

Cập nhật lần cuối: 06/11/2026 – Chính (cuối Sprint 2)

| ID | Phase | Hạn | Trạng thái | Người làm | Ngày xong | PR | Ghi chú |
|---|---|---|---|---|---|---|---|
| P00 | Thiết lập repo, branch, quyền truy cập | 27/10 | in_progress | Đạt |  |  | Cấu trúc repo đã tạo (Đạt). Còn: tạo main/develop, mời GV + Chính, cân nhắc private, Jira time tracking |
| P01 | Kick-off, vai trò, working agreement, capacity | 28/10 | in_progress | Đạt |  |  | Vai trò chốt (PO Chính; Leader Đạt/Chính/Đạt) và capacity kế hoạch 20 h/người/Sprint ghi vào INPUTS §1–2 (Chính, 30/10). Còn: Đạt xác nhận capacity, kênh Daily, username GitHub của Chính |
| P02 | Product Backlog v1.0 | 28/10 | in_progress | Đạt |  |  | Bản nháp 30 item, GWT, DoR (Đạt). Còn: PO duyệt |
| P03 | Planning Poker + Release Plan + BAC | 28/10 | blocked | Đạt, Chính |  |  | Capacity 40 h/Sprint, BAC 24,0 M VND (kế hoạch) đã chốt; Master Plan bản Excel thêm (pm/plan). SP đã điền theo ước lượng của PO (không có vòng bỏ phiếu, ghi rõ trong log v1.1): PSP = 55 SP, velocity kỳ vọng ≈ 18.3 SP/Sprint. Còn: Đạt xác nhận SP |
| P04 | Chọn stack, scaffold app, deploy khung | 28/10 | in_progress | Đạt |  |  | Stack: Next.js + Vercel + Supabase (Đạt chốt 30/10). Còn: tạo Supabase + Vercel, deploy |
| P05 | Sprint Planning 1 → Jira | 28/10 | in_progress | Đạt |  |  | `S1_Backlog` nháp 14 task / 48 h kế hoạch. Còn: capacity, nhập Jira |
| P06 | Xây F1 | 29/10 | in_progress | Đạt |  |  | Code F1 xong trên local; còn deploy + Chính review PR |
| P07 | Test case F1 | 29/10 | in_progress | Đạt |  |  | 24 TC; local automated 21/21 pass; còn chạy tay trên URL host |
| P08 | PMP v1.0 (7 phần) | 29/10 | in_progress | Đạt |  |  | Bản nháp đủ 7 phần; còn xác nhận SMART/stakeholder, capacity, BAC |
| P09 | CR-06: Change Log + impact analysis + phương án CCB | 29/10 | in_progress | Đạt, Chính |  |  | Change Log + 3 phương án; PO chốt đề xuất phương án B (30/10). Còn: Planning Poker SP cho US-24/25, họp CCB |
| P10 | Theo dõi S1 (liên tục) | 29/10 | todo |  |  |  |  |
| P11 | Đóng gói và nộp S1 | 29/10 23:59 | in_progress | Đạt |  |  | Bản nháp c1, c2, c3 trong deliverables/S1 (tools/export_s1.py). Còn: c0_Eval, upload |
| P12 | Review/Retro 1 + CCB | 30/10 | in_progress | Đạt, Chính |  |  | CCB 30/10: CR-06 Approve phương án B (Chính cung cấp 04/11). Còn: ghi biên bản Retro 1 |
| P13 | Sprint Planning 2 | 30/10 | done | Chính | 05/11 | docs PR | S2_Backlog v1.0: 9 item / 29 SP, 23 task / 39.75 h; velocity S1 thực tế 0 SP; 23 task đã nhập Jira (ECBS-124…146) |
| P14 | Cập nhật baseline theo CCB | 31/10 | done | Chính | 05/11 | docs PR | Backlog v1.2 (PSP 62), Release Plan v1.3 (BAC 26,4 M), risk v1.1; tag baseline-v1.0, baseline-v1.1 |
| P15 | Xây F2 | 03/11 | done | Chính, Đạt | 05/11 | #8, #11, #16 | Chính: data model, seed, category, author (PR #8); Đạt: thêm/sửa/ẩn sách (PR #11, #16). Đã deploy. NFR-02 Done; US-05…09 In Review (chờ test admin trên host) |
| P16 | Xây F3 | 04/11 | done | Chính | 05/11 | #8 | Lưới sách pass trên host 05/11 23:55; US-10 Done; NFR-04 In Review (trang admin) |
| P17 | Xây CR-06 (nếu Approve) | 04/11 | done | Đạt | 05/11 | #11, #12 | US-24 đã deploy; In Review (chờ test Staff trên host); US-25 sang S3 |
| P18 | Test case F2, F3, CR-06 + regression F1 | 05/11 | in_progress | Chính, Đạt |  | #12 | 33 TC (28 Chính + 5 CR Đạt) + regression F1; 71/71 tự động pass; host: trang công khai 7 Pass; còn: test admin/Staff trên host |
| P19 | Theo dõi S2 + Weekly Status + Risk/Issue (liên tục) | 05/11 | done | Chính | 06/11 | docs PR | Weekly Status v1.2, risk v1.2 (I-02 đóng, I-05, I-06 mở); còn: giờ S2 của Đạt |
| P20 | Phiếu c4_ChangeRequest | 05/11 | done | Chính | 05/11 | docs PR | deliverables/S2/…c4_ChangeRequest_CR01.docx |
| P21 | Đóng gói và nộp S2 | 05/11 23:59 | in_progress | Chính |  |  | c0 (đã chấm), c2, c3, c4 bản cuối 06/11; còn: upload |
| P22 | Review/Retro 2 | 06/11 | todo |  |  |  |  |
| P23 | Sprint Planning 3 | 06/11 | todo |  |  |  |  |
| P24 | Xây F4 | 09/11 | todo |  |  |  |  |
| P25 | Xây F5 | 10/11 | todo |  |  |  |  |
| P26 | Test F4, F5 + regression + hiệu năng | 11/11 | todo |  |  |  |  |
| P27 | Release v1.0 (tag, release notes) | 12/11 | todo |  |  |  |  |
| P28 | UAT script | 12/11 | todo |  |  |  |  |
| P29 | Theo dõi S3 + EVM nháp (liên tục) | 12/11 | todo |  |  |  |  |
| P30 | Đóng gói và nộp S3 | 12/11 23:59 | todo |  |  |  |  |
| P31 | Review 3 + UAT + biên bản | 13/11 | todo |  |  |  |  |
| P32 | Hosting cuối, tài khoản demo, dữ liệu đóng dự án | 14/11 | todo |  |  |  |  |
| P33 | Final Report, EVM, Lessons Learned, PMP/Workbook Final | 15/11 | todo |  |  |  |  |
| P34 | Slide + video demo | 15/11 | todo |  |  |  |  |
| P35 | Nộp cuối + Eval360 | 15/11 23:59 | todo |  |  |  |  |
| P36 | Thuyết trình | 17/11 07:00 | todo |  |  |  |  |

## Nhật ký thay đổi trạng thái
| Ngày | Người | Thay đổi |
|---|---|---|
| 27/10/2026 | Đạt | Dựng cấu trúc repo, roadmap, skill `next`/`status`; P00 → in_progress |
| 30/10/2026 | Đạt | Catch-up S1: Master Plan, PMP v1.0, Backlog v1.0, CR-06 analysis, S1 backlog, F1 code + tests, xuất c1/c2/c3 nháp; P01–P09, P11 → in_progress/blocked |
| 30/10/2026 | Chính | P01 vai trò + capacity kế hoạch chốt; P03 thêm Master Plan Excel; P09 chốt phương án B; P13 → in_progress (nháp S2_Backlog) |
| 05/11/2026 | Chính | CCB Approve B ghi nhận; P13, P14, P20 → done; P15, P16, P18, P19, P21 → in_progress; P17 giao Đạt |
| 06/11/2026 | Chính | Cuối S2: P15, P16, P17, P19 → done; P18, P21 vẫn in_progress (test admin trên host, upload) |
