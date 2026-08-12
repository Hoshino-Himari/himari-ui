"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, useSpring } from "motion/react";

/**
 * 數字滾動：進入視窗時數字從 0 以彈簧曲線平滑滾動到目標值，自動加上千分位，支援小數。
 * @example <NumberTicker value={1234} />
 */
type NumberTickerProps = {
  /** 目標數字 */
  value: number;
  /** 顯示的小數位數 */
  decimalPlaces?: number;
  /** 進入視窗後的起始延遲（秒） */
  delay?: number;
  /** 數字前綴，例如 "$" */
  prefix?: string;
  /** 數字後綴，例如 "+" */
  suffix?: string;
  className?: string;
};

export function NumberTicker({
  value,
  decimalPlaces = 0,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const spring = useSpring(0, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      spring.jump(value);
      return;
    }
    const timer = setTimeout(() => spring.set(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, delay, reduced, spring]);

  useEffect(() => {
    const format = (v: number) =>
      new Intl.NumberFormat("zh-TW", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(v);

    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = format(v);
    });
  }, [spring, decimalPlaces]);

  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`}>
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>
        {new Intl.NumberFormat("zh-TW", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(0)}
      </span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
