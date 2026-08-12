"use client";

import { type HTMLAttributes, type ReactNode } from "react";

/**
 * 漸層邊框卡片：底層一圈流動的 conic-gradient 持續旋轉，內層蓋住中間，
 * 只露出邊緣形成會流動的漸層邊框。
 * @example
 * <GradientBorderCard>
 *   <h3>標題</h3>
 *   <p>內容</p>
 * </GradientBorderCard>
 */
type GradientBorderCardProps = {
  children: ReactNode;
  /** 邊框漸層色（首尾同色可無縫循環） */
  colors?: string[];
  /** 旋轉一圈的秒數 */
  duration?: number;
  /** 邊框寬度（px） */
  borderWidth?: number;
  /** 內層背景色 */
  background?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function GradientBorderCard({
  children,
  colors = ["#f59e0b", "#ec4899", "#8b5cf6", "#f59e0b"],
  duration = 4,
  borderWidth = 1.5,
  background = "#09090b",
  className = "",
  ...props
}: GradientBorderCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ padding: borderWidth }}
      {...props}
    >
      {/* 旋轉的漸層層：面積放大到 4 倍，旋轉時仍能蓋滿整張卡片 */}
      <div
        aria-hidden
        className="himari-gbc-spin absolute"
        style={{
          inset: "-150%",
          background: `conic-gradient(${colors.join(", ")})`,
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className="relative rounded-2xl p-6"
        style={{
          background,
          borderRadius: `calc(1rem - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
      <style>{`
        .himari-gbc-spin {
          animation-name: himari-gbc-rotate;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-gbc-rotate {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-gbc-spin { animation: none; }
        }
      `}</style>
    </div>
  );
}
