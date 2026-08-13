"use client";

// 移植自 GodUI <https://godui.design/docs/components/inputs/magic-input> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（主題 CSS 變數加上 fallback、
// 主題 keyframes 改為檔內 <style>）。
/**
 * 魔法輸入框：聚焦時浮起並露出 3D 邊緣與彩虹流光陰影，可帶送出按鈕；
 * status 控制送出生命週期——loading 時邊緣化為進度條、成功／失敗時掃過綠／紅色並換圖示。
 * @example
 * <MagicInput placeholder="輸入內容" onSubmit={(value) => console.log(value)} />
 */

import * as React from "react";

export type MagicInputVariant = "primary" | "secondary";
export type MagicInputSize = "sm" | "md" | "lg";
export type MagicInputDepth = "focus" | "always";
export type MagicInputStatus = "idle" | "loading" | "success" | "error";

export type MagicInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onSubmit"
> & {
  variant?: MagicInputVariant;
  size?: MagicInputSize;
  /** When the 3D depth shows: only while focused, or always */
  depth?: MagicInputDepth;
  /** Animate the 3D edge and shadow with a rainbow gradient while focused */
  rainbow?: boolean;
  /** Show a submit button with an arrow icon on the right side */
  submitButton?: boolean;
  /**
   * Called with the current value when the button is clicked or Enter is
   * pressed. Passing this also shows the button. Without it the button is
   * `type="submit"` so it submits an enclosing form.
   */
  onSubmit?: (value: string) => void;
  /** Accessible label for the submit button */
  submitLabel?: string;
  /**
   * Submit lifecycle. `loading` runs the progress bar + spinner, `success` /
   * `error` flash a green / red sweep with a check / X. Fully controlled.
   */
  status?: MagicInputStatus;
  /**
   * 0–100. With `status="loading"` a value makes the bar determinate; omitting
   * it makes the bar indeterminate (a segment that bounces end to end).
   */
  progress?: number;
};

// Input size + padding. With a submit button the right padding grows to clear
// it. Two static records (the scanner can't see interpolated class names).
const frontSize: Record<MagicInputSize, string> = {
  sm: "py-[var(--button-py-sm,0.5rem)] pl-[var(--button-px-sm,1rem)] pr-[var(--button-px-sm,1rem)] text-[length:var(--button-text-sm,0.875rem)] leading-[var(--button-leading-sm,1.25rem)]",
  md: "py-[var(--button-py-md,0.75rem)] pl-[var(--button-px-md,1.5rem)] pr-[var(--button-px-md,1.5rem)] text-[length:var(--button-text-md,0.875rem)] leading-[var(--button-leading-md,1.25rem)]",
  lg: "py-[var(--button-py-lg,1rem)] pl-[var(--button-px-lg,2rem)] pr-[var(--button-px-lg,2rem)] text-[length:var(--button-text-lg,1rem)] leading-[var(--button-leading-lg,1.5rem)]",
};

const frontSizeWithButton: Record<MagicInputSize, string> = {
  sm: "py-[var(--button-py-sm,0.5rem)] pl-[var(--button-px-sm,1rem)] pr-[2.5rem] text-[length:var(--button-text-sm,0.875rem)] leading-[var(--button-leading-sm,1.25rem)]",
  md: "py-[var(--button-py-md,0.75rem)] pl-[var(--button-px-md,1.5rem)] pr-[3rem] text-[length:var(--button-text-md,0.875rem)] leading-[var(--button-leading-md,1.25rem)]",
  lg: "py-[var(--button-py-lg,1rem)] pl-[var(--button-px-lg,2rem)] pr-[3.75rem] text-[length:var(--button-text-lg,1rem)] leading-[var(--button-leading-lg,1.5rem)]",
};

// Full literal (no interpolation): Tailwind's scanner can't resolve a `${var}`
// nested inside an arbitrary value, so the rainbow fill must be written out.
// `himari-magic-rainbow` 的流動動畫在檔尾的 <style> 內，聚焦時才會啟動。
const RAINBOW_FOCUS_FILL =
  "himari-magic-rainbow group-focus-within:[background-image:linear-gradient(90deg,var(--rainbow-1,oklch(0.55_0.19_266)),var(--rainbow-5,oklch(0.8_0.13_90)),var(--rainbow-3,oklch(0.82_0.1_185)),var(--rainbow-4,oklch(0.78_0.12_14)),var(--rainbow-2,oklch(0.68_0.16_305)))] group-focus-within:[background-size:200%_100%]";

const edgeVariant: Record<MagicInputVariant, string> = {
  primary:
    "[background:linear-gradient(to_left,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_50%,black)_0%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_75%,black)_8%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_75%,black)_92%,color-mix(in_srgb,var(--primary,oklch(0.205_0_0))_50%,black)_100%)]",
  secondary:
    "[background:linear-gradient(to_left,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_50%,black)_0%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_75%,black)_8%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_75%,black)_92%,color-mix(in_srgb,var(--secondary,oklch(0.97_0_0))_50%,black)_100%)]",
};

const RING_R = 9;
const RING_C = 2 * Math.PI * RING_R;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const RingProgress = ({ value }: { value: number }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r={RING_R}
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.3}
      strokeWidth={2.5}
    />
    <circle
      cx="12"
      cy="12"
      r={RING_R}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeDasharray={RING_C}
      strokeDashoffset={RING_C * (1 - clampPercent(value) / 100)}
      transform="rotate(-90 12 12)"
      style={{ transition: "stroke-dashoffset 250ms ease" }}
    />
  </svg>
);

const Spinner = () => (
  <svg
    className="himari-magic-spin [transform-origin:center]"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r={RING_R}
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.3}
      strokeWidth={2.5}
    />
    <circle
      cx="12"
      cy="12"
      r={RING_R}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeDasharray={`${RING_C * 0.28} ${RING_C}`}
    />
  </svg>
);

// 主題的 --animate-magic-* tokens 改為檔內 keyframes，並在 reduced motion 時全部停用。
const MAGIC_STYLE = `
@keyframes himari-magic-rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes himari-magic-indeterminate {
  from { background-position: 110% center; }
  to { background-position: -10% center; }
}
@keyframes himari-magic-sweep {
  from { background-size: 0% 100%; }
  to { background-size: 100% 100%; }
}
@keyframes himari-magic-spin {
  to { transform: rotate(360deg); }
}
.himari-magic-indeterminate { animation: himari-magic-indeterminate 1.2s ease-in-out infinite alternate; }
.himari-magic-sweep { animation: himari-magic-sweep 220ms ease-out; }
.himari-magic-spin { animation: himari-magic-spin 0.8s linear infinite; }
.himari-magic-root:focus-within .himari-magic-rainbow { animation: himari-magic-rainbow var(--rainbow-speed, 2s) infinite linear; }
@media (prefers-reduced-motion: reduce) {
  .himari-magic-indeterminate,
  .himari-magic-sweep,
  .himari-magic-spin,
  .himari-magic-root:focus-within .himari-magic-rainbow { animation: none; }
}
`;

const MagicInput = React.forwardRef<HTMLInputElement, MagicInputProps>(
  (
    {
      className,
      style,
      variant = "primary",
      size = "md",
      depth = "focus",
      rainbow = true,
      submitButton = false,
      onSubmit,
      submitLabel = "Submit",
      status = "idle",
      progress,
      onKeyDown,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const showButton = submitButton || onSubmit != null;
    const isIdle = status === "idle";
    const isLoading = status === "loading";
    const isDeterminate = isLoading && progress != null;
    const clamped = progress != null ? clampPercent(progress) : undefined;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (
        isIdle &&
        onSubmit &&
        event.key === "Enter" &&
        !event.defaultPrevented
      ) {
        onSubmit(event.currentTarget.value);
      }
    };

    const handleSubmitClick = () => {
      if (!isIdle) return;
      onSubmit?.(innerRef.current?.value ?? "");
    };

    // Snap the fill to 0 on entering loading, then arm the smooth transition a
    // frame later so progress animates without the entry flashing from full.
    // （進出 loading 的同步歸零改用「render 期間調整狀態」的官方模式，
    // 行為與原始 effect 寫法相同。）
    const [armed, setArmed] = React.useState(false);
    const [prevLoading, setPrevLoading] = React.useState(isLoading);
    if (prevLoading !== isLoading) {
      setPrevLoading(isLoading);
      setArmed(false);
    }
    React.useEffect(() => {
      if (!isLoading) return;
      const id = requestAnimationFrame(() => setArmed(true));
      return () => cancelAnimationFrame(id);
    }, [isLoading]);

    // Lock the field while submitting / on success, but keep it interactive-
    // looking (3D + animation stay): readOnly instead of disabled.
    const lock = readOnly || isLoading || status === "success";

    const hasStatus = !isIdle;
    const isSuccess = status === "success";

    // Edge + shadow double as the progress bar while a status is active. The
    // fill colour (--magic-fill) and the position/size/animation depend on the
    // sub-status; all of it is render-known, so it's resolved here.
    const magicFill = isSuccess
      ? "oklch(0.65 0.17 150)"
      : status === "error"
        ? "var(--destructive, oklch(0.577 0.245 27.325))"
        : "var(--primary, oklch(0.205 0 0))";

    const statusFill =
      isLoading && isDeterminate
        ? "[background-position:right_center] [background-size:var(--magic-progress,0%)_100%]"
        : isLoading
          ? "[background-image:linear-gradient(90deg,transparent,var(--magic-fill),transparent)] [background-position:right_center] [background-size:45%_100%] himari-magic-indeterminate"
          : "[background-color:var(--primary,oklch(0.205_0_0))] [background-position:left_center] [background-size:100%_100%] himari-magic-sweep";

    let shadowClass: string;
    let edgeClass: string;
    if (disabled) {
      shadowClass = "hidden";
      edgeClass = "hidden";
    } else if (hasStatus) {
      const fillTransition = armed
        ? "[transition:background-size_250ms_ease]"
        : "[transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),opacity_250ms_ease]";
      shadowClass = `absolute inset-0 rounded-xl translate-y-[6px] opacity-75 blur-[12px] [background-color:transparent] [background-image:linear-gradient(90deg,var(--magic-fill),var(--magic-fill))] bg-no-repeat [will-change:translate] motion-reduce:[transition:none] ${fillTransition} ${statusFill}`;
      const edgeTransition = armed
        ? "[transition:background-size_250ms_ease]"
        : "[transition:opacity_250ms_ease]";
      edgeClass = `absolute inset-0 rounded-xl opacity-100 [background-color:color-mix(in_srgb,var(--foreground,oklch(0.145_0_0))_14%,transparent)] [background-image:linear-gradient(90deg,var(--magic-fill),var(--magic-fill))] bg-no-repeat motion-reduce:[transition:none] ${edgeTransition} ${statusFill}`;
    } else {
      // Idle: depth controls the resting 3D; focus-within reveals/deepens it;
      // rainbow swaps the edge + shadow fill while focused.
      const shadowDepth =
        depth === "always"
          ? "opacity-100 translate-y-[4px] group-focus-within:translate-y-[6px]"
          : "opacity-0 translate-y-0 group-focus-within:translate-y-[4px]";
      const shadowFocusOpacity =
        rainbow || depth === "always" ? "" : "group-focus-within:opacity-100";
      const shadowRainbow = rainbow
        ? `${RAINBOW_FOCUS_FILL} group-focus-within:blur-[12px] group-focus-within:opacity-70`
        : "";
      shadowClass = `absolute inset-0 rounded-xl bg-[hsl(0deg_0%_0%_/_0.25)] blur-[4px] [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),opacity_250ms_ease] motion-reduce:[transition:none] ${shadowDepth} ${shadowFocusOpacity} ${shadowRainbow}`;

      const edgeOpacity =
        depth === "always"
          ? "opacity-100"
          : "opacity-0 group-focus-within:opacity-100";
      const edgeRainbow = rainbow ? RAINBOW_FOCUS_FILL : "";
      edgeClass = `absolute inset-0 rounded-xl [transition:opacity_250ms_ease] motion-reduce:[transition:none] ${edgeOpacity} ${edgeVariant[variant]} ${edgeRainbow}`;
    }

    const frontTransform = disabled
      ? "translate-y-0"
      : hasStatus
        ? "-translate-y-[4px]"
        : depth === "always"
          ? "-translate-y-[4px] group-focus-within:-translate-y-[6px] group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]"
          : "translate-y-0 group-focus-within:-translate-y-[4px] group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]";
    const frontText =
      isLoading || isSuccess
        ? "[color:color-mix(in_srgb,var(--foreground,oklch(0.145_0_0))_45%,transparent)] placeholder:[color:color-mix(in_srgb,var(--muted-foreground,oklch(0.556_0_0))_55%,transparent)]"
        : "text-[var(--foreground,oklch(0.145_0_0))] placeholder:text-[var(--muted-foreground,oklch(0.556_0_0))]";
    const frontClass = `relative block w-full box-border rounded-xl border border-[var(--border,oklch(0.922_0_0))] bg-[var(--background,oklch(1_0_0))] outline-none [font:inherit] [will-change:translate] [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1)] motion-reduce:[transition:none] group-focus-within:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${frontText} ${frontTransform} ${(showButton ? frontSizeWithButton : frontSize)[size]}`;

    const submitColor = isSuccess
      ? "[background:oklch(0.65_0.17_150)] text-[oklch(1_0_0)]"
      : status === "error"
        ? "[background:var(--destructive,oklch(0.577_0.245_27.325))] text-[oklch(1_0_0)]"
        : "bg-[var(--primary,oklch(0.205_0_0))] text-[var(--primary-foreground,oklch(0.985_0_0))]";
    const submitTransform = hasStatus
      ? "-translate-y-[4px]"
      : depth === "always"
        ? "-translate-y-[4px] group-focus-within:-translate-y-[6px] group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]"
        : "translate-y-0 group-focus-within:-translate-y-[4px] group-focus-within:[transition:translate_250ms_cubic-bezier(0.3,0.7,0.4,1.5)]";
    const submitClass = `absolute top-[6px] right-[6px] bottom-[6px] z-[1] inline-flex aspect-square cursor-pointer items-center justify-center rounded-[calc(var(--radius-xl,0.75rem)-6px)] border-none p-0 text-[1.125rem] leading-none [transition:translate_600ms_cubic-bezier(0.3,0.7,0.4,1),filter_200ms_ease] [-webkit-tap-highlight-color:transparent] hover:brightness-110 active:brightness-95 focus-visible:[outline:2px_solid_var(--ring,oklch(0.708_0_0))] focus-visible:[outline-offset:2px] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:[transition:none] ${submitColor} ${submitTransform}`;

    // Morphing icons: all four stacked, the active one cross-fades + scales in.
    const ICON_BASE =
      "absolute inset-0 grid place-items-center [transition:opacity_220ms_ease,transform_220ms_cubic-bezier(0.3,0.7,0.4,1.5)] motion-reduce:[transition:none]";
    const iconClass = (active: boolean) =>
      active
        ? `${ICON_BASE} opacity-100 [transform:scale(1)_rotate(0deg)]`
        : `${ICON_BASE} opacity-0 [transform:scale(0.4)_rotate(-35deg)]`;

    return (
      <div
        data-slot="magic-input"
        data-variant={variant}
        data-depth={depth}
        data-rainbow={rainbow ? "true" : undefined}
        data-submit={showButton ? "true" : undefined}
        data-status={isIdle ? undefined : status}
        data-determinate={isDeterminate ? "true" : undefined}
        data-armed={armed ? "true" : undefined}
        className={`group himari-magic-root relative inline-block rounded-xl [-webkit-tap-highlight-color:transparent] ${disabled ? "cursor-not-allowed" : ""} ${className ?? ""}`}
        style={
          {
            ...style,
            ...(clamped != null ? { "--magic-progress": `${clamped}%` } : {}),
            ...(hasStatus ? { "--magic-fill": magicFill } : {}),
          } as React.CSSProperties
        }
      >
        <span className={shadowClass} aria-hidden="true" />
        <span className={edgeClass} aria-hidden="true" />
        <input
          ref={innerRef}
          data-size={size}
          className={frontClass}
          disabled={disabled}
          readOnly={lock}
          aria-busy={isLoading || undefined}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {!isIdle ? (
          <span
            className="sr-only"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={isDeterminate ? clamped : undefined}
            aria-valuetext={
              status === "success"
                ? "Success"
                : status === "error"
                  ? "Error"
                  : isDeterminate
                    ? `${clamped}%`
                    : "Loading"
            }
          />
        ) : null}
        {showButton ? (
          <button
            type={onSubmit ? "button" : "submit"}
            className={submitClass}
            aria-label={submitLabel}
            disabled={disabled}
            onClick={onSubmit ? handleSubmitClick : undefined}
          >
            <span className={iconClass(isIdle)} data-icon="arrow" aria-hidden>
              <ArrowIcon />
            </span>
            <span className={iconClass(isLoading)} data-icon="ring" aria-hidden>
              {isLoading && !isDeterminate ? (
                <Spinner />
              ) : (
                <RingProgress value={isLoading ? (clamped as number) : 0} />
              )}
            </span>
            <span
              className={iconClass(isSuccess)}
              data-icon="check"
              aria-hidden
            >
              <CheckIcon />
            </span>
            <span
              className={iconClass(status === "error")}
              data-icon="x"
              aria-hidden
            >
              <XIcon />
            </span>
          </button>
        ) : null}
        <style>{MAGIC_STYLE}</style>
      </div>
    );
  },
);
MagicInput.displayName = "MagicInput";

export { MagicInput };
