# STATUS – Trạng thái các phase

*Cập nhật file này ở cuối mỗi phase (trong cùng PR với sản phẩm của phase). Trạng thái: `todo` · `in_progress` · `blocked` (ghi lý do) · `done`. Ngày theo GMT+7. Định nghĩa phase ở `plan/ROADMAP.md`.*

Cập nhật lần cuối: 16/11/2026 – Chính (bộ nộp Final)

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
| P18 | Test case F2, F3, CR-06 + regression F1 | 05/11 | done | Chính, Đạt | 12/11 | #12, #36, #59, #60 | Các case admin/Staff chạy trên host trong S3 (S3-T02), tất cả Pass; 24 SP mang sang S3 được nghiệm thu 09–12/11 |
| P19 | Theo dõi S2 + Weekly Status + Risk/Issue (liên tục) | 05/11 | done | Chính | 06/11 | docs PR | Weekly Status v1.2, risk v1.2 (I-02 đóng, I-05, I-06 mở); còn: giờ S2 của Đạt |
| P20 | Phiếu c4_ChangeRequest | 05/11 | done | Chính | 05/11 | docs PR | deliverables/S2/…c4_ChangeRequest_CR01.docx |
| P21 | Đóng gói và nộp S2 | 05/11 23:59 | in_progress | Chính |  |  | c0 (đã chấm), c2, c3, c4 bản cuối 06/11; còn: upload |
| P22 | Review/Retro 2 | 06/11 | done | Đạt, Chính | 11/11 | #41 | Review 2 trên lớp 06/11 (Đạt trình bày); Retro 2 trễ 5 ngày (11/11), 4 action A1–A4 |
| P23 | Sprint Planning 3 | 06/11 | done | Đạt, Chính | 11/11 | #41 | Kế hoạch theo ngày (PO 07/11); Leader S3 xác nhận 11/11; Planning Poker Session 3 (11/11, sau khi làm) → CR-07 |
| P24 | Xây F4 | 09/11 | done | Đạt | 12/11 | #22, #29 | US-11 nghiệm thu 12/11 |
| P25 | Xây F5 | 10/11 | done | Đạt, Chính | 12/11 | #30, #38, #47 | US-12, US-13 nghiệm thu 12/11 |
| P26 | Test F4, F5 + regression + hiệu năng | 11/11 | done | Chính (viết), Đạt (chạy) | 12/11 | #56, #58, #59, #60 | 16 case S3 (15 Pass + TC-CR-08 Partial); smoke 15/15; NFR-05 0.50 s / 0.38 s; 114/114 |
| P27 | Release v1.0 (tag, release notes) | 12/11 | done | Đạt | 16/11 | #57, #62, #64 | PR #64 merge vào `main` và tag `v1.0`, `baseline-v1.2` lúc 16/11 22:59 (trễ 4 ngày) |
| P28 | UAT script | 12/11 | done | Chính | 12/11 | #39, #44, #54 | 73 AC; c5_UAT.docx |
| P29 | Theo dõi S3 + EVM nháp (liên tục) | 12/11 | done | Đạt | 12/11 | #62 | Weekly Status S3 1.0, Sprint Report S3, EVM D7 (SPI 0.97, CPI 1.50) |
| P30 | Đóng gói và nộp S3 | 12/11 23:59 | done | Đạt, Chính | 12/11 | #55, #65, #66 | Nộp đúng hạn (Chính xác nhận 15/11); file nộp chưa đưa lên repo |
| P31 | Review 3 + UAT + biên bản | 13/11 | done | Đạt, Chính | 13/11 | docs/P33 | Video Review 3 đã nộp; UAT **Accepted** 73/73; CCB CR-07 Approve (Chính cung cấp 15/11) |
| P32 | Hosting cuối, tài khoản demo, dữ liệu đóng dự án | 14/11 | todo | Đạt |  |  | Dữ liệu đóng dự án đã thu (Jira 15/11, 85.23 h). Còn: tài khoản demo cho Final Report, giờ sau 12/11 19:59 |
| P33 | Final Report, EVM, Lessons Learned, PMP/Workbook Final | 18/11 23:59 | in_progress | Chính |  | #67, #68 | 17/11: Final Report v0.5 – 68/68 SP, SPI 1.00, CPI 1.34 (98.23 h, đủ giờ). Còn TBD: tài khoản demo, link video, nhận xét UAT, lý do CR-07 |
| P34 | Slide + video demo | 18/11 | in_progress | Đạt (deck Canva, video), Chính (số liệu, kịch bản) |  | #68, #69 | **Chốt 17/11: dùng deck Canva 14 slide của Đạt** (https://canva.link/b3s5irrs6rifzb3). Kịch bản v3.1 đã cập nhật số. Còn: sửa slide 1/7/12 trên Canva, chèn video vào slide 10, dán speaker notes, xuất `c6_Slides.pptx` vào `deliverables/Final/`. Deck 15 slide của Chính chuyển vào `pm/final/archive/` (không nộp) |
| P35 | Nộp cuối + Eval360 | 18/11 23:59 | in_progress | Chính, Đạt |  | #67, #68 | Còn: mỗi người chấm cột E–G Eval360, nộp 6 file lên eLearning |
| P36 | Thuyết trình | Fri 20/11 (giờ TBD) | todo | Đạt, Chính |  |  | Kịch bản thuyết trình 24 lượt (ngoài repo); NFR-03 đã kiểm tra 17/11 |

## Nhật ký thay đổi trạng thái
| Ngày | Người | Thay đổi |
|---|---|---|
| 27/10/2026 | Đạt | Dựng cấu trúc repo, roadmap, skill `next`/`status`; P00 → in_progress |
| 30/10/2026 | Đạt | Catch-up S1: Master Plan, PMP v1.0, Backlog v1.0, CR-06 analysis, S1 backlog, F1 code + tests, xuất c1/c2/c3 nháp; P01–P09, P11 → in_progress/blocked |
| 30/10/2026 | Chính | P01 vai trò + capacity kế hoạch chốt; P03 thêm Master Plan Excel; P09 chốt phương án B; P13 → in_progress (nháp S2_Backlog) |
| 05/11/2026 | Chính | CCB Approve B ghi nhận; P13, P14, P20 → done; P15, P16, P18, P19, P21 → in_progress; P17 giao Đạt |
| 06/11/2026 | Chính | Cuối S2: P15, P16, P17, P19 → done; P18, P21 vẫn in_progress (test admin trên host, upload) |
| 15/11/2026 | Chính | Cập nhật S3 theo repo/Jira và kết quả 13/11 do Chính cung cấp: P18, P22–P26, P28–P31 → done; P27 in_progress (thiếu tag v1.0); P33 → in_progress (c6, c2 Final) |
| 16/11/2026 | Chính | Bộ nộp Final xuất đủ 5 loại file (c1, c2, c6 Report, c6 Slides, Eval360 × 2); P33–P35 → in_progress chờ điền TBD và nộp |
| 16/11/2026 23:30 | Chính | Đạt merge #65, #67, #64, gắn tag `v1.0` và `baseline-v1.2`, log 4.5 h trên Jira → P27 done; Final Report v0.3, c2 Final và slide xuất lại với AC 89.73 h (CPI 1.43) |
| 17/11/2026 22:45 | Chính | Hạn nộp dời 18/11 23:59, thuyết trình Thứ Sáu 20/11; NFR-03 kiểm tra 17/11 22:33 → 68/68 SP, SPI 1.00, CPI 1.47; Final Report v0.4, c2, slide xuất lại |
| 17/11/2026 23:45 | Chính | Log giờ của Chính: S3-T22 1 h (Done), D7 0.5 h, 4 task đóng dự án S3-C1…C4 = 7 h → 98.23 h, CPI 1.34; xuất lại report, c2, slide |
| 17/11/2026 | Đạt | P34: làm lại deck Canva thành 14 slide theo yêu cầu 8.2 (10 phút + Q&A), kịch bản + speaker notes chia người nói; ghi chú gửi Chính `pm/sprints/S3/notes/2026-11-17_Dat-to-Chinh.md` (PR #69, merge vào nhánh của Chính 17/11) |
| 17/11/2026 23:55 | Chính | P34: chốt dùng deck Canva 14 slide; deck pptx 15 slide chuyển vào archive; kịch bản đọc theo lượt cho deck Canva |
| 17/11/2026 | Đạt | P34: làm lại deck Canva thành 14 slide theo yêu cầu 8.2 (10 phút + Q&A), kịch bản + speaker notes chia người nói; ghi chú gửi Chính `pm/sprints/S3/notes/2026-11-17_Dat-to-Chinh.md` |
| 17/11/2026 | Đạt | P33: viết lại c6, c1 (PMP 7 phần) và c2 Final bằng ngôn ngữ dễ hiểu, không viết tắt, không dùng ký hiệu GitHub; số liệu giữ nguyên |
| 18/11/2026 02:35 | Chính | P34: deck Canva sửa slide 1 (20/11), 7 (68/68, 98.23 h), 12 (SPI 1.00, CPI 1.34) và lưu; xuất PowerPoint. Còn: speaker notes (dán tay), video slide 10 |
| 18/11/2026 03:00 | Chính | P33/P34: gộp 3 commit mới của Đạt (Sprint 3 đóng trên Jira, NFR-03 68/68, Canva slide 7/12); thống nhất giờ S3 33.23 h (gồm 8.5 h closure), mốc Closure 18/11; xuất lại c1, c2, c6, Eval360; handover §12 liệt kê việc còn lại. c6_Slides.pptx chờ Đạt xuất sau khi chèn video + notes |
