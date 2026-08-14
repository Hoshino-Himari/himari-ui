// 把單一元件打包成一段可以直接貼給 AI 的提示：名稱、用途、Props、安裝方式、完整原始碼。
// 站台的定位就是「丟給 Codex 也能直接看懂」，這裡把那件事變成一顆按鈕。
import type { ComponentEntry } from "./registry/types";
import { SITE_URL, shadcnAddCommand } from "./site";
import { targetPath } from "./registry-item";

export function buildAiPrompt(entry: ComponentEntry, code: string) {
  const parts: string[] = [
    `以下是「${entry.name}（${entry.nameEn}）」這個 React 元件，來自 Himari UI（${SITE_URL}/components/${entry.slug}）。`,
    "",
    `用途：${entry.description}`,
    "",
    `這是一個完整自足的單一檔案，只依賴 React 與 Tailwind CSS，請原封不動存成 ${targetPath(
      entry.slug
    )}，然後幫我接進頁面裡。`,
  ];

  if (entry.dependencies.length > 0) {
    parts.push(
      "",
      `需要先安裝的 npm 套件：${entry.dependencies.join(" ")}`
    );
  }

  parts.push("", `也可以用一行指令安裝：${shadcnAddCommand(entry.slug)}`);

  if (entry.props && entry.props.length > 0) {
    parts.push("", "Props：");
    for (const p of entry.props) {
      parts.push(
        `- ${p.name}: ${p.type}${
          p.defaultValue ? `（預設 ${p.defaultValue}）` : ""
        } — ${p.description}`
      );
    }
  }

  parts.push(
    "",
    `\`\`\`tsx title="${targetPath(entry.slug)}"`,
    code.trimEnd(),
    "```",
    ""
  );

  return parts.join("\n");
}
