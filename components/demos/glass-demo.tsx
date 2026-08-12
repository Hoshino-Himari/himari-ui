"use client";

import { Glass } from "@/components/ui/glass";

export default function GlassDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-xl">
      <Glass className="h-full w-full" size={90} zoom={1.6}>
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-zinc-100 px-6 text-center">
          <h3 data-glass-target className="text-2xl font-semibold text-zinc-900">
            水晶般的細節
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
            一枚玻璃鏡片跟著游標移動，折射並放大底下的內容，邊緣還帶著色散。
          </p>
          <p className="text-xs text-zinc-500">移動游標，停在標題上會放大</p>
        </div>
      </Glass>
    </div>
  );
}
