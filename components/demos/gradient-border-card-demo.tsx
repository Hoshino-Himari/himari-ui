"use client";

import { GradientBorderCard } from "@/components/ui/gradient-border-card";

export default function GradientBorderCardDemo() {
  return (
    <div className="flex items-center justify-center py-10">
      <GradientBorderCard className="max-w-sm">
        <h3 className="text-lg font-semibold text-zinc-50">漸層邊框卡片</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          卡片底層是一圈持續旋轉的 conic-gradient，
          內層蓋住中間，只露出流動的漸層邊框。
        </p>
      </GradientBorderCard>
    </div>
  );
}
