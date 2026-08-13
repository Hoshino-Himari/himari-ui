"use client";

// 移植自 GodUI <https://godui.design/docs/components/buttons/mask-button> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（sprite 遮罩圖改為遠端網址並開放 maskUrl 覆寫、
// 主題 keyframes 改為檔內 <style>）。
/**
 * 遮罩按鈕：hover 時用逐格 sprite 遮罩動畫（自然、城市、森林三種筆刷）
 * 把實色表面刷進來蓋住按鈕，移開時再刷出去。適合想要一點手作質感的行動呼籲。
 * @example <MaskButton mask="nature">探索自然</MaskButton>
 */

import * as React from "react";

export type MaskButtonMask = "nature" | "urban" | "forest";
export type MaskButtonVariant = "primary" | "secondary";
export type MaskButtonSize = "sm" | "md" | "lg";

export type MaskButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Sprite-sheet mask animated on hover to reveal the label */
  mask?: MaskButtonMask;
  /** Color of the masked face */
  variant?: MaskButtonVariant;
  size?: MaskButtonSize;
  /** 自訂 sprite 遮罩圖網址（預設抓 GodUI 原始 repo 的圖，建議正式使用時自行下載託管） */
  maskUrl?: string;
};

// 原始碼用 `new URL("../assets/mask-*.png", import.meta.url)` 解析隨附的 sprite
// 圖；單檔移植沒有隨附資產，改為指向 GodUI 原始 repo 的遠端圖，並以 maskUrl 覆寫。
const MASK_ASSETS: Record<MaskButtonMask, string> = {
  nature:
    "https://raw.githubusercontent.com/LucasBassetti/godui/main/packages/components/src/assets/mask-nature.png",
  urban:
    "https://raw.githubusercontent.com/LucasBassetti/godui/main/packages/components/src/assets/mask-urban.png",
  forest:
    "https://raw.githubusercontent.com/LucasBassetti/godui/main/packages/components/src/assets/mask-forest.png",
};

// Per-mask sprite geometry + flipbook step counts (static so the scanner can
// see the class names). `out` plays at rest, `in` on hover / focus-visible —
// the in/out animations live in the inline <style> below.
const maskConfig: Record<
  MaskButtonMask,
  { sizeClass: string; fillClass: string }
> = {
  nature: {
    sizeClass: "[mask-size:2300%_100%] [-webkit-mask-size:2300%_100%]",
    fillClass: "himari-mask-fill-nature",
  },
  urban: {
    sizeClass: "[mask-size:3000%_100%] [-webkit-mask-size:3000%_100%]",
    fillClass: "himari-mask-fill-urban",
  },
  forest: {
    sizeClass: "[mask-size:7100%_100%] [-webkit-mask-size:7100%_100%]",
    fillClass: "himari-mask-fill-forest",
  },
};

const fillVariant: Record<MaskButtonVariant, string> = {
  primary:
    "bg-[var(--primary,oklch(0.205_0_0))] text-[var(--primary-foreground,oklch(0.985_0_0))]",
  secondary:
    "bg-[var(--secondary,oklch(0.97_0_0))] text-[var(--secondary-foreground,oklch(0.205_0_0))]",
};

const sizeClasses: Record<MaskButtonSize, string> = {
  sm: "px-[var(--button-px-sm,1rem)] py-[var(--button-py-sm,0.5rem)] text-[length:var(--button-text-sm,0.875rem)] leading-[var(--button-leading-sm,1.25rem)] rounded-[var(--button-radius-sm,0.5rem)]",
  md: "px-[var(--button-px-md,1.5rem)] py-[var(--button-py-md,0.75rem)] text-[length:var(--button-text-md,0.875rem)] leading-[var(--button-leading-md,1.25rem)] rounded-[var(--button-radius-md,0.625rem)]",
  lg: "px-[var(--button-px-lg,2rem)] py-[var(--button-py-lg,1rem)] text-[length:var(--button-text-lg,1rem)] leading-[var(--button-leading-lg,1.5rem)] rounded-[var(--button-radius-lg,0.875rem)]",
};

const BUTTON_CLASS =
  "himari-mask-btn group relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden border border-[var(--border,oklch(0.922_0_0))] bg-[var(--background,oklch(1_0_0))] font-medium text-[var(--foreground,oklch(0.145_0_0))] whitespace-nowrap select-none outline-none [-webkit-tap-highlight-color:transparent] [transition:scale_100ms_ease] focus-visible:[outline:2px_solid_var(--ring,oklch(0.708_0_0))] focus-visible:[outline-offset:4px] enabled:active:scale-[0.96] enabled:data-[pressed=true]:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

const FILL_BASE =
  "absolute inset-0 z-[1] flex items-center justify-center [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-image:var(--mask-img)] [-webkit-mask-image:var(--mask-img)]";

// 主題的 --animate-mask-* tokens 改為檔內 keyframes；
// reduced motion 時改成靜態的 rest→hover 位置切換（等同原始 REDUCED_MOTION_FILL）。
const MASK_STYLE = `
@keyframes himari-mask-in {
  from { -webkit-mask-position: 0 0; mask-position: 0 0; }
  to { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
}
@keyframes himari-mask-out {
  from { -webkit-mask-position: 100% 0; mask-position: 100% 0; }
  to { -webkit-mask-position: 0 0; mask-position: 0 0; }
}
.himari-mask-fill-nature { animation: himari-mask-out 0.7s steps(22) forwards; }
.himari-mask-btn:hover .himari-mask-fill-nature,
.himari-mask-btn:focus-visible .himari-mask-fill-nature { animation: himari-mask-in 0.7s steps(22) forwards; }
.himari-mask-fill-urban { animation: himari-mask-out 0.7s steps(29) forwards; }
.himari-mask-btn:hover .himari-mask-fill-urban,
.himari-mask-btn:focus-visible .himari-mask-fill-urban { animation: himari-mask-in 0.7s steps(29) forwards; }
.himari-mask-fill-forest { animation: himari-mask-out 0.7s steps(70) forwards; }
.himari-mask-btn:hover .himari-mask-fill-forest,
.himari-mask-btn:focus-visible .himari-mask-fill-forest { animation: himari-mask-in 0.7s steps(70) forwards; }
@media (prefers-reduced-motion: reduce) {
  .himari-mask-fill-nature, .himari-mask-fill-urban, .himari-mask-fill-forest {
    animation: none !important;
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
  .himari-mask-btn:hover .himari-mask-fill-nature,
  .himari-mask-btn:focus-visible .himari-mask-fill-nature,
  .himari-mask-btn:hover .himari-mask-fill-urban,
  .himari-mask-btn:focus-visible .himari-mask-fill-urban,
  .himari-mask-btn:hover .himari-mask-fill-forest,
  .himari-mask-btn:focus-visible .himari-mask-fill-forest {
    animation: none !important;
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
`;

const MaskButton = React.forwardRef<HTMLButtonElement, MaskButtonProps>(
  (
    {
      className,
      children,
      mask = "nature",
      variant = "primary",
      size = "md",
      maskUrl,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = React.useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        setPressed(true);
      }
      onKeyDown?.(event);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        setPressed(false);
      }
      onKeyUp?.(event);
    };

    const cfg = maskConfig[mask];

    return (
      <button
        ref={ref}
        type="button"
        data-mask={mask}
        data-variant={variant}
        data-size={size}
        data-pressed={pressed ? "true" : undefined}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={`${BUTTON_CLASS} ${sizeClasses[size]} ${className ?? ""}`}
        {...props}
      >
        <span className="relative z-0">{children}</span>
        <span
          className={`${FILL_BASE} ${fillVariant[variant]} ${cfg.sizeClass} ${cfg.fillClass}`}
          style={
            {
              "--mask-img": `url("${maskUrl ?? MASK_ASSETS[mask]}")`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {children}
        </span>
        <style>{MASK_STYLE}</style>
      </button>
    );
  },
);
MaskButton.displayName = "MaskButton";

export { MaskButton };
