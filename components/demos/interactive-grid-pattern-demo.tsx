"use client";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export default function InteractiveGridPatternDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
      <InteractiveGridPattern
        className="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
        width={32}
        height={32}
        squares={[40, 16]}
      />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
        <p className="text-3xl font-bold text-ink">互動網格</p>
      </div>
    </div>
  );
}
