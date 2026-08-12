"use client";

import { Glitch } from "@/components/ui/glitch";
import { CanvasApiNote } from "./canvas-api-note";

export default function GlitchDemo() {
  return (
    <>
      <CanvasApiNote fallback="none" />
      <div className="relative h-72 w-full overflow-hidden rounded-xl">
      <Glitch className="h-full w-full" interval={2.5} duration={0.35}>
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-950 px-6 text-center">
          <h3 className="font-mono text-2xl font-semibold tracking-wider text-emerald-400">
            訊號異常
          </h3>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-zinc-400">
            畫面每隔幾秒撕裂一次：色版分離、方塊損毀、掃描雜訊，然後恢復如常。
          </p>
          <p className="font-mono text-xs text-zinc-600">SYSTEM // 等待下一次爆發</p>
        </div>
      </Glitch>
      </div>
    </>
  );
}
