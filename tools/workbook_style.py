"""Render the Markdown sources of the PM documents into consistently styled Excel sheets.

One look for every sheet of the Sprint Workbook (c2): title, short subtitle, section headings,
bordered tables with a coloured header row, wrapped text, numbers stored as numbers, landscape
print set-up, and the version history moved to the end of each sheet.
"""
import re
from pathlib import Path

from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.page import PageMargins

NAVY = "1F3A5F"
HEAD_FILL = PatternFill("solid", fgColor=NAVY)
TOTAL_FILL = PatternFill("solid", fgColor="E8EEF6")
THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
BASE = "Calibri"
WRAP_TOP = Alignment(wrap_text=True, vertical="top")
NUM_RE = re.compile(r"^-?\d+(\.\d+)?$")


def clean(text):
    """Markdown inline → plain text (bold/italic/code markers, links, citation codes)."""
    t = str(text)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", t)
    t = t.replace("**", "").replace("`", "")
    t = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])", r"\1", t)
    t = re.sub(r"\s*\[(?:0[1-7]|CR-06|05|PMP-\d)[^\]]*§[^\]]*\]", "", t)  # [03 §6.2-1] style citations
    t = re.sub(r"\s*\[(?:0[1-7])\s*#\d+\]", "", t)
    return t.strip()


def value(text):
    t = clean(text)
    if NUM_RE.match(t):
        return float(t) if "." in t else int(t)
    return t


def parse_md(path):
    """Return (title, blocks); block = ('h', level, text) | ('p', text) | ('li', text) | ('table', rows)."""
    lines = Path(path).read_text(encoding="utf-8").splitlines()
    title, blocks, i = None, [], 0
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
            blocks.append(("table", rows))
            continue
        m = re.match(r"^(#{1,4})\s+(.*)", line)
        if m:
            if len(m.group(1)) == 1 and title is None:
                title = clean(m.group(2))
            else:
                blocks.append(("h", len(m.group(1)), clean(m.group(2))))
        elif re.match(r"^\s*([-*]|\d+\.)\s+", line):
            blocks.append(("li", clean(re.sub(r"^\s*([-*]|\d+\.)\s+(\[[ x]\]\s*)?", "", line))))
        elif line.startswith("---"):
            pass
        else:
            blocks.append(("p", clean(line.lstrip("> "))))
        i += 1
    return title, blocks


def _split_version_history(blocks):
    """Move the 'Version history' heading + table to the end."""
    out, vh = [], []
    k = 0
    while k < len(blocks):
        b = blocks[k]
        if b[0] == "h" and b[2].lower().startswith("version history"):
            vh.append(b)
            if k + 1 < len(blocks) and blocks[k + 1][0] == "table":
                vh.append(blocks[k + 1])
                k += 1
        else:
            out.append(b)
        k += 1
    return out + vh


def _select_sections(blocks, sections):
    """Keep only H2 sections whose heading contains one of `sections` (plus version history)."""
    keep, out = False, []
    for b in blocks:
        if b[0] == "h" and b[1] == 2:
            keep = any(s.lower() in b[2].lower() for s in sections) or b[2].lower().startswith("version history")
        if keep:
            out.append(b)
    return out


def md_sheet(wb, name, path, subtitle=None, sections=None, skip_paragraphs=False, max_cols=None, title=None):
    md_title, blocks = parse_md(path)
    title = title or md_title
    if sections:
        blocks = _select_sections(blocks, sections)
    blocks = _split_version_history(blocks)
    ws = wb.create_sheet(name)
    ncols = max([len(b[1][0]) for b in blocks if b[0] == "table"] + [4])
    if max_cols:
        ncols = min(ncols, max_cols)
    # column widths from the table contents (90th percentile of text length)
    lens = {c: [] for c in range(1, ncols + 1)}
    for b in blocks:
        if b[0] == "table":
            for row in b[1]:
                for c, v in enumerate(row[:ncols], start=1):
                    lens[c].append(len(clean(v)))
    widths = {}
    for c, vals in lens.items():
        vals = sorted(vals) or [10]
        p90 = vals[int(len(vals) * 0.9) - 1 if len(vals) > 1 else 0]
        widths[c] = max(9, min(48, p90 * 0.9 + 2))
        ws.column_dimensions[get_column_letter(c)].width = widths[c]
    total_width = sum(widths.values())

    r = 1
    ws.cell(r, 1, title or name).font = Font(name=BASE, size=15, bold=True, color=NAVY)
    r += 1
    if subtitle:
        ws.cell(r, 1, subtitle).font = Font(name=BASE, size=10, italic=True, color="666666")
        r += 1
    r += 1

    def text_row(text, font):
        nonlocal r
        c = ws.cell(r, 1, text)
        c.font = font
        c.alignment = WRAP_TOP
        ws.merge_cells(start_row=r, start_column=1, end_row=r, end_column=ncols)
        lines = max(1, int(len(text) / max(total_width * 1.1, 40)) + 1)
        ws.row_dimensions[r].height = 15 * lines + 2
        r += 1

    for b in blocks:
        if b[0] == "h":
            r += 1 if b[1] <= 2 else 0
            ws.cell(r, 1, b[2]).font = Font(name=BASE, size=12 if b[1] <= 2 else 11, bold=True, color=NAVY)
            r += 1
        elif b[0] in ("p", "li"):
            if skip_paragraphs:
                continue
            text_row(("•  " if b[0] == "li" else "") + b[1], Font(name=BASE, size=10))
        elif b[0] == "table":
            rows = b[1]
            for j, row in enumerate(rows):
                is_total = j > 0 and clean(row[0] if row else "").lower().startswith("total") or (
                    j > 0 and row and not row[0].strip() and any("**" in x for x in row))
                for c in range(1, ncols + 1):
                    raw = row[c - 1] if c - 1 < len(row) else ""
                    head = clean(rows[0][c - 1]).lower() if c - 1 < len(rows[0]) else ""
                    v = clean(raw) if j == 0 or "version" in head else value(raw)
                    cell = ws.cell(r, c, v)
                    if isinstance(v, float):  # keep the decimals written in the source (1.0, 39.75)
                        cell.number_format = "0." + "0" * len(clean(raw).split(".")[1])
                    cell.border = BORDER
                    cell.alignment = WRAP_TOP
                    if j == 0:
                        cell.font = Font(name=BASE, size=10, bold=True, color="FFFFFF")
                        cell.fill = HEAD_FILL
                    else:
                        cell.font = Font(name=BASE, size=10, bold=is_total)
                        if is_total:
                            cell.fill = TOTAL_FILL
                r += 1
            r += 1
    ws.sheet_view.showGridLines = False
    ws.freeze_panes = "A4" if subtitle else "A3"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_margins = PageMargins(left=0.4, right=0.4, top=0.5, bottom=0.5)
    ws.oddFooter.center.text = "&A – page &P of &N"
    return ws


def style_table_sheet(ws, header_row, first_col=1, last_col=None, title_cell="A1"):
    """Apply the same look to a sheet built cell by cell (EVM, Burndown)."""
    last_col = last_col or ws.max_column
    ws[title_cell].font = Font(name=BASE, size=15, bold=True, color=NAVY)
    for row in ws.iter_rows(min_row=header_row, max_row=ws.max_row, min_col=first_col, max_col=last_col):
        if all(c.value is None for c in row):
            break
        for c in row:
            c.border = BORDER
            c.alignment = WRAP_TOP
            if c.row == header_row:
                c.font = Font(name=BASE, size=10, bold=True, color="FFFFFF")
                c.fill = HEAD_FILL
            else:
                c.font = Font(name=BASE, size=10, bold=c.font.b)
    ws.sheet_view.showGridLines = False
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A4
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
