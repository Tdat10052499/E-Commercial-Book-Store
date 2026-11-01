"""Fill the lecturer's templates for Sprint 1 [03 Appendix B].

Usage: python3 tools/export_s1_templates.py   (needs openpyxl, python-docx)

Inputs : docs/templates/FP_Template_Eval.xlsx (class roster sheet removed)
         docs/templates/FP_Template_SprintReview_Retro.docx
Outputs: deliverables/S1/HK261_SPM_FP_Team6_c0_Eval_S1.xlsx
         pm/sprints/S1/HK261_SPM_FP_Team6_SprintReview_Retro_S1.docx  (record, goes into c3)

Only planned or recorded data is filled in. Every cell that needs a human
judgement or a meeting record is left as "TBD" [CLAUDE.md §3.2].
"""
from pathlib import Path

import docx
from openpyxl import load_workbook
from openpyxl.styles import Font

ROOT = Path(__file__).resolve().parent.parent
TPL = ROOT / "docs" / "templates"
PREFIX = "HK261_SPM_FP_Team6_"
TBD = "TBD"

TEAM = "Team 6 – Page Turners"
LEADER = ("2374802010097", "Hồ Du Tuấn Đạt", "Sprint Leader S1 + Developer")
PO = ("2275106050051", "Nguyễn Minh Chính", "Product Owner + Developer")

# Planned task hours per owner from pm/sprints/S1/sprint-backlog.md (PO version, 30/10/2026)
PLAN_HOURS = {LEADER[1]: 24, PO[1]: 24}

# Committed items: ID, title, SP (PO estimate), number of ACs, automated TC pass, hosted TC pass
ITEMS = [
    ("US-01", "Register a customer account", 3, 4, "4/4 auto · hosted 1/4 (TC-03 client part)"),
    ("US-02", "Log in / log out", 3, 5, "5/5 auto · hosted 0/5 run"),
    ("US-03", "Admin creates and locks accounts", 5, 5, "5/5 auto · hosted 1/5"),
    ("US-04", "Block admin functions for unauthorised users", 3, 4, "4/4 auto · hosted 1/4 + 1 partial"),
    ("NFR-01", "Hashed passwords, client + server validation", 2, 3, "3/3 auto · hosted 1/3"),
    ("NFR-03", "Hosted on a free server", 2, 3, "hosted 1/3"),
]


def eval_s1():
    wb = load_workbook(TPL / "FP_Template_Eval.xlsx")
    for name in wb.sheetnames:
        if name != "Eval":
            del wb[name]
    ws = wb["Eval"]
    ws["B4"], ws["B5"], ws["B6"], ws["B7"] = TEAM, LEADER[1], LEADER[0], TBD + " (submission date)"
    total = sum(PLAN_HOURS.values())
    for row, member in zip((10, 11), (LEADER, PO)):
        ws.cell(row, 1, member[0])
        ws.cell(row, 2, member[1])
        ws.cell(row, 3, member[2])
        ws.cell(row, 4, PLAN_HOURS[member[1]] / total)
        for col in (5, 6, 7):  # on-time, contribution, meetings: Leader's judgement
            ws.cell(row, col).value = None
        ws.cell(row, 12, f"Workload = planned task hours {PLAN_HOURS[member[1]]}/{total} h (S1 Sprint Backlog). "
                         "Columns E–G: TBD – Leader to enter.")
    for col in range(4, 8):  # remove template example values on row 12
        ws.cell(12, col).value = None
    ws["A24"] = ("Note: workload uses PLANNED hours from the task assignment, as the scoring guide says. "
                 "Leader must enter E (0–1), F (0–10), G (0–1) before submission.")
    ws["A24"].font = Font(italic=True, color="B42318")
    out = ROOT / "deliverables" / "S1" / f"{PREFIX}c0_Eval_S1.xlsx"
    wb.save(out)
    return out


def set_cell(cell, text):
    cell.text = ""
    cell.paragraphs[0].add_run(str(text))


def review_retro_s1():
    d = docx.Document(TPL / "FP_Template_SprintReview_Retro.docx")
    for p in d.paragraphs:
        if "SPRINT #" in p.text:
            for r in p.runs:
                r.text = r.text.replace("#", "1")
    t = d.tables
    info = [TEAM, "1 (23/10 – 29/10/2026)", "Fri 30/10/2026, in class – time TBD", LEADER[1], PO[1],
            TBD, "Lecturer – Dr. Bùi Minh Phụng (attendance TBD)", TBD, TBD]
    for row, val in zip(t[0].rows, info):
        set_cell(row.cells[1], val)
    set_cell(t[1].rows[0].cells[1],
             "By 29/10/2026, on the hosted URL: register, log in/out; admin creates and locks accounts; "
             "non-admin gets 403 on /admin; bcrypt hashes – verified by 24 F1 test cases. "
             "PMP v1.0, Product Backlog v1.0, Release Plan/BAC and the CR-06 Change Log entry baselined.")
    set_cell(t[1].rows[1].cells[1], "Met ☐  Partly met ☐  Not met ☐  – TBD (PO decides at Review)")
    set_cell(t[1].rows[2].cells[1], TBD)
    rows = t[2].rows
    while len(rows) - 1 < len(ITEMS):
        t[2].add_row()
        rows = t[2].rows
    for row, (iid, title, sp, acs, tc) in zip(rows[1:], ITEMS):
        for cell, val in zip(row.cells, (iid, title, sp, f"{TBD}/{acs}", tc, TBD, TBD, TBD)):
            set_cell(cell, val)
    set_cell(t[3].rows[0].cells[0], "[Burndown chart – export from Jira; TBD]")
    for row in t[6].rows[1:2]:
        set_cell(row.cells[0], "Not applicable (Sprint 1)")
    out = ROOT / "pm" / "sprints" / "S1" / f"{PREFIX}SprintReview_Retro_S1.docx"
    d.save(out)
    return out


if __name__ == "__main__":
    for f in (eval_s1(), review_retro_s1()):
        print("wrote", f.relative_to(ROOT))
