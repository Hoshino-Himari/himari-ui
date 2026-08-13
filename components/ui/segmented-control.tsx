"use client";

// 移植自 GodUI <https://godui.design/docs/components/navigation/segmented-control> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整。
/**
 * 分段控制器：iOS 風格的選項列，選中的白色藥丸用 layoutId 在選項之間彈性滑動。
 * 支援受控／非受控、圖示與停用選項，適合檢視切換或篩選條件。
 * @example
 * <SegmentedControl
 *   options={[
 *     { label: "日", value: "day" },
 *     { label: "週", value: "week" },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 */

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

export type SegmentedOption = {
  label: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export type SegmentedControlSize = "sm" | "md" | "lg";

export type SegmentedControlProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  size?: SegmentedControlSize;
  onChange?: (value: string) => void;
};

const sizeClasses: Record<SegmentedControlSize, string> = {
  sm: "h-8 text-xs gap-1",
  md: "h-10 text-sm gap-1.5",
  lg: "h-12 text-base gap-2",
};

let pillSeed = 0;

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      size = "md",
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const layoutId = React.useMemo(() => `segmented-pill-${pillSeed++}`, []);
    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = React.useState(
      () => defaultValue ?? options[0]?.value,
    );
    const value = isControlled ? valueProp : internal;

    const select = (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={`inline-flex items-center rounded-lg border border-[var(--border,oklch(0.922_0_0))] bg-[var(--muted,oklch(0.97_0_0))] p-1 ${sizeClasses[size]} ${
          className ?? ""
        }`}
        {...props}
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={opt.disabled}
              onClick={() => select(opt.value)}
              className={`relative isolate inline-flex h-full items-center justify-center gap-1.5 rounded-md px-3 font-medium [transition:color_150ms_ease] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,oklch(0.708_0_0))] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--background,oklch(1_0_0))] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 ${
                active
                  ? "text-[var(--foreground,oklch(0.145_0_0))]"
                  : "text-[var(--muted-foreground,oklch(0.556_0_0))] hover:text-[var(--foreground,oklch(0.145_0_0))]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 520, damping: 32 }
                  }
                  className="absolute inset-0 z-0 rounded-md bg-[var(--background,oklch(1_0_0))] shadow-sm"
                />
              )}
              {opt.icon && (
                <span className="relative z-10 shrink-0 text-current [&_svg]:text-current">
                  {opt.icon}
                </span>
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
