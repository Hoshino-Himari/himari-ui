"use client";

import { SpinningText } from "@/components/ui/spinning-text";

export default function SpinningTextDemo() {
  return (
    <div className="flex h-56 items-center justify-center px-6">
      <SpinningText className="text-sm font-medium text-ink">
        {"微互動元件庫 • HIMARI UI • 動起來 • "}
      </SpinningText>
    </div>
  );
}
