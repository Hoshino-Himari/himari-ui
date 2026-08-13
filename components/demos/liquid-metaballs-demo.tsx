"use client";

import { LiquidMetaballs } from "@/components/ui/liquid-metaballs";

export default function LiquidMetaballsDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <LiquidMetaballs />
      <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          液態色球緩緩漂移融合
        </p>
      </div>
    </div>
  );
}
