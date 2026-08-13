"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/accordion> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 手風琴：可展開收合的問答清單，展開時高度以彈簧動畫撐開、內容再輕輕落下，
 * 有 smooth / spring / bounce 三種動態手感。
 * @example
 * <Accordion
 *   items={[{ value: "a", title: "問題一", content: "答案一" }]}
 *   defaultValue="a"
 * />
 */
export type AccordionItem = {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

/**
 * Motion feel for the open/close animation.
 * - `smooth`  critically damped — no overshoot (default)
 * - `spring`  gentle overshoot with a soft settle
 * - `bounce`  playful — content springs into place
 *
 * The container height is always kept near-critically damped: overshooting an
 * `auto` height flashes an empty gap below the content, so the springiness
 * lives on the content lift (`y`) instead, where it reads well and clips
 * nothing.
 */
export type AccordionAnimation = "smooth" | "spring" | "bounce";

const MOTION_PRESETS: Record<
  AccordionAnimation,
  {
    height: { bounce: number; duration: number };
    content: { bounce: number; duration: number };
    lift: number;
  }
> = {
  smooth: {
    height: { bounce: 0, duration: 0.4 },
    content: { bounce: 0, duration: 0.4 },
    lift: 6,
  },
  spring: {
    height: { bounce: 0.05, duration: 0.45 },
    content: { bounce: 0.3, duration: 0.5 },
    lift: 10,
  },
  bounce: {
    height: { bounce: 0.12, duration: 0.5 },
    content: { bounce: 0.55, duration: 0.6 },
    lift: 14,
  },
};

export type AccordionProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  items: AccordionItem[];
  /** `single` keeps one panel open; `multiple` allows many. */
  type?: "single" | "multiple";
  /** Open value(s) on mount. */
  defaultValue?: string | string[];
  /** Allow closing the open panel in `single` mode. */
  collapsible?: boolean;
  /** Motion feel for the height animation. */
  animation?: AccordionAnimation;
};

const TRIGGER_CLASS =
  "flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[var(--foreground,oklch(0.145_0_0))] [transition:background_150ms_ease] group-data-[open=false]:hover:bg-[color-mix(in_srgb,var(--accent,oklch(0.97_0_0))_50%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring,oklch(0.708_0_0))] disabled:pointer-events-none disabled:opacity-50";

const ChevronIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 shrink-0 text-[var(--muted-foreground,oklch(0.556_0_0))] [transition:transform_250ms_ease] group-data-[open=true]:rotate-180"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      type = "single",
      defaultValue,
      collapsible = true,
      animation = "smooth",
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const preset = MOTION_PRESETS[animation];
    const heightSpring = { type: "spring" as const, ...preset.height };
    const contentSpring = { type: "spring" as const, ...preset.content };
    const [open, setOpen] = React.useState<string[]>(() => {
      if (defaultValue === undefined) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const toggle = (value: string) => {
      setOpen((current) => {
        const isOpen = current.includes(value);
        if (type === "single") {
          if (isOpen) return collapsible ? [] : current;
          return [value];
        }
        return isOpen
          ? current.filter((v) => v !== value)
          : [...current, value];
      });
    };

    return (
      <div
        ref={ref}
        className={`w-full divide-y divide-[var(--border,oklch(0.922_0_0))] overflow-hidden rounded-xl border border-[var(--border,oklch(0.922_0_0))] ${
          className ?? ""
        }`}
        {...props}
      >
        {items.map((item) => {
          const isOpen = open.includes(item.value);
          const panelId = `accordion-panel-${item.value}`;
          const triggerId = `accordion-trigger-${item.value}`;
          return (
            <div key={item.value} className="group" data-open={isOpen}>
              <h3 className="flex">
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  disabled={item.disabled}
                  onClick={() => toggle(item.value)}
                  className={TRIGGER_CLASS}
                >
                  {item.title}
                  {ChevronIcon}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    key="content"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      height: heightSpring,
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={reduceMotion ? false : { y: -preset.lift }}
                      animate={{ y: 0 }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { ...contentSpring, delay: 0.03 }
                      }
                      className="px-5 pb-4 pt-0 text-sm text-[var(--muted-foreground,oklch(0.556_0_0))] [text-wrap:pretty]"
                    >
                      {item.content}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  },
);
Accordion.displayName = "Accordion";

export { Accordion };
