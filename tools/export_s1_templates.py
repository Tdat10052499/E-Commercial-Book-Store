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



# ---------------------------------------------------------------- c3 report
import re

from docx.shared import Cm, Pt

from docx.enum.text import WD_BREAK
from docx.oxml.ns import qn

import docx_style

C3_PARTS = [
    ("Sprint status (Green / Amber / Red)", "pm/sprints/S1/sprint-report.md"),
    ("Sprint Planning 1 – S1_Backlog", "pm/sprints/S1/sprint-backlog.md"),
    ("Daily Scrum log", "pm/sprints/S1/daily-log.md"),
    ("Test cases F1 (from Acceptance Criteria)", "pm/sprints/S1/test-cases-F1.md"),
]

UNDONE = [
    ("TC-F1 hosted run", "18 of 24 test cases not yet run by a team member on https://pagetunnel.vercel.app/ "
     "(5 Pass, 1 Partial so far)", "Cases need typed passwords or a customer session; AI may not enter them",
     "Team runs them before Review 2 – TBD owner"),
    ("Jira actuals", "Completed Work hours and burndown not exported", TBD, TBD),
]

ACTIONS_PROPOSED = [
    ("Log Daily Scrum every working day before 22:00 in the team channel (proposed)", "Leader S2", "Each day of S2",
     "5/5 entries per member in daily-log"),
    ("Draft Sprint files by Wednesday 20:00, submit Thursday before 21:00 (proposed)", "Leader S2", "04/11",
     "E-learning timestamp before 23:59 05/11"),
    ("Log Completed Work in Jira the same day a task moves (proposed)", "Both", "Daily",
     "100 % of Done tasks have hours"),
]


def _body_md(path):
    """Markdown body without its H1 title (the template supplies the heading)."""
    lines = (ROOT / path).read_text(encoding="utf-8").splitlines()
    if lines and lines[0].startswith("# "):
        lines = lines[1:]
    if "## Contents" in lines:  # file map of the old Markdown report, not needed inside the template
        k = lines.index("## Contents")
        j = next((n for n in range(k + 1, len(lines)) if lines[n].startswith("## ")), len(lines))
        lines = lines[:k] + lines[j:]
    return "\n".join(lines) + "\n"


def _fill_rows(table, rows, start=1):
    while len(table.rows) - start < len(rows):
        table.add_row()
    for row, vals in zip(table.rows[start:], rows):
        for cell, v in zip(row.cells, vals):
            set_cell(cell, v)


def _md_inline(paragraph, text, size=None):
    """Add text with **bold** spans; strip `code` ticks and link syntax."""
    text = docx_style.plain_text(re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", text).replace("`", ""))
    for k, part in enumerate(re.split(r"\*\*", text)):
        if part:
            run = paragraph.add_run(part.replace("*", ""))
            run.bold = k % 2 == 1
            if size:
                run.font.size = Pt(size)


def _md_into(d, md):
    lines = md.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line.strip():
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", c) for c in cells if c):
                    rows.append(cells)
                i += 1
            ncol = max(len(r) for r in rows)
            t = d.add_table(rows=len(rows), cols=ncol)
            t.style = "Table Grid" if "Table Grid" in [s.name for s in d.styles] else None
            for r_i, row in enumerate(rows):
                for c_i in range(ncol):
                    cell = t.cell(r_i, c_i)
                    cell.text = ""
                    _md_inline(cell.paragraphs[0], row[c_i] if c_i < len(row) else "", 10)
                    if r_i == 0:
                        for run in cell.paragraphs[0].runs:
                            run.bold = True
            docx_style.format_table(t)
            d.add_paragraph()
            continue
        m = re.match(r"^(#{2,4})\s+(.*)", line)
        if m:
            d.add_paragraph(docx_style.plain_text(m.group(2).replace("`", "")), style="Heading 3")
        elif re.match(r"^\s*([-*]|\d+\.)\s+", line):
            p = d.add_paragraph()
            p.paragraph_format.left_indent = Cm(0.6)
            _md_inline(p, "• " + re.sub(r"^\s*([-*]|\d+\.)\s+", "", line))
        elif line.startswith(">"):
            p = d.add_paragraph()
            _md_inline(p, line.lstrip("> "))
            for run in p.runs:
                run.italic = True
        else:
            p = d.add_paragraph()
            _md_inline(p, line)
        i += 1


def c3_report():
    out = ROOT / "deliverables" / "S1" / f"{PREFIX}c3_SprintReport_S1.docx"
    review_retro_s1()  # refresh the record
    d = docx.Document(ROOT / "pm" / "sprints" / "S1" / f"{PREFIX}SprintReview_Retro_S1.docx")
    t = d.tables
    _fill_rows(t[4], [("1", TBD, TBD, TBD, TBD)])  # replaces the template's example row
    _fill_rows(t[7], [(TBD, TBD, TBD)])
    _fill_rows(t[5], UNDONE)
    for s_ in d.sections:  # template header placeholder "Team#"
        for hp in s_.header.paragraphs + s_.first_page_header.paragraphs:
            for r in hp.runs:
                if "Team#" in r.text:
                    r.text = r.text.replace("Team#", "Team6")
    _fill_rows(t[9], [(str(i), *a) for i, a in enumerate(ACTIONS_PROPOSED, 1)])
    for p in d.paragraphs:  # title: this file is the Sprint Report
        if "SPRINT REVIEW & SPRINT RETROSPECTIVE RECORD" in p.text:
            for r in p.runs:
                r.text = r.text.replace("SPRINT REVIEW & SPRINT RETROSPECTIVE RECORD",
                                        "SPRINT REPORT – SPRINT REVIEW & RETROSPECTIVE")

    # drop the template's guidance appendix ("PHỤ LỤC 1 …") – it is instructions, not a report section
    body = d.element.body
    cut = None
    for el in body:
        if el.tag == qn("w:p") and "".join(el.itertext()).strip().startswith("PHỤ LỤC 1"):
            cut = el
            break
    if cut is not None:
        el = cut
        while el is not None and el.tag != qn("w:sectPr"):
            nxt = el.getnext()
            body.remove(el)
            el = nxt

    # PART IV: Sprint data required by [03 §7] (Planning, Daily log, test cases, Status),
    # written with python-docx into the template so it keeps the template's styles.
    sect = body.find(qn("w:sectPr"))
    h = d.add_paragraph("PART IV – SPRINT 1 DATA", style="Heading 1")
    h.paragraph_format.page_break_before = True
    for i, (title, path) in enumerate(C3_PARTS, 1):
        d.add_paragraph(docx_style.plain_text(f"IV.{i}. {title}"), style="Heading 2")
        _md_into(d, _body_md(path))
    body.remove(sect)
    body.append(sect)
    d.save(out)
    return out


if __name__ == "__main__":
    for f in (eval_s1(), c3_report()):
        print("wrote", f.relative_to(ROOT))
