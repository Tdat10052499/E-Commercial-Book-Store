# Final presentation – 14 slides, 10 min + 5 min Q&A (spec 8.2)

Canva (chỉnh sửa được): https://canva.link/b3s5irrs6rifzb3 · Design ID DAHbGMJQNmE

| Phiên bản | Ngày | Thay đổi |
|---|---|---|
| v1 | 16/11/2026 | 8 slide, 7 phút, speaker notes, khung video |
| v2 | 16/11/2026 | Giải nghĩa thuật ngữ và con số cho người không đọc GitHub |
| v3 | 17/11/2026 | Theo yêu cầu 8.2 và tham khảo deck Team 02: 14 slide, 10 phút; thêm Charter, danh sách sản phẩm, Release Plan, ước lượng, 3 burndown, velocity/giờ, bảng CR, issues, UAT, EVM theo mốc, 1 bài học quan trọng nhất, Q&A. Chữ trên slide ≥ 30 px (khung 1920×1080), số liệu ở dạng bảng hoặc biểu đồ |
| v3.1 | 17/11/2026 | Nguyễn Minh Chính: số liệu đóng dự án mới (NFR-03 đạt 17/11, giờ đủ 98.23 h) – speaker notes slide 7, 12, bảng câu hỏi, lưu ý; ngày trình bày 20/11 |

Nguồn số liệu: Final Report c6 (`pm/final/final-report.md` §2–§5), Charter (`pm/pmp/01-charter.md`), Release Plan (`pm/pmp/03-master-release-plan.md`), burndown PNG trong `pm/sprints/S*/evidence/`. Không thêm số mới ngoài các file này.

## 1. Cấu trúc theo 8.2

| Yêu cầu 8.2 | Slide |
|---|---|
| Charter | 2 |
| Kế hoạch: danh sách sản phẩm, Release Plan, kỹ thuật ước lượng | 3, 4, 5 |
| Thực thi 3 Sprint: 3 burndown, CR, issues | 6, 7, 8, 9 |
| Video demo ≤ 3 phút, AC pass và fail | 10 |
| Kế hoạch so với thực tế, EVM | 7, 11, 12 |
| Bài học quan trọng nhất | 13 |
| Cả 2 thành viên cùng trình bày | Đạt 7 slide, Chính 7 slide |

## 2. Phân công và thời lượng

| # | Slide | Người nói | Thời lượng |
|---|---|---|---|
| 1 | Cover | Đạt | 0:15 |
| 2 | Charter – team and project goals | Chính | 0:35 |
| 3 | Product list – what we planned to deliver | Đạt | 0:30 |
| 4 | Release Plan – 3 one-week Sprints | Chính | 0:30 |
| 5 | Estimation – size, time, cost | Chính | 0:30 |
| 6 | 3 Sprint burndowns | Đạt | 0:40 |
| 7 | Velocity and hours: plan vs actual | Chính | 0:35 |
| 8 | Two Change Requests | Chính | 0:35 |
| 9 | Issues and responses | Đạt | 0:35 |
| 10 | Video demo | Đạt (giới thiệu) | 0:10 + ≤ 3:00 |
| 11 | UAT and quality | Đạt | 0:25 |
| 12 | EVM snapshots | Chính | 0:40 |
| 13 | Most important lesson: Built is not Done | Chính | 0:35 |
| 14 | Thank you / Q&A | Đạt | 0:10 |

Tổng dự kiến 9:45 (dư 15 s). Nếu video dài đúng 3:00 và tập vẫn vượt 10:00, rút slide 5 và slide 9 còn 20 s mỗi slide.

## 3. Speaker notes (EN)

Canva hiện chỉ lưu speaker notes cũ ở slide 1 và 10 (vẫn đúng). Công cụ hiện tại không ghi được notes vào Canva, nên dán notes dưới đây vào phần Notes của từng slide (hoặc in ra để đọc).

**1 · Đạt (0:15).** Good morning. We are Team 6 "Page Turners". I am Đạt, developer and Sprint Leader of Sprints 1 and 3. Chính is our Product Owner and Leader of Sprint 2. Our Sponsor is Dr. Bùi Minh Phụng.

**2 · Chính (0:35).** Our Charter set four goals. Scope: F1 to F5 live on a free host, with 100% of acceptance criteria passing in UAT by 13/11. Quality: at least 30 books, the list page under 2 seconds, and working on phone, tablet and PC. Schedule and cost: SPI and CPI at least 0.9 at the end of Sprint 3. Change: every change request is decided by the Change Control Board. The budget, BAC, is planned hours times 200,000 VND: 120 hours or 24 million at the start, 132 hours or 26.4 million after CR-06.

**3 · Đạt (0:30).** This is the product we planned. F1 accounts and roles in Sprint 1; F2 book management and F3 the book list in Sprint 2; F4 book details and F5 search and filter in Sprint 3. CR-06 added a Store Staff role across Sprints 2 and 3. In total 20 backlog items and 68 story points. Cart, payment and social login are out of scope.

**4 · Chính (0:30).** The Release Plan has three one-week Sprints: Sprint 1 from 23/10, Sprint 2 from 30/10, Sprint 3 from 06/11, then closure with UAT on 13/11. Leaders rotate: Đạt, Chính, Đạt. The baseline changed only through the board: v1.0 with 55 points, v1.1 with 62 points after CR-06, and v1.2 with 68 points after CR-07.

**5 · Chính (0:30).** We estimated in four steps. Size in story points on a Fibonacci scale, using Planning Poker: both members vote, discuss the gap and vote again. Time from capacity: two members times 20 hours is 40 hours per Sprint. Expected velocity: 55 points over 3 Sprints, about 18 per Sprint. Cost: planned hours times 200,000 VND.

**6 · Đạt (0:40).** These are the three burndowns of task hours. Grey is the plan, gold is actual. Sprint 1 is flat because hours were logged in Jira only after the Sprint; 10 hours were left. Sprint 2 dropped only at the end because most work was merged on the last day; 6.25 hours left. Sprint 3 follows the plan more closely, ending with 7 hours left, but two Daily meetings were missed.

**7 · Chính (0:35).** Velocity is the story points the Product Owner accepted as Done inside the Sprint. Ours was 0, 5 and 45. The early numbers are low because items were built on time but accepted one Sprint later: 16 points of Sprint 1 in the Sprint 2 week, and 24 points of Sprint 2 in Sprint 3. NFR-03 was checked on 17/11, so all 68 of 68 points are Done, an average of 22.7. We planned 127.25 task hours; we logged 91.23 hours in the Sprints plus 7 hours of closure work, 98.23 hours in total against a budget of 132.

**8 · Chính (0:35).** We had two Change Requests. CR-06 came from the Sponsor on 27/10: a Store Staff role that edits books but not accounts, and shows "Last updated by". The board approved Option B on 30/10: plus 7 points, 12 hours and 2.4 million VND. All 8 of its criteria passed at UAT. CR-07 came from the Product Owner on 12/11 after Planning Poker re-sized Sprint 3: plus 6 points, no extra hours or cost, approved on 13/11. Both followed the same steps: log, impact analysis, board decision, new baseline.

**9 · Đạt (0:35).** These are the main issues. Sprint 1 files were late; we held a catch-up session. F2 started late, so the Product Owner took the data-model task, and 24 points were accepted in Sprint 3. We had no Planning Poker votes in Sprints 1 and 2; a voting session on 11/11 led to CR-07. Daily meetings were skipped and PRs merged without review; we moved the Daily to Discord at 22:00 and required approval before merge from 12/11. When I was busy on 10/11, a task moved to day 6 and we swapped the test owner.

**10 · Đạt (0:10 + video ≤ 3:00).** Now a short demo on the live site, pagetunnel.vercel.app. You will see the pass cases: search, filter, book details, and the Store Staff edit that shows "Last updated by". Then a fail case: an invalid price range is blocked with a clear message. [Play video – file to be inserted, TBD]

**11 · Đạt (0:25).** UAT means the Sponsor used the live site and checked every acceptance criterion. On 13/11, 73 of 73 passed, including 8 of 8 for CR-06. All 114 automated tests pass. We found 6 defects and none is open. The reopen rate was 5%, and the book list loads in 0.50 seconds against a 2-second target.

**12 · Chính (0:40).** Earned Value Management compares plan, progress and cost in money. After Sprint 1, EV was 0 and SPI 0.00; after Sprint 2, SPI 0.51 and CPI 0.69. At the end of Sprint 3, SPI was 0.97 and CPI 1.50. At closure, after the uptime check on 17/11, PV and EV are both 26.4 million and AC is 19.6 million VND. SPI is 1.00: all planned value is delivered – late, but not missing. CPI is 1.34: we spent less than the value delivered, but we read this with care because some hours were logged late and AI helped, so the real cost is likely higher.

**13 · Chính (0:35).** Our most important lesson is "Built is not Done". In Sprint 2 most work was merged on the last day. Only 5 of 29 points were Done, SPI fell to 0.51, and 24 points moved to Sprint 3. The root cause: the data model came late, and testing on the live site was one block at the end. Next time we test and get PO review the day after each build, merge small pieces daily, and start dependencies on day 1.

**14 · Đạt (0:10).** The website and the GitHub repository with tag v1.0 are on screen. Thank you. We are happy to take your questions; please ask either of us.

## 4. Chuẩn bị trả lời câu hỏi cá nhân (8.2: câu hỏi hỏi từng người)

| Chủ đề dễ bị hỏi | Ai trả lời | Ý chính |
|---|---|---|
| Vì sao velocity S1 = 0 | Đạt (Leader S1) | Code xong nhưng chưa test trên host và PO chưa chấp nhận trong Sprint; 16 SP chấp nhận tuần S2 |
| Vì sao S2 chỉ 5/29 SP | Chính (Leader S2) | Data model trễ (I-02), merge dồn ngày cuối; LL-01 |
| CR-06 Option B khác Option A thế nào | Chính (PO) | Xem `pm/change/` – phương án được CCB chọn ngày 30/10 |
| CPI 1.34 có thật không | Chính | Giờ ghi trễ, có AI hỗ trợ; AC thực có thể cao hơn; EAC = AC = 19.646.000 (dự án đã xong) |
| Quy trình review PR | Đạt | Từ 12/11 mọi PR cần approval trước khi merge (I-06) |

## 5. Lưu ý

- Slide 10 vẫn trống khung video; Đạt chèn file video vào Canva.
- Lịch đã đổi: nộp 18/11 23:59, trình bày **Thứ Sáu 20/11** → cập nhật ngày trên slide 1.
- Giờ đã chốt 17/11: **98.23 h** (91.23 h trong Sprint + 7 h đóng dự án). **Slide 7 và 12 trên Canva phải sửa** theo số mới: 68/68 SP, SPI 1.00, CPI 1.34, AC 19.6 tr.
