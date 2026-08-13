"use client";

import { LightRays } from "@/components/ui/light-rays";

export default function LightRaysDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <LightRays color="#38bdf8" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">光芒自天際緩緩灑落</p>
      </div>
    </div>
  );
}
