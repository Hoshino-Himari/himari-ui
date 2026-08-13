"use client";

import type { CSSProperties } from "react";
import { FlowField } from "@/components/ui/flow-field";

// FlowField 會自己塗背景色，這裡把 --background 指到本站的深色底
const theme = { "--background": "oklch(16% 0.02 265)" } as CSSProperties;

export default function FlowFieldDemo() {
  return (
    <div
      className="relative h-80 w-full overflow-hidden rounded-2xl"
      style={theme}
    >
      <FlowField color="oklch(80% 0.14 80)" fade={0.05} />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
        <h3 className="text-2xl font-bold text-ink drop-shadow">流場</h3>
        <p className="max-w-xs text-sm text-ink-mute">
          粒子順著雜訊向量場流動，拖出綢緞般的漸隱軌跡。
        </p>
      </div>
    </div>
  );
}
