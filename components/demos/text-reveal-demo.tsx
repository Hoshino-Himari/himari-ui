"use client";

import { useRef } from "react";

import { TextReveal } from "@/components/ui/text-reveal";

export default function TextRevealDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative px-6 py-4">
      <p className="mb-2 text-center text-sm text-ink-faint">
        在下方區塊內往下捲動，文字會隨進度逐字顯現
      </p>
      <div
        ref={containerRef}
        className="h-80 overflow-y-auto rounded-xl border border-line"
      >
        <TextReveal containerRef={containerRef}>
          好的 動效 不搶 戲 它 只在 對的 時機 把 重點 送到 眼前
        </TextReveal>
        <div className="flex h-40 items-center justify-center text-sm text-ink-faint">
          — 捲動結束 —
        </div>
      </div>
    </div>
  );
}
