"use client";

import { MouseSpotlight } from "@/components/ui/mouse-spotlight";

export default function MouseSpotlightDemo() {
  return (
    <MouseSpotlight className="h-72 w-full rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-medium text-zinc-100">
          移動滑鼠，光暈會跟著你
        </p>
      </div>
    </MouseSpotlight>
  );
}
