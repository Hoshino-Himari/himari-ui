// 移植自 MagicUI <https://magicui.design/docs/components/orbiting-circles> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整（內聯 cn 與 orbit keyframes）。

import React from "react";

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

/**
 * 環繞軌道：把子元素平均分佈在圓形軌道上繞著中心公轉，可調半徑、速度與方向。
 * 放在 `relative` 且置中（flex items-center justify-center）的容器內使用。
 * @example
 * <div className="relative flex h-72 items-center justify-center">
 *   <OrbitingCircles radius={100}><span>A</span><span>B</span></OrbitingCircles>
 * </div>
 */
export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `himari-orbiting absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full`,
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
      <style>{`
        .himari-orbiting {
          animation: himari-orbiting calc(var(--duration) * 1s) linear infinite;
        }
        @keyframes himari-orbiting {
          0% {
            transform: rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg));
          }
          100% {
            transform: rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .himari-orbiting { animation: none; }
        }
      `}</style>
    </>
  );
}
