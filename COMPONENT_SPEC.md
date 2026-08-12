# Himari UI 元件規範

所有元件（不論人寫還是 AI 寫）都必須遵守這份規範。這份文件同時給 Codex / Claude 等 AI 工具閱讀：照著做就能新增一個合格元件。

## 一個元件 = 三個檔案

| 檔案 | 用途 |
|------|------|
| `components/ui/<slug>.tsx` | 元件本體，**完整自足、可攜**，使用者複製這個檔案就能用 |
| `components/demos/<slug>-demo.tsx` | 網站上的即時預覽 |
| `lib/registry/<category>.ts` | 該分類的中繼資料陣列（把新元件的條目加進去） |

另外要在 `components/demos/index.tsx` 的 `demos` 對照表加一行（本專案 43 個首發元件的對照表已預先寫好，slug 必須完全一致）。

## 元件本體規則（components/ui/<slug>.tsx）

1. **可攜性最優先**：這個檔案會被複製到別人的專案。只能 import `react` 和條目中宣告的 npm 套件（例如 `motion/react`、`cobe`）。**禁止** import 本專案的任何其他檔案（`@/lib/...`、`@/components/...` 都不行）。
2. **不使用本站設計 tokens**：`bg-paper`、`text-ink` 這些 class 在別人的專案不存在。用 Tailwind 標準色階（`zinc`、`neutral`、`amber`⋯）或元件自帶的 CSS 變數/inline style。顏色盡量做成 props 可調。
3. 檔案開頭（`"use client"` 之後）放一段繁中 JSDoc：一句話說明元件、`@example` 給最小使用範例。
4. 有互動就加 `"use client"`。具名匯出，PascalCase（如 `export function ShimmerButton`）。
5. Props 要有 TypeScript 型別與合理預設值；一律接受 `className?: string` 讓使用者疊加樣式。
6. 動畫只動 `transform` 與 `opacity`；大面積循環動畫要尊重 `prefers-reduced-motion`（CSS media query 或 `useReducedMotion`）。
7. 互動元件要處理完整狀態：hover、`:focus-visible`（可見的 focus ring）、active、disabled。
8. 需要 keyframes 時，在元件內用 `<style>{`...`}</style>` 內嵌（配唯一的 class 名），複製出去才不會缺樣式。

## 預覽規則（components/demos/<slug>-demo.tsx）

1. `"use client"`、`export default function`。
2. 只負責把元件擺好看：置中、示範文案用**繁體中文**、可以用本站 tokens（`text-ink` 等）。
3. 背景類元件要包在 `relative` 的固定高度容器內展示，不能撐爆版面。
4. 不得捏造數據或見證（假用戶數、假評價）；示範數字要明顯是示範（如 1,234）。

## Registry 條目規則（lib/registry/<category>.ts）

```ts
{
  slug: "shimmer-button",          // = 檔名，kebab-case
  name: "微光按鈕",                 // 繁中名
  nameEn: "Shimmer Button",
  category: "buttons",
  description: "邊緣有一道光沿著按鈕輪廓繞行的 CTA 按鈕，適合當主要行動呼籲。", // 1–2 句繁中
  dependencies: [],                 // react 以外要 npm install 的套件
  props: [
    { name: "shimmerColor", type: "string", defaultValue: '"#ffffff"', description: "光帶顏色" },
  ],
  source: { label: "MagicUI", url: "https://magicui.design/docs/components/shimmer-button" }, // 改寫自開源專案時必填
}
```

- 改寫自開源專案（MagicUI、Aceternity、Uiverse⋯）的元件**必須**填 `source`，尊重原作者。
- 自己原創的元件不填 `source`。

## 完整範例：components/ui/shimmer-button.tsx

```tsx
"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * 微光按鈕：一道光帶沿著按鈕邊緣繞行，強調主要行動呼籲。
 * @example <ShimmerButton>開始使用</ShimmerButton>
 */
type ShimmerButtonProps = {
  children: ReactNode;
  /** 光帶顏色 */
  shimmerColor?: string;
  /** 繞行一圈的秒數 */
  duration?: number;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ShimmerButton({
  children,
  shimmerColor = "#ffffff",
  duration = 3,
  className = "",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-100 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className="himari-shimmer absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 300deg, ${shimmerColor} 330deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
      <span className="absolute inset-[1.5px] rounded-full bg-zinc-900" />
      <span className="relative z-10">{children}</span>
      <style>{`
        .himari-shimmer { animation: himari-shimmer-spin linear infinite; }
        @keyframes himari-shimmer-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .himari-shimmer { animation: none; } }
      `}</style>
    </button>
  );
}
```

## 驗證

- `npx tsc --noEmit`：自己新增的檔案必須零錯誤（`components/demos/index.tsx` 對「還沒寫的別人元件」報 module not found 屬預期，可忽略）。
- `npm run registry` 後 `lib/registry-code.json` 應包含新 slug。
- 網站上實際打開元件頁：預覽會動、程式碼分頁有內容、複製可用。
