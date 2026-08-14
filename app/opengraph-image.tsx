import { ImageResponse } from "next/og";
import { categories, registry } from "@/lib/registry";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from "@/lib/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        title="複製即用的 React 動效元件庫"
        subtitle="每個元件都是完整自足的單一檔案，複製貼進任何專案就能跑。丟給 Codex 或任何 AI 工具也能直接看懂。"
        footer={`${registry.length} 個元件 · ${categories.length} 個分類`}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
