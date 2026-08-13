"use client";

import type { CSSProperties } from "react";
import { AvatarGroup } from "@/components/ui/avatar-group";

// 元件的顏色吃 CSS 變數（帶預設值），這裡換成本站的深色主題
const theme = {
  "--background": "oklch(18% 0.02 265)",
  "--muted": "oklch(26% 0.02 265)",
  "--muted-foreground": "oklch(80% 0.012 265)",
  "--ring": "oklch(80% 0.14 80)",
} as CSSProperties;

const avatars = [
  { src: "/demos/avatar-amber.webp", alt: "示範頭像一" },
  { src: "/demos/avatar-violet.webp", alt: "示範頭像二" },
  { src: "/demos/avatar-teal.webp", alt: "示範頭像三" },
  { src: "/demos/avatar-cobalt.webp", alt: "示範頭像四" },
  { src: "/demos/avatar-magenta.webp", alt: "示範頭像五" },
  { src: "/demos/avatar-slate.webp", alt: "示範頭像六" },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-8" style={theme}>
      <AvatarGroup avatars={avatars} max={4} size="lg" />
      <p className="text-sm text-ink-mute">
        滑鼠移上去整排會散開，第四顆之後收成 +N。
      </p>
    </div>
  );
}
