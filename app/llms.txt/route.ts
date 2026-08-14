// /llms.txt — 給 AI 工具（Codex、Claude、Cursor…）一次讀完整個元件庫的入口。
// 每個元件附頁面網址、純文字原始碼網址與一行安裝指令，AI 可以直接取用而不必爬 HTML。
import { categories, entriesByCategory } from "@/lib/registry";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  shadcnAddCommand,
} from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME} — ${SITE_TAGLINE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "每個元件都是完整自足的單一 .tsx 檔案：只依賴 React 與 Tailwind CSS（少數元件另有 npm 相依，已標在下方），",
    "不依賴本站的設計 token，複製到任何專案都能直接運作。需要動畫的元件會在自己的檔案裡自帶 @keyframes。",
    "",
    "## 取用方式",
    "",
    `- 全站 registry 索引（shadcn 格式）：${SITE_URL}/r/registry.json`,
    `- 單一元件 registry item（含完整原始碼）：${SITE_URL}/r/<slug>.json`,
    `- 單一元件純文字原始碼：${SITE_URL}/r/<slug>.tsx`,
    `- 一行安裝：npx shadcn@latest add ${SITE_URL}/r/<slug>.json`,
    "",
  ];

  for (const cat of categories) {
    const items = entriesByCategory(cat.id);
    if (items.length === 0) continue;
    lines.push(`## ${cat.name}（${cat.nameEn}）`, "", `${cat.description}`, "");
    for (const item of items) {
      lines.push(
        `### ${item.name} / ${item.nameEn}`,
        "",
        item.description,
        "",
        `- 說明頁：${SITE_URL}/components/${item.slug}`,
        `- 原始碼：${SITE_URL}/r/${item.slug}.tsx`,
        `- 安裝：${shadcnAddCommand(item.slug)}`,
        `- npm 相依：${
          item.dependencies.length > 0 ? item.dependencies.join(", ") : "無"
        }`
      );
      if (item.props && item.props.length > 0) {
        lines.push(
          `- Props：${item.props
            .map(
              (p) =>
                `${p.name}: ${p.type}${
                  p.defaultValue ? ` = ${p.defaultValue}` : ""
                }`
            )
            .join("；")}`
        );
      }
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
