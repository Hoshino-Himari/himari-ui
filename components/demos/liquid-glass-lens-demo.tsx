"use client";

import { LiquidGlassLens } from "@/components/ui/liquid-glass-lens";

export default function LiquidGlassLensDemo() {
  return (
    <div
      className="relative h-96 w-full overflow-hidden rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: "url(/demos/rainforest.webp)" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 p-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
          把游標移進這塊區域
        </h3>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/90 drop-shadow">
          圓形鏡片會跟著游標跑，把底下的畫面折射扭曲並帶出彩色邊緣，
          細節越多的背景越看得出玻璃感。鏡片不會擋住點擊。
        </p>
        <p className="mt-2 text-xs text-white/70 drop-shadow">
          這裡把 strength 調成 30（預設 80）讓景物還看得清楚；數字越大扭曲越誇張、越接近液態玻璃。
        </p>
      </div>

      <LiquidGlassLens size={170} strength={30} />
    </div>
  );
}
