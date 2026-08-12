"use client";

/**
 * 旋轉環載入指示：帶缺口的圓環持續旋轉，大小、粗細、顏色與轉速皆可調。
 * @example <RingSpinner size={40} />
 */
type RingSpinnerProps = {
  /** 外徑（px） */
  size?: number;
  /** 環的粗細（px） */
  thickness?: number;
  /** 環的顏色 */
  color?: string;
  /** 背景軌道顏色，設為 "transparent" 可隱藏 */
  trackColor?: string;
  /** 轉一圈的秒數，越小越快 */
  speed?: number;
  /** 無障礙標籤 */
  label?: string;
  className?: string;
};

export function RingSpinner({
  size = 40,
  thickness = 4,
  color = "#3f3f46",
  trackColor = "rgba(0, 0, 0, 0.08)",
  speed = 0.9,
  label = "載入中",
  className = "",
}: RingSpinnerProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <span role="status" aria-label={label} className={`inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="himari-ring-spinner"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.72}
        />
      </svg>
      <style>{`
        .himari-ring-spinner {
          display: block;
          animation-name: himari-ring-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-ring-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .himari-ring-spinner { animation-duration: 2.4s !important; }
        }
      `}</style>
    </span>
  );
}
