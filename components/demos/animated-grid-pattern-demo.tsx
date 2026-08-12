"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function AnimatedGridPatternDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <AnimatedGridPattern numSquares={28} maxOpacity={0.25} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          方格在網格上明滅呼吸
        </p>
      </div>
    </div>
  );
}
