"use client";

import { AuroraText } from "@/components/ui/aurora-text";

export default function AuroraTextDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-8 text-center">
      <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        打造<AuroraText>令人驚豔</AuroraText>的介面
      </h2>
      <p className="text-sm text-ink-mute">
        漸層像極光一樣在文字上緩緩流動，離開視窗會自動暫停。
      </p>
    </div>
  );
}
