"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

/**
 * OTP 驗證碼輸入：n 格單字元輸入框，輸入後自動跳下一格、Backspace 回上一格，
 * 支援整串貼上與行動裝置簡訊自動填入，全部填滿時觸發 onComplete。
 * @example <OtpInput length={6} onComplete={(code) => console.log(code)} />
 */
type OtpInputProps = {
  /** 驗證碼位數 */
  length?: number;
  /** 全部填滿時的回呼，參數為完整驗證碼 */
  onComplete?: (code: string) => void;
  /** 任一格變動時的回呼，參數為目前輸入的字串 */
  onChange?: (code: string) => void;
  disabled?: boolean;
  className?: string;
};

export function OtpInput({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  className = "",
}: OtpInputProps) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function commit(next: string[]) {
    setValues(next);
    const code = next.join("");
    onChange?.(code);
    if (next.every((v) => v !== "")) onComplete?.(code);
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, "");
    const next = [...values];
    if (!digits) {
      next[index] = "";
      commit(next);
      return;
    }
    // 一次可能進來多個字元（例如簡訊自動填入），依序往後填
    const chars = digits.split("").slice(0, length - index);
    chars.forEach((char, offset) => {
      next[index + offset] = char;
    });
    commit(next);
    refs.current[Math.min(index + chars.length, length - 1)]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...values];
      if (values[index]) {
        next[index] = "";
        commit(next);
      } else if (index > 0) {
        next[index - 1] = "";
        commit(next);
        refs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const text = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length - index);
    if (!text) return;
    const next = [...values];
    text.split("").forEach((char, offset) => {
      next[index + offset] = char;
    });
    commit(next);
    refs.current[Math.min(index + text.length, length - 1)]?.focus();
  }

  return (
    <div role="group" aria-label="驗證碼輸入" className={`flex gap-2 ${className}`}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={value}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`第 ${index + 1} 碼，共 ${length} 碼`}
          disabled={disabled}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className="h-12 w-10 rounded-lg border border-zinc-300 bg-transparent text-center text-lg font-semibold text-zinc-900 outline-none transition-[border-color,box-shadow] duration-150 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-400/40 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-400 dark:focus:ring-zinc-500/40"
        />
      ))}
    </div>
  );
}
