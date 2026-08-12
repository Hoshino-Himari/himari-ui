"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * 光束邊框按鈕：一道亮光沿著按鈕邊框不停繞行（旋轉的 conic-gradient 當作邊框層）。
 * @example <BeamBorderButton>查看方案</BeamBorderButton>
 */
type BeamBorderButtonProps = {
  children: ReactNode;
  /** 光束顏色 */
  beamColor?: string;
  /** 繞行一圈的秒數 */
  duration?: number;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BeamBorderButton({
  children,
  beamColor = "#38bdf8",
  duration = 4,
  className = "",
  ...props
}: BeamBorderButtonProps) {
  return (
    <button
      className={`group relative inline-flex overflow-hidden rounded-xl p-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {/* 旋轉的光束層：放大到足以覆蓋整顆按鈕，旋轉時亮弧掃過邊框 */}
      <span
        aria-hidden
        className="himari-beam absolute inset-[-1000%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 310deg, ${beamColor} 345deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
      <span className="relative z-10 inline-flex w-full items-center justify-center rounded-[10.5px] bg-zinc-950 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors duration-200 group-hover:bg-zinc-900">
        {children}
      </span>
      <style>{`
        .himari-beam { animation: himari-beam-spin linear infinite; }
        @keyframes himari-beam-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .himari-beam { animation: none; } }
      `}</style>
    </button>
  );
}
