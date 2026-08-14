// 掃描 components/ui/*.tsx，把每個元件的原始碼打包成 lib/registry-code.json。
// 網站「程式碼」分頁顯示的內容就來自這裡 —— 顯示的程式碼＝實際在跑的程式碼。
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCharset } from "./og-charset.mjs";

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

// OG 分享圖用的是子集化過的中文字型，只含 assets/og-font-charset.txt 裡的字。
// 新元件名稱出現沒收進去的字，圖上會靜靜變成豆腐方塊 —— 這裡改成直接讓 build 失敗。
const charsetFile = path.join(root, "assets", "og-font-charset.txt");
const covered = new Set(await readFile(charsetFile, "utf8"));
const missing = [...new Set(await buildCharset())].filter((ch) => !covered.has(ch));
if (missing.length > 0) {
  console.error(
    `\nOG 字型缺字：${missing.join(" ")}\n` +
      `請重跑字型子集化：\n` +
      `  node scripts/og-charset.mjs && python scripts/build-og-font.py\n`
  );
  process.exit(1);
}
