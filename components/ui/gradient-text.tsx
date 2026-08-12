"use client";

import { type ReactNode } from "react";

/**
 * 漸層動畫文字：用 background-clip: text 讓漸層在文字上緩緩流動，可自訂顏色與速度。
 * @example <GradientText>絢麗的漸層標題</GradientText>
 */
type GradientTextProps = {
  children: ReactNode;
  /** 漸層顏色，至少兩色，會頭尾相接形成無縫循環 */
  colors?: string[];
  /** 流動一輪的秒數，越小越快 */
  speed?: number;
  className?: string;
};

export function GradientText({
  children,
  colors = ["#f59e0b", "#ec4899", "#8b5cf6", "#f59e0b"],
  speed = 6,
  className = "",
}: GradientTextProps) {
  // 頭尾同色才能無縫循環；若使用者沒補尾色就自動補上
  const stops = colors[0] === colors[colors.length - 1] ? colors : [...colors, colors[0] ?? ""];

  return (
    <span
      className={`himari-gradient-text inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${stops.join(", ")})`,
        backgroundSize: "200% auto",
        animationDuration: `${speed}s`,
      }}
    >
      {children}
      <style>{`
        .himari-gradient-text {
          -webkit-background-clip: text;
          animation-name: himari-gradient-flow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-gradient-flow {
          from { background-position: 0% center; }
          to { background-position: -200% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-gradient-text { animation: none; }
        }
      `}</style>
    </span>
  );
}
