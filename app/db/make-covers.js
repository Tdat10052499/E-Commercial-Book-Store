// Generates the typographic SVG covers for the sample books (public/covers/seed-XX.svg).
// Run once after changing db/seed-data.js: node db/make-covers.js
// The covers are shown through <img>, so they cannot use the page's web font: every font in the stacks
// below must have the Vietnamese glyphs (Georgia does not – "Dế" rendered as "Dê´", DEF-F2-01).
const fs = require('node:fs');
const path = require('node:path');
const { AUTHORS, BOOKS } = require('./seed-data');

const PALETTE = [
  ['#e8e2d6', '#1a1a1a'], ['#1f3b4d', '#f4efe6'], ['#c8553d', '#fff8ef'], ['#f2c14e', '#1a1a1a'],
  ['#2d2a26', '#f4efe6'], ['#9bb7a4', '#1a1a1a'], ['#6b4e71', '#fbf6ff'], ['#d9cfc1', '#2b2b2b'],
];
const SERIF_VI = "'Times New Roman', 'Noto Serif', 'Liberation Serif', 'DejaVu Serif', serif";
const SANS_VI = "Arial, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', 'DejaVu Sans', sans-serif";
// Text area inside the frame: x 24 → 176.
const TEXT_X = 24;
const TEXT_WIDTH = 152;
const TITLE = { size: 24, maxChars: 14, charWidth: 11.5 };   // ≈ 0.48 em per character
const AUTHOR = { size: 10, maxChars: 17, charWidth: 8.7, gap: 14 }; // ≈ 0.67 em + 2 px letter-spacing

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Breaks text into lines of at most `max` characters, at spaces.
function wrap(text, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

// A single word longer than the line is squeezed into the frame instead of overflowing it.
const fit = (line, charWidth) => (line.length * charWidth > TEXT_WIDTH
  ? ` textLength="${TEXT_WIDTH}" lengthAdjust="spacingAndGlyphs"` : '');

function coverSvg(title, author, i) {
  const [bg, fg] = PALETTE[i % PALETTE.length];
  const t = title.normalize('NFC');
  const a = author.normalize('NFC').toUpperCase();
  const titleSvg = wrap(t, TITLE.maxChars)
    .map((l, n) => `<tspan x="${TEXT_X}" dy="${n ? 30 : 0}"${fit(l, TITLE.charWidth)}>${esc(l)}</tspan>`).join('');
  const authorLines = wrap(a, AUTHOR.maxChars);
  const authorY = 268 - (authorLines.length - 1) * AUTHOR.gap; // last line stays on the baseline at 268
  const authorSvg = authorLines
    .map((l, n) => `<tspan x="${TEXT_X}" dy="${n ? AUTHOR.gap : 0}"${fit(l, AUTHOR.charWidth)}>${esc(l)}</tspan>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" role="img" aria-label="${esc(t)}">
<rect width="200" height="300" fill="${bg}"/>
<rect x="12" y="12" width="176" height="276" fill="none" stroke="${fg}" stroke-opacity=".25"/>
<text x="${TEXT_X}" y="70" fill="${fg}" font-family="${SERIF_VI.replace(/"/g, '&quot;')}" font-size="${TITLE.size}" font-weight="400">${titleSvg}</text>
<text x="${TEXT_X}" y="${authorY}" fill="${fg}" fill-opacity=".8" font-family="${SANS_VI.replace(/"/g, '&quot;')}" font-size="${AUTHOR.size}" letter-spacing="2">${authorSvg}</text>
</svg>
`;
}

function writeCovers() {
  const dir = path.join(__dirname, '..', 'public', 'covers');
  fs.mkdirSync(dir, { recursive: true });
  BOOKS.forEach(([key, title, authorKey], i) => {
    fs.writeFileSync(path.join(dir, `${key}.svg`), coverSvg(title, AUTHORS[authorKey].name, i));
  });
  console.log(`${BOOKS.length} covers written to public/covers`);
}

if (require.main === module) writeCovers();

module.exports = { coverSvg, wrap, TITLE, AUTHOR, TEXT_WIDTH };
