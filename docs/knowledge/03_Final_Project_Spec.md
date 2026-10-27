# 03 – Đề Final Project: E-Commercial Book Store – Release 1.0

*Nguồn: `HK261_SPM_FinalProject_EN-VI.pdf`, phát hành ngày 23/10/2026, GV TS. Bùi Minh Phụng. Đây là **tài liệu chuẩn cao nhất** cho giai đoạn còn lại của môn học. Đánh số mục giữ theo bản gốc.*

Trọng số 40% · CLO1–CLO5 · Giao đề Thứ Sáu 23/10/2026 · Thuyết trình cuối kỳ 07:00 Thứ Ba 17/11/2026.

## §1. Mục tiêu (CLO)
- **CLO1:** giải thích vai trò của từng hoạt động PM (khởi tạo, lập kế hoạch, ước lượng, rủi ro, thay đổi, giám sát, đóng dự án) bằng dữ liệu của chính dự án.
- **CLO2:** vận hành Scrum đã tùy biến qua 3 Sprint, ra quyết định dựa trên dữ liệu (velocity, burndown, rủi ro).
- **CLO3:** kiểm soát scope, schedule, cost, quality: xử lý Change Request, nghiệm thu theo AC, so sánh baseline với thực tế bằng EVM.
- **CLO4:** kết hợp PM Tool, Git và Excel để lập kế hoạch, theo dõi và báo cáo.
- **CLO5:** trách nhiệm cá nhân: luân phiên Leader, giữ cam kết, đánh giá đồng đẳng trung thực.

## §2. Bối cảnh và phạm vi
Công ty sách của bà Le có nhiều cửa hàng vật lý, cần website nhà sách online có phong cách riêng, chạy tốt trên desktop, điện thoại và tablet. Nhóm là **Scrum Team được thuê xây Release 1.0 – Book Catalogue trong 3 Sprint**. **GV đóng vai Sponsor/Customer:** duyệt kế hoạch, đưa ra Change Request. Đồ án đánh giá **năng lực quản lý dự án**. Phần mềm là bằng chứng kế hoạch đã được thực thi và kiểm soát. Chất lượng kỹ thuật chỉ được chấm ở mức đáp ứng AC.

### §2.2 Increment cần giao
| ID | Tính năng | Yêu cầu tối thiểu | Sprint tham chiếu |
|---|---|---|---|
| **F1** | Quản trị hệ thống (tài khoản & vai trò) | Đăng ký, đăng nhập, đăng xuất. Admin tạo và khóa tài khoản. ≥2 vai trò (Administrator, Customer). Chặn người không có quyền truy cập chức năng admin | S1 |
| **F2** | Quản lý sách | Thêm, xóa, sửa sách: title, author, category, **price > 0**, description, cover image, stock. **Quản lý category và author.** Validate input. Xóa là **ẩn (không hard delete)** | S2 |
| **F3** | Danh sách sách | Dạng grid/card gồm cover, title, author, price. **Phân trang 12 sách/trang, mới nhất trước.** Responsive | S2 |
| **F4** | Chi tiết sách | Chọn sách ở F3 thì mở trang chi tiết. **ID không tồn tại thì hiện thông báo thân thiện. Nút quay lại trả về đúng trang danh sách cũ** | S3 |
| **F5** | Tìm kiếm / lọc | Tìm theo title hoặc author. **Lọc theo category và khoảng giá.** Hoạt động kết hợp với phân trang của F3 | S3 |

- **Nhóm 2 hay 3 người đều phải làm đủ F1–F5.** Nhóm 2 người quản lý khối lượng bằng capacity và Release Plan thực tế, **không cắt tính năng**.
- **NFR tối thiểu:** UI responsive; **≥30 sách mẫu**; trang danh sách tải **< 2 giây** với dữ liệu mẫu; validate cả client và server; **mật khẩu lưu dạng hash**.
- **Hosting miễn phí** (Render, Vercel, Netlify, Railway…) để GV truy cập trực tiếp khi chấm. Website phải online đến hết 17/11/2026.
- Công nghệ tự chọn. **Ngoài phạm vi: giỏ hàng, thanh toán, social login.**
- Có thể đổi phân bổ tính năng giữa các Sprint trong Sprint Planning, nhưng phải giải thích trong Release Plan.

## §3. Đầu vào kế thừa
Hợp nhất các sản phẩm cũ thành **baseline v1.0**. **Mọi tài liệu kế thừa phải có bảng version history** ghi rõ thay đổi so với bản đã nộp trước đó.

| Nguồn | Sản phẩm có sẵn | Dùng trong đồ án |
|---|---|---|
| Lab 1 | Mục tiêu SMART, stakeholder, communication ban đầu | Đưa vào Charter và Communication Plan |
| Lab 2 | Project Charter | Cập nhật scope Release 1.0, mốc 3 Sprint, budget (BAC) |
| Lab 3 | Vai trò Scrum, backlog ban đầu, DoD nháp | Cơ sở phân công PO/Leader |
| TA tuần 1 | Assign.xlsx, Process.docx (Scrum tùy biến) | Quy trình cho 3 Sprint; sửa những phần nhóm sẽ làm khác đi |
| TA tuần 2 | ProductBacklog.xlsx, ToolSetup | Product Backlog v1.0; tiếp tục dùng PM tool |
| Bài tập tuần 5 | Planning Poker, SP, velocity, chi phí/Sprint | Ước lượng item mới, lập Release Plan và BAC |
| Bài tập tuần 6 | AC dạng Given–When–Then, DoD 3 tầng, risk register | AC cho mọi item của Release 1.0; DoD đưa vào Quality Plan; risk register v1.0 |

## §4. Tổ chức nhóm và quy tắc
### §4.1 Vai trò
| Vai trò | Người đảm nhận | Trách nhiệm |
|---|---|---|
| Sponsor/Customer | GV | Duyệt PMP v1.0, ra CR, dự Sprint Review, ký UAT |
| Product Owner | 1 thành viên cố định, đồng thời là Developer | Sắp xếp backlog, viết và làm rõ AC, chấp nhận item Done, đại diện nhóm trong CCB |
| Sprint Leader / SM | Luân phiên mỗi Sprint; mỗi người lead ≥1 Sprint | Điều phối Planning, Daily, Retro; giữ board cập nhật; nộp bài Sprint; trình bày Sprint Review |
| Developers | Tất cả | Chia task, ước lượng giờ, phát triển, kiểm thử, log giờ thực tế |

**Nhóm 2 người:** một người lead **Sprint 1 và Sprint 3**. Người còn lại lead **Sprint 2 và đồng thời là PO**. Lịch luân phiên được chốt trong PMP v1.0 và không đổi sau Sprint 1 nếu không có lý do được GV chấp nhận.

### §4.2 Quy tắc vận hành
- **Timebox:**
  - Sprint Planning ≤ 45 phút. Sprint Backlog làm trong Excel trước, sau đó nhập vào PM tool.
  - Daily Scrum ≤ 10 phút. Được làm online hoặc bất đồng bộ qua Teams/Zalo nhưng **phải có log**.
  - Review và Retro diễn ra trên lớp vào **Thứ Sáu ngay sau khi Sprint kết thúc**, tổng 30 phút. Sau đó mỗi nhóm trình bày khoảng 10 phút.
- **PM tool:** tiếp tục dùng tool của Team Assignment. **Mời GV (buiminhphung@gmail.com) với quyền Reader.** Mỗi task ghi **Original Estimate** và **Completed Work** (giờ). Completed Work chính là dữ liệu AC (actual cost) cho EVM.
- **Source code:** 1 repo GitHub/GitLab của nhóm, có mời GV. Theo branching strategy và commit convention đã nêu trong CM Plan. **Không commit thẳng vào main.**
- **Nộp bài:** Sprint Leader upload trước **23:59 Thứ Năm cuối Sprint**, từng file riêng, không zip, đặt tên theo §7. **Trễ: −10% điểm Sprint cho mỗi 5 giờ.**
- **AI:** được dùng để viết tài liệu và code. Phải khai báo công cụ, mục đích và nội dung bị ảnh hưởng trong phụ lục Final Report. **Nội dung không giải thích được sẽ không được điểm.**
- **Liêm chính:** board, repo và dữ liệu phải là của nhóm. Tài liệu trùng lặp giữa các nhóm thì tất cả các nhóm liên quan nhận 0 điểm phần đó và bị báo cáo lên Khoa.

## §5. Lịch (23/10 – 17/11/2026)
Mỗi Sprint chạy từ **Thứ Sáu đến Thứ Năm tuần sau** (1 tuần). Hạn nộp 23:59 Thứ Năm. Review và Retro vào Thứ Sáu kế tiếp.

| Tuần | Sprint | Hoạt động PM | Increment | Hạn / trình bày |
|---|---|---|---|---|
| 8 (23–29/10) | **S1 – Plan baseline & F1** | Kick-off, PMP v1.0, Product Backlog v1.0, Release Plan, BAC; Sprint Planning 1 (Excel → tool); test case F1; **nhận CR vào Thứ Ba 27/10** | F1 | **23:59 Thứ Năm 29/10** · Review 1: Thứ Sáu 30/10 |
| 9 (30/10–05/11) | **S2 – Execution, monitoring & change** | Planning 2; xử lý CR (impact analysis, CCB, cập nhật baseline); Weekly Status Report; cập nhật risk register và issue log; test case F2, F3 | F2, F3 (+ phần CR nếu được duyệt) | **23:59 Thứ Năm 05/11** · Review 2: Thứ Sáu 06/11 |
| 10 (06–12/11) | **S3 – Complete Release 1.0 & acceptance** | Planning 3; test case F4, F5; regression; Release v1.0 (tag và release notes); UAT, biên bản nghiệm thu | F4, F5 | **23:59 Thứ Năm 12/11** · Review 3 + UAT: Thứ Sáu 13/11 |
| 10–11 (13–17/11) | Consolidation & closure | Hosting; Final Report (plan vs actual, burndown, EVM, rủi ro và thay đổi, closure checklist, Lessons Learned) | Release 1.0 online | **Nộp cuối: 23:59 Chủ Nhật 15/11** · **Thuyết trình: 07:00 Thứ Ba 17/11** |

## §6. Yêu cầu chi tiết
### §6.1 Sprint 1 – Plan baseline và F1
1. Kick-off nội bộ: thống nhất scope Release 1.0, vai trò, lịch luân phiên Leader, working agreement.
2. Hợp nhất **PMP v1.0 gồm 7 phần** (xem bảng dưới).
3. **Product Backlog v1.0:**
   - ≥15 item.
   - Các item thuộc Release 1.0 phải có SP, MoSCoW, **AC dạng Given–When–Then (main, exception, boundary)** và **đạt Definition of Ready**.
   - Item mới hoặc bị thay đổi phải ước lượng lại bằng Planning Poker và ghi log.
4. **Release Plan:** số Sprint, Sprint Goal, velocity kỳ vọng (tính từ capacity), tổng SP kế hoạch (PSP), **BAC = tổng giờ kế hoạch × đơn giá**.
5. **Sprint Planning 1:**
   - Gồm Sprint Goal, capacity, item được chọn.
   - **Task ≤ 1 person-day**, có owner và ước lượng giờ.
   - Làm trong Excel (sheet `S1_Backlog`), sau đó nhập vào PM tool.
6. Xây F1: Daily Scrum, cập nhật board hằng ngày, log giờ thực tế.
7. **Test case F1:** ≥1 test case cho mỗi AC, theo luồng GWT → bước kiểm thử → kết quả mong đợi → kết quả thực tế.
8. **Change Request:** Sponsor giao ngày 27/10. Ghi vào Change Log trong S1, xử lý trong S2.
9. Review và Retro 1 (30/10): chuẩn bị dữ liệu và action item.

| Phần PMP v1.0 | Nội dung tối thiểu | Kế thừa từ |
|---|---|---|
| 1. Project Charter | SMART objectives, scope Release 1.0, milestones, BAC, stakeholders, constraints, assumptions, success criteria | Lab 1–2 |
| 2. Tailored Scrum process | Vai trò và người thực hiện, events và timebox, artifacts, tools, quyết định tùy biến và rủi ro liên quan | TA tuần 1 |
| 3. Master Plan / Release Plan | Lịch 23/10–17/11, milestones, phân bổ item theo Sprint, velocity, BAC, luân phiên Leader | TA, tuần 4–5 |
| 4. Quality plan | **DoD 3 tầng (Story–Sprint–Release)** có bằng chứng và người kiểm tra; metrics: tỷ lệ pass AC, defect theo mức độ nghiêm trọng, tỷ lệ item bị mở lại | Tuần 6, LT7 |
| 5. Risk management plan | Quy trình, thang **P×I (1–5)**, **risk register ≥8 rủi ro**, strategy, owner, trigger | Tuần 6, LT6 |
| 6. Configuration management plan | Danh sách CI (tài liệu, code, database), quy tắc đặt tên và đánh version, branching strategy, commit convention, baselines/tags, **quy trình CR và CCB** | LT6 |
| 7. Communication plan | Ma trận stakeholder – thông tin – kênh – tần suất – người gửi; quy tắc phản hồi; lịch các Scrum event | Lab 1, TA |

### §6.2 Sprint 2 – Execution, monitoring, change control
1. Planning 2 dùng **velocity thực tế của S1**. Không dùng lại số kỳ vọng nếu thực tế đã lệch.
2. Xây F2, F3. Cập nhật board, burndown và giờ hằng ngày. Viết test case F2, F3 từ AC.
3. **Xử lý CR theo 5 bước:**
   1. Ghi vào Change Log.
   2. Phân tích tác động lên scope, schedule, cost, quality, risk, có số liệu SP/giờ.
   3. CCB (PO + Leader + Sponsor) quyết định Approve / Reject / Defer, kèm lý do.
   4. Nếu được duyệt: cập nhật Product Backlog, AC, Release Plan, **rebaseline và gắn tag**.
   5. Thông báo cho stakeholder theo Communication Plan.
4. **Weekly Status Report:** trạng thái chung (Green/Amber/Red) cho scope, schedule, cost, quality; việc đã làm, việc tiếp theo, vấn đề cần Sponsor hỗ trợ.
5. Cập nhật risk register. Rủi ro đã xảy ra chuyển thành issue trong Issue Log, kèm hành động xử lý.

### §6.3 Sprint 3 – Complete & acceptance
1. Planning 3.
2. Xây F4, F5, test case từ AC, sửa defect, **regression F1–F3**.
3. **Release v1.0:** tag `v1.0` trên repo và release notes (tính năng, known issues, cách chạy).
4. **UAT:** script nghiệm thu ánh xạ tới **mọi AC**, chạy cùng khách hàng (GV hoặc nhóm khác đóng vai) tại Review 3 ngày 13/11, lập biên bản nghiệm thu.
5. Thu dữ liệu đóng dự án: SP hoàn thành mỗi Sprint, giờ thực tế, defect, CR, trạng thái rủi ro.

### §6.4 Consolidation và closure
**Hosting:** ghi URL và tài khoản demo (admin và customer) vào Final Report.

**Final Report** (dùng template), tối thiểu gồm:
- Tóm tắt dự án và kết quả Release 1.0.
- Kết quả từng Sprint: Sprint Goal, item done, burndown, velocity, vấn đề và cách giải quyết.
- **Plan vs actual:** scope (kế hoạch / đã làm / thêm do CR), schedule (milestones và 3 biểu đồ burndown), cost (EVM), quality (tỷ lệ pass AC/test case, defect).
- Tổng kết rủi ro và thay đổi: rủi ro đã xảy ra, hiệu quả ứng phó, CR và tác động thực tế.
- **Closure checklist:** nghiệm thu, bàn giao code và tài liệu, lưu trữ, giải phóng nguồn lực.
- **Lessons Learned ≥5**, mỗi bài học theo cấu trúc *Situation – Impact – Cause – Lesson – Recommendation*.
- Phụ lục: danh sách file, URL hosting và tài khoản demo, link repo/board/video demo, **khai báo sử dụng AI**.

### AgileEVM (cuối Sprint n, N = 3)
| Chỉ số | Công thức |
|---|---|
| BAC | Tổng person-hours kế hoạch của Release × **200.000 VND** |
| PSP | Tổng SP kế hoạch của Release (rebaseline khi CR được duyệt, ghi rõ trong Final Report) |
| PV | BAC × n / N |
| EV | BAC × (SP tích lũy **đạt DoD** / PSP) |
| AC | Person-hours thực tế tích lũy × 200.000 VND (lấy từ Completed Work trên tool) |
| SV, CV | SV = EV − PV; CV = EV − AC |
| SPI, CPI | SPI = EV / PV; CPI = EV / AC |
| EAC, ETC | EAC = BAC / CPI; ETC = EAC − AC |

*Ví dụ trong đề:* team 3 người, 12 giờ/người/Sprint → 108 giờ, BAC = 21,6 triệu; PSP = 30 SP. Cuối S1 xong 8 SP, dùng 40 giờ:
- PV = 7,2 tr; EV = 5,76 tr; AC = 8,0 tr.
- SV = −1,44 tr; CV = −2,24 tr; SPI = 0,80; CPI = 0,72; EAC = 30,0 tr.
- Kết luận: chậm tiến độ và vượt ngân sách. Nhóm phải nêu nguyên nhân và hành động khắc phục.

## §7. Sản phẩm nộp và cách đặt tên
**Tiền tố:** `HK261_SPM_FP_Team6_`. Ví dụ: `HK261_SPM_FP_Team6_c3_SprintReport_S1.docx`. **File Excel nộp lũy kế:** bản của mỗi Sprint phải chứa cả các sheet của Sprint trước.

| Đợt | File | Nội dung |
|---|---|---|
| **S1 – 23:59 29/10** | `c1_ProjectPlan.docx` | PMP v1.0 (7 phần) |
| | `c2_SprintBacklog_S1.xlsx` | Product Backlog, Planning Poker log, Release Plan, Sprint Backlog S1, Burndown, Risk Register, Config Items |
| | `c3_SprintReport_S1.docx` | Sprint Planning, Daily log, test case F1, Review, Retro, Status |
| | `c0_Eval_S1.xlsx` | Leader đánh giá các thành viên |
| **S2 – 23:59 05/11** | `c2_SprintBacklog_S2.xlsx` | Workbook cập nhật (Change Log, Risk, Issue Log, S2) |
| | `c3_SprintReport_S2.docx` | Báo cáo S2, test case F2, F3, Weekly Status |
| | `c4_ChangeRequest_CR01.docx` | Form CR, impact analysis, quyết định CCB |
| | `c0_Eval_S2.xlsx` | |
| **S3 – 23:59 12/11** | `c2_SprintBacklog_S3.xlsx` | Workbook cập nhật (S3, bản nháp EVM) |
| | `c3_SprintReport_S3.docx` | Báo cáo S3, test case F4, F5, release notes |
| | `c5_UAT.docx` | UAT scripts và biên bản nghiệm thu |
| | `c0_Eval_S3.xlsx` | |
| **Final – 23:59 15/11** | `c1_ProjectPlan_Final.docx` | PMP đã cập nhật theo góp ý của GV và CR |
| | `c2_SprintBacklog_Final.xlsx` | Workbook đầy đủ, có sheet EVM |
| | `c6_FinalReport.docx` | Final Report, Lessons Learned, URL hosting, link repo/board, video demo ≤3 phút |
| | `c6_Slides.pptx` (hoặc .pdf) | Slide thuyết trình cuối kỳ |
| | `Eval360_Team6_<StudentID>.xlsx` | **Mỗi thành viên nộp 1 file** |

**Template** (Phụ lục B, thư mục `FinalProject/HK261/Templates`):
- `FP_Template_ProjectWorkbook.xlsx`: Product Backlog, Planning Poker, Release Plan, Sprint Backlog S1–S3, Burndown, Risk Register, Issue Log, Change Log, Config Items, EVM
- `FP_Template_SprintReport.docx`
- `FP_Template_ChangeRequest.docx`
- `FP_Template_UAT.docx`
- `FP_Template_FinalReport.docx`
- `FP_Template_Eval.xlsx`

Nhóm được thêm nội dung nhưng phải giữ đủ các mục bắt buộc.

## §8. Thuyết trình
- **Sprint Review hằng tuần** (Leader trình bày):
  - Sprint Goal và kết quả.
  - Demo increment đối chiếu với AC.
  - Burndown, giải thích các đoạn đi ngang hoặc đi lên.
  - Giờ kế hoạch so với thực tế.
  - Rủi ro và vấn đề.
  - Action item từ Retro.
  - Kế hoạch Sprint tiếp theo.
- **Thuyết trình cuối kỳ 07:00 17/11** (10 phút trình bày + 5 phút hỏi đáp). Cấu trúc gợi ý:
  1. Nhóm và mục tiêu.
  2. Kế hoạch: Release Plan, kỹ thuật ước lượng.
  3. Thực thi 3 Sprint: 3 burndown, CR, các vấn đề.
  4. Demo trên site đã host, hoặc video ≤3 phút có cả kịch bản AC pass và fail.
  5. Plan vs actual và EVM.
  6. Bài học quan trọng nhất.
- **Mọi thành viên đều phải trình bày.** Vắng mặt bị tính là vắng thi.
- **Slide:** font ≥20pt, mỗi slide một ý, số liệu trình bày bằng bảng/biểu đồ. Câu hỏi đặt cho từng cá nhân.
- **Góp ý từ khóa trước** (cần chuẩn bị bằng chứng cho từng điểm):
  - Font nhỏ, slide nhiều chữ.
  - Video demo không đọc được.
  - **Không có bằng chứng Planning Poker khi được hỏi.**
  - Trả lời yếu về các rủi ro đã xảy ra và cách xử lý.

## §9. Chấm điểm
**Điểm đồ án = 0,45·A + 0,25·B + 0,30·C**
- A: trung bình điểm 3 Sprint × hệ số cá nhân.
- B: điểm bài nộp cuối × hệ số cá nhân.
- C: điểm thuyết trình. C1–C2 là điểm nhóm, C3–C4 là điểm cá nhân.

### §9.2 Điểm mỗi Sprint (/10)
| ID | Tiêu chí | Điểm |
|---|---|---|
| S1 | Sprint Planning & Backlog: Goal, capacity, item, task ≤1 person-day có owner | 1,5 |
| S2 | Increment đạt AC và DoD; test case viết từ AC (demo được) | 2,5 |
| S3 | Theo dõi trên tool: board cập nhật hằng ngày, burndown, Daily log, giờ ước lượng và thực tế | 2 |
| S4 | Trọng tâm PM riêng của từng Sprint: S1 = PMP v1.0 · S2 = CR + risk/issue · S3 = UAT + Release | 2 |
| S5 | Configuration management: branch, PR có review, conventional commit, version tag | 1 |
| S6 | Leader trình bày Review + Retro có action item cụ thể | 1 |

### §9.3 Bài nộp cuối (/10)
| ID | Tiêu chí | Điểm |
|---|---|---|
| B1 | Project Charter (cập nhật) | 0,5 |
| B2 | Quy trình Scrum tùy biến, đúng như nhóm thực sự vận hành | 0,5 |
| B3 | Master/Release Plan (baseline và các bản cập nhật) | 0,5 |
| B4 | Product Backlog: ≥15 item đạt INVEST, MoSCoW, SP kèm log Planning Poker, AC dạng GWT | **1,5** |
| B5 | Quality plan: DoD 3 tầng, metrics, cách tiếp cận kiểm thử | 0,5 |
| B6 | Risk: register ≥8, P×I, strategy, trạng thái qua 3 Sprint | 0,75 |
| B7 | CM plan: CI, đặt tên, branching, baseline/tag | 0,5 |
| B8 | Communication plan | 0,5 |
| B9 | Increment Release 1.0: F1–F5 chạy trên server, source code, board PM tool | **1,5** |
| B10 | Change Request: impact analysis, quyết định CCB, cập nhật baseline | 0,75 |
| B11 | UAT / biên bản nghiệm thu theo AC | 0,5 |
| B12 | Final Report: plan vs actual (scope, schedule, cost – EVM, quality) | **1,5** |
| B13 | Lessons Learned | 0,5 |

### §9.4 Thuyết trình (/10)
| ID | Tiêu chí | Điểm |
|---|---|---|
| C1 | Nội dung: kết quả 3 Sprint, plan vs actual, EVM, quyết định PM, demo | 4 |
| C3 | Kỹ năng trình bày (cá nhân) | 4 |
| C4 | Trả lời câu hỏi (cá nhân) | 2 |

*Ghi chú: bảng §9.4 trong đề chỉ liệt kê C1, C3, C4 (tổng 10). Ở §9.6 và Rubric 4 lại có thêm **C2 Demo**. Đề không thống nhất ở điểm này, cần hỏi GV.*

### §9.5 Hệ số cá nhân
- cᵢ = rᵢ / r̄, giới hạn trong **[0,8 ; 1,1]**.
  - rᵢ là điểm trung bình các thành viên khác chấm cho sinh viên i, gồm đánh giá của Leader mỗi Sprint và đánh giá 360 cuối kỳ.
  - r̄ là điểm trung bình của cả nhóm.
- GV đối chiếu hệ số với bằng chứng trên board (task, giờ) và trên repo (commit, PR) để điều chỉnh.
- **Không có task và không có commit trong cả 3 Sprint thì A = 0.** Vắng thuyết trình cuối kỳ không có lý do thì C = 0.

### §9.6 Trọng số CLO
CLO1 8,75% · CLO2 27,38% · CLO3 29,12% · CLO4 23% · CLO5 11,75%.

### Phụ lục A – Mức "Excellent" của rubric (tóm tắt)
- **S1:** Sprint Goal đo được; capacity tính từ giờ khả dụng; lượng item chọn khớp velocity; task ≤1 person-day có owner và giờ.
- **S2:** mọi item cam kết đều đạt AC và DoD; test case phủ mọi AC; demo ổn định; item chưa xong được trả về backlog đúng cách.
- **S3:** board cập nhật mỗi ngày; burndown chính xác; Daily log đầy đủ; có giờ thực tế cho từng task; giải thích được chênh lệch.
- **S5:** branch theo đúng strategy; PR có review; mọi thành viên commit đều đặn; có version tag. (Commit dồn cục hoặc làm thẳng trên main chỉ được mức Satisfactory.)
- **S6:** Retro có ≥2 action item và được theo dõi ở Sprint sau.
- **B4:** ≥15 item INVEST, sắp theo giá trị; có log Planning Poker; AC GWT phủ main, exception, boundary.
- **B10:** phân tích tác động S/T/C/Q và rủi ro bằng số liệu; quyết định CCB có lý do; backlog, baseline và tag được cập nhật nhất quán.
- **B12:** baseline so với actual bằng dữ liệu; EVM đúng và có diễn giải; chỉ ra nguyên nhân gốc của chênh lệch.

### Phụ lục C – Checklist nộp cuối
- Tên file đúng tiền tố, không zip.
- URL, repo, board và video mở được bằng tài khoản của GV.
- Số liệu nhất quán giữa Workbook, Sprint Reports, Final Report và slide (SP, giờ, EVM).
- Backlog phản ánh CR đã được duyệt. Release Plan có cả bản baseline và bản cập nhật.
- Risk register ghi trạng thái cuối cùng của mọi rủi ro.
- Repo có tag v1.0 và release notes. Mọi thành viên đều có commit.
- Biên bản UAT ghi kết quả của từng AC và có xác nhận của khách hàng.
- Lessons Learned ≥5, đúng cấu trúc. Có khai báo sử dụng AI.
- Mọi thành viên đã nộp file Eval360.
