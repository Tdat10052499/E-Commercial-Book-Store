// Generates the typographic SVG covers for the sample books (public/covers/seed-XX.svg).
// Run once after changing db/seed-data.js: node db/make-covers.js
const fs = require('node:fs');
const path = require('node:path');
const { AUTHORS, BOOKS } = require('./seed-data');

const PALETTE = [
  ['#e8e2d6', '#1a1a1a'], ['#1f3b4d', '#f4efe6'], ['#c8553d', '#fff8ef'], ['#f2c14e', '#1a1a1a'],
  ['#2d2a26', '#f4efe6'], ['#9bb7a4', '#1a1a1a'], ['#6b4e71', '#fbf6ff'], ['#d9cfc1', '#2b2b2b'],
];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Breaks a title into lines of at most ~14 characters.
function wrap(text, max = 14) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

const dir = path.join(__dirname, '..', 'public', 'covers');
fs.mkdirSync(dir, { recursive: true });
BOOKS.forEach(([key, title, authorKey], i) => {
  const [bg, fg] = PALETTE[i % PALETTE.length];
  const lines = wrap(title);
  const titleSvg = lines.map((l, n) => `<tspan x="24" dy="${n ? 30 : 0}">${esc(l)}</tspan>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300" role="img" aria-label="${esc(title)}">
<rect width="200" height="300" fill="${bg}"/>
<rect x="12" y="12" width="176" height="276" fill="none" stroke="${fg}" stroke-opacity=".25"/>
<text x="24" y="70" fill="${fg}" font-family="Georgia, 'Times New Roman', serif" font-size="24" font-weight="400">${titleSvg}</text>
<text x="24" y="268" fill="${fg}" fill-opacity=".8" font-family="Helvetica, Arial, sans-serif" font-size="10" letter-spacing="2">${esc(AUTHORS[authorKey].name.toUpperCase())}</text>
</svg>
`;
  fs.writeFileSync(path.join(dir, `${key}.svg`), svg);
});
console.log(`${BOOKS.length} covers written to public/covers`);
