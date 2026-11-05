"""Export the Sprint 2 deliverables [03 §7].

Usage: python3 tools/export_s2.py   (needs pandoc, python-docx, openpyxl, matplotlib)

Outputs (deliverables/S2/, prefix HK261_SPM_FP_Team6_):
  c2_SprintBacklog_S2.xlsx    cumulative workbook: S1 sheets + updated baseline sheets + S2 sheets
  c3_SprintReport_S2.docx     lecturer Review/Retro template + Part IV Sprint 2 data
  c4_ChangeRequest_CR01.docx  CR-06 form, impact analysis, CCB decision, baseline update
  c0_Eval_S2.xlsx             Leader S2 evaluation (workload filled, scores left to the Leader)

Only planned or recorded data is filled in; meeting records, hours and scores stay TBD (team rule: actual data is never invented).
Re-run after updating the Markdown sources (e.g. hours from Jira) to refresh every file.
"""
import copy
import re
import subprocess
import sys
from pathlib import Path

import docx
from docx.oxml.ns import qn
from docx.shared import Cm
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill

sys.path.insert(0, str(Path(__file__).resolve().parent))
import burndown_s2  # noqa: E402
import docx_style  # noqa: E402
import workbook_style  # noqa: E402
from export_s1 import add_sheet  # noqa: E402
from export_s1_templates import (PO, LEADER, TBD, TEAM, TPL, _body_md, _fill_rows, _md_into,  # noqa: E402
                                 set_cell)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "deliverables" / "S2"
PREFIX = "HK261_SPM_FP_Team6_"
DAT, CHINH = LEADER[1], PO[1]

# Planned task hours per owner, S2 Sprint Backlog v1.0 ("Both" tasks split half)
PLAN_HOURS = {DAT: 16.25, CHINH: 23.5}
PLAN_TOTAL = 39.75

# Committed items: ID, title, SP, ACs, automated TC result, DoD, Done/Not Done (status 05/11 00:30)
ITEMS = [  # ID, title, SP, AC passed, TC passed (local + hosted), DoD met?, Done/Not Done, demo by – status 05/11 23:59
    ("US-05", "Add book", 5, "4/4", "4/4 auto · hosted TBD", "No – hosted admin run", "Not Done (In Review)", "Đạt"),
    ("US-06", "Edit book", 3, "4/4", "4/4 auto · hosted TBD", "No – hosted admin run", "Not Done (In Review)", "Đạt"),
    ("US-07", "Hide (soft delete) book", 2, "2/3", "2/3 auto (AC-02 e2e, AC-03 in S3)", "No", "Not Done (In Review)", "Đạt"),
    ("US-08", "Manage categories", 3, "5/5", "5/5 auto · hosted TBD", "No – hosted admin run", "Not Done (In Review)", "Chính"),
    ("US-09", "Manage authors", 3, "4/4", "4/4 auto · hosted TBD", "No – hosted admin run", "Not Done (In Review)", "Chính"),
    ("NFR-02", "Sample data ≥ 30 books", 2, "2/2", "2/2 auto · 2/2 hosted", "Yes", "Done", "Chính"),
    ("US-10", "Book grid 12/page, newest first", 3, "4/4", "4/4 auto · 3/3 hosted (AC-04 auto only)", "Yes", "Done", "Chính"),
    ("NFR-04", "Responsive UI", 3, "2/2", "2/2 on /books · admin pages TBD", "No – admin pages", "Not Done (In Review)", "Chính"),
    ("US-24", "Store Staff role (CR-06)", 5, "5/5", "5/5 auto (data layer, matrix) · hosted TBD", "No – hosted Staff run", "Not Done (In Review)", "Đạt"),
]

UNDONE = [
    ("US-05, US-06, US-07, US-24 (15 SP)", "Built and deployed 05/11 22:52; hosted admin/Staff run not done; US-07/AC-02 e2e not run",
     "F2 book screens and CR code started late (I-02); testing left to the last hour", "Hosted run at Review 2; carried into Sprint 3 until accepted"),
    ("US-08, US-09, NFR-04 (9 SP)", "Hosted run of the admin pages not done (needs an Admin login)",
     "Admin run planned in S2-T23 but not reached", "Run at Review 2 / start of S3; then PO acceptance"),
    ("US-07/AC-03", "Friendly 'not found' for a hidden book's detail URL", "Detail page is US-11 (Sprint 3)", "Tested with US-11 in S3"),
    ("NFR-01, NFR-03 (F1, 4 SP)", "TC-F1-19 (hash in the hosted DB) and TC-F1-24 (online on 17/11) not run",
     "Needs Supabase access; date-bound", "Đạt shows the hash; TC-24 on 17/11. US-01…04 (14 SP) accepted 05/11"),
]

PREV_ACTIONS = [
    ("A1 Daily Scrum logged every working day before 22:00 (proposed in Retro 1 record)", "Leader S2",
     "Not Done – 1 entry (Chính, 05/11); channel not agreed (I-05)", "pm/sprints/S2/daily-log.md"),
    ("A2 Draft Sprint files by Wednesday 20:00, submit Thursday before 21:00", "Leader S2",
     "Partly – files drafted Wed 04/11 late evening; final update after the Sprint end", "deliverables/S2 commits 04–06/11"),
    ("A3 Log Completed Work in Jira the same day a task moves", "Both",
     "Partly – Chính logged 10.5 h on 05/11; Đạt's hours not logged; cards moved late (I-06)", "Jira sprint 6"),
]

ACTIONS_PROPOSED = [
    ("Each member moves their Jira card and logs Completed Work before 22:00 on every working day (proposed)",
     "Leader S3 (Đạt)", "Each day of S3", "Burndown of S3 has no flat segment longer than 1 day"),
    ("Merge a reviewed PR at least every 2 days, so items reach the DoD before Thursday (proposed)", "Both",
     "09/11 and 11/11", "≥ 2 S3 items Done before 11/11"),
    ("Hold a real Planning Poker round for US-25 and the S3 items and log the votes (I-04) (proposed)", "PO",
     "06/11 Planning 3", "Votes in planning-poker-log.md"),
]

BURNDOWN_NOTE = (
    "Explanation: remaining work = plan hours of S2 tasks that are not Done; a task is Done when its work is merged "
    "into develop (the story is accepted separately by the PO). The line stays at 39.75 h until 03/11 because no S2 "
    "task was finished, drops to 30.75 h on 04/11 (CR-06 rebaseline, c4, Weekly Status, CR documentation, F2/F3 test "
    "cases) and to 6.25 h on 05/11, when PR #8 (12:55) and PR #11/#12 (22:52) were merged and the public pages were "
    "tested on the host. The 6.25 h left are T01 (Retro 1 notes), T02 (Daily log), T06 (upload) and T23 (hosted admin "
    "run). The S2 tasks were entered in Jira only on 05/11, so days 1–4 are reconstructed from the repo (A3 not met)."
)

C3_PARTS = [
    ("Sprint status (Green / Amber / Red), EVM and change control", "pm/sprints/S2/sprint-report.md"),
    ("Sprint Planning 2 – S2_Backlog", "pm/sprints/S2/sprint-backlog.md"),
    ("Daily Scrum log", "pm/sprints/S2/daily-log.md"),
    ("Test cases F2, F3 (from Acceptance Criteria)", "pm/sprints/S2/test-cases-F2F3.md"),
    ("Weekly Status Report", "pm/sprints/S2/weekly-status.md"),
    ("Jira board snapshot (Sprint end)", "pm/sprints/S2/jira-snapshot-2026-11-06.md"),
]


# ---------------------------------------------------------------- c2 workbook
def _replace_sheet(wb, name, path, **kw):
    idx = wb.sheetnames.index(name) if name in wb.sheetnames else len(wb.sheetnames)
    if name in wb.sheetnames:
        del wb[name]
    ws = add_sheet(wb, name, path, **kw)
    wb.move_sheet(ws, offset=idx - wb.sheetnames.index(name))
    return ws


def _insert_after(wb, after, ws):
    wb.move_sheet(ws, offset=(wb.sheetnames.index(after) + 1) - wb.sheetnames.index(ws.title))


SHEETS = [  # name, source, subtitle, options
    ("ProductBacklog", "pm/backlog/product-backlog.md", "Release 1.0 items, MoSCoW, story points and acceptance criteria (Given–When–Then). Baseline v1.1: PSP 62 SP", {}),
    ("DoR", "pm/backlog/definition-of-ready.md", "Checks an item must pass before it enters a Sprint", {}),
    ("PlanningPoker", "pm/backlog/planning-poker-log.md", "Estimation log – Sessions 1–2 (PO estimates) and Session 3 prepared for Planning 3", {}),
    ("ReleasePlan", "pm/pmp/03-master-release-plan.md", "Milestones, Sprint plan, capacity, BAC and baselines – Release Plan v1.3", {}),
    ("S1_Backlog", "pm/sprints/S1/sprint-backlog.md", "Sprint 1 (23/10 – 29/10/2026), Leader Hồ Du Tuấn Đạt", {}),
    ("S2_Backlog", "pm/sprints/S2/sprint-backlog.md", "Sprint 2 (30/10 – 05/11/2026), Leader Nguyễn Minh Chính – status at the Sprint end", {}),
]
SHEETS_AFTER = [
    ("RiskRegister", "pm/pmp/05-risk-plan.md", "Risk register v1.2 – P × I, strategy, owner, trigger, status", {"sections": ["5.1", "5.2"]}),
    ("IssueLog", "pm/pmp/05-risk-plan.md", "Risks that occurred and the actions taken", {"sections": ["5.3"]}),
    ("ChangeLog", "pm/change/change-log.md", "All change requests and their CCB decisions", {}),
    ("CR06_Impact", "pm/change/CR-06-change-request-form.md", "CR-06 Store Staff role – form, impact, options, CCB decision, baseline update", {}),
    ("ConfigItems", "pm/pmp/06-configuration-management.md", "Configuration items, branching, baselines and tags", {}),
    ("TestCases_F1", "pm/sprints/S1/test-cases-F1.md", "F1 test cases from the ACs – automated and hosted results", {}),
    ("TestCases_F2F3", "pm/sprints/S2/test-cases-F2F3.md", "F2, F3 and CR-06 test cases from the ACs, F1 regression – results at the Sprint end", {}),
    ("WeeklyStatus_S2", "pm/sprints/S2/weekly-status.md", "Weekly Status Report, week 2 (Green / Amber / Red)", {}),
]
INDEX = [
    ("ProductBacklog", "Product Backlog v1.3 with all acceptance criteria"), ("DoR", "Definition of Ready"),
    ("PlanningPoker", "Planning Poker / estimation log"), ("ReleasePlan", "Master and Release Plan v1.3 (PSP 62 SP, BAC 26.4 M VND)"),
    ("S1_Backlog", "Sprint 1 Backlog"), ("S2_Backlog", "Sprint 2 Backlog – tasks, owners, plan and actual hours, result per item"),
    ("Burndown_S1", "Sprint 1 burndown"), ("Burndown_S2", "Sprint 2 burndown"),
    ("EVM_S1", "EVM snapshot end of Sprint 1 (baseline v1.0)"), ("EVM_S2", "EVM snapshot end of Sprint 2 (baseline v1.1)"),
    ("RiskRegister", "Risk register"), ("IssueLog", "Issue log"), ("ChangeLog", "Change Log"),
    ("CR06_Impact", "CR-06 change request, impact analysis, CCB decision"), ("ConfigItems", "Configuration items"),
    ("TestCases_F1", "Test cases F1"), ("TestCases_F2F3", "Test cases F2, F3, CR-06 + F1 regression"),
    ("WeeklyStatus_S2", "Weekly Status Report (Sprint 2)"),
]


def _index_sheet(wb):
    from openpyxl.styles import Alignment as Al
    ws = wb.create_sheet("Index", 0)
    navy = workbook_style.NAVY
    ws["A1"] = "E-Commercial Book Store – Release 1.0 · Project Workbook"
    ws["A1"].font = Font(name="Calibri", size=16, bold=True, color=navy)
    meta = [("Team", "Team 6 – Page Turners"), ("Course", "Software Project Management (72ITSE41503), HK261 – Final Project"),
            ("Sponsor / Customer", "Dr. Bùi Minh Phụng (Ms. Le)"),
            ("Members", "Hồ Du Tuấn Đạt (2374802010097) – Leader S1, S3 · Nguyễn Minh Chính (2275106050051) – PO, Leader S2"),
            ("Version", "Sprint 2 submission – cumulative (contains every Sprint 1 sheet)"), ("Data as of", "05/11/2026 23:59 (end of Sprint 2)"),
            ("Jira board", "https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2"),
            ("Repository", "https://github.com/Tdat10052499/E-Commercial-Book-Store"), ("Hosted site", "https://pagetunnel.vercel.app/"),
            ("Convention", "Figures marked (plan) are planning values; actual figures come from Jira and the repository; TBD = not available yet")]
    r = 3
    for k, v in meta:
        ws.cell(r, 1, k).font = Font(name="Calibri", size=10, bold=True)
        ws.cell(r, 2, v).font = Font(name="Calibri", size=10)
        r += 1
    r += 1
    ws.cell(r, 1, "Sheets").font = Font(name="Calibri", size=12, bold=True, color=navy)
    r += 1
    for j, (a, b) in enumerate([("Sheet", "Content")] + INDEX):
        c1, c2 = ws.cell(r, 1, a), ws.cell(r, 2, b)
        for c in (c1, c2):
            c.border = workbook_style.BORDER
            c.alignment = Al(vertical="top", wrap_text=True)
            c.font = Font(name="Calibri", size=10, bold=j == 0, color="FFFFFF" if j == 0 else "000000")
            if j == 0:
                c.fill = workbook_style.HEAD_FILL
        if j:
            c1.hyperlink = f"#'{a}'!A1"
            c1.font = Font(name="Calibri", size=10, color="1F5FA8", underline="single")
        r += 1
    ws.column_dimensions["A"].width = 20
    ws.column_dimensions["B"].width = 100
    ws.sheet_view.showGridLines = False
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    return ws


def _copy_cells(src, dst):
    for row in src.iter_rows():
        for c in row:
            if c.value is not None:
                dst.cell(c.row, c.column, c.value)
    for k, dim in src.column_dimensions.items():
        dst.column_dimensions[k].width = dim.width


def _notes(ws, first_row, last_col, chars_per_line=110):
    """Long text rows under a table: merged across the table width, wrapped, height to fit."""
    for r in range(first_row, ws.max_row + 1):
        c = ws.cell(r, 1)
        if isinstance(c.value, str) and len(c.value) > 30:
            ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=last_col)
            c.alignment = Alignment(wrap_text=True, vertical="top")
            c.font = Font(name="Calibri", size=10)
            c.border = Border()
            ws.row_dimensions[r].height = 15 * (len(c.value) // chars_per_line + 1) + 2


def c2_workbook():
    from openpyxl import Workbook
    from openpyxl.drawing.image import Image as XLImage
    s1 = load_workbook(ROOT / "deliverables" / "S1" / f"{PREFIX}c2_SprintBacklog_S1.xlsx")
    wb = Workbook()
    wb.remove(wb.active)
    for name, src, sub, opt in SHEETS:
        workbook_style.md_sheet(wb, name, ROOT / src, subtitle=sub, **opt)

    # Burndown S1 – data as in the S1 submission, chart as image
    b1 = wb.create_sheet("Burndown_S1")
    _copy_cells(s1["Burndown"], b1)
    b1.insert_rows(1, 2)
    b1.insert_rows(10)
    b1["A1"] = "Sprint 1 burndown (Jira ECBS, hours)"
    workbook_style.style_table_sheet(b1, header_row=3, last_col=4)
    for col, w in zip("ABCD", (6, 16, 30, 24)):
        b1.column_dimensions[col].width = w
    _notes(b1, 11, 4, chars_per_line=80)
    img1 = XLImage(str(ROOT / "pm" / "sprints" / "S1" / "evidence" / "burndown-S1.png"))
    img1.width, img1.height = 750, 380
    b1.add_image(img1, "G3")

    b2 = wb.create_sheet("Burndown_S2")
    b2["A1"] = "Sprint 2 burndown (plan vs remaining, hours)"
    b2.append([])
    b2.append(["Day", "Date", f"Ideal remaining (h, plan: {PLAN_TOTAL} h → 0)", "Remaining by task status (h)", "Note"])
    for i, (d, ideal, act) in enumerate(zip(burndown_s2.DAYS, burndown_s2.IDEAL, burndown_s2.ACTUAL)):
        note = {3: "T03, T04, T05, T21, T22 Done (9 h)", 4: "PR #8, #11, #12 merged; T07–T20 Done; left: T01, T02, T06, T23"}.get(i, "No S2 task Done")
        b2.append([i + 1, d, ideal, act if act is not None else TBD, note])
    workbook_style.style_table_sheet(b2, header_row=3, last_col=5)
    b2.append([])
    b2.append(["Remaining = plan hours of S2 tasks not Done; a task is Done when its work is merged into develop. "
               "The S2 tasks were entered in Jira on 05/11, so days 1–4 are reconstructed from completion evidence; day 5 from the merged PRs."])
    for col, w in zip("ABCDE", (6, 12, 30, 28, 46)):
        b2.column_dimensions[col].width = w
    _notes(b2, 10, 5)
    img = XLImage(str(ROOT / "pm" / "sprints" / "S2" / "evidence" / "burndown-S2.png"))
    img.width, img.height = 750, 380
    b2.add_image(img, "G3")

    # EVM S1 – the snapshot submitted in Sprint 1, same cells and formulas
    e1 = wb.create_sheet("EVM_S1")
    _copy_cells(s1["EVM"], e1)
    workbook_style.style_table_sheet(e1, header_row=4, last_col=3)
    for r in range(5, 22):
        e1.cell(r, 2).number_format = "#,##0.00" if r in (18, 19) else ("#,##0" if r in (6, 7, 13, 14, 15, 16, 17, 20, 21) else "General")
    e1.column_dimensions["A"].width = 40
    e1.column_dimensions["B"].width = 24
    e1.column_dimensions["C"].width = 70
    _notes(e1, 23, 3, chars_per_line=120)

    evm = wb.create_sheet("EVM_S2")
    rows = [
        ("EVM snapshot – Sprint 2 (n = 2, N = 3), baseline v1.1, data as of the Sprint end, 05/11/2026 23:59", None, None),
        ("Formulas per the Final Project brief (AgileEVM). Plan values from Release Plan v1.3; actuals from Jira.", None, None),
        (None, None, None),
        ("Input / metric", "Value", "Formula / source"),
        ("Planned hours of the release (h, plan)", 132, "Release Plan v1.3: 120 h + 12 h CR-06"),
        ("Rate (VND/h)", 200000, "Final Project brief"),
        ("BAC (VND)", "=B5*B6", "Planned hours × rate"),
        ("PSP (SP, plan)", 62, "Product Backlog (baseline v1.1)"),
        ("n (Sprints completed)", 2, None),
        ("N (Sprints planned)", 3, None),
        ("SP meeting DoD (cumulative)", 19, "F1: US-01…04 (14 SP); S2: US-10, NFR-02 (5 SP) accepted by the PO 05/11 23:59"),
        ("Actual hours S1 (h)", 41, "Jira Time spent ECBS-90…103 (19.5 h logged 02/11 + 21.5 h on S1-T12 logged 05/11)"),
        ("Actual hours S2 (h)", 10.5, "Jira Time spent ECBS-124…146: Chính 10.5 h; Đạt's S2 hours not logged yet (add them here)"),
        ("Actual hours (cumulative, h)", "=B12+N(B13)", "S1 + S2"),
        ("PV (VND)", "=B7*B9/B10", "BAC × n / N"),
        ("EV (VND)", "=B7*B11/B8", "BAC × SP done / PSP"),
        ("AC (VND)", "=B14*B6", "Actual hours × rate"),
        ("SV (VND)", "=B16-B15", "EV − PV"),
        ("CV (VND)", "=B16-B17", "EV − AC"),
        ("SPI", '=IF(B15=0,"n/a",B16/B15)', "EV / PV"),
        ("CPI", '=IF(B17=0,"n/a",B16/B17)', "EV / AC"),
        ("EAC (VND)", '=IF(OR(B21="n/a",B21=0),"not meaningful (CPI = 0)",B7/B21)', "BAC / CPI"),
        ("ETC (VND)", '=IF(ISNUMBER(B22),B22-B17,"not meaningful (CPI = 0)")', "EAC − AC"),
        (None, None, None),
        ("Reading: SPI 0.46 – behind schedule; CPI 0.79 – over budget for the value earned (provisional until Đạt's S2 hours "
         "are added to B13). Every S2 item is built and deployed but only US-10 and NFR-02 are accepted. Scenario only: if the "
         "24 SP in review pass their hosted cases, EV = 26,400,000 × 43/62 = 18,309,677 VND and SPI = 1.04.", None, None),
    ]
    for r in rows:
        evm.append(r)
    workbook_style.style_table_sheet(evm, header_row=4, last_col=3)
    for r in range(5, 24):
        evm.cell(r, 2).number_format = "#,##0.00" if r in (20, 21) else ("#,##0" if r in (6, 7, 15, 16, 17, 18, 19, 22, 23) else "General")
    evm["B13"].fill = PatternFill("solid", fgColor="FFF2CC")
    evm.merge_cells("A25:C25")
    evm["A25"].alignment = Alignment(wrap_text=True, vertical="top")
    evm.row_dimensions[25].height = 48
    for col, w in zip("ABC", (40, 24, 70)):
        evm.column_dimensions[col].width = w

    for name, src, sub, opt in SHEETS_AFTER:
        workbook_style.md_sheet(wb, name, ROOT / src, subtitle=sub, **opt)
    _index_sheet(wb)
    for ws in wb.worksheets:  # text that starts with "=" must stay text
        for row in ws.iter_rows():
            for c in row:
                if c.data_type == "f" and ws.title not in ("EVM_S1", "EVM_S2"):
                    c.data_type = "s"
    out = OUT / f"{PREFIX}c2_SprintBacklog_S2.xlsx"
    wb.save(out)
    return out


# ---------------------------------------------------------------- c4 form
C4_COVER = {
    "school": "VAN LANG UNIVERSITY",
    "faculty": "FACULTY OF INFORMATION TECHNOLOGY",
    "course": "Software Project Management (72ITSE41503) – Final Project, Semester 261",
    "project": "E-COMMERCIAL BOOK STORE – RELEASE 1.0",
    "title": "CHANGE REQUEST CR-06",
    "version": "Store Staff role: form, impact analysis and CCB decision (version 2.0)",
    "lines": [
        "Team 6 – Page Turners",
        "Nguyễn Minh Chính (2275106050051) – Product Owner, Sprint Leader S2",
        "Hồ Du Tuấn Đạt (2374802010097) – Developer, Sprint Leader S1 & S3",
        "Sponsor / Customer: Dr. Bùi Minh Phụng",
    ],
    "date": "Ho Chi Minh City, November 2026",
}


def c4_form():
    out = OUT / f"{PREFIX}c4_ChangeRequest_CR01.docx"
    subprocess.run(["pandoc", "--from", "gfm", "--metadata", "title=Change Request CR-06", "-o", str(out),
                    str(ROOT / "pm" / "change" / "CR-06-change-request-form.md")], check=True)
    docx_style.style_docx(out, "HK261 SPM – Team 6 Page Turners – Change Request CR-06 (c4)", cover=C4_COVER)
    docx_style.prerender_toc(out)
    return out


# ---------------------------------------------------------------- c3 report
DOC_NAMES = {"change-log": "Change Log", "CR-06-impact-analysis": "CR-06 impact analysis (c4)",
             "CR-06-change-request-form": "CR-06 form (c4)", "test-cases-F1": "F1 test cases",
             "test-cases-F2F3": "F2/F3 test cases (Part IV.4)", "INPUTS": "team inputs record",
             "sprint-backlog": "Sprint Backlog", "product-backlog": "Product Backlog",
             "planning-poker-log": "Planning Poker log", "05-risk-plan": "risk register (c2 RiskRegister)",
             "weekly-status": "Weekly Status Report", "daily-log": "Daily Scrum log",
             "03-master-release-plan": "Release Plan"}


def _report_md(path):
    """Body for Part IV: no version history, no source citations, document names instead of repo paths."""
    md = _body_md(path)
    md = re.sub(r"\n#{2,4} Version history\n(?:\s*\n)*(?:\|.*\n?)+", "\n", md)
    md = re.sub(r"\s*\[(?:0[1-7]|CR-06|PMP-\d)[^\]\n]*(?:§|#)[^\]\n]*\]", "", md)

    def doc_name(m):
        stem = m.group(1)
        return DOC_NAMES.get(stem, stem.replace("-", " "))
    md = re.sub(r"`(?:pm|plan|docs)/[\w./-]*?([\w-]+)\.(?:md|xlsx|docx)`", doc_name, md)
    md = re.sub(r"`(?:pm|plan)/[\w./-]*`", "", md)
    return md


def _landscape(d, on):
    from docx.enum.section import WD_ORIENT, WD_SECTION
    d.add_section(WD_SECTION.NEW_PAGE)
    for sp in d.element.body.iterchildren(qn("w:p")):  # section breaks inherit no title page
        for tp in sp.xpath("./w:pPr/w:sectPr/w:titlePg"):
            tp.getparent().remove(tp)
    sec = d.sections[-1]
    w, h = sorted((sec.page_width, sec.page_height))
    sec.orientation = WD_ORIENT.LANDSCAPE if on else WD_ORIENT.PORTRAIT
    sec.page_width, sec.page_height = (h, w) if on else (w, h)


def _fit_columns(tbl):
    """Column widths in proportion to the text they hold; no column narrower than its longest word."""
    from docx.shared import Emu
    rows = tbl.rows
    ncol = len(tbl.columns)
    total = sum((c.width or 0) for c in rows[0].cells) or int(Cm(15))
    cm = int(Cm(1))
    mins, weight = [], []
    for c in range(ncol):
        texts = [r.cells[c].text for r in rows]
        word = max((len(w) for t in texts for w in t.split()), default=4)
        mins.append(min(word, 16) * 0.2 * cm + 0.3 * cm)
        lens = sorted(len(t) for t in texts[1:]) or [len(texts[0])]
        weight.append(max(4, min(70, lens[int(len(lens) * 0.8) - 1 if len(lens) > 1 else 0])))
    free = max(0, total - sum(mins))
    for c in range(ncol):
        w = Emu(int(mins[c] + free * weight[c] / sum(weight)))
        tbl.columns[c].width = w
        for r in rows:
            r.cells[c].width = w


def _md_sections(d, heading, md, wide=7):
    """A part with a table of ≥ `wide` columns is printed on landscape pages."""
    n0 = len(d.tables)
    land = any(len(l.strip().strip("|").split("|")) >= wide for l in md.splitlines() if l.startswith("|"))
    if land:
        _landscape(d, True)
    d.add_paragraph(heading, style="Heading 2")
    _md_into(d, md)
    for t in d.tables[n0:]:
        _fit_columns(t)
    if land:
        _landscape(d, False)


def c3_report():
    d = docx.Document(TPL / "FP_Template_SprintReview_Retro.docx")
    for p in d.paragraphs:
        if "SPRINT #" in p.text:
            for r in p.runs:
                r.text = r.text.replace("#", "2")
        if "SPRINT REVIEW & SPRINT RETROSPECTIVE RECORD" in p.text:
            for r in p.runs:
                r.text = r.text.replace("SPRINT REVIEW & SPRINT RETROSPECTIVE RECORD",
                                        "SPRINT REPORT – SPRINT REVIEW & RETROSPECTIVE")
    t = d.tables
    info = [TEAM, "2 (30/10 – 05/11/2026)", "Fri 06/11/2026, in class – time TBD", CHINH, CHINH,
            TBD, "Lecturer – Dr. Bùi Minh Phụng (attendance TBD)", TBD, TBD]
    for row, val in zip(t[0].rows, info):
        set_cell(row.cells[1], val)
    set_cell(t[1].rows[0].cells[1],
             "By 05/11/2026, on the hosted URL: an administrator adds, edits and hides books and manages categories "
             "and authors; a customer browses a responsive grid of ≥ 30 sample books, 12 per page, newest first; a "
             "Store Staff account adds/edits books but gets 403 on delete and account management (CR-06, Option B).")
    set_cell(t[1].rows[1].cells[1], "Met ☐  Partly met ☒  Not met ☐  – all 9 items built and deployed; "
                                    "5 of 29 SP accepted (US-10, NFR-02)")
    set_cell(t[1].rows[2].cells[1],
             "Every committed item is built, merged and live on the hosted URL: categories, authors, seed data, grid and "
             "responsive layout (PR #8, Chính) and add/edit/hide book plus the Store Staff role (PR #11, #12, #16, Đạt). "
             "71/71 automated tests pass and the public pages pass on the host. Only US-10 and NFR-02 passed the Story "
             "DoD: the hosted run of the admin and Staff screens was not reached before the Sprint end, because most "
             "code was merged on the last day (issue I-02).")
    _fill_rows(t[2], ITEMS)
    png = ROOT / "pm" / "sprints" / "S2" / "evidence" / "burndown-S2.png"
    cell = t[3].rows[0].cells[0]
    set_cell(cell, "")
    cell.paragraphs[0].add_run().add_picture(str(png), width=Cm(15.5))
    cell.add_paragraph().add_run(BURNDOWN_NOTE).italic = True
    _fill_rows(t[4], [("1", TBD + " (Review 2, 06/11)", TBD, TBD, TBD)])
    _fill_rows(t[5], UNDONE)
    _fill_rows(t[6], PREV_ACTIONS)
    for p in d.paragraphs:  # template guidance meant for Sprint 1 only
        if p.text.strip().startswith("Sprint 1: write") or p.text.strip().startswith("Insert the burndown from the PM tool"):
            p._p.getparent().remove(p._p)
    _fill_rows(t[7], [(TBD + " (team, Retro 2)", TBD, TBD)])
    issue = ("Proposed for Retro 2: F2 book screens and CR-06 code started late and no S2 item reached the DoD by "
             "the last day (issue I-02)")
    labels = [r.cells[0].text.strip() for r in t[8].rows]
    for row, label in zip(t[8].rows, labels):
        set_cell(row.cells[1], issue if label.lower().startswith("issue") else TBD + " (team, Retro 2)")
    _fill_rows(t[9], [(str(i), *a) for i, a in enumerate(ACTIONS_PROPOSED, 1)])
    for s_ in d.sections:
        for hp in s_.header.paragraphs + s_.first_page_header.paragraphs:
            for r in hp.runs:
                if "Team#" in r.text:
                    r.text = r.text.replace("Team#", "Team6")

    body = d.element.body
    cut = next((el for el in body if el.tag == qn("w:p") and "".join(el.itertext()).strip().startswith("PHỤ LỤC 1")), None)
    if cut is not None:  # drop the template's guidance appendix
        el = cut
        while el is not None and el.tag != qn("w:sectPr"):
            nxt = el.getnext()
            body.remove(el)
            el = nxt
    sect = body.find(qn("w:sectPr"))
    h = d.add_paragraph("PART IV – SPRINT 2 DATA", style="Heading 1")
    h.paragraph_format.page_break_before = True
    for i, (title, path) in enumerate(C3_PARTS, 1):
        _md_sections(d, docx_style.plain_text(f"IV.{i}. {title}"), _report_md(path))
    body.remove(sect)
    body.append(sect)
    out = OUT / f"{PREFIX}c3_SprintReport_S2.docx"
    d.save(out)
    return out


# ---------------------------------------------------------------- c0 eval
def c0_eval():
    out = OUT / f"{PREFIX}c0_Eval_S2.xlsx"
    if out.exists() and load_workbook(out)["Eval"]["E10"].value is not None:
        return out  # the Leader has entered the scores – never overwrite them
    wb = load_workbook(TPL / "FP_Template_Eval.xlsx")
    for name in wb.sheetnames:
        if name != "Eval":
            del wb[name]
    ws = wb["Eval"]
    ws["B4"], ws["B5"], ws["B6"], ws["B7"] = TEAM, CHINH, PO[0], "05/11/2026"
    members = [(LEADER[0], DAT, "Developer (Sprint Leader S1 & S3)"),
               (PO[0], CHINH, "Sprint Leader S2 + Product Owner + Developer")]
    for row, (sid, name, role) in zip((10, 11), members):
        ws.cell(row, 1, sid)
        ws.cell(row, 2, name)
        ws.cell(row, 3, role)
        ws.cell(row, 4, round(PLAN_HOURS[name] / PLAN_TOTAL, 4))
        for col in (5, 6, 7):
            ws.cell(row, col).value = None
        ws.cell(row, 12, f"Workload = planned task hours {PLAN_HOURS[name]}/{PLAN_TOTAL} h (S2 Sprint Backlog v1.0, "
                         f"after S2-T07 and S2-T13 moved to Chính). Actual S2 hours in Jira: "
                         + ("10.5 h. " if name == CHINH else "TBD. ") + "Columns E–G: Leader S2 to enter.")
    for col in range(4, 8):
        ws.cell(12, col).value = None
    from openpyxl.styles import Protection
    for row in range(10, 14):  # the template protects the sheet; only the score cells are opened for the Leader
        for col in (5, 6, 7):
            ws.cell(row, col).protection = Protection(locked=False)
    ws["A24"] = ("Note: workload uses PLANNED hours from the task assignment, as the scoring guide says. "
                 "Leader S2 must enter E (0–1), F (0–10), G (0–1) before submission.")
    ws["A24"].font = Font(italic=True, color="B42318")
    out = OUT / f"{PREFIX}c0_Eval_S2.xlsx"
    wb.save(out)
    return out


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    burndown_s2.main()
    for f in (c2_workbook(), c4_form(), c3_report(), c0_eval()):
        print("wrote", f.relative_to(ROOT))
