"use client";

import type { CSSProperties } from "react";
import { Accordion } from "@/components/ui/accordion";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--border": "oklch(27% 0.022 265)",
  "--foreground": "oklch(93% 0.008 80)",
  "--muted-foreground": "oklch(71% 0.014 265)",
  "--accent": "oklch(24% 0.02 265)",
  "--ring": "oklch(80% 0.14 80)",
} as CSSProperties;

const items = [
  {
    value: "copy",
    title: "元件要怎麼拿來用？",
    content:
      "每個元件都是一個自足的檔案：從「程式碼」分頁複製整份內容，存成 components/ui/<slug>.tsx 就能直接 import，不需要安裝這個站台。",
  },
  {
    value: "deps",
    title: "需要裝哪些套件？",
    content:
      "元件頁的安裝區塊會列出該元件真正用到的 npm 套件，多數只需要 framer-motion，有些純 CSS 元件則什麼都不用裝。",
  },
  {
    value: "license",
    title: "移植自其他開源專案的元件可以用嗎？",
    content:
      "可以。移植的元件在頁面上會標示出處與授權（例如 MIT），檔案開頭也保留原作者的授權聲明，照著授權條款使用即可。",
  },
  {
    value: "wip",
    title: "這一項示範停用狀態",
    content: "停用的項目不能展開，也不會吃到 hover 與鍵盤焦點。",
    disabled: true,
  },
];

export default function AccordionDemo() {
  return (
    <div className="flex w-full justify-center px-6 py-6">
      <div className="w-full max-w-lg" style={theme}>
        <Accordion items={items} defaultValue="copy" animation="spring" />
      </div>
    </div>
  );
}
