"use client";

import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";

export default function LiquidGlassCardDemo() {
  return (
    <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 p-6">
      {/* 高對比的文字底紋，折射時邊緣的彎曲與色散才看得出來 */}
      <div
        aria-hidden
        className="absolute inset-0 flex flex-col justify-center gap-2 text-center text-4xl font-black tracking-widest text-white/70"
      >
        <span>HIMARI UI HIMARI UI</span>
        <span>玻璃 折射 色散 玻璃</span>
        <span>HIMARI UI HIMARI UI</span>
      </div>

      <LiquidGlassCard className="w-64 p-6">
        <h3 className="text-lg font-semibold text-white drop-shadow">
          液態玻璃卡片
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/90 drop-shadow">
          邊緣把背後的畫面折彎，游標移動時還有一道鏡面高光。
        </p>
      </LiquidGlassCard>
    </div>
  );
}
