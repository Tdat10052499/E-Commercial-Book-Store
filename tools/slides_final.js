// Final presentation deck (c6_Slides.pptx) – 10 min + 5 min Q&A, both members present [03 §8].
// Figures come from pm/final/final-report.md (same values as the Workbook Final and the Sprint Reports).
// Usage: node tools/slides_final.js <pptx skill dir> → deliverables/Final/HK261_SPM_FP_Team6_c6_Slides.pptx
const path = require("path");
const pptxgen = require("pptxgenjs");
const SKILL = process.argv[2];
const { applyTheme } = require(path.join(SKILL, "scripts", "apply_theme.js"));

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "deliverables", "Final", "HK261_SPM_FP_Team6_c6_Slides.pptx");
const IMG = (n) => path.join(ROOT, "pm", "sprints", `S${n}`, "evidence", `burndown-S${n}.png`);

const THEME = {
  name: "Page Turners",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B2B27", lt1: "FFFFFF", dk2: "21463D", lt2: "EEF3F1",
    accent1: "21463D", accent2: "C8553D", accent3: "6E9E8F", accent4: "E3B04B",
    accent5: "8A9A96", accent6: "3F6E62", hlink: "C8553D", folHlink: "6E9E8F",
  },
};
const HEX = THEME.colors;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Team 6 Page Turners – Final presentation";
pres.author = "Team 6 Page Turners";
const C = pres.SchemeColor;

pres.defineSlideMaster({
  title: "DARK",
  background: { color: HEX.dk2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 11.7, h: 1.4, fontSize: 44, bold: true, color: C.background1, valign: "bottom" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.8, w: 11.7, h: 2.6, fontSize: 22, color: C.background2, valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: HEX.lt1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.text2, valign: "middle" }, text: "" } },
    { text: { text: "Team 6 Page Turners · Release 1.0 · Final presentation 20/11/2026", options: { x: 0.6, y: 7.0, w: 9, h: 0.35, fontSize: 11, color: HEX.accent5 } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.6, h: 0.35, fontSize: 11, color: HEX.accent5 },
});

const SECTIONS = ["Team and goal", "Plan", "Three Sprints", "Demo", "Plan vs actual", "Lessons"];
function slide(master, section) {
  return pres.addSlide({ masterName: master, sectionTitle: section });
}
function txt(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, fontSize: 20, color: C.text1, valign: "top", margin: 0 }, o));
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill || C.background2 }, line: { type: "none" } });
}
function stat(s, x, y, w, big, label, color) {
  card(s, x, y, w, 1.9);
  txt(s, big, { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: 0.95, fontSize: 48, bold: true, color: color || C.accent2, fontFace: THEME.headFontFace });
  txt(s, label, { x: x + 0.25, y: y + 1.15, w: w - 0.5, h: 0.65, fontSize: 18, color: C.text1 });
}
function bullets(s, items, o) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })),
    Object.assign({ isTextBox: true, fontSize: 20, color: C.text1, valign: "top", paraSpaceAfter: 8, margin: 0 }, o));
}
const chartText = { catAxisLabelColor: HEX.dk1, valAxisLabelColor: HEX.dk1, catAxisLabelFontSize: 16, valAxisLabelFontSize: 14,
  catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", dataLabelFontFace: "+mn-lt", legendFontFace: "+mn-lt",
  titleFontFace: "+mn-lt", dataLabelFontSize: 16, legendFontSize: 16, titleFontSize: 18, titleColor: HEX.dk1,
  valGridLine: { color: "D9E2DF", size: 0.75 }, catGridLine: { style: "none" } };

// 1 Title
pres.addSection({ title: SECTIONS[0] });
let s = slide("DARK", SECTIONS[0]);
s.addText("E-Commercial Book Store – Release 1.0", { placeholder: "title" });
s.addText([
  { text: "Final presentation · Team 6 \"Page Turners\"", options: { breakLine: true } },
  { text: "Hồ Du Tuấn Đạt – Developer, Sprint Leader S1 & S3", options: { breakLine: true } },
  { text: "Nguyễn Minh Chính – Product Owner, Sprint Leader S2", options: { breakLine: true } },
  { text: "Sponsor: Dr. Bùi Minh Phụng · 20/11/2026" },
], { placeholder: "body" });
s.addNotes("Đạt (30 s): Greet, introduce the team and the two roles. We present together: Đạt – team, Sprints 1 and 3, demo; Chính – plan, Sprint 2, changes, plan vs actual, lessons.");

// 2 Goal and result
s = slide("CONTENT", SECTIONS[0]);
s.addText("Release 1.0 was accepted by the Sponsor", { placeholder: "title" });
txt(s, "Goal: an online book catalogue – accounts and roles, book management, browsing, details, search and filter (F1–F5) plus the Store Staff role (CR-06).",
  { x: 0.6, y: 1.45, w: 12.1, h: 1.0 });
stat(s, 0.6, 2.75, 2.85, "73/73", "acceptance criteria Pass at UAT 13/11");
stat(s, 3.7, 2.75, 2.85, "68/68", "story points Done (all 20 items)");
stat(s, 6.8, 2.75, 2.85, "1.00", "SPI at closure", C.text2);
stat(s, 9.9, 2.75, 2.85, "1.47", "CPI at closure", C.text2);
txt(s, "20 backlog items delivered by 2 members · nothing cut · cart, checkout and social login out of scope",
  { x: 0.6, y: 5.0, w: 12.1, h: 0.9, color: C.text2, italic: true });
s.addNotes("Đạt (60 s): The goal of Release 1.0 and the result. UAT on 13/11: 73 of 73 ACs Pass, no defect, no new CR. All 68 SP are Done; NFR-03 (site online on 17/11) was checked on 17/11. SPI 1.00, CPI 1.47 – explained on the EVM slide.");

// 3 Plan
pres.addSection({ title: SECTIONS[1] });
s = slide("CONTENT", SECTIONS[1]);
s.addText("Release Plan: 3 one-week Sprints, 3 baselines", { placeholder: "title" });
s.addTable([
  [{ text: "Baseline", options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 } } },
   { text: "Date and reason", options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 } } },
   { text: "PSP", options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 } } },
   { text: "BAC (VND)", options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 } } }],
  ["v1.0", "30/10 – plan at Sprint 1", "55", "24,000,000"],
  ["v1.1", "04/11 – CR-06 approved (Option B)", "62", "26,400,000"],
  ["v1.2", "15/11 – CR-07 approved (re-estimate)", "68", "26,400,000"],
], { x: 0.6, y: 1.5, w: 7.6, colW: [1.2, 3.9, 0.9, 1.6], fontSize: 20, color: HEX.dk1, border: { type: "solid", pt: 0.75, color: "C9D6D2" }, rowH: 0.6, fontFace: "Calibri" });
card(s, 8.6, 1.5, 4.1, 4.9);
txt(s, "Basis", { x: 8.85, y: 1.7, w: 3.6, h: 0.5, bold: true, color: C.text2, fontSize: 22 });
bullets(s, ["Capacity 2 × 20 h = 40 h per Sprint", "N = 3, 200,000 VND/h", "S1 F1 · S2 F2, F3, US-24 · S3 F4, F5, US-25", "Leaders: Đạt S1, Chính (PO) S2, Đạt S3"],
  { x: 8.85, y: 2.3, w: 3.6, h: 3.9 });
txt(s, "Expected velocity 18.3 → 22.7 SP per Sprint", { x: 0.6, y: 4.3, w: 7.6, h: 0.6, color: C.text2, italic: true });
s.addNotes("Chính (60 s): Release Plan with three baselines. CR-06 raised PSP from 55 to 62 and the budget by 12 h; CR-07 re-estimated the S3 items from the team's Planning Poker votes (62 → 68), no hours or cost change. Capacity 40 h per Sprint.");

// 4 Estimation
s = slide("CONTENT", SECTIONS[1]);
s.addText("Estimation: Planning Poker came too late", { placeholder: "title" });
card(s, 0.6, 1.5, 5.9, 4.8);
txt(s, "What we did", { x: 0.85, y: 1.7, w: 5.4, h: 0.5, bold: true, color: C.text2, fontSize: 22 });
bullets(s, ["Fibonacci story points, MoSCoW priority", "S1–S2: SP set by the PO alone (no voting rounds)", "Session 3 on 11/11: team votes, but after the build"],
  { x: 0.85, y: 2.3, w: 5.4, h: 3.8 });
card(s, 6.85, 1.5, 5.85, 4.8, "FBEDE9");
txt(s, "Result", { x: 7.1, y: 1.7, w: 5.35, h: 0.5, bold: true, color: C.accent2, fontSize: 22 });
bullets(s, ["Votes: 21 SP instead of 15 SP for S3", "→ CR-07, approved by the CCB 13/11", "Evidence: planning-poker-log.md (Session 3)"],
  { x: 7.1, y: 2.3, w: 5.35, h: 3.8 });
s.addNotes("Chính (45 s): Be open about it: our estimates in S1 and S2 were PO estimates. The first voting round was on 11/11, after the S3 items were built; it gave 21 SP, so we raised CR-07. Lesson LL-03: vote at Sprint Planning. Show the Planning Poker log if asked.");

// 5–7 Sprints
pres.addSection({ title: SECTIONS[2] });
const SPR = [
  [1, "Sprint 1: F1 built, nothing accepted by Sprint end", "Đạt", ["Committed 18 SP · Done at end 0 SP", "Flat line: hours entered only after the Sprint", "16 SP accepted in the next week"],
    "Đạt (60 s): Sprint 1, F1 accounts and login. The chart is flat because hours were reconstructed after the Sprint – our first data-quality lesson. Files late in the repo (I-01). Retro actions: Daily, early drafts, same-day hours."],
  [2, "Sprint 2: most work merged on the last day", "Chính", ["Committed 29 SP · Done at end 5 SP", "39.75 → 6.25 h on the last day", "Lecturer feedback → day-by-day plan in S3"],
    "Chính (60 s): Sprint 2, F2, F3 and US-24. The data model was late (I-02), so most work merged on 05/11 and the line dropped at the end; SPI 0.51. The lecturer commented on it; we answered with a day-by-day plan and same-day updates."],
  [3, "Sprint 3: goal met, Release 1.0 ready for UAT", "Đạt", ["21 SP new + 24 SP carried = 45 SP Done", "Flat D1–D2 and D5, steep D4 and D6", "Daily D2, D3 not held – kept as deviations"],
    "Đạt (60 s): Sprint 3, F4, F5 and US-25. Flat at the start (Retro 2 late, Daily D2–D3 not held) and on 10/11 (I was busy, I-07). The D7 tasks were done on D7. All carried S2 items were accepted, then the UAT passed."],
];
for (const [n, title, who, pts, note] of SPR) {
  s = slide("CONTENT", SECTIONS[2]);
  s.addText(title, { placeholder: "title" });
  s.addImage({ path: IMG(n), x: 0.6, y: 1.45, w: 7.9, h: 4.0, altText: `Sprint ${n} burndown: remaining task hours, plan vs actual` });
  card(s, 8.85, 1.45, 3.85, 4.0);
  bullets(s, pts, { x: 9.05, y: 1.7, w: 3.45, h: 3.6 });
  txt(s, `Leader: ${n === 2 ? "Nguyễn Minh Chính (PO)" : "Hồ Du Tuấn Đạt"}`, { x: 0.6, y: 5.75, w: 7.9, h: 0.5, color: C.text2, italic: true });
  s.addNotes(note);
}

// 8 Changes
s = slide("CONTENT", SECTIONS[2]);
s.addText("Two change requests through the CCB", { placeholder: "title" });
for (const [x, head, rows] of [
  [0.6, "CR-06 · Sponsor · Store Staff role", ["CCB 30/10: Approve, Option B", "+7 SP, +12 h, +2.4 M VND", "US-24 in S2, US-25 in S3", "8/8 CR-06 ACs Pass in UAT"]],
  [6.75, "CR-07 · PO · re-estimate S3", ["CCB 13/11: Approve", "+6 SP (PSP 62 → 68)", "0 h, 0 VND – estimate only", "Baseline v1.2"]],
]) {
  card(s, x, 1.5, 5.95, 4.6);
  txt(s, head, { x: x + 0.25, y: 1.7, w: 5.45, h: 0.6, bold: true, color: C.text2, fontSize: 22 });
  bullets(s, rows, { x: x + 0.25, y: 2.45, w: 5.45, h: 3.5 });
}
s.addNotes("Chính (45 s): Both CRs followed the Change Log → impact analysis → CCB → rebaseline. CR-06 was delivered in two parts and passed all its ACs at UAT; CR-07 only changed the estimates, not the hours or the budget.");

// 9 Risks
s = slide("CONTENT", SECTIONS[2]);
s.addText("Risks that happened and what we did", { placeholder: "title" });
const H = (t) => ({ text: t, options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 } } });
s.addTable([
  [H("Risk / issue"), H("Response"), H("Result")],
  ["Late F2 integration (R12, I-02)", "PO took the data-model task", "Built 05/11, accepted in S3"],
  ["PRs merged without review (I-06)", "Approval before every merge", "All PRs approved since 12/11"],
  ["Daily not held (I-05)", "Fixed slot: Discord 22:00", "From 11/11; D2, D3 missed"],
  ["Member busy 10/11 (R09, I-07)", "Moved T11, swapped test runner", "US-13 accepted 12/11"],
], { x: 0.6, y: 1.5, w: 12.1, colW: [4.2, 4.1, 3.8], fontSize: 20, color: HEX.dk1, border: { type: "solid", pt: 0.75, color: "C9D6D2" }, rowH: 0.75, fontFace: "Calibri" });
s.addNotes("Đạt (45 s): Four risks or issues that really happened, the response and whether it worked. Did not happen: security defect (R08), state lost between list and detail (R10).");

// 10 Demo
pres.addSection({ title: SECTIONS[3] });
s = slide("DARK", SECTIONS[3]);
s.addText("Demo on the hosted site", { placeholder: "title" });
s.addText([
  { text: "pagetunnel.vercel.app", options: { bold: true, color: HEX.accent4, breakLine: true } },
  { text: "Pass: search \"darwin\", filter Novel 50,000–150,000, detail and Back keeps page 2", options: { breakLine: true } },
  { text: "Fail case: price from 200,000 to 100,000 → \"invalid price range\", no filter", options: { breakLine: true } },
  { text: "Staff edits a book → Admin sees \"Last updated by\" (CR-06)" },
], { placeholder: "body" });
s.addNotes("Đạt (90 s): Live demo; if the site is slow, play the ≤ 3 min video. Read the AC aloud before each step. Pass: US-12/AC-01, US-13/AC-01, US-11/AC-02. Fail scenario (exception AC): US-13 invalid range. CR-06: US-25/AC-01.");

// 11 Plan vs actual
pres.addSection({ title: SECTIONS[4] });
s = slide("CONTENT", SECTIONS[4]);
s.addText("Plan vs actual: accepted late, hours below plan", { placeholder: "title" });
s.addChart(pres.charts.BAR, [
  { name: "Committed SP", labels: ["S1", "S2", "S3"], values: [18, 29, 45] },
  { name: "Done at Sprint end", labels: ["S1", "S2", "S3"], values: [0, 5, 45] },
], Object.assign({ x: 0.6, y: 1.45, w: 6.0, h: 4.6, barDir: "col", barGrouping: "clustered", chartColors: [HEX.accent3, HEX.accent2],
  showTitle: true, title: "Story points per Sprint", showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.dk1,
  showLegend: true, legendPos: "b", valAxisHidden: true }, chartText));
s.addChart(pres.charts.BAR, [
  { name: "Planned h", labels: ["S1", "S2", "S3"], values: [48, 39.75, 39.5] },
  { name: "Actual h", labels: ["S1", "S2", "S3"], values: [41, 24, 24.73] },
], Object.assign({ x: 6.85, y: 1.45, w: 5.85, h: 4.6, barDir: "col", barGrouping: "clustered", chartColors: [HEX.accent5, HEX.dk2],
  showTitle: true, title: "Task hours per Sprint (Jira)", showValue: true, dataLabelFormatCode: "0.##", dataLabelPosition: "outEnd", dataLabelColor: HEX.dk1,
  showLegend: true, legendPos: "b", valAxisHidden: true }, chartText));
txt(s, "S3 committed = 21 SP new + 24 SP carried from S2 · total 89.73 h of 127.25 h planned",
  { x: 0.6, y: 6.2, w: 12.1, h: 0.5, color: C.text2, italic: true, fontSize: 18 });
s.addNotes("Chính (60 s): Velocity 0 → 5 → 45 SP: items were built on time but accepted one Sprint later. Hours: 89.73 h logged against 127.25 h of planned tasks (132 h budget).");

// 12 EVM
s = slide("CONTENT", SECTIONS[4]);
s.addText("EVM: on schedule at closure, below budget", { placeholder: "title" });
s.addChart(pres.charts.LINE, [
  { name: "SPI", labels: ["End S1", "End S2", "End S3", "Closure"], values: [0.0, 0.51, 0.97, 1.00] },
  { name: "CPI", labels: ["End S1", "End S2", "End S3", "Closure"], values: [0.0, 0.69, 1.50, 1.47] },
], Object.assign({ x: 0.6, y: 1.45, w: 6.6, h: 4.7, chartColors: [HEX.accent2, HEX.dk2], lineSize: 3, lineDataSymbolSize: 9,
  showTitle: true, title: "SPI and CPI by snapshot", showValue: true, dataLabelPosition: "t", dataLabelColor: HEX.dk1, dataLabelFormatCode: "0.00",
  showLegend: true, legendPos: "b", valAxisMinVal: 0, valAxisMaxVal: 1.8, valAxisLabelFormatCode: "0.0" }, chartText));
s.addTable([
  [H("Closure (PSP 68)"), H("VND")],
  ["PV", "26,400,000"], ["EV (68/68)", "26,400,000"], ["AC (89.73 h)", "17,946,000"], ["EAC = BAC / CPI", "17,946,000"],
], { x: 7.5, y: 1.5, w: 5.2, colW: [2.9, 2.3], fontSize: 20, color: HEX.dk1, border: { type: "solid", pt: 0.75, color: "C9D6D2" }, rowH: 0.6, fontFace: "Calibri" });
txt(s, "CPI 1.47 is not pure efficiency: some hours rebuilt after the Sprint, AI-assisted work, late logging",
  { x: 7.5, y: 4.85, w: 5.2, h: 1.3, color: C.accent2, fontSize: 18 });
s.addNotes("Chính (60 s): PV = BAC × n/N, EV = BAC × SP Done / PSP, AC = hours × 200,000. SPI rose from 0.51 to 0.97 when the carried items were accepted, and to 1.00 with NFR-03. SPI 1.00 at closure after NFR-03 was accepted on 17/11. CPI 1.47 at closure (1.50 at the end of S3, before the last hours were logged) – be honest about why.");

// 13 Quality
s = slide("CONTENT", SECTIONS[4]);
s.addText("Quality: every AC tested, no open defect", { placeholder: "title" });
stat(s, 0.6, 1.6, 3.8, "114/114", "automated tests pass");
stat(s, 4.75, 1.6, 3.8, "73/73", "ACs with a test case, all Pass at UAT");
stat(s, 8.9, 1.6, 3.8, "6 → 0", "defects found → open", C.text2);
bullets(s, ["From S3 the runner of a test is never its writer", "List page loads in 0.50 s (NFR-05 < 2 s)", "One regression (DEF-S3-03) came from UI work outside the backlog"],
  { x: 0.6, y: 4.0, w: 12.1, h: 2.4 });
s.addNotes("Đạt (45 s): Quality figures. Mention runner ≠ writer and the DEF-S3-03 regression honestly – it leads into the lessons.");

// 14 Lessons
pres.addSection({ title: SECTIONS[5] });
s = slide("CONTENT", SECTIONS[5]);
s.addText("Most important lessons", { placeholder: "title" });
for (const [x, head, body] of [
  [0.6, "Built is not Done", "Plan the hosted test and PO acceptance inside the Sprint – S2 accepted only 5 of 29 SP"],
  [4.75, "Estimate before building", "Hold Planning Poker at Sprint Planning; voting after the build forced CR-07"],
  [8.9, "Log hours the same day", "EVM is only as good as the actual hours behind it"],
]) {
  card(s, x, 1.5, 3.8, 4.7);
  txt(s, head, { x: x + 0.25, y: 1.75, w: 3.3, h: 1.0, bold: true, color: C.accent2, fontSize: 24, fontFace: THEME.headFontFace });
  txt(s, body, { x: x + 0.25, y: 2.9, w: 3.3, h: 3.1 });
}
s.addNotes("Chính (45 s) and Đạt (15 s): Three of our seven Lessons Learned (Final Report §6). The most important one: work is not value until it is accepted.");

// 15 Close
s = slide("DARK", SECTIONS[5]);
s.addText("Thank you – questions?", { placeholder: "title" });
s.addText([
  { text: "Site: pagetunnel.vercel.app", options: { breakLine: true } },
  { text: "Repo: github.com/Tdat10052499/E-Commercial-Book-Store", options: { breakLine: true } },
  { text: "Board: Jira project ECBS · Final Report c6 · Workbook c2 Final" },
], { placeholder: "body" });
s.addNotes("Both: Q&A (5 min). Each member answers the questions put to them. Evidence ready: Planning Poker log, Jira worklogs, PR approvals, UAT minutes, risk register.");

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
