"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/ripple> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn 與 ripple keyframes，foreground token 改為 color prop）。

import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  /** 漣漪顏色（邊框與填色基準） */
  color?: string;
}

/**
 * 漣漪：多層同心圓從中心緩慢脹縮擴散的背景效果，鋪在 `relative` 容器最底層。
 * @example
 * <div className="relative h-72 overflow-hidden">
 *   <Ripple />
 *   <p className="relative z-10">內容</p>
 * </div>
 */
export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  color = "#71717a",
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,white,transparent)] select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = "solid";

        return (
          <div
            key={i}
            className={`himari-ripple absolute rounded-full border shadow-xl`}
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: color,
                backgroundColor: `color-mix(in srgb, ${color} 25%, transparent)`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
      <style>{`
        .himari-ripple {
          animation: himari-ripple var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite;
        }
        @keyframes himari-ripple {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(0.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-ripple { animation: none; }
        }
      `}</style>
    </div>
  );
});

Ripple.displayName = "Ripple";
