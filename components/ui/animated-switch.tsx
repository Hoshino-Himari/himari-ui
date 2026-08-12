"use client";

import { useState, type AriaAttributes } from "react";

/**
 * 動畫開關：role="switch" 的無障礙開關，滑塊帶彈性過渡，受控（checked）與非受控（defaultChecked）皆可使用。
 * @example <AnimatedSwitch defaultChecked aria-label="接收通知" />
 */
type AnimatedSwitchProps = {
  /** 受控模式的開關狀態 */
  checked?: boolean;
  /** 非受控模式的初始狀態 */
  defaultChecked?: boolean;
  /** 狀態切換時的回呼 */
  onCheckedChange?: (checked: boolean) => void;
  /** 開啟時的底色 */
  onColor?: string;
  disabled?: boolean;
  className?: string;
} & Pick<AriaAttributes, "aria-label" | "aria-labelledby" | "aria-describedby">;

export function AnimatedSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onColor = "#10b981",
  disabled = false,
  className = "",
  ...aria
}: AnimatedSwitchProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = checked ?? internal;

  function toggle() {
    const next = !isOn;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-zinc-300 p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700 ${className}`}
      style={{ backgroundColor: isOn ? onColor : undefined }}
      {...aria}
    >
      <span
        aria-hidden
        className="himari-switch-thumb block h-5 w-5 rounded-full bg-white shadow-md"
        style={{ transform: isOn ? "translateX(20px)" : "translateX(0px)" }}
      />
      <style>{`
        .himari-switch-thumb { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @media (prefers-reduced-motion: reduce) { .himari-switch-thumb { transition: none; } }
      `}</style>
    </button>
  );
}
