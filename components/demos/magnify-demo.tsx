"use client";

import { Magnify } from "@/components/ui/magnify";
import { CanvasApiNote } from "./canvas-api-note";

export default function MagnifyDemo() {
  return (
    <>
      <CanvasApiNote fallback="partial" />
      <div className="relative h-72 overflow-hidden rounded-xl">
      <Magnify className="h-full w-full" size={110} zoom={2}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-950 px-8 text-center">
          <h3 className="text-2xl font-semibold tracking-wide text-zinc-100">
            細節藏在放大之後
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            移動游標檢視放大鏡，點一下會激起漣漪；在支援 HTML-in-canvas
            的瀏覽器中，鏡片內是真正被放大的頁面內容。
          </p>
        </div>
      </Magnify>
      </div>
    </>
  );
}
