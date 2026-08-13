"use client";

import { useState } from "react";
import { Gravity, MatterBody } from "@/components/ui/gravity";

const chips = [
  { label: "按鈕", color: "#f59e0b", x: "20%", y: "5%" },
  { label: "卡片", color: "#8b5cf6", x: "35%", y: "12%" },
  { label: "文字特效", color: "#10b981", x: "52%", y: "4%" },
  { label: "背景", color: "#38bdf8", x: "68%", y: "14%" },
  { label: "載入動畫", color: "#ec4899", x: "45%", y: "22%" },
  { label: "浮層", color: "#f97316", x: "78%", y: "6%" },
  { label: "版面佈局", color: "#22d3ee", x: "28%", y: "26%" },
];

export default function GravityDemo() {
  const [seed, setSeed] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-6">
      <Gravity
        key={seed}
        className="h-80 w-full rounded-2xl border border-line bg-paper-2"
      >
        {chips.map((chip) => (
          <MatterBody key={chip.label} x={chip.x} y={chip.y} angle={0}>
            <span
              className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-950"
              style={{ background: chip.color }}
            >
              {chip.label}
            </span>
          </MatterBody>
        ))}
      </Gravity>
      <div className="flex items-center gap-3">
        <p className="text-sm text-ink-mute">標籤會掉下來堆疊，也可以直接抓起來甩</p>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="rounded-full border border-line bg-paper-2 px-4 py-1.5 text-xs text-ink transition-colors duration-150 hover:bg-paper-3"
        >
          重新掉一次
        </button>
      </div>
    </div>
  );
}
