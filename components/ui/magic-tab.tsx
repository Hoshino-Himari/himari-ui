"use client";

// 移植自 GodUI <https://godui.design/docs/components/navigation/magic-tab> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（彩虹色與尺寸改用元件自帶 CSS 變數、keyframes 內嵌）。

import * as React from "react";

/**
 * 魔法分頁：選中的分頁會浮起成 3D 立體按鈕，下方托著一層流動的彩虹光暈與陰影，
 * 支援方向鍵移動焦點、Enter/空白鍵選取的完整鍵盤操作。
 * @example
 * <MagicTab
 *   items={[
 *     { value: "overview", label: "總覽" },
 *     { value: "usage", label: "用量" },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 */
export type MagicTabVariant = "default" | "secondary";
export type MagicTabSize = "sm" | "md" | "lg";

export type MagicTabItem = {
  /** Unique value identifying the tab */
  value: string;
  /** Visible label */
  label: React.ReactNode;
  /** Disable this tab — not selectable or focusable */
  disabled?: boolean;
};

export type MagicTabProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  /** Tabs to render in the bar */
  items: MagicTabItem[];
  /** Controlled selected value */
  value?: string;
  /** Uncontrolled initial value (defaults to the first non-disabled item) */
  defaultValue?: string;
  /** Called when the selected tab changes */
  onValueChange?: (value: string) => void;
  variant?: MagicTabVariant;
  size?: MagicTabSize;
  /** Animate the selected tab's 3D edge and shadow with a flowing rainbow gradient */
  rainbow?: boolean;
};

// Segmented bar; the selected tab lifts into a 3D button. `selected`,
// `variant`, and `rainbow` are known per-render, so their styling is resolved
// in JS — `group-*` variants cover only runtime hover / focus-visible state.
const CONTAINER_CLASS =
  "himari-magic-tab inline-flex items-stretch gap-2 rounded-xl bg-[var(--muted,oklch(0.97_0_0))] p-2 font-medium select-none [-webkit-tap-highlight-color:transparent]";

const ITEM_BASE =
  "group relative cursor-pointer border-none bg-transparent p-0 outline-none [transition:filter_600ms] [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:filter-none";

const EDGE_BASE =
  "absolute inset-0 rounded-xl [transition:opacity_250ms_ease] motion-reduce:[transition:none]";

const SHADOW_BASE =
  "absolute inset-0 rounded-xl translate-y-[2px] [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),opacity_250ms_ease] motion-reduce:[transition:none]";

// Resting transform AND colors are kept out of the base: the selected state
// sets its own (`-translate-y-[4px]`, primary background, …) and a
// same-specificity resting utility (`translate-y-0`, `bg-transparent`) would win
// the cascade — leaving the selected tab flat and transparent (rainbow edge
// showing through).
const FRONT_BASE =
  "relative block rounded-xl [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),color_250ms_ease,background_250ms_ease] motion-reduce:[transition:none]";

const RAINBOW_FILL =
  "himari-magic-tab-rainbow [background-image:linear-gradient(90deg,var(--himari-mt-rainbow-1),var(--himari-mt-rainbow-5),var(--himari-mt-rainbow-3),var(--himari-mt-rainbow-4),var(--himari-mt-rainbow-2))] [background-size:200%_100%] motion-reduce:animate-none";

const SOLID_SHADOW_FILL = "bg-[hsl(0deg_0%_0%_/_0.25)] blur-[4px]";

const edgeVariant: Record<MagicTabVariant, string> = {
  default:
    "[background:linear-gradient(to_left,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_50%,black)_0%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_75%,black)_8%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_75%,black)_92%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_50%,black)_100%)]",
  secondary:
    "[background:linear-gradient(to_left,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_50%,black)_0%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_75%,black)_8%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_75%,black)_92%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_50%,black)_100%)]",
};

const frontVariantSelected: Record<MagicTabVariant, string> = {
  default:
    "bg-[var(--primary,oklch(0.205_0_0))] text-[var(--primary-foreground,oklch(0.985_0_0))]",
  secondary:
    "bg-[var(--secondary,oklch(0.97_0_0))] text-[var(--secondary-foreground,oklch(0.205_0_0))]",
};

// Unselected hover / focus-visible previews the selected color flat (no lift).
const frontVariantPreview: Record<MagicTabVariant, string> = {
  default:
    "group-hover:bg-[var(--primary,oklch(0.205_0_0))] group-hover:text-[var(--primary-foreground,oklch(0.985_0_0))] group-focus-visible:bg-[var(--primary,oklch(0.205_0_0))] group-focus-visible:text-[var(--primary-foreground,oklch(0.985_0_0))]",
  secondary:
    "group-hover:bg-[var(--secondary,oklch(0.97_0_0))] group-hover:text-[var(--secondary-foreground,oklch(0.205_0_0))] group-focus-visible:bg-[var(--secondary,oklch(0.97_0_0))] group-focus-visible:text-[var(--secondary-foreground,oklch(0.205_0_0))]",
};

// 對應 GodUI 主題的按鈕尺度 token（--button-px-* / --button-py-* / --button-text-*）
const frontSize: Record<MagicTabSize, string> = {
  sm: "px-4 py-2 text-sm leading-5",
  md: "px-6 py-3 text-sm leading-5",
  lg: "px-8 py-4 text-base leading-6",
};

const firstEnabled = (items: MagicTabItem[]): string | undefined =>
  items.find((item) => !item.disabled)?.value;

const MagicTab = React.forwardRef<HTMLDivElement, MagicTabProps>(
  (
    {
      className,
      items,
      value,
      defaultValue,
      onValueChange,
      variant = "default",
      size = "md",
      rainbow = true,
      onKeyDown,
      style,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      () => defaultValue ?? firstEnabled(items),
    );

    const selectedValue = isControlled ? value : internalValue;

    const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

    // The selected tab's rainbow edge/shadow run an infinite background-position
    // keyframe (main-thread paint). Pause it when the tablist is off screen so it
    // costs nothing while idle — resumes seamlessly on scroll-in.
    const rootRef = React.useRef<HTMLDivElement>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );
    React.useEffect(() => {
      const root = rootRef.current;
      if (!rainbow || !root || typeof IntersectionObserver === "undefined")
        return;
      const io = new IntersectionObserver(
        ([entry]) => {
          for (const layer of root.querySelectorAll<HTMLElement>(
            ".himari-magic-tab-rainbow",
          ))
            layer.style.animationPlayState = entry.isIntersecting ? "" : "paused";
        },
        { rootMargin: "128px" },
      );
      io.observe(root);
      return () => io.disconnect();
    }, [rainbow]);

    // Roving tabindex moves focus independently of selection (manual
    // activation): arrows move focus, Enter/Space commits the selection.
    const [focusValue, setFocusValue] = React.useState<string | undefined>(
      undefined,
    );
    const rovingValue = focusValue ?? selectedValue;

    const select = (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      if (next !== selectedValue) {
        onValueChange?.(next);
      }
    };

    const moveFocus = (next: string) => {
      setFocusValue(next);
      const domIndex = items.findIndex((item) => item.value === next);
      tabRefs.current[domIndex]?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const enabled = items.filter((item) => !item.disabled);
      if (enabled.length === 0) {
        onKeyDown?.(event);
        return;
      }

      const currentIndex = Math.max(
        0,
        enabled.findIndex((item) => item.value === rovingValue),
      );

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          moveFocus(enabled[(currentIndex + 1) % enabled.length].value);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          moveFocus(
            enabled[(currentIndex - 1 + enabled.length) % enabled.length].value,
          );
          break;
        case "Home":
          event.preventDefault();
          moveFocus(enabled[0].value);
          break;
        case "End":
          event.preventDefault();
          moveFocus(enabled[enabled.length - 1].value);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (rovingValue !== undefined) {
            select(rovingValue);
          }
          break;
      }

      onKeyDown?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
      // Tabbing away resets the roving tab-stop back to the selected tab.
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setFocusValue(undefined);
      }
    };

    return (
      <div
        ref={setRefs}
        role="tablist"
        aria-orientation="horizontal"
        data-variant={variant}
        data-rainbow={rainbow ? "true" : undefined}
        data-size={size}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`${CONTAINER_CLASS} ${className ?? ""}`}
        style={
          {
            "--himari-mt-rainbow-1": "#ff2d55",
            "--himari-mt-rainbow-2": "#ff9500",
            "--himari-mt-rainbow-3": "#ffd60a",
            "--himari-mt-rainbow-4": "#34c759",
            "--himari-mt-rainbow-5": "#0a84ff",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {items.map((item, index) => {
          const selected = item.value === selectedValue;

          // Selected: focus-visible lifts the tab (like a 3D button hover);
          // pointer hover leaves it. Unselected: hover/focus previews the color.
          const itemFilter = selected
            ? "focus-visible:brightness-110 focus-visible:[transition:filter_250ms]"
            : "hover:brightness-110 focus-visible:brightness-110 hover:[transition:filter_250ms] focus-visible:[transition:filter_250ms]";

          const shadowFill =
            selected && rainbow
              ? `${RAINBOW_FILL} blur-[12px]`
              : SOLID_SHADOW_FILL;
          const shadowOpacity = selected
            ? rainbow
              ? "opacity-70"
              : "opacity-100"
            : "opacity-0";
          const shadowLift = selected
            ? "group-focus-visible:translate-y-[4px] group-focus-visible:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]"
            : "";

          const edgeFill = selected
            ? `opacity-100 ${rainbow ? RAINBOW_FILL : edgeVariant[variant]}`
            : "opacity-0";

          const frontState = selected
            ? `-translate-y-[4px] ${frontVariantSelected[variant]} group-focus-visible:-translate-y-[6px] group-focus-visible:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]`
            : `bg-transparent text-[var(--muted-foreground,oklch(0.556_0_0))] ${frontVariantPreview[variant]}`;

          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={item.disabled}
              data-selected={selected ? "true" : undefined}
              tabIndex={item.value === rovingValue ? 0 : -1}
              onClick={() => {
                setFocusValue(item.value);
                select(item.value);
              }}
              className={`${ITEM_BASE} ${itemFilter}`}
            >
              <span
                className={`${SHADOW_BASE} ${shadowFill} ${shadowOpacity} ${shadowLift}`}
                aria-hidden="true"
              />
              <span className={`${EDGE_BASE} ${edgeFill}`} aria-hidden="true" />
              <span
                data-size={size}
                className={`${FRONT_BASE} ${frontState} ${frontSize[size]}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
        <style>{`
          .himari-magic-tab-rainbow {
            animation: himari-magic-tab-rainbow 3s linear infinite;
          }
          @keyframes himari-magic-tab-rainbow {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .himari-magic-tab-rainbow { animation: none; }
          }
        `}</style>
      </div>
    );
  },
);
MagicTab.displayName = "MagicTab";

export { MagicTab };
