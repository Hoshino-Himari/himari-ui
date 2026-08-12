"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/**
 * 動畫網格：SVG 方格鋪底，隨機方格緩緩亮起又熄滅，帶出低調的科技感。
 * 絕對定位鋪滿父容器，請包在 `relative` 容器內使用；
 * 亮起的方格在掛載後依容器大小隨機分佈，並隨容器縮放重新排布。
 * @example
 * <div className="relative h-72 overflow-hidden">
 *   <AnimatedGridPattern numSquares={30} maxOpacity={0.3} />
 * </div>
 */
type AnimatedGridPatternProps = {
  /** 單一方格的邊長（px） */
  cellSize?: number;
  /** 同時存在的亮起方格數 */
  numSquares?: number;
  /** 方格最亮時的不透明度 0–1 */
  maxOpacity?: number;
  /** 一次亮滅循環的秒數 */
  duration?: number;
  /** 網格線顏色（建議帶透明度） */
  strokeColor?: string;
  /** 亮起方格的顏色 */
  squareColor?: string;
  className?: string;
};

type Square = {
  id: number;
  col: number;
  row: number;
  delay: number;
  duration: number;
};

export function AnimatedGridPattern({
  cellSize = 40,
  numSquares = 30,
  maxOpacity = 0.3,
  duration = 3,
  strokeColor = "rgba(148, 163, 184, 0.25)",
  squareColor = "#94a3b8",
  className = "",
}: AnimatedGridPatternProps) {
  const patternId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const generate = () => {
      const { width, height } = svg.getBoundingClientRect();
      const cols = Math.max(1, Math.ceil(width / cellSize));
      const rows = Math.max(1, Math.ceil(height / cellSize));
      setSquares(
        Array.from({ length: numSquares }, (_, id) => ({
          id,
          col: Math.floor(Math.random() * cols),
          row: Math.floor(Math.random() * rows),
          delay: Math.random() * duration * 2,
          duration: duration * (0.7 + Math.random() * 0.6),
        }))
      );
    };

    generate();
    const observer = new ResizeObserver(generate);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [cellSize, numSquares, duration]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ "--himari-agp-max": maxOpacity } as CSSProperties}
    >
      <defs>
        <pattern
          id={patternId}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      {squares.map((square) => (
        <rect
          key={square.id}
          className="himari-agp-square"
          x={square.col * cellSize + 1}
          y={square.row * cellSize + 1}
          width={cellSize - 1}
          height={cellSize - 1}
          fill={squareColor}
          style={{
            animationDelay: `${square.delay}s`,
            animationDuration: `${square.duration}s`,
          }}
        />
      ))}
      <style>{`
        .himari-agp-square {
          opacity: 0;
          animation-name: himari-agp-fade;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes himari-agp-fade {
          0%, 100% { opacity: 0; }
          50% { opacity: var(--himari-agp-max, 0.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-agp-square {
            animation: none;
            opacity: calc(var(--himari-agp-max, 0.3) * 0.5);
          }
        }
      `}</style>
    </svg>
  );
}
