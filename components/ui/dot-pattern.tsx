"use client";

import { useId } from "react";

/**
 * 點陣背景：以 SVG pattern 均勻鋪滿小圓點，可選 radial mask 讓邊緣淡出，
 * 適合當簡約的區塊底紋。絕對定位鋪滿父容器，請包在 `relative` 容器內使用。
 * @example
 * <div className="relative h-72">
 *   <DotPattern fade />
 * </div>
 */
type DotPatternProps = {
  /** 相鄰圓點的間距（px） */
  spacing?: number;
  /** 圓點半徑（px） */
  radius?: number;
  /** 圓點顏色 */
  color?: string;
  /** 是否用放射狀遮罩讓邊緣淡出 */
  fade?: boolean;
  className?: string;
};

export function DotPattern({
  spacing = 16,
  radius = 1.5,
  color = "#a1a1aa",
  fade = false,
  className = "",
}: DotPatternProps) {
  const patternId = useId();
  const mask = fade
    ? "radial-gradient(ellipse at center, black 30%, transparent 80%)"
    : undefined;

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <defs>
        <pattern
          id={patternId}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={radius} cy={radius} r={radius} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
