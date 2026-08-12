"use client";

import { Meteors } from "@/components/ui/meteors";

export default function MeteorsDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <Meteors number={24} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          流星劃過的時候，記得許願
        </p>
      </div>
    </div>
  );
}
