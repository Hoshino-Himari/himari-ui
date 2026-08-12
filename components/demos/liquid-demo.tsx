"use client";

import { Liquid } from "@/components/ui/liquid";
import { CanvasApiNote } from "./canvas-api-note";

export default function LiquidDemo() {
  return (
    <>
      <CanvasApiNote fallback="partial" />
      <div className="relative h-72 w-full overflow-hidden rounded-xl">
      <Liquid className="h-full w-full">
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-950 px-6 text-center">
          <h3 className="text-2xl font-semibold text-zinc-100">流動的介面</h3>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            游標拂過的地方會掀起一道液體波紋，而底下的文字依然清晰可讀。
          </p>
          <p className="text-xs text-zinc-500">在區塊內移動游標試試</p>
        </div>
      </Liquid>
      </div>
    </>
  );
}
