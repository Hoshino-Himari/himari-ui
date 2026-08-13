"use client";

// 移植自 GodUI <https://godui.design/docs/components/backgrounds/light-rays> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（主題 var(--primary) 改為帶 fallback、z-base 改為 z-0、
// 主題 animate-light-rays-sweep 改為檔內 <style> keyframes 並尊重 prefers-reduced-motion）。

import * as React from "react";

/**
 * 光芒射線：一扇柔和的體積光從上方灑落、緩慢擺動呼吸，可加底片顆粒。純 CSS。
 * 放在 relative overflow-hidden 容器的第一個子元素，內容疊在上面即可。
 * @example <LightRays color="#38bdf8" />
 */
export type LightRaysProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Number of rays in the fan. */
  rayCount?: number;
  /**
   * Ray color, any CSS color string. Defaults to the `--primary` token.
   */
  color?: string;
  /** Sweep speed multiplier. `1` is the calm default. */
  speed?: number;
  /** Base angle (deg) the fan points from. */
  angle?: number;
  /** Overall ray opacity, `0`–`1`. */
  intensity?: number;
  /** Film-grain amount, `0`–`1`. `0` disables the grain layer. */
  grain?: number;
};

const LightRays = React.forwardRef<HTMLDivElement, LightRaysProps>(
  (
    {
      className,
      style,
      rayCount = 14,
      color = "var(--primary, #38bdf8)",
      speed = 1,
      angle = 0,
      intensity = 0.6,
      grain = 0.05,
      ...props
    },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);
    const grainId = `light-rays-grain-${React.useId().replace(/:/g, "")}`;

    const step = 360 / rayCount;
    const rayColor = `color-mix(in oklab, ${color}, transparent 55%)`;

    return (
      <div
        ref={rootRef}
        data-slot="light-rays"
        aria-hidden="true"
        className={`absolute inset-0 z-0 overflow-hidden ${className ?? ""}`}
        style={
          {
            "--rays-speed": `${14 / speed}s`,
            "--rays-angle": `${angle}deg`,
            "--rays-intensity": `${intensity}`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Source glow at the top. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse 60% 40% at 50% -5%, color-mix(in oklab, ${color}, transparent 70%), transparent 70%)`,
          }}
        />

        {/* The ray fan — oversized so rotation never reveals an edge, blurred for
            softness, and faded out toward the bottom. */}
        <div
          className="himari-light-rays-sweep absolute inset-[-50%] origin-top [will-change:transform,opacity]"
          style={{
            backgroundImage: `repeating-conic-gradient(from ${angle}deg at 50% 0%, transparent 0deg, ${rayColor} ${step * 0.16}deg, transparent ${step}deg)`,
            filter: "blur(8px)",
            opacity: intensity,
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 10%, transparent 75%)",
            maskImage: "linear-gradient(to bottom, #000 10%, transparent 75%)",
          }}
        />

        {/* Film grain. */}
        {grain > 0 && (
          <svg
            className="absolute inset-0 size-full mix-blend-overlay"
            style={{ opacity: grain }}
            role="presentation"
          >
            <filter id={grainId}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${grainId})`} />
          </svg>
        )}

        <style>{`
          .himari-light-rays-sweep {
            animation: himari-light-rays-sweep var(--rays-speed, 14s) ease-in-out infinite alternate;
          }
          @keyframes himari-light-rays-sweep {
            0% {
              transform: rotate(calc(var(--rays-angle, 0deg) - 6deg)) scale(1);
              opacity: calc(var(--rays-intensity, 0.6) * 0.7);
            }
            100% {
              transform: rotate(calc(var(--rays-angle, 0deg) + 6deg)) scale(1.08);
              opacity: var(--rays-intensity, 0.6);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .himari-light-rays-sweep { animation: none; }
          }
        `}</style>
      </div>
    );
  },
);
LightRays.displayName = "LightRays";

export { LightRays };
