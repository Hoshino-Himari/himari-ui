"use client";

import { type CSSProperties, useState } from "react";
import { SwipeDeck } from "@/components/ui/swipe-deck";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色琥珀主題
const theme = {
  "--card": "oklch(18% 0.02 265)",
  "--border": "oklch(27% 0.022 265)",
  "--accent": "oklch(24% 0.02 265)",
  "--primary": "oklch(80% 0.14 80)",
  "--destructive": "oklch(60% 0.2 25)",
  "--muted-foreground": "oklch(71% 0.014 265)",
} as CSSProperties;

const cards = [
  { title: "微光按鈕", desc: "光帶沿邊緣繞行的 CTA", gradient: "linear-gradient(160deg,#f59e0b,#7c2d12)" },
  { title: "極光文字", desc: "漸層在文字上緩緩流動", gradient: "linear-gradient(160deg,#8b5cf6,#4c1d95)" },
  { title: "液態玻璃", desc: "會折射背景的玻璃面板", gradient: "linear-gradient(160deg,#38bdf8,#1e3a8a)" },
  { title: "動態島", desc: "會變形展開的浮層", gradient: "linear-gradient(160deg,#10b981,#065f46)" },
];

export default function SwipeDeckDemo() {
  const [log, setLog] = useState("往左右拖曳卡片，或按下方按鈕");

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <SwipeDeck
        loop
        actions={{ left: "略過", right: "喜歡" }}
        onSwipe={(index, dir) =>
          setLog(
            `${dir === "right" ? "喜歡" : "略過"}了「${cards[index].title}」`,
          )
        }
        style={theme}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex size-full flex-col justify-end rounded-2xl p-6 text-white"
            style={{ background: card.gradient }}
          >
            <div className="text-xl font-bold">{card.title}</div>
            <p className="mt-1 text-sm text-white/80">{card.desc}</p>
          </div>
        ))}
      </SwipeDeck>
      <p className="text-sm text-ink-mute">{log}</p>
    </div>
  );
}
