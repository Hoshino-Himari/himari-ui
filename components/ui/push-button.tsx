"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * 3D 按壓按鈕：立體鍵帽造型，底下有一層深色鍵座，按下時整顆沉下去。
 * @example <PushButton>按下去</PushButton>
 */
type PushButtonProps = {
  children: ReactNode;
  /** 鍵帽正面顏色 */
  frontColor?: string;
  /** 鍵座（側邊）顏色，建議用比正面深的同色系 */
  edgeColor?: string;
  /** 文字顏色 */
  textColor?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function PushButton({
  children,
  frontColor = "#f59e0b",
  edgeColor = "#92400e",
  textColor = "#ffffff",
  className = "",
  ...props
}: PushButtonProps) {
  return (
    <button
      className={`group relative inline-block rounded-xl border-none bg-transparent p-0 text-sm font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {/* 底部陰影 */}
      <span
        aria-hidden
        className="absolute inset-0 translate-y-0.5 rounded-xl bg-black/25 blur-[2px]"
      />
      {/* 鍵座（深色側邊） */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: edgeColor }}
      />
      {/* 鍵帽正面：hover 微微抬起、按下時沉下去 */}
      <span
        className="relative flex -translate-y-1.5 items-center justify-center rounded-xl px-7 py-3 transition-transform duration-100 ease-out group-hover:-translate-y-[7px] group-active:-translate-y-0.5"
        style={{ backgroundColor: frontColor, color: textColor }}
      >
        {children}
      </span>
    </button>
  );
}
