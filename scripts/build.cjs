/* Cross-platform build: copies src/ -> build/ */
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const root = process.cwd();
const srcDir = path.join(root, 'src');
// Vercel expects an output directory named "public" by default
const outDir = path.join(root, 'public');

async function ensureDir(dir){ await fsp.mkdir(dir, { recursive: true }); }
async function cleanDir(dir){
  try {
    const items = await fsp.readdir(dir);
    await Promise.all(items.map((name) => fsp.rm(path.join(dir, name), { recursive: true, force: true })));
  } catch {}
}
async function copyFile(src, dest){ await ensureDir(path.dirname(dest)); await fsp.copyFile(src, dest); }
async function copyDir(src, dest){
  const entries = await fsp.readdir(src, { withFileTypes: true });
  await ensureDir(dest);
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else if (entry.isFile()) await copyFile(s, d);
  }
}

(async () => {
  await ensureDir(outDir);
  await cleanDir(outDir);
  await copyDir(srcDir, outDir);
  console.log(`Build completo: ${outDir}`);
})();


