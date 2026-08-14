"use client";

import { useSyncExternalStore } from "react";
import { OPEN_EVENT } from "./command-palette";

const noopSubscribe = () => () => {};
const isMacClient = () => /mac|iphone|ipad/i.test(navigator.userAgent);

export function SearchTrigger() {
  // 快捷鍵標示要看作業系統，但 SSR 時沒有 navigator。
  // useSyncExternalStore 的 server snapshot 讓 hydration 先用 Ctrl，之後再換成 ⌘，不會對不起來。
  const isMac = useSyncExternalStore(noopSubscribe, isMacClient, () => false);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      aria-label="搜尋元件"
      className="flex items-center gap-2 rounded-md border border-line bg-paper-2 py-1.5 pl-2.5 pr-2 text-sm text-ink-faint transition-colors duration-(--dur-fast) hover:border-line-strong hover:text-ink-mute"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className="size-3.5 shrink-0 fill-none stroke-current stroke-[1.5]"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" strokeLinecap="round" />
      </svg>
      <span className="hidden sm:inline">搜尋</span>
      <kbd className="rounded border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] leading-none">
        {isMac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  );
}
