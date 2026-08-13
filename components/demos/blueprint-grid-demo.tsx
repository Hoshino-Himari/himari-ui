"use client";

import { useState } from "react";
import {
  BlueprintGrid,
  type BlueprintGridVariant,
} from "@/components/ui/blueprint-grid";

const variants: { value: BlueprintGridVariant; label: string }[] = [
  { value: "lines", label: "直線" },
  { value: "dots", label: "點陣" },
  { value: "perspective", label: "透視地板" },
];

export default function BlueprintGridDemo() {
  const [variant, setVariant] = useState<BlueprintGridVariant>("lines");

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-paper-2">
        <BlueprintGrid
          key={variant}
          variant={variant}
          color="oklch(45% 0.03 265)"
          spotlightColor="oklch(80% 0.14 80)"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
          <h3 className="text-2xl font-bold text-ink">藍圖格線</h3>
          <p className="max-w-xs text-sm text-ink-mute">
            把游標移進來，附近的格子會亮成琥珀色；背景還有一道緩慢斜掃的光帶。
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setVariant(item.value)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              variant === item.value
                ? "border-accent text-accent"
                : "border-line text-ink-mute hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
