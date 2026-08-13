"use client";

import { HoldConfirmButton } from "@/components/ui/hold-confirm-button";

export default function HoldConfirmButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md flex-wrap items-center justify-center gap-6 rounded-2xl bg-zinc-100 p-8">
        <HoldConfirmButton
          variant="destructive"
          holdingLabel="刪除中…"
          confirmedLabel="已刪除"
        >
          長按刪除
        </HoldConfirmButton>
        <HoldConfirmButton
          variant="default"
          duration={1200}
          holdingLabel="送出中…"
          confirmedLabel="已送出"
        >
          長按送出
        </HoldConfirmButton>
      </div>
      <p className="text-sm text-ink-mute">按住不放直到填色掃滿，中途放開會彈回</p>
    </div>
  );
}
