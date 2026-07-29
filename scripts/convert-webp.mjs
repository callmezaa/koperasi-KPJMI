import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { join, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = parse(fileURLToPath(import.meta.url)).dir;
const ROOT = join(__dirname, "..");
const SRC_ASSETS = join(ROOT, "src", "assets");

const extensions = new Set([".png", ".jpg", ".jpeg"]);

async function convertDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(full);
    } else if (entry.isFile() && extensions.has(parse(entry.name).ext.toLowerCase())) {
      const webpPath = join(parse(full).dir, parse(full).name + ".webp");
      try {
        const buf = await readFile(full);
        const webpBuf = await sharp(buf).webp({ quality: 80, effort: 6 }).toBuffer();
        await writeFile(webpPath, webpBuf);
        const before = (buf.length / 1024 / 1024).toFixed(2);
        const after = (webpBuf.length / 1024 / 1024).toFixed(2);
        console.log(`  ✓ ${relative(SRC_ASSETS, full)}  ${before}MB → ${after}MB`);
      } catch (err) {
        console.error(`  ✗ ${relative(SRC_ASSETS, full)}  ${err.message}`);
      }
    }
  }
}

console.log("Converting images to WebP…");
await convertDir(SRC_ASSETS);
console.log("Done.");
