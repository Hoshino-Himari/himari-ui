"use client";

import { ParticleReveal } from "@/components/ui/particle-reveal";
import { CanvasApiNote } from "./canvas-api-note";

export default function ParticleRevealDemo() {
  return (
    <>
      <CanvasApiNote fallback="none" />
      <div className="relative h-72 w-full overflow-hidden rounded-xl">
      <ParticleReveal className="h-full w-full" radius={240} background="#09090b">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-950 px-8 text-center">
          <h3 className="text-2xl font-semibold tracking-wide text-zinc-100">
            聚沙成塔，聚塵成字
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            內容化成飄散的粒子塵埃，游標靠近的地方才會凝聚成清晰的畫面。
          </p>
        </div>
      </ParticleReveal>
      </div>
    </>
  );
}
