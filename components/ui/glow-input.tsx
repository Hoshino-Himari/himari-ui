"use client";

import { type CSSProperties, type InputHTMLAttributes } from "react";

/**
 * 發光聚焦輸入框：focus 時邊框亮起並向外擴散柔和光暈，光暈顏色可透過 glowColor 調整。
 * @example <GlowInput glowColor="#8b5cf6" placeholder="輸入些什麼…" />
 */
type GlowInputProps = {
  /** 光暈顏色 */
  glowColor?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function GlowInput({
  glowColor = "#6366f1",
  className = "",
  ...props
}: GlowInputProps) {
  return (
    <>
      <input
        className={`himari-glow-input w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${className}`}
        style={{ "--himari-glow": glowColor } as CSSProperties}
        {...props}
      />
      <style>{`
        .himari-glow-input { transition: box-shadow 0.25s ease, border-color 0.25s ease; }
        .himari-glow-input:focus {
          border-color: var(--himari-glow);
          box-shadow:
            0 0 0 1px var(--himari-glow),
            0 0 18px color-mix(in srgb, var(--himari-glow) 45%, transparent),
            0 0 44px color-mix(in srgb, var(--himari-glow) 18%, transparent);
        }
        @media (prefers-reduced-motion: reduce) { .himari-glow-input { transition: none; } }
      `}</style>
    </>
  );
}
