"use client";

import { TopographicDrift } from "@/components/ui/topographic-drift";

export default function TopographicDriftDemo() {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-paper-2">
      <TopographicDrift color="oklch(80% 0.14 80)" lineCount={11} speed={1.2} />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
        <h3 className="text-2xl font-bold text-ink">等高線漂移</h3>
        <p className="max-w-xs text-sm text-ink-mute">
          整片高度場緩緩流動，等高線跟著長出來又消失，適合當安靜的內容背景。
        </p>
      </div>
    </div>
  );
}
