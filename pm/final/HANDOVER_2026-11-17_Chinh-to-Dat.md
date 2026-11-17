# Bàn giao cho Đạt – bộ nộp Final (Thứ Ba 17/11/2026, 23:00)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt.*

**Ghi chú này tóm tắt mọi thứ từ 13/11 đến nay.** Các ghi chú trước: `pm/sprints/S3/notes/2026-11-15_Chinh-to-Dat.md` (mục 1–7).

## 0. Lịch mới
| Mốc | Thời gian |
|---|---|
| **Nộp Final** (c1, c2, c6 Report, c6 Slides, Eval360 của từng người) | **Thứ Tư 18/11/2026, 23:59** |
| **Thuyết trình cuối kỳ** (10 phút + 5 phút hỏi đáp) | **Thứ Sáu 20/11/2026** (giờ: TBD) |

## 1. Những việc đã xong
| Ngày | Việc | Ai | Bằng chứng |
|---|---|---|---|
| 12/11 | Nộp đợt S3 (c2, c3, c5, c0) đúng hạn | Đạt, Chính | eLearning (Chính xác nhận 15/11) |
| 13/11 | Review 3 (video đã nộp); **UAT Accepted, 73/73 AC Pass**, không lỗi, không có CR mới | Đạt, Chính, GV | `pm/uat/uat-minutes.md` v1.0, `uat-script.md` v1.0 |
| 13/11 | CCB **Approve CR-07** → baseline v1.2, **PSP 68** | GV (CCB) | `pm/change/change-log.md` v1.4 |
| 15/11 | Ghi kết quả 13/11 vào hồ sơ; Final Report v0.1; c2 Final | Chính | PR #67 |
| 16/11 | c1 PMP Final, c6 Slides, 2 file Eval360, kịch bản thuyết trình | Chính | PR #67 |
| 16/11 | Merge #65, #67, #64; **tag `v1.0`** trên `main` và **`baseline-v1.2`** (22:59); đóng #66; log 4.5 h (T17, T19, T21, D7) | Đạt | GitHub, Jira |
| 16/11 | Final Report v0.3 theo 89.73 h (CPI 1.43) | Chính | PR #68 |
| 17/11 22:33 | **NFR-03 kiểm tra trên site: Pass** (`/books` 200, 30 sách) → PO nghiệm thu → **68/68 SP** | Chính | `pm/sprints/S3/evidence/NFR-03-check-2026-11-17.md` |
| 17/11 | Final Report v0.4, c2, slide, kịch bản thuyết trình: SPI 1.00, CPI 1.47; ngày mới | Chính | PR #68 |

## 2. Số liệu chốt (dùng giống nhau ở mọi file, slide và lời nói)
| Chỉ số | Giá trị |
|---|---|
| Phạm vi | 20/20 item; **68/68 SP** Done (baseline v1.2); 73/73 AC Pass ở UAT |
| Velocity | S1 **0** · S2 **5** · S3 **45** SP (21 mới + 24 mang sang); trung bình 22.7 |
| Giờ kế hoạch / thực tế | S1 48 / 41 · S2 39.75 / 24 · S3 39.5 / 24.73 → **127.25 / 89.73 h** (Jira) |
| Giờ theo người | Đạt **40.40 h** · Chính **49.33 h** (chưa gồm giờ T22 của Chính) |
| EVM đóng dự án | PV = EV = BAC **26.400.000** · AC **17.946.000** · **SPI 1.00 · CPI 1.47** · EAC 17.946.000 · ETC 0 |
| Lỗi | 6 lỗi tìm thấy, đã sửa hết, 0 lỗi mở; 114/114 test tự động |
| Baseline | v1.0 (30/10, PSP 55, BAC 24 tr) → v1.1 (04/11, CR-06, PSP 62, BAC 26.4 tr) → v1.2 (15/11, CR-07, PSP 68) |

Giải thích CPI 1.47 (đúng như trong report): giờ S1/S2 một phần dựng lại sau Sprint, một phần việc có AI hỗ trợ, một số giờ log muộn. **Không** nói là nhóm làm nhanh hơn 47 %.

## 3. File đã cập nhật (nhánh `docs/P33-final-hours`, PR #68)
| File | Phiên bản / thay đổi |
|---|---|
| `deliverables/Final/HK261_SPM_FP_Team6_c1_ProjectPlan_Final.docx` | PMP 7 phần + mục *Changes since v1.0* (`pm/pmp/00-pmp-final.md`) |
| `deliverables/Final/HK261_SPM_FP_Team6_c2_SprintBacklog_Final.xlsx` | Template GV + sheet EVM (công thức, 5 mốc), UAT_Summary, WeeklyStatus_S3, LessonsLearned, AI_Usage; NFR-03 Done |
| `deliverables/Final/HK261_SPM_FP_Team6_c6_FinalReport.docx` | Final Report v0.4 (`pm/final/final-report.md`) |
| `deliverables/Final/HK261_SPM_FP_Team6_c6_Slides.pptx` | 15 slide, ngày 20/11; ghi chú mỗi slide nói ai trình bày |
| `deliverables/Final/Eval360_Team6_2374802010097.xlsx` | **File của Đạt** (template Eval của GV; cột E–G để trống) |
| `deliverables/Final/Eval360_Team6_2275106050051.xlsx` | File của Chính |
| `pm/sprints/S3/po-acceptance.md` v1.6 | 68/68 SP |
| `pm/sprints/S1/test-cases-F1.md` | TC-F1-24 Pass 17/11 |
| `pm/uat/uat-minutes.md`, `uat-script.md` v1.0 | Kết quả UAT 13/11 |
| `pm/change/change-log.md` v1.4 · `pm/backlog/product-backlog.md` v1.4 · `pm/pmp/03-master-release-plan.md` v1.4 | CR-07, PSP 68, baseline v1.2 |
| `pm/pmp/05-risk-plan.md` v1.9 | Trạng thái đóng của mọi rủi ro và issue (R03 đóng 17/11) |
| `pm/pmp/02-tailored-scrum.md`, `07-communication-plan.md` | Daily cố định trên Discord lúc 22:00 |
| `plan/INPUTS.md` §4, §5, §7 · `plan/STATUS.md` | Giờ S3, CR-07, kết quả 13/11, lịch mới; P27 done, P33–P36 |
| `tools/export_final.py`, `tools/slides_final.js` | Script xuất c1, c2, c6, Eval360 và slide |

## 4. Việc Đạt cần làm (theo thứ tự, trước 18/11 23:59)
| # | Việc | Ghi chú |
|---|---|---|
| 1 | **Review rồi merge PR #68** vào `develop` (nhớ bấm Approve) | Để file nộp khớp với repo |
| 2 | **Jira:** chuyển S3-T17, T19, T21, D7 sang Done; ghi D2, D3 là *Not held* (hoặc để nguyên); rồi **Complete sprint** cho Sprint 3 | Jira vẫn còn 7 việc chưa Done |
| 3 | **Chấm Eval360** của Đạt: cột E (đúng hạn 0–1), F (chất lượng 0–10), G (họp 0–1) cho **cả hai người**; nộp file của mình | Cột D (khối lượng) đã tính theo giờ kế hoạch: Đạt 58 %, Chính 42 % |
| 4 | **Video demo ≤ 3 phút** có cả AC pass và AC fail [03 §8] → gửi link cho Chính | Cùng kịch bản với slide 10: tìm "darwin", lọc Novel 50k–150k, chi tiết + Back, khoảng giá ngược (fail), "Last updated by" |
| 5 | Gửi Chính **tài khoản demo** (Admin, Staff, Customer) qua tin nhắn riêng | Chính chỉ gõ vào file docx nộp, **không** đưa lên repo |
| 6 | Đọc lại **c1 PMP Final**; nếu nhớ góp ý của GV ở Review 1 / Review 3 thì bổ sung vào `pm/pmp/00-pmp-final.md` | Hiện chỉ có góp ý ở Review 2 |
| 7 | (Tùy chọn) Xoá danh mục thử *Kids* trên site trước buổi thuyết trình | Dữ liệu thật – Đạt quyết |

## 5. Việc Chính sẽ làm
- Log giờ S3-T22 trên Jira, chuyển sang Done, rồi xuất lại c2/c6 (CPI có thể đổi nhẹ).
- Điền các ô TBD trong file docx nộp: tài khoản demo, link video, giờ UAT, nhận xét của GV, lý do CR-07.
- Nộp c1, c2, c6 Report, c6 Slides và Eval360 của Chính trước 18/11 23:59.

## 6. Thuyết trình Thứ Sáu 20/11
- **Kịch bản:** 24 lượt, đúng 10:00. Chính gửi file `HK261_SPM_FP_Team6_KichBan_ThuyetTrinh_Final.docx`; nội dung giống phần ghi chú trong từng slide.
- **Phần của Đạt:** slide 1–2, 5, 7, 9, **10 (demo)**, 13.
- **Phần của Chính:** slide 3–4, 6, 8, 11–12, 14; slide 15 cả hai cùng nói.
- **Trước giờ trình bày:** mở website trước 15 phút; mở sẵn 2 cửa sổ (ẩn danh ở `/books`, Admin đã đăng nhập); có video dự phòng.
- **Câu hỏi dễ gặp** (đã có câu trả lời trong kịch bản): CPI 1.47, velocity S1 = 0, Planning Poker muộn (CR-07), chỉ 1 commit trong tuần S1, nút Favorite, cách dùng AI.

## 7. Cách xuất lại file khi có thay đổi
```bash
git checkout develop && git pull
python3 tools/export_final.py            # c1, c2, c6 Report, Eval360 → deliverables/Final/
node tools/slides_final.js <thư mục skill pptx>   # c6 Slides
```
Sửa số liệu thì sửa Markdown nguồn (`pm/final/final-report.md`, `pm/pmp/*.md`…) rồi chạy lại script. **Không** sửa trực tiếp file docx/xlsx.
