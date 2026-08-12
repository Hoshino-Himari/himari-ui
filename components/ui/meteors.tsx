"use client";

/**
 * 流星雨：多顆帶漸層尾巴的流星以固定角度斜向劃過容器，位置與節奏各不相同。
 * 絕對定位鋪滿父容器，請包在 `relative overflow-hidden` 容器內使用。
 * 位置由索引推導的偽亂數決定，SSR 與客戶端渲染結果一致。
 * @example
 * <div className="relative h-72 overflow-hidden bg-zinc-950">
 *   <Meteors number={20} />
 * </div>
 */
type MeteorsProps = {
  /** 流星數量 */
  number?: number;
  /** 流星頭與尾巴的顏色 */
  color?: string;
  className?: string;
};

/** 由種子產生 0–1 的偽亂數，確保 SSR / CSR 一致 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function Meteors({
  number = 20,
  color = "#94a3b8",
  className = "",
}: MeteorsProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: number }, (_, i) => {
        const left = pseudoRandom(i + 1) * 100;
        const top = pseudoRandom(i + 101) * 60 - 10;
        const delay = pseudoRandom(i + 201) * 6;
        const duration = 3 + pseudoRandom(i + 301) * 5;
        return (
          <span
            key={i}
            className="himari-meteor absolute h-0.5 w-0.5 rounded-full opacity-0"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: color,
              boxShadow: `0 0 4px 1px ${color}66`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <span
              className="absolute top-1/2 h-px w-[60px] -translate-y-1/2"
              style={{
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            />
          </span>
        );
      })}
      <style>{`
        .himari-meteor {
          transform: rotate(215deg) translateX(0);
          animation-name: himari-meteor-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-meteor-fall {
          0% { transform: rotate(215deg) translateX(0); opacity: 0; }
          8% { opacity: 1; }
          65% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-560px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-meteor { animation: none; }
        }
      `}</style>
    </div>
  );
}
