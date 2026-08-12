"use client";

/**
 * 網格光束：細網格線鋪底，幾道亮光沿著水平與垂直格線來回奔馳，
 * 適合科技感的區塊背景。絕對定位鋪滿父容器，請包在 `relative` 容器內使用。
 * @example
 * <div className="relative h-72 overflow-hidden bg-zinc-950">
 *   <GridBeams />
 * </div>
 */
type GridBeamsProps = {
  /** 網格間距（px） */
  gridSize?: number;
  /** 網格線顏色（建議帶透明度） */
  gridColor?: string;
  /** 光束顏色 */
  beamColor?: string;
  /** 光束跑完一趟的秒數 */
  duration?: number;
  className?: string;
};

/** 水平光束所在的格線列（gridSize 的倍數）與節奏 */
const H_BEAMS = [
  { row: 2, delay: 0, speed: 1 },
  { row: 5, delay: 2.4, speed: 1.4 },
  { row: 8, delay: 1.2, speed: 0.8 },
] as const;

/** 垂直光束所在的格線行（gridSize 的倍數）與節奏 */
const V_BEAMS = [
  { col: 3, delay: 0.8, speed: 1.2 },
  { col: 9, delay: 3, speed: 0.9 },
] as const;

export function GridBeams({
  gridSize = 40,
  gridColor = "rgba(148, 163, 184, 0.18)",
  beamColor = "#38bdf8",
  duration = 5,
  className = "",
}: GridBeamsProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 網格線 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      {/* 水平光束 */}
      {H_BEAMS.map((beam, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 w-full overflow-hidden"
          style={{ top: beam.row * gridSize, height: 1 }}
        >
          <div
            className="himari-grid-beam-h h-full w-1/5"
            style={{
              background: `linear-gradient(90deg, transparent, ${beamColor}, transparent)`,
              animationDuration: `${duration * beam.speed}s`,
              animationDelay: `${beam.delay}s`,
            }}
          />
        </div>
      ))}
      {/* 垂直光束 */}
      {V_BEAMS.map((beam, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 h-full overflow-hidden"
          style={{ left: beam.col * gridSize, width: 1 }}
        >
          <div
            className="himari-grid-beam-v h-1/5 w-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
              animationDuration: `${duration * beam.speed}s`,
              animationDelay: `${beam.delay}s`,
            }}
          />
        </div>
      ))}
      <style>{`
        .himari-grid-beam-h {
          transform: translateX(-100%);
          animation-name: himari-grid-beam-run-h;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .himari-grid-beam-v {
          transform: translateY(-100%);
          animation-name: himari-grid-beam-run-v;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes himari-grid-beam-run-h {
          from { transform: translateX(-100%); }
          to { transform: translateX(600%); }
        }
        @keyframes himari-grid-beam-run-v {
          from { transform: translateY(-100%); }
          to { transform: translateY(600%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-grid-beam-h, .himari-grid-beam-v { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
