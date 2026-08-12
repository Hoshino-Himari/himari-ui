"use client";

import { TiltCard } from "@/components/ui/tilt-card";

export default function TiltCardDemo() {
  return (
    <div className="flex items-center justify-center py-10">
      <TiltCard className="w-72">
        <div className="text-3xl">🌗</div>
        <h3 className="mt-3 text-lg font-semibold text-zinc-50">
          3D 傾斜卡片
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          卡片會依游標位置立體傾斜，內容帶一點景深；
          游標離開後用 spring 彈回原位。
        </p>
      </TiltCard>
    </div>
  );
}
