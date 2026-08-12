"use client";

import { FlipCard } from "@/components/ui/flip-card";

export default function FlipCardDemo() {
  return (
    <div className="flex items-center justify-center py-10">
      <FlipCard
        front={
          <div className="flex h-full flex-col items-center justify-center gap-2 border border-zinc-800 bg-zinc-900 p-6 text-center">
            <span className="text-3xl">🎴</span>
            <h3 className="text-lg font-semibold text-zinc-50">翻轉卡片</h3>
            <p className="text-sm text-zinc-400">滑鼠移上來看背面</p>
          </div>
        }
        back={
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-400 to-pink-500 p-6 text-center">
            <span className="text-3xl">✨</span>
            <h3 className="text-lg font-semibold text-white">背面內容</h3>
            <p className="text-sm text-white/85">
              front / back 都接 ReactNode，想放什麼都可以
            </p>
          </div>
        }
      />
    </div>
  );
}
