# Bàn giao cho Đạt – bộ nộp Final (Thứ Ba 17/11/2026, 23:00 · cập nhật 23:50)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt.*

> **Đọc mục 12 trước** (18/11 03:00): tình trạng mới nhất và việc còn lại của từng người.

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
| 17/11 | Final Report v0.4, c2, slide, kịch bản thuyết trình: SPI 1.00; ngày mới | Chính | PR #68 |
| 17/11 23:40 | Log giờ của Chính: S3-T22 1 h (Done), D7 0.5 h; tạo 4 task đóng dự án **S3-C1…C4** trong Sprint 3 (video Review 3 1 h, UAT 2 h, Final 15/11 2 h, Final 16–17/11 2 h, đều Done) → **98.23 h**, CPI 1.34; Final Report v0.5 | Chính | Jira ECBS-168, 176, 177–180; PR #68 |

## 2. Số liệu chốt (dùng giống nhau ở mọi file, slide và lời nói)
| Chỉ số | Giá trị |
|---|---|
| Phạm vi | 20/20 item; **68/68 SP** Done (baseline v1.2); 73/73 AC Pass ở UAT |
| Velocity | S1 **0** · S2 **5** · S3 **45** SP (21 mới + 24 mang sang); trung bình 22.7 |
| Giờ kế hoạch / thực tế | S1 48 / 41 · S2 39.75 / 24 · S3 39.5 / **33.23** (24.73 trong Sprint + **8.5 h closure 13–17/11**) → **127.25 / 98.23 h** (Jira, đọc 18/11) |
| Giờ theo người | Đạt **40.40 h** (S3 13.40, gồm 1.5 h release v1.0) · Chính **57.83 h** (S3 19.83, gồm 7 h S3-C1…C4) |
| EVM đóng dự án (mốc **Closure 18/11**) | PV = EV = BAC **26.400.000** · AC **19.646.000** · **SPI 1.00 · CPI 1.34** · EAC 19.646.000 · ETC 0 |
| Lỗi | 6 lỗi tìm thấy, đã sửa hết, 0 lỗi mở; 114/114 test tự động |
| Baseline | v1.0 (30/10, PSP 55, BAC 24 tr) → v1.1 (04/11, CR-06, PSP 62, BAC 26.4 tr) → v1.2 (15/11, CR-07, PSP 68) |

Giải thích CPI 1.34 (đúng như trong report): giờ S1/S2 một phần dựng lại sau Sprint, một phần việc có AI hỗ trợ, một số giờ log muộn. **Không** nói là nhóm làm nhanh hơn 34 %.

## 3. File đã cập nhật (nhánh `docs/P33-final-hours`, PR #68)
| File | Phiên bản / thay đổi |
|---|---|
| `deliverables/Final/HK261_SPM_FP_Team6_c1_ProjectPlan_Final.docx` | PMP 7 phần + mục *Changes since v1.0* (`pm/pmp/00-pmp-final.md`) |
| `deliverables/Final/HK261_SPM_FP_Team6_c2_SprintBacklog_Final.xlsx` | Template GV + sheet EVM (công thức, 5 mốc), UAT_Summary, WeeklyStatus_S3, LessonsLearned, AI_Usage; NFR-03 Done |
| `deliverables/Final/HK261_SPM_FP_Team6_c6_FinalReport.docx` | Final Report v0.5 (`pm/final/final-report.md`) |
| ~~`deliverables/Final/HK261_SPM_FP_Team6_c6_Slides.pptx`~~ | Không dùng (xem mục 9): bộ 15 slide của Chính đã chuyển vào `pm/final/archive/`. File nộp sẽ xuất từ deck Canva |
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
| 2 | **Jira:** chuyển S3-T17, T19, T21, D7 sang Done; ghi D2, D3 là *Not held* (hoặc để nguyên); rồi **Complete sprint** cho Sprint 3. **Không log thêm giờ** cho các việc đã có giờ, nếu không phải báo Chính xuất lại | Còn 6 việc chưa Done (T22 và S3-C1…C4 đã Done) |
| 3 | **Chấm Eval360** của Đạt: cột E (đúng hạn 0–1), F (chất lượng 0–10), G (họp 0–1) cho **cả hai người**; nộp file của mình | Cột D (khối lượng) đã tính theo giờ kế hoạch: Đạt 58 %, Chính 42 % |
| 4 | **Video demo ≤ 3 phút** có cả AC pass và AC fail [03 §8] → gửi link cho Chính | Cùng kịch bản với slide 10: tìm "darwin", lọc Novel 50k–150k, chi tiết + Back, khoảng giá ngược (fail), "Last updated by" |
| 5 | Gửi Chính **tài khoản demo** (Admin, Staff, Customer) qua tin nhắn riêng | Chính chỉ gõ vào file docx nộp, **không** đưa lên repo |
| 6 | Đọc lại **c1 PMP Final**; nếu nhớ góp ý của GV ở Review 1 / Review 3 thì bổ sung vào `pm/pmp/00-pmp-final.md` | Hiện chỉ có góp ý ở Review 2 |
| 7 | (Tùy chọn) Xoá danh mục thử *Kids* trên site trước buổi thuyết trình | Dữ liệu thật – Đạt quyết |

## 5. Việc Chính sẽ làm
- ~~Log giờ S3-T22~~ – xong 17/11 23:40 (cùng D7 và 4 task S3-C1…C4).
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

## 8. Trả lời ghi chú 17/11 của Đạt (PR #69) – 23:50
- Chính đã **merge nhánh của PR #69 vào PR #68**, giải xung đột ở `final-report.md`, `STATUS.md`, `ai-usage-log.md`. Phần tag `v1.0` của Đạt được ghi thành dòng 0.5a trong version history. Merge #68 trước, sau đó #69 không còn thay đổi nào và có thể đóng.
- **Số liệu trên deck Canva đã cũ** (66/68, SPI 0.97, CPI 1.50, 85.23 h). Số chốt là **68/68, SPI 1.00, CPI 1.34, AC 19.6 tr, 98.23 h**. Chính đã sửa speaker notes slide 7, 12 và bảng câu hỏi trong `pm/final/presentation-canva-14-slides.md` (v3.1). **Slide 7 và 12 trên Canva cũng phải sửa** theo số này, và slide 1 đổi ngày thành 20/11.
- **Đang có 2 bộ slide:** `c6_Slides.pptx` 15 slide (Chính) và deck Canva 14 slide (Đạt). Hai đứa cần **chọn 1 bộ để nộp và trình bày**; bộ được chọn xuất ra `deliverables/Final/HK261_SPM_FP_Team6_c6_Slides.pptx`.

## 9. Chốt 17/11 23:55 – dùng deck Canva 14 slide của Đạt
- **Chính đồng ý dùng deck Canva** (https://canva.link/b3s5irrs6rifzb3). Bộ `c6_Slides.pptx` 15 slide của Chính đã chuyển vào `pm/final/archive/` và **không nộp**.
- **Tài khoản Canva của Chính chưa mở được deck** (chưa có quyền). Đạt **share deck cho Chính với quyền chỉnh sửa** (email Chính dùng cho Canva) để Chính sửa và xuất file.
- **Cần sửa trên Canva trước 18/11 23:59** (Đạt làm, hoặc Chính sau khi có quyền):

  | Slide | Sửa |
  |---|---|
  | 1 | Ngày trình bày: **20/11/2026** |
  | 7 | 68/68 SP Done, trung bình 22.7; giờ: kế hoạch 127.25 h, thực tế 91.23 h trong Sprint + 7 h đóng dự án = **98.23 h** (ngân sách 132 h) |
  | 11 | Không đổi (73/73, 114 test, 6 lỗi, 0 mở) |
  | 12 | Mốc đóng dự án: PV 26.4 tr, **EV 26.4 tr**, **AC 19.6 tr**, **SPI 1.00**, **CPI 1.34**; giữ mốc cuối S3 (0.97 / 1.50) |
  | 10 | Chèn video demo ≤ 3 phút |
  | Tất cả | Dán speaker notes từ `pm/final/presentation-canva-14-slides.md` v3.1 |
- **Sau khi sửa:** xuất từ Canva ra PowerPoint, đặt tên `HK261_SPM_FP_Team6_c6_Slides.pptx` và cho vào `deliverables/Final/` (đây là file nộp).
- **Kịch bản đọc theo lượt** cho deck Canva (14 lượt, tiếng Anh, ~9:40): Chính gửi file `HK261_SPM_FP_Team6_KichBan_ThuyetTrinh_Canva14.docx`.

## 10. Cập nhật 18/11/2026 01:40
- Chính đã **gộp 2 commit mới của Đạt** trong PR #69 vào PR #68: bản viết lại bằng ngôn ngữ dễ hiểu và link video Review 3. Final Report v0.6 giữ nguyên văn của Đạt, chỉ áp lại số đóng dự án (**68/68 SP, 98.23 h, SPI 1.00, CPI 1.34**). Risk register thành v2.0 (bản của Đạt cộng R03 đóng ngày 17/11). Script `plain_language.py` vẫn chạy khi xuất c2.
- **Merge PR #68 là đủ**, vì #69 đã nằm trong đó. Sau đó đóng #69.
- **Canva:** connector của Chính vẫn báo *permission denied* với design `DAHbGMJQNmE`. Đạt kiểm tra lại: share cho **đúng email tài khoản Canva của Chính**, quyền **Can edit**. Nếu không kịp, Đạt tự sửa slide 1, 7, 12 theo mục 9 rồi xuất PowerPoint.

## 11. Cập nhật 18/11/2026 02:35 – deck Canva đã sửa
- Chính đã có quyền và **đã sửa trên Canva** (đã lưu):
  - Slide 1: ngày **20/11/2026**.
  - Slide 7: S3 thực tế **26.23 h**, Release **68 Done (avg 22.7)** và **98.23 h \***; chú thích "91.23 h trong Sprint + 7 h đóng dự án"; NFR-03 "were confirmed on 17/11".
  - Slide 12: mốc **Closure (17/11)**: PV 26.4, **EV 26.4, AC 19.6, SPI 1.00, CPI 1.34**; tiêu đề "late, but complete"; hai ô giải thích SPI/CPI theo số mới.
- **Còn lại trên Canva:**
  - Speaker notes cho slide 2–9 và 11–14 vẫn trống. Công cụ không ghi được notes, nên **Đạt hoặc Chính dán tay** từ `pm/final/presentation-canva-14-slides.md` v3.1.
  - Video slide 10: Đạt chèn.
- **File nộp:** đã xuất deck ra PowerPoint. Chính tải về và đặt tên `HK261_SPM_FP_Team6_c6_Slides.pptx` trong `1_Submissions\Final\` và `deliverables/Final/`. Nếu Đạt chèn video hoặc dán notes sau thời điểm này thì **xuất lại** từ Canva.

## 12. Tình trạng 18/11/2026 03:00 – bản gộp cuối (đọc mục này trước)
**Đã gộp 3 commit mới của Đạt (23e360f, 781f44a, b2faa65) vào PR #68.** Merge #68 là đủ; #69 không còn gì riêng → đóng.

**Cách chia giờ thống nhất (theo deck Canva Đạt đã sửa):** S3 = **33.23 h** = 24.73 h trong Sprint + **8.5 h closure 13–17/11** (Đạt 1.5 h release v1.0; Chính 7 h S3-C1…C4). Đạt 40.40 h · Chính 57.83 h · tổng **98.23 h**. Mốc EVM **Closure (18/11)**: PV = EV = 26.4 tr · AC 19.6 tr · SPI 1.00 · CPI 1.34 · EAC 19.646.000. Mục 2 đã sửa theo cách chia này. Không dùng cách chia cũ "26.23 + 7 h" nữa.

**Đã giữ từ cả hai bên:**
- Của Đạt: Sprint 3 đã đóng trên Jira 18/11 02:12 (checklist #7 Done), quyền GV ở GitHub/Jira (#9), link video demo, NFR-03 → ECBS-109 Done.
- Của Chính: lịch đổi (nộp **18/11 23:59**, thuyết trình **Thứ Sáu 20/11**), biên bản kiểm tra NFR-03 lúc 22:33 (`pm/sprints/S3/evidence/NFR-03-check-2026-11-17.md`), mốc EVM "Before the NFR-03 check, 16/11", website giữ online tới hết buổi thuyết trình 20/11 (#8).
- Version history: Final Report thêm **v1.0** (bản gộp); risk register 1.10 (Chính, R03 đóng) + 1.11 (Đạt, R04); PO acceptance 1.6 + 1.7; kịch bản Canva v3.2 (lời slide 7 theo 33.23 h).
- c1, c2, c6 Report, Eval360 × 2 đã xuất lại từ nguồn đã gộp.

**File slide nộp (`c6_Slides.pptx`) chưa có trong repo:** bản Chính tải lúc trước còn số cũ (26.23 h, Closure 17/11) nên đã bỏ. Canva hiện đã đúng số. Bản cuối phải xuất **sau khi** chèn video và dán notes.

### Việc còn lại – trước 18/11 23:59
| # | Việc | Ai |
|---|---|---|
| 1 | Review + **merge PR #68** vào `develop`; đóng PR #69 | Đạt |
| 2 | Canva: chèn **video demo** vào slide 10; dán **speaker notes** slide 2–14 từ `pm/final/presentation-canva-14-slides.md` v3.2 (công cụ không ghi được notes) | Đạt (Chính hỗ trợ dán notes) |
| 3 | Xuất Canva → PowerPoint, đặt tên `HK261_SPM_FP_Team6_c6_Slides.pptx`, đưa vào `deliverables/Final/` (PR riêng hoặc commit lên `develop` qua PR) và gửi Chính | Đạt |
| 4 | Chấm **Eval360** cột E–G cho cả hai người và nộp file của mình. **Chính đã chấm xong 18/11 03:00** (điểm tối đa cho cả hai: E 1, F 10, G 1) → còn phiếu của Đạt (`Eval360_Team6_2374802010097.xlsx`) | Đạt |
| 5 | Gửi Chính **tài khoản demo** (Admin, Staff, Customer) qua tin nhắn riêng – **không** đưa lên repo | Đạt |
| 6 | Điền TBD trong file docx nộp: tài khoản demo (Appendix B), giờ UAT, nhận xét GV, lý do CR-07 | Chính |
| 7 | Nộp lên eLearning: c1, c2, c6 Report, c6 Slides, Eval360 của mình | Chính (c1, c2, c6 ×2), mỗi người Eval360 |

### Thứ Sáu 20/11
- Kịch bản: `HK261_SPM_FP_Team6_KichBan_ThuyetTrinh_Canva14.docx` (14 lượt, ~9:40) – lời slide 7 theo số mới: "98.23 hours in total, including 8.5 hours of closure work counted in Sprint 3".
- Mở website trước 15 phút; cửa sổ ẩn danh `/books` + cửa sổ Admin đã đăng nhập; có video dự phòng.
- Câu hỏi dễ gặp: CPI 1.34 (giờ ghi trễ, có AI hỗ trợ – không phải nhanh hơn 34 %), velocity S1 = 0, vì sao closure tính vào S3.
