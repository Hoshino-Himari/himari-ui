"use client";

import { WaveBackground } from "@/components/ui/wave-background";

export default function WaveBackgroundDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl bg-sky-950">
      <WaveBackground color="#38bdf8" height={110} />
      <div className="relative z-10 flex h-full items-center justify-center pb-16">
        <p className="text-lg font-medium text-sky-100">
          海面在夜色中層層起伏
        </p>
      </div>
    </div>
  );
}
