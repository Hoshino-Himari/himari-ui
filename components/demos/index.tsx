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
  // 文字特效（MagicUI 移植）
  "word-rotate": load(() => import("./word-rotate-demo")),
  "sparkles-text": load(() => import("./sparkles-text-demo")),
  "hyper-text": load(() => import("./hyper-text-demo")),
  "morphing-text": load(() => import("./morphing-text-demo")),
  "text-reveal": load(() => import("./text-reveal-demo")),
  "spinning-text": load(() => import("./spinning-text-demo")),
  // 互動特效（MagicUI 移植）
  "animated-beam": load(() => import("./animated-beam-demo")),
  "orbiting-circles": load(() => import("./orbiting-circles-demo")),
  ripple: load(() => import("./ripple-demo")),
  "shine-border": load(() => import("./shine-border-demo")),
  lens: load(() => import("./lens-demo")),
  "scroll-progress": load(() => import("./scroll-progress-demo")),
  // 背景特效（MagicUI 移植）
  "retro-grid": load(() => import("./retro-grid-demo")),
  "flickering-grid": load(() => import("./flickering-grid-demo")),
  "warp-background": load(() => import("./warp-background-demo")),
  "interactive-grid-pattern": load(() => import("./interactive-grid-pattern-demo")),
  // 卡片（MagicUI 移植）
  "magic-card": load(() => import("./magic-card-demo")),
  "neon-gradient-card": load(() => import("./neon-gradient-card-demo")),
  // 展示區塊（MagicUI 移植）
  "animated-list": load(() => import("./animated-list-demo")),
  "avatar-circles": load(() => import("./avatar-circles-demo")),
  "bento-grid": load(() => import("./bento-grid-demo")),
  terminal: load(() => import("./terminal-demo")),
  // WebGL 畫布（CanvasUI 移植）
  liquid: load(() => import("./liquid-demo")),
  glass: load(() => import("./glass-demo")),
  glitch: load(() => import("./glitch-demo")),
  vhs: load(() => import("./vhs-demo")),
  magnify: load(() => import("./magnify-demo")),
  "decrypt-reveal": load(() => import("./decrypt-reveal-demo")),
  "particle-reveal": load(() => import("./particle-reveal-demo")),
  frost: load(() => import("./frost-demo")),
  // 按鈕（GodUI 移植）
  "gooey-fab": load(() => import("./gooey-fab-demo")),
  "hold-confirm-button": load(() => import("./hold-confirm-button-demo")),
  "jelly-button": load(() => import("./jelly-button-demo")),
  "slide-confirm-button": load(() => import("./slide-confirm-button-demo")),
  "mask-button": load(() => import("./mask-button-demo")),
  // 輸入與導覽（GodUI 移植）
  "magic-input": load(() => import("./magic-input-demo")),
  "segmented-control": load(() => import("./segmented-control-demo")),
  // 浮層（GodUI 移植）
  "animated-tooltip": load(() => import("./animated-tooltip-demo")),
  "dynamic-island": load(() => import("./dynamic-island-demo")),
  "morphing-dialog": load(() => import("./morphing-dialog-demo")),
  toast: load(() => import("./toast-demo")),
  drawer: load(() => import("./drawer-demo")),
  // 展示區塊（GodUI 移植）
  "image-compare": load(() => import("./image-compare-demo")),
  "card-swap": load(() => import("./card-swap-demo")),
  "split-flap-display": load(() => import("./split-flap-display-demo")),
  stepper: load(() => import("./stepper-demo")),
  // 文字特效（GodUI 移植）
  "aurora-text": load(() => import("./aurora-text-demo")),
  "elastic-text": load(() => import("./elastic-text-demo")),
  highlighter: load(() => import("./highlighter-demo")),
  // 效果與背景（GodUI 移植）
  lamp: load(() => import("./lamp-demo")),
  "particle-dissolve": load(() => import("./particle-dissolve-demo")),
  "light-rays": load(() => import("./light-rays-demo")),
  "liquid-metaballs": load(() => import("./liquid-metaballs-demo")),
  "warp-starfield": load(() => import("./warp-starfield-demo")),
};

export function DemoHost({ slug }: { slug: string }) {
  const Demo = demos[slug];
  if (!Demo) {
    return <p className="text-sm text-ink-faint">此元件尚未提供預覽。</p>;
  }
  return <Demo />;
}
