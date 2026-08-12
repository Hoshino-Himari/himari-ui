"use client";

import { VHS } from "@/components/ui/vhs";
import { CanvasApiNote } from "./canvas-api-note";

export default function VhsDemo() {
  return (
    <>
      <CanvasApiNote fallback="none" />
      <div className="relative h-72 w-full overflow-hidden rounded-xl">
      <VHS className="h-full w-full" grain={0.15} scanlines={0.2}>
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-900 px-6 text-center">
          <h3 className="text-2xl font-semibold tracking-widest text-amber-200">
            舊錄影帶記憶
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-300">
            磁帶波動、掃描線與色彩溢散，把這段文字帶回 1990 年代的映像管螢幕。
          </p>
          <p className="text-xs tracking-widest text-zinc-500">▶ PLAY&nbsp;&nbsp;SP 0:12:34</p>
        </div>
      </VHS>
      </div>
    </>
  );
}
