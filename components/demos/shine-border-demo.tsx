"use client";

import { ShineBorder } from "@/components/ui/shine-border";

export default function ShineBorderDemo() {
  return (
    <div className="flex h-72 w-full items-center justify-center">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-950">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          流光邊框
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          一圈柔和的漸層光沿著卡片邊框緩緩流動，適合突顯重點方案或公告卡片。
        </p>
      </div>
    </div>
  );
}
