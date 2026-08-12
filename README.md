# Himari UI

分門別類、複製即用的繁體中文 React 動效元件庫。

每個元件都是**完整自足的單一檔案**（React + Tailwind CSS）：從網站上複製程式碼，存進你的專案就能跑。丟給 Codex、Claude 等 AI 工具，它們也能直接看懂、直接組進頁面。

## 分類

按鈕 · 卡片 · 文字特效 · 背景特效 · 載入動畫 · 輸入與表單 · 導覽 · 互動特效

改寫自開源專案（MagicUI、Aceternity UI、React Bits⋯）的元件都在頁面上標註出處。

## 本機開發

```bash
npm install
npm run dev
```

打開 http://localhost:3000。

`npm run dev` / `npm run build` 會先自動執行 `scripts/build-registry.mjs`，把 `components/ui/*.tsx` 的原始碼打包進 `lib/registry-code.json` —— 網站「程式碼」分頁顯示的內容就是實際在跑的元件原始碼。

## 新增元件

照著 [COMPONENT_SPEC.md](./COMPONENT_SPEC.md) 做：一個元件＝三個檔案（本體、demo、registry 條目），規範裡有完整範例。這份規範也是寫給 AI 工具看的——把它連同需求一起貼給 Codex 就能新增合格元件。

## 技術棧

Next.js 16（App Router）· React 19 · Tailwind CSS v4 · TypeScript · motion · cobe · shiki
