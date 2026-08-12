"use client";

import { RetroGrid } from "@/components/ui/retro-grid";

export default function RetroGridDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
      <RetroGrid />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="bg-gradient-to-b from-amber-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent">
          復古網格
        </p>
      </div>
    </div>
  );
}
