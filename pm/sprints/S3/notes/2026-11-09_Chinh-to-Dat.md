# Ghi chú gửi Đạt – Sprint 3 (Thứ Hai 09/11/2026, 23:45)

*Từ: Nguyễn Minh Chính (PO). Gửi: Hồ Du Tuấn Đạt (Leader S3). Ghi chú trước: `2026-11-08_Chinh-to-Dat.md`.*

Cảm ơn Đạt tối nay đã merge hết các PR và làm xong S3-T09 đúng interface đã thống nhất. Sprint 3 đang ở **D4/7**. Burndown thực tế còn **25.5 h**, kế hoạch là **21 h**, nên mình đã bắt kịp gần hết khoảng trễ của cuối tuần.

## 1. Việc cần làm sớm (theo thứ tự)

| # | Việc | Vì sao |
|---|---|---|
| 1 | **Approve trên GitHub, rồi merge PR #33 và PR #34** (*Files changed → Review changes → Approve → Merge*) | #33 sửa DEF-S3-02 (vùng bấm < 44 px, chỉ CSS, 99/99 test). #34 có kết quả test trên host và biên bản nghiệm thu. Tối nay #18, #20, #21, #22, #29 được merge mà **không có approve** ghi trên GitHub, nên issue I-06 vẫn còn mở; từ giờ mình approve PR của nhau trước khi merge nhé |
| 2 | **Release `develop → main`** sau khi merge #33 | Site thật vẫn chạy bản cũ (PR #26), chưa có trang chi tiết sách. Có release thì Chính mới chạy lại được TC-F2-11 (US-07) và TC-F3-06 (NFR-04), rồi nghiệm thu nốt **5 SP** mang sang từ S2 |
| 3 | **S3-T11 (ECBS-157), hôm nay Thứ Ba:** filter danh mục + khoảng giá trong `validateFilters()` / `visibleBooksWhere()`, merge và deploy **trước tối Thứ Ba** | S3-T10 của Chính (thanh lọc trên `/books`) dùng chung các tham số này. Chi tiết ở mục 3 |
| 4 | **Dọn dữ liệu test trên site thật trước UAT (13/11)** | *BOOK ADD BY STAFF* (id 33, giá 0,01 ₫) đang **hiện công khai trong cửa hàng** (trang ghi 31 titles thay vì 30). Còn lại: danh mục *Kids*, tác giả *Tuấn Đạt* và *Minh Chính*, giá/tồn kho của *Emma*, tài khoản *READER D*. Danh mục *Novel* Chính đã đổi lại (trước đó bị đổi thành *Horror*) |

## 2. Kết quả của Chính hôm nay (09/11)

| Việc | Kết quả |
|---|---|
| S3-T08 Back to list (US-11/AC-02, AC-04) | PR #29 đã merge – Done |
| S3-T03 nghiệm thu (PO), phần 1 | **US-05, US-06, US-24 Done** (13 SP), dựa trên kết quả test host của Đạt |
| Kiểm tra trên host (Admin, 23:24–23:27) | TC-F2-12 Pass · TC-F2-19 Pass · TC-F3-05 trang admin Pass ở 360/768/1280 px · TC-F3-06 **Fail** → DEF-S3-02 (Low) → PR #33 |
| S3-T03 nghiệm thu, phần 2 | **US-08, US-09 Done** (6 SP) → lũy kế **40/62 SP** |
| Còn chờ | US-07 (cần release lên `main`), NFR-04 (cần #33 + release) |

## 3. S3-T11 – để khớp với S3-T10 của Chính

Phần S3-T09 của Đạt (`listBooksPage(rawPage, rawFilters)`, `validateFilters`, `visibleBooksWhere`) đã đúng interface. Với S3-T11, Chính sẽ làm UI dựa trên các điểm sau:

- `validateFilters({ q, category, min, max })` trả về `{ filters: { q, category, min, max }, error }`.
  - `category`: id dạng số; không hợp lệ thì bỏ qua.
  - `min`, `max`: số nguyên ≥ 0, đơn vị VND; ô để trống nghĩa là không giới hạn.
  - `min > max` thì `error = "Minimum price must not exceed maximum price"` và **không áp dụng** bộ lọc giá (US-13/AC-03, TC-F5-06). Việc kiểm tra này phải chạy trên server, vì người dùng có thể gõ thẳng URL.
- Hai cận giá **tính cả bằng**: `price BETWEEN min AND max` (US-13/AC-04, TC-F5-07: min = max = 129000 → *Pride and Prejudice*).
- Bộ lọc dùng được cùng lúc với search và phân trang (TC-F5-04, TC-F5-05).
- `page.js` của `/books`: Chính sẽ truyền `params` vào `listBooksPage(params.page, params)`, thêm form lọc, giữ các tham số khi chuyển trang trong `Pagination`. Đạt không cần sửa `page.js`.

Nếu Đạt đổi tên hoặc cấu trúc trả về thì ghi vào PR S3-T11, để Chính làm theo.

## 4. Hai điều cần sửa trong cách làm

1. **Tên tác giả trong commit:** các commit code của Đạt (PR #23, #25, #30, #32) đang mang tác giả **"Claude <noreply@anthropic.com>"**. GitHub sẽ không tính các commit đó lên trang cá nhân của Đạt, trong khi rubric chấm commit đều đặn **theo từng thành viên** [03 §9.5]. Trong thư mục repo, Đạt chạy:
   ```bash
   git config user.name "Hồ Du Tuấn Đạt"
   git config user.email "tdat.100524@gmail.com"   # email đã gắn với GitHub (commit "Teichi" trong PR #30)
   ```
   Kiểm tra lại bằng `git log -1 --format='%an <%ae>'`.
2. **Bản preview dùng chung database với site thật:** Đạt đã ghi nhận việc này trong `test-cases-F2F3.md`. Vì vậy, mọi PR có migration đều chạy migration lên dữ liệu thật. Trước UAT nên tách `DATABASE_URL` của môi trường Preview trên Vercel, hoặc ít nhất ghi việc này thành một rủi ro trong Weekly Status S3 (S3-T17).

## 5. Lịch còn lại của Đạt

| Ngày | Task | Jira | Giờ (plan) |
|---|---|---|---|
| Tue 10/11 | S3-T11 Filter category + giá + test, merge và deploy | ECBS-157 | 2.5 |
| Wed 11/11 | S3-T16 Regression F1–F3 · S3-T17 Weekly Status S3 + risk/issue | ECBS-162, 163 | 1.5 + 1 |
| Thu 12/11 | S3-T19 Release v1.0 · S3-T21 EVM + c3_S3 · S3-T22 c2_S3 + c0_S3 + **nộp trước 23:59** | ECBS-165, 167, 168 | 1.5 + 1.5 + 1.5 |
| Mỗi ngày | Daily ≤ 10 phút trên Discord, log vào `daily-log.md` | ECBS-174…176 | 0.25 mỗi người |

Lịch của Chính ngày mai: S3-T10 (thanh lọc trên `/books`) và S3-T12 (UAT script phần 1).
