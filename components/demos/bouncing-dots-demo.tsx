"use client";

import { BouncingDots } from "@/components/ui/bouncing-dots";

export default function BouncingDotsDemo() {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-8 px-6">
      <BouncingDots />
      <div className="flex items-center gap-3 rounded-full border border-ink/10 px-5 py-2.5">
        <BouncingDots count={3} size={6} color="#f59e0b" speed={0.8} />
        <span className="text-sm text-ink-faint">正在回覆…</span>
      </div>
    </div>
  );
}
