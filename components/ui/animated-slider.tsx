"use client";

import { useState, type ChangeEvent, type CSSProperties } from "react";

/**
 * 動畫滑桿：軌道有已填色段的 range slider，拖曳或鍵盤操作時上方浮出目前數值的氣泡。
 * 受控（value）與非受控（defaultValue）皆可使用。
 * @example <AnimatedSlider defaultValue={40} aria-label="音量" formatValue={(v) => `${v}%`} />
 */
type AnimatedSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  /** 受控模式的目前值 */
  value?: number;
  /** 非受控模式的初始值 */
  defaultValue?: number;
  /** 值變動時的回呼 */
  onValueChange?: (value: number) => void;
  /** 已填色段與滑塊的顏色 */
  fillColor?: string;
  /** 未填色軌道的顏色 */
  trackColor?: string;
  /** 氣泡文字的格式化函式 */
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function AnimatedSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onValueChange,
  fillColor = "#6366f1",
  trackColor = "#d4d4d8",
  formatValue,
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: AnimatedSliderProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [active, setActive] = useState(false);
  const current = value ?? internal;
  const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = Number(event.target.value);
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <div className={`relative w-full pt-9 ${className}`}>
      {/* 值氣泡：跟著滑塊位置浮出 */}
      <span
        aria-hidden
        className={`himari-slider-bubble absolute top-0 -translate-x-1/2 rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900 ${
          active ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        style={{ left: `calc(${percent}% + ${(50 - percent) * 0.18}px)` }}
      >
        {formatValue ? formatValue(current) : current}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={handleChange}
        onPointerDown={() => setActive(true)}
        onPointerUp={() => setActive(false)}
        onPointerCancel={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="himari-slider w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
        style={
          {
            "--himari-fill": fillColor,
            "--himari-track": trackColor,
            "--himari-percent": `${percent}%`,
          } as CSSProperties
        }
      />
      <style>{`
        .himari-slider { height: 20px; outline: none; }
        .himari-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 9999px;
          background: linear-gradient(to right, var(--himari-fill) var(--himari-percent), var(--himari-track) var(--himari-percent));
        }
        .himari-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -6px;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid var(--himari-fill);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease;
        }
        .himari-slider:active::-webkit-slider-thumb { transform: scale(1.2); }
        .himari-slider:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--himari-fill) 35%, transparent);
        }
        .himari-slider::-moz-range-track {
          height: 6px;
          border-radius: 9999px;
          background: var(--himari-track);
        }
        .himari-slider::-moz-range-progress {
          height: 6px;
          border-radius: 9999px;
          background: var(--himari-fill);
        }
        .himari-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border: 2px solid var(--himari-fill);
          border-radius: 9999px;
          background: #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease;
        }
        .himari-slider:active::-moz-range-thumb { transform: scale(1.2); }
        .himari-slider:focus-visible::-moz-range-thumb {
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--himari-fill) 35%, transparent);
        }
        .himari-slider-bubble { transition: transform 0.2s ease, translate 0.2s ease, scale 0.2s ease, opacity 0.2s ease; }
        @media (prefers-reduced-motion: reduce) {
          .himari-slider-bubble,
          .himari-slider::-webkit-slider-thumb,
          .himari-slider::-moz-range-thumb { transition: none; }
        }
      `}</style>
    </div>
  );
}
