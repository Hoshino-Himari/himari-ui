"use client";

import { GridBeams } from "@/components/ui/grid-beams";

export default function GridBeamsDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <GridBeams />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          光束沿著網格線奔馳
        </p>
      </div>
    </div>
  );
}
