"use client";

/**
 * 極光背景：數團大型模糊漸層色塊在容器內緩慢漂移，營造夜空極光的氛圍。
 * 絕對定位鋪滿父容器，請包在 `relative` 容器內使用。
 * @example
 * <div className="relative h-72 overflow-hidden">
 *   <AuroraBackground />
 *   <p className="relative z-10">內容</p>
 * </div>
 */
type AuroraBackgroundProps = {
  /** 色塊顏色（依序輪流套用到各團極光） */
  colors?: string[];
  /** 漂移一趟的基準秒數，數值越大越慢 */
  speed?: number;
  /** 模糊程度（px） */
  blur?: number;
  /** 色塊不透明度 0–1 */
  opacity?: number;
  className?: string;
};

const PLACEMENTS = [
  { top: "-25%", left: "-15%", width: "70%", height: "70%" },
  { top: "5%", right: "-20%", width: "60%", height: "65%" },
  { bottom: "-30%", left: "10%", width: "65%", height: "70%" },
  { top: "25%", left: "35%", width: "55%", height: "55%" },
] as const;

export function AuroraBackground({
  colors = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399"],
  speed = 16,
  blur = 60,
  opacity = 0.35,
  className = "",
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PLACEMENTS.map((placement, i) => (
        <div
          key={i}
          className={`himari-aurora-blob himari-aurora-blob-${i % 4} absolute rounded-full`}
          style={{
            ...placement,
            backgroundColor: colors[i % colors.length],
            opacity,
            filter: `blur(${blur}px)`,
            animationDuration: `${speed * (1 + i * 0.35)}s`,
          }}
        />
      ))}
      <style>{`
        .himari-aurora-blob {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform;
        }
        @keyframes himari-aurora-0 {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(18%, 12%, 0) scale(1.15); }
        }
        @keyframes himari-aurora-1 {
          from { transform: translate3d(0, 0, 0) scale(1.1); }
          to { transform: translate3d(-15%, 18%, 0) scale(0.9); }
        }
        @keyframes himari-aurora-2 {
          from { transform: translate3d(0, 0, 0) scale(0.95); }
          to { transform: translate3d(12%, -16%, 0) scale(1.2); }
        }
        @keyframes himari-aurora-3 {
          from { transform: translate3d(0, 0, 0) scale(1.05); }
          to { transform: translate3d(-18%, -10%, 0) scale(0.85); }
        }
        .himari-aurora-blob-0 { animation-name: himari-aurora-0; }
        .himari-aurora-blob-1 { animation-name: himari-aurora-1; }
        .himari-aurora-blob-2 { animation-name: himari-aurora-2; }
        .himari-aurora-blob-3 { animation-name: himari-aurora-3; }
        @media (prefers-reduced-motion: reduce) {
          .himari-aurora-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
