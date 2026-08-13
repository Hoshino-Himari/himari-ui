"use client";

// 移植自 GodUI <https://godui.design/docs/components/overlays/animated-tooltip> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整。

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import * as React from "react";

/**
 * 動畫提示框：hover / focus 時以彈簧動畫彈出的提示，並隨滑鼠位置微幅傾斜。
 * @example
 * <AnimatedTooltip content="刪除這個項目">
 *   <button>刪除</button>
 * </AnimatedTooltip>
 */
export type AnimatedTooltipSide = "top" | "bottom";

export type AnimatedTooltipProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "content"
> & {
  /** Tooltip content shown on hover / focus. */
  content: React.ReactNode;
  /** Which side of the trigger the tooltip appears on. */
  side?: AnimatedTooltipSide;
  /** The trigger element the tooltip is attached to. */
  children: React.ReactNode;
};

const SPRING = { stiffness: 170, damping: 12, mass: 0.1 } as const;

const PANEL_BASE =
  "pointer-events-none absolute left-1/2 z-50 flex max-w-[16rem] -translate-x-1/2 flex-col items-center rounded-lg bg-zinc-950 px-3 py-1.5 text-center text-xs font-medium text-white shadow-lg dark:bg-zinc-50 dark:text-zinc-950 [transform-style:preserve-3d]";

const AnimatedTooltip = React.forwardRef<HTMLSpanElement, AnimatedTooltipProps>(
  ({ content, side = "top", className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const rotate = useSpring(useTransform(x, [-60, 60], [-14, 14]), SPRING);
    const translateX = useSpring(useTransform(x, [-60, 60], [-12, 12]), SPRING);

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
    };

    const isTop = side === "top";

    return (
      // hover/focus only reveals a tooltip; the wrapped child stays the interactive element
      <span
        ref={ref}
        data-slot="animated-tooltip"
        className={`relative inline-flex ${className ?? ""}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              role="tooltip"
              initial={{
                opacity: 0,
                y: isTop ? 8 : -8,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 170,
                      damping: 12,
                      mass: 0.1,
                    },
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: isTop ? 6 : -6, scale: 0.9 }
              }
              style={reduceMotion ? undefined : { rotate, x: translateX }}
              className={`${PANEL_BASE} ${isTop ? "bottom-[calc(100%+0.625rem)] origin-bottom" : "top-[calc(100%+0.625rem)] origin-top"}`}
            >
              {content}
              <span
                aria-hidden
                className={`absolute left-1/2 size-2 -translate-x-1/2 rotate-45 bg-zinc-950 dark:bg-zinc-50 ${isTop ? "top-[calc(100%-0.25rem)]" : "bottom-[calc(100%-0.25rem)]"}`}
              />
            </motion.span>
          ) : null}
        </AnimatePresence>
        {children}
      </span>
    );
  },
);
AnimatedTooltip.displayName = "AnimatedTooltip";

export { AnimatedTooltip };
