"use client";

/**
 * 光束邊框：一段漸層亮光沿著容器邊框繞行。
 * 以 CSS mask 挖出邊框環、@property 動畫 conic-gradient 角度實現，相容性佳。
 * 放進 `relative` 且有 `rounded-*` 的容器內即可，圓角會自動繼承。
 * @example
 * <div className="relative rounded-xl border p-6">
 *   內容
 *   <BorderBeam />
 * </div>
 */
type BorderBeamProps = {
  /** 光束弧長（度數，0–360） */
  size?: number;
  /** 繞行一圈的秒數 */
  duration?: number;
  /** 光束起始色（尾端） */
  colorFrom?: string;
  /** 光束結束色（頭端） */
  colorTo?: string;
  /** 邊框線寬（px） */
  borderWidth?: number;
  className?: string;
};

export function BorderBeam({
  size = 80,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1.5,
  className = "",
}: BorderBeamProps) {
  const arc = Math.min(Math.max(size, 1), 359);
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        padding: borderWidth,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      }}
    >
      <div
        className="himari-border-beam absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from var(--himari-bb-angle, 0deg), transparent 0deg ${360 - arc}deg, ${colorFrom} ${360 - arc / 2}deg, ${colorTo} 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
      <style>{`
        @property --himari-bb-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .himari-border-beam {
          animation-name: himari-border-beam-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes himari-border-beam-spin {
          to { --himari-bb-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-border-beam { animation: none; }
        }
      `}</style>
    </div>
  );
}
