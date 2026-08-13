"use client";

import { type CSSProperties, useRef } from "react";
import { ScrollTimeline } from "@/components/ui/scroll-timeline";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色琥珀主題
const theme = {
  "--primary": "oklch(80% 0.14 80)",
  "--background": "oklch(14.5% 0.02 265)",
  "--border": "oklch(27% 0.022 265)",
  "--muted-foreground": "oklch(71% 0.014 265)",
} as CSSProperties;

const entries = [
  {
    date: "第一步",
    title: "挑一個元件",
    content: (
      <p className="text-sm leading-relaxed text-ink-mute">
        從左側目錄找到想要的元件，在預覽區確認動態與互動符合需求。
      </p>
    ),
  },
  {
    date: "第二步",
    title: "複製程式碼",
    content: (
      <p className="text-sm leading-relaxed text-ink-mute">
        切到「程式碼」分頁複製整個檔案，存成 components/ui/&lt;slug&gt;.tsx。
      </p>
    ),
  },
  {
    date: "第三步",
    title: "安裝相依套件",
    content: (
      <p className="text-sm leading-relaxed text-ink-mute">
        照著安裝區塊列出的套件裝好，多數元件只需要 framer-motion。
      </p>
    ),
  },
  {
    date: "第四步",
    title: "直接 import 使用",
    content: (
      <p className="text-sm leading-relaxed text-ink-mute">
        元件不依賴本站的設計 tokens，貼進任何 Tailwind 專案都能跑。
      </p>
    ),
  },
];

export default function ScrollTimelineDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm text-ink-mute">在下方框內往下捲動，左側軌道會跟著長出來：</p>
      <div
        ref={scrollRef}
        className="h-96 overflow-y-auto rounded-2xl border border-line px-4"
        style={theme}
      >
        <ScrollTimeline data={entries} container={scrollRef} />
      </div>
    </div>
  );
}
