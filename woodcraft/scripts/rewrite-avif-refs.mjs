import fs from "fs";
import path from "path";

const roots = ["src", "index.html", "public/images/products/README.md"];
const EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".md", ".mjs"]);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    files.push(dir);
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walk(full, files);
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

let changed = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, "utf8");
    let after = before.replace(
      /(\/images\/[^\s"'`)]+?)\.(png|jpe?g)/gi,
      "$1.avif"
    );
    after = after.replace(
      /(assets\/hero\/[^\s"'`)]+?)\.(png|jpe?g)/gi,
      "$1.avif"
    );
    after = after.replace(/type="image\/png"/g, 'type="image/avif"');
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed += 1;
      console.log("updated", file);
    }
  }
}
console.log("files changed:", changed);
