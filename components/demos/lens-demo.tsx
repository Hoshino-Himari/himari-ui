"use client";

import { Lens } from "@/components/ui/lens";

export default function LensDemo() {
  return (
    <div className="flex h-72 w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <Lens zoomFactor={1.6} lensSize={140}>
          {/* 純 CSS 漸層圖卡，不用外部圖片 */}
          <div className="relative flex h-44 w-full flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 p-4">
            <div className="absolute -top-8 -right-8 size-32 rounded-full bg-white/20 blur-xl" />
            <div className="absolute top-8 left-6 size-16 rounded-full bg-white/25" />
            <p className="text-lg font-semibold text-white">日落漸層</p>
            <p className="text-xs text-white/80">滑鼠移入即可放大檢視細節</p>
          </div>
        </Lens>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          把游標移到上方圖卡，放大鏡會跟著游標移動。
        </p>
      </div>
    </div>
  );
}
