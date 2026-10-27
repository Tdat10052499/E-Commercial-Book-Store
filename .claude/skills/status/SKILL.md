---
name: status
description: Báo cáo tiến độ Final Project Team 6 so với lịch (phase xong, đang làm, quá hạn, hạn sắp tới, dữ liệu còn thiếu). Dùng khi thành viên hỏi "tiến độ thế nào", "status", "còn bao nhiêu việc".
---

# Skill `status` – báo cáo tiến độ

1. `git fetch origin`, đọc `plan/STATUS.md`, `plan/ROADMAP.md`, `plan/INPUTS.md` trên nhánh `develop` mới nhất.
2. Lấy ngày giờ GMT+7: `TZ=Asia/Ho_Chi_Minh date`.
3. Báo cáo bằng tiếng Việt, gọn:
   - Sprint hiện tại, Leader, hạn nộp gần nhất và số giờ còn lại.
   - Số phase `done` / tổng; phase `in_progress` (ai làm); phase **quá hạn**; phase `blocked` và lý do.
   - Phase đến hạn trong 48 giờ tới.
   - Phase có thể làm trước tiến độ (đủ phụ thuộc, gate không phải `EVENT`).
   - Các ô `TBD` trong `plan/INPUTS.md` mà phase sắp tới cần.
   - Nhắc việc liên tục: Daily log, giờ thực tế trên Jira, burndown.
4. Đánh giá trạng thái Green / Amber / Red cho schedule theo quy tắc: Red nếu có phase nộp bài quá hạn; Amber nếu có phase quá hạn khác hoặc phase nộp bài còn <24 giờ mà phụ thuộc chưa xong; còn lại Green. Ghi rõ đây là đánh giá theo roadmap, không phải số liệu EVM.
5. Không sửa file nào. Đề xuất chạy `next` nếu người dùng muốn làm tiếp.
