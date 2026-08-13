"use client";

import { useRef } from "react";
import { FluidCursor } from "@/components/ui/fluid-cursor";

export default function FluidCursorDemo() {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-3 px-6 py-6">
      <div
        ref={boxRef}
        className="relative flex h-72 w-full max-w-xl flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-zinc-900"
      >
        <h3 className="text-2xl font-bold text-zinc-100">把游標移進這一塊</h3>
        <p className="max-w-xs text-center text-sm text-zinc-400">
          圓點會跟著游標跑，後面拖著一團慢半拍的光暈；滑到按鈕上還會放大。
        </p>
        <button
          type="button"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-200"
        >
          試著滑過這顆按鈕
        </button>
        <FluidCursor containerRef={boxRef} size={20} />
      </div>
      <p className="text-sm text-ink-mute">
        只在精準指標（滑鼠）裝置上啟用，並尊重系統的減少動態設定
      </p>
    </div>
  );
}
