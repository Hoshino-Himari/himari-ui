"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/orbit-carousel> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import { motion, type PanInfo, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 環形輪播：卡片沿著一道圓弧排列，前方那張最大最清楚，兩側沿弧線下沉、旋轉並淡出，
 * 可拖曳、點擊或用左右鍵切換。
 * @example
 * <OrbitCarousel radius={240}>
 *   <div>卡片一</div>
 *   <div>卡片二</div>
 * </OrbitCarousel>
 */
export type OrbitCarouselProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> & {
  /** Slides, in order. */
  children?: React.ReactNode;
  /** Arc radius in px — how far slides sit from the pivot. */
  radius?: number;
  /** Degrees between adjacent slides on the arc. */
  angleStep?: number;
  /** Slide width in px. */
  itemWidth?: number;
  /** Slide height in px. */
  itemHeight?: number;
  /** Slide at the front on mount. */
  defaultIndex?: number;
  /** Fired when a new slide settles at the front. */
  onChange?: (index: number) => void;
};

// SPRING.smooth — surfaces / settle.
const MORPH_SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.9,
} as const;

const NAV_BUTTON =
  "grid size-10 place-items-center rounded-full border border-[var(--border,oklch(0.922_0_0))] bg-[var(--card,oklch(1_0_0))] text-[var(--foreground,oklch(0.145_0_0))] shadow-sm [transition:transform_150ms,background_150ms] hover:bg-[var(--accent,oklch(0.97_0_0))] active:scale-95 disabled:opacity-40";

const clampIndex = (v: number, count: number) =>
  Math.max(0, Math.min(count - 1, v));

type OrbitItemProps = {
  offset: number;
  angleStep: number;
  radius: number;
  width: number;
  height: number;
  reduce: boolean;
  onSelect: () => void;
  children: React.ReactNode;
};

const OrbitItem: React.FC<OrbitItemProps> = ({
  offset,
  angleStep,
  radius,
  width,
  height,
  reduce,
  onSelect,
  children,
}) => {
  // Angle from the front of the arc; 0 = front-and-center.
  const a = offset * angleStep;
  const rad = (a * Math.PI) / 180;
  const abs = Math.abs(a);
  const x = radius * Math.sin(rad);
  const y = radius * (1 - Math.cos(rad));
  const scale = 1 - Math.min(abs / 70, 1) * 0.42;
  const opacity = Math.max(0, 1 - Math.min(abs / 82, 1) * 0.85);

  return (
    <motion.div
      className="absolute top-0 left-1/2 cursor-pointer"
      style={{
        width,
        height,
        marginLeft: -width / 2,
        zIndex: Math.round(300 - abs),
      }}
      initial={false}
      animate={{ x, y, rotate: reduce ? 0 : a * 0.5, scale, opacity }}
      transition={MORPH_SPRING}
      onTap={onSelect}
    >
      <div className="size-full overflow-hidden rounded-2xl border border-[var(--border,oklch(0.922_0_0))] bg-[var(--card,oklch(1_0_0))] shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

const OrbitCarousel = React.forwardRef<HTMLDivElement, OrbitCarouselProps>(
  (
    {
      children,
      radius = 240,
      angleStep = 26,
      itemWidth = 160,
      itemHeight = 200,
      defaultIndex = 0,
      onChange,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const reduce = useReducedMotion() ?? false;
    const items = React.Children.toArray(children);
    const count = items.length;

    const [active, setActive] = React.useState(() =>
      clampIndex(defaultIndex, count),
    );
    const dragFrom = React.useRef(0);

    const onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;

    const goTo = React.useCallback(
      (index: number) => {
        const next = clampIndex(index, count);
        setActive((prev) => {
          if (prev !== next) onChangeRef.current?.(next);
          return next;
        });
      },
      [count],
    );

    const handlePanStart = () => {
      dragFrom.current = active;
    };
    const handlePan = (_e: unknown, info: PanInfo) => {
      goTo(Math.round(dragFrom.current - info.offset.x / 120));
    };
    const handlePanEnd = (_e: unknown, info: PanInfo) => {
      if (Math.abs(info.velocity.x) > 500) {
        goTo(active - Math.sign(info.velocity.x));
      }
    };

    const handleKey = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      }
    };

    return (
      <div
        ref={forwardedRef}
        data-slot="orbit-carousel"
        className={`flex flex-col items-center gap-5 ${className ?? ""}`}
        {...props}
      >
        <motion.div
          role="group"
          aria-roledescription="carousel"
          aria-label="Orbit carousel"
          className="relative cursor-grab touch-none overflow-hidden active:cursor-grabbing"
          style={{
            width: itemWidth + radius * 1.7,
            maxWidth: "90vw",
            height: itemHeight + radius * 0.5,
          }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {items.map((child, i) => (
            <OrbitItem
              // biome-ignore lint/suspicious/noArrayIndexKey: slides are positional
              key={i}
              offset={i - active}
              angleStep={angleStep}
              radius={radius}
              width={itemWidth}
              height={itemHeight}
              reduce={reduce}
              onSelect={() => goTo(i)}
            >
              {child}
            </OrbitItem>
          ))}
        </motion.div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            onKeyDown={handleKey}
            disabled={active === 0}
            aria-label="Previous"
            className={NAV_BUTTON}
          >
            ‹
          </button>
          <span className="text-sm tabular-nums text-[var(--muted-foreground,oklch(0.556_0_0))]">
            {active + 1} / {count}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            onKeyDown={handleKey}
            disabled={active === count - 1}
            aria-label="Next"
            className={NAV_BUTTON}
          >
            ›
          </button>
        </div>
      </div>
    );
  },
);
OrbitCarousel.displayName = "OrbitCarousel";

export { OrbitCarousel };
