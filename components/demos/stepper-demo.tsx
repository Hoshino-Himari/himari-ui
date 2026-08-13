"use client";

import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "填寫資料", description: "基本會員資訊" },
  { label: "確認內容", description: "核對訂單明細" },
  { label: "完成付款", description: "選擇付款方式" },
  { label: "訂單成立", description: "寄送確認信" },
];

export default function StepperDemo() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex w-full flex-col items-center gap-8 overflow-x-auto py-6">
      <Stepper steps={steps} active={active} className="min-w-[520px] justify-center px-4" />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="rounded-lg border border-line px-4 py-1.5 text-sm text-ink transition-colors hover:bg-paper-3 disabled:pointer-events-none disabled:opacity-40"
        >
          上一步
        </button>
        <button
          type="button"
          onClick={() => setActive((a) => Math.min(steps.length, a + 1))}
          disabled={active === steps.length}
          className="rounded-lg border border-line bg-paper-3 px-4 py-1.5 text-sm text-ink transition-colors hover:bg-paper-2 disabled:pointer-events-none disabled:opacity-40"
        >
          下一步
        </button>
      </div>
    </div>
  );
}
