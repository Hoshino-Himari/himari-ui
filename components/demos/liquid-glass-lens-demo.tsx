"use client";

import { LiquidGlassLens } from "@/components/ui/liquid-glass-lens";

export default function LiquidGlassLensDemo() {
  return (
    <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-emerald-400 to-amber-300 p-8">
      <h3 className="text-2xl font-bold text-white drop-shadow">
        把游標移進這塊區域
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/90">
        一顆圓形玻璃鏡片會跟著游標跑，把下方的文字與色塊即時折射放大。
        鏡片不會擋住點擊，可以直接疊在既有內容上。
      </p>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {["折", "射", "色", "散", "液", "態", "玻", "璃"].map((word) => (
          <div
            key={word}
            className="flex h-14 items-center justify-center rounded-xl bg-white/25 text-xl font-bold text-white"
          >
            {word}
          </div>
        ))}
      </div>

      <LiquidGlassLens size={150} />
    </div>
  );
}
