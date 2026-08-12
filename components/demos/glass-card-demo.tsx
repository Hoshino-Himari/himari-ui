"use client";

import { GlassCard } from "@/components/ui/glass-card";

export default function GlassCardDemo() {
  return (
    <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-6">
      {/* 背景裝飾圓，讓玻璃的模糊感更明顯 */}
      <div
        aria-hidden
        className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-white/30 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -right-8 -bottom-12 h-56 w-56 rounded-full bg-sky-300/40 blur-2xl"
      />
      <GlassCard className="max-w-xs">
        <h3 className="text-lg font-semibold text-white">液態玻璃卡片</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          backdrop-blur 玻璃擬態，帶邊緣高光與微噪點，
          放在漸層或照片背景上最好看。
        </p>
      </GlassCard>
    </div>
  );
}
