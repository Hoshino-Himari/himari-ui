"use client";

/**
 * 波浪背景：容器底部多層 SVG 波浪以不同速度水平漂移，
 * 透明度逐層遞減做出景深。絕對定位鋪滿父容器，請包在 `relative` 容器內使用。
 * @example
 * <div className="relative h-72 overflow-hidden bg-sky-950">
 *   <WaveBackground color="#38bdf8" />
 * </div>
 */
type WaveBackgroundProps = {
  /** 波浪顏色 */
  color?: string;
  /** 波浪區域高度（px） */
  height?: number;
  /** 速度倍率，數值越大越快 */
  speed?: number;
  /** 各層透明度（同時決定層數） */
  opacities?: number[];
  className?: string;
};

/** 首尾同高且切線相同的波形，左右拼接無縫 */
const WAVE_PATH =
  "M0,160 C360,80 360,240 720,160 C1080,80 1080,240 1440,160 L1440,320 L0,320 Z";

export function WaveBackground({
  color = "#38bdf8",
  height = 120,
  speed = 1,
  opacities = [0.5, 0.32, 0.18],
  className = "",
}: WaveBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {opacities.map((opacity, i) => (
        <div
          key={i}
          className="himari-wave-layer absolute bottom-0 left-0 flex w-[200%]"
          style={{
            // 越後面的層越高，露出層疊的波峰
            height: height + i * 16,
            opacity,
            animationDuration: `${(14 + i * 8) / Math.max(speed, 0.01)}s`,
            // 讓每層起始相位錯開
            animationDelay: `${-i * 3}s`,
          }}
        >
          {[0, 1].map((half) => (
            <svg
              key={half}
              className="h-full w-1/2 shrink-0"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d={WAVE_PATH} fill={color} />
            </svg>
          ))}
        </div>
      ))}
      <style>{`
        .himari-wave-layer {
          animation-name: himari-wave-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .himari-wave-layer:nth-child(even) {
          animation-direction: reverse;
        }
        @keyframes himari-wave-drift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-wave-layer { animation: none; }
        }
      `}</style>
    </div>
  );
}
