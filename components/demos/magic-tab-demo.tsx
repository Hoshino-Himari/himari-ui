"use client";

import { type CSSProperties, useState } from "react";
import { MagicTab } from "@/components/ui/magic-tab";

const items = [
  { value: "overview", label: "總覽" },
  { value: "usage", label: "用量" },
  { value: "billing", label: "帳單" },
  { value: "archive", label: "封存", disabled: true },
];

const names: Record<string, string> = {
  overview: "總覽",
  usage: "用量",
  billing: "帳單",
};

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的琥珀色系
const theme = {
  "--muted": "rgba(255,255,255,0.05)",
  "--primary": "oklch(80% 0.14 80)",
  "--primary-foreground": "oklch(20% 0.02 265)",
  "--muted-foreground": "oklch(71% 0.014 265)",
} as CSSProperties;

export default function MagicTabDemo() {
  const [value, setValue] = useState("overview");

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <MagicTab
        items={items}
        value={value}
        onValueChange={setValue}
        style={theme}
      />
      <p className="text-sm text-ink-mute">
        目前分頁：{names[value] ?? value}（「封存」示範停用狀態，方向鍵可移動焦點）
      </p>
    </div>
  );
}
