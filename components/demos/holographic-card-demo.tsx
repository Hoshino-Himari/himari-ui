"use client";

import { useState } from "react";
import {
  HolographicCard,
  type HolographicVariant,
} from "@/components/ui/holographic-card";

const variants: { value: HolographicVariant; label: string }[] = [
  { value: "rainbow", label: "彩虹" },
  { value: "aurora", label: "極光" },
  { value: "galaxy", label: "星雲" },
  { value: "gold", label: "鎏金" },
];

export default function HolographicCardDemo() {
  const [variant, setVariant] = useState<HolographicVariant>("rainbow");

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      <HolographicCard variant={variant} className="h-64 w-48 p-5">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-white/70">
            HIMARI UI
          </span>
          <div>
            <h3 className="text-xl font-bold">全息卡片</h3>
            <p className="mt-1 text-xs leading-relaxed text-white/75">
              把游標移上來，箔光會跟著傾斜角度流動。
            </p>
          </div>
        </div>
      </HolographicCard>

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
