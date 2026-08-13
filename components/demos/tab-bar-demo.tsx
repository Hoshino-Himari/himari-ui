"use client";

import { type CSSProperties, useState } from "react";
import { TabBar } from "@/components/ui/tab-bar";

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

const tabs = [
  {
    value: "home",
    label: "首頁",
    icon: <Icon path="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    value: "search",
    label: "搜尋",
    icon: <Icon path="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />,
  },
  {
    value: "inbox",
    label: "訊息",
    icon: <Icon path="M4 5h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 1 8 6 8-6" />,
    badge: 3,
  },
  {
    value: "profile",
    label: "我的",
    icon: <Icon path="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 8a8 8 0 0 1 16 0" />,
  },
];

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色琥珀主題
const theme = {
  "--background": "oklch(18% 0.02 265)",
  "--border": "oklch(27% 0.022 265)",
  "--primary": "oklch(80% 0.14 80)",
  "--primary-foreground": "oklch(20% 0.02 265)",
  "--foreground": "oklch(93% 0.008 80)",
  "--muted-foreground": "oklch(71% 0.014 265)",
  "--destructive": "oklch(60% 0.2 25)",
} as CSSProperties;

export default function TabBarDemo() {
  const [value, setValue] = useState("home");

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <TabBar tabs={tabs} value={value} onChange={setValue} style={theme} />
      <p className="text-sm text-ink-mute">
        目前分頁：{tabs.find((tab) => tab.value === value)?.label}
      </p>
    </div>
  );
}
