"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 解碼文字：進入視窗時觸發，亂碼字元由左至右逐位收斂成目標文字，帶出駭客解密的氛圍。
 * @example <DecryptText text="存取權限已核准" />
 */
type DecryptTextProps = {
  /** 要解碼出來的目標文字 */
  text: string;
  /** 每次收斂一個字的間隔（毫秒），越小越快 */
  speed?: number;
  /** 亂碼取樣的字元集 */
  charset?: string;
  className?: string;
};

export function DecryptText({
  text,
  speed = 45,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#",
  className = "",
}: DecryptTextProps) {
  // 初始直接顯示目標文字，SSR 與關閉 JS 時內容仍可讀
  const [display, setDisplay] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  // text 變更時在 render 期間同步重設（官方建議的 derived state 調整寫法）
  if (prevText !== text) {
    setPrevText(text);
    setDisplay(text);
  }

  useEffect(() => {
    startedRef.current = false;

    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 用 Array.from 切字，中文等多位元組字元不會被切壞
    const chars = Array.from(text);
    const randomChar = () => charset.charAt(Math.floor(Math.random() * charset.length));
    let timer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        let revealed = 0;
        timer = setInterval(() => {
          revealed += 1;
          setDisplay(
            chars
              .map((ch, i) => (i < revealed || ch === " " ? ch : randomChar()))
              .join(""),
          );
          if (revealed >= chars.length && timer !== undefined) clearInterval(timer);
        }, speed);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer !== undefined) clearInterval(timer);
    };
  }, [text, speed, charset]);

  return (
    <span ref={ref} className={`inline-block whitespace-pre-wrap ${className}`} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
