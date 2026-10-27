# 04 – Baseline của Team 6 trước Final Project

*Nguồn chính:*
- `TeamAssignment_Team6_ProductBacklog.xlsx` (v1.0, 15/10/2026), gọi tắt là **[PB]**
- `TeamAssignment_Team6_ToolSetup.docx`, gọi tắt là **[TS]**

*Hai file này do người dùng cung cấp ngày 27/10/2026. **Theo eLearning, cả hai chưa được nộp** (mục "TeamAssign – Submit Progress Week 2" trống).*

*Các file đã nộp nhưng **chưa được trích nội dung vào knowledge**: `TeamAssignment_Team6_Assign.xlsx`, `TeamAssignment_Team6_Process.docx`, `TeamAssignment_Team6_Week2 Schedule.xlsx`, `Eval_TeamAssign_HoDuTuanDat.xlsx`, `Lab-03_ Team-6_Rationale.docx` (bản nháp). Lab 1 và Lab 2 **không có bản nộp** trên eLearning. Nếu có file gốc, hãy bổ sung chúng vào Project knowledge.*

## 1. Nhóm
| Thành viên | MSSV (không đưa lên repo) | Vai trò trong Team Assignment | Jira role |
|---|---|---|---|
| Hồ Du Tuấn Đạt | (ẩn) | Scrum Master + Developer. Phụ trách backend, database, tích hợp | Administrator |
| Nguyễn Minh Chính | (ẩn) | **Product Owner** + Developer. Phụ trách user flow và catalog UI. Leader tuần 2 của TA | [chưa điền] |

- Tên nhóm: **Team 6 – Page Turners** [PB Overview].
- Phân công backend/frontend theo Lab 3 [PB Sprint 1 Backlog].
- **Hệ quả theo đề Final Project** (`03 §4.1`, nhóm 2 người): người làm PO sẽ lead Sprint 2, người còn lại lead Sprint 1 và Sprint 3. Nếu giữ Chính làm PO thì **Đạt lead S1 và S3, Chính lead S2**. *Đây là suy luận từ quy tắc, nhóm cần xác nhận và chốt trong PMP v1.0.*

## 2. Quy ước của Product Backlog [PB Overview, Template, Estimation]
- **Đơn vị ước lượng:** Story Points, thang Fibonacci rút gọn 1, 2, 3, 5, 8, 13. Item >13 phải tách trước Sprint Planning.
- **Kỹ thuật:** Planning Poker, có reference story làm mốc (analogous estimation). Quy trình:
  1. PO đọc story và AC.
  2. Mỗi người chọn thẻ kín, lật đồng thời.
  3. Nếu lệch, người cao nhất và thấp nhất giải thích, rồi bỏ phiếu lại.
  4. Tối đa 3 vòng; nếu vẫn lệch, lấy giá trị cao hơn.
  5. Item >13 phải tách.
  6. So với reference story để kiểm tra lại.
- **Reference story:**

| SP | Reference story |
|---|---|
| 2 | US-10 Remove discontinued book |
| 3 | US-07 View book details |
| 5 | US-06 Search & filter |
| 8 | US-12 Checkout & payment |

- **Ưu tiên:** MoSCoW.
- **AC:** dạng điều kiện đánh số (1., 2., …), **chưa phải Given–When–Then**.
- **Cột của backlog:** ID · Epic · Function · User Story · Estimate (SP) · Priority · AC · Sprint · Status (To Do/In Progress/Done, đồng bộ với Jira).
- **Sprint:** 2 tuần.
- **Log Planning Poker từng vòng:** file **không có**. File chỉ mô tả quy trình và kết quả cuối.

### Definition of Done (1 tầng, áp dụng mọi item) [PB Overview]
| Mã | Nội dung |
|---|---|
| DoD-1 | Mọi AC của item đều đạt và đã được demo |
| DoD-2 | Code được thành viên còn lại review và merge vào main |
| DoD-3 | Có unit test cho logic mới và tất cả đều pass |
| DoD-4 | Đã test trên layout desktop và mobile, trên Chrome, Firefox, Safari/Edge |
| DoD-5 | Không còn defect mức nghiêm trọng cao đang mở |
| DoD-6 | Tài liệu liên quan (user guide, API notes) đã cập nhật |
| DoD-7 | PO đã kiểm tra và chấp nhận; trạng thái trên Jira là "Done" |

## 3. Feature list và Epic [PB Feature List]
| Feature | Epic | Mô tả | Nguồn | Item |
|---|---|---|---|---|
| F-01 | EP-01 User Accounts | Đăng ký, đăng nhập, reset mật khẩu, profile và địa chỉ | Brief §2; Lab 3 | US-01, 02, 04 |
| F-02 | EP-01 | Tài khoản nhân viên và vai trò | Brief (gap, mới bổ sung) | US-03 |
| F-03 | EP-02 Book Catalog | Duyệt theo category, sách mới, bán chạy | Brief; Lab 3 | US-05 |
| F-04 | EP-02 | Tìm theo title, author, ISBN; lọc theo genre, giá, author | Brief; Lab 3 | US-06 |
| F-05 | EP-02 | Trang chi tiết sách | Brief; Lab 3 | US-07 |
| F-06 | EP-03 Book Management | Thêm sách, sửa giá, gỡ sách | Brief; Lab 3 | US-08, 09, 10 |
| F-07 | EP-04 Cart & Checkout | Giỏ hàng, checkout, thanh toán online | Lab 1; Lab 3 | US-11, 12 |
| F-08 | EP-04 | Theo dõi và xử lý đơn hàng | Lab 1–2 | US-13, 14 |
| F-09 | EP-05 Promotions | Chiến dịch và mã giảm giá | Brief (gap) | US-15, 16 |
| F-10 | EP-06 Multi-store | Nhiều cửa hàng, tồn kho theo cửa hàng, nhận tại cửa hàng | Brief (gap) | US-17, 18 |
| F-11 | EP-07 Customer Engagement | Đánh giá, review, wishlist | Lab 3 (ngoài MVP) | US-19, 20 |
| F-12 | EP-07 | Gợi ý sách | Lab 3 (hoãn lại) | US-23 |
| F-13 | EP-08 Quality (NFR) | Responsive, cross-browser | Brief (gap) | US-21 |
| F-14 | EP-08 | Nhận diện thương hiệu riêng, dễ dùng | Brief (gap) | US-22 |

## 4. Product Backlog v0 (23 item, 99 SP) [PB Product Backlog]
| Rank | ID | Epic | Story (rút gọn) | SP | MoSCoW | Acceptance Criteria (nguyên văn, rút gọn) | Sprint (TA) |
|---|---|---|---|---|---|---|---|
| 1 | US-01 | EP-01 | Khách đăng ký bằng email và mật khẩu | 3 | Must | Email hợp lệ và chưa tồn tại; mật khẩu ≥8 ký tự, có chữ và số; email xác nhận gửi trong 1 phút; lỗi hiển thị cạnh field | S1 |
| 2 | US-02 | EP-01 | Đăng nhập, đăng xuất, reset mật khẩu | 3 | Must | Sai thông tin thì báo lỗi chung chung; khóa 15 phút sau 5 lần sai; link reset hết hạn sau 30 phút | S1 |
| 3 | US-05 | EP-02 | Duyệt sách theo category | 3 | Must | Menu hiện mọi category đang hoạt động; trang hiện cover, title, author, price, **20 sách/trang**; sắp xếp theo mới nhất, giá, bán chạy | S1 |
| 4 | US-06 | EP-02 | Tìm theo title, author, ISBN và lọc | 5 | Must | Kết quả <2s; tìm được khớp một phần và không dấu; lọc theo genre, author, giá; thông báo "No results" kèm gợi ý | S1 |
| 5 | US-07 | EP-02 | Xem chi tiết sách | 3 | Must | Cover, title, author, publisher, ISBN, mô tả, giá, tồn kho; hết hàng thì vô hiệu nút Add to cart; tải <3s | S1 |
| 6 | US-08 | EP-03 | Nhân viên thêm sách và ảnh bìa | 5 | Must | Bắt buộc title, author, ISBN, price, category, stock; ISBN duy nhất, 10 hoặc 13 số; ảnh JPG/PNG ≤2MB; hiện ngay trong catalog | S1 |
| 7 | US-09 | EP-03 | Sửa thông tin sách và giá | 3 | Must | Sửa được mọi field trừ ISBN; giá >0; khách thấy thay đổi trong 1 phút; log mọi lần đổi giá | Backlog |
| 8 | US-10 | EP-03 | Gỡ sách ngừng bán | 2 | Must | Soft delete, ẩn khỏi catalog và search; đơn hàng cũ giữ thông tin sách; có hộp thoại xác nhận | Backlog |
| 9 | US-11 | EP-04 | Giỏ hàng | 5 | Must | Thêm, sửa số lượng, xóa; không vượt tồn kho; subtotal cập nhật ngay; giữ giỏ qua các phiên | Backlog |
| 10 | US-12 | EP-04 | Checkout và thanh toán online | 8 | Must | Bắt buộc địa chỉ, SĐT, phương thức; COD và 1 cổng thanh toán (sandbox VNPay/MoMo); trang và email xác nhận; trừ kho sau khi thanh toán | Backlog |
| 11 | US-14 | EP-04 | Nhân viên xử lý đơn hàng | 5 | Must | Lọc theo trạng thái và ngày; New → Confirmed → Shipping → Delivered / Cancelled; gửi email mỗi lần đổi trạng thái | Backlog |
| 12 | US-03 | EP-01 | Admin tạo tài khoản nhân viên có vai trò (Admin, Store Manager, Staff) | 5 | Must | Admin tạo, vô hiệu hóa, đổi vai trò; Staff bị chặn trang admin; Store Manager chỉ thấy dữ liệu cửa hàng mình | Backlog |
| 13 | US-21 | EP-08 | Responsive, cross-browser | 5 | Must | Hiển thị tốt ở 360/768/1280px không cuộn ngang; chạy trên Chrome, Firefox, Safari, Edge; vùng chạm ≥44px | Backlog |
| 14 | US-04 | EP-01 | Profile và địa chỉ giao hàng | 2 | Should | Sửa tên, SĐT, mật khẩu; tối đa 5 địa chỉ, có địa chỉ mặc định; tự điền khi checkout | Backlog |
| 15 | US-13 | EP-04 | Lịch sử và theo dõi đơn hàng | 3 | Should | Danh sách đơn; chi tiết và lịch sử trạng thái; hủy được khi đơn còn ở trạng thái "New" | Backlog |
| 16 | US-15 | EP-05 | Tạo khuyến mãi | 5 | Should | Giảm theo % hoặc số tiền cố định, có ngày bắt đầu/kết thúc; áp cho toàn bộ, theo category hoặc sách cụ thể; giới hạn lượt dùng và giá trị đơn tối thiểu; tự tắt khi hết hạn | Backlog |
| 17 | US-16 | EP-05 | Áp mã giảm giá khi checkout | 3 | Should | Mã hợp lệ thì giảm tổng và hiện dòng giảm giá; mã sai hoặc hết hạn có thông báo; 1 mã/đơn | Backlog |
| 18 | US-17 | EP-06 | Quản lý cửa hàng và tồn kho theo cửa hàng | 8 | Should | CRUD cửa hàng; tồn kho theo sách × cửa hàng; tồn kho online = tổng các cửa hàng; Store Manager chỉ sửa cửa hàng mình | Backlog |
| 19 | US-22 | EP-08 | Giao diện theo thương hiệu | 3 | Should | Theo style guide; walkthrough với bà Le; tương phản đạt WCAG AA | Backlog |
| 20 | US-18 | EP-06 | Xem tồn kho tại cửa hàng, nhận tại cửa hàng | 5 | Could | Danh sách cửa hàng còn hàng; tùy chọn pickup; hiển thị trên đơn và email | Backlog |
| 21 | US-19 | EP-07 | Đánh giá và review | 5 | Could | Chỉ người có đơn đã giao; 1–5 sao và text ≤1.000 ký tự; hiện điểm trung bình; nhân viên ẩn được review | Backlog |
| 22 | US-20 | EP-07 | Wishlist | 2 | Could | Thêm/xóa; xem giá và tồn kho hiện tại; chuyển sang giỏ hàng bằng 1 click | Backlog |
| 23 | US-23 | EP-07 | Gợi ý sách | 8 | Won't | 4–8 sách gợi ý; dựa trên category/author và lịch sử mua; hoãn sang sau Release 1 | Backlog |

**Tổng hợp [PB Summary]:**
- Must 13 item / 55 SP · Should 6 / 24 · Could 3 / 12 · Won't 1 / 8.
- Theo epic: EP-01 13 · EP-02 11 · EP-03 10 · EP-04 21 · EP-05 8 · EP-06 13 · EP-07 15 · EP-08 8.
- Release planning (TA): velocity giả định **22 SP / Sprint 2 tuần** (chưa có số liệu lịch sử). Must + Should = 79 SP, ước tính 4 Sprint.

## 5. Sprint 1 Backlog dự kiến trong TA [PB Sprint 1 Backlog]
- **Sprint Goal:** "A customer can register, log in, find books and view their details, and staff can add new books to the catalog."
- **Capacity:** 2 dev × 10 ngày × 4 giờ = 80 giờ. Đã chọn 6 story = 22 SP, giờ kế hoạch **68 giờ** (Đạt 36 giờ, tải 0,9; Chính 32 giờ, tải 0,8).

| Story | SP | Task (owner, giờ) |
|---|---|---|
| US-01 | 3 | T-01 API users và đăng ký (Đạt, 4) · T-02 form đăng ký (Chính, 3) · T-03 email xác nhận và test (Đạt, 3) |
| US-02 | 3 | T-04 login/logout/lockout API (Đạt, 4) · T-05 màn hình login/forgot (Chính, 3) · T-06 email reset và test (Đạt, 3) |
| US-05 | 3 | T-07 API danh sách, phân trang (Đạt, 3) · T-08 menu và trang catalog (Chính, 5) |
| US-06 | 5 | T-09 Search API (Đạt, 6) · T-10 UI search và filter (Chính, 6) · T-11 test hiệu năng <2s (Đạt, 2) |
| US-07 | 3 | T-12 Detail API (Đạt, 2) · T-13 trang chi tiết (Chính, 5) |
| US-08 | 5 | T-14 Create API, ISBN, upload ảnh (Đạt, 6) · T-15 form thêm sách (Chính, 5) · T-16 seed 50 sách mẫu (Chính, 2) |
| Tất cả | – | T-17 review, cross-browser, PO acceptance (cả hai, 6) |

## 6. Thiết lập PM tool [TS]
- **Công cụ:** Jira Software Cloud (gói Free), template **Scrum, team-managed**, project key **BOOK**, project "E-Commercial Book Store".
- **Đã mô tả trong tài liệu:**
  - 8 epic.
  - 23 story import từ `Team6_Jira_Backlog_Import.csv`.
  - Ánh xạ ưu tiên: Must → Highest, Should → High, Could → Medium, Won't → Low, kèm label MoSCoW.
  - Sprint 1 (2 tuần), 6 story / 22 SP, 17 task.
  - Board 3 cột To Do → In Progress → Done; burndown theo SP.
- **Còn để trống (placeholder) trong file:**
  - URL project (`https://<your-site>.atlassian.net/...`).
  - Ngày tạo (`dd/10/2026`).
  - Jira role của Chính.
  - **Toàn bộ 6 ảnh chụp màn hình.**
- Bảng checklist trong file ghi "[Done]" cho mọi bước, **nhưng chưa có ảnh làm bằng chứng**.
- Chưa có thông tin về repo Git.
