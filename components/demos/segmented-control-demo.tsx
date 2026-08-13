"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/segmented-control";

const options = [
  { label: "日", value: "day" },
  { label: "週", value: "week" },
  { label: "月", value: "month" },
  { label: "年", value: "year", disabled: true },
];

const names: Record<string, string> = {
  day: "每日",
  week: "每週",
  month: "每月",
};

export default function SegmentedControlDemo() {
  const [value, setValue] = useState("week");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md items-center justify-center rounded-2xl bg-zinc-100 p-8">
        <SegmentedControl options={options} value={value} onChange={setValue} />
      </div>
      <p className="text-sm text-ink-mute">
        目前檢視：{names[value] ?? value}（「年」示範停用狀態）
      </p>
    </div>
  );
}
