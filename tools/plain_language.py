"""Plain-language pass for the final workbook (c2 Final), 17/11/2026.

The Sprint sources in pm/ are kept as they were submitted. When the final workbook is built, every text cell
(never a formula, never the lecturer's README sheet) is rewritten with the rules below so that a reader who does
not use GitHub or project management shorthand can follow it: abbreviations are written out, and GitHub terms
(pull request numbers, merge, branch, tag, commit) are replaced by plain descriptions. Identifiers stay as they
are: US-xx, AC-0n, TC-..., NFR-xx, CR-06, CR-07, DEF-..., R01-R12, I-01-I-07, LL-0n, CI-0n, task codes such as
S2-T07, phases P00-P36 and features F1-F5. Figures are not changed.
"""
import re

B = r"(?<![-/\w])"   # start of a whole token that is not part of an identifier such as DEF-S3-01 or S2-T07
E = r"(?![-\w])"     # end of a whole token

# Earned value terms: in the earned value sheets "AC" means actual cost, elsewhere acceptance criterion.
EVM_SHEETS = {"EVM", "EVM_S1", "EVM_S2", "ReleasePlan"}
EVM_RULES = [
    (B + r"AC \(VND\)", "Actual cost (VND)"),
    (B + r"AC = ", "actual cost = "),
    (B + r"AC" + r"(?=\s*(?:\(|=|·|,|$|\)| ×| −| ÷|/))", "actual cost"),
]

RULES = [
    # --- Gaps left where internal source codes were removed from sheets copied from earlier submissions ------
    (r"five CR steps of and the fields asked for in;", "five change request steps of the Final Project brief (sections 6.2–6.3) and the fields asked for in the CR-06 brief (section 5);"),
    (r"as instructed in\)", "as instructed in the CR-06 brief, section 5)"),
    (r"due 29/10 23:59 per;", "due 29/10 23:59 according to the CR-06 brief;"),
    # --- GitHub terms -------------------------------------------------------------------------------------------
    (r"\bbranch (?:feat|docs|fix)/[\w.-]+ merged with develop locally", "the working copy of the code combined with the shared working version on a member's computer"),
    (r"\bbranch (?:feat|docs|fix)/[\w.-]+", "the working copy of the code for this task"),
    (r"\bfixed in fix/[\w.-]+", "fixed in a separate correction"),
    (r"\b(?:feat|docs|fix)/[\w.-]+", "a working copy of the code"),
    (r"\bmerge conflict\b", "conflict between two code changes"),
    (r"\bdevelop → main\b", "shared working version copied into the release version"),
    (r"\bmerge to main\b", "copy into the release version"),
    (r"\breleased to main\b", "copied into the release version"),
    (r"\bdeployed from main\b", "published from the release version"),
    (r"\bmerged into develop\b", "added to the shared working version"),
    (r"\bmerged with develop\b", "combined with the shared working version"),
    (r"\bon develop\b", "on the shared working version"),
    (r"\bthe develop build\b", "the build of the shared working version"),
    (r"\bdevelop deployed\b", "shared working version published"),
    (r"\bdevelop\b", "shared working version"),
    (r"\bPRs? reviews?\b", "reviews of code changes"),
    (r"\brelease PR #", "release code change #"),
    (r"\bPRs\b", "code changes"),
    (r"\bPR\b", "code change"),
    (r"(?<![\w&])#(\d+)\b", r"\1"),
    (r"\bmerged\b", "added"),
    (r"\bmerges\b", "additions"),
    (r"\bmerging\b", "adding"),
    (r"\bmerge\b", "add"),
    (r"\btagged\b", "labelled"),
    (r"\btag v", "version label v"),
    (r"\btags\b", "version labels"),
    (r"\btag\b", "version label"),
    (r"\bbranching\b", "organisation of the code in versions"),
    (r"\bbranches\b", "working copies of the code"),
    (r"\bbranch\b", "working copy of the code"),
    (r"\bcommitted\b", "saved"),
    (r"\bcommits\b", "saved code changes"),
    (r"\bcommit\b", "saved code change"),
    (r"\b[Rr]epo\b", "code repository"),
    (r" (?:8ebbd0b|8b9e376)\b", ""),   # the two saved-version codes quoted in the AI usage log
    # --- Earned value -------------------------------------------------------------------------------------------
    (B + r"AgileEVM" + E, "earned value analysis for Agile projects"),
    (B + r"EVM" + E, "earned value analysis"),
    (B + r"BAC" + E, "budget at completion"),
    (B + r"PSP (\d+) → (\d+) SP" + E, r"planned total of story points from \1 to \2"),
    (B + r"PSP (\d+) SP" + E, r"planned total of \1 story points"),
    (B + r"PSP (\d+)" + E, r"planned total of \1 story points"),
    (B + r"PSP" + E, "planned total of story points"),
    (B + r"SPI" + E, "schedule performance index"),
    (B + r"CPI" + E, "cost performance index"),
    (B + r"EAC" + E, "estimate at completion"),
    (B + r"ETC" + E, "estimate to complete"),
    (B + r"VAC" + E, "variance at completion"),
    (B + r"PV" + E, "planned value"),
    (B + r"EV" + E, "earned value"),
    (B + r"SV" + E, "schedule variance"),
    (B + r"CV" + E, "cost variance"),
    # --- Acceptance criteria and the case codes after them ------------------------------------------------------
    (r"(AC-\d+) \(M\)", r"\1 (main case)"),
    (r"(AC-\d+) \(E\)", r"\1 (exception case)"),
    (r"(AC-\d+) \(B\)", r"\1 (boundary case)"),
    (B + r"ACs" + E, "acceptance criteria"),
    (B + r"AC" + E, "acceptance criterion"),
    (B + r"TCs" + E, "test cases"),
    (r"^TC$", "Test case"),
    (B + r"E2E" + E, "end-to-end"),
    (B + r"INT" + E, "integration"),
    (B + r"UNIT" + E, "unit"),
    # --- Roles, meetings, documents -----------------------------------------------------------------------------
    (r"\bSprint Leader S([123])\b", r"Sprint \1 Leader"),
    (r"\bLeader S1, S3\b", "Sprint 1 and Sprint 3 Leader"),
    (r"\bLeader S1 & S3\b", "Sprint 1 and Sprint 3 Leader"),
    (r"\bLeader S([123])\b", r"Sprint \1 Leader"),
    (B + r"PO" + E, "Product Owner"),
    (B + r"UAT" + E, "acceptance test"),
    (B + r"CCB" + E, "Change Control Board"),
    (B + r"PMP" + E, "Project Management Plan"),
    (B + r"DoD" + E, "Definition of Done"),
    (B + r"DoR" + E, "Definition of Ready"),
    (r"\badded NFR items\b", "added non-functional requirement (NFR) items"),
    (B + r"CRs" + E, "change requests"),
    (B + r"CR" + E, "change request"),
    (B + r"GWT" + E, "Given–When–Then"),
    (B + r"TBD" + E, "to be confirmed"),
    (B + r"UI" + E, "user interface"),
    (B + r"PM" + E, "project management"),
    (B + r"TA" + E, "team assignment"),
    (B + r"GV" + E, "lecturer"),
    (B + r"URLs" + E, "web addresses"),
    (B + r"URL" + E, "web address"),
    (B + r"DB" + E, "database"),
    (r"\bRetros\b", "Retrospectives"),
    (r"\bRetro\b", "Retrospective"),
    (r"\(G/A/R\)", "(green, amber or red)"),
    (r"\bP×I\b|\bP × I\b", "probability × impact"),
    (r"\bP and I\b", "probability and impact"),
    (r"^P \(1–5\)$", "Probability (1–5)"),
    (r"^I \(1–5\)$", "Impact (1–5)"),
    (r"\bP (\d) → (\d)\b", r"probability \1 → \2"),
    (r"\bCat\.", "Category"),
    # --- Sprints, days, releases --------------------------------------------------------------------------------
    (B + r"S([123])/S([123])" + E, r"Sprint \1 / Sprint \2"),
    (B + r"S([123])" + E, r"Sprint \1"),
    (B + r"D([0-7])" + E, r"Day \1"),
    (B + r"R([12])" + E, r"Release \1"),
    # --- Units --------------------------------------------------------------------------------------------------
    (r"(?<![\d.])1 SP\b", "1 story point"),
    (B + r"SP" + E, "story points"),
    (r"(?<![\d.])1 ?h(?![\w])", "1 hour"),
    (r"(\d) ?h(?![\w])", r"\1 hours"),
    (r"(\d) ?M(?![-\w])", r"\1 million"),
    (r"\(h\)", "(hours)"),
    (r"(?<=[(, ])h(?=[,)])", "hours"),
    (r"\bActual h\b", "Actual hours"),
    (r"(\d) ?min\b", r"\1 minutes"),
    (r"(\d) s\b", r"\1 seconds"),
]

_EVM = [(re.compile(p, re.M), r) for p, r in EVM_RULES]
_ALL = [(re.compile(p, re.M), r) for p, r in RULES]
FORMULA_TEXT = {"not meaningful (CPI = 0)": "not meaningful (cost performance index = 0)"}
SKIP = {"README", "AI_Usage"}  # lecturer's instructions; AI log kept as recorded (in Vietnamese)


CASE_TYPES = {"M": "Main", "E": "Exception", "B": "Boundary"}


def rewrite(text, sheet=""):
    if sheet.startswith("TestCases") and text in CASE_TYPES:
        return CASE_TYPES[text]
    whole = re.fullmatch(r"[A-Z][A-Za-z]{1,4}", text) is not None
    first = text
    if sheet in EVM_SHEETS:
        for rx, rep in _EVM:
            text = rx.sub(rep, text)
    for rx, rep in _ALL:
        text = rx.sub(rep, text)
    if whole or (first[:1].isupper() and text[:1].islower()):
        return text[:1].upper() + text[1:]
    return text


def apply(wb):
    """Rewrite every text cell of the workbook in place; returns the number of cells changed."""
    changed = 0
    for ws in wb.worksheets:
        if ws.title in SKIP:
            continue
        for row in ws.iter_rows():
            for cell in row:
                v = cell.value
                if not isinstance(v, str):
                    continue
                if v.startswith("="):
                    new = v
                    for a, b in FORMULA_TEXT.items():
                        new = new.replace(a, b)
                else:
                    new = rewrite(v, ws.title)
                if new != v:
                    cell.value = new
                    changed += 1
    return changed
