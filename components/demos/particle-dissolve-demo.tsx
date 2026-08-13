"use client";

import { useState } from "react";

import { ParticleDissolve } from "@/components/ui/particle-dissolve";

export default function ParticleDissolveDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <ParticleDissolve
        key={round}
        text="曦光"
        trigger="mount"
        width={480}
        height={200}
        color="#38bdf8"
        font="bold 120px ui-sans-serif, system-ui, sans-serif"
      />
      <button
        type="button"
        onClick={() => setRound((n) => n + 1)}
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-zinc-100 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:focus-visible:outline-zinc-500"
      >
        重新聚合
      </button>
    </div>
  );
}
