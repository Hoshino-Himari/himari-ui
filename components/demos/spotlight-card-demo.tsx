"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function SpotlightCardDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <SpotlightCard className="max-w-sm">
        <h3 className="text-lg font-semibold text-zinc-50">聚光燈卡片</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          把滑鼠移到卡片上，一圈柔和的光暈會跟著游標移動，
          很適合用在功能介紹或定價方案的卡片。
        </p>
        <p className="mt-4 text-xs text-zinc-500">滑鼠移入試試看</p>
      </SpotlightCard>
    </div>
  );
}
