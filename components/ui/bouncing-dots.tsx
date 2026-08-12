"use client";

/**
 * 跳動點載入指示：三個（可調數量）小圓點依序彈跳，delay 錯開形成波浪節奏。
 * @example <BouncingDots />
 */
type BouncingDotsProps = {
  /** 點的數量 */
  count?: number;
  /** 點的直徑（px） */
  size?: number;
  /** 點的顏色 */
  color?: string;
  /** 單一點彈跳一輪的秒數 */
  speed?: number;
  /** 相鄰點的延遲差（秒） */
  stagger?: number;
  /** 無障礙標籤 */
  label?: string;
  className?: string;
};

export function BouncingDots({
  count = 3,
  size = 10,
  color = "#3f3f46",
  speed = 1,
  stagger = 0.16,
  label = "載入中",
  className = "",
}: BouncingDotsProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-end ${className}`}
      style={{ gap: size * 0.6, height: size * 2.4 }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="himari-bouncing-dot inline-block rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animationDuration: `${speed}s`,
            animationDelay: `${i * stagger}s`,
          }}
        />
      ))}
      <style>{`
        .himari-bouncing-dot {
          animation-name: himari-dot-bounce;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes himari-dot-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-120%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-bouncing-dot { animation: none; }
        }
      `}</style>
    </span>
  );
}
