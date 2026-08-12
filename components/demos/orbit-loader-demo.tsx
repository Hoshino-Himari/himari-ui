"use client";

import { OrbitLoader } from "@/components/ui/orbit-loader";

export default function OrbitLoaderDemo() {
  return (
    <div className="flex h-48 items-center justify-center gap-14 px-6">
      <div className="flex flex-col items-center gap-4">
        <OrbitLoader />
        <span className="text-xs text-ink-faint">預設</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <OrbitLoader radius={22} count={6} dotSize={6} color="#f59e0b" speed={2} />
        <span className="text-xs text-ink-faint">大半徑．六點</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <OrbitLoader radius={12} count={3} dotSize={8} color="#22d3ee" speed={0.9} />
        <span className="text-xs text-ink-faint">小半徑．快轉</span>
      </div>
    </div>
  );
}
