# 05 – Gap analysis: từ baseline Team 6 sang Final Project

*Đối chiếu `04` (sản phẩm Team Assignment) với `03` (đề Final Project). Mỗi dòng ghi dữ kiện từ hai nguồn, sau đó là việc cần làm. Các mục ghi "đề xuất" là khuyến nghị, chưa phải yêu cầu của GV. Nhóm và PO quyết định cuối cùng.*

## 1. Mâu thuẫn về phạm vi và đặc tả
| # | Baseline Team 6 | Đề Final Project | Việc cần làm |
|---|---|---|---|
| 1 | Release 1 = Must + Should, 79 SP; gồm cart, checkout, payment (US-11, 12), order (US-13, 14), promotions, multi-store [04 §4] | Release 1.0 chỉ gồm **F1–F5**. **Cart, payment, social login nằm ngoài phạm vi** [03 §2.2] | Rebaseline scope. US-11, 12 (và US-13, 14, 15–18 nếu phụ thuộc giỏ hàng/đơn hàng) chuyển sang Won't (this release) hoặc Release 2. Ghi vào version history |
| 2 | US-05: **20 sách/trang**; sắp xếp theo mới nhất, giá, bán chạy | F3: **12 sách/trang, mới nhất trước**, dạng grid/card | Sửa AC theo F3 |
| 3 | US-06: tìm theo title, author, **ISBN**; lọc theo genre, author, giá | F5: tìm theo title **hoặc** author; lọc theo **category và khoảng giá**; **kết hợp được với phân trang F3** | Bổ sung AC về phân trang kết hợp và khoảng giá. ISBN có thể giữ lại như phần mở rộng (nhóm quyết định) |
| 4 | US-07: chi tiết sách, hết hàng thì vô hiệu Add to cart, tải <3s | F4: **ID không tồn tại thì hiện thông báo thân thiện; Back trả về đúng trang danh sách cũ** | Thêm 2 AC (exception, navigation). Bỏ tham chiếu tới Add to cart vì cart ngoài phạm vi |
| 5 | US-08/09/10: thêm, sửa, gỡ sách; bắt buộc ISBN | F2: thêm, sửa, xóa (ẩn) sách gồm title, author, category, price >0, description, cover, stock; **quản lý category và author** | **Thiếu story CRUD category và CRUD author.** Cần thêm item mới và ước lượng bằng Planning Poker (có log). Kiểm tra lại việc bắt buộc ISBN vì F2 không yêu cầu |
| 6 | US-03: vai trò Admin / Store Manager / Staff; vô hiệu hóa tài khoản | F1: ≥2 vai trò (**Administrator, Customer**); **admin tạo và khóa tài khoản**; chặn truy cập admin | Viết lại US-03 theo F1. Store Manager và Staff gắn với multi-store, có thể hoãn |
| 7 | US-01: email xác nhận gửi trong 1 phút; US-02: khóa tài khoản, reset qua email | F1 không yêu cầu email. NFR yêu cầu **mật khẩu hash** và validate client + server | Thêm AC/NFR về hash và validate. Email là phần mở rộng; cân nhắc rủi ro khi hosting free (SMTP) |
| 8 | Không có NFR về dữ liệu mẫu và hosting | **≥30 sách mẫu; list <2s; hosting free online đến 17/11** | Thêm item hoặc task cho seed data (TA có T-16 với 50 sách), deploy và hosting |
| 9 | US-21 responsive là một story riêng | Responsive là NFR của F3 và của toàn bộ UI | Có thể giữ làm story NFR, hoặc chuyển thành mục trong Story-DoD (nhóm chọn) |

## 2. Mâu thuẫn về quy trình và kế hoạch
| # | Baseline | Final Project | Việc cần làm |
|---|---|---|---|
| 10 | Sprint **2 tuần**, capacity 80 giờ/Sprint (4 giờ × 10 ngày × 2 người) | Sprint **1 tuần**, Thứ Sáu → Thứ Năm, N = 3 [03 §5] | Tính lại capacity theo Sprint 1 tuần. Velocity kỳ vọng phải suy ra từ capacity. **Velocity 22 SP/2 tuần không áp dụng trực tiếp được** |
| 11 | Sprint 1 trong TA = 6 story / 22 SP (đăng ký, đăng nhập, catalog, search, detail, thêm sách) | Sprint 1 = **chỉ F1** (đề cho phép đổi phân bổ nhưng phải giải thích) | Lập lại Sprint 1 Backlog (sheet `S1_Backlog`), task ≤1 person-day, có owner và giờ |
| 12 | DoD **1 tầng**, 7 mục | **DoD 3 tầng** (Story / Sprint / Release), mỗi mục có bằng chứng và người kiểm tra; kèm quality metrics [03 §6.1 PMP-4] | Tách DoD-1…7 vào 3 tầng, theo mẫu bài tập DoD (`02`). Thêm metrics: tỷ lệ pass AC, defect theo mức độ, tỷ lệ item bị mở lại |
| 13 | DoD-2: "merged to the **main** branch" | **Không commit thẳng vào main**; branching strategy và PR review được chấm ở S5 [03 §4.2, §9.2] | CM Plan cần định nghĩa nhánh (ví dụ feature → develop → main), PR bắt buộc review. Sửa DoD-2 cho khớp |
| 14 | AC dạng điều kiện đánh số | **AC Given–When–Then**, phủ main, exception, boundary; mỗi AC có ≥1 test case | Viết lại AC của mọi item thuộc Release 1.0 theo GWT, đánh số `US-xx/AC-0n` |
| 15 | Product Backlog có 23 item | ≥15 item **INVEST** và đạt **Definition of Ready** | Số lượng đủ. Cần thêm **DoR** (chưa có trong baseline) |
| 16 | Chỉ mô tả quy trình Planning Poker | **Log Planning Poker** là yêu cầu chấm (B4); khóa trước bị phê bình vì thiếu | Tạo sheet Planning Poker log (các vòng, phiếu, lập luận cao/thấp), ít nhất cho các item mới hoặc đã thay đổi |
| 17 | Chưa có Risk register, Issue log, Change log, Config items, EVM | Bắt buộc có trong Workbook c2 | Dựng theo `FP_Template_ProjectWorkbook.xlsx` nếu lấy được template |
| 18 | Ước lượng task theo giờ, không có giờ thực tế | Mỗi task trên Jira phải có **Original Estimate** và **Completed Work** | Bật time tracking trên Jira. Lưu ý: kiểm tra Jira Free team-managed có hỗ trợ Original Estimate / Time Spent không *(chưa xác minh)* |
| 19 | Chưa có BAC | BAC = tổng giờ kế hoạch × 200.000 VND | Tính BAC từ tổng giờ kế hoạch của 3 Sprint |
| 20 | Leader TA tuần 2: Chính | Nhóm 2 người: PO lead S2; người còn lại lead S1 và S3 | Chốt luân phiên trong PMP v1.0 (xem `04 §1`) |

## 3. Bằng chứng và hồ sơ còn thiếu
| # | Hạng mục | Trạng thái | Ảnh hưởng tới Final Project |
|---|---|---|---|
| 21 | Lab 1 (SMART, stakeholder, communication) | **Chưa nộp** trên eLearning; không có file trong knowledge | PMP-1 (Charter) và PMP-7 (Communication) phải soạn lại gần như từ đầu |
| 22 | Lab 2 (Project Charter) | **Chưa nộp**; không có file | PMP-1 phải soạn mới. Cần version history "v0 → v1.0" và giải thích nguồn gốc |
| 23 | Lab 3 | Có bản nháp chưa submit (`Lab-03_ Team-6_Rationale.docx`); chưa đưa vào knowledge | Nguồn cho vai trò và DoD nháp |
| 24 | TA tuần 1 (Assign.xlsx, Process.docx) | Đã nộp; **chưa đưa vào knowledge** | Nguồn chính cho PMP-2 (Scrum tùy biến), PMP-3 và communication |
| 25 | TA tuần 2 (ProductBacklog, ToolSetup, Eval) | **Chưa nộp** theo eLearning; ToolSetup còn placeholder và thiếu ảnh | Board Jira phải có thật và **mời GV với quyền Reader**. Cần URL thật |
| 26 | Repo Git | Chưa có thông tin | Bắt buộc; mời GV vào repo; S5 chấm configuration management |
| 27 | Bài tập AC (Team 6: US-03, 04, 07, 06 theo numbering của bài tập) | Chưa nộp | Các story được giao (cart, VNPay, review) **ngoài phạm vi Release 1.0**. Kỹ năng viết GWT vẫn dùng được |
| 28 | Template thư mục `FinalProject/HK261/Templates` | Không thấy trên trang môn học | Hỏi GV; nếu không có thì tự dựng theo đúng danh sách sheet/mục bắt buộc trong `03 §7` |
| 29 | Nội dung Change Request (giao 27/10) | Chưa có | Ghi vào Change Log trong S1; phân tích trong S2 |

## 4. Ánh xạ đề xuất: backlog cũ → F1–F5
*Đây là đề xuất để PO xem xét. Các ID mới (US-24…) chỉ là tạm đặt.*

| F | Item hiện có | Cần sửa hoặc thêm |
|---|---|---|
| F1 | US-01 Register, US-02 Login/logout/reset, US-03 Roles | Viết lại US-03 theo hai vai trò Administrator/Customer, thêm khóa tài khoản và chặn truy cập; thêm AC về hash và validate |
| F2 | US-08 Add, US-09 Edit/price, US-10 Remove (soft) | **Thêm:** CRUD category, CRUD author; trường stock và description; hiện ISBN đang bắt buộc |
| F3 | US-05 Browse | Sửa thành grid 12/trang, mới nhất trước, responsive. US-21 có thể gộp vào DoD |
| F4 | US-07 Details | Thêm AC: ID không tồn tại; Back giữ đúng trang |
| F5 | US-06 Search/filter | Thêm AC: lọc theo category và khoảng giá, kết hợp phân trang |
| NFR / hạ tầng | – | Seed ≥30 sách; deploy và hosting; kiểm tra list <2s |
| Ngoài Release 1.0 | US-04, 11–20, 22, 23 | Giữ trong backlog với MoSCoW = Won't (this release) hoặc gắn Release 2. Lý do: đề loại cart/payment/social login khỏi phạm vi |

## 5. Rủi ro dự án đã nhận diện từ dữ liệu hiện có
*Ghi chép đầu vào cho Risk register. Xác suất và tác động cần nhóm chấm điểm P×I.*
1. **Nhóm chỉ có 2 người**, phải làm đủ F1–F5 trong 3 Sprint 1 tuần, cộng với khối lượng tài liệu PM lớn (rủi ro capacity).
2. Nhiều sản phẩm kế thừa bị thiếu (Lab 1, Lab 2, TA tuần 2), nên khối lượng soạn mới PMP v1.0 trong Sprint 1 rất lớn.
3. Hosting miễn phí có thể ngủ (cold start) hoặc bị giới hạn, ảnh hưởng yêu cầu list <2s và khả năng GV truy cập.
4. Jira Free có thể giới hạn tính năng time tracking hoặc báo cáo, ảnh hưởng dữ liệu AC cho EVM *(cần kiểm tra)*.
5. Change Request chưa biết nội dung, có thể làm tăng PSP và kéo lùi tiến độ.
6. Lịch nộp trên eLearning lệch với đề (xem `06`), có thể dẫn tới nộp nhầm hạn hoặc nhầm mục.
7. Thiếu bằng chứng Planning Poker hoặc commit không đều sẽ làm giảm hệ số cá nhân cᵢ và điểm S5/B4.
