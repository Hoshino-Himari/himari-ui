"use client";

import { MagicCard } from "@/components/ui/magic-card";

export default function MagicCardDemo() {
  return (
    <div className="flex h-72 items-center justify-center px-6">
      <MagicCard className="w-full max-w-sm rounded-xl">
        <div className="p-8">
          <h3 className="text-xl font-bold text-ink">魔法卡片</h3>
          <p className="mt-2 text-sm text-ink-faint">
            把游標移到卡片上：邊框會浮現漸層，內部還有一圈跟著游標走的柔和光暈。
          </p>
        </div>
      </MagicCard>
    </div>
  );
}
