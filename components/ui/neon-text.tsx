"use client";

import { type ReactNode } from "react";

/**
 * 霓虹文字：多層 text-shadow 疊出霓虹燈光暈，並帶偶發的閃爍抖動，可自訂光色。
 * @example <NeonText color="#22d3ee">深夜營業中</NeonText>
 */
type NeonTextProps = {
  children: ReactNode;
  /** 霓虹光暈顏色 */
  color?: string;
  /** 是否啟用偶發閃爍 */
  flicker?: boolean;
  /** 閃爍循環週期（秒） */
  flickerDuration?: number;
  className?: string;
};

export function NeonText({
  children,
  color = "#22d3ee",
  flicker = true,
  flickerDuration = 4,
  className = "",
}: NeonTextProps) {
  return (
    <span
      className={`${flicker ? "himari-neon-flicker" : ""} inline-block ${className}`}
      style={{
        color,
        textShadow: `0 0 4px ${color}, 0 0 12px ${color}, 0 0 24px ${color}, 0 0 48px ${color}`,
        animationDuration: `${flickerDuration}s`,
      }}
    >
      {children}
      <style>{`
        .himari-neon-flicker {
          animation-name: himari-neon-blink;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-neon-blink {
          0%, 18%, 21%, 62%, 65%, 100% { opacity: 1; }
          19%, 20% { opacity: 0.35; }
          63%, 64% { opacity: 0.6; }
          82% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-neon-flicker { animation: none; }
        }
      `}</style>
    </span>
  );
}
