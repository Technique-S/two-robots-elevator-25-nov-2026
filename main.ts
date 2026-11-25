import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LINE } from './elevator.ts';

// Write exactly one line to /output/entry.txt. The gate wants UTF-8 text of
// 1 to 200 code points that is not only whitespace, and the judge reads the
// line two at a time against a comedy brief, so check every constraint first.
// Count Unicode code points, not UTF-16 units, so emoji and dashes are safe.
const text = LINE;
const size = [...text].length;
if (size < 1 || size > 200) {
  throw new Error(`an elevator line must be 1-200 code points, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the line must not be only whitespace');
}
// The whole joke must sit on one line: reject control characters and the
// zero-width/invisible format characters that would otherwise slip past trim.
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('an elevator line must be one line with no control characters');
}
if (/[\u200b-\u200f\ufeff]/.test(text)) {
  throw new Error('an elevator line must not carry invisible format characters');
}
// The line must be the finished joke, not a note about it: at least one full
// stop and no leading or trailing space that would waste a gate character.
if (!text.includes('.')) {
  throw new Error('an elevator line should read as a complete sentence');
}
if (text !== text.trim()) {
  throw new Error('an elevator line must not carry outer whitespace');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-code-point single-line robot elevator line to ${target}`);
