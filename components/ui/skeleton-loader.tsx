"use client";

import { type CSSProperties } from "react";

/**
 * 骨架屏：載入中的佔位塊，帶一道微光由左至右掃過；寬、高、圓角皆可調，可自由組合成卡片骨架。
 * @example <Skeleton width={200} height={16} />
 */
type SkeletonProps = {
  /** 寬度，數字為 px，也可給 "100%" 等字串 */
  width?: number | string;
  /** 高度，數字為 px，也可給字串 */
  height?: number | string;
  /** 圓角，數字為 px，也可給 "9999px" 等字串 */
  radius?: number | string;
  /** 底色 */
  baseColor?: string;
  /** 掃過的微光顏色 */
  shimmerColor?: string;
  /** 微光掃過一輪的秒數 */
  duration?: number;
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  baseColor = "#e4e4e7",
  shimmerColor = "rgba(255, 255, 255, 0.65)",
  duration = 1.6,
  className = "",
  style,
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: baseColor,
        ...style,
      }}
    >
      <div
        className="himari-skeleton-shimmer absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          animationDuration: `${duration}s`,
        }}
      />
      <style>{`
        .himari-skeleton-shimmer {
          transform: translateX(-100%);
          animation-name: himari-skeleton-sweep;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes himari-skeleton-sweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-skeleton-shimmer { animation: none; }
        }
      `}</style>
    </div>
  );
}
