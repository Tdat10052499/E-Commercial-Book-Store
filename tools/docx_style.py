"""Uniform, readable layout for exported .docx deliverables.

- Times New Roman everywhere (Latin + East-Asian/complex script slots, so Vietnamese renders in TNR)
- A4, margins 2 cm / 2 cm / 3 cm left / 2 cm right (Vietnamese academic convention)
- Cover page, table of contents field, each "Part" (Heading 1) on a new page
- Tables: full grid borders, shaded bold header row repeated on each page, 10.5 pt text
- Header with document name, footer with page number
"""
import re

from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

FONT = "Times New Roman"
ACCENT = RGBColor(0x1F, 0x3A, 0x5F)
HEADER_FILL = "D9E2F3"


def _font(run_or_style, size=None, bold=None, color=None):
    f = run_or_style.font
    f.name = FONT
    rpr = run_or_style.element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.insert(0, rfonts)
    for attr in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
        rfonts.set(qn(attr), FONT)
    for attr in ("w:asciiTheme", "w:hAnsiTheme", "w:eastAsiaTheme", "w:cstheme"):
        rfonts.attrib.pop(qn(attr), None)
    if size:
        f.size = Pt(size)
    if bold is not None:
        f.bold = bold
    if color is not None:
        f.color.rgb = color


def _styles(doc):
    sizes = {"title": 20, "subtitle": 14, "heading 1": 16, "heading 2": 13, "heading 3": 12, "heading 4": 12}
    for st in doc.styles:
        if st.type != 1:  # paragraph styles only
            continue
        name = st.name.lower()
        _font(st, size=sizes.get(name, 12))
        pf = st.paragraph_format
        if name.startswith("heading") or name in ("title", "subtitle"):
            _font(st, bold=True, color=ACCENT)
            st.font.italic = False
            pf.space_before = Pt(0 if name == "heading 1" else 12)
            pf.page_break_before = name == "heading 1"
            pf.space_after = Pt(6)
            pf.keep_with_next = True
        else:
            pf.space_after = Pt(4)
            pf.line_spacing = 1.15
    for st in doc.styles:
        if st.type == 2:  # character styles (e.g. Verbatim Char for `code`)
            _font(st)


def _borders(tbl):
    tblPr = tbl._tbl.tblPr
    b = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement(f"w:{edge}")
        e.set(qn("w:val"), "single")
        e.set(qn("w:sz"), "4")
        e.set(qn("w:color"), "808080")
        b.append(e)
    for tag in ("w:tblBorders", "w:tblLayout"):
        for old in tblPr.findall(qn(tag)):
            tblPr.remove(old)
    lay = OxmlElement("w:tblLayout")
    lay.set(qn("w:type"), "autofit")
    later = [tblPr.find(qn(t)) for t in ("w:shd", "w:tblCellMar", "w:tblLook", "w:tblCaption", "w:tblDescription")]
    later = [e for e in later if e is not None]
    if later:
        later[0].addprevious(b)
        b.addnext(lay)
    else:
        tblPr.append(b)
        tblPr.append(lay)
    w = tblPr.find(qn("w:tblW"))
    if w is None:
        w = OxmlElement("w:tblW")
        tblPr.append(w)
    w.set(qn("w:type"), "pct")
    w.set(qn("w:w"), "5000")


def _shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    tcPr.append(shd)


def format_table(tbl):
    _format_table(tbl)


def _tables(doc):
    for tbl in doc.tables:
        _format_table(tbl)


def _format_table(tbl):
    if True:
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        _borders(tbl)
        for i, row in enumerate(tbl.rows):
            if i == 0:
                trPr = row._tr.get_or_add_trPr()
                if trPr.find(qn("w:tblHeader")) is None:
                    trPr.append(OxmlElement("w:tblHeader"))
            for cell in row.cells:
                if i == 0:
                    _shade(cell, HEADER_FILL)
                for p in cell.paragraphs:
                    p.paragraph_format.space_after = Pt(2)
                    p.paragraph_format.line_spacing = 1.0
                    for r in p.runs:
                        _font(r, size=10.5, bold=True if i == 0 else None)


def _runs(doc):
    for p in doc.paragraphs:
        for r in p.runs:
            _font(r)


def _field(paragraph, instr):
    run = paragraph.add_run()
    for tag, text in (("begin", None), (None, instr), ("separate", None), ("end", None)):
        if tag:
            el = OxmlElement("w:fldChar")
            el.set(qn("w:fldCharType"), tag)
        else:
            el = OxmlElement("w:instrText")
            el.set(qn("xml:space"), "preserve")
            el.text = text
        run._r.append(el)
    _font(run)
    return run


def _page(doc, header_text, cover=None):
    for s in doc.sections:
        s.orientation = WD_ORIENT.PORTRAIT
        s.page_width, s.page_height = Cm(21), Cm(29.7)
        s.top_margin = s.bottom_margin = Cm(2)
        s.left_margin, s.right_margin = Cm(3), Cm(2)
        s.different_first_page_header_footer = bool(cover)
        if not header_text:
            continue
        hp = s.header.paragraphs[0]
        hp.text = plain_text(header_text)
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        for r in hp.runs:
            _font(r, size=9, color=RGBColor(0x66, 0x66, 0x66))
        fp = s.footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        _font(fp.add_run("Page "), size=10)
        _font(_field(fp, "PAGE"), size=10)


def _cover(doc, cover):
    body = doc.element.body
    first = body[0]
    for el in list(body):  # drop pandoc's own title block
        if el.tag == qn("w:p") and el.xpath("./w:pPr/w:pStyle[@w:val='Title' or @w:val='Subtitle']"):
            body.remove(el)
    first = body[0]
    paras = []

    def add(text, size=12, bold=False, space=6, color=None):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_after = Pt(space)
        if text:
            _font(p.add_run(text), size=size, bold=bold, color=color)
        paras.append(p)
        return p

    add(cover["school"], 13, True, 0)
    add(cover["faculty"], 13, True, 0)
    add(cover["course"], 12, False, 60)
    add(cover["project"], 14, True, 12, ACCENT)
    add(cover["title"], 24, True, 6, ACCENT)
    add(cover["version"], 13, False, 60)
    for line in cover["lines"]:
        add(line, 12, False, 2)
    add("", space=80)
    add(cover["date"], 12, False, 0)
    brk = add("")
    brk.add_run().add_break(WD_BREAK.PAGE)
    toc_title = add("TABLE OF CONTENTS", 14, True, 12, ACCENT)
    toc = doc.add_paragraph()
    _field(toc, 'TOC \\o "1-2" \\h \\z \\u')
    note = doc.add_paragraph()
    _font(note.add_run("(Right-click → Update Field if the table of contents is empty.)"), size=9,
          color=RGBColor(0x88, 0x88, 0x88))
    paras += [toc, note]
    for p in paras:
        first.addprevious(p._p)


def _toc_only(doc):
    """Keep pandoc's title, put a TOC right under it (no cover page)."""
    body = doc.element.body
    anchor = None
    for el in body:
        if el.tag == qn("w:p") and el.xpath("./w:pPr/w:pStyle[@w:val='Title']"):
            anchor = el
    paras = []
    head = doc.add_paragraph()
    _font(head.add_run("Table of contents"), size=13, bold=True, color=ACCENT)
    toc = doc.add_paragraph()
    _field(toc, 'TOC \\o "1-2" \\h \\z \\u')
    note = doc.add_paragraph()
    _font(note.add_run("(Right-click → Update Field if the table of contents is empty.)"), size=9,
          color=RGBColor(0x88, 0x88, 0x88))
    paras = [head, toc, note]
    for p in reversed(paras):
        if anchor is not None:
            anchor.addnext(p._p)
        else:
            body[0].addprevious(p._p)


SOURCES = {"03": "FP Brief", "04": "TA Baseline", "05": "Gap Analysis", "06": "Status", "07": "CR-06"}
SYMBOLS = [("→", "->"), ("–", "-"), ("−", "-"), ("·", ","), ("×", "x"), ("÷", "/"), ("≥", ">="),
           ("≤", "<="), ("…", "..."), ("≈", "~"), ("§", "Sec. ")]


def _cite(m):
    inner = m.group(1)
    inner = re.sub(r"^(0[3-7])\b", lambda k: SOURCES[k.group(1)], inner)
    inner = re.sub(r"#(\d)", r"item \1", inner)
    return "[" + inner + "]"


def plain_text(text):
    """Readable ASCII-style text: no section signs or math/arrow symbols."""
    text = re.sub(r"\[([^\]]*(?:§|#)[^\]]*)\]", _cite, text)
    for a, b in SYMBOLS:
        text = text.replace(a, b)
    return re.sub(r"Sec\. +", "Sec. ", text)


def _plain(doc):
    parts = list(doc.paragraphs)
    for t in doc.tables:
        for row in t.rows:
            for cell in row.cells:
                parts += cell.paragraphs
    for p in parts:
        for r in p.runs:
            if r.text:
                r.text = plain_text(r.text)


def style_docx(path, header_text, cover=None, plain=True, toc=True):
    doc = Document(path)
    _styles(doc)
    if cover:
        _cover(doc, cover)
    elif toc:
        _toc_only(doc)
    if plain:
        _plain(doc)
    _tables(doc)
    _runs(doc)
    _page(doc, header_text, cover)
    settings = doc.settings.element
    upd = OxmlElement("w:updateFields")
    upd.set(qn("w:val"), "true")
    settings.append(upd)
    doc.save(path)
