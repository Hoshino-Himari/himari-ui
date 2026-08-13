"use client";

// 移植自 GodUI <https://godui.design/docs/components/buttons/hold-confirm-button> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整。
/**
 * 長按確認按鈕：按住不放時填色從左掃到右，撐滿指定時間才觸發 onConfirm，
 * 中途放開會彈回歸零。適合刪除帳號、清空資料等需要防誤觸的危險操作。
 * @example
 * <HoldConfirmButton duration={900} onConfirm={() => console.log("已確認")}>
 *   長按刪除
 * </HoldConfirmButton>
 */

import { animate, motion, useMotionValue } from "framer-motion";
import * as React from "react";

export type HoldConfirmButtonVariant = "destructive" | "default";
export type HoldConfirmButtonSize = "sm" | "md" | "lg";
export type HoldConfirmButtonStatus = "idle" | "holding" | "confirmed";

export type HoldConfirmButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  /** Fires once the hold completes. */
  onConfirm?: () => void;
  variant?: HoldConfirmButtonVariant;
  size?: HoldConfirmButtonSize;
  /** ms the user must hold to confirm. Default `900`. */
  duration?: number;
  /** Label shown while holding. Default `"Hold to confirm"`. */
  holdingLabel?: React.ReactNode;
  /** Label shown after confirming. Default `"Confirmed"`. */
  confirmedLabel?: React.ReactNode;
};

const BUTTON_BASE =
  "relative inline-flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-[var(--button-radius)] font-medium [outline-offset:4px] [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,oklch(0.708_0_0))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background,oklch(1_0_0))] [transition:scale_120ms_ease] active:scale-[0.99] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClass: Record<HoldConfirmButtonVariant, string> = {
  destructive:
    "bg-[var(--destructive,oklch(0.577_0.245_27.325))] text-white shadow-sm",
  default:
    "bg-[var(--primary,oklch(0.205_0_0))] text-[var(--primary-foreground,oklch(0.985_0_0))] shadow-sm",
};

// The fill that sweeps in from the left as the hold progresses.
const fillClass: Record<HoldConfirmButtonVariant, string> = {
  destructive: "bg-black/25",
  default: "bg-black/20",
};

const sizeClass: Record<HoldConfirmButtonSize, string> = {
  sm: "[--button-radius:var(--button-radius-sm,0.5rem)] px-[var(--button-px-sm,1rem)] py-[var(--button-py-sm,0.5rem)] text-[length:var(--button-text-sm,0.875rem)] leading-[var(--button-leading-sm,1.25rem)]",
  md: "[--button-radius:var(--button-radius-md,0.625rem)] px-[var(--button-px-md,1.5rem)] py-[var(--button-py-md,0.75rem)] text-[length:var(--button-text-md,0.875rem)] leading-[var(--button-leading-md,1.25rem)]",
  lg: "[--button-radius:var(--button-radius-lg,0.875rem)] px-[var(--button-px-lg,2rem)] py-[var(--button-py-lg,1rem)] text-[length:var(--button-text-lg,1rem)] leading-[var(--button-leading-lg,1.5rem)]",
};

const HoldConfirmButton = React.forwardRef<
  HTMLButtonElement,
  HoldConfirmButtonProps
>(
  (
    {
      onConfirm,
      variant = "destructive",
      size = "md",
      duration = 900,
      holdingLabel = "Confirming…",
      confirmedLabel = "Confirmed",
      className,
      children = "Hold to confirm",
      disabled,
      onKeyDown,
      onKeyUp,
      ...props
    },
    forwardedRef,
  ) => {
    const [status, setStatus] = React.useState<HoldConfirmButtonStatus>("idle");
    const statusRef = React.useRef(status);
    statusRef.current = status;

    const progress = useMotionValue(0);
    const playback = React.useRef<ReturnType<typeof animate> | null>(null);
    const resetTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
    const mounted = React.useRef(true);
    React.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        playback.current?.stop();
        clearTimeout(resetTimer.current);
      };
    }, []);

    const complete = () => {
      if (!mounted.current) return;
      setStatus("confirmed");
      onConfirm?.();
      resetTimer.current = setTimeout(() => {
        if (!mounted.current) return;
        setStatus("idle");
        animate(progress, 0, { duration: 0.2 });
      }, 1100);
    };

    const start = () => {
      if (statusRef.current !== "idle" || disabled) return;
      setStatus("holding");
      playback.current = animate(progress, 1, {
        duration: duration / 1000,
        ease: "linear",
        onComplete: complete,
      });
    };

    const cancel = () => {
      if (statusRef.current !== "holding") return;
      playback.current?.stop();
      setStatus("idle");
      animate(progress, 0, {
        type: "spring",
        stiffness: 320,
        damping: 32,
        mass: 0.9,
      });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if ((event.key === " " || event.key === "Enter") && !event.repeat) {
        event.preventDefault();
        start();
      }
    };
    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyUp?.(event);
      if (event.key === " " || event.key === "Enter") cancel();
    };

    // All label variants share one grid cell so the button sizes to the
    // widest and never changes width as the status (and label) changes.
    const labels: { key: HoldConfirmButtonStatus; node: React.ReactNode }[] = [
      { key: "idle", node: children },
      { key: "holding", node: holdingLabel },
      { key: "confirmed", node: confirmedLabel },
    ];

    return (
      <button
        ref={forwardedRef}
        type="button"
        data-status={status}
        aria-label={typeof children === "string" ? children : undefined}
        disabled={disabled}
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={`${BUTTON_BASE} ${variantClass[variant]} ${status === "confirmed" ? "saturate-150" : ""} ${sizeClass[size]} ${className ?? ""}`}
        {...props}
      >
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute inset-0 origin-left ${fillClass[variant]}`}
        />
        <span className="relative grid">
          {labels.map(({ key, node }) => {
            const active = status === key;
            return (
              <span
                key={key}
                aria-hidden={active ? undefined : "true"}
                className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${active ? "" : "invisible"}`}
              >
                {key === "confirmed" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-[1.15em]"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M5 12.5 10 17.5 19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </svg>
                )}
                <span className="whitespace-nowrap">{node}</span>
              </span>
            );
          })}
        </span>
      </button>
    );
  },
);
HoldConfirmButton.displayName = "HoldConfirmButton";

export { HoldConfirmButton };
