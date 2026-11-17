# INPUTS – Dữ liệu do con người cung cấp

*Claude **không được tự điền** các mục trong file này. Chỉ ghi khi thành viên cung cấp, kèm ngày và người cung cấp. Ô trống = `TBD`, và skill `next` sẽ hỏi khi phase cần đến.*

## 1. Nhóm và vai trò (P01)
| Mục | Giá trị | Người xác nhận | Ngày |
|---|---|---|---|
| Product Owner | Nguyễn Minh Chính | Nguyễn Minh Chính | 30/10/2026 |
| Leader S1 / S2 / S3 | Hồ Du Tuấn Đạt / Nguyễn Minh Chính / Hồ Du Tuấn Đạt (quy tắc nhóm 2 người [03 §4.1]; Đạt đề xuất trong PMP v1.0) | Nguyễn Minh Chính | 30/10/2026 |
| GitHub username của Chính | TBD | | |
| Kênh Daily Scrum (Teams/Zalo) và giờ họp | TBD – nhóm để lại, chốt ở Review/Retro 2 (06/11); xem issue I-05 | Nguyễn Minh Chính | 05/11/2026 |

## 2. Capacity (P01, cập nhật mỗi Sprint Planning)
| Sprint | Thành viên | Giờ khả dụng | Ghi chú (ngày bận) |
|---|---|---|---|
| S1 | Đạt | 20 (kế hoạch) | 4 h/ngày × 5 ngày làm việc (T6, T2–T5) – kịch bản PMP-3 §3.5; PO (Chính) chốt làm giá trị kế hoạch 30/10/2026; Đạt xác nhận |
| S1 | Chính | 20 (kế hoạch) | như trên – Chính xác nhận 30/10/2026 |
| S2 | Đạt | 20 (kế hoạch) | như trên; Đạt xác nhận |
| S2 | Chính | 20 (kế hoạch) | Chính xác nhận 30/10/2026 |
| S3 | Đạt | 20 (kế hoạch) | như trên; Đạt xác nhận |
| S3 | Chính | 20 (kế hoạch) | Chính xác nhận 30/10/2026 |

## 3. Đường dẫn và tài khoản
| Mục | Giá trị |
|---|---|
| Repo | https://github.com/Tdat10052499/E-Commercial-Book-Store |
| Jira board | https://tdat100524.atlassian.net – project ECBS, board 2 (Đạt, 01/11/2026) |
| GV đã được mời vào repo / Jira | TBD / TBD |
| Stack (P04) | Next.js + Vercel + Supabase – Đạt chốt 30/10/2026 |
| URL hosting | https://pagetunnel.vercel.app/ (Vercel; deployed by Đạt, URL provided by Chính 30/10/2026) |
| Tài khoản demo (admin / customer / staff) | TBD – **không ghi mật khẩu thật vào repo public** |
| Link video demo | Sprint Review 3 video: recorded and submitted (Chính, 15/11/2026) – https://youtu.be/EyRPk3jFoMA (Đạt, 18/11/2026). Final demo video ≤ 3 min [03 §8]: https://youtu.be/pgZeKI_Ijvg (Đạt, 18/11/2026) |

## 4. Dữ liệu thực tế theo Sprint (lấy từ Jira – Completed Work)
| Sprint | SP cam kết | SP đạt DoD | Giờ kế hoạch | Giờ thực tế | Nguồn (ảnh/CSV Jira) | Ngày |
|---|---|---|---|---|---|---|
| S1 | 18 | 0 at Planning 2; **14** after PO acceptance 05/11 (US-01…04); **16** after NFR-01 accepted 06/11 (TC-19 Pass); NFR-03 pending TC-24 | 48 | 41 (Đạt 13.5 · Chính 27.5) – 19.5 h logged 02/11 + 21.5 h on S1-T12 logged 05/11 (hosted run part 2) | Jira worklogs | 05/11/2026 – Chính |
| S2 | 29 (24 + US-24) | **5** (US-10, NFR-02 accepted by the PO 05/11 23:59); 24 SP In Review | 39.75 | 24 (Chính 10.5 · Đạt 13.5, logged in Jira 06/11) | Jira sprint 6 | 06/11/2026 – Chính |
| S3 | 15 (baseline v1.1) → **21** after CR-07 (CCB Approve 13/11) | **21** S3 items + 24 SP S2 carry-over accepted by the PO 12/11 (`po-acceptance.md`); NFR-03 (2 SP) checked 17/11 22:33 (TC-F1-24 Pass) and accepted by the PO → **68/68 SP** | 39.5 | **33.23** in Jira (Đạt 13.40 · Chính 19.83 by worklog author) = 24.73 h of Sprint work + **8.5 h closure work 13–17/11** (Đạt 1.5 h release of v1.0; Chính 7 h S3-C1…C4: Review 3 video, UAT session, final documents). History: 20.23 h by 12/11 18:46; +4.5 h Đạt logged 16/11 (T17, T19, T21, D7); +8.5 h Chính logged 17/11 (hours given by Chính). Project total **98.23 h**. 18/11 02:12: ECBS-163, 165, 167, 176 moved to Done and **Sprint 3 closed** in Jira (D2, D3 not held, stay To Do) | Jira worklogs (read 17/11 23:40 and 18/11) | 18/11/2026 – Chính, Đạt |

## 5. Change Request và CCB
| CR | Ngày nhận | Phương án nhóm đề xuất | Quyết định Sponsor (Approve/Reject/Defer) | Lý do | Ngày |
|---|---|---|---|---|---|
| CR-06 | 27/10/2026 | Phương án B (PO Chính chốt đề xuất 30/10/2026) | **Approve – phương án B** | Sponsor đồng ý lập luận của nhóm: giao đủ CR trong R1.0, giữ capacity S2 cho F2/F3 | 30/10/2026 (Chính cung cấp 04/11/2026) |
| CR-07 | 12/11/2026 | Phương án B: baseline v1.2, PSP 62 → 68 (PO đề xuất) | **Approve** | TBD | 13/11/2026 (Chính cung cấp 15/11/2026) |

## 6. Câu trả lời / góp ý của GV
| Ngày | Câu hỏi hoặc chủ đề | Trả lời của GV |
|---|---|---|
| 05/11/2026 | Tên file c4: `CR01` hay `CR06`? | Nhóm tự quyết (PO): giữ `CR01` theo đề CR |
| 05/11/2026 | Staff được xóa category/author không? | Nhóm tự quyết (PO): không – chỉ Admin được xóa |
| 05/11/2026 | Đổi vai trò có thu hồi phiên đang mở không? | Nhóm tự quyết (PO): không – quyền mới áp dụng từ lần đăng nhập sau (đúng CR AC4) |
| | Nộp S1 theo đề (29/10) hay theo mục eLearning (02/11)? [06 §3] | TBD |
| 10/11/2026 | Template `FinalProject/HK261/Templates` ở đâu? | Chính đã tải về 10/11/2026: `SprintBacklog_Template.xlsx`, `FP_Template_SprintReport.docx` (mới), `FP_Template_Eval.xlsx`, `FP_Template_SprintReview_Retro.docx` → `docs/templates/` (xem `docs/templates/README.md`). Chưa có: ChangeRequest, UAT, FinalReport |
| | Tiêu chí C2 Demo có tính điểm không? | TBD |

## 7. Kết quả các sự kiện (do thành viên cung cấp)
| Sự kiện | Kết quả | Người cung cấp | Ngày cung cấp |
|---|---|---|---|
| Hạn nộp Final dời sang **18/11/2026 23:59**; thuyết trình cuối kỳ dời sang **Thứ Sáu 20/11/2026** (giờ: TBD) | Thông báo mới | Nguyễn Minh Chính | 17/11/2026 |
| NFR-03/AC-03 (TC-F1-24) | Pass – site online 17/11 22:33 (`pm/sprints/S3/evidence/NFR-03-check-2026-11-17.md`); PO nghiệm thu NFR-03 → 68/68 SP | Nguyễn Minh Chính | 17/11/2026 |
| Nộp đợt S3 (c2, c3, c5, c0 – hạn 12/11 23:59) | Đã nộp đúng hạn trên eLearning (file nộp chưa có trong repo) | Nguyễn Minh Chính | 15/11/2026 |
| Video Sprint Review 3 | Đã quay và nộp | Nguyễn Minh Chính | 15/11/2026 |
| UAT với Sponsor (13/11) | **Accepted** – 73/73 AC Pass, không có defect, không có CR mới | Nguyễn Minh Chính | 15/11/2026 |
| CCB CR-07 (13/11) | **Approve** – baseline v1.2, PSP 68 | Nguyễn Minh Chính | 15/11/2026 |

