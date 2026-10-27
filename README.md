# E-Commercial Book Store – Release 1.0 · Team 6 "Page Turners"

Final Project môn Software Project Management (72ITSE41503), Trường ĐH Văn Lang, HK261.
Release 1.0 – Book Catalogue (F1–F5), 3 Sprint từ 23/10 đến 17/11/2026.

## Bắt đầu nhanh cho thành viên

```bash
git clone https://github.com/Tdat10052499/E-Commercial-Book-Store.git
cd E-Commercial-Book-Store
git checkout develop        # nhánh tích hợp
claude                      # mở Claude Code trong thư mục repo
```

Rồi hỏi Claude: **"Tôi cần làm gì?"** (hoặc gõ `/next`).
Claude sẽ đọc `CLAUDE.md` và `plan/`, chọn phase phù hợp với ngày hôm nay và vai trò của bạn, trình bày các bước, rồi làm luôn phần Claude làm được. Xong phase, hỏi **"làm gì tiếp theo?"** để chuyển sang phase kế.

| Lệnh | Tác dụng |
|---|---|
| `/next` | Chọn và thực hiện phase tiếp theo |
| `/next plan` | Chỉ xem kế hoạch phase tiếp theo, không thực hiện |
| `/next P15` | Làm một phase cụ thể (kể cả làm trước tiến độ nếu đủ điều kiện) |
| `/status` | Báo cáo tiến độ so với lịch |

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `plan/` | `ROADMAP.md` (phase theo ngày), `STATUS.md` (trạng thái), `INPUTS.md` (dữ liệu con người cung cấp) |
| `docs/knowledge/` | Đề Final Project, Change Request CR-06, gap analysis, baseline |
| `pm/` | Bản nguồn Markdown của hồ sơ PM (PMP, backlog, Sprint, CR, UAT, Final Report) |
| `deliverables/` | File nộp `HK261_SPM_FP_Team6_*` theo từng đợt |
| `app/` | Mã nguồn website |

## Quy tắc Git
Không commit thẳng vào `main`. Làm trên `feat/Pxx-…` hoặc `docs/Pxx-…`, mở PR vào `develop`, thành viên còn lại review. Commit theo Conventional Commits. Chi tiết ở `CLAUDE.md` §5.
