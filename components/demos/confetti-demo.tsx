"use client";

import { useRef } from "react";
import { Confetti, type ConfettiHandle } from "@/components/ui/confetti";

export default function ConfettiDemo() {
  const confettiRef = useRef<ConfettiHandle>(null);

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <Confetti ref={confettiRef} className="z-10" />
      <div className="flex h-full items-center justify-center">
        <button
          type="button"
          onClick={() => confettiRef.current?.fire({ x: 0.5, y: 0.55 })}
          className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-100 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.97] dark:bg-zinc-100 dark:text-zinc-900"
        >
          慶祝一下
        </button>
      </div>
    </div>
  );
}
