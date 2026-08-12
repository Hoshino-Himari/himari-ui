"use client";

import { useState } from "react";
import { AnimatedSlider } from "@/components/ui/animated-slider";

export default function AnimatedSliderDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <div className="mx-auto w-full max-w-sm py-6">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>音量</span>
        <span className="tabular-nums">{volume}%</span>
      </div>
      <AnimatedSlider
        value={volume}
        onValueChange={setVolume}
        formatValue={(v) => `${v}%`}
        aria-label="音量"
      />
    </div>
  );
}
