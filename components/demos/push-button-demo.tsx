"use client";

import { PushButton } from "@/components/ui/push-button";

export default function PushButtonDemo() {
  return (
    <div className="flex min-h-40 items-center justify-center gap-6">
      <PushButton>按下去</PushButton>
      <PushButton frontColor="#3b82f6" edgeColor="#1e40af">
        確認送出
      </PushButton>
    </div>
  );
}
