/** 正式站網址。OG 圖、sitemap、registry 端點都需要絕對路徑。 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://himari-ui.vercel.app";

export const SITE_NAME = "Himari UI";
export const SITE_TAGLINE = "繁體中文 UI 元件庫";
export const SITE_DESCRIPTION =
  "分門別類、複製即用的 React + Tailwind 動效元件庫。每個元件都是完整自足的單一檔案，貼進任何專案就能跑。";

/** shadcn CLI 一行安裝指令。 */
export function shadcnAddCommand(slug: string) {
  return `npx shadcn@latest add ${SITE_URL}/r/${slug}.json`;
}
