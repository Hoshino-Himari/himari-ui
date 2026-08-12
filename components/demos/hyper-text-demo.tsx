"use client";

import { HyperText } from "@/components/ui/hyper-text";

export default function HyperTextDemo() {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-2 px-6">
      <HyperText className="text-4xl font-bold text-ink">
        HIMARI UI
      </HyperText>
      <p className="text-sm text-ink-faint">滑鼠移入文字可再播一次</p>
    </div>
  );
}
