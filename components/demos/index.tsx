"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function load(loader: () => Promise<{ default: ComponentType }>) {
  return dynamic(loader, {
    ssr: false,
    loading: () => (
      <div className="flex h-40 items-center justify-center text-sm text-ink-faint">
        載入預覽中…
      </div>
    ),
  });
}

/** slug → 預覽元件。slug 必須與 components/ui/<slug>.tsx 一致。 */
export const demos: Record<string, ComponentType> = {
  // 按鈕
  "progress-fold-button": load(() => import("./progress-fold-button-demo")),
  "shimmer-button": load(() => import("./shimmer-button-demo")),
  "magnetic-button": load(() => import("./magnetic-button-demo")),
  "liquid-glass-button": load(() => import("./liquid-glass-button-demo")),
  "beam-border-button": load(() => import("./beam-border-button-demo")),
  "push-button": load(() => import("./push-button-demo")),
  // 卡片
  "spotlight-card": load(() => import("./spotlight-card-demo")),
  "tilt-card": load(() => import("./tilt-card-demo")),
  "glass-card": load(() => import("./glass-card-demo")),
  "gradient-border-card": load(() => import("./gradient-border-card-demo")),
  "flip-card": load(() => import("./flip-card-demo")),
  // 文字特效
  "typewriter-text": load(() => import("./typewriter-text-demo")),
  "gradient-text": load(() => import("./gradient-text-demo")),
  "decrypt-text": load(() => import("./decrypt-text-demo")),
  "stagger-text": load(() => import("./stagger-text-demo")),
  "neon-text": load(() => import("./neon-text-demo")),
  "number-ticker": load(() => import("./number-ticker-demo")),
  // 背景特效
  "aurora-background": load(() => import("./aurora-background-demo")),
  "particles-background": load(() => import("./particles-background-demo")),
  meteors: load(() => import("./meteors-demo")),
  "dot-pattern": load(() => import("./dot-pattern-demo")),
  "grid-beams": load(() => import("./grid-beams-demo")),
  "wave-background": load(() => import("./wave-background-demo")),
  // 載入動畫
  "skeleton-loader": load(() => import("./skeleton-loader-demo")),
  "ring-spinner": load(() => import("./ring-spinner-demo")),
  "bouncing-dots": load(() => import("./bouncing-dots-demo")),
  "animated-progress": load(() => import("./animated-progress-demo")),
  "orbit-loader": load(() => import("./orbit-loader-demo")),
  // 輸入與表單
  "floating-label-input": load(() => import("./floating-label-input-demo")),
  "glow-input": load(() => import("./glow-input-demo")),
  "otp-input": load(() => import("./otp-input-demo")),
  "animated-switch": load(() => import("./animated-switch-demo")),
  "animated-slider": load(() => import("./animated-slider-demo")),
  // 導覽
  dock: load(() => import("./dock-demo")),
  "floating-navbar": load(() => import("./floating-navbar-demo")),
  "animated-tabs": load(() => import("./animated-tabs-demo")),
  "animated-breadcrumb": load(() => import("./animated-breadcrumb-demo")),
  // 互動特效
  globe: load(() => import("./globe-demo")),
  marquee: load(() => import("./marquee-demo")),
  "border-beam": load(() => import("./border-beam-demo")),
  "mouse-spotlight": load(() => import("./mouse-spotlight-demo")),
  confetti: load(() => import("./confetti-demo")),
  "animated-grid-pattern": load(() => import("./animated-grid-pattern-demo")),
};

export function DemoHost({ slug }: { slug: string }) {
  const Demo = demos[slug];
  if (!Demo) {
    return <p className="text-sm text-ink-faint">此元件尚未提供預覽。</p>;
  }
  return <Demo />;
}
