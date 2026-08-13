"use client";

import { SplitFlapDisplay } from "@/components/ui/split-flap-display";

export default function SplitFlapDisplayDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <SplitFlapDisplay value="HIMARI UI" size="md" />
      <SplitFlapDisplay
        value="BOARDING 08:45"
        size="sm"
        align="center"
        stagger={0.08}
      />
      <p className="text-xs text-ink-faint">機場看板風格・捲動進入視窗時自動翻牌</p>
    </div>
  );
}
