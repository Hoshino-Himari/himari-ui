"use client";

import { BorderBeam } from "@/components/ui/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="flex h-72 w-full items-center justify-center">
      <div className="relative w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          光束邊框
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          一段亮光沿著卡片邊框緩緩繞行，適合強調重點卡片或方案。
        </p>
        <BorderBeam duration={6} />
      </div>
    </div>
  );
}
