"use client";

import type { CSSProperties } from "react";
import { CoverFlow } from "@/components/ui/cover-flow";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--card": "oklch(18% 0.02 265)",
  "--border": "oklch(27% 0.022 265)",
  "--foreground": "oklch(93% 0.008 80)",
  "--muted-foreground": "oklch(71% 0.014 265)",
  "--accent": "oklch(24% 0.02 265)",
} as CSSProperties;

const covers = [
  { title: "夜色", artist: "極光樂團", gradient: "linear-gradient(160deg,#312e81,#0b1020)" },
  { title: "金黃時刻", artist: "馬洛", gradient: "linear-gradient(160deg,#f59e0b,#7c2d12)" },
  { title: "深空", artist: "維斯珀", gradient: "linear-gradient(160deg,#0e7490,#052e2b)" },
  { title: "薄霧", artist: "青苔", gradient: "linear-gradient(160deg,#10b981,#064e3b)" },
  { title: "霓虹街", artist: "夜行", gradient: "linear-gradient(160deg,#ec4899,#4c1d95)" },
];

export default function CoverFlowDemo() {
  return (
    <div className="flex justify-center py-4">
      <CoverFlow defaultIndex={2} itemWidth={180} itemHeight={220} style={theme}>
        {covers.map((cover) => (
          <div
            key={cover.title}
            className="flex size-full flex-col justify-end p-4 text-white"
            style={{ background: cover.gradient }}
          >
            <div className="text-base font-bold">{cover.title}</div>
            <div className="text-xs text-white/70">{cover.artist}</div>
          </div>
        ))}
      </CoverFlow>
    </div>
  );
}
