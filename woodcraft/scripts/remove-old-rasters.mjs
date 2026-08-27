import fs from "fs";
import path from "path";

const roots = ["public", "src/assets"];
const EXTS = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

let removed = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    const avif = file.replace(/\.(png|jpe?g)$/i, ".avif");
    if (!fs.existsSync(avif)) {
      console.warn("keep (no avif yet):", file);
      continue;
    }
    fs.unlinkSync(file);
    removed += 1;
    console.log("removed", file);
  }
}
console.log("removed count:", removed);
