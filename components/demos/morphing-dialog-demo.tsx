"use client";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";

export default function MorphingDialogDemo() {
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-4 px-6">
      <MorphingDialog>
        <MorphingDialogTrigger className="w-64 rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50">
          <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-amber-300 to-orange-500" />
          <h3 className="text-sm font-semibold">深夜工作室</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            點擊卡片，看它放大成對話框
          </p>
        </MorphingDialogTrigger>
        <MorphingDialogContent className="w-full max-w-md rounded-2xl p-6">
          <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-amber-300 to-orange-500" />
          <h3 className="text-lg font-semibold">深夜工作室</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            卡片與對話框共用同一個
            layoutId，開啟時卡片會以彈簧動畫「長成」置中的對話框，關閉時再縮回原位。
            按 Esc、點背景或右上角的關閉鈕都能關閉。
          </p>
          <MorphingDialogClose />
        </MorphingDialogContent>
      </MorphingDialog>
      <p className="text-xs text-ink-faint">也支援鍵盤：聚焦後按 Enter 開啟。</p>
    </div>
  );
}
