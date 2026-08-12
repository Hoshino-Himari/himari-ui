"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs";

const panelClass =
  "rounded-xl border border-zinc-200 bg-white p-5 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400";

export default function AnimatedTabsDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <AnimatedTabs
        className="w-full max-w-sm"
        tabs={[
          {
            value: "overview",
            label: "總覽",
            content: (
              <div className={panelClass}>
                指示器用 motion 的 layoutId 在選項之間滑動，
                切換時像果凍一樣順。
              </div>
            ),
          },
          {
            value: "usage",
            label: "用法",
            content: (
              <div className={panelClass}>
                聚焦在頁籤上之後，用鍵盤 ← → 方向鍵也能切換，
                Home / End 直接跳到第一個或最後一個。
              </div>
            ),
          },
          {
            value: "a11y",
            label: "無障礙",
            content: (
              <div className={panelClass}>
                有完整的 role=&quot;tablist&quot; / tab / tabpanel 結構與
                aria-selected 屬性，螢幕閱讀器讀得懂。
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
