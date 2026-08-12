"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * 打字機文字：把句子逐字打出、停頓後逐字刪除，再換下一句循環播放，附閃爍游標。
 * 以 Array.from 切字，中文與 emoji 等非 BMP 字元也能正常逐字顯示。
 * @example <TypewriterText phrases={["你好，世界", "歡迎來到 Himari UI"]} />
 */
type TypewriterTextProps = {
  /** 要輪播的句子 */
  phrases: string[];
  /** 打出一個字的間隔（毫秒） */
  typingSpeed?: number;
  /** 刪除一個字的間隔（毫秒） */
  deletingSpeed?: number;
  /** 整句打完後的停留時間（毫秒） */
  pause?: number;
  /** 是否顯示閃爍游標 */
  showCursor?: boolean;
  /** 游標顏色，預設繼承文字顏色 */
  cursorColor?: string;
  className?: string;
};

export function TypewriterText({
  phrases,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1600,
  showCursor = true,
  cursorColor = "currentColor",
  className = "",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || phrases.length === 0) return;
    // 用 Array.from 切字，避免中文／emoji 的 surrogate pair 被切壞
    const chars = Array.from(phrases[phraseIndex % phrases.length] ?? "");
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting) {
      if (charCount < chars.length) {
        timer = setTimeout(() => setCharCount((c) => c + 1), typingSpeed);
      } else {
        timer = setTimeout(() => setDeleting(true), pause);
      }
    } else if (charCount > 0) {
      timer = setTimeout(() => setCharCount((c) => c - 1), deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, deletingSpeed);
    }

    return () => {
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [charCount, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause, reduced]);

  const current = phrases[phraseIndex % phrases.length] ?? "";
  const visible = reduced ? current : Array.from(current).slice(0, charCount).join("");

  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label={current}>
      <span aria-hidden className="whitespace-pre-wrap">
        {visible}
      </span>
      {showCursor && (
        <span
          aria-hidden
          className="himari-typewriter-cursor ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em]"
          style={{ backgroundColor: cursorColor }}
        />
      )}
      <style>{`
        .himari-typewriter-cursor { animation: himari-typewriter-blink 1s step-end infinite; }
        @keyframes himari-typewriter-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .himari-typewriter-cursor { animation: none; }
        }
      `}</style>
    </span>
  );
}
