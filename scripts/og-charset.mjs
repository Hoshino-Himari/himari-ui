// 列出 OG 分享圖會用到的所有字元，交給 scripts/build-og-font.py 做字型子集化。
// 也會寫出 assets/og-font-charset.txt，build-registry.mjs 用它檢查有沒有字沒被收進字型。
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/** OG 圖上會出現的固定文案，改版面時要一起更新 */
export const FIXED_TEXT = [
  "Himari UI",
  "繁體中文 UI 元件庫",
  "個元件",
  "個分類",
  "複製即用的 React 動效元件庫",
  "0123456789",
  "· / — ‧ ，。、（）「」：",
];

/** 從 registry 原始檔撈出所有中文名與分類名（避免另外跑 TS 編譯） */
export async function collectRegistryText() {
  const dir = path.join(root, "lib", "registry");
  const files = [
    "index.ts",
    "buttons.ts",
    "cards.ts",
    "text.ts",
    "backgrounds.ts",
    "loaders.ts",
    "inputs.ts",
    "navigation.ts",
    "effects.ts",
    "display.ts",
    "canvas.ts",
    "overlays.ts",
    "layout.ts",
  ];
  const out = [];
  for (const f of files) {
    const src = await readFile(path.join(dir, f), "utf8");
    // name / nameEn / description 三個欄位的字串值
    for (const m of src.matchAll(/\b(?:name|nameEn|description)\s*:\s*"((?:[^"\\]|\\.)*)"/g)) {
      out.push(m[1]);
    }
  }
  return out;
}

export async function buildCharset() {
  const chunks = [...FIXED_TEXT, ...(await collectRegistryText())];
  // ASCII 可見字元一律收進來
  for (let c = 0x20; c <= 0x7e; c++) chunks.push(String.fromCharCode(c));
  const set = new Set([...chunks.join("")]);
  set.delete("\n");
  return [...set].sort().join("");
}

// 直接執行時把字元集寫出來
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const charset = await buildCharset();
  const outFile = path.join(root, "assets", "og-font-charset.txt");
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, charset, "utf8");
  console.log(`og-font-charset.txt：${[...charset].length} 個字元`);
}
