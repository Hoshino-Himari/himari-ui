"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * 液態玻璃按鈕：backdrop-blur 玻璃擬態搭配頂部高光，hover 時一道光澤流過表面。
 * 建議放在漸層或圖片背景上，才能看出玻璃的穿透感。
 * @example <LiquidGlassButton>立即體驗</LiquidGlassButton>
 */
type LiquidGlassButtonProps = {
  children: ReactNode;
  /** 玻璃底色（建議帶透明度的顏色） */
  tint?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function LiquidGlassButton({
  children,
  tint = "rgba(255, 255, 255, 0.15)",
  className = "",
  ...props
}: LiquidGlassButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/30 px-7 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{ backgroundColor: tint }}
      {...props}
    >
      {/* 頂部高光 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/45 to-transparent"
      />
      {/* hover 時流過表面的光澤 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
