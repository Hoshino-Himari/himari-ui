// 掃描 components/ui/*.tsx，把每個元件的原始碼打包成 lib/registry-code.json。
// 網站「程式碼」分頁顯示的內容就來自這裡 —— 顯示的程式碼＝實際在跑的程式碼。
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const uiDir = path.join(root, "components", "ui");
const outFile = path.join(root, "lib", "registry-code.json");

const files = (await readdir(uiDir)).filter((f) => f.endsWith(".tsx")).sort();
const code = {};
for (const file of files) {
  const slug = file.replace(/\.tsx$/, "");
  code[slug] = await readFile(path.join(uiDir, file), "utf8");
}

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(code, null, 2), "utf8");
console.log(`registry-code.json：已收錄 ${files.length} 個元件`);
