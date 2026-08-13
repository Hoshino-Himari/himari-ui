"use client";

import { PixelGrid } from "@/components/ui/pixel-grid";

export default function PixelGridDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-paper-2">
      <PixelGrid
        color="oklch(80% 0.14 80)"
        maxOpacity={0.5}
        interactionRadius={140}
      />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
        <h3 className="text-2xl font-bold text-ink">像素格網</h3>
        <p className="max-w-xs text-sm text-ink-mute">
          把游標移進來，只有附近的方塊會開始閃爍，像一盞跟著滑鼠走的探照燈。
        </p>
      </div>
    </div>
  );
}
