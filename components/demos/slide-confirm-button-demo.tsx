"use client";

import { useState } from "react";
import { SlideConfirmButton } from "@/components/ui/slide-confirm-button";

export default function SlideConfirmButtonDemo() {
  // 用 key 重掛元件，確認完成後可以按「重置」再玩一次
  const [round, setRound] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md flex-col items-center justify-center gap-6 rounded-2xl bg-zinc-100 p-8">
        <SlideConfirmButton
          key={`pay-${round}`}
          label="滑動以確認付款"
          loadingLabel="處理中…"
          confirmedLabel="付款完成"
          onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1200))}
        />
        <SlideConfirmButton
          key={`delete-${round}`}
          variant="destructive"
          size="sm"
          label="滑動以刪除"
          confirmedLabel="已刪除"
        />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-ink-mute">把滑塊拖到最右端才會觸發</p>
        <button
          type="button"
          onClick={() => setRound((r) => r + 1)}
          className="rounded-md border border-line px-2 py-0.5 text-xs text-ink-mute transition-colors hover:text-ink"
        >
          重置
        </button>
      </div>
    </div>
  );
}
