"""Put the Sprint files into the lecturer templates received 10/11/2026 [03 Appendix B].

Usage: python3 tools/export_templates.py S1|S2|S3|all   (needs git, python-docx, openpyxl, matplotlib for S3)

Templates (docs/templates/):
  SprintBacklog_Template.xlsx     -> c2_SprintBacklog_S#.xlsx (cumulative workbook)
  FP_Template_SprintReport.docx   -> c3_SprintReport_S#.docx

Data:
  S1, S2  the repository at the commit of the submitted files (SUBMITTED below): the same Markdown sources, the
          same figures. Sheets and parts the templates do not have (DoR, Release Plan, EVM, test cases, Review/Retro
          record, Weekly Status, Jira snapshot) are copied unchanged from the submitted files.
  S3      the working tree (draft until the Sprint ends; re-run before submission).
Only planned or recorded data is filled in; TBD stays TBD (team rule: actual data is never invented).
"""
import copy
import importlib
import io
import json
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TPL = ROOT / "docs" / "templates"
PREFIX = "HK261_SPM_FP_Team6_"
WT = Path("/tmp/claude-0/export-snapshots")  # git worktrees of the submission commits
REPO = "Tdat10052499/E-Commercial-Book-Store"
TZ7 = timezone(timedelta(hours=7))
RATE = 200000
TBD = "TBD"

TEAM = "Team 6 – Page Turners"
DAT = ("Hồ Du Tuấn Đạt", "2374802010097", "tdat.100524@gmail.com", "Tdat10052499")
CHINH = ("Nguyễn Minh Chính", "2275106050051", "4nminhchinh4@gmail.com", "F4ol4n")
SHORT = {"Đạt": DAT, "Chính": CHINH}

SUBMITTED = {"S1": "04831ed", "S2": "469d2b9"}  # last commit that changed deliverables/S1, deliverables/S2
SPRINTS = {
    "S1": {"n": 1, "start": "23/10/2026", "end": "29/10/2026", "leader": DAT,
           "days": ["Fri 23/10", "Mon 26/10", "Tue 27/10", "Wed 28/10", "Thu 29/10"],
           "backlog": "pm/sprints/S1/sprint-backlog.md", "daily": "pm/sprints/S1/daily-log.md",
           "report": "pm/sprints/S1/sprint-report.md", "committed": 18,
           "tests": ["pm/sprints/S1/test-cases-F1.md"], "png": "pm/sprints/S1/evidence/burndown-S1.png"},
    "S2": {"n": 2, "start": "30/10/2026", "end": "05/11/2026", "leader": CHINH,
           "days": ["Fri 30/10", "Mon 02/11", "Tue 03/11", "Wed 04/11", "Thu 05/11"],
           "backlog": "pm/sprints/S2/sprint-backlog.md", "daily": "pm/sprints/S2/daily-log.md",
           "report": "pm/sprints/S2/sprint-report.md", "committed": 29,
           "tests": ["pm/sprints/S2/test-cases-F2F3.md"], "png": "pm/sprints/S2/evidence/burndown-S2.png"},
    "S3": {"n": 3, "start": "06/11/2026", "end": "12/11/2026", "leader": DAT,
           "days": ["Fri 06/11", "Sat 07/11", "Sun 08/11", "Mon 09/11", "Tue 10/11", "Wed 11/11", "Thu 12/11"],
           "backlog": "pm/sprints/S3/sprint-backlog.md", "daily": "pm/sprints/S3/daily-log.md",
           "report": "pm/sprints/S3/sprint-report.md", "committed": 39,
           "tests": ["pm/sprints/S3/test-cases-F4F5.md"], "png": "pm/sprints/S3/evidence/burndown-S3.png"},
}
FEATURES = {"F1": "F1 Account & access", "F2": "F2 Book management", "F3": "F3 Book list",
            "F4": "F4 Book detail", "F5": "F5 Search & filter", "All": "All features"}
NON_STORY = {"PM": "Project management", "Scrum": "Scrum events", "Test": "Testing", "CR-06": "CR-06 change control",
             "Carried": "Carried from Sprint 2"}


# ---------------------------------------------------------------- sources
def git(*args, cwd=ROOT):
    return subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, text=True).stdout


def snapshot(sprint):
    """Directory holding the sources of a Sprint's files: a worktree at the submission commit, or the working tree."""
    rev = SUBMITTED.get(sprint)
    if rev is None:
        return ROOT
    path = WT / sprint
    if not (path / ".git").exists():
        WT.mkdir(parents=True, exist_ok=True)
        git("worktree", "add", "-f", "--detach", str(path), rev)
    return path


def md_at(sprint, rel):
    p = snapshot(sprint) / rel
    return p.read_text(encoding="utf-8") if p.exists() else ""


def submitted_file(sprint, kind):
    """Bytes of the file submitted for a Sprint (c2 or c3), from git."""
    name = {"c2": f"{PREFIX}c2_SprintBacklog_{sprint}.xlsx", "c3": f"{PREFIX}c3_SprintReport_{sprint}.docx"}[kind]
    out = subprocess.run(["git", "show", f"{SUBMITTED[sprint]}:deliverables/{sprint}/{name}"], cwd=ROOT,
                         check=True, capture_output=True).stdout
    return io.BytesIO(out)


def clean(text):
    t = str(text or "")
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", t)
    t = t.replace("**", "").replace("`", "").replace("<br>", "\n")
    t = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])", r"\1", t)
    t = re.sub(r"\s*\[(?:0[1-7]|CR-06|05|PMP-\d)[^\]]*(?:§|#)[^\]]*\]", "", t)
    return t.strip()


def tables(text):
    """Every pipe table as (heading, rows); rows are lists of raw cell strings, header first."""
    out, heading, cur = [], "", None
    for line in text.splitlines():
        if line.startswith("#"):
            heading = line.lstrip("# ").strip()
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if all(re.fullmatch(r":?-{3,}:?", c) for c in cells if c):
                continue
            if cur is None:
                cur = (heading, [])
                out.append(cur)
            cur[1].append(cells)
        else:
            cur = None
    return out


def table_with(text, *names):
    """First table whose header contains every given column name (case-insensitive prefix match)."""
    for heading, rows in tables(text):
        hdr = [h.lower() for h in rows[0]]
        if all(any(h.startswith(n.lower()) for h in hdr) for n in names):
            return heading, rows
    return None, []


def col(rows, name):
    hdr = [h.lower() for h in rows[0]]
    return next(i for i, h in enumerate(hdr) if h.startswith(name.lower()))


def section(text, title):
    """Body text of the '## title…' section (until the next heading of the same or a higher level)."""
    lines, out, on, lvl = text.splitlines(), [], False, 0
    for line in lines:
        m = re.match(r"^(#{1,4})\s+(.*)", line)
        if m and on and len(m.group(1)) <= lvl:
            break
        if on:
            out.append(line)
        if m and m.group(2).lower().startswith(title.lower()):
            on, lvl = True, len(m.group(1))
    return "\n".join(out).strip()


def num(text):
    m = re.search(r"-?\d+(?:\.\d+)?", clean(text))
    return float(m.group()) if m else None


def nice(x):
    return int(x) if x is not None and float(x).is_integer() else x


def ddmm(text):
    m = re.search(r"\b(\d{2})/(\d{2})\b", text or "")
    return (int(m.group(2)), int(m.group(1))) if m else None


def state(status):
    s = clean(status).lower()
    if s.startswith("done"):
        return "Done"
    if s.startswith("to do") or not s:
        return "To Do"
    return "In Progress"


# ---------------------------------------------------------------- Sprint data
def sprint_tasks(sprint, src):
    """Tasks of a Sprint backlog: dicts with id, item, task, owner, est, actual, state, status, done_day."""
    cfg = SPRINTS[sprint]
    _, rows = table_with(md_at(src, cfg["backlog"]), "Task", "Item", "Description", "Owner", "Est")
    c = {k: col(rows, k) for k in ("task", "item", "description", "owner", "est", "actual", "status")}
    done_col = next((i for i, h in enumerate(rows[0]) if h.lower().startswith("done on")), None)
    dates = [ddmm(d) for d in cfg["days"]]
    out = []
    for r in rows[1:]:
        if not re.match(r"S\d-[TD]\d+", clean(r[c["task"]])):
            continue
        st = clean(r[c["status"]])
        when = ddmm(r[done_col]) if done_col is not None and clean(r[done_col]) else None
        if state(st) == "Done" and when is None:
            when = ddmm(st) or dates[-1]  # no date in the status: done by the Sprint end (merged PR of the last day)
        done_day = next((i for i, d in enumerate(dates) if when and d >= when), None) if state(st) == "Done" else None
        out.append({"id": clean(r[c["task"]]), "item": clean(r[c["item"]]), "task": clean(r[c["description"]]),
                    "owner": clean(r[c["owner"]]), "est": num(r[c["est"]]), "actual": actual_hours(r[c["actual"]]),
                    "actual_text": clean(r[c["actual"]]), "status": st, "state": state(st), "done_day": done_day})
    return out


def actual_hours(text):
    """'0.75 (Chính, logged 09/11)' → 0.75; '0.25 Đạt · 0.25 Chính' → 0.5 (one figure per member, summed)."""
    t = re.sub(r"\([^)]*\)", "", clean(text))
    parts = [num(x) for x in re.split(r"[·+]", t) if num(x) is not None]
    return round(sum(parts), 2) if parts else None


def remaining(task, n_days):
    """Remaining hours at the end of each Sprint day: the estimate until the task is Done, then 0."""
    return [0 if task["done_day"] is not None and d >= task["done_day"] else task["est"] for d in range(n_days)]


def member_totals(sprint, src):
    """Planned and actual hours per member, from the total row of the Sprint backlog."""
    _, rows = table_with(md_at(src, SPRINTS[sprint]["backlog"]), "Task", "Item", "Description", "Owner", "Est")
    total = next(r for r in rows if "total" in clean(r[col(rows, "description")]).lower()
                 or "total" in clean(r[0]).lower())
    plan = dict((n, float(v)) for n, v in re.findall(r"(Đạt|Chính) ([\d.]+)", clean(total[col(rows, "owner")])))
    act = dict((n, float(v)) for n, v in re.findall(r"(Đạt|Chính) ([\d.]+)", clean(total[col(rows, "actual")])))
    if not plan:  # S3 total row has no split: plan = sum of tasks ("Both" half each)
        plan = {"Đạt": 0.0, "Chính": 0.0}
        for t in sprint_tasks(sprint, src):
            for who in ("Đạt", "Chính"):
                if t["owner"].startswith("Both"):
                    plan[who] += t["est"] / 2
                elif who in t["owner"]:
                    plan[who] += t["est"]
    return plan, act


def product_backlog(src):
    text = md_at(src, "pm/backlog/product-backlog.md")
    acs = {}
    for m in re.finditer(r"^- \*\*((?:US|NFR)-\d+)/(AC-\d+)( \([MEB]\))?\*\*\s*(.*)$", text, re.M):
        acs.setdefault(m.group(1), []).append(f"{m.group(2)}{m.group(3) or ''}: {clean(m.group(4))}")
    items = []
    for heading, rows in tables(text):
        hdr = [h.lower() for h in rows[0]]
        if "user story" in hdr:
            for r in rows[1:]:
                d = dict(zip(hdr, r))
                items.append({"rank": d.get("rank"), "id": clean(d["id"]), "f": clean(d.get("f", "")),
                              "story": clean(d["user story"]), "sp": num(d["sp"]), "moscow": clean(d["moscow"]),
                              "sprint": clean(d.get("sprint (plan)") or d.get("sprint") or ""),
                              "v0": clean(d.get("v0 id", "")), "cr": heading.startswith("B.")})
        elif "reason" in hdr:
            for r in rows[1:]:
                d = dict(zip(hdr, r))
                items.append({"rank": None, "id": clean(d["id"]), "f": "", "story": clean(d["story (short)"]),
                              "sp": None, "moscow": "Won't", "sprint": "R2", "v0": clean(d.get("v0 id", "")),
                              "v0sp": clean(d.get("v0 sp", "")), "reason": clean(d["reason"]), "cr": False})
    return text, items, acs


# ---------------------------------------------------------------- Excel helpers
from openpyxl import Workbook, load_workbook  # noqa: E402
from openpyxl.chart import LineChart, Reference  # noqa: E402
from openpyxl.styles import Alignment, Font, PatternFill  # noqa: E402
from openpyxl.utils import get_column_letter  # noqa: E402

WRAP = Alignment(wrap_text=True, vertical="top")
NOTE_FONT = Font(name="Calibri", size=10, italic=True, color="404040")
GREEN = {"FFE2EFDA", "FFC6EFCE", "FFD9EAD3", "FFE2F0D9", "FFA9D08E", "FFC6E0B4"}


def _is_green(cell):
    f = cell.fill
    return f is not None and f.fill_type == "solid" and (f.fgColor.rgb or "").upper() in GREEN


def restyle_examples(ws, first, last, ncol, base_row):
    """Example rows of the template (green) take the style of an ordinary input row."""
    for r in range(first, last + 1):
        if any(_is_green(ws.cell(r, c)) for c in range(1, ncol + 1)):
            for c in range(1, ncol + 1):
                ws.cell(r, c)._style = copy.copy(ws.cell(base_row, c)._style)


def put(ws, r, c, v, wrap=True):
    cell = ws.cell(r, c)
    cell.value = v
    if wrap:
        a = copy.copy(cell.alignment)
        cell.alignment = Alignment(horizontal=a.horizontal, vertical="top", wrap_text=True)
    return cell


def fit_rows(ws, first, last, ncol, min_h=15):
    for r in range(first, last + 1):
        lines = 1
        for c in range(1, ncol + 1):
            v = ws.cell(r, c).value
            if v is None or (isinstance(v, str) and v.startswith("=")):
                continue
            w = ws.column_dimensions[get_column_letter(c)].width or 10
            n = sum(max(1, -(-len(part) // max(1, int(w * 1.3)))) for part in str(v).split("\n"))
            lines = max(lines, n)
        ws.row_dimensions[r].height = max(min_h, 13 * lines + 3)


def notes_block(ws, row, last_col, title, lines):
    """Text under a template table: a bold title and one merged, wrapped row per line."""
    ws.cell(row, 1, title).font = Font(name="Calibri", size=11, bold=True)
    row += 1
    width = sum((ws.column_dimensions[get_column_letter(c)].width or 10) for c in range(1, last_col + 1))
    for line in lines:
        c = ws.cell(row, 1, line)
        c.font = Font(name="Calibri", size=10)
        c.alignment = WRAP
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=last_col)
        ws.row_dimensions[row].height = 14.5 * sum(max(1, -(-len(p) // int(width * 1.1))) for p in line.split("\n")) + 3
        row += 1
    return row + 1


def version_lines(text):
    _, rows = table_with(text, "Version", "Date", "Author", "Change")
    return [f"v{clean(r[0])} · {clean(r[1])} · {clean(r[2])}: {clean(r[3])}" for r in rows[1:]]


def copy_sheet(src, wb, name=None, index=None):
    """Copy a worksheet from another workbook: values (formulas kept as written), styles, sizes, merges, links."""
    ws = wb.create_sheet(name or src.title, index)
    for row in src.iter_rows():
        for c in row:
            if c.value is None and not c.has_style:
                continue
            d = ws.cell(c.row, c.column)
            d.value = c.value
            d.data_type = c.data_type
            if c.has_style:
                d.font, d.fill, d.border = copy.copy(c.font), copy.copy(c.fill), copy.copy(c.border)
                d.alignment, d.number_format, d.protection = copy.copy(c.alignment), c.number_format, copy.copy(c.protection)
            if c.hyperlink is not None:
                d.hyperlink = copy.copy(c.hyperlink)
    for rng in src.merged_cells.ranges:
        ws.merge_cells(str(rng))
    for k, dim in src.column_dimensions.items():
        ws.column_dimensions[k].width = dim.width
    for k, dim in src.row_dimensions.items():
        if dim.height:
            ws.row_dimensions[k].height = dim.height
    ws.sheet_view.showGridLines = src.sheet_view.showGridLines
    ws.freeze_panes = src.freeze_panes
    ws.page_setup.orientation = src.page_setup.orientation
    ws.page_setup.paperSize = src.page_setup.paperSize
    ws.page_setup.fitToWidth, ws.page_setup.fitToHeight = src.page_setup.fitToWidth, src.page_setup.fitToHeight
    ws.sheet_properties.pageSetUpPr.fitToPage = src.sheet_properties.pageSetUpPr.fitToPage
    return ws


# ---------------------------------------------------------------- c2 sheets
def fill_team(wb, sprint):
    ws = wb["Team"]
    ws["B3"] = TEAM
    ws["B4"] = 3
    ws["B5"] = 1
    ws["C5"] = ("The 20 h per member per Sprint (4 h × 5 days, PMP Part 3 §3.5) are already focused hours, so the "
                "factor is 1.0 and the capacity stays 40 h per Sprint as in c1 and c3 (0.8 would give 32 h).")
    ws["A6"] = "Đơn giá / Rate (VND per hour)"
    ws["B6"] = RATE
    ws["A6"].font = copy.copy(ws["A5"].font)
    ws["B6"]._style = copy.copy(ws["B5"]._style)
    ws["B6"].number_format = "#,##0"
    ws["C6"] = "Final Project brief; used for BAC, EVM and the cost impact in ChangeLog"
    for c in ("C5", "C6"):
        ws[c].font = NOTE_FONT
        ws[c].alignment = Alignment(wrap_text=True, vertical="top")
    ws.merge_cells("C5:F5")
    ws.row_dimensions[5].height = 44
    ws.merge_cells("C6:F6")
    restyle_examples(ws, 8, 10, 6, 11)
    members = [(CHINH, "PO + Developer", 2), (DAT, "Developer", "1, 3")]
    for r, (m, role, lead) in zip((8, 9), members):
        for c, v in zip(range(1, 6), (m[0], m[1], role, lead, 20)):
            ws.cell(r, c).value = v
    for c in range(1, 6):
        ws.cell(10, c).value = None
    row = 17
    lines = ["Hours per Sprint are the planned capacity from plan/INPUTS.md §2 (confirmed by both members, 30/10/2026)."]
    if sprint != "S1":
        lines.append("Baseline v1.1 (04/11/2026, CR-06 Option B): 120 h capacity + 12 h CR-06 = 132 planned hours, "
                     "BAC 26,400,000 VND (Release Plan v1.3).")
    notes_block(ws, row, 6, "Notes", lines)


def fill_product_backlog(wb, sprint, src, done_ids, inprog_ids):
    ws = wb["ProductBacklog"]
    text, items, acs = product_backlog(src)
    restyle_examples(ws, 5, 8, 12, 9)
    order = 0
    for i, it in enumerate(items):
        r = 5 + i
        if it["moscow"] != "Won't":
            order += 1
        sprint_no = re.sub(r"\D", "", it["sprint"]) if it["sprint"].startswith("S") else it["sprint"]
        status = ("Done" if it["id"] in done_ids else "In Progress" if it["id"] in inprog_ids else "To Do") \
            if it["moscow"] != "Won't" else None
        cr = "CR-06" if it["cr"] else ("CR-06 (rework)" if it["id"] in ("US-03", "US-04") and sprint != "S1" else None)
        if it["moscow"] == "Won't":
            note = f"v0 {it['v0']}, v0 SP {it['v0sp']} (not estimated for R1.0). {it['reason']}"
        else:
            note = f"v0 ID: {it['v0']}" if it["v0"] else None
            if it["cr"] and "if approved" in it["moscow"]:
                note = "Pending CCB on 30/10/2026 – not in baseline v1.0 (not counted in PSP)"
        f = it["f"].split(",")[0].split("/")[0].strip()
        vals = [order if it["moscow"] != "Won't" else None, it["id"], FEATURES.get(f, it["f"]) if it["f"] else None,
                it["story"], it["moscow"], nice(it["sp"]), "\n".join(acs.get(it["id"], [])) or None, None,
                int(sprint_no) if sprint_no.isdigit() else sprint_no or None, status, cr, note]
        for c, v in enumerate(vals, 1):
            put(ws, r, c, v)
    ws.column_dimensions["D"].width = max(ws.column_dimensions["D"].width or 0, 48)
    ws.column_dimensions["G"].width = max(ws.column_dimensions["G"].width or 0, 70)
    ws.column_dimensions["L"].width = max(ws.column_dimensions["L"].width or 0, 32)
    fit_rows(ws, 5, 4 + len(items), 12)
    lines = ["Status = Product Owner acceptance against the Story DoD at the date of this file; In Progress = built "
             "or started, not yet accepted. DoR column: the DoR check per item was not recorded in the sources "
             "(see the DoR rules in the Definition of Ready); left blank.",
             "Won't items are kept for Release 2 and are not counted in PSP."]
    row = notes_block(ws, 45, 12, "Notes", lines)
    notes_block(ws, row, 12, "Version history (Product Backlog)", version_lines(text))


def fill_poker(wb, src):
    ws = wb["PlanningPoker"]
    text = md_at(src, "pm/backlog/planning-poker-log.md")
    restyle_examples(ws, 5, 6, 10, 7)
    for r in (5, 6):
        for c in range(1, 11):
            if c not in (7, 8):
                ws.cell(r, c).value = None
    row = 5
    for heading, rows in tables(text):
        hdr = [h.lower() for h in rows[0]]
        if not (hdr[0] == "item" and "round" in hdr and "đạt" in hdr):
            continue
        date = re.search(r"(\d{2}/\d{2}/\d{4})", heading)
        held = "not yet held" not in heading.lower() and "prepared" not in heading.lower()
        for r in rows[1:]:
            d = dict(zip(hdr, r))
            votes = [clean(d["đạt"]), clean(d["chính"])]
            if not held and not any(votes):
                continue
            item = clean(d["item"])
            sid = re.match(r"(?:US|NFR)-\d+", item)
            why = clean(d.get("basis of the estimate") or d.get("discussion (why highest / lowest)") or "")
            if "no voting" in heading.lower() or "same method" in heading.lower():
                why = "PO estimate, no voting round (issue I-04). " + why
            vals = [date.group(1) if date else None, sid.group() if sid else item, clean(d["round"]),
                    nice(num(votes[0])) if num(votes[0]) is not None else votes[0],
                    nice(num(votes[1])) if num(votes[1]) is not None else votes[1], None]
            for c, v in enumerate(vals, 1):
                put(ws, row, c, v)
            put(ws, row, 9, nice(num(d["result sp"])))
            put(ws, row, 10, why if not sid or item == sid.group() else f"{item}: {why}")
            row += 1
    ws.column_dimensions["J"].width = max(ws.column_dimensions["J"].width or 0, 70)
    fit_rows(ws, 5, row - 1, 10)
    lines = ["Column 'Vote M3' is empty: the team has 2 members. '–' = no vote cast (PO estimate, see the reasoning)."]
    if "Session 3" in text and "NOT YET HELD" in text:
        lines.append("Session 3 (real voting for the Sprint 3 items) was prepared for Planning 3 on 06/11/2026 and "
                     "was not yet held at the date of this file.")
    row = notes_block(ws, 42, 10, "Notes", lines)
    notes_block(ws, row, 10, "Version history (Planning Poker log)", version_lines(text))


def fill_backlog_sheet(wb, sprint, src):
    cfg = SPRINTS[sprint]
    ws = wb[f"{sprint}_Backlog"]
    tasks = sprint_tasks(sprint, src)
    nd = len(cfg["days"])
    last = 4 + max(25, len(tasks))
    restyle_examples(ws, 5, 6, 14, 7)
    if last > 29:  # more tasks than template rows: extend the input rows with the same style
        for r in range(30, last + 1):
            for c in range(1, 15):
                ws.cell(r, c)._style = copy.copy(ws.cell(29, c)._style)
    for r in range(5, last + 1):
        for c in range(1, 15):
            ws.cell(r, c).value = None
    ws["O4"] = "Ghi chú / Note"
    ws["O4"]._style = copy.copy(ws["N4"]._style)
    for i, d in enumerate(cfg["days"]):
        ws.cell(4, 6 + i).value = f"D{i + 1}\n{d}"
        ws.cell(4, 6 + i).alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    for i in range(nd, 7):
        ws.cell(4, 6 + i).value = "–"
    for k, t in enumerate(tasks):
        r = 5 + k
        rem = remaining(t, nd)
        today = datetime.now(TZ7)
        for i, dname in enumerate(cfg["days"]):  # days not reached yet stay empty (Sprint in progress)
            m_, d_ = ddmm(dname)
            if (m_, d_) > (today.month, today.day) and sprint not in SUBMITTED and src not in SUBMITTED:
                rem[i] = None
        vals = [t["id"], t["item"], t["task"], t["owner"], nice(t["est"]), *[nice(x) for x in rem],
                *([None] * (7 - nd)), nice(t["actual"]) if t["actual"] is not None else (t["actual_text"] or None),
                t["state"]]
        for c, v in enumerate(vals, 1):
            put(ws, r, c, v)
        put(ws, r, 15, t["status"])
        ws.cell(r, 15)._style = copy.copy(ws.cell(r, 3)._style)
        ws.cell(r, 15).alignment = WRAP
    rng = f"5:{last}"
    a, b = rng.split(":")
    ws["R5"] = f"=SUM(E{a}:E{b})"
    for i in range(7):
        r = 6 + i
        letter = get_column_letter(6 + i)
        if i < nd:
            ws.cell(r, 16).value = f"D{i + 1} {cfg['days'][i]}"
            ws.cell(r, 17).value = f"=$R$5*(1-{i}/{nd - 1})"  # same plan line as the submitted burndown charts
            ws.cell(r, 18).value = f'=IF(COUNT({letter}{a}:{letter}{b})=0,"",SUM({letter}{a}:{letter}{b}))'
        else:
            for c in (16, 17, 18):
                ws.cell(r, c).value = None
    ws["P5"] = "D0 start"
    ws["Q5"] = "=$R$5"
    ws["R14"] = f"=SUM(M{a}:M{b})"
    ws["R15"] = f"=SUM(E{a}:E{b})"
    for c, w in zip("ABCDEMNOPQR", (9, 13, 46, 14, 10, 10, 12, 46, 16, 11, 13)):
        ws.column_dimensions[c].width = w
    for i in range(7):
        ws.column_dimensions[get_column_letter(6 + i)].width = 9
    ws.row_dimensions[4].height = 44
    fit_rows(ws, 5, 4 + len(tasks), 15)
    for r in range(5, 16):
        for c in (16, 17, 18):
            ws.cell(r, c).alignment = Alignment(vertical="top", horizontal=ws.cell(r, c).alignment.horizontal)
    ch = LineChart()
    ch.title = f"Sprint {cfg['n']} burndown (remaining hours)"
    ch.y_axis.title = "Hours"
    ch.x_axis.title = "Sprint day"
    ch.height, ch.width = 8, 16
    data = Reference(ws, min_col=17, max_col=18, min_row=4, max_row=5 + nd)
    ch.add_data(data, titles_from_data=True)
    ch.set_categories(Reference(ws, min_col=16, min_row=5, max_row=5 + nd))
    ch.series[0].graphicalProperties.line.dashStyle = "dash"
    ch.series[0].graphicalProperties.line.solidFill = "8A8A8A"
    ch.series[1].graphicalProperties.line.solidFill = "1F3A5F"
    ch.x_axis.delete = False
    ch.y_axis.delete = False
    ws.add_chart(ch, "P17")
    return ws, tasks, last


def burndown_notes(sprint, src, tasks, last):
    """Notes under the Sprint backlog: how remaining hours are derived, the burndown reading and the capacity check."""
    cfg = SPRINTS[sprint]
    text = md_at(src, cfg["backlog"])
    lines = [f"D1…D{len(cfg['days'])} = remaining planned hours at the end of each Sprint day: a task keeps its "
             "estimate until it is Done, then 0 (the same rule as the burndown in the Sprint Report). "
             "Status detail per task in column O."]
    lines += [clean(p.lstrip("> ")) for p in text.splitlines()
              if p.startswith("> **Check against capacity") or p.startswith("> **Actual hours")
              or p.startswith('"Both" tasks')]
    return lines


def fill_risks(wb, sprint):
    ws = wb["RiskRegister"]
    restyle_examples(ws, 5, 5, 15, 6)
    for c in range(1, 16):
        if c not in (7, 8):
            ws.cell(5, c).value = None
    regs = {}
    for s in ("S1", "S2", "S3")[: SPRINTS[sprint]["n"]]:
        text = md_at(s, "pm/pmp/05-risk-plan.md")
        _, rows = table_with(text, "ID", "Risk", "Cat", "P", "I")
        regs[s] = {clean(r[0]): dict(zip([h.lower() for h in rows[0]], r)) for r in rows[1:]}
    latest = regs[sprint]
    for k, (rid, d) in enumerate(latest.items()):
        r = 5 + k
        parts = [p.strip() for p in clean(d["risk (cause → event → effect)"]).split("→")]
        cause, risk = (parts[0], " → ".join(parts[1:])) if len(parts) > 1 else ("", parts[0])
        sr = clean(d["strategy & response"])
        m = re.match(r"(Avoid|Mitigate|Transfer|Accept|Escalate)\s*[:–-]\s*(.*)", sr, re.S)
        strategy, response = (m.group(1), m.group(2)) if m else ("", sr)
        assert int(num(d["p×i"])) == int(num(d["p"])) * int(num(d["i"])), rid
        vals = [rid, risk, cause, clean(d["cat."]), int(num(d["p"])), int(num(d["i"])), None, None, strategy,
                response, clean(d["owner"]), clean(d["trigger"])]
        for c, v in enumerate(vals, 1):
            if c not in (7, 8):
                put(ws, r, c, v)
        for j, s in enumerate(("S1", "S2", "S3")):
            if s in regs and rid in regs[s]:
                st = clean(regs[s][rid]["status"])
                st = re.sub(r"^Watching", "Monitoring", st)
                put(ws, r, 13 + j, st)
            elif s in regs:
                put(ws, r, 13 + j, "– (added later)")
    for c, w in zip("ABCDIJKLMNO", (7, 40, 30, 12, 11, 40, 11, 24, 24, 30, 30)):
        ws.column_dimensions[c].width = w
    fit_rows(ws, 5, 4 + len(latest), 15)
    text = md_at(sprint, "pm/pmp/05-risk-plan.md")
    lines = ["Risk and cause are the two parts of the register entry 'cause → event → effect'. Score and Level are "
             "the template formulas; the register uses the same bands (1–6 Low, 8–12 Medium, 15–25 High). Status S1 / "
             "S2 / S3 = status recorded in the risk register at the end of each Sprint."]
    row = notes_block(ws, 33, 15, "Notes", lines)
    notes_block(ws, row, 15, "Version history (risk register, PMP Part 5)", version_lines(text))


def fill_issues(wb, sprint):
    ws = wb["IssueLog"]
    text = md_at(sprint, "pm/pmp/05-risk-plan.md")
    _, rows = table_with(text, "ID", "From risk", "Date", "Description")
    k = 0
    for r in rows[1:]:
        d = dict(zip([h.lower() for h in rows[0]], r))
        if not clean(d["id"]):
            continue
        vals = [clean(d["id"]), clean(d["date"]), clean(d["description"]), clean(d["from risk"]),
                clean(d["impact"]), clean(d["action"]), clean(d["owner"]), "–", clean(d["status"])]
        for c, v in enumerate(vals, 1):
            put(ws, 5 + k, c, v)
        k += 1
    for c, w in zip("ABCDEFGHI", (7, 11, 40, 11, 32, 44, 12, 7, 32)):
        ws.column_dimensions[c].width = w
    fit_rows(ws, 5, 4 + k, 9)
    notes_block(ws, 27, 9, "Notes", ["Due: no due date was recorded in the issue log; actions are tracked by Sprint "
                                     "(see the Weekly Status and the Sprint Report)."])


def fill_changes(wb, sprint):
    ws = wb["ChangeLog"]
    text = md_at(sprint, "pm/change/change-log.md")
    _, rows = table_with(text, "CR ID", "Date received", "Requester")
    for r in range(5, 16):
        ws.cell(r, 7).value = f'=IF(F{r}="","",F{r}*Team!$B$6)'
        ws.cell(r, 7).number_format = "#,##0"
    k = 0
    for r in rows[1:]:
        d = dict(zip([h.lower() for h in rows[0]], r))
        if not clean(d["cr id"]).startswith("CR"):
            continue
        decided = clean(d["decision"])
        approved = decided.lower().startswith("approve")
        pending = not decided or decided.upper() == "TBD" or decided.lower().startswith("pending")
        impact = clean(d["impact summary (plan)"])
        hours = re.search(r"≈\s*(\d+)\s*h", impact)
        hours = num(hours.group(1)) if hours else (0 if "unchanged" in impact.lower() else None)
        psp = re.search(r"PSP (\d+) → (\d+)", " ".join(clean(v) for v in d.values()))
        sp = (int(psp.group(2)) - int(psp.group(1))) if psp else (7 if clean(d["cr id"]) == "CR-06" else None)
        if sp is not None and not approved:
            sp = f"+{sp} if approved" if clean(d["cr id"]) != "CR-06" else "TBD (Planning Poker before CCB)"
        vals = [clean(d["cr id"]), clean(d["date received"]), clean(d["requester"]),
                f"{clean(d['title'])}. {clean(d['description'])}", sp, hours, None,
                "Approved" if approved else ("Pending" if pending else decided),
                clean(d["ccb date"]) if approved else f"{clean(d['ccb date']).replace(' (planned', ' (planned')}",
                "baseline-v1.1" if approved else ("baseline-v1.0" if clean(d["cr id"]) == "CR-06" else "baseline-v1.1 (current)"),
                clean(d["status"])]
        for c, v in enumerate(vals, 1):
            if c != 7:
                put(ws, 5 + k, c, nice(v) if isinstance(v, float) else v)
        k += 1
    for c, w in zip("ABCDEFGHIJK", (8, 11, 16, 60, 14, 12, 16, 12, 14, 14, 44)):
        ws.column_dimensions[c].width = w
    fit_rows(ws, 5, 4 + k, 11)
    lines = ["Cost impact = hours impact × rate (Team!B6, 200,000 VND/h). The template formula pointed to a missing "
             "cell (Team!#REF!) and was corrected.",
             "Hours impact: ≈ 12 h (plan), from the CR-06 impact analysis; SP impact: US-24 5 SP + US-25 2 SP "
             "(PSP 55 → 62) once approved. Full form, options and impact: c4_ChangeRequest_CR01 (and the CR06_Impact "
             "sheet from Sprint 2)."]
    for r in rows[1:]:
        d = dict(zip([h.lower() for h in rows[0]], r))
        if clean(d["cr id"]).startswith("CR"):
            lines.append(f"{clean(d['cr id'])} – affected: {clean(d['affected'])}; customer priority: "
                         f"{clean(d['customer priority'])}; options: {clean(d['options'])}; decision: "
                         f"{clean(d['decision'])}; reason: {clean(d['reason'])}; baseline updated: "
                         f"{clean(d['baseline updated'])}; impact summary (plan): {clean(d['impact summary (plan)'])}")
    row = notes_block(ws, 18, 11, "Notes", lines)
    notes_block(ws, row, 11, "Version history (Change Log)", version_lines(text))


def fill_ci(wb, sprint):
    ws = wb["ConfigItems"]
    text = md_at(sprint, "pm/pmp/06-configuration-management.md")
    _, rows = table_with(text, "CI-ID", "Item", "Type", "Location")
    restyle_examples(ws, 5, 6, 8, 7)
    for r in (5, 6):
        for c in range(1, 9):
            ws.cell(r, c).value = None
    for k, r in enumerate(rows[1:]):
        d = dict(zip([h.lower() for h in rows[0]], r))
        vals = [clean(d["ci-id"]), clean(d["item"]), clean(d["type"]), clean(d["location"]), clean(d["owner"]),
                "–", clean(d["baseline"]), "–"]
        for c, v in enumerate(vals, 1):
            put(ws, 5 + k, c, v)
    for c, w in zip("ABCDEFGH", (8, 30, 14, 40, 16, 12, 30, 14)):
        ws.column_dimensions[c].width = w
    fit_rows(ws, 5, 4 + len(rows) - 1, 8)
    _, tags = table_with(text, "Tag", "When", "Contents")
    lines = ["Version and last change are not tracked per item in the configuration management plan; the baseline / "
             "tag column shows the baseline each item belongs to."]
    lines += [f"{clean(t[0])} – {clean(t[1])}: {clean(t[2])}" for t in tags[1:]]
    row = notes_block(ws, 27, 8, "Notes and baselines (PMP Part 6 §6.5)", lines)
    notes_block(ws, row, 8, "Version history (configuration management plan)", version_lines(text))


def index_sheet(wb, sprint, old_index=None):
    ws = wb.create_sheet("Index", 1)
    ws["A1"] = "E-Commercial Book Store – Release 1.0 · Project Workbook"
    ws["A1"].font = Font(name="Calibri", size=16, bold=True, color="1F3A5F")
    meta = []
    if old_index is not None:
        for r in range(3, 13):
            k, v = old_index.cell(r, 1).value, old_index.cell(r, 2).value
            if k:
                meta.append((k, v))
    else:
        meta = [("Team", TEAM), ("Course", "Software Project Management (72ITSE41503), HK261 – Final Project"),
                ("Sponsor / Customer", "Dr. Bùi Minh Phụng"),
                ("Members", f"{DAT[0]} ({DAT[1]}) – Leader S1, S3 · {CHINH[0]} ({CHINH[1]}) – PO, Leader S2"),
                ("Version", f"Sprint {SPRINTS[sprint]['n']} submission"),
                ("Jira board", "https://tdat100524.atlassian.net/jira/software/projects/ECBS/boards/2"),
                ("Repository", f"https://github.com/{REPO}"), ("Hosted site", "https://pagetunnel.vercel.app/")]
    when = {"S1": "02/11/2026", "S2": "06/11/2026"}.get(sprint)
    meta.append(("Layout", "Lecturer template SprintBacklog_Template.xlsx (received 10/11/2026). " + (
        f"Data unchanged from the file submitted for Sprint {SPRINTS[sprint]['n']} (data as of {when})."
        if when else "Draft – data as of the export date; final at the Sprint end.")))
    r = 3
    for k, v in meta:
        ws.cell(r, 1, k).font = Font(name="Calibri", size=10, bold=True)
        c = ws.cell(r, 2, v)
        c.font = Font(name="Calibri", size=10)
        c.alignment = WRAP
        r += 1
    r += 1
    ws.cell(r, 1, "Sheets").font = Font(name="Calibri", size=12, bold=True, color="1F3A5F")
    r += 1
    from openpyxl.worksheet.hyperlink import Hyperlink
    for name in wb.sheetnames:
        if name == "Index":
            continue
        c = ws.cell(r, 1, name)
        c.hyperlink = Hyperlink(ref=c.coordinate, location=f"'{name}'!A1", display=name)
        c.font = Font(name="Calibri", size=10, color="1F5FA8", underline="single")
        ws.cell(r, 2, SHEET_INFO.get(name, "")).font = Font(name="Calibri", size=10)
        r += 1
    ws.column_dimensions["A"].width = 20
    ws.column_dimensions["B"].width = 110
    ws.sheet_view.showGridLines = False


SHEET_INFO = {
    "README": "Lecturer's instructions for the template", "Team": "Team, members, capacity and rate",
    "ProductBacklog": "Product Backlog with all acceptance criteria (Given–When–Then)",
    "PlanningPoker": "Planning Poker / estimation log", "S1_Backlog": "Sprint 1 Backlog and burndown",
    "S2_Backlog": "Sprint 2 Backlog and burndown", "S3_Backlog": "Sprint 3 Backlog and burndown",
    "RiskRegister": "Risk register (status per Sprint)", "IssueLog": "Issue log", "ChangeLog": "Change Log",
    "ConfigItems": "Configuration items and baselines", "DoR": "Definition of Ready",
    "ReleasePlan": "Master and Release Plan (capacity, BAC, baselines)",
    "EVM": "EVM snapshot end of Sprint 1", "EVM_S1": "EVM snapshot end of Sprint 1 (baseline v1.0)",
    "EVM_S2": "EVM snapshot end of Sprint 2 (baseline v1.1)", "EVM_S3": "EVM snapshot end of Sprint 3",
    "CR06_Impact": "CR-06 change request, impact analysis, CCB decision", "TestCases_F1": "Test cases F1",
    "TestCases_F2F3": "Test cases F2, F3, CR-06 + F1 regression", "TestCases_F4F5": "Test cases F4, F5, NFR-05, US-25",
    "WeeklyStatus_S2": "Weekly Status Report (Sprint 2)", "WeeklyStatus_S3": "Weekly Status Report (Sprint 3)",
    "POAcceptance_S3": "PO acceptance record (Sprint 3)",
}
EXTRA = {  # sheets of the submitted workbook that the template does not have – copied unchanged, in this order
    "S1": ["DoR", "ReleasePlan", "EVM", "TestCases_F1"],
    "S2": ["DoR", "ReleasePlan", "EVM_S1", "EVM_S2", "CR06_Impact", "TestCases_F1", "TestCases_F2F3", "WeeklyStatus_S2"],
}


def accepted(sprint, src):
    """Item IDs Done / In Progress at the date of the Sprint file (PO acceptance)."""
    if sprint == "S1":
        return set(), {"US-01", "US-02", "US-03", "US-04", "NFR-01", "NFR-03"}
    if sprint == "S2":
        done = {"US-01", "US-02", "US-03", "US-04", "NFR-01", "US-10", "NFR-02"}
        return done, {"NFR-03", "US-05", "US-06", "US-07", "US-08", "US-09", "NFR-04", "US-24"}
    text = md_at(src, "pm/sprints/S3/po-acceptance.md")
    done = set(re.findall(r"\b((?:US|NFR)-\d+)\b[^|\n]*\|[^\n]*\bDone\b", text))
    done |= {"US-01", "US-02", "US-03", "US-04", "NFR-01", "US-10", "NFR-02"}
    return done, {"NFR-03", "US-11", "US-12", "US-13", "NFR-05", "US-25"} - done


def c2_workbook(sprint, out):
    src = sprint
    wb = load_workbook(TPL / "SprintBacklog_Template.xlsx")
    for ws in wb.worksheets:  # openpyxl does not keep charts on load; they are drawn again below
        ws._charts = []
    done, inprog = accepted(sprint, src)
    fill_team(wb, sprint)
    fill_product_backlog(wb, sprint, src, done, inprog)
    fill_poker(wb, src)
    for s in ("S1", "S2", "S3")[: SPRINTS[sprint]["n"]]:
        ws, tasks, last = fill_backlog_sheet(wb, s, src)
        lines = burndown_notes(s, src, tasks, last)
        if s != "S3":
            sub = sprint if sprint in SUBMITTED else "S2"
            old = load_workbook(submitted_file(sub, "c2"))
            bname = "Burndown" if sub == "S1" else f"Burndown_{s}"
            for row in old[bname].iter_rows(values_only=True):
                v = row[0]
                if isinstance(v, str) and len(v) > 60:
                    lines.append(v)
        row = notes_block(ws, last + 3, 14, "Notes (burndown and capacity)", lines)
        notes_block(ws, row, 14, "Version history (Sprint Backlog)", version_lines(md_at(src, SPRINTS[s]["backlog"])))
    for s in ("S2", "S3")[SPRINTS[sprint]["n"] - 1:]:
        ws = wb[f"{s}_Backlog"]
        ws["A2"] = f"Sprint {s[1]} has not started at the date of this file."
        ws["A2"].font = NOTE_FONT
    fill_risks(wb, sprint)
    fill_issues(wb, sprint)
    fill_changes(wb, sprint)
    fill_ci(wb, sprint)
    old_index = None
    if sprint in SUBMITTED:
        old = load_workbook(submitted_file(sprint, "c2"))
        old_index = old["Index"] if "Index" in old.sheetnames else None
        for name in EXTRA[sprint]:
            copy_sheet(old[name], wb)
    else:
        old = load_workbook(submitted_file("S2", "c2"))
        for name in EXTRA["S2"]:
            copy_sheet(old[name], wb)
        import workbook_style
        for name, rel, sub in [("TestCases_F4F5", "pm/sprints/S3/test-cases-F4F5.md", "F4, F5, NFR-05, US-25 test cases"),
                               ("POAcceptance_S3", "pm/sprints/S3/po-acceptance.md", "PO acceptance in Sprint 3")]:
            if (ROOT / rel).exists():
                workbook_style.md_sheet(wb, name, ROOT / rel, subtitle=sub)
    index_sheet(wb, sprint, old_index)
    for ws in wb.worksheets:  # print set-up (the template has none): A4 landscape, one page wide
        if (ws.title in SHEET_INFO or ws.title == "Index") and ws.title not in sum(EXTRA.values(), []):
            ws.page_setup.orientation = "landscape"
            ws.page_setup.paperSize = ws.PAPERSIZE_A4
            ws.page_setup.fitToWidth, ws.page_setup.fitToHeight = 1, 0
            ws.sheet_properties.pageSetUpPr.fitToPage = True
    wb.active = 0
    wb.save(out)
    return out


# ---------------------------------------------------------------- Word helpers
import docx  # noqa: E402
from docx.oxml.ns import qn  # noqa: E402
from docx.shared import Cm, Pt  # noqa: E402

R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def set_cell(cell, text, size=10, bold=False):
    for p in cell.paragraphs[1:]:
        p._p.getparent().remove(p._p)
    p = cell.paragraphs[0]
    for r in list(p.runs):
        r._r.getparent().remove(r._r)
    for k, line in enumerate(str(text if text is not None else "").split("\n")):
        if k:
            p = cell.add_paragraph()
        run = p.add_run(line)
        run.font.size = Pt(size)
        run.bold = bold


def fill_table(tbl, rows, start=1, size=10, keep_last=False):
    """Write rows into a template table. Data rows are clones of the first data row; with keep_last=True the
    template's last row (a total row with its own layout) stays last and takes the last value row."""
    trs = tbl.rows
    last_tr = trs[-1]._tr if keep_last else None
    body = [r._tr for r in trs[start:]] if not keep_last else [r._tr for r in trs[start:-1]]
    proto = body[0]
    for tr in body[1:]:
        tbl._tbl.remove(tr)
    need = len(rows) - (1 if keep_last else 0)
    for _ in range(need - 1):
        proto.addnext(copy.deepcopy(proto))
    for row, vals in zip(tbl.rows[start:], rows):
        cells = []
        for c in row.cells:  # merged cells repeat: keep one per grid span
            if not cells or c._tc is not cells[-1]._tc:
                cells.append(c)
        for cell, v in zip(cells, vals):
            set_cell(cell, v, size)


def replace_text(paragraph, old, new):
    for r in paragraph.runs:
        if old in r.text:
            r.text = r.text.replace(old, new)


def heading_index(d, prefix):
    body = list(d.element.body)
    for i, el in enumerate(body):
        if el.tag == qn("w:p") and "".join(t.text or "" for t in el.iter(qn("w:t"))).strip().startswith(prefix):
            return el
    raise KeyError(prefix)


def move_new(d, before, fn):
    """Run fn (which appends to the document), then move the appended elements in front of `before`."""
    body = d.element.body
    sect = body.find(qn("w:sectPr"))
    keep = list(body)  # holding the proxies keeps their ids stable (lxml reuses a live proxy)
    old = set(id(e) for e in keep)
    fn()
    new = [e for e in body if id(e) not in old and e is not sect]
    for e in new:
        before.addprevious(e)
    return new


def copy_rels(dst_doc, src_doc, el):
    """Re-point images and links of copied XML to parts of the destination document."""
    for node in el.iter():
        for attr in list(node.attrib):
            if not attr.startswith("{%s}" % R_NS):
                continue
            rid = node.get(attr)
            rel = src_doc.part.rels.get(rid)
            if rel is None:
                continue
            if rel.is_external:
                node.set(attr, dst_doc.part.relate_to(rel.target_ref, rel.reltype, is_external=True))
            elif "image" in rel.reltype:
                new_rid, _ = dst_doc.part.get_or_add_image(io.BytesIO(rel.target_part.blob))
                node.set(attr, new_rid)


def portrait_break(d):
    """A paragraph that closes a portrait section (clone of the body section properties)."""
    p = d.add_paragraph()._p
    sp = copy.deepcopy(d.element.body.find(qn("w:sectPr")))
    pPr = p.get_or_add_pPr()
    pPr.append(sp)
    return p


def copy_range(dst, src, start_prefix, stop_prefixes, demote=0):
    """Copy body elements of src from the paragraph starting with start_prefix up to (not incl.) the first stop."""
    body = list(src.element.body)
    texts = ["".join(t.text or "" for t in e.iter(qn("w:t"))).strip() if e.tag == qn("w:p") else None for e in body]
    i = next(k for k, t in enumerate(texts) if t is not None and t.startswith(start_prefix))
    j = next((k for k in range(i + 1, len(body)) if texts[k] is not None and any(texts[k].startswith(s) for s in stop_prefixes)), len(body))
    dst_sect = dst.element.body.find(qn("w:sectPr"))
    out = []
    for e in body[i:j]:
        if e.tag == qn("w:sectPr"):
            continue
        c = copy.deepcopy(e)
        for sp in c.iter(qn("w:sectPr")):  # section breaks keep their page size, use this document's header/footer
            new = copy.deepcopy(dst_sect)
            for tag in ("w:pgSz", "w:pgMar"):
                old = sp.find(qn(tag))
                if old is not None:
                    new.replace(new.find(qn(tag)), copy.deepcopy(old))
            sp.getparent().replace(sp, new)
        if demote:
            for ps in c.iter(qn("w:pStyle")):
                m = re.fullmatch(r"Heading(\d)", ps.get(qn("w:val")) or "")
                if m:
                    ps.set(qn("w:val"), f"Heading{min(int(m.group(1)) + demote, 6)}")
        if c.tag == qn("w:p"):
            t = "".join(x.text or "" for x in c.iter(qn("w:t"))).strip()
            ps = c.find(".//" + qn("w:pStyle"))
            if not t and ps is not None and (ps.get(qn("w:val")) or "").startswith("Heading") \
                    and c.find(".//" + qn("w:sectPr")) is None and c.find(".//" + qn("w:br")) is None:
                ps.set(qn("w:val"), "Normal")  # empty heading paragraphs: keep the spacing, not an empty outline entry
            for tnode in c.iter(qn("w:t")):
                if tnode.text and "PHẦN III" in tnode.text:
                    tnode.text = tnode.text.replace("PHẦN III", "PART III")
        copy_rels(dst, src, c)
        dst.element.body.insert(list(dst.element.body).index(dst_sect), c)
        out.append(c)
    if j == len(body):  # the range ran to the end: close it with the source's last section (e.g. landscape)
        last = src.element.body.find(qn("w:sectPr"))
        p = dst.add_paragraph()._p
        new = copy.deepcopy(dst_sect)
        for tag in ("w:pgSz", "w:pgMar"):
            new.replace(new.find(qn(tag)), copy.deepcopy(last.find(qn(tag))))
        p.get_or_add_pPr().append(new)
        out.append(p)
    return out


def tc_rows(src, rel):
    """Section 7 rows from a test case file: one row per test case."""
    text = md_at(src, rel)
    rows_out, extra_md = [], []
    for heading, rows in tables(text):
        hdr = [h.lower() for h in rows[0]]
        if hdr[0] != "tc":
            if heading.lower().startswith(("summary", "defects")):
                extra_md.append((heading, rows))
            continue
        g = lambda d, *ns: next((clean(d[h]) for h in hdr if any(h.startswith(n) for n in ns)), "")  # noqa: E731
        for r in rows[1:]:
            d = dict(zip(hdr, r))
            local = g(d, "actual – local", "automated (")
            hosted = g(d, "actual – hosted")
            if "given" in hdr:
                steps = f"Given {g(d, 'given')}\nWhen {g(d, 'when')}"
                expected = g(d, "then")
            else:
                steps = f"{heading}: same steps as the original test case"
                expected = "Same result as before the change"
            actual = "\n".join(x for x in (f"Automated: {local}" if local else "", f"Hosted: {hosted}" if hosted else "") if x)
            rows_out.append((clean(d["tc"]), g(d, "ac"), steps, expected, actual or TBD, verdict(local, hosted)))
    return rows_out, extra_md


def verdict(local, hosted):
    def word(s):
        s = s or ""
        hits = [(s.find(w), w) for w in ("Pass", "Fail", "Partial", "Blocked", "Not run", "TBD", "N/A") if w in s]
        return min(hits)[1] if hits else None
    lw, hw = word(local), word(hosted)
    if "Fail" in (lw, hw):
        return "☐ Fail"
    if hw == "Pass":
        return "☒ Pass"
    if lw == "Pass":
        return "☐ Pass (automated only)" if hw in (None, "Not run", "TBD", "Blocked") else f"☐ {hw}"
    return f"☐ {hw or lw or 'Not run'}"


def git_activity(sprint):
    """Commits (author date in the Sprint window, GMT+7) and pull requests opened in the window, per member."""
    cfg = SPRINTS[sprint]
    t0 = datetime.strptime(cfg["start"], "%d/%m/%Y").replace(tzinfo=TZ7)
    t1 = datetime.strptime(cfg["end"], "%d/%m/%Y").replace(tzinfo=TZ7) + timedelta(days=1)
    log = git("log", "--remotes=origin", "--no-merges", "--format=%H|%ae|%an|%aI")
    seen, commits = set(), {DAT[0]: 0, CHINH[0]: 0, "other": 0}
    for line in log.splitlines():
        h, email, name, when = line.split("|")
        if h in seen:
            continue
        seen.add(h)
        if not (t0 <= datetime.fromisoformat(when) < t1):
            continue
        who = DAT[0] if email == DAT[2] else CHINH[0] if email == CHINH[2] else "other"
        commits[who] += 1
    prs = {DAT[0]: [], CHINH[0]: []}
    try:
        data = json.loads(subprocess.run(["gh", "api", f"repos/{REPO}/pulls?state=all&per_page=100"],
                                         capture_output=True, text=True, check=True).stdout)
        for pr in data:
            when = datetime.fromisoformat(pr["created_at"].replace("Z", "+00:00"))
            who = DAT[0] if pr["user"]["login"] == DAT[3] else CHINH[0] if pr["user"]["login"] == CHINH[3] else None
            if who and t0 <= when < t1:
                prs[who].append(pr["number"])
    except (subprocess.CalledProcessError, FileNotFoundError):
        prs = None
    return commits, prs


# ---------------------------------------------------------------- c3 report
def c3_report(sprint, out):
    cfg = SPRINTS[sprint]
    src = sprint
    n = cfg["n"]
    snap = snapshot(sprint)
    sys.path.insert(0, str(snap / "tools"))
    mod = None
    if sprint == "S1":
        mod = importlib.import_module("export_s1_templates")
    elif sprint == "S2":
        mod = importlib.import_module("export_s2")
    d = docx.Document(TPL / "FP_Template_SprintReport.docx")
    for p in d.paragraphs:
        replace_text(p, "SPRINT #", f"SPRINT {n}")
    for s_ in d.sections:
        for hp in s_.header.paragraphs + s_.first_page_header.paragraphs:
            for r in hp.runs:
                r.text = r.text.replace("Team#", "Team6").replace("_S#", f"_S{n}")
    for p in list(d.paragraphs):  # template guidance lines
        if p.text.strip().startswith(("Mỗi ngày 1 dòng", "Chèn burndown")):
            p._p.getparent().remove(p._p)
    t = d.tables
    leader, po = cfg["leader"], CHINH
    for row, val in zip(t[0].rows, [TEAM, f"Sprint {n}: {cfg['start'][:5]} – {cfg['end']}",
                                    f"{leader[0]} ({leader[1]})", f"{po[0]} ({po[1]})",
                                    f"{DAT[0]} ({DAT[1]}) · {CHINH[0]} ({CHINH[1]})"]):
        set_cell(row.cells[1], val, 11)
    report_md = md_at(src, cfg["report"]) if cfg["report"] else ""
    _, vh = table_with(report_md, "Version", "Date", "Author", "Change")
    hist = [[clean(x) for x in r[:4]] for r in vh[1:]]
    lastv = hist[-1][0] if hist else ""
    m = re.match(r"(\d+)\.(\d+)", lastv)
    hist.append([f"{m.group(1)}.{int(m.group(2)) + 1}" if m else "1.0", "10/11/2026", CHINH[0],
                    "Moved into the lecturer's Sprint Report template (FP_Template_SprintReport.docx, received "
                    "10/11/2026); content and figures unchanged" + (f" from the Sprint {n} submission" if sprint in SUBMITTED else "")])
    fill_table(t[1], hist)

    # 1. Sprint Planning
    bl = md_at(src, cfg["backlog"])
    goal = clean(section(bl, "Sprint Goal").split("\n\n")[0]).strip('"')
    plan, act = member_totals(sprint, src)
    tasks = sprint_tasks(sprint, src)
    total_est = sum(x["est"] for x in tasks)
    if sprint == "S1":
        vel = "No reference velocity – first Sprint; 18 SP planned from PO estimates"
    elif sprint == "S2":
        vel = ("Sprint 1: 0 SP met the DoD at Planning 2 (18 SP planned; 14 SP accepted on 05/11 after the hosted run, "
               "NFR-01 accepted 06/11)")
    else:
        vel = ("Sprint 2: 5 SP met the DoD at the Sprint end (US-10, NFR-02); Sprint 1: 0 SP at its end, 16 SP "
               "accepted later (US-01…04 on 05/11, NFR-01 on 06/11)")
    rows2 = [goal, f"2 members × 20 h = 40 h (plan); planned task hours {nice(total_est)} h "
                   f"(Đạt {nice(plan.get('Đạt'))} · Chính {nice(plan.get('Chính'))})", vel,
             f"{cfg['committed']} SP" if sprint != "S3" else
             "39 SP: 15 SP new (US-11, US-12, US-13, NFR-05, US-25) + 24 SP carried from Sprint 2 (US-05…09, NFR-04, US-24)"]
    for row, val in zip(t[2].rows, rows2):
        set_cell(row.cells[1], val)
    pb_text, items, _ = product_backlog(src)
    titles = {it["id"]: it["story"] for it in items}
    if mod is not None and hasattr(mod, "ITEMS"):
        titles.update({x[0]: x[1] for x in mod.ITEMS})
    sp = {it["id"]: it["sp"] for it in items}

    def story(item):
        item_x = re.sub(r"(US|NFR)-(\d+)\.\.(\d+)", lambda m: ", ".join(f"{m.group(1)}-{k:02d}" for k in
                        range(int(m.group(2)), int(m.group(3)) + 1)), item)
        ids = re.findall(r"(?:US|NFR)-\d+", item_x)
        if not ids:
            return NON_STORY.get(item.split()[0], item), "–"
        return " · ".join(titles.get(i, i) for i in ids), " + ".join(str(nice(sp[i])) for i in ids if sp.get(i))
    rows3 = []
    for x in tasks:
        s_title, s_sp = story(x["item"])
        rows3.append((x["item"], s_title, s_sp, f"{x['id']} {x['task']}", x["owner"], nice(x["est"]),
                      x["actual_text"] or TBD, x["state"]))
    rows3.append(("", "Total", "", f"{len(tasks)} tasks", "", nice(total_est),
                  " · ".join(f"{k} {nice(v)}" for k, v in act.items()) or TBD, ""))
    fill_table(t[3], rows3, size=9)
    cap_notes = [clean(p.lstrip("> ")) for p in bl.splitlines() if p.startswith("> **Check against capacity")]
    anchor_daily = heading_index(d, "2. Daily Scrum log")
    if cap_notes:
        move_new(d, anchor_daily, lambda: [d.add_paragraph(c).runs[0].__setattr__("italic", True) for c in cap_notes])

    # 2. Daily Scrum log
    dl = md_at(src, cfg["daily"])
    _, drows = table_with(dl, "Date", "Member", "Yesterday", "Today")
    rows4 = []
    for r in drows[1:]:
        dd = dict(zip([h.lower() for h in drows[0]], r))
        y = clean(dd.get("yesterday"))
        hrs = clean(dd.get("hours logged in jira", ""))
        if hrs:
            y = f"{y}\n(Hours logged in Jira: {hrs})"
        rows4.append((clean(dd["date"]), clean(dd["member"]), y, clean(dd.get("today")),
                      clean(dd.get("blockers") or dd.get("impediments") or "")))
    if sprint == "S3":
        rows4 = daily_rows_s3(dl) or rows4
    fill_table(t[4], rows4 or [(TBD,) * 5], size=9)
    daily_notes = [clean(p.lstrip("> ")) for p in dl.splitlines() if p.strip() and not p.startswith(("|", "#"))][:4]
    if daily_notes:
        move_new(d, heading_index(d, "3. Kết quả Sprint"),
                 lambda: [d.add_paragraph(c).runs[0].__setattr__("italic", True) for c in daily_notes])

    # 3. Sprint results
    rows5, done_sp = [], 0
    if sprint == "S1":
        for iid, title, spv, acs, tc in mod.ITEMS:
            rows5.append((iid, title, spv, f"{TBD}/{acs}", TBD, TBD, f"Test cases: {tc}"))
        total_line = "0 of 18 SP met the DoD at 02/11/2026 (all 6 F1 items In Review); Review 1 decision TBD"
    elif sprint == "S2":
        for iid, title, spv, acp, tcp, dod, done, demo in mod.ITEMS:
            rows5.append((iid, title, spv, acp, dod, done, f"Test cases: {tcp}; demo: {demo}"))
            done_sp += spv if done == "Done" else 0
        total_line = f"{done_sp} of 29 SP Done at the Sprint end (US-10, NFR-02); 24 SP built and deployed, in review"
    else:
        rows5, total_line = s3_results(src)
    fill_table(t[5], rows5 + [("SP hoàn thành / SP done", total_line)], size=9, keep_last=True)

    # 4. Burndown
    cell = t[6].rows[0].cells[0]
    set_cell(cell, "")
    png = snap / cfg["png"]
    if png.exists():
        cell.paragraphs[0].add_run().add_picture(str(png), width=Cm(16))
    note = mod.BURNDOWN_NOTE if mod is not None else s3_burndown_note()
    cell.add_paragraph().add_run(note).italic = True

    # 5. Risks and issues
    rk = md_at(src, "pm/pmp/05-risk-plan.md")
    _, irows = table_with(rk, "ID", "From risk", "Date", "Description")
    _, rrows = table_with(rk, "ID", "Risk", "Cat", "P", "I")
    rows7 = []
    for r in irows[1:]:
        dd = dict(zip([h.lower() for h in irows[0]], r))
        if clean(dd["id"]):
            rows7.append((clean(dd["id"]), f"Issue (from {clean(dd['from risk'])}): {clean(dd['description'])}",
                          clean(dd["status"]), clean(dd["action"]), clean(dd["owner"]), "–"))
    for r in rrows[1:]:
        dd = dict(zip([h.lower() for h in rrows[0]], r))
        st = clean(dd["status"])
        if num(dd["p×i"]) >= 12 and not st.lower().startswith(("closed", "occurred")):
            rows7.append((clean(dd["id"]), f"Risk (P×I {nice(num(dd['p×i']))}): {clean(dd['risk (cause → event → effect)'])}",
                          st, clean(dd["strategy & response"]), clean(dd["owner"]), "–"))
    fill_table(t[7], rows7, size=9)
    move_new(d, heading_index(d, "6. Thay đổi"), lambda: d.add_paragraph(
        "Issues from the issue log and the open risks with P × I ≥ 12 from the risk register; the full register is in "
        "the workbook (RiskRegister, IssueLog). No due dates were recorded; actions are tracked per Sprint.").runs[0]
        .__setattr__("italic", True))

    # 6. Changes
    cl = md_at(src, "pm/change/change-log.md")
    _, crows = table_with(cl, "CR ID", "Date received")
    rows8 = []
    for r in crows[1:]:
        dd = dict(zip([h.lower() for h in crows[0]], r))
        if clean(dd["cr id"]).startswith("CR"):
            rows8.append((clean(dd["cr id"]), f"{clean(dd['title'])}: {clean(dd['description'])}",
                          f"{clean(dd['decision']) or 'Pending'} (CCB {clean(dd['ccb date'])})",
                          f"{clean(dd['status'])}. Impact (plan): {clean(dd['impact summary (plan)'])}. "
                          f"Baseline updated: {clean(dd['baseline updated'])}"))
    fill_table(t[8], rows8, size=9)

    # 7. Test cases
    rows9, extra = [], []
    for rel in cfg["tests"]:
        r9, ex = tc_rows(src, rel)
        rows9 += r9
        extra += ex
    fill_table(t[9], rows9, size=8)
    if extra:
        def summaries():
            for heading, rows in extra:
                d.add_paragraph(clean(heading), style="Heading 3")
                tb = d.add_table(rows=len(rows), cols=len(rows[0]))
                tb.style = d.tables[9].style
                for i, r in enumerate(rows):
                    for j, v in enumerate(r):
                        set_cell(tb.cell(i, j), clean(v), 9, bold=i == 0)
                borders(tb)
        move_new(d, heading_index(d, "10. Phân công"), summaries)

    # 8. Review and Retrospective record, 9. status / EVM / Weekly Status (parts the template does not have)
    anchor10 = heading_index(d, "10. Phân công")

    def parts():
        d.add_paragraph("8. Sprint Review và Retrospective / Sprint Review & Retrospective record", style="Heading 1")
        if sprint in SUBMITTED:
            old = docx.Document(submitted_file(sprint, "c3"))
            els = copy_range(d, old, "A. General information", ["PART IV"], demote=1)
            _burndown_ref(d, els)  # the burndown is in section 4; the record refers to it instead of repeating it
            portrait_break(d)
            d.add_paragraph("9. Trạng thái Sprint, EVM và báo cáo / Sprint status, EVM and reports", style="Heading 1")
            starts = {"S1": [("IV.1.", "9.1."), ("IV.5.", "9.2.")],
                      "S2": [("IV.1.", "9.1."), ("IV.5.", "9.2."), ("IV.6.", "9.3.")]}[sprint]
            for k, (pre, new_no) in enumerate(starts):
                els = copy_range(d, old, pre, ["IV.", "PART"], demote=0)
                for tn in els[0].iter(qn("w:t")):
                    if tn.text and pre in tn.text:
                        tn.text = tn.text.replace(pre, new_no)
                        break
            portrait_break(d)
        else:
            d.add_paragraph("Sprint Review 3 and Retrospective 3 are held on Fri 13/11/2026; their record is added "
                            "after the meeting (TBD).")
            d.add_paragraph("9. Trạng thái Sprint, EVM và báo cáo / Sprint status, EVM and reports", style="Heading 1")
            import export_s2  # Markdown → Word with landscape pages for wide tables (same as the S2 report)
            parts9 = [("Sprint status and EVM", "pm/sprints/S3/sprint-report.md"),
                      ("Weekly Status Report – Sprint 3", "pm/sprints/S3/weekly-status.md"),
                      ("Regression F1–F3", "pm/sprints/S3/regression-F1-F3.md")]
            k = 0
            for title, rel in parts9:
                if (ROOT / rel).exists():
                    k += 1
                    export_s2._md_sections(d, f"9.{k}. {title}", export_s2._report_md(ROOT / rel), last=False)
            if not k:
                d.add_paragraph("Weekly Status S3 (S3-T17) and EVM S3 (S3-T21): TBD at the Sprint end.")
            portrait_break(d)
    move_new(d, anchor10, parts)

    # 10. Work allocation
    commits, prs = git_activity(sprint)
    roles = {DAT[0]: "Sprint Leader – Scrum Master + Developer" if leader == DAT else "Developer",
             CHINH[0]: ("Sprint Leader – Scrum Master + " if leader == CHINH else "") + "Product Owner + Developer"}
    rows10 = []
    for m, short in ((leader, None), (CHINH if leader == DAT else DAT, None)):
        key = "Đạt" if m == DAT else "Chính"
        mine = [x["id"] for x in tasks if key in x["owner"] or x["owner"].startswith("Both")]
        pr_txt = ("PR " + ", ".join(f"#{p}" for p in sorted(prs[m[0]]))) if prs and prs[m[0]] else "no PR opened"
        rows10.append((m[0], roles[m[0]], ", ".join(mine), nice(plan.get(key)),
                       nice(act.get(key)) if act.get(key) is not None else TBD,
                       f"{commits[m[0]]} commit{'s' if commits[m[0]] != 1 else ''} · {pr_txt}"))
    fill_table(t[10], rows10, size=9)
    move_new(d, heading_index(d, "11. Kế hoạch"), lambda: d.add_paragraph(
        "Est. h = planned task hours (\"Both\" tasks count half for each member); Actual h = hours logged in Jira "
        "(Completed Work). Commits and pull requests are counted from the repository history for the Sprint dates "
        f"({cfg['start'][:5]} 00:00 – {cfg['end'][:5]} 23:59, GMT+7)." +
        (" Most Sprint 1 work was committed on 30/10, after the Sprint end (issue I-01)." if sprint == "S1" else "")
        + (f" Commits by other authors in the window: {commits['other']}." if commits["other"] else "")).runs[0]
        .__setattr__("italic", True))

    # 11. Next Sprint plan
    placeholder = next(p for p in d.paragraphs if p.text.strip().startswith("…"))
    after = list(d.element.body)[list(d.element.body).index(placeholder._p) + 1:]
    for el in after:  # trailing page break / empty paragraphs of the template
        if el.tag == qn("w:p") and not "".join(t_.text or "" for t_ in el.iter(qn("w:t"))).strip():
            el.getparent().remove(el)
    if sprint == "S1":
        rr = md_at(src, "pm/sprints/S1/review-retro.md")
        set_par(placeholder, clean(section(rr, "8. Plan for Sprint 2")))
    elif sprint == "S2":
        ws_md = md_at(src, "pm/sprints/S2/weekly-status.md")
        _, nrows = table_with(ws_md, "#", "Action", "Owner", "Due")
        set_par(placeholder, "Sprint 3 (06/11 – 12/11/2026, Leader Hồ Du Tuấn Đạt), from the Weekly Status Report:")
        tb = d.add_table(rows=len(nrows), cols=len(nrows[0]))
        for i, r in enumerate(nrows):
            for j, v in enumerate(r):
                set_cell(tb.cell(i, j), clean(v), 9, bold=i == 0)
        borders(tb)
        placeholder._p.addnext(tb._tbl)
    else:
        set_par(placeholder, "After Sprint 3: Sprint Review 3 and UAT with the Sponsor (13/11/2026), Final Report, "
                             "slides and presentation (17/11/2026) – plan/ROADMAP.md P31–P36.")
    for p in d.paragraphs:  # notes under the template tables: 10 pt, like the table text
        if p.runs and all(r.italic for r in p.runs if r.text.strip()):
            for r in p.runs:
                r.font.size = Pt(10)
    d.save(out)
    return out


def _small(d):
    """Notes under the template tables: 10 pt, like the table text."""
    for p in d.paragraphs[-3:]:
        for r in p.runs:
            if r.italic:
                r.font.size = Pt(10)


def set_par(p, text):
    for r in list(p.runs):
        r._r.getparent().remove(r._r)
    p.add_run(text)


def borders(tb):
    from docx.oxml import OxmlElement
    tblPr = tb._tbl.tblPr
    b = OxmlElement("w:tblBorders")
    for side in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement(f"w:{side}")
        e.set(qn("w:val"), "single")
        e.set(qn("w:sz"), "4")
        e.set(qn("w:color"), "808080")
        b.append(e)
    tblPr.append(b)


def _burndown_ref(d, els):
    """In the copied Review record, the burndown picture is replaced by a reference to section 4."""
    for el in els:
        if el.tag != qn("w:tbl"):
            continue
        for tc in el.iter(qn("w:tc")):
            if tc.find(".//" + qn("a:blip")) is not None:
                ps = tc.findall(qn("w:p"))
                for p in ps[1:]:
                    tc.remove(p)
                p = ps[0]
                for r in p.findall(qn("w:r")):
                    p.remove(r)
                from docx.text.paragraph import Paragraph
                Paragraph(p, None).add_run("Burndown chart and its explanation: see section 4.").italic = True


def daily_rows_s3(dl):
    """Sprint 3 log: one table per day (Member, Planned today, Done since last Daily, Doing today, Blockers)."""
    rows = []
    for m in re.finditer(r"^## (D\d+ – \w+ \d{2}/\d{2})\n(.*?)(?=^## |\Z)", dl, re.S | re.M):
        day, body = m.group(1), m.group(2)
        when = re.search(r"^Time:.*$", body, re.M)
        for heading, t in tables(body):
            hdr = [h.lower() for h in t[0]]
            if hdr[0] != "member":
                continue
            for r in t[1:]:
                dd = dict(zip(hdr, r))
                done, doing, block = (clean(dd.get(k, "")) for k in ("done since last daily", "doing today", "blockers"))
                if not any((done, doing, block)):
                    continue
                today = f"{doing}\n(planned: {clean(dd.get('planned today', ''))})"
                rows.append((day + (f"\n{clean(when.group())[6:]}" if when else ""), clean(dd["member"]), done, today, block))
    return rows


def s3_results(src):
    """Committed items of Sprint 3: carried items with the PO decision so far, new items TBD until accepted."""
    text = md_at(src, "pm/sprints/S3/po-acceptance.md")
    _, rows = table_with(text, "Item", "SP", "Hosted evidence", "Decision")
    out, done_sp = [], 0
    for r in rows[1:]:
        dd = dict(zip([h.lower() for h in rows[0]], r))
        item = clean(dd["item"])
        m = re.match(r"(?:US|NFR)-\d+", item)
        if not m:
            continue
        iid = m.group()
        dec = clean(next(v for k, v in dd.items() if k.startswith("decision")))
        spv = nice(num(dd["sp"]))
        done = "Done" if "Done" in dec else "Not Done (yet)"
        done_sp += spv if done == "Done" else 0
        out.append((iid, item[len(iid):].strip() + " (carried from S2)", spv, TBD, "Yes" if done == "Done" else TBD,
                    done, f"{clean(dd['hosted evidence'])}. {clean(dd.get('what is missing', ''))}".strip(". ")))
    _, items, _ = product_backlog(src)
    for it in items:
        if it["sprint"] == "S3":
            out.append((it["id"], it["story"], nice(it["sp"]), TBD, TBD, TBD, "Built in Sprint 3; PO acceptance S3-T18"))
    return out, f"{done_sp} of {SPRINTS['S3']['committed']} SP accepted so far (draft – final at the Sprint end)"


def s3_burndown_note():
    return ("Plan line = hours of the tasks still open by their planned day; Actual = planned hours of the tasks not "
            "Done on that day (tools/s3_tracker.py). Draft: explanation of flat or steep parts added at the Sprint end "
            "(S3-T21).")


# ---------------------------------------------------------------- c0 eval (S3)
def c0_eval_s3(out):
    """Peer evaluation of Sprint 3 in the lecturer template: workload = planned task hours share (scoring guide);
    the scores E–G are entered by the Leader S3 and are never overwritten by this script."""
    if out.exists() and load_workbook(out)["Eval"]["E10"].value is not None:
        return out
    wb = load_workbook(TPL / "FP_Template_Eval.xlsx")
    for name in wb.sheetnames:
        if name != "Eval":
            del wb[name]
    ws = wb["Eval"]
    tasks = sprint_tasks("S3", "S3")
    plan = {"Đạt": 0.0, "Chính": 0.0}
    for t in tasks:
        for who in plan:
            if t["owner"].startswith("Both"):
                plan[who] += t["est"] / 2
            elif t["owner"].startswith(who):
                plan[who] += t["est"]
    total = sum(plan.values())
    ws["B4"], ws["B5"], ws["B6"], ws["B7"] = TEAM, DAT[0], DAT[1], datetime.now(TZ7).strftime("%d/%m/%Y")
    members = [(DAT, "Developer (Sprint Leader S1 & S3)", "Đạt"),
               (CHINH, "Product Owner + Developer (Sprint Leader S2)", "Chính")]
    for row, (m, role, key) in zip((10, 11), members):
        ws.cell(row, 1, m[1])
        ws.cell(row, 2, m[0])
        ws.cell(row, 3, role)
        ws.cell(row, 4, round(plan[key] / total, 4))
        for c in (5, 6, 7):
            ws.cell(row, c).value = None
        ws.cell(row, 12, f"Workload = planned task hours {nice(plan[key])}/{nice(total)} h (S3 Sprint Backlog, owners after "
                         "the Daily D6 changes; \"Both\" tasks half each). Columns E–G: Leader S3 to enter.")
    for c in range(4, 8):
        ws.cell(12, c).value = None
    from openpyxl.styles import Protection
    for row in range(10, 14):
        for c in (5, 6, 7):
            ws.cell(row, c).protection = Protection(locked=False)
    ws["A24"] = ("Note: workload uses PLANNED hours from the task assignment, as the scoring guide says. "
                 "Leader S3 must enter E (0–1), F (0–10), G (0–1) before submission.")
    ws["A24"].font = Font(italic=True, color="B42318")
    wb.save(out)
    return out


# ---------------------------------------------------------------- main
def build(sprint):
    if sprint == "S3":
        subprocess.run([sys.executable, str(ROOT / "tools" / "s3_tracker.py"), "burndown"], check=True)
    out_dir = ROOT / "deliverables" / sprint
    out_dir.mkdir(parents=True, exist_ok=True)
    sys.path.insert(0, str(ROOT / "tools"))
    c2 = c2_workbook(sprint, out_dir / f"{PREFIX}c2_SprintBacklog_{sprint}.xlsx")
    c3 = c3_report(sprint, out_dir / f"{PREFIX}c3_SprintReport_{sprint}.docx")
    files = [c2, c3]
    if sprint == "S3":
        files.append(c0_eval_s3(out_dir / f"{PREFIX}c0_Eval_S3.xlsx"))
    for f in files:
        print("wrote", f.relative_to(ROOT))


if __name__ == "__main__":
    arg = sys.argv[1] if len(sys.argv) > 1 else "all"
    if arg == "all":  # one process per Sprint: each imports the export modules of its own snapshot
        for s in ("S1", "S2"):
            subprocess.run([sys.executable, __file__, s], check=True)
    else:
        build(arg)
