"""Final submission files [03 §7]: c1_ProjectPlan_Final.docx, c6_FinalReport.docx, c2_SprintBacklog_Final.xlsx.

Usage: python3 tools/export_final.py   → deliverables/Final/
- c6: pm/final/final-report.md → pandoc → docx_style (cover, TOC, tables). No lecturer template for the Final
  Report has been received (docs/templates/README.md), so the team's document layout is used, as for c5.
- c2 Final: the cumulative workbook of Sprint 3 built by export_templates.py from the current sources (Product
  Backlog v1.4, risk register v1.8, Change Log v1.4 ...) plus the sheets the Final batch needs: EVM (all snapshots,
  live formulas), UAT summary, Weekly Status S3, Lessons Learned and the AI usage log.
"""
import subprocess
import sys
from pathlib import Path

from openpyxl import load_workbook
from openpyxl.styles import Font

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import docx_style  # noqa: E402
import export_templates as et  # noqa: E402
import workbook_style  # noqa: E402

OUT = ROOT / "deliverables" / "Final"
PREFIX = "HK261_SPM_FP_Team6_"
COVER = {
    "school": "VAN LANG UNIVERSITY",
    "faculty": "FACULTY OF INFORMATION TECHNOLOGY",
    "course": "Software Project Management (72ITSE41503) – Final Project, Semester 261",
    "project": "E-COMMERCIAL BOOK STORE – RELEASE 1.0",
    "title": "FINAL REPORT",
    "version": "Project closure, plan vs actual, Lessons Learned",
    "lines": [
        "Team 6 – Page Turners",
        "Nguyễn Minh Chính (2275106050051) – Product Owner, Sprint 2 Leader",
        "Hồ Du Tuấn Đạt (2374802010097) – Developer, Sprint 1 and Sprint 3 Leader",
        "Sponsor / Customer: Dr. Bùi Minh Phụng",
    ],
    "date": "Ho Chi Minh City, November 2026",
}

# EVM snapshots: (label, baseline, BAC, PSP, n, SP Done, actual hours, data as of)
EVM = [
    ("End of Sprint 1", "v1.0", 24000000, 55, 1, 0, 19.5, "02/11/2026 (S1 hours later corrected to 41 h)"),
    ("End of Sprint 2", "v1.1", 26400000, 62, 2, 21, 65, "06/11/2026"),
    ("End of Sprint 3", "v1.1", 26400000, 62, 3, 60, 85.23, "12/11/2026 18:55"),
    ("Closure (Final)", "v1.2", 26400000, 68, 3, 66, 85.23, "15/11/2026 12:30 – Jira worklogs; hours after 12/11 19:59 TBD"),
]


def c6():
    out = OUT / f"{PREFIX}c6_FinalReport.docx"
    src = ROOT / "pm" / "final" / "final-report.md"
    text = src.read_text(encoding="utf-8").replace("`", "")
    tmp = ROOT / "pm" / "final" / ".final-report.tmp.md"
    tmp.write_text(text, encoding="utf-8")
    try:
        subprocess.run(["pandoc", "--from", "gfm", "--resource-path", str(src.parent), "-o", str(out), str(tmp)],
                       check=True)
    finally:
        tmp.unlink()
    docx_style.style_docx(out, "HK261 SPM – Team 6 Page Turners – Final Report Release 1.0 (c6)", cover=COVER)
    docx_style.prerender_toc(out)
    return out


PMP_PARTS = ["00-pmp-final.md", "01-charter.md", "02-tailored-scrum.md", "03-master-release-plan.md",
             "04-quality-plan.md", "05-risk-plan.md", "06-configuration-management.md", "07-communication-plan.md"]


def c1():
    out = OUT / f"{PREFIX}c1_ProjectPlan_Final.docx"
    text = "\n\n".join((ROOT / "pm" / "pmp" / f).read_text(encoding="utf-8").replace("`", "") for f in PMP_PARTS)
    tmp = ROOT / "pm" / "pmp" / ".pmp-final.tmp.md"
    tmp.write_text(text, encoding="utf-8")
    try:
        subprocess.run(["pandoc", "--from", "gfm", "-o", str(out), str(tmp)], check=True)
    finally:
        tmp.unlink()
    cover = dict(COVER, title="PROJECT MANAGEMENT PLAN – FINAL",
                 version="Project Management Plan version 1.0 (29/10/2026), updated with change requests CR-06 and CR-07 and the lecturer's feedback")
    docx_style.style_docx(out, "HK261 SPM – Team 6 Page Turners – Project Management Plan Final (c1)", cover=cover)
    docx_style.prerender_toc(out)
    return out


def eval360():
    """One 360° peer evaluation per member in the lecturer's Eval template [03 §7, §9.5]. Workload = planned task hours of
    Sprints 1–3 (scoring guide: task distribution); the scores E–G are entered by each evaluator, never by this script."""
    from datetime import datetime
    from openpyxl.styles import Protection
    plan = {"Đạt": 0.0, "Chính": 0.0}
    for sp in ("S1", "S2", "S3"):
        for t in et.sprint_tasks(sp, sp):
            for who in plan:
                if t["owner"].startswith("Both"):
                    plan[who] += t["est"] / 2
                elif t["owner"].startswith(who):
                    plan[who] += t["est"]
    total = sum(plan.values())
    members = [(et.DAT, "Developer (Sprint Leader S1 & S3)", "Đạt"),
               (et.CHINH, "Product Owner + Developer (Sprint Leader S2)", "Chính")]
    outs = []
    for evaluator in (et.CHINH, et.DAT):
        out = OUT / f"Eval360_Team6_{evaluator[1]}.xlsx"
        if out.exists() and load_workbook(out)["Eval"]["E10"].value is not None:
            outs.append(out)          # scores already entered by the evaluator: keep them
            continue
        wb = load_workbook(et.TPL / "FP_Template_Eval.xlsx")
        for name in wb.sheetnames:
            if name != "Eval":
                del wb[name]
        ws = wb["Eval"]
        ws["A2"] = "Final Project HK261 – 360° evaluation at the end of the project (Sprints 1–3)"
        ws["B4"], ws["B5"], ws["B6"] = et.TEAM, evaluator[0], evaluator[1]
        ws["B7"] = datetime.now(et.TZ7).strftime("%d/%m/%Y")
        for row, (m, role, key) in zip((10, 11), members):
            ws.cell(row, 1, m[1])
            ws.cell(row, 2, m[0])
            ws.cell(row, 3, role)
            ws.cell(row, 4, round(plan[key] / total, 4))
            for c in (5, 6, 7):
                ws.cell(row, c).value = None
                ws.cell(row, c).protection = Protection(locked=False)
            ws.cell(row, 12, f"Workload = planned task hours {et.nice(plan[key])}/{et.nice(total)} h in S1–S3 "
                             "(Sprint Backlogs; \"Both\" tasks half each). E–G: entered by the evaluator.")
        for c in range(4, 8):
            ws.cell(12, c).value = None
        ws["A24"] = (f"Note: {evaluator[0]} enters E (0–1), F (0–10) and G (0–1) for both members (self and peer) "
                     "before submission. Workload uses PLANNED hours, as the scoring guide says.")
        ws["A24"].font = Font(italic=True, color="B42318")
        wb.save(out)
        outs.append(out)
    return outs


def evm_sheet(wb):
    ws = wb.create_sheet("EVM")
    ws["A1"] = "AgileEVM – all snapshots (formulas [03 §6.4], rate 200,000 VND/h, N = 3)"
    ws["A2"] = ("Blue = input from the records (PSP and BAC of the baseline in force, SP meeting the DoD, Jira hours). "
                "Black = formula. Closure uses baseline v1.2 (CR-07 approved 13/11): PSP 68.")
    ws["A2"].font = Font(italic=True, size=9)
    head = ["Snapshot", "Baseline", "BAC (VND)", "PSP", "n", "N", "SP Done", "Actual hours", "PV", "EV", "AC",
            "SV", "CV", "SPI", "CPI", "EAC", "ETC", "Data as of"]
    for c, h in enumerate(head, 1):
        ws.cell(4, c, h)
    for i, (label, base, bac, psp, n, sp, h, asof) in enumerate(EVM):
        r = 5 + i
        vals = [label, base, bac, psp, n, 3, sp, h,
                f"=C{r}*E{r}/F{r}", f"=C{r}*G{r}/D{r}", f"=H{r}*200000", f"=J{r}-I{r}", f"=J{r}-K{r}",
                f"=IF(I{r}=0,\"\",J{r}/I{r})", f"=IF(K{r}=0,\"\",J{r}/K{r})", f"=IF(OR(O{r}=\"\",O{r}=0),\"–\",C{r}/O{r})",
                f"=IF(P{r}=\"–\",\"–\",P{r}-K{r})", asof]
        for c, v in enumerate(vals, 1):
            cell = ws.cell(r, c, v)
            if c in (3, 9, 10, 11, 12, 13, 16, 17):
                cell.number_format = "#,##0"
            if c in (14, 15):
                cell.number_format = "0.00"
    workbook_style.style_table_sheet(ws, 4)
    for r in range(5, 5 + len(EVM)):
        for c in (2, 3, 4, 7, 8):
            ws.cell(r, c).font = Font(name="Calibri", size=10, color="1F5FA8")
    for col, w in zip("ABCDEFGHIJKLMNOPQR", (18, 9, 13, 6, 4, 4, 8, 9, 13, 13, 13, 13, 13, 7, 7, 13, 12, 34)):
        ws.column_dimensions[col].width = w
    notes = [
        "PV = BAC × n / N · EV = BAC × SP Done / PSP · AC = actual hours × 200,000 · SV = EV − PV · CV = EV − AC · "
        "SPI = EV / PV · CPI = EV / AC · EAC = BAC / CPI · ETC = EAC − AC.",
        "Closure: 66 of 68 SP meet the DoD; NFR-03 (2 SP) is accepted by the PO after the check on 17/11 (site online). "
        "UAT 13/11: 73/73 ACs Pass, Release 1.0 accepted.",
        "CPI 1.50: fewer hours logged (85.23 h) than planned (132 h) – S1/S2 hours partly reconstructed, part of the "
        "S3 testing and documents AI-assisted, some hours after 12/11 19:59 not yet logged. See Final Report §3.3.",
        "Baselines: v1.0 (30/10) PSP 55, BAC 24.0 M · v1.1 (04/11, CR-06) PSP 62, BAC 26.4 M · v1.2 (15/11, CR-07) PSP 68, "
        "BAC 26.4 M.",
    ]
    et.notes_block(ws, 5 + len(EVM) + 2, 18, "Notes", notes)


def extra_sheets(wb):
    evm_sheet(wb)
    for name, rel, sub, kw in [
        ("UAT_Summary", "pm/uat/uat-minutes.md", "UAT with the Sponsor, 13/11/2026 – minutes", {}),
        ("WeeklyStatus_S3", "pm/sprints/S3/weekly-status.md", "Weekly Status Report – Sprint 3", {}),
        ("LessonsLearned", "pm/final/final-report.md", "Lessons Learned (Final Report §6)", {"sections": ["Lessons"]}),
        ("AI_Usage", "pm/ai-usage-log.md", "Declaration of AI use – full log", {}),
    ]:
        workbook_style.md_sheet(wb, name, ROOT / rel, subtitle=sub, **kw)
    et.SHEET_INFO.update({
        "EVM": "AgileEVM – all snapshots and the closure values (formulas)",
        "UAT_Summary": "UAT minutes 13/11/2026: result per feature, decision",
        "WeeklyStatus_S3": "Weekly Status Report (Sprint 3)",
        "LessonsLearned": "Lessons Learned (Situation – Impact – Cause – Lesson – Recommendation)",
        "AI_Usage": "Declaration of AI use (full log)",
    })


def c2():
    out = OUT / f"{PREFIX}c2_SprintBacklog_Final.xlsx"
    orig = et.index_sheet

    def index_with_final(wb, sprint, old_index=None):
        extra_sheets(wb)
        orig(wb, sprint, old_index)

    et.index_sheet = index_with_final
    try:
        et.c2_workbook("S3", out)
    finally:
        et.index_sheet = orig
    wb = load_workbook(out)
    ws = wb["Index"]
    for r in range(3, 15):
        k = ws.cell(r, 1).value
        if k == "Version":
            ws.cell(r, 2).value = "Final submission (cumulative: Sprints 1–3 and closure)"
        elif k == "Layout":
            ws.cell(r, 2).value = ("Lecturer template SprintBacklog_Template.xlsx (received 10/11/2026) + EVM, UAT, "
                                   "Lessons Learned and AI usage sheets. Data as of 15/11/2026 12:30 (baseline v1.2).")
    import plain_language  # abbreviations written out and GitHub terms described in plain words (17/11/2026)
    print("plain language: cells rewritten", plain_language.apply(wb))
    wb.save(out)
    return out


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    which = sys.argv[1] if len(sys.argv) > 1 else "all"
    files = []
    if which in ("all", "eval"):
        files.extend(eval360())
    if which in ("all", "c1"):
        files.append(c1())
    if which in ("all", "c6"):
        files.append(c6())
    if which in ("all", "c2"):
        subprocess.run([sys.executable, str(ROOT / "tools" / "s3_tracker.py"), "burndown"], check=True)
        files.append(c2())
    for f in files:
        print("wrote", f.relative_to(ROOT))
