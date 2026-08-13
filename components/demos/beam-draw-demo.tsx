"use client";

import { type CSSProperties, useRef } from "react";
import { BeamDraw } from "@/components/ui/beam-draw";

// 光束顏色吃 --primary（帶預設值），這裡換成本站的琥珀色
const theme = { "--primary": "oklch(80% 0.14 80)" } as CSSProperties;

export default function BeamDrawDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm text-ink-mute">在下方框內往下捲動，光束會逐漸畫出來：</p>
      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto rounded-2xl border border-line"
        style={theme}
      >
        <div className="flex h-64 items-end justify-center pb-4 text-sm text-ink-faint">
          往下捲 ↓
        </div>
        <BeamDraw container={scrollRef} strokeWidth={3} />
        <div className="flex h-64 items-start justify-center pt-4 text-sm text-ink-faint">
          再往上捲可以倒著收回去 ↑
        </div>
      </div>
    </div>
  );
}
