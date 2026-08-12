"use client";

/**
 * 軌道載入指示：數個小點繞著圓心等速公轉，半徑、點數、大小與速度皆可調。
 * @example <OrbitLoader />
 */
type OrbitLoaderProps = {
  /** 公轉半徑（px） */
  radius?: number;
  /** 小點數量 */
  count?: number;
  /** 小點直徑（px） */
  dotSize?: number;
  /** 小點顏色 */
  color?: string;
  /** 公轉一圈的秒數，越小越快 */
  speed?: number;
  /** 無障礙標籤 */
  label?: string;
  className?: string;
};

export function OrbitLoader({
  radius = 16,
  count = 4,
  dotSize = 7,
  color = "#3f3f46",
  speed = 1.4,
  label = "載入中",
  className = "",
}: OrbitLoaderProps) {
  const size = radius * 2 + dotSize;

  return (
    <span
      role="status"
      aria-label={label}
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden
        className="himari-orbit-ring absolute inset-0"
        style={{ animationDuration: `${speed}s` }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              opacity: 1 - (i / count) * 0.65,
              transform: `translate(-50%, -50%) rotate(${(360 / count) * i}deg) translateX(${radius}px)`,
            }}
          />
        ))}
      </span>
      <style>{`
        .himari-orbit-ring {
          animation-name: himari-orbit-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-orbit-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .himari-orbit-ring { animation-duration: 3.6s !important; }
        }
      `}</style>
    </span>
  );
}
