"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const buttonClass =
  "rounded-full border border-line bg-paper-2 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export default function AnimatedTooltipDemo() {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-8 px-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <AnimatedTooltip content="複製一份到剪貼簿">
          <button type="button" className={buttonClass}>
            複製
          </button>
        </AnimatedTooltip>
        <AnimatedTooltip content="把這個項目分享給朋友，滑鼠左右移動看看傾斜效果">
          <button type="button" className={buttonClass}>
            分享
          </button>
        </AnimatedTooltip>
        <AnimatedTooltip content="刪除後無法復原" side="bottom">
          <button type="button" className={buttonClass}>
            刪除
          </button>
        </AnimatedTooltip>
      </div>
      <p className="text-xs text-ink-faint">
        滑過或以鍵盤聚焦按鈕即可顯示提示；「刪除」示範 side=&quot;bottom&quot;。
      </p>
    </div>
  );
}
