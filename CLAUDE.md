# CLAUDE.md – Team 6 "Page Turners" · Final Project SPM (72ITSE41503)

Repo này chứa **cả phần mềm lẫn hồ sơ quản lý dự án** của Final Project *E-Commercial Book Store – Release 1.0 (F1–F5)*, 3 Sprint từ 23/10 đến 17/11/2026, GV TS. Bùi Minh Phụng đóng vai Sponsor/Customer.

Đồ án chấm **năng lực quản lý dự án**; phần mềm là bằng chứng kế hoạch đã được thực thi và kiểm soát [03 §2].

## 1. Khi thành viên hỏi "cần làm gì?" / "làm gì tiếp theo?"

Luôn làm theo skill **`next`** (`.claude/skills/next/SKILL.md`). Tóm tắt:

1. `git pull` nhánh `develop` (hoặc nhánh mặc định nếu `develop` chưa có).
2. Lấy ngày giờ hiện tại theo **GMT+7** (`TZ=Asia/Ho_Chi_Minh date`).
3. Đọc `plan/STATUS.md`, `plan/ROADMAP.md`, `plan/INPUTS.md`.
4. Chọn phase theo quy tắc ở `plan/ROADMAP.md` §"Quy tắc chọn phase" (ưu tiên: phase đang dở của chính người hỏi → phase quá hạn → phase sớm hạn nhất đã đủ phụ thuộc; được **làm trước tiến độ** nếu phụ thuộc và gate cho phép).
5. Trình bày ngắn: phase nào, vì sao, các bước, bước nào Claude làm và bước nào cần con người.
6. **Thực hiện ngay** các bước Claude làm được trong cùng lượt; dừng lại hỏi khi cần dữ liệu con người.
7. Cập nhật `plan/STATUS.md`, ghi `pm/ai-usage-log.md`, commit theo convention, push, mở PR vào `develop`.

Thành viên muốn chọn phase khác: "làm P15" hoặc `/next P15`. Chỉ xem kế hoạch, không thực hiện: `/next plan`. Xem tiến độ tổng: `/status`.

## 2. Nguồn sự thật (đọc trước khi soạn bất cứ gì)

| File | Nội dung |
|---|---|
| `docs/knowledge/03_Final_Project_Spec.md` | **Đề Final Project – chuẩn cao nhất.** Phạm vi F1–F5, lịch, sản phẩm nộp §7, rubric §9, EVM |
| `docs/knowledge/07_CR-06_Store_Staff_Role.md` | Change Request của Team 6 |
| `docs/knowledge/05_Gap_Analysis_TA_to_FP.md` | Mâu thuẫn giữa sản phẩm cũ và đề, việc phải sửa |
| `docs/knowledge/04_Team6_Baseline.md` | Thành viên, Product Backlog v0, DoD cũ, Jira |
| `docs/knowledge/06_Status_and_Deadlines.md` | Trạng thái nộp eLearning, lịch hạn, chỗ lệch cần hỏi GV |
| `docs/knowledge/01_…`, `02_…` | Tổng quan môn, đề Lab và bài tập (mẫu DoD, AC, Planning Poker) |
| `plan/INPUTS.md` | **Dữ liệu do con người cung cấp**: capacity, giờ thực tế, velocity, quyết định CCB, URL… |

Trích dẫn nguồn theo dạng `[03 §6.1]`, `[CR-06 §3]`, `[05 #13]`. Nếu tài liệu không có thông tin: nói rõ "chưa có trong tài liệu" và hỏi.

## 3. Nguyên tắc bắt buộc

1. **Đề `03` là chuẩn cao nhất.** Sản phẩm cũ mâu thuẫn thì theo đề và ghi vào version history.
2. **Không bịa dữ liệu thực tế.** Tuyệt đối không tự điền: giờ thực tế (Completed Work trên Jira), velocity thực tế, phiếu Planning Poker, quyết định CCB, góp ý GV, kết quả UAT, điểm đánh giá thành viên. Thiếu thì để `TBD – cần nhập vào plan/INPUTS.md` và hỏi người dùng.
3. **Phân biệt kế hoạch và thực tế** trong mọi bảng số liệu.
4. **Nhất quán số liệu** SP, giờ, velocity, BAC, EVM giữa Workbook (c2), Sprint Report (c3), Final Report (c6), slide. Đơn giá **200.000 VND/giờ**, **N = 3**. Trình bày công thức và giả định.
5. **Định dạng:** User Story *As a… I want… so that…*; AC **Given–When–Then** phủ main, exception, boundary, đánh số `US-xx / AC-0n`; MoSCoW; Fibonacci SP có Planning Poker log; tài liệu kế thừa có **bảng version history**.
6. **Đội 2 người làm đủ F1–F5**, không cắt tính năng; điều chỉnh bằng capacity và Release Plan.
7. **Liêm chính:** AI chỉ hỗ trợ. Mỗi lần Claude soạn nội dung, ghi 1 dòng vào `pm/ai-usage-log.md` (ngày, người, công cụ, mục đích, file bị ảnh hưởng) để làm phụ lục khai báo AI trong Final Report. Nhắc người dùng đọc và hiểu nội dung trước khi merge.
8. **Ngôn ngữ:** trao đổi bằng tiếng Việt, giữ thuật ngữ PM tiếng Anh. Sản phẩm nộp mặc định tiếng Anh.
9. **Ngoài phạm vi Release 1.0:** giỏ hàng, thanh toán, social login [03 §2.2].

## 4. Cấu trúc repo

```
CLAUDE.md                 ← file này
plan/ROADMAP.md           ← các phase P00–P36 theo ngày, phụ thuộc, gate
plan/STATUS.md            ← trạng thái từng phase (cập nhật sau mỗi phase)
plan/INPUTS.md            ← dữ liệu con người cung cấp
docs/knowledge/           ← tài liệu nguồn (đề, CR, gap analysis…)
pm/                       ← bản nguồn Markdown của hồ sơ PM (soạn ở đây trước)
  pmp/                    ← PMP 7 phần
  backlog/                ← Product Backlog, Planning Poker log, DoR
  plan/                   ← Release Plan, capacity, BAC
  change/                 ← Change Log, CR-06, impact analysis
  sprints/S1|S2|S3/       ← Sprint Backlog, Daily log, test case, Review/Retro, Status
  uat/                    ← UAT script, biên bản
  final/                  ← Final Report, Lessons Learned, slide outline
  ai-usage-log.md         ← nhật ký sử dụng AI
deliverables/S1|S2|S3|Final/ ← file nộp .docx/.xlsx/.pptx đã đặt tên chuẩn
app/                      ← mã nguồn website (stack chốt ở P04)
.claude/skills/           ← skill `next`, `status`
```

**Tên file nộp:** tiền tố `HK261_SPM_FP_Team6_` + tên theo [03 §7], ví dụ `HK261_SPM_FP_Team6_c3_SprintReport_S1.docx`. File Excel nộp **lũy kế**. Không zip.

**Sinh file nộp:** soạn nội dung trong `pm/` (Markdown) → xuất ra `deliverables/` bằng skill docx/xlsx/pptx nếu có, hoặc script Python (`python-docx`, `openpyxl`) / `pandoc`. Nếu GV phát template (`FP_Template_*.docx/xlsx`) thì đặt vào `docs/templates/` và dùng template.

## 5. Quy trình Git (được chấm ở tiêu chí S5)

- `main`: chỉ nhận merge từ `develop` khi phát hành; gắn tag (`baseline-v1.0`, `v1.0`…). **Không commit thẳng vào `main`** [03 §4.2].
- `develop`: nhánh tích hợp. Mọi thay đổi vào qua PR.
- Nhánh làm việc: `feat/Pxx-<mô-tả>` (code), `docs/Pxx-<mô-tả>` (hồ sơ PM), `fix/<mô-tả>`.
- **PR phải được thành viên còn lại review** trước khi merge. Mô tả PR ghi phase `Pxx` và AC liên quan.
- **Conventional Commits**: `feat(F1): add login API`, `docs(pmp): draft risk register`, `fix(F3): pagination off-by-one`, `chore(plan): mark P05 done`. Thêm dòng `Refs: Pxx`.
- Mỗi thành viên commit **đều đặn trong cả 3 Sprint** (commit dồn cục chỉ đạt Satisfactory; không có commit thì A = 0) [03 §9.5, Phụ lục A].
- Commit do Claude hỗ trợ vẫn đứng tên thành viên; thêm trailer `Co-Authored-By` nếu công cụ tự thêm.

## 6. Thành viên và vai trò (dự kiến – chốt ở P01, ghi vào `plan/INPUTS.md`)

| Thành viên | Thế mạnh (theo TA) | Vai trò Final Project (dự kiến) |
|---|---|---|
| Hồ Du Tuấn Đạt (GitHub `Tdat10052499`) | Backend, database, tích hợp | Developer · **Leader S1 và S3** |
| Nguyễn Minh Chính | User flow, catalog UI | **Product Owner** + Developer · **Leader S2** |

Quy tắc nhóm 2 người: PO lead S2, người còn lại lead S1 và S3 [03 §4.1]. Xác định người đang dùng Claude qua `git config user.name` / `user.email`; nếu không rõ thì hỏi.
