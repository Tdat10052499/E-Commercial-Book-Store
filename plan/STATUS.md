# STATUS – Trạng thái các phase

*Cập nhật file này ở cuối mỗi phase (trong cùng PR với sản phẩm của phase). Trạng thái: `todo` · `in_progress` · `blocked` (ghi lý do) · `done`. Ngày theo GMT+7. Định nghĩa phase ở `plan/ROADMAP.md`.*

Cập nhật lần cuối: 30/10/2026 – Claude (theo yêu cầu của Đạt, catch-up Sprint 1)

| ID | Phase | Hạn | Trạng thái | Người làm | Ngày xong | PR | Ghi chú |
|---|---|---|---|---|---|---|---|
| P00 | Thiết lập repo, branch, quyền truy cập | 27/10 | in_progress | Đạt |  |  | Cấu trúc repo đã tạo (Claude). Còn: tạo main/develop, mời GV + Chính, cân nhắc private, Jira time tracking |
| P01 | Kick-off, vai trò, working agreement, capacity | 28/10 | in_progress | Đạt |  |  | Working agreement nằm trong PMP-2/PMP-7. Còn: chốt PO/Leader, capacity thật |
| P02 | Product Backlog v1.0 | 28/10 | in_progress | Đạt |  |  | Bản nháp 30 item, GWT, DoR (Claude). Còn: PO duyệt |
| P03 | Planning Poker + Release Plan + BAC | 28/10 | blocked | Đạt |  |  | Chờ phiếu Planning Poker thật và capacity; Release Plan + công thức BAC đã có |
| P04 | Chọn stack, scaffold app, deploy khung | 28/10 | in_progress | Đạt |  |  | Stack: Next.js + Vercel + Supabase (Đạt chốt 30/10). Còn: tạo Supabase + Vercel, deploy |
| P05 | Sprint Planning 1 → Jira | 28/10 | in_progress | Đạt |  |  | `S1_Backlog` nháp 14 task / 48 h kế hoạch. Còn: capacity, nhập Jira |
| P06 | Xây F1 | 29/10 | in_progress | Đạt |  |  | Code F1 xong trên local; còn deploy + Chính review PR |
| P07 | Test case F1 | 29/10 | in_progress | Đạt |  |  | 24 TC; local automated 21/21 pass; còn chạy tay trên URL host |
| P08 | PMP v1.0 (7 phần) | 29/10 | in_progress | Đạt |  |  | Bản nháp đủ 7 phần; còn xác nhận SMART/stakeholder, capacity, BAC |
| P09 | CR-06: Change Log + impact analysis + phương án CCB | 29/10 | in_progress | Đạt |  |  | Change Log + 3 phương án A/B/C; còn Planning Poker SP cho CR |
| P10 | Theo dõi S1 (liên tục) | 29/10 | todo |  |  |  |  |
| P11 | Đóng gói và nộp S1 | 29/10 23:59 | in_progress | Đạt |  |  | Bản nháp c1, c2, c3 trong deliverables/S1 (tools/export_s1.py). Còn: c0_Eval, upload |
| P12 | Review/Retro 1 + CCB | 30/10 | todo |  |  |  |  |
| P13 | Sprint Planning 2 | 30/10 | todo |  |  |  |  |
| P14 | Cập nhật baseline theo CCB | 31/10 | todo |  |  |  |  |
| P15 | Xây F2 | 03/11 | todo |  |  |  |  |
| P16 | Xây F3 | 04/11 | todo |  |  |  |  |
| P17 | Xây CR-06 (nếu Approve) | 04/11 | todo |  |  |  |  |
| P18 | Test case F2, F3, CR-06 + regression F1 | 05/11 | todo |  |  |  |  |
| P19 | Theo dõi S2 + Weekly Status + Risk/Issue (liên tục) | 05/11 | todo |  |  |  |  |
| P20 | Phiếu c4_ChangeRequest | 05/11 | todo |  |  |  |  |
| P21 | Đóng gói và nộp S2 | 05/11 23:59 | todo |  |  |  |  |
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
| 27/10/2026 | Claude (theo yêu cầu của Đạt) | Dựng cấu trúc repo, roadmap, skill `next`/`status`; P00 → in_progress |
| 30/10/2026 | Claude (theo yêu cầu của Đạt) | Catch-up S1: Master Plan, PMP v1.0, Backlog v1.0, CR-06 analysis, S1 backlog, F1 code + tests, xuất c1/c2/c3 nháp; P01–P09, P11 → in_progress/blocked |
