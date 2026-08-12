"use client";

import { ParticlesBackground } from "@/components/ui/particles-background";

export default function ParticlesBackgroundDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <ParticlesBackground quantity={80} color="#e4e4e7" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          群星在深夜裡緩緩漂浮
        </p>
      </div>
    </div>
  );
}
