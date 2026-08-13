"use client";

import { type CSSProperties, useState } from "react";
import { GooeyStack } from "@/components/ui/gooey-stack";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--card": "oklch(20% 0.02 265)",
  "--border": "oklch(30% 0.022 265)",
} as CSSProperties;

const cards = [
  { title: "今日進度", body: "已完成 3 項工作，還有 2 項待處理。" },
  { title: "本週目標", body: "把元件庫補到 100 個並全部上線。" },
  { title: "收件匣", body: "1,234 封未讀，其中 12 封被標記為重要。" },
];

export default function GooeyStackDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-5 px-6 py-6">
      <div className="w-full max-w-sm" style={theme}>
        <GooeyStack collapsed={collapsed}>
          {cards.map((card) => (
            <div key={card.title} className="p-5">
              <h3 className="text-base font-semibold text-ink">{card.title}</h3>
              <p className="mt-1 text-sm text-ink-mute">{card.body}</p>
            </div>
          ))}
        </GooeyStack>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        className="rounded-full border border-line bg-paper-2 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {collapsed ? "展開卡片" : "收合成一團"}
      </button>
    </div>
  );
}
