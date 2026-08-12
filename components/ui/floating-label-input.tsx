"use client";

import { useId, type InputHTMLAttributes } from "react";

/**
 * 浮動標籤輸入框：標籤平常待在框內，focus 或有值時縮小浮到上緣；
 * 傳入 error 會切換成錯誤狀態並在下方顯示錯誤訊息。
 * @example <FloatingLabelInput label="電子郵件" type="email" />
 */
type FloatingLabelInputProps = {
  /** 浮動標籤文字 */
  label: string;
  /** 錯誤訊息（有值時顯示錯誤狀態） */
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FloatingLabelInput({
  label,
  error,
  className = "",
  id,
  ...props
}: FloatingLabelInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          id={inputId}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`peer w-full rounded-lg border bg-transparent px-3 pb-2 pt-5 text-sm outline-none transition-colors placeholder-transparent disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-red-500 text-zinc-900 focus:border-red-500 dark:text-zinc-100"
              : "border-zinc-300 text-zinc-900 focus:border-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-400"
          }`}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute left-3 top-3.5 origin-left text-sm transition-[transform,translate,scale,color] duration-150 ease-out peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75 motion-reduce:transition-none ${
            error
              ? "text-red-500"
              : "text-zinc-500 peer-focus:text-zinc-700 dark:text-zinc-400 dark:peer-focus:text-zinc-300"
          }`}
        >
          {label}
        </label>
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
