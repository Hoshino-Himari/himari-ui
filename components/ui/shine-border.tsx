"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/shine-border> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn 與 shine keyframes）。

import * as React from "react";

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * 流光邊框：一圈漸層光在容器邊框上緩緩流動，以 mask 挖空只留邊框。
 * 放進 `relative` 容器內即可，圓角自動繼承。
 * @example
 * <div className="relative rounded-xl p-6">
 *   <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
 *   內容
 * </div>
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <>
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--duration": `${duration}s`,
            backgroundImage: `radial-gradient(transparent,transparent, ${
              Array.isArray(shineColor) ? shineColor.join(",") : shineColor
            },transparent,transparent)`,
            backgroundSize: "300% 300%",
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "var(--border-width)",
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "himari-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
          className
        )}
        {...props}
      />
      <style>{`
        .himari-shine {
          animation: himari-shine var(--duration) infinite linear;
        }
        @keyframes himari-shine {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          to { background-position: 0% 0%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-shine { animation: none; }
        }
      `}</style>
    </>
  );
}
