"use client";

import { WarpBackground } from "@/components/ui/warp-background";

export default function WarpBackgroundDemo() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden px-4">
      <WarpBackground className="w-full max-w-lg rounded-xl">
        <div className="mx-auto max-w-xs rounded-lg border border-black/10 bg-white p-5 text-center shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <p className="text-lg font-bold text-ink">空間扭曲邊框</p>
          <p className="mt-1 text-sm text-ink-faint">
            光束沿著四面透視網格飛向遠方
          </p>
        </div>
      </WarpBackground>
    </div>
  );
}
