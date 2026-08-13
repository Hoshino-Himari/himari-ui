"use client";

// 移植自 GodUI <https://godui.design/docs/components/navigation/tab-bar> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（語意色 class 改為 var(--x, fallback)）。

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 底部分頁列：手機 App 風格的膠囊導覽列，選中的藥丸用 layoutId 彈性滑動，
 * 圖示會輕彈一下、文字只在選中時展開，支援未讀徽章與安全區內距。
 * @example
 * <TabBar
 *   tabs={[
 *     { value: "home", label: "首頁", icon: <HomeIcon /> },
 *     { value: "inbox", label: "訊息", icon: <MailIcon />, badge: 3 },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 */
export type TabBarTab = {
  value: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
};

export type TabBarProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange" | "defaultValue"
> & {
  tabs: TabBarTab[];
  value?: string;
  defaultValue?: string;
  /** Reveal the label only on the active tab. */
  labelsOnActiveOnly?: boolean;
  /** Add bottom safe-area padding (for mobile home indicators). */
  safeArea?: boolean;
  onChange?: (value: string) => void;
};

let tabBarSeed = 0;

const TabBar = React.forwardRef<HTMLElement, TabBarProps>(
  (
    {
      tabs,
      value: valueProp,
      defaultValue,
      labelsOnActiveOnly = true,
      safeArea = false,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const blobId = React.useMemo(() => `tab-bar-blob-${tabBarSeed++}`, []);
    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = React.useState(
      () => defaultValue ?? tabs[0]?.value,
    );
    const value = isControlled ? valueProp : internal;

    const select = (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const spring = reduceMotion
      ? { duration: 0 }
      : ({ type: "spring", stiffness: 520, damping: 32 } as const);

    return (
      <nav
        ref={ref}
        aria-label="Bottom navigation"
        className={`inline-flex items-center gap-1 rounded-full border border-[var(--border,oklch(0.922_0_0))] p-1.5 shadow-lg backdrop-blur-xl [background-color:color-mix(in_srgb,var(--background,oklch(1_0_0))_80%,transparent)] ${
          safeArea ? "pb-[max(0.375rem,env(safe-area-inset-bottom))]" : ""
        } ${className ?? ""}`}
        {...props}
      >
        {tabs.map((tab) => {
          const active = tab.value === value;
          return (
            <button
              key={tab.value}
              type="button"
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              onClick={() => select(tab.value)}
              className={`relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,oklch(0.708_0_0))] ${
                active
                  ? "text-[var(--primary-foreground,oklch(0.985_0_0))]"
                  : "text-[var(--muted-foreground,oklch(0.556_0_0))] hover:text-[var(--foreground,oklch(0.145_0_0))]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={blobId}
                  transition={spring}
                  className="absolute inset-0 rounded-full bg-[var(--primary,oklch(0.205_0_0))] shadow-sm"
                />
              )}
              <motion.span
                className="relative flex h-5 w-5 items-center justify-center"
                animate={
                  reduceMotion || !active ? { scale: 1 } : { scale: [1, 1.18, 1] }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="-right-1.5 -top-1.5 absolute flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--destructive,oklch(0.577_0.245_27.325))] px-1 font-semibold text-[10px] text-white ring-2 ring-[var(--background,oklch(1_0_0))]">
                    {tab.badge}
                  </span>
                )}
              </motion.span>
              {(!labelsOnActiveOnly || active) && (
                <motion.span
                  layout
                  initial={
                    labelsOnActiveOnly && !reduceMotion
                      ? { opacity: 0, width: 0 }
                      : false
                  }
                  animate={{ opacity: 1, width: "auto" }}
                  transition={spring}
                  className="relative overflow-hidden whitespace-nowrap"
                >
                  {tab.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>
    );
  },
);
TabBar.displayName = "TabBar";

export { TabBar };
