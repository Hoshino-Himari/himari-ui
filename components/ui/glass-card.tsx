"use client";

import { type HTMLAttributes, type ReactNode } from "react";

/**
 * 液態玻璃卡片：backdrop-blur 玻璃擬態、邊緣高光與內部微噪點，
 * 放在漸層或圖片背景上效果最好。
 * @example
 * <GlassCard>
 *   <h3>標題</h3>
 *   <p>內容</p>
 * </GlassCard>
 */
type GlassCardProps = {
  children: ReactNode;
  /** 背景模糊強度（px） */
  blur?: number;
  /** 玻璃底色（建議帶透明度） */
  tint?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

// 內嵌 SVG 噪點，複製到其他專案也不需要額外圖檔
const NOISE_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>";

export function GlassCard({
  children,
  blur = 16,
  tint = "rgba(255, 255, 255, 0.1)",
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/25 p-6 shadow-lg shadow-black/10 ${className}`}
      style={{
        backgroundColor: tint,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
      {...props}
    >
      {/* 邊緣高光：上緣一道亮線 + 內圈細微光暈 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -12px 24px rgba(255,255,255,0.04)",
        }}
      />
      {/* 斜向高光漸層 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.1) 100%)",
        }}
      />
      {/* 微噪點，讓玻璃更有質感 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_URI}")` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
