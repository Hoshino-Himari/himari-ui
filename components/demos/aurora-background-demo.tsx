"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-zinc-950">
      <AuroraBackground />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          極光在夜空中靜靜流動
        </p>
      </div>
    </div>
  );
}
