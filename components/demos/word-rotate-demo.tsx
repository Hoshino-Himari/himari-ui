"use client";

import { WordRotate } from "@/components/ui/word-rotate";

export default function WordRotateDemo() {
  return (
    <div className="flex h-48 items-center justify-center px-6">
      <div className="flex items-baseline gap-3 text-3xl font-bold text-ink">
        <span>打造</span>
        <WordRotate
          words={["美麗", "現代", "流暢", "好用"]}
          className="text-3xl font-bold text-amber-600"
        />
        <span>的介面</span>
      </div>
    </div>
  );
}
