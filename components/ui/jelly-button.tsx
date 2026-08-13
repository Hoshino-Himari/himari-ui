"use client";

// 移植自 GodUI <https://godui.design/docs/components/buttons/jelly-button> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整。
/**
 * 果凍按鈕：按下時整顆按鈕從底部壓扁（X 軸拉寬、Y 軸壓低），
 * 放開後帶一次過衝的回彈，像果凍一樣 Q 彈。適合想強調點擊回饋的行動呼籲。
 * @example <JellyButton squash={0.6}>點我</JellyButton>
 */

import * as React from "react";

export type JellyButtonVariant = "primary" | "secondary" | "outline";
export type JellyButtonSize = "sm" | "md" | "lg";

export type JellyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: JellyButtonVariant;
  size?: JellyButtonSize;
  /**
   * How hard the button squashes on press, `0`–`1`. Higher = more deform.
   * Drives the `--jelly-press` scale the button snaps to while held.
   * @default 0.6
   */
  squash?: number;
};

// Squishy/tactile button. The whole surface squashes on press (scaleX ↑,
// scaleY ↓ from `origin-bottom`) and springs back with a single overshoot via
// the `back` easing — a jelly wobble that never leaves the compositor. Only
// `scale` animates (MotionScore S); color/shadow differences between states are
// static, never transitioned. Reduced motion drops the deform entirely.
const BUTTON_CLASS =
  "group relative inline-flex origin-bottom cursor-pointer select-none items-center justify-center border-none font-medium [will-change:transform] [-webkit-tap-highlight-color:transparent] [transition:scale_300ms_cubic-bezier(0.3,0.7,0.4,1.5)] hover:[scale:1.04] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,oklch(0.708_0_0))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background,oklch(1_0_0))] focus-visible:[scale:1.04] active:[scale:var(--jelly-press)] active:[transition:scale_120ms_cubic-bezier(0.3,0.7,0.4,1)] data-[pressed=true]:[scale:var(--jelly-press)] data-[pressed=true]:[transition:scale_120ms_cubic-bezier(0.3,0.7,0.4,1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:[transition:none] motion-reduce:hover:[scale:1] motion-reduce:focus-visible:[scale:1] motion-reduce:active:[scale:1] motion-reduce:data-[pressed=true]:[scale:1]";

const variantClasses: Record<JellyButtonVariant, string> = {
  primary:
    "bg-[var(--primary,oklch(0.205_0_0))] text-[var(--primary-foreground,oklch(0.985_0_0))] shadow-sm",
  secondary:
    "bg-[var(--secondary,oklch(0.97_0_0))] text-[var(--secondary-foreground,oklch(0.205_0_0))] shadow-sm",
  outline:
    "border border-[var(--border,oklch(0.922_0_0))] bg-[var(--background,oklch(1_0_0))] text-[var(--foreground,oklch(0.145_0_0))] shadow-xs hover:bg-[var(--accent,oklch(0.97_0_0))] hover:text-[var(--accent-foreground,oklch(0.205_0_0))]",
};

const sizeClasses: Record<JellyButtonSize, string> = {
  sm: "rounded-[var(--button-radius-sm,0.5rem)] px-[var(--button-px-sm,1rem)] py-[var(--button-py-sm,0.5rem)] text-[length:var(--button-text-sm,0.875rem)] leading-[var(--button-leading-sm,1.25rem)]",
  md: "rounded-[var(--button-radius-md,0.625rem)] px-[var(--button-px-md,1.5rem)] py-[var(--button-py-md,0.75rem)] text-[length:var(--button-text-md,0.875rem)] leading-[var(--button-leading-md,1.25rem)]",
  lg: "rounded-[var(--button-radius-lg,0.875rem)] px-[var(--button-px-lg,2rem)] py-[var(--button-py-lg,1rem)] text-[length:var(--button-text-lg,1rem)] leading-[var(--button-leading-lg,1.5rem)]",
};

/** Map the `squash` knob to the `scale: <x> <y>` the button snaps to on press. */
function pressScale(squash: number): string {
  const amount = Math.min(Math.max(squash, 0), 1) * 0.22;
  return `${(1 + amount).toFixed(3)} ${(1 - amount).toFixed(3)}`;
}

const JellyButton = React.forwardRef<HTMLButtonElement, JellyButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      squash = 0.6,
      style,
      children,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = React.useState(false);

    // Keyboard activation (Enter/Space) mirrors the pointer squash so the
    // wobble reads the same for keyboard users.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(true);
      onKeyDown?.(event);
    };
    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") setPressed(false);
      onKeyUp?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        data-variant={variant}
        data-pressed={pressed ? "true" : undefined}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        style={
          {
            "--jelly-press": pressScale(squash),
            ...style,
          } as React.CSSProperties
        }
        className={`${BUTTON_CLASS} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
JellyButton.displayName = "JellyButton";

export { JellyButton };
