"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * 微光按鈕：一道光帶沿著按鈕邊緣繞行，強調主要行動呼籲。
 * @example <ShimmerButton>開始使用</ShimmerButton>
 */
type ShimmerButtonProps = {
  children: ReactNode;
  /** 光帶顏色 */
  shimmerColor?: string;
  /** 繞行一圈的秒數 */
  duration?: number;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ShimmerButton({
  children,
  shimmerColor = "#ffffff",
  duration = 3,
  className = "",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-100 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className="himari-shimmer absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 300deg, ${shimmerColor} 330deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
      <span className="absolute inset-[1.5px] rounded-full bg-zinc-900" />
      <span className="relative z-10">{children}</span>
      <style>{`
        .himari-shimmer { animation: himari-shimmer-spin linear infinite; }
        @keyframes himari-shimmer-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .himari-shimmer { animation: none; } }
      `}</style>
    </button>
  );
}
