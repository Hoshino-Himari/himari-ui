"use client";

import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function LiquidGlassButtonDemo() {
  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-400">
      {/* 背景裝飾圓，襯托玻璃的穿透感 */}
      <div aria-hidden className="absolute -left-6 top-6 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
      <div aria-hidden className="absolute -right-4 bottom-2 h-40 w-40 rounded-full bg-amber-300/30 blur-2xl" />
      <LiquidGlassButton>立即體驗</LiquidGlassButton>
    </div>
  );
}
