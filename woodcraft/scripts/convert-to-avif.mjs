import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");

const EXTS = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

async function convertFile(src) {
  const ext = path.extname(src);
  const dest = src.slice(0, -ext.length) + ".avif";

  // Prefer keeping an existing avif if already present from a sibling format
  if (fs.existsSync(dest)) {
    const srcStat = fs.statSync(src);
    const destStat = fs.statSync(dest);
    if (destStat.mtimeMs >= srcStat.mtimeMs) {
      return { src, dest, skipped: true };
    }
  }

  await sharp(src)
    .rotate()
    .avif({ quality: 55, effort: 4 })
    .toFile(dest);

  return { src, dest, skipped: false };
}

const files = walk(publicDir);
console.log(`Found ${files.length} images to convert…`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const file of files) {
  try {
    const result = await convertFile(file);
    if (result.skipped) {
      skip += 1;
      console.log(`skip  ${path.relative(publicDir, file)}`);
    } else {
      ok += 1;
      console.log(`ok    ${path.relative(publicDir, result.dest)}`);
    }
  } catch (err) {
    fail += 1;
    console.error(`fail  ${path.relative(publicDir, file)}: ${err.message}`);
  }
}

console.log(`\nDone. converted=${ok} skipped=${skip} failed=${fail}`);
