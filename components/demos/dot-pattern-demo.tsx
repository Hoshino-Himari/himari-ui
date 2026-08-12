"use client";

import { DotPattern } from "@/components/ui/dot-pattern";

export default function DotPatternDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <DotPattern fade color="#a1a1aa" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          點陣鋪底，邊緣自然淡出
        </p>
      </div>
    </div>
  );
}
