"use client";

import { useRef, useState } from "react";

export function CopyButton({ text, label = "複製" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // 剪貼簿權限被拒時退回選取提示
      window.prompt("自動複製失敗，請手動複製：", text);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors duration-(--dur-fast) ease-(--ease-out) active:translate-y-px ${
        copied
          ? "border-success/40 bg-success/10 text-success"
          : "border-line bg-paper-2 text-ink-mute hover:border-line-strong hover:text-ink"
      }`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-2" aria-hidden>
            <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          已複製
        </>
      ) : (
        <>
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-[1.5]" aria-hidden>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
