"use client";

import { WarpStarfield } from "@/components/ui/warp-starfield";

export default function WarpStarfieldDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <WarpStarfield color="#e2e8f0" />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">穿越星海的曲速航行</p>
      </div>
    </div>
  );
}
