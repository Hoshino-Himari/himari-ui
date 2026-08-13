"use client";

import { MaskButton } from "@/components/ui/mask-button";

export default function MaskButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md flex-wrap items-center justify-center gap-6 rounded-2xl bg-zinc-100 p-8">
        <MaskButton mask="nature">自然筆刷</MaskButton>
        <MaskButton mask="urban" variant="secondary">
          城市剪影
        </MaskButton>
        <MaskButton mask="forest">森林墨跡</MaskButton>
      </div>
      <p className="text-sm text-ink-mute">
        滑過按鈕，實色表面會以逐格遮罩動畫刷進來
      </p>
    </div>
  );
}
