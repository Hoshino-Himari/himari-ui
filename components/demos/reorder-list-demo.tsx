"use client";

import { type CSSProperties, useState } from "react";
import { ReorderItem, ReorderList } from "@/components/ui/reorder-list";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--card": "oklch(18% 0.02 265)",
  "--card-foreground": "oklch(93% 0.008 80)",
  "--border": "oklch(27% 0.022 265)",
} as CSSProperties;

const initial = ["首頁英雄區", "功能介紹", "使用者評價", "定價方案", "常見問題"];

export default function ReorderListDemo() {
  const [items, setItems] = useState(initial);

  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 py-6">
      <div className="w-full max-w-sm" style={theme}>
        <ReorderList values={items} onReorder={setItems}>
          {items.map((item, index) => (
            <ReorderItem key={item} value={item}>
              <span className="text-sm tabular-nums opacity-50">
                {index + 1}
              </span>
              <span className="text-sm">{item}</span>
              <span aria-hidden className="ml-auto opacity-40">
                ⠿
              </span>
            </ReorderItem>
          ))}
        </ReorderList>
      </div>
      <p className="text-sm text-ink-mute">抓住任一列上下拖曳，就能重新排序頁面區塊</p>
    </div>
  );
}
