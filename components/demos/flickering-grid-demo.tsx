"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function FlickeringGridDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={4}
        gridGap={6}
        color="#60a5fa"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-3xl font-bold text-zinc-100">閃爍網格</p>
      </div>
    </div>
  );
}
