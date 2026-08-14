// OG 分享圖的共用版面與字型載入。
// next/og（satori）不會自帶中文字型，不餵字型檔中文會整片變成豆腐方塊，
// 所以這裡讀 assets/ 底下子集化過的 Noto Sans TC（見 scripts/build-og-font.py）。
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#12151f";
const PAPER_2 = "#1a1e2b";
const INK = "#eeeae2";
const INK_MUTE = "#a3a8b8";
const ACCENT = "#f0b45c";
const LINE = "#333a4d";

export async function ogFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/og-noto-tc-400.ttf")),
    readFile(join(process.cwd(), "assets/og-noto-tc-700.ttf")),
  ]);
  return [
    { name: "NotoTC", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "NotoTC", data: bold, style: "normal" as const, weight: 700 as const },
  ];
}

/**
 * 統一的分享卡版面：左上角站名、中間標題、底下說明與角落標記。
 */
export function OgCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  footer?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: PAPER,
        padding: 72,
        fontFamily: "NotoTC",
        // 右下角的琥珀色光暈，跟站台深色工作台調性一致
        backgroundImage: `radial-gradient(1100px 620px at 100% 100%, ${PAPER_2} 0%, ${PAPER} 62%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: ACCENT,
            display: "flex",
          }}
        />
        <div style={{ fontSize: 28, fontWeight: 700, color: INK, display: "flex" }}>
          {SITE_NAME}
        </div>
        {eyebrow ? (
          <div style={{ fontSize: 24, color: ACCENT, display: "flex" }}>
            {`/ ${eyebrow}`}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: title.length > 14 ? 76 : 96,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.15,
            letterSpacing: -1,
            display: "flex",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 30,
              color: INK_MUTE,
              lineHeight: 1.5,
              maxWidth: 940,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${LINE}`,
          paddingTop: 24,
          fontSize: 24,
          color: INK_MUTE,
        }}
      >
        <div style={{ display: "flex" }}>{footer ?? "繁體中文 UI 元件庫"}</div>
        <div style={{ display: "flex", color: ACCENT }}>himari-ui.vercel.app</div>
      </div>
    </div>
  );
}
