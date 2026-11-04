"""Export the Sprint 2 deliverables [03 §7].

Usage: python3 tools/export_s2.py   (needs pandoc, python-docx, openpyxl, matplotlib)

Outputs (deliverables/S2/, prefix HK261_SPM_FP_Team6_):
  c2_SprintBacklog_S2.xlsx    cumulative workbook: S1 sheets + updated baseline sheets + S2 sheets
  c3_SprintReport_S2.docx     lecturer Review/Retro template + Part IV Sprint 2 data
  c4_ChangeRequest_CR01.docx  CR-06 form, impact analysis, CCB decision, baseline update
  c0_Eval_S2.xlsx             Leader S2 evaluation (workload filled, scores left to the Leader)

Only planned or recorded data is filled in; meeting records, hours and scores stay TBD [CLAUDE.md §3.2].
Re-run after updating the Markdown sources (e.g. hours from Jira) to refresh every file.
"""
import copy
import subprocess
import sys
from pathlib import Path

import docx
from docx.oxml.ns import qn
from docx.shared import Cm
from openpyxl import load_workbook
from openpyxl.styles import Alignment, Font, PatternFill

sys.path.insert(0, str(Path(__file__).resolve().parent))
import burndown_s2  # noqa: E402
import docx_style  # noqa: E402
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
ITEMS = [
    ("US-05", "Add book", 5, 4, "0/4 (blocked)", "No", "Not Done"),
    ("US-06", "Edit book", 3, 4, "0/4 (blocked)", "No", "Not Done"),
    ("US-07", "Hide (soft delete) book", 2, 3, "1/3 partial (grid hides)", "No", "Not Done"),
    ("US-08", "Manage categories", 3, 5, "5/5 auto", "No (PR #8)", "Not Done (In Review)"),
    ("US-09", "Manage authors", 3, 4, "4/4 auto", "No (PR #8)", "Not Done (In Review)"),
    ("NFR-02", "Sample data ≥ 30 books", 2, 2, "2/2 auto", "No (PR #8)", "Not Done (In Review)"),
    ("US-10", "Book grid 12/page, newest first", 3, 4, "4/4 auto", "No (PR #8)", "Not Done (In Review)"),
    ("NFR-04", "Responsive UI", 3, 2, "2/2 render check", "No (PR #8)", "Not Done (In Review)"),
    ("US-24", "Store Staff role (CR-06)", 5, 5, "0/5 (not built)", "No", "Not Done"),
]

UNDONE = [
    ("US-05, US-06, US-07", "Book add / edit / hide screens not built at 05/11 00:30", "F2 started late (issue I-02)",
     "Đạt builds on PR #8 on 05/11; anything not Done returns to the Product Backlog for Planning 3"),
    ("US-24", "Store Staff role not built", "Same; CR-06 added 8.5 h to S2 (I-03)",
     "Đạt, S2-T16…T20; if not Done, first item of S3 with US-25"),
    ("US-08, US-09, NFR-02, US-10, NFR-04", "Built and tested locally; not merged, not tested on the host",
     "Review, merge and hosted run left to the last day", "Merge PR #8, deploy, run S2-T23, PO acceptance"),
    ("NFR-01, NFR-03 (F1, 4 SP)", "In Review: TC-F1-19 (hash in hosted DB) and TC-F1-24 (online on 17/11) not run",
     "Needs Supabase access; date-bound", "Đạt shows the hash; TC-24 on 17/11. US-01…04 (14 SP) accepted 05/11"),
]

PREV_ACTIONS = [
    ("A1 Daily Scrum logged every working day before 22:00 (proposed in Retro 1 record)", "Leader S2",
     "Not Done (as of 05/11 00:30)", "pm/sprints/S2/daily-log.md – no entries yet"),
    ("A2 Draft Sprint files by Wednesday 20:00, submit Thursday before 21:00", "Leader S2",
     "Partly – files drafted on Wed 04/11 late evening", "deliverables/S2 commits 04–05/11"),
    ("A3 Log Completed Work in Jira the same day a task moves", "Both",
     "Not Done – S2 tasks entered in Jira 05/11 00:20, hours not logged yet", "Jira sprint 6"),
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
    "Explanation: remaining work = plan hours of S2 tasks that are not Done. It stays at 39.75 h from 30/10 to "
    "03/11 because no S2 task was finished, and drops to 30.75 h on 04/11 when the CR-06 rebaseline, c4, Weekly "
    "Status, CR documentation and F2/F3 test cases were finished. Code tasks in PR #8 count as remaining until they "
    "are merged and accepted. The S2 tasks were entered in Jira only on 05/11 00:20, so days 1–4 are reconstructed "
    "from the repo, not read from board moves (Retro 1 action A3 not met). Day 5 is added from Jira before upload."
)

C3_PARTS = [
    ("Sprint status (Green / Amber / Red), EVM and change control", "pm/sprints/S2/sprint-report.md"),
    ("Sprint Planning 2 – S2_Backlog", "pm/sprints/S2/sprint-backlog.md"),
    ("Daily Scrum log", "pm/sprints/S2/daily-log.md"),
    ("Test cases F2, F3 (from Acceptance Criteria)", "pm/sprints/S2/test-cases-F2F3.md"),
    ("Weekly Status Report", "pm/sprints/S2/weekly-status.md"),
    ("Jira board snapshot (05/11/2026)", "pm/sprints/S2/jira-snapshot-2026-11-05.md"),
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


def c2_workbook():
    src = ROOT / "deliverables" / "S1" / f"{PREFIX}c2_SprintBacklog_S1.xlsx"
    wb = load_workbook(src)
    plan_note = "Plan figures are labelled (plan). Actual figures come from Jira. TBD = team input (plan/INPUTS.md)."
    # baseline sheets updated to v1.1 (the S1 versions are kept in the S1 file and in Git tag baseline-v1.0)
    ws = _replace_sheet(wb, "ProductBacklog", "pm/backlog/product-backlog.md", pick=[1, 2, 3, 4],
                        note=plan_note + " Baseline v1.1 (CR-06 approved): PSP 62 SP.")
    ws.insert_rows(3)
    ws["A3"] = "Jira board: https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2 (project ECBS)"
    _replace_sheet(wb, "ReleasePlan", "pm/pmp/03-master-release-plan.md", note=plan_note + " Release Plan v1.3, BAC 26.4 M VND.")
    _replace_sheet(wb, "RiskRegister", "pm/pmp/05-risk-plan.md", pick=[0, 1])
    _replace_sheet(wb, "IssueLog", "pm/pmp/05-risk-plan.md", pick=[2])
    _replace_sheet(wb, "ChangeLog", "pm/change/change-log.md")
    _replace_sheet(wb, "PlanningPoker", "pm/backlog/planning-poker-log.md",
                   note="Votes are entered by the team only. Session 3 is prepared for Planning 3 (06/11) and still empty.")

    s2 = add_sheet(wb, "S2_Backlog", "pm/sprints/S2/sprint-backlog.md", note=plan_note)
    _insert_after(wb, "S1_Backlog", s2)

    burn = wb.create_sheet("Burndown_S2")
    burn.append(["Day", "Date", f"Ideal remaining (h, plan: {PLAN_TOTAL} h → 0)", "Remaining by task status (h)", "Note"])
    for i, (d, ideal, act) in enumerate(zip(burndown_s2.DAYS, burndown_s2.IDEAL, burndown_s2.ACTUAL)):
        note = {3: "T03, T04, T05, T21, T22 Done (9 h)", 4: "TBD – read from Jira before upload"}.get(i, "No S2 task Done")
        burn.append([i + 1, d, ideal, act if act is not None else TBD, note])
    burn.append([])
    burn.append(["Source: repo + PR #8 + Jira sprint 6 (pm/sprints/S2/jira-snapshot-2026-11-05.md). "
                 "S2 tasks were entered in Jira on 05/11 00:20; days 1–4 reconstructed from completion evidence."])
    for c in burn[1]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="8A3B12")
    for col, w in zip("ABCDE", (6, 12, 30, 28, 42)):
        burn.column_dimensions[col].width = w
    png = ROOT / "pm" / "sprints" / "S2" / "evidence" / "burndown-S2.png"
    from openpyxl.drawing.image import Image as XLImage
    img = XLImage(str(png))
    img.width, img.height = 750, 380
    burn.add_image(img, "G2")
    _insert_after(wb, "Burndown", burn)

    evm = wb.create_sheet("EVM_S2")
    rows = [
        ("EVM snapshot – Sprint 2 (n = 2, N = 3), baseline v1.1, data as of 05/11/2026 00:30", None, None),
        ("Formulas per the Final Project brief, AgileEVM. Plan values from Release Plan v1.3; actuals from Jira.", None, None),
        (None, None, None),
        ("Input / metric", "Value", "Formula / source"),
        ("Planned hours of the release (h, plan)", 132, "Release Plan v1.3: 120 h + 12 h CR-06"),
        ("Rate (VND/h)", 200000, "Final Project brief"),
        ("BAC (VND)", "=B5*B6", "Planned hours × rate"),
        ("PSP (SP, plan)", 62, "Product Backlog v1.2 (baseline v1.1)"),
        ("n (Sprints completed)", 2, None),
        ("N (Sprints planned)", 3, None),
        ("SP meeting DoD (cumulative)", 14, "Jira 05/11: US-01…US-04 accepted by the PO after the hosted run (14 SP); NFR-01, NFR-03 and S2 items not Done"),
        ("Actual hours S1 (h)", 19.5, "Jira Time spent ECBS-90…103"),
        ("Actual hours S2 (h)", None, "TBD – Jira Time spent ECBS-124…146 (enter before upload)"),
        ("Actual hours (cumulative, h)", "=B12+N(B13)", "S1 + S2"),
        ("PV (VND)", "=B7*B9/B10", "BAC × n / N"),
        ("EV (VND)", "=B7*B11/B8", "BAC × SP done / PSP"),
        ("AC (VND)", "=B14*B6", "Actual hours × rate (S2 part missing until entered)"),
        ("SV (VND)", "=B16-B15", "EV − PV"),
        ("CV (VND)", "=B16-B17", "EV − AC"),
        ("SPI", '=IF(B15=0,"n/a",B16/B15)', "EV / PV"),
        ("CPI", '=IF(B17=0,"n/a",B16/B17)', "EV / AC"),
        ("EAC (VND)", '=IF(OR(B21="n/a",B21=0),"not meaningful (CPI = 0)",B7/B21)', "BAC / CPI"),
        ("ETC (VND)", '=IF(ISNUMBER(B22),B22-B17,"not meaningful (CPI = 0)")', "EAC − AC"),
        (None, None, None),
        ("Reading: SPI 0.34 – behind schedule; F1 was accepted only on 05/11. CPI is valid only after the S2 hours (B13) "
         "are entered. Scenario only: if the 5 items in PR #8 (14 SP) are also accepted, EV = 11,922,581 VND, SPI = 0.68.", None, None),
    ]
    for r in rows:
        evm.append(r)
    evm["A1"].font = Font(bold=True, size=12)
    for c in evm[4]:
        c.font = Font(bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor="8A3B12")
    for r in range(5, 24):
        evm.cell(r, 2).number_format = "#,##0.00" if r in (20, 21) else "#,##0"
    evm["B13"].fill = PatternFill("solid", fgColor="FFF2CC")
    for col, w in zip("ABC", (40, 24, 60)):
        evm.column_dimensions[col].width = w
    _insert_after(wb, "EVM", evm)

    tc = add_sheet(wb, "TestCases_F2F3", "pm/sprints/S2/test-cases-F2F3.md")
    _insert_after(wb, "TestCases_F1", tc)
    add_sheet(wb, "WeeklyStatus_S2", "pm/sprints/S2/weekly-status.md")
    add_sheet(wb, "CR06_Impact", "pm/change/CR-06-change-request-form.md", pick=[1, 2, 3, 4, 5, 6, 7])
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for c in row:
                if isinstance(c.value, str) and len(c.value) > 60:
                    c.alignment = Alignment(wrap_text=True, vertical="top")
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
    "version": "Store Staff role · Form, impact analysis, CCB decision · Version 2.0",
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
    return out


# ---------------------------------------------------------------- c3 report
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
    set_cell(t[1].rows[1].cells[1], "Met ☐  Partly met ☐  Not met ☐  – PO decides at Review 2 (status 05/11 00:30: "
                                    "5 of 9 items built, 0 Done)")
    set_cell(t[1].rows[2].cells[1],
             "Categories, authors, seed data, the book grid and the responsive layout are built and pass 27 automated "
             "tests (PR #8). Book add/edit/hide and the Staff role were not built by 05/11 00:30 (issue I-02). No item "
             "has passed the Story DoD yet because merge, hosted test and PO acceptance are still open.")
    _fill_rows(t[2], [(i, ti, sp, f"{TBD}/{acs}", tc, dod, done, TBD) for i, ti, sp, acs, tc, dod, done in ITEMS])
    png = ROOT / "pm" / "sprints" / "S2" / "evidence" / "burndown-S2.png"
    cell = t[3].rows[0].cells[0]
    set_cell(cell, "")
    cell.paragraphs[0].add_run().add_picture(str(png), width=Cm(15.5))
    cell.add_paragraph().add_run(BURNDOWN_NOTE).italic = True
    _fill_rows(t[4], [("1", TBD + " (Review 2, 06/11)", TBD, TBD, TBD)])
    _fill_rows(t[5], UNDONE)
    _fill_rows(t[6], PREV_ACTIONS)
    for p in d.paragraphs:  # template guidance meant for Sprint 1 only
        if p.text.strip().startswith("Sprint 1: write"):
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
        d.add_paragraph(docx_style.plain_text(f"IV.{i}. {title}"), style="Heading 2")
        _md_into(d, _body_md(path))
    body.remove(sect)
    body.append(sect)
    out = OUT / f"{PREFIX}c3_SprintReport_S2.docx"
    d.save(out)
    return out


# ---------------------------------------------------------------- c0 eval
def c0_eval():
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
                         f"after S2-T07 and S2-T13 moved to Chính). Actual hours: TBD from Jira. "
                         f"Columns E–G: Leader S2 to enter.")
    for col in range(4, 8):
        ws.cell(12, col).value = None
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
