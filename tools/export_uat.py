"""c5_UAT.docx: UAT script (Part I) + UAT minutes form (Part II) [03 §7].

Usage: python3 tools/export_uat.py   → deliverables/S3/HK261_SPM_FP_Team6_c5_UAT.docx
No lecturer template for UAT has been received (FP_Template_UAT.docx, docs/templates/README.md), so the file uses the
team's document layout (docx_style). Landscape pages: the script tables have 8 columns.
"""
import re
import subprocess
import tempfile
from pathlib import Path

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn
from docx.shared import Cm

import docx_style

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "deliverables" / "S3" / "HK261_SPM_FP_Team6_c5_UAT.docx"
COVER = {
    "school": "VAN LANG UNIVERSITY",
    "faculty": "FACULTY OF INFORMATION TECHNOLOGY",
    "course": "Software Project Management (72ITSE41503) – Final Project, Semester 261",
    "project": "E-COMMERCIAL BOOK STORE – RELEASE 1.0",
    "title": "USER ACCEPTANCE TEST",
    "version": "UAT script and UAT minutes (session of Fri 13/11/2026)",
    "lines": [
        "Team 6 – Page Turners",
        "Nguyễn Minh Chính (2275106050051) – Product Owner, Sprint Leader S2",
        "Hồ Du Tuấn Đạt (2374802010097) – Developer, Sprint Leader S1 & S3",
        "Sponsor / Customer: Dr. Bùi Minh Phụng",
    ],
    "date": "Ho Chi Minh City, November 2026",
}


def body(rel, part):
    """A Markdown file as one Part: its H1 becomes the Part heading, the other headings move one level down."""
    lines = (ROOT / rel).read_text(encoding="utf-8").splitlines()
    out = []
    for line in lines:
        m = re.match(r"^(#{1,5}) (.*)", line)
        if m and len(m.group(1)) == 1:
            out.append(f"# {part} – {m.group(2).split(' (')[0]}")
        elif m:
            out.append("#" * (len(m.group(1))) + " " + m.group(2))
        else:
            out.append(line.replace("`", ""))
    return "\n".join(out)


def main():
    md = body("pm/uat/uat-script.md", "Part I") + "\n\n" + body("pm/uat/uat-minutes.md", "Part II") + "\n"
    with tempfile.NamedTemporaryFile("w", suffix=".md", delete=False, encoding="utf-8") as f:
        f.write(md)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["pandoc", "--from", "gfm", "-o", str(OUT), f.name], check=True)
    docx_style.style_docx(OUT, "HK261 SPM – Team 6 Page Turners – UAT Release 1.0 (c5)", cover=COVER)
    d = Document(OUT)
    for s in d.sections:  # 8-column tables: landscape A4
        s.orientation = WD_ORIENT.LANDSCAPE
        s.page_width, s.page_height = Cm(29.7), Cm(21)
        s.left_margin, s.right_margin, s.top_margin, s.bottom_margin = Cm(2), Cm(2), Cm(2), Cm(2)
    widths = [2.3, 2.6, 2.2, 5.8, 5.8, 2.2, 2.2, 2.6]  # cm, script tables (UAT … Comment)
    for t in d.tables:
        if len(t.columns) == 8 and t.rows[0].cells[0].text.strip() == "UAT":
            t.autofit = False
            grid = t._tbl.tblGrid.findall(qn("w:gridCol"))
            for g, w in zip(grid, widths):
                g.set(qn("w:w"), str(int(w * 567)))
            tblW = t._tbl.tblPr.find(qn("w:tblW"))
            if tblW is not None:
                tblW.set(qn("w:type"), "dxa")
                tblW.set(qn("w:w"), str(int(sum(widths) * 567)))
            for row in t.rows:
                for cell, w in zip(row.cells, widths):
                    cell.width = Cm(w)
    d.save(OUT)
    docx_style.prerender_toc(OUT)
    print("wrote", OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
