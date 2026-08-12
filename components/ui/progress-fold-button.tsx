"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

/**
 * 進度摺疊按鈕：點擊後正面沿 X 軸向後摺疊，露出底下的進度條；
 * 進度跑完顯示成功勾勾後自動復原（內部狀態機 idle → loading → success → idle）。
 * @example <ProgressFoldButton duration={2} onComplete={() => console.log("完成")}>送出訂單</ProgressFoldButton>
 */
type ProgressFoldButtonProps = {
  children: ReactNode;
  /** 模擬載入秒數 */
  duration?: number;
  /** 進度跑完時的回呼 */
  onComplete?: () => void;
  /** 進度條與成功勾勾的顏色 */
  accentColor?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;

type Phase = "idle" | "loading" | "success";

export function ProgressFoldButton({
  children,
  duration = 2,
  onComplete,
  accentColor = "#34d399",
  className = "",
  onClick,
  ...props
}: ProgressFoldButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    },
    [],
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (phase !== "idle") return;
    setPhase("loading");
    setProgress(0);
    const total = Math.max(duration, 0.2) * 1000;
    const startAt = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startAt) / total, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      setPhase("success");
      onComplete?.();
      timerRef.current = setTimeout(() => {
        setPhase("idle");
        // 等正面攤平蓋回來之後再重設進度，避免復原過程中閃回空進度條
        timerRef.current = setTimeout(() => setProgress(0), 500);
      }, 1100);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  const folded = phase !== "idle";

  return (
    <button
      onClick={handleClick}
      aria-busy={phase === "loading"}
      className={`relative inline-block rounded-xl border-none bg-transparent p-0 text-sm font-medium outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{ perspective: "600px" }}
      {...props}
    >
      {/* 底層：進度條 / 成功勾勾 */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-800"
      >
        {progress >= 1 ? (
          <svg
            className="himari-fold-check h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12.5 10 18.5 20 6" />
          </svg>
        ) : (
          <span className="h-1.5 w-2/3 overflow-hidden rounded-full bg-zinc-600/60">
            <span
              className="block h-full w-full origin-left rounded-full"
              style={{ transform: `scaleX(${progress})`, backgroundColor: accentColor }}
            />
          </span>
        )}
      </span>
      {/* 正面：沿 X 軸向後摺疊 */}
      <span
        className="himari-fold-front relative flex items-center justify-center rounded-xl bg-zinc-900 px-7 py-3 text-zinc-100"
        style={{
          transform: folded ? "rotateX(-90deg)" : "rotateX(0deg)",
          transformOrigin: "top center",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </span>
      <style>{`
        .himari-fold-front { transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1); }
        .himari-fold-check { stroke-dasharray: 30; stroke-dashoffset: 30; animation: himari-fold-draw 0.4s ease forwards; }
        @keyframes himari-fold-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .himari-fold-front { transition: none; }
          .himari-fold-check { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </button>
  );
}
