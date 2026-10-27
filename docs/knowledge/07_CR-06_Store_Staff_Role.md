# 07 – Change Request CR-06: Bổ sung vai trò Store Staff

*Nguồn: `HK261_SPM_FP_ChangeRequests_AllTeam.pdf`, trang 12–13, GV phát hành Thứ Ba 27/10/2026. Trích phần của Team 6. Gọi tắt là `[CR-06]`.*

| Mục | Nội dung |
|---|---|
| Mã CR | CR-06 |
| Nhóm | Team 6 |
| Ngày phát hành | Thứ Ba 27/10/2026 (giữa Sprint 1) |
| Người yêu cầu | Sponsor – bà Lê (chủ công ty sách) |
| Chức năng bị ảnh hưởng | F1, F2 |
| Ưu tiên theo khách hàng | Cao / High |
| Hạn xử lý | Change Log: 23:59 29/10 · Họp CCB: 30/10 · Nộp phiếu: 23:59 05/11 |

## §1. Nội dung yêu cầu
- Bổ sung vai trò thứ ba **"Nhân viên cửa hàng" (Store Staff)**: được **thêm, sửa** thông tin sách và **quản lý danh mục (category), tác giả (author)**; **không được xóa sách** và **không được truy cập chức năng quản lý tài khoản**. Quản trị viên gán vai trò cho tài khoản.
- Mỗi đầu sách ghi nhận **người cập nhật và thời điểm cập nhật gần nhất**; thông tin này hiển thị trong trang quản trị sách.

## §2. Lý do kinh doanh
Nhân viên các cửa hàng cập nhật sách hằng ngày, nhưng chủ công ty không muốn cấp quyền quản trị đầy đủ cho nhân viên.

## §3. Tiêu chí chấp nhận khách hàng đề xuất
| AC | Nội dung |
|---|---|
| AC1 | Given tài khoản Staff, When thêm một đầu sách hợp lệ, Then sách được lưu thành công. |
| AC2 | Given tài khoản Staff, When thực hiện xóa sách, Then thao tác bị từ chối (không có nút xóa hoặc thông báo không đủ quyền). |
| AC3 | Given tài khoản Staff, When truy cập trang quản lý tài khoản, Then bị từ chối truy cập. |
| AC4 | Given quản trị viên đổi vai trò một tài khoản từ Khách hàng sang Staff, When tài khoản đó đăng nhập lại, Then có đúng quyền của Staff. |
| AC5 | Given Staff sửa một sách, When mở trang quản trị sách đó, Then hiển thị "Cập nhật lần cuối bởi <tên> lúc <thời gian>". |

## §4. Thông tin bổ sung từ khách hàng
- F1 đã được bàn giao trong Sprint 1; thay đổi này **tác động lên phần đã đạt Definition of Done** (impact analysis phải tính rework và regression).
- Khách hàng muốn thay đổi này có trong **Release 1.0**.

## §5. Nhóm cần thực hiện
1. **Ghi nhận:** ghi CR vào Change Log (sheet `ChangeLog` của Workbook) trước 23:59 Thứ Năm 29/10.
2. **Phân tích tác động:** scope, schedule, cost, quality, risk; định lượng bằng Story Point (Planning Poker), giờ công, chi phí (200.000 VND/giờ công) và mốc thời gian.
3. **Họp CCB:** đề xuất **ít nhất 2 phương án**, trình bày tại buổi họp CCB Thứ Sáu 30/10. Sponsor quyết định Approve / Reject / Defer.
4. **Cập nhật baseline** (nếu được duyệt): Product Backlog, AC, Release Plan (PSP, BAC), risk register và tạo tag cấu hình.
5. **Nộp phiếu:** `HK261_SPM_FP_Team#_c4_ChangeRequest_CR01.docx` theo biểu mẫu `FP_Template_ChangeRequest.docx`, ghi đúng mã CR của nhóm, cùng bài Sprint 2, hạn 23:59 Thứ Năm 05/11.

## Điểm chưa rõ (cần hỏi GV, ghi lại câu trả lời vào `plan/INPUTS.md`)
1. Tên file: giữ `CR01` theo phiếu hay đổi thành `CR06` theo mã nhóm.
2. "Quản lý category, author" của Staff có gồm xóa không.
3. Khi Admin đổi vai trò, phiên đăng nhập đang mở có bị thu hồi ngay không (AC4 chỉ nói "đăng nhập lại").
4. Có cần tài khoản demo Staff trong Final Report không (đề chỉ yêu cầu admin và customer).
