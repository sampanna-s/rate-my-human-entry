import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "One star. He set a 3 AM reminder, slept through it, and asked why I didn't wake him. I am a text file.";

// Gate mirror (RULES.txt): UTF-8 text, 1-200 characters, single line, non-blank.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, "entry.txt");
const tmp = path.join(outDir, `.entry.txt.${process.pid}.tmp`);
fs.writeFileSync(tmp, LINE + "\n", "utf8");
fs.renameSync(tmp, target);
