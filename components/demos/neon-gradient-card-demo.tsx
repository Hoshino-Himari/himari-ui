"use client";

import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function NeonGradientCardDemo() {
  return (
    <div className="flex h-72 items-center justify-center px-6">
      <NeonGradientCard className="w-full max-w-sm">
        <div className="py-4 text-center">
          <p className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
            霓虹漸層卡片
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            雙色漸層邊框緩緩流動，像霓虹燈管一樣發光。
          </p>
        </div>
      </NeonGradientCard>
    </div>
  );
}
