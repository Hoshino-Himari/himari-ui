"use client";

import { useState } from "react";

import { StaggerText } from "@/components/ui/stagger-text";

export default function StaggerTextDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex h-48 flex-col items-center justify-center gap-6 px-6 text-center">
      <h3 className="text-3xl font-bold text-ink">
        <StaggerText key={round} text="好的介面，是一個字一個字堆出來的" />
      </h3>
      <button
        type="button"
        onClick={() => setRound((r) => r + 1)}
        className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        重播動畫
      </button>
    </div>
  );
}
