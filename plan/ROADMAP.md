# ROADMAP – Final Project Team 6 (23/10 – 17/11/2026, giờ GMT+7)

Kế hoạch chia thành **phase** `P00`–`P36`. Mỗi phase có cửa sổ thời gian (Bắt đầu → Hạn), phụ thuộc, gate, sản phẩm và tiêu chí xong. Lịch Sprint, hạn nộp và nội dung bắt buộc lấy từ [03 §5–§7] và [CR-06 §5]. Cửa sổ làm việc **bên trong** từng Sprint là đề xuất của nhóm, có thể chỉnh trong Sprint Planning (ghi lý do vào Release Plan [03 §2.2]).

## Quy tắc chọn phase (skill `next` áp dụng)

1. Phase `in_progress` của chính người hỏi → làm tiếp.
2. Phase **quá hạn** (Hạn < hôm nay, chưa `done`) → báo động, ưu tiên trước.
3. Phase `todo` có **Hạn sớm nhất** mà mọi phụ thuộc đã `done` và gate đã thỏa. Ưu tiên phase hợp vai trò người hỏi; nếu hai phase cùng hạn, ưu tiên phase có trọng số rubric cao hơn.
4. **Làm trước tiến độ:** được bắt đầu phase trước ngày "Bắt đầu" nếu phụ thuộc đã `done` và **gate không phải là sự kiện chưa xảy ra**. Gate loại `EVENT` (CCB, Review, UAT, velocity thực tế của Sprint trước) **không thể vượt**. Nếu làm sớm một item thuộc Sprint sau, phải: PO đồng ý, item được thêm vào Sprint Backlog hiện tại trên Jira, và ghi vào Daily log (Scrum cho phép kéo thêm việc khi Sprint Goal đã đạt).
5. Phase "liên tục" (Daily log, giờ thực tế) không chặn phase khác nhưng phải nhắc mỗi lần chạy `next`.
6. Một người không giữ quá 2 phase `in_progress` cùng lúc.

Ký hiệu Owner: **L** = Sprint Leader của Sprint đó · **PO** · **Dev** = cả hai · tên cụ thể nếu theo thế mạnh. Cột "Con người" liệt kê việc Claude **không được tự làm**.

## Tổng quan

| ID | Phase | Bắt đầu | Hạn | Owner | Phụ thuộc | Gate | Rubric |
|---|---|---|---|---|---|---|---|
| **Sprint 1 – Plan baseline & F1 (23–29/10, Leader S1)** |||||||
| P00 | Thiết lập repo, branch, quyền truy cập | 27/10 | 27/10 | Đạt | – | – | S5 |
| P01 | Kick-off, vai trò, working agreement, capacity | 27/10 | 28/10 | Dev | P00 | – | S1, B2 |
| P02 | Product Backlog v1.0 (≥15 item, GWT, DoR) | 27/10 | 28/10 | PO | P01 | – | B4 (1,5) |
| P03 | Planning Poker + Release Plan + BAC | 28/10 | 28/10 | PO + L | P02 | HUMAN: buổi Planning Poker | B3, B4 |
| P04 | Chọn stack, scaffold app, deploy khung | 27/10 | 28/10 | Đạt | P01 | HUMAN: chốt stack | B9, S5 |
| P05 | Sprint Planning 1 (`S1_Backlog`) → Jira | 28/10 | 28/10 | L | P03 | – | S1 (1,5) |
| P06 | Xây F1 | 28/10 | 29/10 | Dev | P04, P05 | – | S2 (2,5) |
| P07 | Test case F1 + chạy test | 29/10 | 29/10 | Dev | P02, P06 | – | S2 |
| P08 | PMP v1.0 (7 phần) | 27/10 | 29/10 | L + PO | P01, P03 | – | S4 (2) |
| P09 | CR-06: Change Log + impact analysis + ≥2 phương án | 28/10 | 29/10 | PO | P03 | – | S4 S2, B10 |
| P10 | Theo dõi S1: Daily log, burndown, giờ thực tế | 23/10 | 29/10 | L | – | liên tục | S3 (2) |
| P11 | Đóng gói và nộp S1 (c1, c2, c3, c0) | 29/10 | **29/10 23:59** | L | P02 P03 P05 P07 P08 P09 P10 | – | Trễ −10%/5h |
| P12 | Review/Retro 1 + họp CCB CR-06 | 30/10 | 30/10 | L + PO | P11 | EVENT: 30/10 | S6 (1) |
| **Sprint 2 – Execution, monitoring & change (30/10–05/11, Leader S2 = PO)** |||||||
| P13 | Sprint Planning 2 (velocity thực tế S1) | 30/10 | 30/10 | L | P11, P12 | EVENT: velocity S1 | S1 |
| P14 | Cập nhật baseline theo quyết định CCB, tag | 30/10 | 31/10 | PO | P12 | EVENT: quyết định CCB | B10 |
| P15 | Xây F2 (sách, category, author, seed ≥30) | 31/10 | 03/11 | Dev | P13 | – | S2, B9 |
| P16 | Xây F3 (grid 12/trang, mới nhất trước) | 02/11 | 04/11 | Dev | P15 | – | S2, B9 |
| P17 | Xây CR-06 (nếu Approve) | 01/11 | 04/11 | Dev | P14, P15 | EVENT: Approve | S2, B10 |
| P18 | Test case F2, F3, CR-06 + regression F1 | 03/11 | 05/11 | Dev | P15 P16 (P17) | – | S2 |
| P19 | Theo dõi S2 + Weekly Status + Risk/Issue Log | 30/10 | 05/11 | L | P13 | liên tục | S3, S4 |
| P20 | Phiếu `c4_ChangeRequest` | 31/10 | 05/11 | PO | P14 | – | S4, B10 |
| P21 | Đóng gói và nộp S2 | 05/11 | **05/11 23:59** | L | P18 P19 P20 | – | – |
| P22 | Review/Retro 2 | 06/11 | 06/11 | L | P21 | EVENT: 06/11 | S6 |
| **Sprint 3 – Complete & acceptance (06–12/11, Leader S3)** |||||||
| P23 | Sprint Planning 3 (velocity thực tế S2) | 06/11 | 06/11 | L | P21, P22 | EVENT: velocity S2 | S1 |
| P24 | Xây F4 (chi tiết sách) | 07/11 | 09/11 | Dev | P16, P23 | – | S2, B9 |
| P25 | Xây F5 (tìm kiếm, lọc + phân trang) | 08/11 | 10/11 | Dev | P16, P23 | – | S2, B9 |
| P26 | Test case F4, F5 + regression F1–F3 + hiệu năng + sửa defect | 10/11 | 11/11 | Dev | P24, P25 | – | S2 |
| P27 | Release v1.0: merge vào `main`, tag `v1.0`, release notes | 11/11 | 12/11 | L | P26 | – | S4, S5 |
| P28 | UAT script (mọi AC) | 10/11 | 12/11 | PO | P26 | – | S4, B11 |
| P29 | Theo dõi S3 + EVM nháp | 06/11 | 12/11 | L | P23 | liên tục | S3 |
| P30 | Đóng gói và nộp S3 | 12/11 | **12/11 23:59** | L | P27 P28 P29 | – | – |
| P31 | Review 3 + UAT với khách hàng + biên bản | 13/11 | 13/11 | L + PO | P30 | EVENT: 13/11 | S4, B11 |
| **Consolidation & closure (13–17/11)** |||||||
| P32 | Hosting cuối, tài khoản demo, thu dữ liệu đóng dự án | 13/11 | 14/11 | Đạt | P31 | – | B9 |
| P33 | Final Report, EVM, Lessons Learned, PMP/Workbook Final | 13/11 | 15/11 | Dev | P31, P32 | – | B12 (1,5), B13 |
| P34 | Slide + video demo ≤3 phút | 14/11 | 15/11 | Dev | P33 | – | C1 |
| P35 | Nộp cuối + Eval360 từng người | 15/11 | **15/11 23:59** | Dev | P33, P34 | – | B |
| P36 | Tập thuyết trình; giữ site online đến hết 17/11 | 16/11 | **17/11 07:00** | Dev | P35 | – | C |

---

## Chi tiết từng phase

### P00 – Thiết lập repo, branch, quyền truy cập
- **Sản phẩm:** cấu trúc repo này; nhánh `main` và `develop`; branch protection cho `main` (bắt buộc PR + 1 review).
- **Claude làm:** cấu trúc thư mục, CLAUDE.md, roadmap, skill, PR template.
- **Con người:** mời GV `buiminhphung@gmail.com` và thành viên còn lại vào repo [03 §4.2]; cân nhắc để repo **private** (đề phạt 0 điểm nếu tài liệu trùng giữa các nhóm [03 §4.2]); mời GV vào Jira quyền Reader; bật time tracking (Original Estimate, Time spent) trên Jira [05 #18]; điền URL repo, board vào `plan/INPUTS.md`.
- **Xong khi:** cả hai thành viên clone được, `develop` tồn tại, GV đã được mời.

### P01 – Kick-off, vai trò, working agreement, capacity
- **Sản phẩm:** `pm/sprints/S1/kickoff.md`; mục "Nhóm" và "Capacity" trong `plan/INPUTS.md`.
- **Claude làm:** soạn agenda và biên bản kick-off; working agreement (giờ Daily, kênh, quy tắc PR, Definition of Ready nháp); bảng capacity = giờ khả dụng/người/ngày × số ngày làm việc của Sprint 1 tuần [05 #10].
- **Con người:** chốt PO, lịch luân phiên Leader [03 §4.1]; số **giờ khả dụng thật** của từng người mỗi Sprint.
- **Xong khi:** vai trò và capacity đã ghi vào `plan/INPUTS.md`, cả hai đồng ý.

### P02 – Product Backlog v1.0
- **Sản phẩm:** `pm/backlog/product-backlog.md` (+ `definition-of-ready.md`).
- **Claude làm:** rebaseline từ backlog v0 [04 §4] theo [05 §1, §4]: viết lại US-03 (Administrator/Customer, khóa tài khoản, chặn admin), thêm CRUD category và CRUD author, sửa F3 (12/trang, mới nhất trước), F4 (ID không tồn tại, Back đúng trang), F5 (category + khoảng giá + phân trang), NFR (hash, validate, ≥30 sách, <2 giây, hosting); item ngoài phạm vi → Won't (this release). AC GWT phủ main/exception/boundary, đánh số `US-xx/AC-0n`. Version history v0 → v1.0.
- **Con người:** PO duyệt thứ tự ưu tiên và AC.
- **Xong khi:** ≥15 item INVEST, item Release 1.0 có MoSCoW, AC GWT và đạt DoR [03 §6.1].

### P03 – Planning Poker + Release Plan + BAC
- **Sản phẩm:** `pm/backlog/planning-poker-log.md`, `pm/plan/release-plan.md`.
- **Claude làm:** chuẩn bị bảng log (item, vòng, phiếu từng người, lý do cao/thấp, kết quả) [05 #16]; sau khi có phiếu thì tính PSP, velocity kỳ vọng từ capacity, phân bổ item theo Sprint, BAC = tổng giờ kế hoạch × 200.000 VND [03 §6.1 mục 4]. Trình bày công thức.
- **Con người:** **tự chơi Planning Poker** và ghi phiếu thật (khóa trước bị phê bình vì thiếu bằng chứng [03 §8]).
- **Gate:** không có phiếu thật thì không được điền SP.
- **Xong khi:** Release Plan có số Sprint, Sprint Goal, velocity kỳ vọng, PSP, BAC; đây là **baseline**.

### P04 – Chọn stack, scaffold, deploy khung
- **Sản phẩm:** mã khởi tạo trong `app/`, `app/README.md` (cách chạy), URL hosting trong `plan/INPUTS.md`.
- **Claude làm:** đề xuất 2 phương án stack kèm rủi ro hosting miễn phí (cold start ảnh hưởng yêu cầu <2 giây [05 §5 #3]); scaffold, kết nối DB, health check, deploy bản rỗng.
- **Con người:** chốt stack; tạo tài khoản hosting và DB; lưu secret ở biến môi trường, **không commit secret**.
- **Xong khi:** URL public mở được, `develop` build được.

### P05 – Sprint Planning 1
- **Sản phẩm:** `pm/sprints/S1/sprint-backlog.md` (nội dung sheet `S1_Backlog`).
- **Claude làm:** Sprint Goal đo được; capacity; item F1 được chọn; tách task **≤1 person-day**, có owner và giờ ước lượng [03 §6.1 mục 5].
- **Con người:** họp ≤45 phút; nhập task vào Jira với Original Estimate.
- **Xong khi:** Jira có đủ task S1 khớp file.

### P06 – Xây F1
- **Yêu cầu:** đăng ký, đăng nhập, đăng xuất; Admin tạo và khóa tài khoản; ≥2 vai trò (Administrator, Customer); chặn truy cập chức năng admin ở **server**; mật khẩu hash; validate client và server [03 §2.2]. Thiết kế vai trò mở rộng được (CR-06 có thể thêm Staff) nhưng **không code Staff trước khi CCB duyệt**.
- **Quy trình:** mỗi task một nhánh `feat/P06-…`, PR vào `develop`, người kia review.
- **Xong khi:** mọi AC của F1 demo được trên URL hosting, đạt Story-DoD.

### P07 – Test case F1
- **Sản phẩm:** `pm/sprints/S1/test-cases-F1.md`: ≥1 test case cho mỗi AC, theo GWT → bước → kết quả mong đợi → **kết quả thực tế** [03 §6.1 mục 7].
- **Con người:** chạy test và ghi kết quả thực tế (Claude có thể chạy test tự động, nhưng kết quả phải từ lần chạy thật).

### P08 – PMP v1.0 (7 phần)
- **Sản phẩm:** `pm/pmp/01-charter.md` … `07-communication.md`, mỗi file có version history.
- **Nội dung tối thiểu** [03 §6.1 bảng PMP]: (1) Charter: SMART, scope R1.0, milestones, BAC, stakeholders, constraints, assumptions, success criteria; (2) Tailored Scrum; (3) Master/Release Plan; (4) Quality plan: **DoD 3 tầng** Story–Sprint–Release có bằng chứng và người kiểm tra, metrics [05 #12, #13]; (5) Risk plan: P×I 1–5, **register ≥8** (đầu vào ở [05 §5]); (6) CM plan: CI, đặt tên, version, branching (mục 5 của CLAUDE.md), commit convention, baseline/tag, **quy trình CR và CCB**; (7) Communication plan.
- **Con người:** Lab 1, Lab 2 chưa có bản nộp [05 #21–22] nên cần xác nhận mục tiêu SMART, stakeholder.

### P09 – CR-06: ghi nhận và chuẩn bị CCB
- **Sản phẩm:** `pm/change/change-log.md` (dòng CR-06, **trước 23:59 29/10**), `pm/change/CR-06-impact-analysis.md`.
- **Claude làm:** phân tích tác động S/T/C/Q/Risk, tính cả rework F1 đã Done [CR-06 §4]; bổ sung AC boundary/exception; soạn **≥2 phương án** (ví dụ: A làm toàn bộ trong S2; B phân quyền S2, audit S3; C Defer) kèm số SP, giờ, chi phí.
- **Con người:** Planning Poker cho item CR; chọn phương án đề xuất.

### P10 / P19 / P29 – Theo dõi Sprint (liên tục)
- **Sản phẩm:** `pm/sprints/Sx/daily-log.md`, dữ liệu burndown, `actual-hours.md`.
- **Mỗi ngày:** Daily ≤10 phút có log [03 §4.2]; board cập nhật; log giờ vào Completed Work.
- **Claude làm:** soạn log từ ghi chú người dùng; vẽ burndown từ số liệu Jira người dùng cung cấp; giải thích đoạn đi ngang/đi lên.
- **Con người:** cung cấp số liệu Jira (giờ thực tế, SP còn lại theo ngày). **Không bịa.**
- P19 thêm: Weekly Status Report (Green/Amber/Red cho scope, schedule, cost, quality) [03 §6.2 mục 4]; cập nhật risk register; rủi ro đã xảy ra → Issue Log.
- P29 thêm: EVM nháp (PV, EV, AC, SV, CV, SPI, CPI, EAC, ETC) [03 §6.4].

### P11 / P21 / P30 – Đóng gói và nộp Sprint
- **Claude làm:** xuất file vào `deliverables/Sx/` đúng tên [03 §7]; Workbook c2 **lũy kế**; chạy checklist [06 §4]; kiểm tra số liệu khớp giữa c2 và c3.
- **Con người:** Leader upload eLearning trước 23:59 Thứ Năm (trễ −10%/5 giờ); Leader chấm `c0_Eval_Sx.xlsx`.
- S1: `c1_ProjectPlan.docx`, `c2_SprintBacklog_S1.xlsx`, `c3_SprintReport_S1.docx`, `c0_Eval_S1.xlsx`.
- S2: `c2_SprintBacklog_S2.xlsx`, `c3_SprintReport_S2.docx`, `c4_ChangeRequest_CR01.docx` (xem câu hỏi tên file ở `docs/knowledge/07`), `c0_Eval_S2.xlsx`.
- S3: `c2_SprintBacklog_S3.xlsx`, `c3_SprintReport_S3.docx`, `c5_UAT.docx`, `c0_Eval_S3.xlsx`.
- Gắn tag baseline sau khi nộp S1 (ví dụ `baseline-v1.0`, theo CM plan).

### P12 / P22 / P31 – Review và Retro
- **Claude làm:** chuẩn bị nội dung trình bày [03 §8]: Sprint Goal và kết quả, demo theo AC, burndown, giờ kế hoạch vs thực tế, rủi ro, action item, kế hoạch Sprint sau; biên bản Retro **≥2 action item** được theo dõi ở Sprint sau.
- **Con người:** trình bày trên lớp; P12 họp CCB và ghi **quyết định của Sponsor** vào `plan/INPUTS.md`; P31 chạy UAT với khách hàng, lấy xác nhận.

### P13 / P23 – Sprint Planning 2, 3
- Dùng **velocity thực tế** Sprint trước, không dùng lại số kỳ vọng [03 §6.2 mục 1]. Task ≤1 person-day, có owner, giờ. Nhập Jira.

### P14 – Cập nhật baseline theo CCB
- Nếu Approve: cập nhật Product Backlog, AC, Release Plan (**giữ bản baseline và thêm bản rebaseline**, PSP, BAC), risk register; tag cấu hình (ví dụ `baseline-v1.1`); thông báo stakeholder theo Communication Plan [03 §6.2 mục 3].
- Nếu Reject/Defer: ghi lý do vào Change Log, giữ baseline.

### P15 – Xây F2
- Thêm, sửa, xóa (ẩn, không hard delete) sách: title, author, category, **price > 0**, description, cover image, stock; **quản lý category và author**; validate client + server [03 §2.2]. Seed **≥30 sách** mẫu.

### P16 – Xây F3
- Grid/card: cover, title, author, price; **12 sách/trang, mới nhất trước**; responsive; trang danh sách **<2 giây** [03 §2.2]. Đề xuất: giữ page/filter trên URL query để F4 và F5 dùng lại.

### P17 – Xây CR-06 (nếu Approve)
- Vai trò Staff: thêm, sửa sách, quản lý category, author; **không xóa sách, không vào quản lý tài khoản**; Admin gán vai trò; lưu và hiển thị "Last updated by <tên> at <thời gian>" [CR-06 §1, §3]. Kiểm tra quyền ở server. Regression F1.

### P18 / P26 – Kiểm thử
- Test case từ AC (≥1/AC), có kết quả thực tế. P26 thêm regression F1–F3, đo thời gian tải trang danh sách, sửa defect, ghi defect theo mức độ nghiêm trọng (metrics Quality plan).

### P20 – Phiếu Change Request
- `c4_ChangeRequest_CR01.docx`: form CR, impact analysis có số, phương án, quyết định CCB kèm lý do, cập nhật baseline [03 §7], [CR-06 §5].

### P24 – Xây F4
- Chọn sách ở F3 mở trang chi tiết; **ID không tồn tại → thông báo thân thiện**; **nút quay lại trả về đúng trang danh sách cũ** [03 §2.2].

### P25 – Xây F5
- Tìm theo title **hoặc** author; **lọc theo category và khoảng giá**; hoạt động kết hợp với phân trang F3 [03 §2.2].

### P27 – Release v1.0
- PR `develop → main`, tag `v1.0`, release notes (tính năng, known issues, cách chạy) [03 §6.3 mục 3].

### P28 – UAT script
- `pm/uat/uat-script.md`: ánh xạ **mọi AC** (kể cả CR-06 nếu được duyệt), cột kết quả và chữ ký khách hàng [03 §6.3 mục 4].

### P32 – Hosting và dữ liệu đóng dự án
- Site online đến hết 17/11; tài khoản demo admin và customer; thu SP hoàn thành mỗi Sprint, giờ thực tế, defect, CR, trạng thái rủi ro [03 §6.3 mục 5].

### P33 – Final Report và hồ sơ cuối
- `pm/final/final-report.md` theo [03 §6.4]: tóm tắt; kết quả từng Sprint; **plan vs actual** (scope, schedule + 3 burndown, cost EVM, quality); rủi ro và thay đổi; closure checklist; **Lessons Learned ≥5** (Situation–Impact–Cause–Lesson–Recommendation); phụ lục (danh sách file, URL, tài khoản demo, link repo/board/video, **khai báo AI** từ `pm/ai-usage-log.md`). Cập nhật PMP Final, Workbook Final có sheet EVM.

### P34 – Slide và video
- Slide font ≥20pt, mỗi slide một ý, số liệu dạng bảng/biểu đồ; video ≤3 phút có kịch bản AC pass và fail [03 §8]. Chuẩn bị bằng chứng Planning Poker, rủi ro đã xảy ra.

### P35 – Nộp cuối
- Checklist Phụ lục C [03]: tên file, link mở được bằng tài khoản GV, số liệu nhất quán, backlog phản ánh CR, Release Plan có baseline và bản cập nhật, risk register trạng thái cuối, tag v1.0, biên bản UAT, Lessons Learned ≥5, khai báo AI, **mỗi người nộp Eval360**.

### P36 – Thuyết trình 07:00 Thứ Ba 17/11
- 10 phút + 5 phút hỏi đáp; **mọi thành viên trình bày** [03 §8]. Claude giúp soạn câu hỏi luyện tập cho từng người.
