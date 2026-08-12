"use client";

/**
 * 動畫進度條：value 受控，填色段以平滑過渡跟上數值，表面帶一道流動高光；含 progressbar 無障礙屬性。
 * @example <AnimatedProgress value={64} />
 */
type AnimatedProgressProps = {
  /** 目前進度（0 ~ max） */
  value: number;
  /** 進度上限 */
  max?: number;
  /** 是否在右側顯示百分比 */
  showLabel?: boolean;
  /** 填色 */
  color?: string;
  /** 軌道底色 */
  trackColor?: string;
  /** 條的高度（px） */
  height?: number;
  /** 無障礙標籤 */
  label?: string;
  className?: string;
};

export function AnimatedProgress({
  value,
  max = 100,
  showLabel = false,
  color = "#f59e0b",
  trackColor = "rgba(0, 0, 0, 0.08)",
  height = 10,
  label = "進度",
  className = "",
}: AnimatedProgressProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className={`flex w-full items-center gap-3 ${className}`}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
        className="relative flex-1 overflow-hidden rounded-full"
        style={{ height, backgroundColor: trackColor }}
      >
        {/* 用 translateX 位移整條填色段，只動 transform 就能平滑過渡且保住圓角 */}
        <div
          className="himari-progress-fill absolute inset-0 overflow-hidden rounded-full"
          style={{
            backgroundColor: color,
            transform: `translateX(${percent - 100}%)`,
          }}
        >
          <div
            aria-hidden
            className="himari-progress-sheen absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)",
            }}
          />
        </div>
      </div>
      {showLabel && (
        <span className="min-w-[3ch] text-right text-sm tabular-nums" style={{ color }}>
          {Math.round(percent)}%
        </span>
      )}
      <style>{`
        .himari-progress-fill {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .himari-progress-sheen {
          transform: translateX(-100%);
          animation: himari-progress-sweep 1.8s ease-in-out infinite;
        }
        @keyframes himari-progress-sweep {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-progress-sheen { animation: none; }
          .himari-progress-fill { transition: none; }
        }
      `}</style>
    </div>
  );
}
