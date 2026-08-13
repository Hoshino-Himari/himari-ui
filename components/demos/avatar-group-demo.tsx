"use client";

import type { CSSProperties } from "react";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { gradientImage } from "./_gradient-image";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--background": "oklch(18% 0.02 265)",
  "--muted": "oklch(26% 0.02 265)",
  "--muted-foreground": "oklch(80% 0.012 265)",
  "--ring": "oklch(80% 0.14 80)",
} as CSSProperties;

const avatars = [
  { src: gradientImage("#f59e0b", "#b45309", "王", 200, 200), alt: "王", fallback: "王" },
  { src: gradientImage("#8b5cf6", "#4c1d95", "林", 200, 200), alt: "林", fallback: "林" },
  { src: gradientImage("#10b981", "#065f46", "陳", 200, 200), alt: "陳", fallback: "陳" },
  { fallback: "李", alt: "李" },
  { fallback: "張", alt: "張" },
  { fallback: "黃", alt: "黃" },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-8" style={theme}>
      <AvatarGroup avatars={avatars} max={4} size="lg" />
      <p className="text-sm text-ink-mute">
        滑鼠移上去整排會散開，第四顆之後收成 +N（最後三顆示範沒有圖片時的文字縮寫）
      </p>
    </div>
  );
}
